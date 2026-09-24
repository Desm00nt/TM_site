#!/usr/bin/env python3
"""Спецификация макета: все изображения по секциям с позициями + рендер мелких векторов-декора."""
import json
import subprocess
import time

with open('/home/z/my-project/figma/content_desktop.json') as f:
    content = json.load(f)
with open('/home/z/my-project/figma/ref_map.json') as f:
    rm = json.load(f)
ref_to_file = rm['ref_to_file']

SECTIONS = [
    ('HEADER+HERO', 0, 640),
    ('O-NAS', 640, 2610),
    ('POCHEMU', 2610, 3980),
    ('SMENY', 3980, 4770),
    ('MOMENTY', 4770, 5870),
    ('OTZYVY', 5870, 6695),
    ('FAQ', 6695, 7450),
    ('FORMA', 7450, 8255),
    ('FOOTER', 8255, 8740),
]


def sec_of(y):
    for name, a, b in SECTIONS:
        if a <= y < b:
            return name
    return '?'


rows = []
for im in content['images']:
    f = ref_to_file.get(im['ref'])
    if f:
        rows.append({**im, 'file': f, 'sec': sec_of(im['y'])})

rows.sort(key=lambda r: (SECTIONS.index(next(s for s in SECTIONS if s[0] == r['sec'])), r['y'], r['x']))
with open('/home/z/my-project/figma/layout_images.json', 'w') as f:
    json.dump(rows, f, ensure_ascii=False, indent=1)

cur = None
for r in rows:
    if r['sec'] != cur:
        cur = r['sec']
        print(f"\n=== {cur} ===")
    print(f"  ({r['x']:>4},{r['y']:>5}) {r['w']:>4}x{r['h']:<4} {r['file'][:44]:<44} {r['name'][:20]}")

# --- рендер мелких векторов-декора ---
small_vectors = [im for im in rows if im['w'] < 200 and im['h'] < 200]
print(f"\nМелких декоров: {len(small_vectors)} (уже есть файлами)")

# векторы без image fills, которые надо отрендерить отдельно
with open('/home/z/my-project/figma/nodes_1-12.json') as f:
    d = json.load(f)
doc = d['nodes']['1:12']['document']
bb = doc['absoluteBoundingBox']
ox, oy = bb['x'], bb['y']
todo = []


def walk(n):
    if n.get('type') == 'VECTOR':
        b = n.get('absoluteBoundingBox') or {}
        w, h = b.get('width', 0), b.get('height', 0)
        # не волны, не линии 0-ширины
        if w < 400 and h < 400 and w > 8 and h > 8:
            fills = n.get('fills', [])
            strokes = n.get('strokes', [])
            if fills or strokes:
                todo.append({'id': n['id'], 'name': n['name'],
                             'x': round(b['x'] - ox), 'y': round(b['y'] - oy),
                             'w': round(w), 'h': round(h)})
    for c in n.get('children', []):
        walk(c)


walk(doc)
# уникальные по имени
seen = {}
for v in todo:
    key = v['name']
    if key not in seen:
        seen[key] = v
todo = list(seen.values())
print(f"\nВекторов для рендера: {len(todo)}")
ids = ','.join(v['id'] for v in todo)
TOKEN = "FIGD_TOKEN_REMOVED"
KEY = "UoIfFG8jHL6avKjPKokZCo"
url = f"https://api.figma.com/v1/images/{KEY}?ids={ids}&format=png&scale=3"
r = subprocess.run(['curl', '-s', '-H', f'X-Figma-Token: {TOKEN}', url], capture_output=True, text=True, timeout=120)
imgs = json.loads(r.stdout).get('images', {})
import os
for v in todo:
    u = imgs.get(v['id'])
    if not u:
        continue
    out = f"/home/z/my-project/public/images/decor_{v['name'].replace(' ', '_')}_{v['id'].replace(':', '-')}.png"
    subprocess.run(['curl', '-s', '-L', '-o', out, u], timeout=60)
    time.sleep(0.05)
    print(f"  decor: {v['name']} ({v['w']}x{v['h']}) @({v['x']},{v['y']}) -> {os.path.basename(out)}")

with open('/home/z/my-project/figma/decor_vectors.json', 'w') as f:
    json.dump(todo, f, ensure_ascii=False, indent=1)
