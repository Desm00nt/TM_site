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
  const cls = `inline-flex items-center justify-center rounded-[30px] bg-[#EC812D] text-[#F8F8F7] tm-font-head font-bold tracking-wide shadow-[0_2px_10px_rgba(236,129,45,0.4)] transition-all duration-200 hover:bg-[#f2933f] hover:shadow-[0_4px_16px_rgba(236,129,45,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
    size === "lg" ? "text-sm md:text-xl px-8 md:px-14 py-3 md:py-4" : "text-xs md:text-base px-6 md:px-9 py-2.5 md:py-3"
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
