#!/usr/bin/env python3
"""Нарезка длинного рендера на вертикальные куски для просмотра."""
from PIL import Image
import os

src = Image.open('/home/z/my-project/figma/render_desktop_full.png')
w, h = src.size
print(f"Размер: {w}x{h}")
os.makedirs('/home/z/my-project/figma/preview', exist_ok=True)

chunk = 1100
n = (h + chunk - 1) // chunk
for i in range(n):
    top = i * chunk
    bot = min(h, top + chunk + 60)  # небольшой перехлёст
    crop = src.crop((0, top, w, bot))
    out = f'/home/z/my-project/figma/preview/sec_{i:02d}_y{top}.png'
    crop.save(out)
    print(out)
