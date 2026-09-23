"use client";

import { useState } from "react";
import { SHIFTS, u, type Shift } from "@/lib/tm";
import { Deco, Hand, OrangeButton, Reveal, Wave }
from "./decor";
import ShiftModal from "./ShiftModal";

const Y = -3977;

export default function Shifts() {
  const [active, setActive] = useState<Shift | null>(null);

  return (
    <section id="shifts" className="relative z-[6] bg-[#256BC6]">
      <Wave id="1:19" y0={3975} />

      {/* ===== DESKTOP ===== */}
      <div className="relative mx-auto hidden max-w-[1280px] md:block [container-type:inline-size]" style={{ height: u(790) }}>
        <Reveal
          as="h2"
          className="tm-font-head absolute font-bold text-[#D9E3F4]"
          style={{ left: u(95), top: u(4057 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          ЛЕТНИЕ СМЕНЫ
        </Reveal>
        <Reveal
          as="p"
          className="tm-font-body absolute font-medium text-[#D9E3F4]"
          style={{ left: u(95), top: u(4150 + Y), fontSize: u(20), lineHeight: u(24.4) }}
        >
          Каждая смена - это новая история,
          <br />
          насыщенная событиями, друзьями
          <br />
          и открытиями.
        </Reveal>
        <Hand x={612} y={4139 + Y} w={212} file="/images/texts/t_1-142.png" text="выберите своё лето с нами!" />
        <Deco x={930} y={4014 + Y} w={228} h={230} src="/images/frag_IMG_6323_(1)_1_1-170.png" z={14} className="tm-float" />
        <Deco x={438} y={4224 + Y} w={117} h={87} src="/images/frag_image_144_1-176.png" z={1} mobile="show" />

        {/* карточки смен — точная геометрия из макета: рамки 261x379 r10, фото 232x155 r5,
            заголовок fs20, описание fs15, кнопка 181x45 r30 */}
        {SHIFTS.map((s, i) => {
          const cx = [81, 359, 637, 915][i];
          const cy = [4268, 4337, 4268, 4337][i];
          const btn = [
            [37, 304],
            [40, 310],
            [40, 305],
            [40, 303],
          ][i];
          return (
            <div
              key={s.id}
              className="absolute z-[5] transition-transform duration-200 hover:-translate-y-1"
              style={{
                left: u(cx),
                top: u(cy + Y),
                width: u(261),
                height: u(379),
                borderRadius: u(10),
                border: "2px solid #D9E3F4",
              }}
            >
              <Reveal delay={i * 90} className="absolute inset-0">
                <img
                  src={s.cardPhoto.replace(/^.*_(\d+-\d+)\.webp$/, "/images/rc_$1.png")}
                  alt={s.name.replace("\n", " ")}
                  className="absolute"
                  style={{ left: u(14), top: u(15), width: u(232), height: u(155), borderRadius: u(5) }}
                />
                <h3
                  className="tm-font-head absolute whitespace-pre-line font-bold text-[#F8F8F7]"
                  style={{ left: u(18), top: u(188), fontSize: u(20), lineHeight: u(22.4) }}
                >
                  {s.cardTitle}
                </h3>
                <p
                  className="tm-font-body absolute font-medium text-[#D9E3F4]"
                  style={{ left: u(18), top: u(241), fontSize: u(15), lineHeight: u(18.3) }}
                >
                  {s.cardDesc.replace("\u2028", " ")}
                </p>
                <div className="absolute" style={{ left: u(btn[0]), top: u(btn[1]) }}>
                  <OrangeButton onClick={() => setActive(s)} className="!px-0 !py-0">
                    <span
                      className="tm-font-head inline-flex items-center justify-center font-bold"
                      style={{ width: u(181), height: u(45), fontSize: u(14) }}
                    >
                      ПОДРОБНЕЕ
                    </span>
                  </OrangeButton>
                </div>
              </Reveal>
            </div>
          );
        })}

        <Hand x={190} y={4689 + Y} w={51} file="/images/texts/t_1-87.png" text="нажми!" z={6} />
        <Deco x={714} y={4666 + Y} w={90} h={90} src="/images/frag_image_128_1-171.png" z={1} mobile="show" />
        <Deco x={150} y={4633 + Y} w={82} h={84} src="/images/frag_image_144_1-177.png" z={1} mobile="show" />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-5 py-12 md:hidden">
        <Reveal as="h2" className="tm-font-head text-4xl font-bold text-[#D9E3F4]">
          ЛЕТНИЕ СМЕНЫ
        </Reveal>
        <Reveal as="p" className="tm-font-body mt-3 text-base font-medium text-[#D9E3F4]">
          Каждая смена - это новая история, насыщенная событиями, друзьями и открытиями.
        </Reveal>
        <div className="mt-6 flex flex-col gap-6">
          {SHIFTS.map((s) => (
            <Reveal key={s.id} className="flex flex-col rounded-2xl border-2 border-[#F8F8F7] p-3">
              <img src={s.cardPhoto} alt={s.name.replace("\n", " ")} className="h-auto w-full rounded-xl object-cover" style={{ aspectRatio: "232/155" }} />
              <h3 className="tm-font-head mt-2 whitespace-pre-line text-lg font-bold text-[#F8F8F7]">{s.cardTitle}</h3>
              <p className="tm-font-body mt-1 text-sm font-medium text-[#D9E3F4]">{s.cardDesc.replace("\u2028", " ")}</p>
              <div className="mt-3">
                <OrangeButton onClick={() => setActive(s)} className="!text-xs">
                  ПОДРОБНЕЕ
                </OrangeButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ShiftModal shift={active} onClose={() => setActive(null)} />
    </section>
  );
}
