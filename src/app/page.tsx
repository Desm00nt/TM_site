import Hero from "@/components/tm/Hero";
import About from "@/components/tm/About";
import WhyUs from "@/components/tm/WhyUs";
import Shifts from "@/components/tm/Shifts";
import Moments from "@/components/tm/Moments";
import Reviews from "@/components/tm/Reviews";
import Faq from "@/components/tm/Faq";
import LeadForm from "@/components/tm/LeadForm";
import Footer from "@/components/tm/Footer";
import { FAQ, SHIFTS } from "@/lib/tm";

const SITE_URL = "https://desm00nt.github.io/TM_site/";

/** Микроразметка schema.org: сайт + лагерь (LocalSEO) + FAQ (расширенный сниппет) */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Территория МЫ",
      inLanguage: "ru-RU",
      description:
        "Официальный сайт республиканского интеллектуально-психологического лагеря «Территория МЫ» (Татарстан).",
    },
    {
      "@type": ["Organization", "CampSite"],
      "@id": `${SITE_URL}#camp`,
      name: "Территория МЫ",
      alternateName: ["ТМ", "Территория Мы", "ТМ лагерь"],
      slogan: "Лагерь, где становятся личностью",
      description:
        "Республиканский интеллектуально-психологический детский лагерь. Летние смены для детей и подростков в ГК «Регина» (Мамадыш, Татарстан), офис в Казани. 27 лет опыта, более 32 000 участников.",
      url: SITE_URL,
      image: [`${SITE_URL}images/og-cover.jpg`, `${SITE_URL}images/obschee_foto_1-24.webp`],
      logo: `${SITE_URL}images/og-cover.jpg`,
      telephone: "+7 (927) 038-42-22",
      foundingDate: "1999",
      priceRange: "69800 RUB",
      areaServed: ["Казань", "Республика Татарстан"],
      address: [
        {
          "@type": "PostalAddress",
          name: "Офис в Казани",
          streetAddress: "ул. Спартаковская, 2к1",
          addressLocality: "Казань",
          addressRegion: "Республика Татарстан",
          addressCountry: "RU",
        },
        {
          "@type": "PostalAddress",
          name: "Лагерь — ГК «Регина»",
          streetAddress: "Гостиничный комплекс «Регина»",
          addressLocality: "Мамадыш",
          addressRegion: "Республика Татарстан",
          addressCountry: "RU",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.7892,
        longitude: 49.1437,
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "5-разовое питание", value: true },
        { "@type": "LocationFeatureSpecification", name: "Медицинское сопровождение", value: true },
        { "@type": "LocationFeatureSpecification", name: "Трансфер", value: true },
        { "@type": "LocationFeatureSpecification", name: "Круглосуточные вожатые", value: true },
      ],
      makesOffer: SHIFTS.map((s) => ({
        "@type": "Offer",
        name: `Летняя смена ${s.name.replace(/\n/g, " ")}`,
        description: s.cardDesc.replace(/\u2028/g, " "),
        price: s.price.replace(/\s/g, ""),
        priceCurrency: "RUB",
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Текстовое описание для поисковых систем и скринридеров (визуально скрыто,
          весь видимый контент страницы остаётся без изменений) */}
      <section className="sr-only" aria-label="О лагере Территория МЫ">
        <h2>Детский лагерь «Территория МЫ» — летний отдых для детей в Казани и Татарстане</h2>
        <p>
          «Территория МЫ» — республиканский интеллектуально-психологический лагерь для детей и
          подростков. Летние смены проходят в гостиничном комплексе «Регина» в Мамадыше, офис
          находится в Казани (ул. Спартаковская, 2к1). За 27 лет лагерь принял более 32 000
          участников и занимает 1 место в рейтинге. Программы для школьников с 1 по 11 класс:
          квесты и сюжетно-ролевые игры, психологические тренинги, профориентационные мастерские,
          English Camp, творчество и спорт. Детский отдых в Татарстане — смены «КвесТТеРРа: Эпоха
          Просвещения», «Эти Тонкие МирЫ», «ПрофТерра» и «ТМ-фест Вселенная игр». В стоимость
          путёвки входят проживание, 5-разовое питание, трансфер, медицинское сопровождение и
          работа педагогической команды; в отрядах по 12–13 человек вожатые находятся рядом
          круглосуточно. Подобрать путёвку в детский лагерь и задать вопросы: телефон
          +7 (927) 038-42-22, группы Вконтакте и Телеграм.
        </p>
      </section>

      <Hero />
      <About />
      <WhyUs />
      <Shifts />
      <Moments />
      <Reviews />
      <Faq />
      <LeadForm />
      <Footer />
    </main>
  );
}
