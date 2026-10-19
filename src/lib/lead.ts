// Отправка заявок с статического сайта (GitHub Pages) — без собственного бэкенда.
// Заявка уходит на внешний сервис форм (Formspree / Web3Forms / Getform и т.п.),
// который пересылает её на почту организаторов. Адрес сервиса задаётся при сборке:
//   NEXT_PUBLIC_LEAD_ENDPOINT   — URL формы, например https://formspree.io/f/xxxxxxx
//   NEXT_PUBLIC_LEAD_ACCESS_KEY — (необязательно) ключ для Web3Forms
// По умолчанию — Web3Forms. Access key у Web3Forms публичный по замыслу (его кладут в клиентский код),
// он только разрешает отправку на привязанную почту.
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_LEAD_ACCESS_KEY || "058cf620-bb77-4a9e-bb8a-3a1c779f135f";

export type LeadResult = "sent" | "stored" | "error";

export function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  let out = "+7";
  if (p[0]) out += " (" + p[0] + (p[0].length === 3 ? ")" : "");
  if (p[1]) out += " " + p[1];
  if (p[2]) out += "-" + p[2];
  if (p[3]) out += "-" + p[3];
  return out;
}

export const isPhoneValid = (v: string) => v.replace(/\D/g, "").length === 11;

function store(lead: Record<string, string>) {
  try {
    const key = "tm_leads";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push({ ...lead, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* приватный режим */
  }
}

export async function sendLead(name: string, phone: string): Promise<LeadResult> {
  const lead = { name: name.trim(), phone: phone.trim() };
  if (!LEAD_ENDPOINT) {
    store(lead);
    return "stored";
  }
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...lead,
        ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
        subject: "Заявка с сайта «Территория МЫ»",
        source: typeof location !== "undefined" ? location.href : "",
      }),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json().catch(() => ({}));
    if (data && data.success === false) throw new Error("rejected");
    return "sent";
  } catch {
    store(lead);
    return "error";
  }
}
