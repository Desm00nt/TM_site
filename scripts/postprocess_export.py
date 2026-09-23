"""Постобработка статического экспорта Next.js под basePath /TM_site.

next/image и next/link получают basePath автоматически, но прямые
src="/images/..." в JSX-атрибутах и строковых литералах бандла — нет.
Замены идемпотентны (повторный запуск не добавит второй префикс).
"""
import pathlib
import re

ROOT = pathlib.Path("/home/z/my-project/out")
BP = "/TM_site"
EXTS = {".html", ".js", ".css", ".txt", ".xml", ".webmanifest", ".svg", ".json"}

patched = 0
for p in ROOT.rglob("*"):
    if not p.is_file() or p.suffix.lower() not in EXTS:
        continue
    s = p.read_text(encoding="utf-8", errors="ignore")
    s2 = s
    # 1) корневые href/src в атрибутах — кроме протокольных // и уже префиксованных
    s2 = re.sub(r'((?:href|src)=")/(?!/|TM_site/)', rf"\1{BP}/", s2)
    # 2) строковые литералы и css-url с /images/ и /_next/
    s2 = s2.replace('"/images/', f'"{BP}/images/')
    s2 = s2.replace("'/images/", f"'{BP}/images/")
    s2 = re.sub(r"\(/images/", f"({BP}/images/", s2)
    s2 = s2.replace('"/_next/', f'"{BP}/_next/')
    s2 = s2.replace("('/_next/", f"('{BP}/_next/")
    if s2 != s:
        p.write_text(s2, encoding="utf-8")
        patched += 1

print(f"пропатчено файлов: {patched}")
