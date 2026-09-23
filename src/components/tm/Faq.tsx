"use client";

import { useState } from "react";
import { FAQ, u } from "@/lib/tm";
import { Deco, Hand, OrangeButton, Reveal, Wave }
from "./decor";

const Y = -6689;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-[4] overflow-hidden bg-[#D9E3F4]">
      <Wave id="1:26" y0={6689} />

      {/* ===== DESKTOP ===== */}
      <div className="relative mx-auto hidden max-w-[1280px] md:block [container-type:inline-size]" style={{ height: u(758) }}>
        {/* большие знаки вопроса — точные bbox из макета, без искажения прозрачности */}
        <Deco x={108} y={6793 + Y} w={510} h={642} src="/images/rc_1-209.png" z={0} />
        <Deco x={725} y={6867 + Y} w={397} h={513} src="/images/rc_1-210.png" z={0} />
        <Deco x={520} y={6906 + Y} w={285} h={365} src="/images/rc_1-211.png" z={0} />

        <Reveal
          as="h2"
          className="tm-font-head absolute z-[3] whitespace-nowrap font-bold text-[#3D3D3D]"
          style={{ left: u(89), top: u(6803 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          ОТВЕТЫ НА ВОПРОСЫ
        </Reveal>
        <Deco x={632} y={6811 + Y} w={57} h={74} src="/images/frag_image_177_1-254.png" z={4} mobile="show" />
        <Hand x={739} y={6829 + Y} w={272} file="/images/texts/t_1-144.png" text="часто спрашивают" z={3} />
        <Hand x={1069} y={6826 + Y} w={100} file="/images/texts/t_1-85.png" text="нажми, чтобы узнать ответ" z={3} />
        <Deco x={1097} y={6857 + Y} w={77} h={72} src="/images/frag_image_164_1-253.png" z={3} />

        {/* аккордеон — строки 1064x67 c шагом 97, радиус 30, как во Figma */}
        <div className="absolute z-[3]" style={{ left: u(108), top: u(6925 + Y), width: u(1064) }}>
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="mb-0 overflow-hidden bg-[#F8F8F7] transition-all duration-300"
                style={{
                  borderRadius: u(30),
                  marginBottom: u(30),
                  height: isOpen ? undefined : u(67),
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="tm-font-body flex w-full items-center justify-between pl-[3.7cqw] pr-[3.3cqw] py-0 text-left font-medium text-[#3D3D3D] transition-colors hover:text-[#256BC6]"
                  style={{ fontSize: u(20), lineHeight: u(24.4), height: u(67) }}
                >
                  <span>{item.q}</span>
                  <span
                    className="relative ml-4 inline-flex shrink-0 items-center justify-center text-[#256BC6] transition-transform duration-300"
                    style={{ width: u(30), height: u(30), transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    aria-hidden
                  >
                    <span className="absolute h-[0.25cqw] w-full rounded bg-current" />
                    <span className="absolute h-full w-[0.25cqw] rounded bg-current" />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-300"
                  style={{ maxHeight: isOpen ? u(200) : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p
                    className="tm-font-body pl-[3.7cqw] pr-[3.3cqw] pb-[1.8cqw] font-medium text-[#3D3D3D]"
                    style={{ fontSize: u(17), lineHeight: u(24) }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* не нашли ответ */}
        <Hand x={340} y={7358 + Y} w={231} file="/images/texts/t_1-146.png" text="не нашли ответ?" z={3} />
        <Deco x={591} y={7324 + Y} w={80} h={60} src="/images/frag_image_177_1-257.png" z={3} mobile="show" />
        <div className="absolute z-[3]" style={{ left: u(681), top: u(7348 + Y) }}>
          <OrangeButton href="#form">
            <span style={{ fontSize: u(14) }}>ОСТАВИТЬ ЗАЯВКУ</span>
          </OrangeButton>
        </div>
        <Hand x={923} y={7349 + Y} w={229} file="/images/texts/t_1-148.png" text="и мы ответим на все вопросы" z={3} />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-5 py-12 md:hidden">
        <Reveal as="h2" className="tm-font-head text-4xl font-bold text-[#3D3D3D]">
          ОТВЕТЫ НА ВОПРОСЫ
        </Reveal>
        <img src="/images/texts/t_1-144.png" alt="часто спрашивают" className="mt-2 h-auto w-[52%]" />
        <div className="mt-6 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="rounded-2xl bg-[#F8F8F7] shadow-sm">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="tm-font-body flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[15px] font-medium text-[#3D3D3D]"
                >
                  <span>{item.q}</span>
                  <span
                    className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#256BC6] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    aria-hidden
                  >
                    <span className="absolute h-0.5 w-full rounded bg-current" />
                    <span className="absolute h-full w-0.5 rounded bg-current" />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-300"
                  style={{ maxHeight: isOpen ? "220px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="tm-font-body px-5 pb-4 text-sm font-medium text-[#3D3D3D]">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <img src="/images/texts/t_1-146.png" alt="не нашли ответ?" className="h-auto w-[44%]" />
          <OrangeButton href="#form">ОСТАВИТЬ ЗАЯВКУ</OrangeButton>
          <img src="/images/texts/t_1-148.png" alt="и мы ответим на все вопросы" className="h-auto w-[44%]" />
        </div>
      </div>
    </section>
  );
}
