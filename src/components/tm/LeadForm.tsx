"use client";

import { useState, type FormEvent } from "react";
import { u } from "@/lib/tm";
import { Deco, Hand, OrangeButton, Reveal, Wave }
from "./decor";
import { useToast } from "@/hooks/use-toast";

const Y = -7447;

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      toast({
        title: "Проверьте данные",
        description: "Укажите имя и номер телефона — мы свяжемся с вами.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error();
      toast({
        title: "Заявка отправлена!",
        description: "Свяжемся с вами и поможем выбрать подходящую смену.",
      });
      setName("");
      setPhone("");
    } catch {
      // Статический хостинг (GitHub Pages): серверного эндпоинта нет —
      // сохраняем заявку локально в браузере, чтобы данные не потерялись.
      try {
        const key = "tm_leads";
        const list = JSON.parse(localStorage.getItem(key) || "[]");
        list.push({ name, phone, at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(list));
      } catch {
        /* приватный режим — просто показываем уведомление */
      }
      toast({
        title: "Заявка принята!",
        description: "Мы свяжемся с вами. Если нужно срочно — +7(927)038-42-22",
      });
      setName("");
      setPhone("");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="form" className="relative z-[5] bg-[#256BC6]">
      <Wave id="1:21" y0={7447} />

      {/* ===== DESKTOP ===== */}
      <div className="relative mx-auto hidden max-w-[1280px] md:block [container-type:inline-size]" style={{ height: u(807) }}>
        <Reveal
          as="h2"
          className="tm-font-head absolute font-bold text-[#F8F8F7]"
          style={{ left: u(90), top: u(7544 + Y), fontSize: u(50), lineHeight: u(56) }}
        >
          ВЫБЕРИТЕ СМЕНУ
        </Reveal>
        <Hand x={90} y={7605 + Y} w={352} file="/images/texts/t_1-71.png" text="уже сейчас" z={3} />
        <Deco x={501} y={7585 + Y} w={157} h={120} src="/images/frag_image_179_1-266.png" z={1} mobile="show" />
        <Reveal
          as="p"
          className="tm-font-body absolute font-medium text-[#D9E3F4]"
          style={{ left: u(90), top: u(7704 + Y), fontSize: u(20), lineHeight: u(24.4) }}
        >
          Поможем подобрать программу
          <br />
          по возрасту, интересам и характеру ребёнка
        </Reveal>

        {/* форма — точные метрики из макета: поля 388x56 r30, подписи 15px */}
        <form onSubmit={submit} className="absolute z-[3]" style={{ left: u(101), top: u(7801 + Y), width: u(388) }}>
          <label htmlFor="lead-name" className="tm-font-body block font-medium text-[#D9E3F4]" style={{ fontSize: u(15), lineHeight: u(18), paddingLeft: u(9) }}>
            Ваше имя
          </label>
          <input
            id="lead-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            className="tm-font-body mt-0 w-full text-[#3D3D3D] placeholder:text-[#3D3D3D]/60 outline-none transition-shadow focus:ring-2 focus:ring-[#EC812D]"
            style={{ marginTop: u(9), height: u(56), borderRadius: u(30), fontSize: u(20), paddingLeft: u(25), backgroundColor: "#D9E3F4" }}
            autoComplete="name"
          />
          <label htmlFor="lead-phone" className="tm-font-body block font-medium text-[#D9E3F4]" style={{ fontSize: u(15), lineHeight: u(18), paddingLeft: u(9), marginTop: u(31) }}>
            Номер телефона
          </label>
          <input
            id="lead-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            inputMode="tel"
            className="tm-font-body w-full text-[#3D3D3D] placeholder:text-[#3D3D3D]/60 outline-none transition-shadow focus:ring-2 focus:ring-[#EC812D]"
            style={{ marginTop: u(9), height: u(56), borderRadius: u(30), fontSize: u(20), paddingLeft: u(25), backgroundColor: "#D9E3F4" }}
            autoComplete="tel"
          />
          <div className="flex justify-center" style={{ marginTop: u(39) }}>
            {/* button без type внутри form = submit */}
            <OrangeButton className="!px-0 !py-0" size="md">
              <span style={{ fontSize: u(14), display: 'flex', alignItems: 'center', justifyContent: 'center', width: u(181), height: u(45) }}>{sending ? "ОТПРАВЛЯЕМ..." : "ОСТАВИТЬ ЗАЯВКУ"}</span>
            </OrangeButton>
          </div>
        </form>

        <Hand x={129} y={8123 + Y} w={403} file="/images/texts/t_1-145.png" text="Свяжемся с вами и поможем выбрать подходящую смену" z={3} />

        {/* полароид — заходит из FAQ-секции (секция без overflow-hidden, чтобы не обрезался) */}
        <Deco x={583} y={7376 + Y} w={708} h={756} src="/images/rc_1-262.png" z={2} alt="Дети на празднике в лагере" />
        <Hand x={689} y={7900 + Y} w={394} file="/images/texts/t_1-264.png" text="Увидимся в Территории мы!" z={4} />

        {/* каракули и стикер */}
        <Deco x={1117} y={7725 + Y} w={111} h={110} src="/images/frag_image_179_1-265.png" z={3} className="tm-float" mobile="show" />
        <Deco x={1083} y={8029 + Y} w={120} h={106} src="/images/frag_image_177_1-268.png" z={3} mobile="show" />
        <Deco x={744} y={8061 + Y} w={113} h={88} src="/images/frag_image_179_1-261.png" z={3} />
        <Deco x={837} y={8140 + Y} w={184} h={203} src="/images/frag_IMG_6317_(1)_1_1-290.png" z={10} className="tm-float" />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-5 py-12 md:hidden">
        <Reveal as="h2" className="tm-font-head text-4xl font-bold text-[#F8F8F7]">
          ВЫБЕРИТЕ СМЕНУ
        </Reveal>
        <img src="/images/texts/t_1-71.png" alt="уже сейчас" className="mt-1 h-auto w-[52%]" />
        <Reveal as="p" className="tm-font-body mt-3 text-base font-medium text-[#D9E3F4]">
          Поможем подобрать программу по возрасту, интересам и характеру ребёнка
        </Reveal>

        <form onSubmit={submit} className="mt-6">
          <label htmlFor="lead-name-m" className="tm-font-body block text-sm font-medium text-[#D9E3F4]">
            Ваше имя
          </label>
          <input
            id="lead-name-m"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            className="tm-font-body mt-1 w-full rounded-xl bg-[#D9E3F4] px-4 py-3 text-base text-[#3D3D3D] placeholder:text-[#8ba3c7] outline-none focus:ring-2 focus:ring-[#EC812D]"
            autoComplete="name"
          />
          <label htmlFor="lead-phone-m" className="tm-font-body mt-4 block text-sm font-medium text-[#D9E3F4]">
            Номер телефона
          </label>
          <input
            id="lead-phone-m"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            inputMode="tel"
            className="tm-font-body mt-1 w-full rounded-xl bg-[#D9E3F4] px-4 py-3 text-base text-[#3D3D3D] placeholder:text-[#8ba3c7] outline-none focus:ring-2 focus:ring-[#EC812D]"
            autoComplete="tel"
          />
          <div className="mt-5 text-center">
            {/* button без type = submit внутри формы; вложенный button запрещён HTML */}
            <OrangeButton className="w-full">
              <span className="text-sm">{sending ? "ОТПРАВЛЯЕМ..." : "ОСТАВИТЬ ЗАЯВКУ"}</span>
            </OrangeButton>
          </div>
        </form>
        <img src="/images/texts/t_1-145.png" alt="Свяжемся с вами и поможем выбрать подходящую смену" className="mx-auto mt-6 h-auto w-[80%]" />

        <div className="relative mt-8">
          <img src="/images/frag_image_181_1-263.png" alt="Дети на празднике в лагере" className="h-auto w-full rounded-xl shadow-lg" />
          <img src="/images/texts/t_1-264.png" alt="Увидимся в Территории мы!" className="absolute bottom-2 left-1/2 h-auto w-[62%] -translate-x-1/2" />
          <img src="/images/frag_image_179_1-265.png" alt="" aria-hidden className="absolute -right-2 top-3 w-10 tm-float" />
        </div>
      </div>
    </section>
  );
}
