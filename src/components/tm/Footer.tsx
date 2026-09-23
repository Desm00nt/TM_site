"use client";

import { CONTACTS, NAV, u } from "@/lib/tm";
import { Deco, Hand, Reveal, Wave }
from "./decor";

const Y = -8254;

const CONTACT_ROWS = [
  { label: CONTACTS.phone, href: CONTACTS.phoneHref, icon: "/images/frag_image_186_1-284.png", iconX: 926, iconY: 8360, iconW: 42, y: 8371 },
  { label: "Вконтакте", href: CONTACTS.vk, icon: "/images/frag_image_183_1-285.png", iconX: 918, iconY: 8415, iconW: 50, y: 8421 },
  { label: "Max", href: CONTACTS.max, icon: "/images/frag_image_184_1-286.png", iconX: 923, iconY: 8461, iconW: 35, y: 8469 },
  { label: "Телеграм", href: CONTACTS.telegram, icon: "/images/frag_image_186_1-287.png", iconX: 918, iconY: 8509, iconW: 45, y: 8518 },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] overflow-hidden bg-[#D9E3F4]">
      <Wave id="1:27" y0={8254} />

      {/* ===== DESKTOP ===== */}
      <div className="relative hidden md:block [container-type:inline-size]" style={{ height: u(478) }}>
        {/* логотип и название */}
        <Deco x={108} y={8346 + Y} w={68} src="/images/image_212_9-51.png" z={2} />
        <Reveal
          as="p"
          className="tm-font-head absolute font-bold text-[#256BC6]"
          style={{ left: u(206), top: u(8338 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          ТЕРРИТОРИЯ
          <br />
          МЫ
        </Reveal>
        <Hand x={378} y={8397 + Y} w={280} file="/images/texts/t_1-147.png" text="воспоминания начинаются здесь" z={3} />
        <Reveal
          as="p"
          className="tm-font-body absolute font-medium text-[#3D3D3D]"
          style={{ left: u(112), top: u(8464 + Y), fontSize: u(20), lineHeight: u(24.4) }}
        >
          Республиканский
          <br />
          интеллектуально-психологический
          <br />
          лагерь “Территория МЫ”
        </Reveal>

        {/* меню */}
        <nav aria-label="Меню подвала" className="absolute" style={{ left: u(699), top: u(8371 + Y) }}>
          <ul className="tm-font-body font-medium text-[#3D3D3D]" style={{ fontSize: u(20), lineHeight: u(24.4), display: "flex", flexDirection: "column", gap: u(21) }}>
            {NAV.filter((n) => n.label !== "Галерея").map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-[#256BC6]">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* контакты: иконки на уровне контейнера */}
        {CONTACT_ROWS.map((c) => (
          <Deco key={c.label + '-icon'} x={c.iconX} y={c.iconY + Y} w={c.iconW} src={c.icon} z={2} />
        ))}
        <ul className="absolute" style={{ left: u(970), top: u(8371 + Y) }}>
          {CONTACT_ROWS.map((c) => (
            <li key={c.label} style={{ marginBottom: u(21) }}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="tm-font-body block font-medium text-[#3D3D3D] transition-colors hover:text-[#256BC6]"
                style={{ fontSize: u(20) }}
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>

        {/* разделитель */}
        <hr className="absolute border-0 border-t bg-[#3D3D3D]/40" style={{ left: u(108), top: u(8603 + Y), width: u(1064), height: "1px" }} />

        {/* адреса */}
        <Deco x={110} y={8634 + Y} w={29} src="/images/frag_image_185_1-288.png" z={2} />
        <p className="tm-font-body absolute font-medium text-[#3D3D3D]" style={{ left: u(141), top: u(8641 + Y), fontSize: u(15) }}>
          Офис в Казани, ул. Спартаковская 2к1
        </p>
        <Deco x={110} y={8669 + Y} w={29} src="/images/frag_image_185_1-288.png" z={2} />
        <p className="tm-font-body absolute font-medium text-[#3D3D3D]" style={{ left: u(141), top: u(8676 + Y), fontSize: u(15) }}>
          ГК «Регина», Мамадыш
        </p>

        <a href="#" className="tm-font-body absolute font-medium text-[#3D3D3D] transition-colors hover:text-[#256BC6]" style={{ left: u(855), top: u(8641 + Y), fontSize: u(15) }}>
          Политика конфиденциальности
        </a>
        <a href="#top" className="tm-font-body absolute font-medium text-[#3D3D3D] transition-colors hover:text-[#256BC6]" style={{ left: u(855), top: u(8676 + Y), fontSize: u(15) }}>
          Дизайн сайта
        </a>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-5 pb-10 pt-8 md:hidden">
        <div className="flex items-start gap-3">
          <img src="/images/image_212_9-51.png" alt="Логотип Территория МЫ" className="h-14 w-auto" />
          <div>
            <p className="tm-font-head text-3xl font-bold leading-tight text-[#256BC6]">
              ТЕРРИТОРИЯ
              <br />
              МЫ
            </p>
            <img src="/images/texts/t_1-147.png" alt="воспоминания начинаются здесь" className="mt-1 h-auto w-[90%]" />
          </div>
        </div>
        <p className="tm-font-body mt-4 text-base font-medium text-[#3D3D3D]">
          Республиканский интеллектуально-психологический лагерь “Территория МЫ”
        </p>

        <div className="mt-6 flex justify-between gap-6">
          <nav aria-label="Меню подвала">
            <ul className="tm-font-body space-y-3 text-base font-medium text-[#3D3D3D]">
              {NAV.filter((n) => n.label !== "Галерея").map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="tm-font-body space-y-3 text-base font-medium text-[#3D3D3D]">
            <li>
              <a href={CONTACTS.phoneHref} className="flex items-center gap-2">
                <img src="/images/frag_image_186_1-284.png" alt="" aria-hidden className="w-5" />
                {CONTACTS.phone}
              </a>
            </li>
            <li>
              <a href={CONTACTS.vk} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <img src="/images/frag_image_183_1-285.png" alt="" aria-hidden className="w-6" />
                Вконтакте
              </a>
            </li>
            <li>
              <a href={CONTACTS.max} className="flex items-center gap-2">
                <img src="/images/frag_image_184_1-286.png" alt="" aria-hidden className="w-5" />
                Max
              </a>
            </li>
            <li>
              <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <img src="/images/frag_image_186_1-287.png" alt="" aria-hidden className="w-6" />
                Телеграм
              </a>
            </li>
          </ul>
        </div>

        <hr className="mt-6 border-[#3D3D3D]/40" />
        <div className="tm-font-body mt-4 space-y-2 text-xs font-medium text-[#3D3D3D]">
          <p className="flex items-center gap-2">
            <img src="/images/frag_image_185_1-288.png" alt="" aria-hidden className="w-4" />
            Офис в Казани, ул. Спартаковская 2к1
          </p>
          <p className="flex items-center gap-2">
            <img src="/images/frag_image_185_1-288.png" alt="" aria-hidden className="w-4" />
            ГК «Регина», Мамадыш
          </p>
          <p className="pt-2 text-right text-[#3D3D3D]/70">Политика конфиденциальности</p>
        </div>
      </div>
    </footer>
  );
}
