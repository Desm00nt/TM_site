# Территория МЫ — сайт детского лагеря

Лендинг Республиканского интеллектуально-психологического лагеря «Территория МЫ»,
собранный 1:1 из Figma-макета (desktop + mobile).

**Живая версия:** https://desm00nt.github.io/TM_site/

## Стек

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Prisma + SQLite (серверная приём заявок — работает при запуске с Node-сервером)

## Структура

```
src/app/            — страница, layout, API-роут заявок (/api/lead)
src/components/tm/  — секции лендинга (Hero, About, WhyUs, Shifts, Moments,
                      Reviews, Faq, LeadForm, Header, Footer, декор)
src/lib/            — данные контента (tm.ts), спека макета (tm-spec.ts), волны (tm-waves.ts)
public/images/      — все ассеты, выгруженные из Figma
scripts/            — скрипты выгрузки/обработки ассетов Figma и сборки статики
```

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

Форма заявки на дев-сервере пишет в SQLite (`db/custom.db`, модель `Lead`).

## Деплой на GitHub Pages (статика)

```bash
npm run build:static   # соберёт out/ с basePath /TM_site и постобработкой ссылок
```

Содержимое `out/` публикуется в ветке `gh-pages`.
На статическом хостинге у формы нет бэкенда: заявки сохраняются в
localStorage браузера (ключ `tm_leads`). Для приёма заявок «в облако»
подключите любой форм-сервис (Formspree, Telegram-бот и т.п.) в
`src/components/tm/LeadForm.tsx`.

## Контент

Все тексты, фотографии, геометрия (координаты, размеры, радиусы, повороты),
цвета и шрифты (Philosopher, Montserrat, рукописный Mariinavo в PNG-экспорте)
взяты из Figma-файла макета.
