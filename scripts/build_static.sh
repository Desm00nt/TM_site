#!/usr/bin/env bash
# Статическая сборка сайта для GitHub Pages (репозиторий Desm00nt/TM_site).
set -e
cd /home/z/my-project

API_BACKUP=/tmp/tm_api_backup

cleanup() {
  if [ -d "$API_BACKUP" ]; then
    mv "$API_BACKUP" src/app/api
    echo "API-роуты возвращены на место"
  fi
}
trap cleanup EXIT

# 1) На время экспорта убираем серверные API-роуты (на GitHub Pages бэкенда нет)
if [ -d src/app/api ]; then
  mv src/app/api "$API_BACKUP"
  echo "API-роуты временно убраны"
fi

# 2) Статический экспорт
rm -rf out
BUILD_STATIC=1 npx next build

# 3) .nojekyll — чтобы GitHub Pages отдавал папку _next
touch out/.nojekyll

# 4) basePath для прямых ссылок на ассеты
python3 scripts/postprocess_export.py

echo "Готово: out/ ($(du -sh out | cut -f1))"
