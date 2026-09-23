"use client";

import { useState } from "react";
import { NAV, u } from "@/lib/tm";
import { OrangeButton } from "./decor";

export default function Header({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);

  if (variant === "desktop") {
    return (
      <nav aria-label="Основная навигация">
        <a
          href="#top"
          className="absolute block"
          style={{ left: u(78), top: u(28), width: u(68), height: u(100), zIndex: 30 }}
          aria-label="Территория МЫ — на главную"
        >
          <img src="/images/image_212_9-51.png" alt="Территория МЫ — логотип" className="h-full w-full object-contain" />
        </a>
        <ul
          className="tm-font-body absolute flex items-center font-medium"
          style={{ left: 0, top: u(56), fontSize: u(20), lineHeight: u(24), color: "#256BC6", zIndex: 30 }}
        >
          {NAV.map((n, i) => (
            <li key={n.href} className="absolute whitespace-nowrap" style={{ left: u([210, 328, 459, 604, 745][i]) }}>
              <a href={n.href} className="whitespace-nowrap transition-colors hover:text-[#EC812D]">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="absolute" style={{ left: u(979), top: u(46), width: u(181), height: u(45), zIndex: 30 }}>
          <OrangeButton href="#form" className="h-full w-full !px-0">
            <span style={{ fontSize: u(16) }}>ОСТАВИТЬ ЗАЯВКУ</span>
          </OrangeButton>
        </div>
      </nav>
    );
  }

  // мобильный хедер
  return (
    <header className="sticky top-0 z-50 bg-[#F8F8F7]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(37,107,198,0.15)]">
      <div className="flex items-center justify-between px-4 py-2">
        <a href="#" className="flex items-center gap-2" aria-label="Территория МЫ — на главную">
          <img src="/images/image_212_9-51.png" alt="Логотип Территория МЫ" className="h-11 w-auto" />
        </a>
        <div className="flex items-center gap-2">
          <OrangeButton href="#form" className="!px-4 !py-2 !text-[11px]">
            ОСТАВИТЬ ЗАЯВКУ
          </OrangeButton>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl bg-[#D9E3F4]"
          >
            <span className={`h-0.5 w-5 bg-[#256BC6] transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-[#256BC6] transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-[#256BC6] transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Мобильная навигация" className="border-t border-[#D9E3F4] bg-[#F8F8F7] px-4 py-3">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-[#256BC6] transition-colors hover:bg-[#D9E3F4]/60"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
