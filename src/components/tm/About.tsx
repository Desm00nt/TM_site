"use client";

import { Deco, Fig, Hand, Reveal } from "./decor";
import { u } from "@/lib/tm";

const Y = -671; // сдвиг к началу секции

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
        <Fig box={[898.046, 690 + Y, 252.085, 293.651]} inner={[203.705, 257.401]} rot={11.81} src="/images/telegram-cloud-document-2-5237_1-114.png" crop={{ h: 223.09, l: -52.99, t: -54.36, w: 211.42 }} shadow={[0, 4, 4, "rgba(0,0,0,0.1)"]} z={6} className="tm-float" />
        <Hand x={877} y={758 + Y} w={117} file="/images/texts/t_1-81.png" text="любимые значки из территории!" z={7} />
        <Fig box={[766.954, 780 + Y, 132.527, 131.79]} inner={[110, 109]} rot={-13.59} src="/images/image_126_1-126.png" crop={{ h: 455.11, l: -148.25, t: -22.22, w: 673.68 }} z={6} />

        {/* Территория достижений */}
        <Fig box={[69, 789 + Y, 580.154, 524.862]} inner={[543.146, 482.816]} rot={-4.6} src="/images/image_85_1-51.png" crop={{ h: 125.55, l: 0, t: 0, w: 100 }} z={1} />
        <Hand x={106} y={808 + Y} w={334} file="/images/texts/t_1-65.png" text="Территория достижений" />
        <Fig box={[464.954, 808 + Y, 71, 67]} src="/images/image_212_1-291.png" crop={{ h: 225.55, l: -18.33, t: -15.42, w: 320 }} z={5} />
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
        <Fig box={[703, 1072 + Y, 497, 487]} src="/images/image_92_1-62.png" fit="cover" z={1} />
        <Hand x={726} y={952 + Y} w={360} file="/images/texts/t_1-64.png" text="Территория креативности" />
        <Fig box={[694.57, 978.53 + Y, 118.541, 119.552]} inner={[87.529, 82.724]} rot={126.44} src="/images/image_212_1-291.png" crop={{ h: 212.45, l: -187.25, t: -22.82, w: 301.18 }} z={2} />
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
        <Fig box={[65, 1419 + Y, 504.564, 506.894]} inner={[449.002, 451.712]} rot={-7.57} src="/images/image_93_1-32.png" fit="cover" z={1} />
        <Hand x={153} y={1393 + Y} w={306} file="/images/texts/t_1-66.png" text="Территория сплочения" />
        <Fig box={[99.734, 1419 + Y, 103.528, 109.667]} inner={[97.352, 54.168]} rot={129.23} src="/images/image_212_1-291.png" crop={{ h: 284.44, l: -126.89, t: -167.22, w: 237.4 }} z={5} />
        <Hand x={1006} y={1448 + Y} w={90.4} file="/images/texts/t_1-80.png" text="+ 100 друзей" />
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
        <Fig box={[650, 1682 + Y, 463, 463]} src="/images/image_94_1-31.png" fit="cover" opacity={0.97} z={1} />
        <Hand x={766} y={1633 + Y} w={295} file="/images/texts/t_1-67.png" text="Территория развития" />
        <Fig box={[1045.76, 1665.2 + Y, 85.363, 116.368]} inner={[59.076, 104.165]} rot={-15.91} src="/images/image_212_1-291.png" crop={{ h: 161.77, l: -170.19, t: -9.16, w: 427.86 }} z={5} />
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
        <Fig box={[107.744, 2069.63 + Y, 567.966, 575.982]} inner={[479.543, 489.829]} rot={11.56} src="/images/image_97_1-45.png" crop={{ h: 144.82, l: 0, t: -13.69, w: 100 }} z={1} />
        <Hand x={216} y={2086 + Y} w={313} file="/images/texts/t_1-68.png" text="Территория комфорта" />
        <Fig box={[141.954, 2136 + Y, 136.464, 102.253]} src="/images/image_212_1-291.png" crop={{ h: 316.05, l: -13.35, t: -196.91, w: 233.08 }} z={5} />
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
        <Fig box={[316, 1836 + Y, 200.278, 218.423]} inner={[162.776, 186.891]} rot={-12.86} src="/images/IMG_6328_(1)_1_1-115.png" crop={{ h: 300.29, l: -63.3, t: -89.37, w: 258.59 }} shadow={[0, 4, 4, "rgba(0,0,0,0.1)"]} z={6} className="tm-float" />
        <Fig box={[684, 2127 + Y, 167, 188]} src="/images/IMG_6326_(1)_1_1-116.png" fit="cover" pos="bottom" shadow={[0, 4, 4, "rgba(0,0,0,0.1)"]} z={6} className="tm-float" />
        {/* блёстка и рукописная подпись у галстука */}
        <Fig box={[515.954, 1340 + Y, 109, 92]} src="/images/image_144_1-39.png" crop={{ h: 843.2, l: -216.22, t: -400.8, w: 1008.11 }} z={2} />
        <Hand x={853} y={2260 + Y} w={158} file="/images/texts/t_1-82.png" text="хочу стать героем дня и получить галстук!" z={7} />
        {/* галстук — заходит на следующую секцию */}
        <Fig box={[767.954, 1844 + Y, 714, 956]} src="/images/galstuk_1-42.png" crop={{ h: 133.89, l: -18.49, t: -18.51, w: 134.45 }} z={10} />

        {/* заголовок */}
        <Reveal
          as="h2"
          className="tm-font-head absolute font-bold text-[#D9E3F4]"
          style={{ left: u(108), top: u(728 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          О НАС
        </Reveal>
        <Fig box={[98.974, 770.57 + Y, 194.931, 37.066]} inner={[194.189, 17.217]} rot={5.89} src="/images/decor_Vector_16_1-79.png" z={2} />
      </div>

    </section>
  );
}
