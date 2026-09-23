import type { Metadata } from "next";
import { Philosopher, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const philosopher = Philosopher({
  variable: "--font-philosopher",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Территория МЫ — Республиканский интеллектуально-психологический лагерь",
  description:
    "Лагерь, где становятся личностью. Летние смены для детей в ГК «Регина», Мамадыш. 27 лет опыта, более 32 000 счастливых участников. Территория достижений, креативности, сплочения, развития и комфорта.",
  keywords: [
    "детский лагерь",
    "территория мы",
    "летние смены",
    "лагерь Татарстан",
    "интеллектуально-психологический лагерь",
  ],
  openGraph: {
    title: "Территория МЫ — лагерь, где становятся личностью",
    description:
      "Республиканский интеллектуально-психологический лагерь. Выберите своё лето с нами!",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${philosopher.variable} ${montserrat.variable} antialiased bg-[#D9E3F4] text-[#3D3D3D] font-[family-name:var(--font-montserrat)]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
