"use client";

import { useEffect } from "react";
import { u, type Shift } from "@/lib/tm";
import { OrangeButton } from "./decor";

const ICONS = [
  { src: "/images/icon_living.png", label: "Проживание\nв ГК Регина" },
  { src: "/images/icon_food.png", label: "5-разовое\nпитание" },
  { src: "/images/icon_bus.png", label: "Трансфер" },
  { src: "/images/icon_med.png", label: "Медицинское\nсопровождение" },
];

export default function ShiftModal({ shift, onClose }: { shift: Shift | null; onClose: () => void }) {
  useEffect(() => {
    if (!shift) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [shift, onClose]);

  if (!shift) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2b45]/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Подробнее: ${shift.name.replace("\n", " ")}`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[1080px] overflow-y-auto rounded-2xl bg-[#D9E3F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F8F7] text-xl font-bold text-[#256BC6] shadow transition-transform hover:scale-110"
        >
          ×
        </button>

        <div className="flex flex-col gap-5 p-5 md:flex-row md:gap-8 md:p-9">
          {/* фото */}
          <div className="shrink-0 md:w-[38%]">
            <img
              src={shift.bigPhoto}
              alt={shift.name.replace("\n", " ")}
              className="h-auto w-full rounded-xl object-cover shadow"
            />
            <div className="mt-3 flex gap-3">
              {shift.smallPhotos.map((p, i) => (
                <img key={i} src={p} alt="" aria-hidden className="h-auto w-[30%] rounded-lg object-cover shadow-sm" />
              ))}
            </div>
          </div>

          {/* контент */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <h3 className="tm-font-head whitespace-pre-line text-2xl font-bold leading-tight text-[#3D3D3D] md:text-[30px]">
                {shift.name}
              </h3>
              <span className="tm-font-body text-sm font-semibold text-[#256BC6]">{shift.dates}</span>
            </div>

            <div className="mt-3 space-y-2">
              {shift.desc.map((d, i) => (
                <p key={i} className="tm-font-body text-[13px] leading-snug text-[#2A2A2A] md:text-sm">
                  {d}
                </p>
              ))}
            </div>

            {/* списки на бумажках */}
            <div className="mt-4 flex flex-col gap-3">
              <div className="relative">
                <span className="tm-font-body absolute -top-1 left-1 z-10 text-sm font-semibold text-[#256BC6] md:-left-2 md:-top-2">
                  В программе
                </span>
                <img src="/images/frag_image_152_1-310.png" alt="" aria-hidden className="mt-3 h-auto w-full max-w-[320px]" />
                <ul className="tm-font-body absolute left-[6%] top-[36%] w-[88%] space-y-[0.15em] text-[10px] leading-tight text-[#2A2A2A] md:text-[11px]">
                  {shift.program.map((p) => (
                    <li key={p} className="flex gap-1">
                      <span className="text-[#256BC6]">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative self-end" style={{ maxWidth: 340 }}>
                <span className="tm-font-body absolute -top-1 right-2 z-10 text-sm font-semibold text-[#256BC6] md:-right-2 md:-top-2">
                  Возрастные группы
                </span>
                <img src="/images/frag_image_155_1-311.png" alt="" aria-hidden className="mt-3 h-auto w-full" />
                <ul className="tm-font-body absolute left-[5%] top-[30%] w-[90%] space-y-[0.15em] text-[10px] leading-tight text-[#2A2A2A] md:text-[11px]">
                  {shift.ages.map((a) => (
                    <li key={a} className="flex gap-1">
                      <span className="text-[#256BC6]">·</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* иконки удобств */}
            <div className="mt-5 grid grid-cols-4 gap-2 md:gap-4">
              {ICONS.map((ic) => (
                <div key={ic.label} className="flex flex-col items-center text-center">
                  <img src={ic.src} alt="" aria-hidden className="h-12 w-12 object-contain md:h-14 md:w-14" />
                  <span className="tm-font-body mt-1 text-[10px] leading-tight text-[#3D3D3D] md:text-xs">
                    {ic.label.split("\n").map((l, i) => (
                      <span key={i} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            {/* цена и кнопка */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="tm-font-body block text-sm font-semibold text-[#256BC6]">Стоимость смены</span>
                <div className="flex items-baseline gap-2">
                  <img src="/images/texts/t_1-300.png" alt={`Стоимость ${shift.price} рублей`} className="mt-1 h-auto w-[110px] md:w-[130px]" />
                  <span className="tm-font-head text-base font-bold text-[#EC812D]">₽</span>
                </div>
              </div>
              <OrangeButton href="#form" size="lg" className="!py-3">
                <span className="text-xs md:text-base">ОСТАВИТЬ ЗАЯВКУ</span>
              </OrangeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
