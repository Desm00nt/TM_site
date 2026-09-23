"use client";

import { useRef } from "react";
import { u } from "@/lib/tm";
import { Deco, Hand, Reveal, Wave }
from "./decor";

const Y = -5866;

/** Пузыри отзывов — точные bbox/радиусы из макета (Rectangle 50-54) */
const BUBBLES = [
  {
    id: "1:202",
    x: 500, y: 6094, w: 280, h: 148,
    radius: "20px 83px 86px 86px",
    text: "Понравилась организация и атмосфера. Дочь вернулась более самостоятельной и уверенной в себе. Уже выбираем следующую смену.",
  },
  {
    id: "1:200",
    x: 182, y: 6195, w: 295, h: 87,
    radius: "40px",
    text: "Никогда не думал, что в лагере может быть настолько интересно. Игры, проекты, концерты — каждый день происходило что-то новое.",
  },
  {
    id: "1:204",
    x: 787, y: 6177, w: 283, h: 167,
    radius: "60px",
    text: "Сын ездит уже третий год подряд. Каждый раз возвращается с новыми друзьями, идеями и историями. Для нас это показатель, что ребёнку действительно хорошо.",
  },
  {
    id: "1:201",
    x: 219, y: 6450, w: 181, h: 188,
    radius: "20px 20px 86px 20px",
    text: "Переживали перед первой поездкой, но уже через пару дней ребёнок звонил счастливый и рассказывал о событиях. Спасибо вожатым за внимание и заботу.",
  },
  {
    id: "1:203",
    x: 509, y: 6437, w: 385, h: 83,
    radius: "0px 70px 0px 70px",
    text: "Больше всего понравились квесты и вечерние мероприятия. Очень быстро нашла друзей, а расставаться в конце смены вообще не хотелось.",
  },
];

/** Аватары — маска-круг 81x81 из макета + исходный кадр с точным смещением */
const AVATARS = [
  { src: "/images/zhenshina_1-216.webp", rect: [610, 6201, 87, 116], circle: [612, 6209, 81, 81], flip: false, alt: "Аватар автора отзыва" },
  { src: "/images/image_172_1-223.webp", rect: [372, 6264, 124, 83], circle: [396, 6266, 81, 81], flip: false, alt: "Аватар автора отзыва" },
  { src: "/images/image_173_1-226.webp", rect: [351, 6365, 98, 147], circle: [360, 6398, 81, 81], flip: false, alt: "Аватар автора отзыва" },
  { src: "/images/image_174_1-229.webp", rect: [512, 6373, 169, 116], circle: [559, 6373, 81, 81], flip: false, alt: "Аватар автора отзыва" },
  { src: "/images/image_175_1-232.webp", rect: [796, 6298, 118, 177], circle: [810, 6306, 81, 81], flip: false, alt: "Аватар автора отзыва" },
];

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="relative z-[3] overflow-hidden bg-[#256BC6]">
      <Wave id="1:20" y0={5866} />

      {/* ===== DESKTOP ===== */}
      <div className="relative mx-auto hidden max-w-[1280px] md:block [container-type:inline-size]" style={{ height: u(823) }}>
        <Reveal
          as="h2"
          className="tm-font-head absolute whitespace-nowrap font-bold text-[#F8F8F7]"
          style={{ left: u(91), top: u(5995 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          ОТЗЫВЫ РОДИТЕЛЕЙ
        </Reveal>
        <Hand x={95} y={6057 + Y} w={237} file="/images/texts/t_1-70.png" text="и детей" />
        <Hand x={732} y={5958 + Y} w={201} file="/images/texts/t_1-143.png" text="впечатления из первых уст" />
        <Deco x={1031} y={5872 + Y} w={206} h={218} src="/images/frag_IMG_6316_(1)_1_1-217.png" z={6} className="tm-float" />

        {/* оранжевые волнистые линии по краям */}
        <Deco x={-89} y={6128 + Y} w={231} src="/images/decor_Vector_28_1-134.png" z={1} />
        <Deco x={1016} y={6235 + Y} w={317} src="/images/decor_Vector_27_1-133.png" z={1} />

        {/* пузыри отзывов — точные bbox и радиусы из макета, заливка #D9E3F4 */}
        <div className="absolute inset-0" style={{ zIndex: 4 }}>
          {BUBBLES.map((b) => (
            <div
              key={b.id}
              className="tm-font-body absolute overflow-hidden bg-[#D9E3F4] font-medium text-[#3D3D3D]"
              style={{
                left: u(b.x),
                top: u(b.y + Y),
                width: u(b.w),
                height: u(b.h),
                borderRadius: b.radius.includes(" ") ? b.radius.split(" ").map((r) => u(parseFloat(r))).join(" ") : u(parseFloat(b.radius)),
                fontSize: u(14),
                lineHeight: u(17.5),
                padding: u(18),
              }}
            >
              {b.text}
            </div>
          ))}
        </div>

        {/* аватары — круги 81x81 в точных позициях маски из макета */}
        {AVATARS.map((a) => (
          <div
            key={a.src}
            className="absolute overflow-hidden rounded-full"
            style={{
              left: u(a.circle[0]),
              top: u(a.circle[1] + Y),
              width: u(a.circle[2]),
              height: u(a.circle[3]),
              zIndex: 5,
            }}
          >
            <img
              src={a.src}
              alt={a.alt}
              className="absolute max-w-none object-cover"
              style={{
                left: u(a.rect[0] - a.circle[0]),
                top: u(a.rect[1] - a.circle[1]),
                width: u(a.rect[2]),
                height: u(a.rect[3]),
                transform: a.flip ? "rotate(180deg)" : undefined,
              }}
            />
          </div>
        ))}

        {/* рукописные акценты */}
        <Hand x={865} y={6087 + Y} w={181} file="/images/texts/t_1-83.png" text="обязательно вернусь ещё!" z={5} />
        <Hand x={510} y={6313 + Y} w={132} file="/images/texts/t_1-84.png" text="до встречи летом!!" z={5} />
        <Hand x={108} y={6369 + Y} w={118} file="/images/texts/t_19-68.png" text="нажми, чтобы увидеть больше!" z={5} />

        {/* каракули */}
        <Deco x={278} y={6265 + Y} w={118} h={74} src="/images/frag_image_164_1-218.png" z={3} mobile="show" />
        <Deco x={766} y={6391 + Y} w={79} h={72} src="/images/frag_image_164_1-219.png" z={5} />
        <Deco x={437} y={6560 + Y} w={79} h={71} src="/images/frag_image_164_1-220.png" z={5} />

        {/* стрелки карусели */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Предыдущие отзывы"
          className="absolute z-[6] flex items-center justify-center rounded-xl bg-[#D9D9D9] transition-all hover:bg-[#c8c8c8] hover:scale-105"
          style={{ left: u(74), top: u(6322 + Y), width: u(65), height: u(53) }}
        >
          <img src="/images/decor_arrow_left_19-64.png" alt="" aria-hidden className="h-auto" style={{ width: u(43) }} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Следующие отзывы"
          className="absolute z-[6] flex items-center justify-center rounded-xl bg-[#D9D9D9] transition-all hover:bg-[#c8c8c8] hover:scale-105"
          style={{ left: u(1120), top: u(6316 + Y), width: u(65), height: u(53) }}
        >
          <img src="/images/decor_arrow_right_19-63.png" alt="" aria-hidden className="h-auto" style={{ width: u(51) }} />
        </button>

        <p className="tm-font-body absolute font-medium text-[#F8F8F7]" style={{ left: u(696), top: u(6624 + Y), fontSize: u(15) }}>
          Больше отзывов вы можете найти у нас в группе{" "}
          <a href="https://vk.com/" target="_blank" rel="noreferrer" className="text-[#EC812D] transition-colors hover:text-[#D9E3F4]">
            Вконтакте
          </a>
        </p>
      </div>

      {/* ===== MOBILE: горизонтальная карусель ===== */}
      <div className="py-12 md:hidden">
        <div className="px-5">
          <Reveal as="h2" className="tm-font-head text-4xl font-bold text-[#F8F8F7]">
            ОТЗЫВЫ РОДИТЕЛЕЙ
          </Reveal>
          <img src="/images/texts/t_1-70.png" alt="и детей" className="mt-1 h-auto w-[44%]" />
        </div>
        <div ref={trackRef} className="tm-snap mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-4">
          {BUBBLES.map((b, i) => (
            <div key={b.id} className="relative flex w-[78%] shrink-0 flex-col rounded-2xl bg-[#F0F3F8] p-4 pb-16 shadow">
              <p className="tm-font-body text-sm font-medium leading-snug text-[#3D3D3D]">{b.text}</p>
              <img
                src={AVATARS[i].src}
                alt="Аватар автора отзыва"
                className="absolute bottom-3 left-4 h-14 w-14 rounded-full border-[3px] border-[#F0F3F8] object-cover shadow-md"
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-4 px-5">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Предыдущие отзывы"
            className="flex h-11 w-14 items-center justify-center rounded-xl bg-[#D9D9D9]"
          >
            <img src="/images/decor_arrow_left_19-64.png" alt="" aria-hidden className="w-7" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Следующие отзывы"
            className="flex h-11 w-14 items-center justify-center rounded-xl bg-[#D9D9D9]"
          >
            <img src="/images/decor_arrow_right_19-63.png" alt="" aria-hidden className="w-8" />
          </button>
        </div>
        <p className="tm-font-body mt-6 px-5 text-center text-sm font-medium text-[#F8F8F7]">
          Больше отзывов вы можете найти у нас в группе{" "}
          <a href="https://vk.com/" target="_blank" rel="noreferrer" className="text-[#EC812D]">
            Вконтакте
          </a>
        </p>
      </div>
    </section>
  );
}
