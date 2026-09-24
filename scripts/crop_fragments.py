#!/usr/bin/env python3
"""Вырезание CROP-фрагментов из листов-паттернов по imageTransform + копирование волн."""
import json
import os
from PIL import Image

SRC = '/home/z/my-project/figma/img'       # оригиналы
DST = '/home/z/my-project/public/images'
os.makedirs(DST, exist_ok=True)


def collect_usage(nodes_json, root_id):
    with open(nodes_json) as f:
        d = json.load(f)
    doc = d['nodes'][root_id]['document']
    bb = doc.get('absoluteBoundingBox') or {'x': 0, 'y': 0}
    ox, oy = bb.get('x', 0), bb.get('y', 0)
    out = []

    def walk(n):
        if n.get('type') in ('RECTANGLE', 'ELLIPSE', 'VECTOR', 'INSTANCE', 'FRAME', 'GROUP'):
            b = n.get('absoluteBoundingBox') or {}
            w, h = b.get('width', 0), b.get('height', 0)
            for fl in n.get('fills', []):
                if fl.get('type') != 'IMAGE' or not fl.get('visible', True) or not fl.get('imageRef'):
                    continue
                tr = fl.get('imageTransform')
                if fl.get('scaleMode') == 'STRETCH' and tr and (abs(tr[0][0] - 1) > 1e-4 or abs(tr[1][1] - 1) > 1e-4):
                    out.append({
                        'ref': fl['imageRef'],
                        'x0': tr[0][2], 'y0': tr[1][2], 'cw': tr[0][0], 'ch': tr[1][1],
                        'disp_w': w, 'disp_h': h,
                        'name': n.get('name'), 'id': n.get('id'),
                        'x': round(b.get('x', 0) - ox), 'y': round(b.get('y', 0) - oy),
                    })
        for c in n.get('children', []):
            walk(c)

    walk(doc)
    return out


usages = []
usages += collect_usage('/home/z/my-project/figma/nodes_1-12.json', '1:12')
usages += collect_usage('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '1:298')
usages += collect_usage('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '1:327')
usages += collect_usage('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '17:8')
print(f"Usage с imageTransform: {len(usages)}")

with open('/home/z/my-project/figma/ref_map.json') as f:
    rm = json.load(f)
ref_to_file = rm['ref_to_file']

# уникальность: ref + округлённый трансформ
seen = {}
for u in usages:
    key = (u['ref'], round(u['x0'], 4), round(u['y0'], 4), round(u['cw'], 4), round(u['ch'], 4))
    if key not in seen:
        seen[key] = u

made = 0
for key, u in seen.items():
    orig_name = ref_to_file.get(u['ref'])
    if not orig_name:
        continue
    orig_path = os.path.join(SRC, orig_name)
    if not os.path.exists(orig_path):
        continue
    img = Image.open(orig_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    W, H = img.size
    x0, y0 = u['x0'] * W, u['y0'] * H
    x1, y1 = x0 + u['cw'] * W, y0 + u['ch'] * H
    crop = img.crop((max(0, int(x0)), max(0, int(y0)), min(W, round(x1)), min(H, round(y1))))
    # ресайз до 2x отображения
    tw = max(2, min(int(u['disp_w'] * 2), 800))
    if crop.size[0] > tw:
        crop = crop.resize((tw, max(1, round(crop.size[1] * tw / crop.size[0]))), Image.LANCZOS)
    safe = u['name'].replace(' ', '_').replace('/', '_')[:24]
    out_name = f"frag_{safe}_{u['id'].replace(':', '-')}.png"
    crop.save(os.path.join(DST, out_name), 'PNG', optimize=True)
    made += 1
    u['file'] = out_name

with open('/home/z/my-project/figma/fragments.json', 'w') as f:
    json.dump(list(seen.values()), f, ensure_ascii=False, indent=1)
print(f"Вырезано фрагментов: {made}")

# --- волны в public ---
import shutil
waves = [f for f in os.listdir(SRC) if f.startswith('wave_')]
for w in waves:
    shutil.copy(os.path.join(SRC, w), os.path.join(DST, w))
print(f"Скопировано волн: {len(waves)}")
print("Всего файлов в public/images:", len(os.listdir(DST)))
