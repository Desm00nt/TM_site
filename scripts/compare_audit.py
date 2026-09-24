#!/usr/bin/env python3
"""Side-by-side audit: Figma render (ground truth) vs site screenshot, sliced."""
from PIL import Image, ImageDraw

FIGMA = '/home/z/my-project/figma/render_desktop_full.png'
SITE = '/home/z/my-project/figma/check_desktop_final.png'
OUT = '/home/z/my-project/figma/audit'

import os
os.makedirs(OUT, exist_ok=True)

fig = Image.open(FIGMA).convert('RGB')
site = Image.open(SITE).convert('RGB')

W, H = fig.size
N = 8
step = H // N  # 1091
scale = 0.42

for i in range(N):
    y0 = i * step
    y1 = min(H, (i + 1) * step + 60)  # small overlap
    f = fig.crop((0, y0, W, y1))
    s = site.crop((0, y0, W, min(site.size[1], y1)))
    h = max(f.size[1], s.size[1])
    combo = Image.new('RGB', (W * 2 + 30, h + 30), (30, 30, 30))
    combo.paste(f, (0, 30))
    combo.paste(s, (W + 30, 30))
    d = ImageDraw.Draw(combo)
    d.text((10, 8), f'FIGMA y={y0}-{y1}', fill=(255, 220, 0))
    d.text((W + 40, 8), f'SITE  y={y0}-{y1}', fill=(0, 255, 120))
    d.line([(W + 15, 0), (W + 15, h + 30)], fill=(255, 255, 255), width=2)
    combo = combo.resize((int(combo.size[0] * scale), int(combo.size[1] * scale)), Image.LANCZOS)
    combo.save(f'{OUT}/cmp_{i:02d}.png')
    print(f'cmp_{i:02d}.png', combo.size)
print('done')
