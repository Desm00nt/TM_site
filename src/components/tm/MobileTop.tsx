"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { NAV, SHIFTS, type Shift } from "@/lib/tm";
import { MWAVES } from "@/lib/tm-waves-mobile";
import { um } from "./decor";
import ShiftModal from "./ShiftModal";

/**
 * Мобильная версия (макет Figma, ширина 402): блоки «hero → О нас → Почему родители → Смены».
 * Все координаты — глобальные пиксели мобильного макета, переводятся в cqw (um).
 */
const BLUE = "#256BC6";
const LIGHT = "#D9E3F4";
const DARK = "#3D3D3D";

interface MiProps {
  x: number;
  y: number;
  w: number;
  h?: number;
  rot?: number;
  src: string;
  z?: number;
  alt?: string;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}
/** изображение: левый верхний угол (x,y), ширина w, h — если нужно растянуть */
function Mi({ x, y, w, h, rot, src, z = 1, alt = "", radius, className = "", style }: MiProps) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      draggable={false}
      loading="lazy"
      className={`absolute max-w-none select-none ${className}`}
      style={{
        left: um(x),
        top: um(y),
        width: um(w),
        height: h ? um(h) : "auto",
        zIndex: z,
        transform: rot ? `rotate(${rot}deg)` : undefined,
        borderRadius: radius ? um(radius) : undefined,
        ...style,
      }}
    />
  );
}

/** фото-«полароид»: белая карточка с тенью и поворотом, центр (cx, cy) */
function PhotoCard({ cx, cy, w, h, rot, src, z, alt }: { cx: number; cy: number; w: number; h: number; rot: number; src: string; z: number; alt: string }) {
  return (
    <div
      className="absolute bg-[#FDFDFD]"
      style={{
        left: um(cx - w / 2),
        top: um(cy - h / 2),
        width: um(w),
        height: um(h),
        padding: um(6),
        transform: `rotate(${rot}deg)`,
        boxShadow: "0 2px 6px rgba(0,0,0,.18)",
        zIndex: z,
      }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
    </div>
  );
}

interface MtProps {
  x: number;
  y: number;
  size: number;
  lh?: number;
  color?: string;
  head?: boolean;
  weight?: number;
  align?: "left" | "center";
  z?: number;
  w?: number;
  as?: "p" | "h2" | "h3" | "div";
  children: ReactNode;
  style?: CSSProperties;
}
function Mt({ x, y, size, lh, color = DARK, head, weight, align, z = 3, w, as: Tag = "p", children, style }: MtProps) {
  return (
    <Tag
      className={`absolute whitespace-pre-line ${head ? "tm-font-head font-bold" : "tm-font-body font-medium"}`}
      style={{
        left: um(x),
        top: um(y),
        width: w ? um(w) : undefined,
        fontSize: um(size),
        lineHeight: um(lh ?? size * 1.22),
        color,
        fontWeight: weight,
        textAlign: align,
        zIndex: z,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function MWaveEl({ id, z = 2 }: { id: keyof typeof MWAVES; z?: number }) {
  const w = MWAVES[id];
  return (
    <svg
      aria-hidden
      viewBox={`0 0 402 ${w.h}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0"
      style={{ top: um(w.top), width: "100%", height: um(w.h), zIndex: z }}
    >
      <path d={w.d} fill={w.color} />
    </svg>
  );
}

const Block = ({ top, h, color, z = 0 }: { top: number; h: number; color: string; z?: number }) => (
  <div className="absolute left-0 w-full" style={{ top: um(top), height: um(h), background: color, zIndex: z }} />
);

const STATS = [
  { t: "27 лет опыта", img: "/images/texts/t_1-46.png", x: 281, y: 183, w: 68, ch: [268, 187] },
  { t: "1 место в рейтинге", img: "/images/texts/t_1-47.png", x: 152, y: 196, w: 112, ch: [138, 200] },
  { t: "более 32 000 детей", img: "/images/texts/t_1-48.png", x: 238, y: 222, w: 102, ch: [223, 222] },
];

const FEATURES = [
  {
    title: "Опыт и традиции", tx: 115, ty: 3149, icon: "/images/image_113_1-110.png", ib: [38.2, 3125, 74, 76],
    text: "27 лет мы создаём место,\nкуда дети хотят возвращаться.\nБолее 32 000 участников\nи десятки поколений друзей.",
    px: 66, py: 3199, ts: 14.2, tl: 17.6, photo: "/images/frag_image_119_1-121.png", phy: 3281,
    stat: "/images/texts/t_1-106.png", sw: 42, sy: 3429, st: "лет создаём\nвоспоминания", stx: 117, sty: 3433,
  },
  {
    title: "Команда", tx: 148, ty: 3508, icon: "/images/frag_image_114_1-111.png", ib: [60.2, 3487, 71.6, 63],
    text: "С детьми работают сертифицированные\nвожатые, победители конкурсов\n“Вожатый года” РТ и РФ,\nа преподаватели - признанные\nмастера своего дела.",
    px: 66, py: 3554, ts: 15, tl: 16.9, photo: "/images/frag_image_120_1-122.png", phy: 3656,
    stat: "/images/texts/t_1-107.png", sw: 98, sy: 3807, st: "вожатых обучены\nу нас", stx: 180, sty: 3807,
  },
  {
    title: "Комфорт и безопасность", tx: 115, ty: 3881, icon: "/images/frag_image_115_1-112.png", ib: [54.6, 3868, 51.7, 58],
    text: "Проживание в ГК “Регина”,\nнебольшие отряды, сбалансированное\nпитание, медицинское сопровождение\nи трансфер.",
    px: 66, py: 3932, ts: 14.3, tl: 17.5, photo: "/images/frag_image_121_1-123.png", phy: 4001,
    stat: "/images/texts/t_1-108.png", sw: 82, sy: 4147, st: "забота и поддержка\nна протяжении всей смены", stx: 160, sty: 4150,
  },
  {
    title: "Атмосфера, в которую\nхочется возвращаться", tx: 148, ty: 4223, icon: "/images/frag_image_116_1-113.png", ib: [68.9, 4207, 64.6, 65],
    text: "Дружба после смен, творчество,\nновые открытия и ощущение,\nчто ты здесь - часть чего-то важного.",
    px: 78, py: 4286, ts: 15, tl: 17.6, photo: "/images/frag_image_122_1-124.png", phy: 4355,
    stat: "/images/texts/t_1-109.png", sw: 52, sy: 4508, st: "ценных воспоминаний\nпосле смены", stx: 145, sty: 4511,
  },
];

export const MOBILE_TOP_HEIGHT = 5310;

export default function MobileTop() {
  const [menu, setMenu] = useState(false);
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState<Shift | null>(null);
  const s = SHIFTS[idx];
  const go = (d: number) => setIdx((i) => (i + d + SHIFTS.length) % SHIFTS.length);

  return (
    <div className="relative z-[1] overflow-hidden md:hidden [container-type:inline-size]" style={{ height: um(MOBILE_TOP_HEIGHT) }}>
      {/* ───── фоны ───── */}
      <Block top={0} h={800} color={LIGHT} />
      <img
        src="/images/frag_bumaga_1-13.png"
        alt=""
        aria-hidden
        className="absolute left-0 top-0 w-full object-cover opacity-60"
        style={{ height: um(800) }}
        draggable={false}
      />
      <Block top={790} h={1858} color={BLUE} z={1} />
      <Block top={2640} h={1915} color={LIGHT} z={0} />
      <Block top={4555} h={692} color={BLUE} z={1} />
      <Block top={5247} h={80} color={LIGHT} z={0} />
      <MWaveEl id="hero" />
      <MWaveEl id="about" />
      <MWaveEl id="shiftsTop" />
      <MWaveEl id="shiftsBottom" />

      {/* ───── HERO ───── */}
      <a href="#top" aria-label="Территория МЫ — на главную"  className="absolute z-[30]" style={{ left: um(27), top: um(14), width: um(37), height: um(54) }}>
        <img src="/images/frag_image_212_9-51.png" alt="Территория МЫ — логотип" className="h-full w-full object-contain" />
      </a>
      <button
        onClick={() => setMenu(true)}
        aria-label="Открыть меню"
        aria-expanded={menu}
        className="absolute z-[30]"
        style={{ left: um(332), top: um(18), width: um(44), height: um(32) }}
      >
        {[9, 16, 23].map((t) => (
          <span key={t} className="absolute block bg-[#256BC6]" style={{ left: um(8), top: um(t), width: um(29), height: um(2) }} />
        ))}
      </button>

      <Mt x={26} y={85} size={13.5} lh={18} style={{ whiteSpace: "pre-line" }}>
        {"Республиканский\nинтеллектуально-психологический лагерь"}
      </Mt>
      <h1
        className="tm-font-head absolute m-0 font-bold"
        style={{ left: um(26), top: um(122), fontSize: um(49.5), lineHeight: um(58), color: BLUE, zIndex: 3 }}
      >
        ТЕРРИТОРИЯ
        <br />
        МЫ
      </h1>

      {STATS.map((st) => (
        <div key={st.t}>
          <Mi src="/images/decor_Vector_13_1-34.png" x={st.ch[0]} y={st.ch[1]} w={12} z={3} />
          <Mi src={st.img} alt={st.t} x={st.x} y={st.y} w={st.w} z={3} />
        </div>
      ))}

      <Mi src="/images/frag_image_80_1-36.png" x={48} y={239} w={300} rot={-1.5} z={4} />
      <Mt x={107} y={275} size={16.3} lh={22} z={5}>
        {"Лагерь, где становятся\nличностью"}
      </Mt>
      <Mi src="/images/decor_Vector_4_1-38.png" x={107} y={316} w={126} z={5} />
      <Mi src="/images/frag_image_144_1-39.png" x={297} y={295} w={52} rot={10} z={5} />

      <Mi src="/images/frag_image_84_1-23.png" x={74} y={349} w={262} rot={-9.11} z={6} />
      <div
        className="absolute overflow-hidden"
        style={{ left: um(93), top: um(366), width: um(224), height: um(228), transform: "rotate(-9.11deg)", zIndex: 7 }}
      >
        <img src="/images/obschee_foto_1-24.webp" alt="Дети бегут на территории лагеря" className="h-full w-full object-cover" />
      </div>

      <a
        href="#form"
        className="tm-font-head absolute z-[8] flex items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7]"
        style={{ left: um(107), top: um(636), width: um(199), height: um(38), fontSize: um(14) }}
      >
        ОСТАВИТЬ ЗАЯВКУ
      </a>
      <a
        href="#shifts-m"
        className="tm-font-head absolute z-[8] flex items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7]"
        style={{ left: um(107), top: um(688), width: um(199), height: um(38), fontSize: um(14) }}
      >
        ПОДОБРАТЬ СМЕНУ
      </a>

      {/* ───── О НАС ───── */}
      <span id="about-m" className="absolute" style={{ top: um(780) }} />
      <Mt as="h2" x={40} y={816} size={30.5} lh={38} color={LIGHT} head z={4}>
        О НАС
      </Mt>
      <Mi src="/images/decor_Vector_16_1-79.png" x={40} y={853} w={128} z={4} />
      <Mi src="/images/frag_telegram-cloud-document-_1-114.png" x={332} y={798} w={125} z={9} className="tm-float" />
      <Mi src="/images/texts/t_1-81.png" alt="любимые значки из территории!" x={272} y={790} w={85} z={9} />

      {/* достижения */}
      <Mi src="/images/texts/t_1-65.png" alt="Территория достижений" x={45} y={893} w={180} z={5} />
      <Mi src="/images/frag_image_212_1-291.png" x={198} y={912} w={30} z={5} />
      <Mi src="/images/image_85_1-51.png" x={-0.5} y={880} w={402} z={2} />
      <Mt x={73} y={988} size={14} lh={18} z={4}>{"1 место в рейтинге\nлагерей Татарстана"}</Mt>
      <Mt x={73} y={1044} size={14} lh={18} z={4}>
        Более <span style={{ color: "#EC812D" }}>70 наград</span> в конкурсах{"\n"}по летнему отдыху
      </Mt>
      <Mt x={73} y={1100} size={14} lh={18} z={4}>{"Более 357 актуальных смен\nи 774 уникальных проектов"}</Mt>
      <Mt x={73} y={1157} size={14} lh={18} z={4}>{"Более 32 607 счастливых\nучастников смен"}</Mt>
      <Mi src="/images/frag_image_126_1-126.png" x={297} y={1244} w={75} z={3} />

      {/* креативность */}
      <Mi src="/images/texts/t_1-64.png" alt="Территория креативности" x={98} y={1288} w={200} z={5} />
      <Mi src="/images/frag_image_217_1-292.png" x={75} y={1283} w={38} h={63} z={5} />
      <Mi src="/images/image_92_1-62.png" x={47} y={1337} w={321} z={2} />
      <Mt x={74} y={1368} size={14} lh={17.5} z={4} w={140}>{"Насыщенная\nразнообразная\nпрограмма"}</Mt>
      <Mt x={72} y={1429} size={14} lh={17.5} z={4}>{"Яркие уникальные события,\nавторские мероприятия"}</Mt>
      <Mt x={70} y={1469} size={14} lh={17.5} z={4}>{"Ролевые игры, квесты,\nреалити-шоу, Dance-battle"}</Mt>
      <Mt x={68} y={1511} size={14} lh={17.5} z={4}>{"Фестивали, стратегические\nи детективные игры,\nвечёрки-театрализации,\nкомандные чемпионаты"}</Mt>
      <Mi src="/images/texts/t_1-80.png" alt="+ 100 друзей" x={232} y={1566} w={72} z={4} />

      {/* сплочение */}
      <Mi src="/images/texts/t_1-66.png" alt="Территория сплочения" x={108} y={1672} w={170} z={5} />
      <Mi src="/images/image_93_1-32.png" x={38} y={1680} w={300} h={280} z={2} />
      <Mt x={107} y={1768} size={14} lh={17.5} z={4}>{"Атмосфера доверия\nи поддержки"}</Mt>
      <Mt x={110} y={1825} size={14} lh={17.5} z={4}>{"Любимые всеми\nтрадиции"}</Mt>
      <Mt x={110} y={1884} size={14} lh={17.5} z={4}>Командный дух</Mt>
      <Mi src="/images/frag_IMG_6328_(1)_1_1-115.png" x={299} y={1896} w={97} h={117} z={6} className="tm-float" />

      {/* развитие */}
      <Mi src="/images/texts/t_1-67.png" alt="Территория развития" x={121} y={1994} w={161} z={5} />
      <Mi src="/images/frag_image_212_1-291.png" x={285} y={2007} w={22} z={5} />
      <Mi src="/images/image_94_1-31.png" x={45} y={2000} w={298} z={2} />
      <Mt x={89} y={2080} size={14.5} lh={18} z={4}>{"Большой выбор направлений\nдля самореализации"}</Mt>
      <Mt x={89} y={2138} size={14.5} lh={18} z={4}>Тренинги, мастер-классы</Mt>
      <Mt x={89} y={2180} size={14.5} lh={18} z={4}>{"Личностный рост каждого\nребёнка"}</Mt>

      {/* комфорт */}
      <Mi src="/images/texts/t_1-68.png" alt="Территория комфорта" x={101} y={2298} w={170} z={5} />
      <Mi src="/images/frag_image_214_1-295.png" x={80} y={2343} w={34} z={5} />
      <Mi src="/images/frag_image_128_1-128.png" x={22} y={2285} w={68} h={54} z={5} />
      <Mi src="/images/image_97_1-45.png" x={63.9} y={2282.9} w={255} h={377} rot={9} z={2} />
      <Mt x={115} y={2395} size={14.5} lh={18} z={4}>Отряды по 12-13 человек</Mt>
      <Mt x={115} y={2435} size={14.5} lh={18} z={4}>{"4 возрастные группы\n(1-3, 4-5, 6-7 и 8-11 классы)"}</Mt>
      <Mt x={115} y={2479} size={14.5} lh={18} z={4}>{"Комфортные условия\nразмещения (ГК \"Регина\")"}</Mt>
      <Mi src="/images/frag_IMG_6326_(1)_1_1-116.png" x={19} y={2519} w={115} h={124} z={6} className="tm-float" />
      <Mi src="/images/texts/t_1-82.png" alt="хочу стать героем дня и получить галстук!" x={205} y={2580} w={105} z={11} />
      <Mi src="/images/frag_galstuk_1-42.png" x={243} y={2333} w={309} h={414} z={10} />

      {/* ───── ПОЧЕМУ РОДИТЕЛИ ───── */}
      <span id="why-m" className="absolute" style={{ top: um(2690) }} />
      <Mt as="h2" x={30} y={2732} size={30.2} lh={40} head z={4}>ПОЧЕМУ РОДИТЕЛИ</Mt>
      <Mi src="/images/texts/t_1-69.png" alt="выбирают нас" x={30} y={2775} w={250} z={4} />
      <Mt x={30} y={2814} size={13.5} lh={17.8} z={4}>
        {"Мы создаём среду, где ребёнок чувствует\nсебя важным, раскрывает таланты\nи находит друзей на всю жизнь, а родители\nмогут быть спокойны."}
      </Mt>
      <Mi src="/images/texts/t_1-72.png" alt="лето, которое помнят" x={295} y={2866} w={80} z={5} />
      <PhotoCard cx={76} cy={3011} w={92} h={144} rot={-17} src="/images/frag_telegram-cloud-photo-siz_1-118.png" z={3} alt="Дети в лагере" />
      <PhotoCard cx={317} cy={2998} w={116} h={159} rot={11.6} src="/images/frag_image_117_1-117.png" z={3} alt="Выступление на сцене" />
      <PhotoCard cx={192} cy={2978} w={180} h={160} rot={-3} src="/images/frag_image_118_1-119.png" z={4} alt="Отряд в лагере" />
      <Mi src="/images/texts/t_1-86.png" alt="хочу скорее на свечку с отрядом!" x={168} y={3066} w={100} z={5} />
      <Mi src="/images/frag_image_125_1-127.png" x={166} y={3060} w={52} z={6} />

      <Mi src="/images/m_vec_left.png" x={0} y={3400} w={40} h={1174} z={1} />
      <Mi src="/images/m_vec_right.png" x={370} y={3830} w={32} h={632} z={1} />
      <Mi src="/images/frag_image_128_1-136.png" x={291} y={3194} w={96} h={75} z={3} />
      {FEATURES.map((f) => (
        <div key={f.title}>
          <Mi src={f.icon} x={f.ib[0]} y={f.ib[1]} w={f.ib[2]} h={f.ib[3]} z={3} />
          <Mt as="h3" x={f.tx} y={f.ty} size={20} lh={22.4} head z={3}>{f.title}</Mt>
          <Mt x={f.px} y={f.py} size={f.ts} lh={f.tl} z={3}>{f.text}</Mt>
          <Mi src={f.photo} x={f.px} y={f.phy} w={270} h={140} radius={8} z={3} />
          <Mi src={f.stat} x={f.px + 2} y={f.sy} w={f.sw} z={3} />
          <Mt x={f.stx} y={f.sty} size={14} lh={17} z={3}>{f.st}</Mt>
        </div>
      ))}
      <Mi src="/images/frag_IMG_6325_(1)_1_1-169.png" x={281} y={4532} w={82} h={97} z={12} className="tm-float" />

      {/* ───── ЛЕТНИЕ СМЕНЫ ───── */}
      <span id="shifts-m" className="absolute" style={{ top: um(4600) }} />
      <Mt as="h2" x={30} y={4644} size={30} lh={36} color={LIGHT} head z={4}>ОСЕННЯЯ СМЕНА</Mt>
      <Mt x={30} y={4697} size={14.2} lh={17.6} color={LIGHT} z={4}>
        {"Каждая смена - это новая история,\nнасыщенная событиями, друзьями\nи открытиями."}
      </Mt>
      <Mt x={294} y={4738} size={10.5} lh={13} color={LIGHT} z={4} style={{ transform: "rotate(-8deg)", transformOrigin: "left top", fontFamily: "var(--font-hand)", fontWeight: 500 }}>
        {"выберите свои\nканикулы с нами!"}
      </Mt>
      <Mi src="/images/frag_image_144_1-176.png" x={237} y={4737} w={46} z={4} />
      <Mi src="/images/frag_IMG_6323_(1)_1_1-170.png" x={294} y={4645} w={86} h={73} z={6} className="tm-float" />

      {/* карточка-карусель */}
      <div
        className="absolute z-[4] box-border border-2 border-[#F8F8F7]"
        style={{ left: um(69), top: um(4788), width: um(259), height: um(378), borderRadius: um(10) }}
      />
      <img
        src={s.cardPhoto}
        alt={s.cardTitle.replace("\n", " ")}
        className="absolute z-[5] object-cover"
        style={{ left: um(82), top: um(4803), width: um(232), height: um(155), borderRadius: um(6) }}
      />
      <Mt x={86} y={4976} size={21} lh={24} color={LIGHT} head z={5} as="h3">{s.cardTitle}</Mt>
      <Mt x={86} y={5029} size={15} lh={17.5} color={LIGHT} z={5} w={210}>{s.cardDesc}</Mt>
      <button
        onClick={() => setActive(s)}
        className="tm-font-head absolute z-[6] flex items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7]"
        style={{ left: um(105), top: um(5092), width: um(181), height: um(45), fontSize: um(14) }}
      >
        ПОДРОБНЕЕ
      </button>
      {SHIFTS.length > 1 && ([-1, 1] as const).map((d) => (
        <button
          key={d}
          onClick={() => go(d)}
          aria-label={d < 0 ? "Предыдущая смена" : "Следующая смена"}
          className="absolute z-[6] flex items-center justify-center rounded-full bg-white/20 text-[#D9E3F4]"
          style={{ left: um(d < 0 ? 11 : 343), top: um(4978), width: um(40), height: um(30) }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ transform: d < 0 ? undefined : "scaleX(-1)" }}>
            <path d="M15 6c-3-2-8-1-9 3s2 6 5 5" />
            <path d="M8 3 5.5 6.5 9.5 8" />
          </svg>
        </button>
      ))}
      <Mi src="/images/texts/t_1-87.png" alt="нажми!" x={143} y={5190} w={55} z={5} />
      <Mi src="/images/frag_image_144_1-177.png" x={134} y={5164} w={34} rot={-75} z={5} />

      <ShiftModal shift={active} onClose={() => setActive(null)} />

      {/* ───── бургер-меню ───── */}
      {menu && (
        <div className="fixed inset-0 z-[90] md:hidden" role="dialog" aria-modal="true" aria-label="Меню">
          <button aria-label="Закрыть меню" className="absolute inset-0 bg-black/60" onClick={() => setMenu(false)} />
          <nav
            aria-label="Мобильная навигация"
            className="absolute right-0 top-0 h-full bg-[#256BC6]"
            style={{ width: "40.5vw", minWidth: 150 }}
          >
            <button onClick={() => setMenu(false)} aria-label="Закрыть" className="absolute right-3 top-2 text-3xl leading-none text-[#F8F8F7]">
              ×
            </button>
            <ul className="tm-font-body m-0 list-none p-0 pl-[6.5vw] pt-[11vw] text-[16px] font-medium text-[#F8F8F7]">
              {NAV.map((n) => (
                <li key={n.href} className="py-[2.2vw]">
                  <a href={["#about","#shifts"].includes(n.href) ? n.href + "-m" : n.href} onClick={() => setMenu(false)} className="block">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
