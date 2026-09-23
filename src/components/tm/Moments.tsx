"use client";

import { Deco, Hand, Reveal, Wave }
from "./decor";
import { u } from "@/lib/tm";

const Y = -4767;

const PHOTOS = [
  { src: "/images/rc_1-185.png", x: 42, y: 5056, w: 289, h: 268, alt: "Ребёнок смотрит на небо" },
  { src: "/images/rc_1-186.png", x: 383, y: 5106, w: 251, h: 242, alt: "Кружки с надписями" },
  { src: "/images/rc_1-187.png", x: 670, y: 5098, w: 342, h: 279, alt: "Выступление на сцене Территории МЫ" },
  { src: "/images/image_167_1-188.webp", x: 1044, y: 5048, w: 243, h: 328, alt: "Дети в зале", cover: true, polaroid: true },
  { src: "/images/rc_1-189.png", x: 32, y: 5402, w: 338, h: 265, alt: "Дети в масках" },
  { src: "/images/rc_1-190.png", x: 396, y: 5459, w: 337, h: 208, alt: "Отряд на улице" },
  { src: "/images/rc_1-191.png", x: 772, y: 5432, w: 276, h: 313, alt: "Занятие карате" },
  { src: "/images/rc_1-192.png", x: 1038, y: 5348, w: 377, h: 311, alt: "Танцевальный баттл" },
];

/** Полароид фото 1:188 — каноничная сборка из Figma: узел 201.5×302.1, поворот −8.208°,
 *  белая обводка 11px INSIDE (#F8F8F8), заливка на весь узел под обводкой.
 *  left/top = центр AABB (1165.26, 5211.89) минус половина собственного размера. */
function Polaroid188({ Y }: { Y: number }) {
  return (
    <div
      className="absolute max-md:!hidden"
      style={{
        left: u(1064.53),
        top: u(5060.82 + Y),
        width: u(201.47),
        height: u(302.14),
        zIndex: 2,
        rotate: "-8.208deg",
        border: `${u(11)} solid #F8F8F8`,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <img
        src="/images/image_167_1-188.webp"
        alt="Дети сидят кругом в зале"
        className="absolute object-cover"
        style={{ left: u(-11), top: u(-11), width: u(201.47), height: u(302.14) }}
        draggable={false}
      />
    </div>
  );
}

export default function Moments() {
  return (
    <section id="moments" className="relative z-[2] overflow-hidden bg-[#D9E3F4]">
      <Wave id="1:25" y0={4767} />

      {/* ===== DESKTOP ===== */}
      <div className="relative hidden md:block [container-type:inline-size]" style={{ height: u(1099) }}>
        <Reveal
          as="h2"
          className="tm-font-head absolute font-bold text-[#3D3D3D]"
          style={{ left: u(87), top: u(4877 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          МОМЕНТЫ СМЕН
        </Reveal>
        <Reveal
          as="p"
          className="tm-font-body absolute font-medium text-[#3D3D3D]"
          style={{ left: u(644), top: u(4941 + Y), fontSize: u(20), lineHeight: u(24.4) }}
        >
          Вечёрки, концерты, игры, объятия после
          <br />
          свечки и друзья, с которыми не хочется прощаться.
        </Reveal>

        {/* гирлянда — вместе с рамками-полароидами, как во Figma; поверх фото (z выше) */}
        <Deco x={3} y={4828 + Y} w={1305} h={894} src="/images/girlyanda_1-193.png" z={3} mobile="show" />

        {/* каракули */}
        <Deco x={253} y={4945 + Y} w={94} h={86} src="/images/frag_image_164_1-195.png" z={3} mobile="show" />
        <Deco x={516} y={4983 + Y} w={89} h={99} src="/images/frag_image_164_1-194.png" z={3} mobile="show" />
        <Deco x={254} y={5286 + Y} w={92} h={91} src="/images/frag_image_164_1-197.png" z={3} />
        <Deco x={314} y={5745 + Y} w={91} h={109} src="/images/frag_image_164_1-196.png" z={3} />

        {/* фото на гирлянде — точные bbox, повороты зашиты во фрагменты */}
        {PHOTOS.map((p) =>
          p.polaroid ? null : (
            <Deco
              key={p.src}
              x={p.x}
              y={p.y + Y}
              w={p.w}
              h={p.h}
              src={p.src}
              alt={p.alt}
              z={2}
              cover={p.cover}
            />
          )
        )}
        <Polaroid188 Y={Y} />

        {/* рукописные подписи */}
        <Hand x={396} y={5049 + Y} w={135} file="/images/texts/t_1-182.png" text="Хочу еще на смену!" z={4} />
        <Hand x={646} y={5394 + Y} w={105} file="/images/texts/t_1-183.png" text="лучший отряд!!!" z={4} />
        <Hand x={165} y={5708 + Y} w={167} file="/images/texts/t_1-184.png" text="нашли друзей навсегда" z={4} />

        {/* стикер */}
        <Deco x={411} y={5722 + Y} w={218} h={248} src="/images/frag_IMG_6322_1_1-205.png" z={5} />

        <p className="tm-font-body absolute font-medium text-[#3D3D3D]" style={{ left: u(783), top: u(5798 + Y), fontSize: u(15) }}>
          Больше фото вы можете найти у нас в группе{" "}
          <a href="https://vk.com/" target="_blank" rel="noreferrer" className="text-[#EC812D] transition-colors hover:text-[#256BC6]">
            Вконтакте
          </a>
        </p>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-5 py-12 md:hidden">
        <Reveal as="h2" className="tm-font-head text-4xl font-bold text-[#3D3D3D]">
          МОМЕНТЫ СМЕН
        </Reveal>
        <Reveal as="p" className="tm-font-body mt-3 text-base font-medium text-[#3D3D3D]">
          Вечёрки, концерты, игры, объятия после свечки и друзья, с которыми не хочется прощаться.
        </Reveal>
        <img src="/images/girlyanda_1-193.png" alt="" aria-hidden className="mt-2 h-auto w-full" />
        <div className="mt-2 grid grid-cols-2 gap-3">
          {PHOTOS.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`h-auto w-full rounded-lg shadow-md ${i % 2 ? "rotate-1" : "-rotate-1"}`}
            />
          ))}
        </div>
        <p className="tm-font-body mt-6 text-center text-sm font-medium text-[#3D3D3D]">
          Больше фото вы можете найти у нас в группе{" "}
          <a href="https://vk.com/" target="_blank" rel="noreferrer" className="text-[#EC812D]">
            Вконтакте
          </a>
        </p>
      </div>
    </section>
  );
}
