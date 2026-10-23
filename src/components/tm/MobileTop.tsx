"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { CONTACTS, FAQ, NAV, REVIEWS, SHIFTS } from "@/lib/tm";
import { formatPhone, isPhoneValid, sendLead } from "@/lib/lead";
import { useToast } from "@/hooks/use-toast";
import { AVATARS } from "./Reviews";
import { MWAVES } from "@/lib/tm-waves-mobile";
import { Fig, um } from "./decor";

/**
 * Мобильная версия (макет Figma «ТМ НЕ ЛЕТО моб», ширина 402) — вся страница целиком.
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

function MWaveEl({ id, z = 2, top }: { id: keyof typeof MWAVES; z?: number; top?: number }) {
  const w = MWAVES[id];
  return (
    <svg
      aria-hidden
      viewBox={`0 0 402 ${w.h}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0"
      style={{ top: um(top ?? w.top), width: "100%", height: um(w.h), zIndex: z }}
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

export const MOBILE_TOP_HEIGHT = 9675;

const W = "#F8F8F7";
const ORANGE = "#EC812D";
const HAND = "var(--font-hand)";

/** Рукописный текст шрифтом (для надписей, которых нет готовой картинкой) */
function Ht({ x, y, size, lh, color, w, rot, z = 4, align, nowrap, children }: {nowrap?: boolean;  x: number; y: number; size: number; lh?: number; color: string; w?: number; rot?: number; z?: number; align?: "left" | "center"; children: ReactNode }) {
  return (
    <p
      className="absolute m-0 whitespace-pre-line"
      style={{
        whiteSpace: nowrap ? "nowrap" : undefined,
        left: um(x),
        top: um(y),
        width: w ? um(w) : undefined,
        fontFamily: HAND,
        fontWeight: 500,
        fontSize: um(size),
        lineHeight: um(lh ?? size * 1.25),
        color,
        zIndex: z,
        textAlign: align,
        transform: rot ? `rotate(${rot}deg)` : undefined,
        transformOrigin: "left top",
      }}
    >
      {children}
    </p>
  );
}

/** Круглая кнопка-стрелка карусели (полупрозрачная плашка + белая стрелка) */
function ArrowBtn({ x, y, w, h, dir, onClick, label, gw }: { x: number; y: number; w: number; h: number; dir: "l" | "r"; onClick: () => void; label: string; gw: number }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="absolute z-[8] flex items-center justify-center bg-[#D9E3F4]/25 transition-colors hover:bg-[#D9E3F4]/40"
      style={{ left: um(x), top: um(y), width: um(w), height: um(h), borderRadius: um(Math.min(w, h) / 2) }}
    >
      <img src={dir === "l" ? "/images/decor_arrow_left_19-64.png" : "/images/decor_arrow_right_19-63.png"} alt="" aria-hidden style={{ width: um(gw), height: "auto" }} />
    </button>
  );
}

export default function MobileTop() {
  const [menu, setMenu] = useState(false);
  const { toast } = useToast();
  const wrapRef = useRef<HTMLDivElement>(null);

  // фото смены (стрелки листают фото)
  const shift = SHIFTS[0];
  const photos = [shift.bigPhoto, ...shift.smallPhotos];
  const [ph, setPh] = useState(0);

  // отзывы: по два на странице
  const ORDER = [1, 0, 2, 3, 4];
  const [rp, setRp] = useState(0);
  const slot1 = REVIEWS[ORDER[rp * 2]];
  const slot2 = ORDER[rp * 2 + 1] !== undefined ? REVIEWS[ORDER[rp * 2 + 1]] : null;
  const t1 = useRef<HTMLParagraphElement>(null);
  const t2 = useRef<HTMLParagraphElement>(null);
  const [h1, setH1] = useState(64);
  const [h2, setH2] = useState(80);

  // вопросы
  const [open, setOpen] = useState<number | null>(null);
  const aRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [ah, setAh] = useState(0);

  // форма
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [honey, setHoney] = useState("");

  // измеряем реальную высоту текстов в единицах макета (402px)
  useLayoutEffect(() => {
    const k = (wrapRef.current?.clientWidth ?? 402) / 402;
    if (t1.current) setH1(t1.current.offsetHeight / k);
    if (t2.current) setH2(t2.current.offsetHeight / k);
    if (open !== null && aRefs.current[open]) setAh(aRefs.current[open]!.offsetHeight / k);
  }, [rp, open]);

  // сдвиги нижних блоков из-за переменной высоты отзывов и раскрытого вопроса
  const g1 = Math.max(0, h1 - 64);
  const s2 = Math.max(0, g1 - 40); // слот 2 уезжает вниз, если первый отзыв длинный
  const g2 = slot2 ? Math.max(0, h2 - 80) : 0;
  const dR = s2 + g2;
  const rowOpenH = open !== null ? 47 + ah + 10.5 : 50;
  const dF = open !== null ? rowOpenH - 50 : 0;
  const R = (y: number) => y + (y >= 7340 ? dR : 0); // y после блока отзывов
  const F = (y: number) => R(y) + (y >= 7930 ? dF : 0); // y после блока вопросов
  const TOTAL = MOBILE_TOP_HEIGHT + dR + dF;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending || honey) return;
    if (!name.trim() || !isPhoneValid(phone)) {
      toast({ title: "Проверьте данные", description: "Укажите имя и номер телефона полностью — мы свяжемся с вами.", variant: "destructive" });
      return;
    }
    setSending(true);
    const r = await sendLead(name, phone);
    setSending(false);
    if (r === "sent") {
      toast({ title: "Заявка отправлена!", description: "Свяжемся с вами и поможем выбрать подходящую смену." });
      setName("");
      setPhone("");
    } else {
      toast({ title: "Не удалось отправить заявку", description: `Пожалуйста, позвоните нам: ${CONTACTS.phone}, или напишите в Telegram.`, variant: "destructive" });
    }
  };

  const FAQ_ROWS = [
    { y: 7628, x: 19, tx: 44, tw: 257, px: 337 },
    { y: 7699, x: 17, tx: 42, tw: 169, px: 335 },
    { y: 7770, x: 19, tx: 44, tw: 203, px: 337 },
    { y: 7841, x: 19, tx: 44, tw: 200, px: 337 },
  ];

  return (
    <div ref={wrapRef} className="relative z-[1] overflow-hidden md:hidden [container-type:inline-size]" style={{ height: um(TOTAL) }}>
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
      <Block top={4555} h={1622} color={BLUE} z={1} /> {/* смена: 4555 → 6177 */}
      <Block top={6177} h={TOTAL - 6177} color={LIGHT} z={0} />
      <Block top={6794} h={7445 + dR - 6794} color={BLUE} z={1} /> {/* отзывы */}
      <Block top={8157 + dR + dF} h={9209 + 4 - 8157} color={BLUE} z={1} /> {/* форма */}
      <MWaveEl id="hero" />
      <MWaveEl id="about" />
      <MWaveEl id="shiftsTop" />
      <MWaveEl id="shiftsBottom" top={6173} z={2} />
      <MWaveEl id="hero" top={6741} z={2} />
      <MWaveEl id="about" top={7437 + dR} z={2} />
      <MWaveEl id="hero" top={8104 + dR + dF} z={2} />
      <MWaveEl id="about" top={9205 + dR + dF} z={2} />

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
      <Mt x={107} y={278} size={16.75} lh={20.4} z={5}>
        {"Лагерь, где становятся\nличностью"}
      </Mt>
      <Mi src="/images/decor_Vector_4_1-38.png" x={107} y={312} w={125} z={5} />
      <Mi src="/images/frag_image_144_1-39.png" x={297} y={295} w={52} rot={10} z={5} />

      <Mi src="/images/frag_image_84_1-23.png" x={74} y={349} w={262} rot={-9.11} z={6} />
      <div
        className="absolute overflow-hidden"
        style={{ left: um(93), top: um(366), width: um(224), height: um(228), transform: "rotate(-9.11deg)", zIndex: 7 }}
      >
        <img src="/images/obschee_foto_1-24.webp" alt="Дети бегут на территории лагеря" className="h-full w-full object-cover" />
      </div>

      <a
        href="#form-m"
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

      {/* ───── ОСЕННЯЯ СМЕНА ───── */}
      <span id="shifts-m" className="absolute" style={{ top: um(4600) }} />
      <Mt as="h2" x={31} y={4645} size={30} lh={34} color={LIGHT} head z={4}>ОСЕННЯЯ СМЕНА</Mt>
      <Mt x={31} y={4696} size={14.25} lh={17.4} color={LIGHT} z={4} w={257}>
        {"Каждая смена - это новая история, насыщенная событиями, друзьями и открытиями."}
      </Mt>
      <Ht x={278} y={4747} size={9.5} lh={12} color={ORANGE} rot={-8} w={90}>{"выберите свои\nканикулы с нами!"}</Ht>
      <Mi src="/images/frag_IMG_6325_(1)_1_1-169.png" x={262} y={4540} w={117} h={125} z={12} className="tm-float" />
      <Mi src="/images/frag_IMG_6323_(1)_1_1-170.png" x={312} y={4631} w={105} h={105} z={6} className="tm-float" />

      {/* фото смены */}
      <Mi src={photos[ph]} alt={shift.name.replace("\n", " ")} x={53} y={4786} w={296} h={298} z={4} style={{ objectFit: "cover" }} />
      <ArrowBtn x={58} y={4931} w={26} h={21} dir="l" label="Предыдущее фото" gw={15} onClick={() => setPh((i) => (i + photos.length - 1) % photos.length)} />
      <ArrowBtn x={317} y={4931} w={26} h={21} dir="r" label="Следующее фото" gw={15} onClick={() => setPh((i) => (i + 1) % photos.length)} />
      <Mi src={shift.smallPhotos[0]} x={53} y={5098} w={87} h={77} z={4} style={{ objectFit: "cover" }} />
      <Mi src={shift.smallPhotos[1]} x={155} y={5098} w={90} h={77} z={4} style={{ objectFit: "cover" }} />
      <Mi src={shift.smallPhotos[2]} x={258} y={5098} w={91} h={77} z={4} style={{ objectFit: "cover" }} />

      {/* название, даты, описание */}
      <Mt as="h3" x={31} y={5203} size={22} lh={25.5} color={LIGHT} head z={4} w={213}>{shift.name}</Mt>
      <Mt x={199} y={5210} size={11.25} lh={13.7} color={ORANGE} z={4}>{shift.dates}</Mt>
      <Mt x={31} y={5266} size={15} lh={18.3} color={LIGHT} z={4} w={330}>{shift.desc[0]}</Mt>
      <Mt x={31} y={5406} size={14.75} lh={18} color={LIGHT} z={4} w={313}>{shift.desc[1]}</Mt>

      {/* В программе */}
      <Ht x={139} y={5534} size={19} color={LIGHT} z={6}>В программе</Ht>
      <Mi src="/images/frag_image_152_1-310.png" x={70} y={5546} w={277} h={166} z={3} />
      <Mt x={76} y={5566} size={12} lh={17.5} z={5} style={{ whiteSpace: "pre", letterSpacing: um(-0.2) }}>{shift.program.join("\n")}</Mt>

      {/* Возрастные группы */}
      <Ht x={111} y={5717} size={19} color={LIGHT} z={6}>Возрастные группы</Ht>
      <Mi src="/images/frag_image_155_1-311.png" x={63} y={5736} w={269} h={117} z={3} />
      <Mt x={70} y={5755} size={11.5} lh={22} z={5} style={{ whiteSpace: "pre", letterSpacing: um(-0.2) }}>{shift.ages.join("\n")}</Mt>

      {/* что входит */}
      <Mi src="/images/svc_living.png" x={43} y={5862} w={59} h={67} z={4} style={{ objectFit: "contain" }} />
      <Mi src="/images/svc_food.png" x={144} y={5868} w={71} h={67} z={4} style={{ objectFit: "contain" }} />
      <Mi src="/images/svc_bus.png" x={35} y={5984} w={74} h={59} z={4} style={{ objectFit: "contain" }} />
      <Mi src="/images/svc_med.png" x={151} y={5972} w={56} h={65} z={4} style={{ objectFit: "contain" }} />
      <Mt x={31} y={5929} size={12} lh={14.65} color={LIGHT} z={4} w={82}>{"Проживание в ГК Регина"}</Mt>
      <Mt x={148} y={5929} size={12} lh={14.65} color={LIGHT} z={4} w={63}>{"5-разовое питание"}</Mt>
      <Mt x={41} y={6037} size={12} lh={14.65} color={LIGHT} z={4}>Трансфер</Mt>
      <Mt x={128} y={6037} size={12} lh={14.65} color={LIGHT} z={4} w={102}>{"Медицинское сопровождение"}</Mt>

      {/* цена и кнопка */}
      <Ht x={230} y={5951} size={14} color={LIGHT} z={5} w={142}>Стоимость смены</Ht>
      <Ht x={236} y={5975} size={32} color={ORANGE} z={5} nowrap>{shift.price}р.</Ht>
      <Mi src="/images/texts/t_1-87.png" alt="нажми!" x={318} y={6040} w={45} z={5} />
      <a
        href="#form-m"
        className="tm-font-head absolute z-[6] flex items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7]"
        style={{ left: um(101), top: um(6097), width: um(202), height: um(40), fontSize: um(14) }}
      >
        ОСТАВИТЬ ЗАЯВКУ
      </a>

      {/* ───── МОМЕНТЫ СМЕН ───── */}
      <span id="moments-m" className="absolute" style={{ top: um(6190) }} />
      <Mt as="h2" x={26} y={6232} size={30} lh={34} head z={4}>МОМЕНТЫ СМЕН</Mt>
      <Mt x={28} y={6283} size={13.75} lh={16.8} z={4} w={252}>{"Вечёрки, концерты, игры, объятия после свечки и друзья, с которыми не хочется прощаться."}</Mt>
      <Mi src="/images/frag_image_164_1-185.png" x={-48} y={6367} w={114} h={105} z={2} />
      <Mi src="/images/frag_image_165_1-186.png" x={77} y={6387} w={99} h={95} z={2} />
      <Mi src="/images/frag_image_166_1-187.png" x={190} y={6391} w={134} h={109} z={2} />
      <div
        className="absolute overflow-hidden"
        style={{ left: um(345.1), top: um(6380.5), width: um(78.8), height: um(118), zIndex: 2, rotate: "-8.208deg", border: `${um(4.3)} solid #F8F8F8`, boxSizing: "border-box" }}
      >
        <img src="/images/image_167_1-188.webp" alt="Дети в зале" className="absolute max-w-none object-cover" style={{ left: um(-4.3), top: um(-4.3), width: um(78.8), height: um(118) }} draggable={false} />
      </div>
      <Mi src="/images/frag_image_168_1-189.png" x={-61} y={6550} w={134} h={105} z={2} />
      <Mi src="/images/frag_image_169_1-190.png" x={72} y={6573} w={133} h={82} z={2} />
      <Mi src="/images/frag_image_170_1-191.png" x={221} y={6577} w={109} h={124} z={2} />
      <Mi src="/images/frag_image_171_1-192.png" x={326} y={6558} w={149} h={123} z={2} />
      <Mi src="/images/girlyanda_1-193.png" x={-169} y={6244} w={678} h={465} z={3} />
      <Mi src="/images/frag_image_164_1-194.png" x={346} y={6330} w={37} h={41} z={4} />
      <Mi src="/images/frag_image_164_1-195.png" x={295} y={6275} w={55} h={51} z={4} />
      <Mi src="/images/frag_image_164_1-197.png" x={33} y={6460} w={32} h={32} z={4} />
      <Mi src="/images/texts/t_1-182.png" alt="Хочу еще на смену!" x={257} y={6352} w={102} z={4} />
      <Mi src="/images/texts/t_1-183.png" alt="лучший отряд!!!" x={203} y={6510} w={79} z={4} />
      <Mi src="/images/texts/t_1-184.png" alt="нашли друзей навсегда" x={33} y={6533} w={126} z={4} />
      <Mt x={33} y={6707} size={14} lh={17.1} z={4} w={225}>
        Больше фото вы можете найти у нас в группе{" "}
        <a href={CONTACTS.vk} target="_blank" rel="noreferrer" style={{ color: ORANGE }}>Вконтакте</a>
      </Mt>
      <Mi src="/images/frag_IMG_6322_1_1-205.png" x={293} y={6694} w={109} h={124} z={5} className="tm-float" />

      {/* ───── ОТЗЫВЫ ───── */}
      <span id="reviews-m" className="absolute" style={{ top: um(6790) }} />
      <Mt as="h2" x={28} y={6823} size={30} lh={34} color={W} head z={4}>ОТЗЫВЫ РОДИТЕЛЕЙ</Mt>
      <Mi src="/images/texts/t_1-70.png" alt="и детей" x={28} y={6862} w={132} z={4} />
      <Mi src="/images/texts/t_1-143.png" alt="впечатления из первых уст" x={205} y={6874} w={75} z={4} />
      <Mi src="/images/frag_IMG_6316_(1)_1_1-217.png" x={294} y={6850} w={95} h={101} z={5} className="tm-float" />
      <Mi src="/images/frag_image_164_1-218.png" x={42} y={6932} w={80} h={50} z={3} />
      <Mi src="/images/texts/t_1-84.png" alt="до встречи летом!!" x={137} y={6941} w={99} z={4} />

      {/* отзыв 1 */}
      <div className="absolute bg-[#D9E3F4]" style={{ left: um(35), top: um(6972), width: um(295), height: um(h1 + 23), borderRadius: um(40), zIndex: 4 }} />
      <p ref={t1} className="tm-font-body absolute m-0 font-medium" style={{ left: um(53), top: um(6986), width: um(258), fontSize: um(13), lineHeight: um(15.85), letterSpacing: um(-0.13), color: DARK, zIndex: 5 }}>
        {slot1.text}
      </p>
      <RAvatar src={slot1.avatar} x={249} y={6972 + h1 + 23 - 16} size={81} />
      {/* отзыв 2 */}
      {slot2 && (
        <>
          <div className="absolute bg-[#D9E3F4]" style={{ left: um(68), top: um(7172 + s2), width: um(254), height: um(h2 + 54), borderRadius: `${um(20)} ${um(60)} ${um(60)} ${um(60)}`, zIndex: 4 }} />
          <p ref={t2} className="tm-font-body absolute m-0 font-medium" style={{ left: um(82), top: um(7182 + s2), width: um(233), fontSize: um(13), lineHeight: um(15.85), letterSpacing: um(-0.13), color: DARK, zIndex: 5 }}>
            {slot2.text}
          </p>
          <RAvatar src={slot2.avatar} x={170} y={7172 + s2 + h2 + 54 - 30} size={73} />
        </>
      )}
      <ArrowBtn x={17} y={7121} w={40} h={33} dir="l" label="Предыдущие отзывы" gw={22} onClick={() => setRp((i) => (i + 2) % 3)} />
      <ArrowBtn x={335} y={7121} w={40} h={33} dir="r" label="Следующие отзывы" gw={24} onClick={() => setRp((i) => (i + 1) % 3)} />
      <Mi src="/images/texts/t_19-68.png" alt="нажми, чтобы увидеть больше!" x={57} y={7132} w={88} z={4} />
      <Mi src="/images/frag_image_164_1-220.png" x={29} y={7294 + s2} w={67} h={61} z={6} />
      <Mi src="/images/texts/t_1-83.png" alt="обязательно вернусь ещё!" x={200} y={R(7352)} w={136} z={4} />
      <Mt x={33} y={R(7407)} size={14} lh={17.1} color={W} z={4} w={250}>
        Больше отзывов вы можете найти у нас в группе{" "}
        <a href={CONTACTS.vk} target="_blank" rel="noreferrer" style={{ color: ORANGE }}>Вконтакте</a>
      </Mt>

      {/* ───── ВОПРОСЫ ───── */}
      <span id="faq-m" className="absolute" style={{ top: um(R(7460)) }} />
      <Fig box={[-105, R(7668), 396, 500]} inner={[280.4, 436]} rot={-17.08} src="/images/image_190_1-209.png" crop={{ h: 100, l: -65.37, t: 0, w: 233.31 }} opacity={0.3} z={1} unit={um} />
      <Fig box={[285, R(7732), 244, 316]} inner={[179.7, 279.3]} rot={14.53} src="/images/image_190_1-209.png" crop={{ h: 100, l: -65.37, t: 0, w: 233.31 }} opacity={0.3} z={1} unit={um} />
      <Fig box={[180, R(7640), 157, 201]} inner={[114.1, 177.4]} rot={-15.34} src="/images/image_190_1-209.png" crop={{ h: 100, l: -65.37, t: 0, w: 233.31 }} opacity={0.3} z={1} unit={um} />
      <Mt as="h2" x={28} y={R(7523)} size={30} lh={34} head z={4}>ОТВЕТЫ НА ВОПРОСЫ</Mt>
      <Mi src="/images/frag_image_177_1-254.png" x={42} y={R(7572)} w={28} h={36} z={4} />
      <Mi src="/images/texts/t_1-144.png" alt="часто спрашивают" x={113} y={R(7583)} w={136} z={4} />
      <Mi src="/images/texts/t_1-85.png" alt="нажми, чтобы узнать ответ" x={298} y={R(7559)} w={75} z={4} />
      <Mi src="/images/frag_image_164_1-253.png" x={373.5} y={R(7604)} w={31} h={29} rot={125} z={4} />
      {FAQ_ROWS.map((r, i) => {
        const item = FAQ[i];
        const isOpen = open === i;
        const top = R(r.y) + (open !== null && i > open ? dF : 0);
        const hh = isOpen ? rowOpenH : 50;
        return (
          <div
            key={item.q}
            className="absolute overflow-hidden bg-[#F8F8F7]/75 transition-[height] duration-300"
            style={{ left: um(r.x), top: um(top), width: um(358), height: um(hh), borderRadius: um(25), zIndex: 3 }}
          >
            <div className="absolute left-0 top-0 w-full bg-[#EC812D] transition-opacity duration-300" style={{ height: um(42), borderRadius: um(25), opacity: isOpen ? 1 : 0 }} />
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-label={item.q}
              className="absolute left-0 top-0 w-full cursor-pointer"
              style={{ height: um(50) }}
            />
            <p
              className="tm-font-body pointer-events-none absolute m-0 flex items-center font-medium"
              style={{ left: um(r.tx - r.x), top: 0, width: um(r.tw + 6), height: um(isOpen ? 42 : 50), fontSize: um(15), lineHeight: um(18.3), letterSpacing: um(-0.15), color: isOpen ? "#F8F8F8" : DARK }}
            >
              {item.q}
            </p>
            <span
              aria-hidden
              className={`pointer-events-none absolute transition-transform duration-300 ${isOpen ? "text-[#F8F8F8]" : "text-[#256BC6]"}`}
              style={{ left: um(r.px - r.x), top: um(isOpen ? 11 : 15), width: um(20), height: um(20), transform: isOpen ? "rotate(45deg)" : "none" }}
            >
              <span className="absolute left-0 w-full rounded bg-current" style={{ top: "50%", height: um(1.5), marginTop: um(-0.75) }} />
              <span className="absolute top-0 h-full rounded bg-current" style={{ left: "50%", width: um(1.5), marginLeft: um(-0.75) }} />
            </span>
            <p
              ref={(el) => {
                aRefs.current[i] = el;
              }}
              className="tm-font-body absolute m-0 font-medium"
              style={{ left: um(r.tx - r.x), top: um(47), width: um(300), fontSize: um(15), lineHeight: um(18.3), letterSpacing: um(-0.15), color: DARK, opacity: isOpen ? 1 : 0 }}
            >
              {item.a}
            </p>
          </div>
        );
      })}
      <Mi src="/images/texts/t_1-146.png" alt="не нашли ответ?" x={42} y={F(7945)} w={173} z={4} />
      <Mi src="/images/frag_image_177_1-257.png" x={247} y={F(7962)} w={49} h={38} z={4} />
      <a
        href="#form-m"
        className="tm-font-head absolute z-[4] flex items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7]"
        style={{ left: um(102), top: um(F(8006)), width: um(199), height: um(37), fontSize: um(14) }}
      >
        ОСТАВИТЬ ЗАЯВКУ
      </a>
      <Mi src="/images/texts/t_1-148.png" alt="и мы ответим на все вопросы" x={181} y={F(8071)} w={172} z={4} />

      {/* ───── ФОРМА ───── */}
      <span id="form-m" className="absolute" style={{ top: um(F(8150)) }} />
      <Mt as="h2" x={29} y={F(8198)} size={30} lh={34} color={W} head z={4}>ВЫБЕРИТЕ СМЕНУ</Mt>
      <Mi src="/images/texts/t_1-71.png" alt="уже сейчас" x={29} y={F(8238)} w={196} z={4} />
      <Mt x={29} y={F(8301)} size={15.25} lh={18.6} color={LIGHT} z={4} w={255}>{"Поможем подобрать программу по возрасту, интересам и характеру ребёнка"}</Mt>
      <Mi src="/images/frag_image_179_1-265.png" x={259} y={F(8333)} w={64} h={63} z={4} />
      <Mi src="/images/frag_image_179_1-266.png" x={270} y={F(8218)} w={95} h={72} z={3} />
      <form onSubmit={onSubmit} className="contents">
        <label htmlFor="m-name" className="tm-font-body absolute font-medium" style={{ left: um(23), top: um(F(8401)), fontSize: um(15.25), lineHeight: um(18.6), color: LIGHT, zIndex: 4 }}>Ваше имя</label>
        <input
          id="m-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Иван"
          autoComplete="name"
          className="tm-font-body absolute bg-[#D9E3F4] font-medium text-[#3D3D3D] outline-none placeholder:text-[#3D3D3D]/60 focus:ring-2 focus:ring-[#EC812D]"
          style={{ left: um(19), top: um(F(8430)), width: um(358), height: um(56), borderRadius: um(28), paddingLeft: um(20), fontSize: um(15.25), zIndex: 4 }}
        />
        <label htmlFor="m-phone" className="tm-font-body absolute font-medium" style={{ left: um(25), top: um(F(8515)), fontSize: um(15), lineHeight: um(18.3), color: LIGHT, zIndex: 4 }}>Номер телефона</label>
        <input
          id="m-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "") ? formatPhone(e.target.value) : "")}
          placeholder="+7 (999) 123-45-67"
          inputMode="tel"
          autoComplete="tel"
          className="tm-font-body absolute bg-[#D9E3F4] font-medium text-[#3D3D3D] outline-none placeholder:text-[#3D3D3D]/60 focus:ring-2 focus:ring-[#EC812D]"
          style={{ left: um(19), top: um(F(8542)), width: um(358), height: um(56), borderRadius: um(28), paddingLeft: um(20), fontSize: um(15), zIndex: 4 }}
        />
        <input type="text" name="website" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <button
          type="submit"
          className="tm-font-head absolute flex cursor-pointer items-center justify-center rounded-full bg-[#EC812D] font-bold text-[#F8F8F7]"
          style={{ left: um(106), top: um(F(8641)), width: um(199), height: um(37), fontSize: um(14), zIndex: 4 }}
        >
          {sending ? "ОТПРАВЛЯЕМ..." : "ОСТАВИТЬ ЗАЯВКУ"}
        </button>
      </form>
      <Mt x={19} y={F(8686)} size={10} lh={12} color={LIGHT} z={4} w={358} align="center" style={{ opacity: 0.8 }}>
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </Mt>
      <Mi src="/images/texts/t_1-145.png" alt="Свяжемся с вами и поможем выбрать подходящую смену" x={50} y={F(8719)} w={303} z={4} />
      <Fig box={[58, F(8737), 472, 504]} inner={[385.6, 428.2]} rot={13} src="/images/image_180_1-262.png" fit="cover" z={2} unit={um} />
      <Fig box={[99, F(8812), 323, 316]} inner={[270.9, 262.5]} rot={13} fit="cover" pos="bottom" src="/images/image_181_1-263.webp" z={3} alt="Дети на празднике в лагере" unit={um} />
      <Mi src="/images/texts/t_1-264.png" alt="Увидимся в Территории мы!" x={37} y={F(9086)} w={263} z={6} />
      <Mi src="/images/frag_image_177_1-268.png" x={305} y={F(8767)} w={66} h={58} z={4} />
      <Mi src="/images/frag_image_179_1-261.png" x={120} y={F(9139)} w={72} h={56} z={4} />
      <Mi src="/images/frag_IMG_6317_(1)_1_1-290.png" x={250} y={F(9145)} w={117} h={129} z={9} className="tm-float" />

      {/* ───── ПОДВАЛ ───── */}
      <Mi src="/images/frag_image_212_9-51.png" alt="Логотип Территория МЫ" x={32} y={F(9274)} w={47} h={69} z={4} />
      <Mt as="p" x={104} y={F(9274)} size={30} lh={34} color={BLUE} head z={4} w={187}>{"ТЕРРИТОРИЯ\nМЫ"}</Mt>
      <Mi src="/images/texts/t_1-147.png" alt="воспоминания начинаются здесь" x={216} y={F(9325)} w={140} z={4} />
      <Mt x={32} y={F(9363)} size={15} lh={18.3} z={4} w={279}>{"Республиканский интеллектуально-психологический лагерь “Территория МЫ”"}</Mt>
      {NAV.filter((n) => n.label !== "Галерея").map((n, i) => (
        <a
          key={n.href}
          href={n.href + "-m"}
          className="tm-font-body absolute font-medium"
          style={{ left: um(43), top: um(F(9450 + i * 31)), fontSize: um(15), lineHeight: um(18.3), color: DARK, zIndex: 4, letterSpacing: um(-0.15) }}
        >
          {n.label}
        </a>
      ))}
      <a href={CONTACTS.phoneHref} aria-label="Позвонить" className="absolute z-[4]" style={{ left: um(185), top: um(F(9441)), width: um(35), height: um(38) }}>
        <img src="/images/frag_image_186_1-284.png" alt="" className="h-full w-full object-contain" />
      </a>
      <a href={CONTACTS.vk} target="_blank" rel="noreferrer" aria-label="Вконтакте" className="absolute z-[4]" style={{ left: um(224), top: um(F(9446)), width: um(40), height: um(29) }}>
        <img src="/images/frag_image_183_1-285.png" alt="" className="h-full w-full object-contain" />
      </a>
      {CONTACTS.max && (
        <a href={CONTACTS.max} target="_blank" rel="noreferrer" aria-label="Max" className="absolute z-[4]" style={{ left: um(274), top: um(F(9443)), width: um(30), height: um(34) }}>
          <img src="/images/frag_image_184_1-286.png" alt="" className="h-full w-full object-contain" />
        </a>
      )}
      <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" aria-label="Телеграм" className="absolute z-[4]" style={{ left: um(312), top: um(F(9444)), width: um(35), height: um(33) }}>
        <img src="/images/frag_image_186_1-287.png" alt="" className="h-full w-full object-contain" />
      </a>
      <Mi src="/images/frag_image_185_1-288.png" x={164} y={F(9499)} w={29} h={32} z={4} />
      <Mt x={195} y={F(9506)} size={14} lh={17.1} z={4}>ул. Спартаковская 2к1</Mt>
      <Mi src="/images/frag_image_185_1-288.png" x={164} y={F(9534)} w={29} h={32} z={4} />
      <Mt x={195} y={F(9541)} size={14} lh={17.1} z={4}>{"ГК «Регина», Мамадыш"}</Mt>
      <div className="absolute z-[4] bg-[#3D3D3D]/40" style={{ left: um(16), top: um(F(9606)), width: um(370), height: "1px" }} />
      <Mt x={21} y={F(9627)} size={10} lh={12.2} z={4}>Политика конфиденциальности</Mt>
      <Mt x={294} y={F(9627)} size={10.25} lh={12.5} z={4}>Дизайн сайта</Mt>

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
                  <a href={n.href + "-m"} onClick={() => setMenu(false)} className="block">
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

/** Круглый аватар отзыва: исходный кадр с точным смещением из макета (масштаб от круга 81) */
function RAvatar({ src, x, y, size }: { src: string; x: number; y: number; size: number }) {
  const a = AVATARS.find((v) => v.src === src);
  const k = size / 81;
  return (
    <div className="absolute overflow-hidden rounded-full" style={{ left: um(x), top: um(y), width: um(size), height: um(size), zIndex: 6 }}>
      <img
        src={src}
        alt="Аватар автора отзыва"
        className="absolute max-w-none object-cover"
        style={
          a
            ? { left: um((a.rect[0] - a.circle[0]) * k), top: um((a.rect[1] - a.circle[1]) * k), width: um(a.rect[2] * k), height: um(a.rect[3] * k) }
            : { left: 0, top: 0, width: "100%", height: "100%" }
        }
      />
    </div>
  );
}
