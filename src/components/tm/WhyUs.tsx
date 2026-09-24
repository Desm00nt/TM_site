"use client";

import { Deco, Hand, Reveal, Wave }
from "./decor";
import { u } from "@/lib/tm";

const Y = -2604;

interface Feature {
  title: string;
  titleX: number;
  titleY: number;
  icon: string;
  iconX: number;
  iconY: number;
  iconW: number;
  text: string;
  textX: number;
  textY: number;
  textW?: number;
  photo: string;
  photoX: number;
  photoY: number;
  photoW: number;
  photoH: number;
  stat: string;
  statImg: string;
  statW: number;
  statX: number;
  statY: number;
  statText: string;
  statTextX: number;
}

const FEATURES: Feature[] = [
  {
    title: "Опыт и традиции",
    titleX: 283, titleY: 3170,
    icon: "/images/image_113_1-110.png", iconX: 207, iconY: 3144, iconW: 73,
    text: "27 лет мы создаём место,\nкуда дети хотят возвращаться.\nБолее 32 000 участников\nи десятки поколений друзей.",
    textX: 224, textY: 3216,
    photo: "/images/frag_image_119_1-121.png", photoX: 224, photoY: 3300, photoW: 269, photoH: 140,
    stat: "27", statImg: "/images/texts/t_1-106.png", statW: 37, statX: 224, statY: 3454,
    statText: "лет создаём\nвоспоминания", statTextX: 275,
  },
  {
    title: "Команда",
    titleX: 804, titleY: 3163,
    icon: "/images/frag_image_114_1-111.png", iconX: 716, iconY: 3141, iconW: 73,
    text: "С детьми работают сертифицированные\nвожатые, победители конкурсов “Вожатый\nгода” РТ и РФ, а преподаватели - признанные\nмастера своего дела.",
    textX: 725, textY: 3217,
    photo: "/images/frag_image_120_1-122.png", photoX: 724, photoY: 3300, photoW: 270, photoH: 140,
    stat: "100+", statImg: "/images/texts/t_1-107.png", statW: 87, statX: 725, statY: 3454,
    statText: "вожатых обучены\nу нас", statTextX: 829,
  },
  {
    title: "Комфорт и безопасность",
    titleX: 283, titleY: 3573,
    icon: "/images/frag_image_115_1-112.png", iconX: 224, iconY: 3561, iconW: 49,
    text: "Проживание в ГК “Регина”, небольшие\nотряды, сбалансированное питание,\nмедицинское сопровождение и трансфер.",
    textX: 231, textY: 3626,
    photo: "/images/frag_image_121_1-123.png", photoX: 231, photoY: 3694, photoW: 270, photoH: 140,
    stat: "24/7", statImg: "/images/texts/t_1-108.png", statW: 71, statX: 231, statY: 3848,
    statText: "забота и поддержка\nна протяжении всей смены", statTextX: 335,
  },
  {
    title: "Атмосфера, в которую\nхочется возвращаться",
    titleX: 804, titleY: 3562,
    icon: "/images/frag_image_116_1-113.png", iconX: 724, iconY: 3547, iconW: 73,
    text: "Дружба после смен, творчество, новые\nоткрытия и ощущение, что ты\nздесь - часть чего-то важного.",
    textX: 729, textY: 3626,
    photo: "/images/frag_image_122_1-124.png", photoX: 729, photoY: 3694, photoW: 246, photoH: 140,
    stat: "∞", statImg: "/images/texts/t_1-109.png", statW: 47, statX: 729, statY: 3841,
    statText: "ценных воспоминаний\nпосле смены", statTextX: 797,
  },
];

function FeatureBlock({ f }: { f: Feature }) {
  return (
    <Reveal className="absolute inset-0" >
      <div className="absolute" style={{ left: u(f.iconX), top: u(f.iconY + Y), width: u(f.iconW) }}>
        <img src={f.icon} alt="" aria-hidden className="h-auto w-full" />
      </div>
      <h3
        className="tm-font-head absolute z-[3] font-bold text-[#3D3D3D]"
        style={{ left: u(f.titleX), top: u(f.titleY + Y), fontSize: u(20), lineHeight: u(22.4) }}
      >
        {f.title.split("\n").map((line, i) => (
          <span key={i} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h3>
      <p
        className="tm-font-body absolute z-[2] font-medium text-[#3D3D3D]"
        style={{ left: u(f.textX), top: u(f.textY + Y), fontSize: u(15), lineHeight: u(18.3) }}
      >
        {f.text.split("\n").map((line, i) => (
          <span key={i} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </p>
      <img
        src={f.photo}
        alt=""
        aria-hidden
        className="absolute"
        style={{ left: u(f.photoX), top: u(f.photoY + Y), width: u(f.photoW), height: u(f.photoH) }}
      />
      <img
        src={f.statImg}
        alt={f.stat}
        className="absolute h-auto"
        style={{ left: u(f.statX), top: u(f.statY + Y), width: u(f.statW) }}
      />
      <p
        className="tm-font-body absolute font-medium text-[#3D3D3D]"
        style={{ left: u(f.statTextX), top: u(f.statY + Y + 3), fontSize: u(15), lineHeight: u(18.3) }}
      >
        {f.statText.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </Reveal>
  );
}

export default function WhyUs() {
  return (
    <section id="why" className="relative z-[1] bg-[#D9E3F4]">
      <Wave id="1:22" y0={2604} />

      {/* ===== DESKTOP ===== */}
      <div className="relative hidden md:block [container-type:inline-size]" style={{ height: u(1373) }}>
        <Reveal
          as="h2"
          className="tm-font-head absolute whitespace-nowrap font-bold text-[#3D3D3D]"
          style={{ left: u(90), top: u(2684 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          ПОЧЕМУ РОДИТЕЛИ
        </Reveal>
        <Hand x={87} y={2742 + Y} w={449} file="/images/texts/t_1-69.png" text="выбирают нас" z={3} />
        <Reveal
          as="p"
          className="tm-font-body absolute font-medium text-[#3D3D3D]"
          style={{ left: u(109), top: u(2838 + Y), fontSize: u(20), lineHeight: u(24.4) }}
        >
          Мы создаём среду, где ребёнок чувствует себя
          <br />
          важным, раскрывает таланты и находит друзей
          <br />
          на всю жизнь, а родители могут быть спокойны.
        </Reveal>

        {/* стопка полароидов — вырезки 1:1 из рендера макета */}
        <Deco x={634} y={2795 + Y} w={327} h={292} src="/images/rc_1-118.png" z={1} />
        <Deco x={765} y={2787 + Y} w={281} h={263} src="/images/rc_1-119.png" z={2} />
        <Deco x={859} y={2779 + Y} w={348} h={300} src="/images/rc_1-117.png" z={3} />
        <Deco x={612} y={3022 + Y} w={101} h={118} src="/images/frag_image_128_1-129.png" z={4} mobile="show" />
        <Deco x={1101} y={3027 + Y} w={113} h={114} src="/images/frag_image_128_1-130.png" z={4} mobile="show" />

        <Hand x={178} y={2965 + Y} w={203} file="/images/texts/t_1-72.png" text="лето, которое помнят" />
        <Deco x={177} y={2992 + Y} w={257} src="/images/decor_Vector_17_1-120.png" z={1} />
        <Deco x={515} y={3340 + Y} w={142} h={100} src="/images/frag_image_128_1-136.png" z={1} mobile="show" />

        {FEATURES.map((f) => (
          <FeatureBlock key={f.title} f={f} />
        ))}

        <Hand x={559} y={3741 + Y} w={155} file="/images/texts/t_1-86.png" text="хочу скорее на свечку с отрядом!" />
        <Deco x={577} y={3706 + Y} w={86} h={82} src="/images/frag_image_125_1-127.png" z={1} />
        <Deco x={109} y={3198 + Y} w={45} src="/images/decor_Vector_18_1-131.png" z={1} />
        <Deco x={1105} y={3188 + Y} w={57} src="/images/decor_Vector_19_1-132.png" z={1} />
        {/* капибара заходит на секцию смен */}
        <Deco x={838} y={3882 + Y} w={226} h={241} src="/images/frag_IMG_6325_(1)_1_1-169.png" z={12} className="tm-float" />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-5 py-12 md:hidden">
        <Reveal as="h2" className="tm-font-head text-4xl font-bold leading-tight text-[#3D3D3D]">
          ПОЧЕМУ РОДИТЕЛИ
        </Reveal>
        <img src="/images/texts/t_1-69.png" alt="выбирают нас" className="mt-1 h-auto w-[70%]" />
        <Reveal as="p" className="tm-font-body mt-4 text-base font-medium text-[#3D3D3D]">
          Мы создаём среду, где ребёнок чувствует себя важным, раскрывает таланты и находит друзей на всю жизнь, а родители могут быть спокойны.
        </Reveal>

        <div className="mt-6 flex justify-center gap-1">
          <img src="/images/frag_telegram-cloud-photo-siz_1-118.png" alt="Дети в лагере" className="h-auto w-[38%] -rotate-6 shadow-md" />
          <img src="/images/frag_image_118_1-119.png" alt="Отряд в лагере" className="h-auto w-[34%] rotate-3 shadow-md" />
          <img src="/images/frag_image_117_1-117.png" alt="Выступление" className="h-auto w-[40%] -rotate-2 shadow-md" />
        </div>

        <img src="/images/texts/t_1-72.png" alt="лето, которое помнят" className="mt-8 h-auto w-[52%]" />

        <div className="mt-6 flex flex-col gap-8">
          {FEATURES.map((f) => (
            <Reveal key={f.title} className="flex gap-3">
              <img src={f.icon} alt="" aria-hidden className="h-10 w-10 shrink-0 object-contain" />
              <div>
                <h3 className="tm-font-head text-lg font-bold leading-snug text-[#3D3D3D]">{f.title}</h3>
                <p className="tm-font-body mt-1 text-sm font-medium leading-snug text-[#3D3D3D]">
                  {f.text.replace(/\n/g, " ")}
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <img src={f.photo} alt="" aria-hidden className="h-auto w-[46%] rounded-lg shadow" />
                  <div className="flex items-center gap-1.5">
                    <img src={f.statImg} alt={f.stat} className="h-6 w-auto" />
                    <span className="tm-font-body text-[11px] font-medium leading-tight text-[#3D3D3D]">
                      {f.statText.replace(/\n/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
