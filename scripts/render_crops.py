#!/usr/bin/env python3
"""Crop exact node regions from the official Figma frame render (1:1 ground truth)."""
from PIL import Image
import os

SRC = '/home/z/my-project/figma/render_desktop_full.png'
OUT = '/home/z/my-project/public/images'
os.makedirs(OUT, exist_ok=True)

# node id -> (x, y, w, h) — exact absoluteBoundingBox в координатах фрейма
NODES = {
    '1-24':  (742, 254, 425, 430),   # фото в полароиде героя
    '1-117': (859, 2779, 348, 300),  # whyus правое фото
    '1-119': (765, 2787, 281, 263),  # whyus среднее
    '1-118': (634, 2795, 327, 292),  # whyus левое
    '1-185': (42, 5056, 289, 268),
    '1-186': (383, 5106, 251, 242),
    '1-187': (670, 5098, 342, 279),
    '1-189': (32, 5402, 338, 265),
    '1-190': (396, 5459, 337, 208),
    '1-191': (772, 5432, 276, 313),
    '1-192': (1038, 5348, 377, 311),
    '1-263': (701, 7488, 484, 475),  # фото в полароиде формы
    '1-210': (725, 6867, 397, 513),  # знак вопроса 2
    '1-211': (520, 6906, 285, 365),  # знак вопроса 3
}

fig = Image.open(SRC).convert('RGB')
for nid, (x, y, w, h) in NODES.items():
    crop = fig.crop((x, y, x + w, y + h))
    path = f'{OUT}/rc_{nid}.png'
    crop.save(path, optimize=True)
    print(f'rc_{nid}.png {w}x{h} {os.path.getsize(path)//1024}KB')
print('done')
