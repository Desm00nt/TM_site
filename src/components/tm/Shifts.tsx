"use client";

import { SHIFTS, u } from "@/lib/tm";
import { Deco, Hand, Reveal, Wave } from "./decor";

const Y = -3977;

export default function Shifts() {
  const shift = SHIFTS[0];
  // на бумажке «реалити-шоу» идёт отдельной строкой — как в макете
  const programLines = shift.program.flatMap((p) => p.replace(" реалити-шоу", "\nреалити-шоу").split("\n"));

  return (
    <section id="shifts" className="relative z-[6] bg-[#256BC6]">
      <Wave id="1:19" y0={3975} />

      {/* ===== DESKTOP (макет «ТМ НЕ ЛЕТО полный дизайн»: смена развёрнута сразу, без карточки) ===== */}
      <div className="relative hidden md:block [container-type:inline-size]" style={{ height: u(790) }}>
        <Reveal
          as="h2"
          className="tm-font-head absolute font-bold text-[#D9E3F4]"
          style={{ left: u(95), top: u(82), fontSize: u(46), lineHeight: u(52) }}
        >
          ОСЕННЯЯ СМЕНА
        </Reveal>
        <p
          className="tm-font-body absolute m-0 whitespace-pre font-medium text-[#D9E3F4]"
          style={{ left: u(96), top: u(164), fontSize: u(20), lineHeight: u(24.4) }}
        >
          {"Каждая смена - это новая история, насыщенная\nсобытиями, друзьями и открытиями."}
        </p>
        <p
          className="tm-font-hand absolute m-0 whitespace-pre text-[#EC812D]"
          style={{ left: u(668), top: u(128), fontSize: u(24), lineHeight: u(26), transform: "rotate(-8deg)", transformOrigin: "left top" }}
        >
          {"выберите свои\nканикулы с нами!"}
        </p>
        <Deco x={870} y={3912 + Y} w={178} h={190} src="/images/frag_IMG_6325_(1)_1_1-169.png" z={14} className="tm-float" />
        <Deco x={953} y={4037 + Y} w={182} h={184} src="/images/frag_IMG_6323_(1)_1_1-170.png" z={14} className="tm-float" />
        <Deco x={944} y={241} w={117} h={87} src="/images/frag_image_144_1-176.png" z={2} mobile="show" />

        {/* фото смены: большое 380x380 и три миниатюры */}
        {[
          { src: shift.bigPhoto, x: 94, y: 260, w: 380, h: 380, alt: shift.name.replace("\n", " ") },
          { src: shift.smallPhotos[0], x: 94, y: 658, w: 112, h: 100, alt: "" },
          { src: shift.smallPhotos[1], x: 224, y: 658, w: 116, h: 100, alt: "" },
          { src: shift.smallPhotos[2], x: 358, y: 658, w: 116, h: 100, alt: "" },
        ].map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt={p.alt}
            aria-hidden={p.alt === "" ? true : undefined}
            draggable={false}
            className="absolute z-[3] object-cover"
            style={{ left: u(p.x), top: u(p.y), width: u(p.w), height: u(p.h), borderRadius: u(5) }}
          />
        ))}

        {/* название, даты, описание */}
        <h3
          className="tm-font-head absolute m-0 whitespace-pre-line font-bold text-[#D9E3F4]"
          style={{ left: u(510), top: u(254), fontSize: u(30), lineHeight: u(34) }}
        >
          {shift.name}
        </h3>
        <p className="tm-font-body absolute m-0 font-semibold text-[#EC812D]" style={{ left: u(731), top: u(259), fontSize: u(15), lineHeight: u(20) }}>
          {shift.dates}
        </p>
        <p className="tm-font-body absolute m-0 whitespace-pre font-medium text-[#D9E3F4]" style={{ left: u(510), top: u(345), fontSize: u(15), lineHeight: u(19) }}>
          {"Осенняя смена, посвящённая развитию мотивации,\nуверенности в себе и умению достигать целей.\nЧерез тренинги, игры и командные испытания участники\nнаучатся преодолевать сомнения, справляться\nс прокрастинацией и находить силы двигаться вперёд."}
        </p>
        <p className="tm-font-body absolute m-0 whitespace-pre font-medium text-[#D9E3F4]" style={{ left: u(510), top: u(461), fontSize: u(15), lineHeight: u(19) }}>
          {"Ребят ждут масштабные игры, необычные испытания,\nяркие театрализации и незабываемые события.\nКаждый сможет раскрыть свои способности, научиться\nвдохновлять других и поверить в собственные силы."}
        </p>

        {/* что входит */}
        {[
          { src: "/images/svc_living.png", x: 528.5, y: 562.5, w: 45, h: 49 },
          { src: "/images/svc_food.png", x: 634.5, y: 566.5, w: 50, h: 45 },
          { src: "/images/svc_bus.png", x: 523, y: 688.5, w: 56, h: 31 },
          { src: "/images/svc_med.png", x: 637.5, y: 677, w: 41, h: 46 },
        ].map((ic) => (
          <img key={ic.src} src={ic.src} alt="" aria-hidden draggable={false} className="absolute z-[3] object-contain" style={{ left: u(ic.x), top: u(ic.y), width: u(ic.w), height: u(ic.h) }} />
        ))}
        {[
          { t: "Проживание\nв ГК Регина", cx: 551, y: 620 },
          { t: "5-разовое\nпитание", cx: 658, y: 620 },
          { t: "Трансфер", cx: 551, y: 728 },
          { t: "Медицинское\nсопровождение", cx: 658, y: 728 },
        ].map((l) => (
          <p
            key={l.t}
            className="tm-font-body absolute m-0 whitespace-pre text-center font-medium text-[#D9E3F4]"
            style={{ left: u(l.cx - 60), top: u(l.y), width: u(120), fontSize: u(12.2), lineHeight: u(14.65) }}
          >
            {l.t}
          </p>
        ))}

        {/* бумажки: «В программе» и «Возрастные группы» (повёрнуты вместе с текстом) */}
        <div className="absolute z-[4]" style={{ left: u(1096 - 133.5), top: u(478 - 59), width: u(267), height: u(118), transform: "rotate(4.9deg)" }}>
          <img src="/images/frag_image_152_1-310.png" alt="" aria-hidden draggable={false} className="absolute inset-0 h-full w-full" />
          <div className="tm-font-body absolute whitespace-pre font-medium text-[#2A2A2A]" style={{ left: u(24), top: u(4), fontSize: u(12.2), lineHeight: u(14.7) }}>
            {programLines.map((l) => (
              <div key={l} className="relative">
                <span className="absolute" style={{ left: u(-9) }}>·</span>
                {l}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute z-[4]" style={{ left: u(914 - 131.5), top: u(614 - 44), width: u(263), height: u(88.5), transform: "rotate(-4.4deg)" }}>
          <img src="/images/frag_image_155_1-311.png" alt="" aria-hidden draggable={false} className="absolute inset-0 h-full w-full" />
          <div className="tm-font-body absolute whitespace-pre font-medium text-[#2A2A2A]" style={{ left: u(17), top: u(11), fontSize: u(12), lineHeight: u(15.6) }}>
            {shift.ages.map((l) => (
              <div key={l} className="relative">
                <span className="absolute" style={{ left: u(-9) }}>·</span>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* цена и кнопка */}
        <p className="tm-font-hand absolute m-0 whitespace-nowrap text-[#D9E3F4]" style={{ left: u(800), top: u(690), fontSize: u(17), lineHeight: u(22), transform: "rotate(-8deg)", transformOrigin: "left top" }}>
          Стоимость смены
        </p>
        <p className="tm-font-hand absolute m-0 whitespace-nowrap text-[#EC812D]" style={{ left: u(820), top: u(720), fontSize: u(27), lineHeight: u(32), transform: "rotate(-8deg)", transformOrigin: "left top" }}>
          {shift.price}р.
        </p>
        <Hand x={1163} y={637} w={50} file="/images/texts/t_1-87.png" text="нажми!" z={6} />
        <Deco x={1143} y={674} w={40} h={28} src="/images/frag_image_144_1-177.png" z={5} rot={105} mobile="show" />
        <a
          href="#form"
          className="tm-font-head absolute z-[6] flex items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7] transition-transform hover:scale-105"
          style={{ left: u(963), top: u(713), width: u(202), height: u(40), fontSize: u(14) }}
        >
          ОСТАВИТЬ ЗАЯВКУ
        </a>
      </div>
    </section>
  );
}
