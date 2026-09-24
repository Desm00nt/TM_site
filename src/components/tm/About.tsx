"use client";

import { Deco, Hand, Reveal } from "./decor";
import { u } from "@/lib/tm";

const Y = -671; // сдвиг к началу секции

const PAPERS = {
  reach: { img: "/images/frag_image_85_1-51.png", x: 69, y: 789, w: 581, h: 532 },
  creat: { img: "/images/image_92_1-62.png", x: 703, y: 1072, w: 497, h: 487 },
  unite: { img: "/images/image_93_1-32.png", x: 65, y: 1419, w: 505, h: 507 },
  grow: { img: "/images/image_94_1-31.png", x: 650, y: 1682, w: 463, h: 463 },
  comfort: { img: "/images/frag_image_97_1-45.png", x: 108, y: 2070, w: 568, h: 576 },
};

/** Текст на бумажке: координаты в дизайн-пикселях страницы */
function PaperText({
  x,
  y,
  size = 20,
  lh = 24.4,
  weight = 500,
  children,
  z = 4,
}: {
  x: number;
  y: number;
  size?: number;
  lh?: number;
  weight?: 400 | 500;
  children: React.ReactNode;
  z?: number;
}) {
  return (
    <p
      className={`tm-font-body absolute ${weight === 500 ? "font-medium" : "font-normal"} text-[#3D3D3D]`}
      style={{ left: u(x), top: u(y + Y), fontSize: u(size), lineHeight: u(lh), zIndex: z }}
    >
      {children}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-[5] bg-[#256BC6]">
      {/* ===== DESKTOP: коллаж как в макете ===== */}
      <div className="relative hidden h-full md:block [container-type:inline-size]" style={{ height: u(1933) }}>
        {/* наклейки и декор */}
        <Deco x={898} y={690 + Y} w={252} h={294} src="/images/frag_telegram-cloud-document-_1-114.png" z={6} className="tm-float" />
        <Hand x={877} y={758 + Y} w={117} file="/images/texts/t_1-81.png" text="любимые значки из территории!" z={7} />
        <Deco x={767} y={780 + Y} w={133} h={132} src="/images/frag_image_126_1-126.png" z={6} />

        {/* Территория достижений */}
        <Deco {...PAPERS.reach} y={PAPERS.reach.y + Y} src={PAPERS.reach.img} z={1} />
        <Hand x={106} y={808 + Y} w={334} file="/images/texts/t_1-65.png" text="Территория достижений" />
        <Deco x={465} y={808 + Y} w={71} h={67} src="/images/frag_image_212_1-291.png" z={5} />
        <PaperText x={205} y={953}>
          1 место в рейтинге
          <br />
          лагерей Татарстана
        </PaperText>
        <PaperText x={205} y={1023} weight={400}>
          Более <span className="text-[#EC812D]">70 наград</span> в конкурсах
          <br />
          по летнему отдыху
        </PaperText>
        <PaperText x={205} y={1091}>
          Более 357 актуальных смен
          <br />
          и 774 уникальных проектов
        </PaperText>
        <PaperText x={205} y={1165}>
          Более 32 607 счастливых
          <br />
          участников смен
        </PaperText>

        {/* Территория креативности */}
        <Deco {...PAPERS.creat} y={PAPERS.creat.y + Y} src={PAPERS.creat.img} z={1} />
        <Hand x={726} y={952 + Y} w={360} file="/images/texts/t_1-64.png" text="Территория креативности" />
        <Deco x={695} y={979 + Y} w={119} h={120} src="/images/frag_image_217_1-292.png" z={2} />
        <PaperText x={738} y={1112}>
          Насыщенная
          <br />
          разнообразная
          <br />
          программа
        </PaperText>
        <PaperText x={735} y={1203}>
          Яркие уникальные события,
          <br />
          авторские мероприятия
        </PaperText>
        <PaperText x={732} y={1269}>
          Ролевые игры, квесты,
          <br />
          реалити-шоу, Dance-battle
        </PaperText>
        <PaperText x={726} y={1335}>
          Фестивали, стратегические
          <br />
          и детективные игры,
          <br />
          вечёрки-театрализации.
          <br />
          командные чемпионаты
        </PaperText>

        {/* Территория сплочения */}
        <Deco {...PAPERS.unite} y={PAPERS.unite.y + Y} src={PAPERS.unite.img} z={1} />
        <Hand x={153} y={1393 + Y} w={306} file="/images/texts/t_1-66.png" text="Территория сплочения" />
        <Deco x={100} y={1419 + Y} w={104} h={110} src="/images/frag_image_215_1-293.png" z={5} />
        <Hand x={534} y={1553 + Y} w={90} file="/images/texts/t_1-80.png" text="+ 100 друзей" />
        <PaperText x={210} y={1585}>
          Атмосфера доверия
          <br />
          и поддержки
        </PaperText>
        <PaperText x={213} y={1663}>
          Любимые всеми
          <br />
          традиции
        </PaperText>
        <PaperText x={213} y={1741}>
          Командный дух
        </PaperText>

        {/* Территория развития */}
        <Deco {...PAPERS.grow} y={PAPERS.grow.y + Y} src={PAPERS.grow.img} z={1} />
        <Hand x={766} y={1633 + Y} w={295} file="/images/texts/t_1-67.png" text="Территория развития" />
        <Deco x={1046} y={1665 + Y} w={85} h={116} src="/images/frag_image_213_1-294.png" z={5} />
        <PaperText x={730} y={1801}>
          Большой выбор направлений
          <br />
          для самореализации
        </PaperText>
        <PaperText x={730} y={1890}>
          Тренинги, мастер-классы
        </PaperText>
        <PaperText x={730} y={1955}>
          Личностный рост каждого
          <br />
          ребёнка
        </PaperText>

        {/* Территория комфорта */}
        <Deco {...PAPERS.comfort} y={PAPERS.comfort.y + Y} src={PAPERS.comfort.img} z={1} />
        <Hand x={216} y={2086 + Y} w={313} file="/images/texts/t_1-68.png" text="Территория комфорта" />
        <Deco x={142} y={2136 + Y} w={136} h={102} src="/images/frag_image_214_1-295.png" z={5} />
        <PaperText x={242} y={2258}>
          Отряды по 12-13 человек
        </PaperText>
        <PaperText x={241} y={2323}>
          4 возрастные группы
          <br />
          (1-3, 4-5, 6-7 и 8-11 классы)
        </PaperText>
        <PaperText x={242} y={2412}>
          Комфортные условия
          <br />
          размещения (ГК &quot;Регина&quot;)
        </PaperText>

        {/* стикеры */}
        <Deco x={316} y={1836 + Y} w={200} h={218} src="/images/frag_IMG_6328_(1)_1_1-115.png" z={6} className="tm-float" />
        <Deco x={684} y={2127 + Y} w={167} h={188} src="/images/frag_IMG_6326_(1)_1_1-116.png" z={6} className="tm-float" />
        {/* блёстка и рукописная подпись у галстука */}
        <Deco x={516} y={1340 + Y} w={109} h={92} src="/images/frag_image_128_1-128.png" z={2} />
        <Hand x={853} y={2260 + Y} w={158} file="/images/texts/t_1-82.png" text="хочу стать героем дня и получить галстук!" z={7} />
        {/* галстук — заходит на следующую секцию */}
        <Deco x={768} y={1844 + Y} w={714} h={956} src="/images/frag_galstuk_1-42.png" z={10} />

        {/* заголовок */}
        <Reveal
          as="h2"
          className="tm-font-head absolute font-bold text-[#D9E3F4]"
          style={{ left: u(108), top: u(728 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          О НАС
        </Reveal>
        <Deco x={99} y={771 + Y} w={195} src="/images/decor_Vector_16_1-79.png" z={2} />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-5 py-12 md:hidden">
        <Reveal as="h2" className="tm-font-head text-4xl font-bold text-[#D9E3F4]">
          О НАС
        </Reveal>
        <Reveal as="p" className="tm-font-body mt-2 text-base font-medium text-[#D9E3F4]/90">
          Пять территорий, где ребёнок растёт, творит, дружит и отдыхает
        </Reveal>

        <div className="mt-8 flex flex-col gap-10">
          {/* Достижения */}
          <Reveal>
            <img src="/images/texts/t_1-65.png" alt="Территория достижений" className="h-auto w-[80%]" />
            <div className="relative mt-2">
              <img src={PAPERS.reach.img} alt="" aria-hidden className="h-auto w-full" />
              <div className="absolute left-[22%] top-[26%] space-y-3">
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">1 место в рейтинге<br />лагерей Татарстана</p>
                <p className="tm-font-body text-[3.4vw] leading-snug text-[#3D3D3D]">Более <span className="font-medium text-[#EC812D]">70 наград</span> в конкурсах<br />по летнему отдыху</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Более 357 актуальных смен<br />и 774 уникальных проектов</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Более 32 607 счастливых<br />участников смен</p>
              </div>
            </div>
          </Reveal>

          {/* Креативность */}
          <Reveal>
            <img src="/images/texts/t_1-64.png" alt="Территория креативности" className="ml-auto h-auto w-[86%]" />
            <div className="relative mt-2">
              <img src={PAPERS.creat.img} alt="" aria-hidden className="h-auto w-full" />
              <div className="absolute left-[7%] top-[14%] space-y-3">
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Насыщенная разнообразная программа</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Яркие уникальные события, авторские мероприятия</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Ролевые игры, квесты, реалити-шоу, Dance-battle</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Фестивали, стратегические и детективные игры, вечёрки-театрализации, командные чемпионаты</p>
              </div>
            </div>
          </Reveal>

          {/* Сплочение */}
          <Reveal>
            <img src="/images/texts/t_1-66.png" alt="Территория сплочения" className="h-auto w-[78%]" />
            <div className="relative mt-2">
              <img src={PAPERS.unite.img} alt="" aria-hidden className="h-auto w-full" />
              <div className="absolute left-[28%] top-[24%] space-y-3">
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Атмосфера доверия<br />и поддержки</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Любимые всеми традиции</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Командный дух</p>
              </div>
              <img src="/images/texts/t_1-80.png" alt="+ 100 друзей" className="absolute -right-1 top-[62%] h-auto w-[18%]" />
            </div>
          </Reveal>

          {/* Развитие */}
          <Reveal>
            <img src="/images/texts/t_1-67.png" alt="Территория развития" className="ml-auto h-auto w-[74%]" />
            <div className="relative mt-2">
              <img src={PAPERS.grow.img} alt="" aria-hidden className="h-auto w-full" />
              <div className="absolute left-[16%] top-[26%] space-y-3">
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Большой выбор направлений<br />для самореализации</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Тренинги, мастер-классы</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Личностный рост каждого ребёнка</p>
              </div>
            </div>
          </Reveal>

          {/* Комфорт */}
          <Reveal>
            <img src="/images/texts/t_1-68.png" alt="Территория комфорта" className="h-auto w-[80%]" />
            <div className="relative mt-2">
              <img src={PAPERS.comfort.img} alt="" aria-hidden className="h-auto w-full" />
              <div className="absolute left-[24%] top-[24%] space-y-3">
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Отряды по 12-13 человек</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">4 возрастные группы<br />(1-3, 4-5, 6-7 и 8-11 классы)</p>
                <p className="tm-font-body text-[3.4vw] font-medium leading-snug text-[#3D3D3D]">Комфортные условия<br />размещения (ГК &quot;Регина&quot;)</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
