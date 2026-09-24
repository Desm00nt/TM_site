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

const SITE_URL = "https://desm00nt.github.io";
const OG_IMAGE = "/TM_site/images/og-cover.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Территория МЫ — детский лагерь в Казани и Татарстане | Летние смены для детей",
    template: "%s | Территория МЫ",
  },
  description:
    "Детский лагерь «Территория МЫ» в Татарстане: летние смены для детей и подростков в ГК «Регина» (Мамадыш). 27 лет опыта, более 32 000 участников. 5-разовое питание, трансфер, медицинское сопровождение, круглосуточные вожатые. Офис в Казани — подберём путёвку!",
  keywords: [
    "территория мы",
    "детский лагерь",
    "лагерь",
    "лагерь казань",
    "детский лагерь казань",
    "отдых в казани",
    "детский отдых",
    "отдых для детей",
    "лагерь для детей",
    "летний лагерь",
    "детские лагеря казань",
    "лагерь татарстан",
    "лагерь мамадыш",
    "отдых для детей в татарстане",
    "летние смены для детей",
    "путёвка в детский лагерь",
    "детские каникулы",
    "интеллектуально-психологический лагерь",
    "лагерь регина",
    "куда отправить ребёнка летом",
  ],
  alternates: {
    canonical: "/TM_site/",
  },
  openGraph: {
    title: "Территория МЫ — лагерь, где становятся личностью",
    description:
      "Республиканский интеллектуально-психологический лагерь для детей в Татарстане. Летние смены в ГК «Регина», Мамадыш. Подберите смену на сайте!",
    url: "/TM_site/",
    siteName: "Территория МЫ",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Дети бегут на территории лагеря «Территория МЫ»",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Территория МЫ — детский лагерь в Казани и Татарстане",
    description:
      "Летние смены для детей и подростков в ГК «Регина», Мамадыш. 27 лет опыта, более 32 000 участников.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "RU-TA",
    "geo.placename": "Казань, Республика Татарстан",
    "geo.position": "55.7892;49.1437",
    ICBM: "55.7892, 49.1437",
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
