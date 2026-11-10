"use client";

import { useState, type CSSProperties } from "react";
import { CONTACTS, u } from "@/lib/tm";
import { REVIEW_PAGES, type Review } from "@/lib/reviews";
import { Deco, Hand, Reveal, Wave }
from "./decor";

const Y = -5866;

/**
 * Слоты пузырей — позиции и радиусы из макета (Rectangle 50–54). Высота растёт под текст
 * (min — высота из макета). Аватар привязан к краю пузыря: edge="bottom" — свисает снизу,
 * edge="top" — выступает сверху (dx — от левого края пузыря, over — на сколько выходит за край).
 */
const SLOTS = [
  { x: 500, y: 6094, w: 280, h: 148, radius: "20px 83px 86px 86px", av: { dx: 112, size: 81, edge: "bottom", over: 48 }, pt: 17, pb: 40 },
  { x: 182, y: 6195, w: 295, h: 87, radius: "40px", av: { dx: 214, size: 81, edge: "bottom", over: 65 }, pt: 14, pb: 22 },
  { x: 787, y: 6177, w: 283, h: 167, radius: "60px", av: { dx: 23, size: 81, edge: "bottom", over: 43 }, pt: 20, pb: 40 },
  { x: 219, y: 6450, w: 181, h: 188, radius: "20px 20px 86px 20px", av: { dx: 141, size: 78, edge: "top", over: 52 }, pt: 32, pb: 18 },
  { x: 509, y: 6437, w: 385, h: 83, radius: "0px 70px 0px 70px", av: { dx: 50, size: 81, edge: "top", over: 64 }, pt: 22, pb: 16 },
] as const;

/** Круглый аватар-инициал (фото авторов у нас нет, чужие лица к реальным именам не подставляем) */
export function ReviewAvatar({ name, size, className = "", style, unit = u }: { name: string; size: number; className?: string; style?: CSSProperties; unit?: (n: number) => string }) {
  const letter = name.trim().charAt(0).toUpperCase();
  return (
    <span
      aria-hidden
      className={`tm-font-head flex select-none items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7] ${className}`}
      style={{ width: unit(size), height: unit(size), fontSize: unit(size * 0.46), zIndex: 2, ...style }}
    >
      {letter}
    </span>
  );
}

function Bubble({ review, slot, order, dir, style }: { review: Review; slot: number; order: number; dir: number; style?: CSSProperties }) {
  const sl = SLOTS[slot];
  const av = sl.av;
  const avStyle = av.edge === "bottom" ? { bottom: u(-av.over) } : { top: u(-av.over) };
  return (
    <figure
      className="tm-bubble-in relative m-0 shrink-0 bg-[#D9E3F4]"
      style={{
        width: u(sl.w),
        minHeight: u(sl.h),
        boxSizing: "border-box",
        borderRadius: sl.radius.split(" ").map((v) => u(parseFloat(v))).join(" "),
        padding: `${u(sl.pt)} ${u(24)} ${u(sl.pb)} ${u(24)}`,
        ["--d" as string]: `${order * 90}ms`,
        ["--dx" as string]: dir > 0 ? "28px" : "-28px",
        ...style,
      }}
    >
      <blockquote className="tm-font-body m-0 font-medium text-[#3D3D3D]" style={{ fontSize: u(13), letterSpacing: u(-0.13), lineHeight: u(16.5) }}>
        {review.text}
      </blockquote>
      <figcaption className="tm-font-body font-semibold text-[#256BC6]" style={{ marginTop: u(8), fontSize: u(12), lineHeight: u(15) }}>
        {review.author}
      </figcaption>
      <ReviewAvatar name={review.author} size={av.size} className="absolute" style={{ left: u(av.dx), ...avStyle }} />
    </figure>
  );
}


export default function Reviews() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    setPage((p) => (p + d + REVIEW_PAGES.length) % REVIEW_PAGES.length);
  };

  return (
    <section id="reviews" className="relative z-[3] overflow-x-clip bg-[#256BC6]">
      <Wave id="1:20" y0={5866} />

      {/* ===== DESKTOP ===== */}
      <div className="relative hidden md:block [container-type:inline-size]" style={{ minHeight: u(1095), paddingBottom: u(60) }}>
        <Reveal
          as="h2"
          className="tm-font-head absolute whitespace-nowrap font-bold text-[#F8F8F7]"
          style={{ left: u(91), top: u(5995 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          ОТЗЫВЫ РОДИТЕЛЕЙ
        </Reveal>
        <Hand x={95} y={6067 + Y} w={237} file="/images/texts/t_1-70.png" text="и детей" />
        <Hand x={732} y={5958 + Y} w={201} file="/images/texts/t_1-143.png" text="впечатления из первых уст" />
        <Deco x={1031} y={5872 + Y} w={206} h={218} src="/images/frag_IMG_6316_(1)_1_1-217.png" z={6} className="tm-float" />

        {/* стикер шиба — заходит на секцию «Моменты» выше */}
        <Deco x={411} y={5722 + Y} w={218} h={248} src="/images/frag_IMG_6322_1_1-205.png" z={6} />

        {/* оранжевые волнистые линии по краям */}
        <Deco x={0} y={6128 + Y} w={142} h={360} src="/images/rev_curve_left.png" z={1} />
        <Deco x={1016} y={6235 + Y} w={264} h={372} src="/images/rev_curve_right.png" z={1} />

        {/* пузыри отзывов: расположение как в макете (два ряда вразброс), но высота растёт под текст,
            поэтому второй ряд идёт в потоке под первым; текст — из документа заказчика */}
        <div key={page} className="relative" style={{ zIndex: 4, paddingTop: u(228) }} aria-live="polite">
          <div className="flex items-start" style={{ paddingLeft: u(182) }}>
            {[1, 0, 2].map((slot, k) => (
              <Bubble key={slot} review={REVIEW_PAGES[page][slot]} slot={slot} order={slot} dir={dir} style={{ marginLeft: k === 0 ? 0 : u(k === 1 ? 23 : 7), marginTop: u([101, 0, 83][k]) }} />
            ))}
          </div>
          <div className="relative flex items-start" style={{ paddingLeft: u(219), marginTop: u(125) }}>
            {[3, 4].map((slot, k) => (
              <Bubble key={slot} review={REVIEW_PAGES[page][slot]} slot={slot} order={slot} dir={dir} style={{ marginLeft: k === 0 ? 0 : u(109), marginTop: u(k === 0 ? 13 : 0) }} />
            ))}
            {/* рукописные акценты и каракули между рядами — привязаны ко второму ряду */}
            <Hand x={925} y={24} w={132} file="/images/texts/t_1-84.png" text="до встречи летом!!" z={5} />
            <Deco x={278} y={-172} w={118} h={74} src="/images/frag_image_164_1-218.png" z={3} mobile="show" />
            <Deco x={766} y={-46} w={79} h={72} src="/images/frag_image_164_1-219.png" z={5} />
            <Deco x={437} y={123} w={79} h={71} src="/images/frag_image_164_1-220.png" z={5} />
          </div>
          <p className="tm-font-body m-0 font-medium text-[#F8F8F7]" style={{ marginLeft: u(696), marginTop: u(56), fontSize: u(15) }}>
            Больше отзывов вы можете найти у нас в группе{" "}
            <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="text-[#EC812D] transition-colors hover:text-[#D9E3F4]">
              Вконтакте
            </a>
          </p>
        </div>

        <Hand x={865} y={6087 + Y} w={181} file="/images/texts/t_1-83.png" text="обязательно вернусь ещё!" z={5} />
        <Hand x={108} y={6369 + Y} w={118} file="/images/texts/t_19-68.png" text="нажми, чтобы увидеть больше!" z={5} />

        {/* стрелки карусели */}
        <button
          onClick={() => go(-1)}
          aria-label="Предыдущие отзывы"
          className="absolute z-[6] flex items-center justify-center rounded-full bg-[#D9E3F4]/25 transition-all hover:bg-[#D9E3F4]/40 hover:scale-105"
          style={{ left: u(66), top: u(6310 + Y), width: u(64), height: u(64) }}
        >
          <img src="/images/decor_arrow_left_19-64.png" alt="" aria-hidden className="h-auto" style={{ width: u(34) }} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Следующие отзывы"
          className="absolute z-[6] flex items-center justify-center rounded-full bg-[#D9E3F4]/25 transition-all hover:bg-[#D9E3F4]/40 hover:scale-105"
          style={{ left: u(1115), top: u(6310 + Y), width: u(64), height: u(64) }}
        >
          <img src="/images/decor_arrow_right_19-63.png" alt="" aria-hidden className="h-auto" style={{ width: u(38) }} />
        </button>

      </div>

    </section>
  );
}
