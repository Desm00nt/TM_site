"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { u } from "@/lib/tm";
import { WAVES } from "@/lib/tm-waves";

/** Рваный край секции: точное позиционирование с учётом полей внутри PNG */
export function Wave({ id, y0 = 0 }: { id: keyof typeof WAVES; y0?: number }) {
  const w = WAVES[id];
  return (
    <img
      src={w.src}
      alt=""
      aria-hidden
      className="absolute pointer-events-none select-none"
      style={{ left: u(w.x), top: u(w.y - y0), width: u(w.w), height: u(w.h), zIndex: w.z }}
      draggable={false}
    />
  );
}

/** Изображение-декор: абсолютное позиционирование в дизайн-координатах (макет 1280).
 *  h задана -> точный размер bbox узла (растяжение как STRETCH в Figma);
 *  h нет -> h-auto по пропорции файла. */
export function Deco({
  x,
  y,
  w,
  h,
  src,
  alt = "",
  rot,
  z = 1,
  className = "",
  mobile = "hidden",
  cover = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  src: string;
  alt?: string;
  rot?: number;
  z?: number;
  className?: string;
  mobile?: "hidden" | "show";
  cover?: boolean;
}) {
  const style: CSSProperties = {
    left: u(x),
    top: u(y),
    width: u(w),
    ...(h !== undefined ? { height: u(h) } : {}),
    zIndex: z,
    ...(rot ? { ["--tm-rot" as string]: `${rot}deg`, rotate: `${rot}deg` } : {}),
  };
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt === ""}
      loading="lazy"
      className={`absolute pointer-events-none select-none ${h === undefined || cover ? "" : ""} ${h === undefined ? "h-auto" : ""} ${cover ? "object-cover" : ""} ${mobile === "hidden" ? "max-md:!hidden" : ""} ${className}`}
      style={style}
      draggable={false}
    />
  );
}

/** Элемент из спеки макета (tm-spec.ts): точные x/y/w/h как во Figma */
export function SpecImg({
  el,
  yShift = 0,
  z = 1,
  className = "",
}: {
  el: { src: string; x: number; y: number; w: number; h: number; alt?: string; kind?: string };
  yShift?: number;
  z?: number;
  className?: string;
}) {
  const raw = !el.src.includes("/frag") && !el.src.includes("/texts/");
  return (
    <Deco
      x={el.x}
      y={el.y + yShift}
      w={el.w}
      h={el.h}
      src={el.src}
      alt={el.alt || ""}
      z={z}
      cover={raw}
      className={className}
    />
  );
}

/** Список элементов спеки секции (в порядке y — как порядок слоёв во Figma) */
export function SpecList({
  items,
  yShift = 0,
  skip,
  z = 1,
}: {
  items: Array<{ src: string; x: number; y: number; w: number; h: number; alt?: string; kind?: string; id: string }>;
  yShift?: number;
  skip?: string[];
  z?: number;
}) {
  return (
    <>
      {items.map((el) =>
        skip?.includes(el.id) ? null : <SpecImg key={el.id} el={el} yShift={yShift} z={z} />
      )}
    </>
  );
}


/** Перевод пикселей мобильного макета (ширина 402) в cqw */
export const um = (n: number) => `${((n * 100) / 402).toFixed(4)}cqw`;

type Box = [number, number, number, number];
type Crop = { h: number; l: number; t: number; w: number };

/**
 * Элемент Figma «как есть»: bbox узла [left, top, w, h], собственный размер inner [w, h]
 * (если узел повёрнут — bbox больше inner), поворот rot (deg), опциональная обрезка
 * исходника (проценты из Figma: высота/слева/сверху/ширина картинки внутри узла).
 * unit — функция перевода пикселей макета в CSS-длину (u для 1280, um для 402).
 */
export function Fig({
  box,
  inner,
  rot = 0,
  flipY = false,
  src,
  crop,
  alt = "",
  z = 1,
  opacity,
  radius,
  className = "",
  unit = u,
  fit = "fill",
  pos,
  shadow,
  style,
}: {
  box: Box;
  inner?: [number, number];
  rot?: number;
  flipY?: boolean;
  src: string;
  crop?: Crop;
  alt?: string;
  z?: number;
  opacity?: number;
  radius?: number;
  className?: string;
  unit?: (n: number) => string;
  fit?: "fill" | "cover";
  /** object-position (например "bottom") */
  pos?: string;
  /** тень в px макета: [x, y, blur, color] */
  shadow?: [number, number, number, string];
  style?: CSSProperties;
}) {
  const [l, t, W, H] = box;
  const [w, h] = inner ?? [W, H];
  const tf = [rot ? `rotate(${rot}deg)` : "", flipY ? "scaleY(-1)" : ""].filter(Boolean).join(" ");
  return (
    <div
      aria-hidden={alt === ""}
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        left: unit(l),
        top: unit(t),
        width: unit(W),
        height: unit(H),
        zIndex: z,
        // тень Figma повторяет контур (альфа) картинки, поэтому drop-shadow, а не box-shadow
        filter: shadow ? `drop-shadow(${unit(shadow[0])} ${unit(shadow[1])} ${unit(shadow[2] / 2)} ${shadow[3]})` : undefined,
        ...style,
      }}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          left: unit((W - w) / 2),
          top: unit((H - h) / 2),
          width: unit(w),
          height: unit(h),
          transform: tf || undefined,
          opacity,
          borderRadius: radius ? unit(radius) : undefined,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className="absolute max-w-none"
          style={
            crop
              ? { height: `${crop.h}%`, left: `${crop.l}%`, top: `${crop.t}%`, width: `${crop.w}%` }
              : { inset: 0, width: "100%", height: "100%", objectFit: fit === "cover" ? "cover" : "fill", objectPosition: pos }
          }
        />
      </div>
    </div>
  );
}

/** Повёрнутый «живой» текст: bbox узла [left, top, w, h], текст центрируется и поворачивается */
export function FigText({
  box,
  rot = 0,
  z = 3,
  className = "",
  style,
  children,
  unit = u,
}: {
  box: Box;
  rot?: number;
  z?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  unit?: (n: number) => string;
}) {
  const [l, t, W, H] = box;
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: unit(l), top: unit(t), width: unit(W), height: unit(H), zIndex: z }}
    >
      <div
        className={`flex-none whitespace-nowrap ${className}`}
        style={{ transform: rot ? `rotate(${rot}deg)` : undefined, ...style }}
      >
        {children}
      </div>
    </div>
  );
}

/** Рукописная надпись (PNG-экспорт из Figma, шрифт Mariinavo) */
export function Hand({
  x,
  y,
  w,
  file,
  text,
  z = 2,
  className = "",
}: {
  x: number;
  y: number;
  w: number;
  file: string;
  text: string;
  z?: number;
  className?: string;
}) {
  return (
    <Deco x={x} y={y} w={w} src={file} alt={text} z={z} className={className} mobile="show" />
  );
}

/** Появление блока при скролле */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "h2" | "p" | "span";
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`tm-reveal ${visible ? "tm-reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/** Оранжевая кнопка как в макете */
export function OrangeButton({
  children,
  onClick,
  href,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  // десктопные паддинги/радиус — в cqw, чтобы кнопка масштабировалась вместе с макетом
  const cls = `inline-flex items-center justify-center rounded-[30px] md:rounded-[2.3438cqw] bg-[#EC812D] text-[#F8F8F7] tm-font-head font-bold tracking-wide shadow-[0_2px_10px_rgba(236,129,45,0.4)] transition-all duration-200 hover:bg-[#f2933f] hover:shadow-[0_4px_16px_rgba(236,129,45,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
    size === "lg" ? "text-sm md:text-[1.5625cqw] px-8 md:px-[4.375cqw] py-3 md:py-[1.25cqw]" : "text-xs md:text-[1.25cqw] px-6 md:px-[2.8125cqw] py-2.5 md:py-[0.9375cqw]"
  } ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
