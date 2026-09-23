import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim().slice(0, 100);
    const phone = String(body?.phone ?? "").trim().slice(0, 30);

    if (!name || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Укажите имя и корректный телефон" }, { status: 400 });
    }

    const lead = await db.lead.create({
      data: { name, phone, source: "landing" },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("lead error:", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
