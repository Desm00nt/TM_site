"use client";

import { useEffect, useState } from "react";
import { CONTACTS } from "@/lib/tm";

/** Политика конфиденциальности — открывается по ссылке #privacy, остаёмся на одной странице. */
export default function PrivacyModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(location.hash === "#privacy");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    history.replaceState(null, "", location.pathname + location.search);
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Политика конфиденциальности"
    >
      <div
        className="tm-font-body relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-[#D9E3F4] p-6 text-[#3D3D3D] shadow-xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} aria-label="Закрыть" className="absolute right-4 top-4 text-3xl leading-none text-[#256BC6]">
          ×
        </button>
        <h2 className="tm-font-head mb-4 text-2xl font-bold text-[#256BC6] md:text-3xl">Политика конфиденциальности</h2>
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Оператор персональных данных — Республиканский интеллектуально-психологический лагерь «Территория МЫ»
            (Казань, ул. Спартаковская, 2к1).
          </p>
          <p>
            Через форму на сайте мы получаем только ваше имя и номер телефона. Данные используются исключительно для
            того, чтобы связаться с вами по вопросу участия ребёнка в смене и подобрать программу.
          </p>
          <p>
            Данные не передаются третьим лицам, кроме сервиса пересылки заявок, необходимого для их доставки
            организаторам, и не используются для рекламных рассылок без вашего согласия.
          </p>
          <p>
            Отправляя форму, вы даёте согласие на обработку указанных данных. Вы можете отозвать согласие и
            потребовать удаления данных, позвонив по телефону{" "}
            <a href={CONTACTS.phoneHref} className="text-[#256BC6] underline">
              {CONTACTS.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
