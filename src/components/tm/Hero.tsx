"use client";

import Header from "./Header";
import { Deco, Fig, Hand, OrangeButton, Reveal, Wave } from "./decor";
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
      className="relative z-[7] overflow-x-clip bg-[#D9E3F4]"
      style={{ height: u(671) }}
    >
      {/* холст = вся ширина окна: контент и фон масштабируются вместе (cqw от вьюпорта) */}
      <div className="relative hidden h-full md:block [container-type:inline-size]">
        {/* мятая бумага — фон (узел 30:9: повёрнут на 90.29°, opacity .6) */}
        <div className="absolute inset-0 overflow-hidden">
        <Fig box={[0, 0, 1301.227, 703.653]} inner={[696.991, 1297.661]} rot={90.29} src="/images/frag_bumaga_1-13.png" crop={{ h: 100, l: 0, t: 0, w: 135.85 }} opacity={0.6} z={0} />
        </div>
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
        {/* фото: render узла 1:24 (425×430), обрезанный по контуру повёрнутого на -9.11° снимка */}
        <img
          src="/images/rc_1-24.png"
          alt="Дети бегут на территории лагеря"
          className="absolute"
          draggable={false}
          style={{ left: u(742.4), top: u(254), width: u(425.156), height: u(429.844), zIndex: 12, clipPath: "polygon(0.27% 13.83%, 85.80% 0.27%, 99.73% 86.17%, 14.20% 99.73%)" }}
        />
      </div>

      {/* рваный край (синие «горы») */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Wave id="1:16" y0={0} />
      </div>
    </section>
  );
}
