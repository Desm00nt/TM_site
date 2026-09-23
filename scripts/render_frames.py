#!/usr/bin/env python3
"""Рендер фреймов целиком для визуальной проверки."""
import json
import subprocess
import time

TOKEN = "FIGD_TOKEN_REMOVED"
KEY = "UoIfFG8jHL6avKjPKokZCo"

frames = [
    ('1:12', 1.0, 'desktop_full'),      # весь лендинг 1280x8732
    ('1:298', 1.0, 'popup'),            # попап смены
    ('1:327', 1.0, 'faq_open'),         # открытый FAQ
    ('17:8', 1.0, 'reviews'),           # отзывы
]
ids = ','.join(f[0] for f in frames)
url = f"https://api.figma.com/v1/images/{KEY}?ids={ids}&format=png&scale=1"
r = subprocess.run(["curl", "-s", "-H", f"X-Figma-Token: {TOKEN}", url],
                   capture_output=True, text=True, timeout=180)
imgs = json.loads(r.stdout).get('images', {})
for fid, scale, name in frames:
    u = imgs.get(fid)
    if not u:
        print(f"НЕТ URL для {name}")
        continue
    out = f"/home/z/my-project/figma/render_{name}.png"
    print(f"Качаю {name}...")
    subprocess.run(["curl", "-s", "-L", "-o", out, u], timeout=300)
    time.sleep(0.3)
print("Готово")
