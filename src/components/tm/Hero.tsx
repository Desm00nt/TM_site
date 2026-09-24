"use client";

import Header from "./Header";
import { Deco, Hand, OrangeButton, Reveal, Wave } from "./decor";
import { u } from "@/lib/tm";

const STATS = [
  { text: "27 лет опыта", img: "/images/texts/t_1-46.png", w: 92, h: 25, tx: 860, ty: 129, cx: 841, cy: 136, cw: 14, ch: 15 },
  { text: "1 место в рейтинге", img: "/images/texts/t_1-47.png", w: 131, h: 27, tx: 837, ty: 173, cx: 819, cy: 184, cw: 14, ch: 15 },
  { text: "более 32 000 детей", img: "/images/texts/t_1-48.png", w: 138, h: 33, tx: 1000, ty: 147, cx: 982, cy: 141, cw: 15, ch: 16 },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#F8F8F7] max-md:!h-auto"
      style={{ height: u(671) }}
    >
      {/* мятая бумага — фон */}
      <img
        src="/images/frag_bumaga_1-13.png"
        alt=""
        aria-hidden
        className="absolute left-0 top-0 h-auto w-full max-md:!h-full max-md:!object-cover"
        draggable={false}
      />

      {/* холст = вся ширина окна: контент и фон масштабируются вместе (cqw от вьюпорта) */}
      <div className="relative hidden h-full md:block [container-type:inline-size]">
        {/* хедер */}
        <Header variant="desktop" />

        {/* заголовок */}
        <Reveal
          as="p"
          className="tm-font-body absolute whitespace-nowrap font-medium text-[#3D3D3D]"
          style={{ left: u(82), top: u(163), fontSize: u(20), lineHeight: u(24.4) }}
        >
          Республиканский интеллектуально-психологический лагерь
        </Reveal>

        <h1 className="tm-font-head font-bold leading-none text-[#256BC6]" style={{ position: "absolute", left: u(82), top: u(194), fontSize: u(90), lineHeight: u(98) }}>
          ТЕРРИТОРИЯ
          <br />
          МЫ
        </h1>

        {/* бумажка-заметка */}
        <Deco x={233} y={293} h={195} w={492} src="/images/frag_image_80_1-36.png" z={3} />
        <p
          className="tm-font-body absolute z-[4] font-medium text-[#3D3D3D]"
          style={{ left: u(332), top: u(352), fontSize: u(26), lineHeight: u(35) }}
        >
          Лагерь, где становятся
          <br />
          <span className="relative inline-block">
            личностью
            <img src="/images/decor_Vector_4_1-38.png" alt="" aria-hidden className="absolute left-0 top-full h-auto w-full" />
          </span>
        </p>

        {/* звёздочка и блёстка */}
        <Deco x={588} y={398} w={88} h={95} src="/images/frag_image_144_1-39.png" z={5} mobile="show" />
        <Deco x={337} y={517} w={84} h={86} src="/images/frag_image_161_1-178.png" z={5} mobile="show" />

        {/* кнопка */}
        <div className="absolute z-10" style={{ left: u(82), top: u(500) }}>
          <OrangeButton href="#shifts" size="lg">
            <span style={{ fontSize: u(20) }}>ПОДОБРАТЬ СМЕНУ</span>
          </OrangeButton>
        </div>

        {/* статистика с галочками */}
        {STATS.map((s) => (
          <div key={s.text}>
            <img
              src="/images/decor_Vector_13_1-34.png"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: u(s.cx), top: u(s.cy), width: u(s.cw), height: u(s.ch), zIndex: 2 }}
            />
            <img
              src={s.img}
              alt={s.text}
              className="absolute"
              style={{ left: u(s.tx), top: u(s.ty), width: u(s.w), height: u(s.h), zIndex: 2 }}
            />
          </div>
        ))}

        {/* полароид с фото — геометрия узлов Figma: рамка 1:23 имеет собственный размер
            517×517 и поворот +5.727° (bbox 566×566 получается поворотом), фото 1:24 —
            каноничный рендер-кроп в bbox узла */}
        <Deco x={696.12} y={210.35} w={517.05} h={517.43} rot={5.727} src="/images/frag_image_84_1-23.png" z={11} />
        <Deco x={742} y={254} w={425} h={430} src="/images/rc_1-24.png" z={12} alt="Дети бегут на территории лагеря" />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="relative md:hidden">
        <Header variant="mobile" />
        <div className="relative px-5 pb-10 pt-4">
          <Reveal>
            <p className="tm-font-body text-sm font-medium text-[#3D3D3D]">
              Республиканский интеллектуально-психологический лагерь
            </p>
            <h1 className="tm-font-head mt-1 text-[13vw] font-bold leading-[1.05] text-[#256BC6]">
              ТЕРРИТОРИЯ
              <br />
              МЫ
            </h1>
          </Reveal>

          {/* бумажка-заметка */}
          <Reveal delay={120} className="relative mt-4 block">
            <img src="/images/frag_image_80_1-36.png" alt="" aria-hidden className="h-auto w-full" />
            <p className="tm-font-body absolute left-[20%] top-[26%] text-base font-medium text-[#3D3D3D]">
              Лагерь, где становятся
              <br />
              <span className="relative inline-block">
                личностью
                <img src="/images/decor_Vector_4_1-38.png" alt="" aria-hidden className="absolute left-0 top-full h-auto w-full" />
              </span>
            </p>
          </Reveal>

          {/* полароид */}
          <Reveal delay={200} className="relative mx-auto mt-6 w-[74%]">
            <img src="/images/frag_image_84_1-23.png" alt="" aria-hidden className="h-auto w-full" />
            <div className="absolute z-10 overflow-hidden" style={{ left: "12%", top: "11.5%", width: "76%", height: "76%" }}>
              <img
                src="/images/obschee_foto_1-24.webp"
                alt="Дети бегут на территории лагеря"
                className="h-full w-full object-cover"
              />
            </div>
            <img src="/images/frag_image_144_1-39.png" alt="" aria-hidden className="absolute -left-6 bottom-4 h-auto w-12 tm-float" style={{ ["--tm-rot" as string]: "-10deg" }} />
          </Reveal>

          {/* статистика */}
          <Reveal delay={260} className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {STATS.map((s) => (
              <span key={s.text} className="inline-flex items-center gap-1.5">
                <img src="/images/decor_Vector_13_1-34.png" alt="" aria-hidden className="w-4" />
                <span className="tm-font-body text-sm font-medium text-[#3D3D3D]">{s.text}</span>
              </span>
            ))}
          </Reveal>

          <Reveal delay={300} className="mt-6">
            <OrangeButton href="#shifts" size="lg" className="w-full">
              ПОДОБРАТЬ СМЕНУ
            </OrangeButton>
          </Reveal>
        </div>
      </div>

      {/* рваный край (синие «горы») */}
      <Wave id="1:16" y0={0} />
    </section>
  );
}
