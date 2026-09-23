#!/usr/bin/env python3
"""Обработка ассетов: ресайз до 2x размера в макете, WebP для фото, PNG для прозрачных."""
import json
import os
from PIL import Image

SRC = '/home/z/my-project/figma/img'
DST = '/home/z/my-project/public/images'
os.makedirs(DST, exist_ok=True)

# соберём все использования изображений из всех нод
usages = {}  # file -> max display size

def collect(nodes_json, root_id):
    with open(nodes_json) as f:
        d = json.load(f)
    doc = d['nodes'][root_id]['document']
    bb = doc.get('absoluteBoundingBox') or {'x': 0, 'y': 0}
    ox, oy = bb.get('x', 0), bb.get('y', 0)

    def walk(n):
        if n.get('type') in ('RECTANGLE', 'ELLIPSE', 'VECTOR', 'INSTANCE', 'FRAME', 'GROUP'):
            for fl in n.get('fills', []):
                if fl.get('type') == 'IMAGE' and fl.get('visible', True) and fl.get('imageRef'):
                    b = n.get('absoluteBoundingBox') or {}
                    w, h = b.get('width', 0), b.get('height', 0)
                    ref = fl['imageRef']
                    usages[ref] = max(usages.get(ref, (0, 0)), (w, h), key=lambda t: t[0] * t[1])
        for c in n.get('children', []):
            walk(c)

    walk(doc)


collect('/home/z/my-project/figma/nodes_1-12.json', '1:12')
collect('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '1:298')
collect('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '1:327')
collect('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '17:8')

with open('/home/z/my-project/figma/ref_map.json') as f:
    rm = json.load(f)
ref_to_file = rm['ref_to_file']

report, total_before, total_after = [], 0, 0
for ref, (w, h) in usages.items():
    fname = ref_to_file.get(ref)
    if not fname:
        continue
    src_path = os.path.join(SRC, fname)
    if not os.path.exists(src_path):
        continue
    img = Image.open(src_path)
    ow, oh = img.size
    has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
    if has_alpha:
        img = img.convert('RGBA')
        alpha = img.getchannel('A')
        lo, hi = alpha.getextrema()
        has_alpha = lo < 250  # реально есть прозрачность

    # целевая ширина: 2x от отображаемого размера, капы
    target_w = min(int(w * 2), 1600)
    if ow > target_w:
        ratio = target_w / ow
        img = img.resize((target_w, max(1, int(oh * ratio))), Image.LANCZOS)

    base = fname.rsplit('.', 1)[0]
    if has_alpha:
        out_path = os.path.join(DST, base + '.png')
        img.save(out_path, 'PNG', optimize=True)
    else:
        out_path = os.path.join(DST, base + '.webp')
        img = img.convert('RGB')
        img.save(out_path, 'WEBP', quality=82)
    b, a = os.path.getsize(src_path), os.path.getsize(out_path)
    total_before += b
    total_after += a
    report.append({'file': os.path.basename(out_path), 'orig': f'{ow}x{oh}', 'new': f'{img.size[0]}x{img.size[1]}',
                   'alpha': has_alpha, 'disp': f'{int(w)}x{int(h)}', 'kb': a // 1024})

report.sort(key=lambda r: -r['kb'])
with open('/home/z/my-project/figma/assets_report.json', 'w') as f:
    json.dump(report, f, ensure_ascii=False, indent=1)

print(f"Файлов: {len(report)}, было {total_before // 1048576} МБ -> стало {total_after // 1048576} МБ")
for r in report[:15]:
    print(f"{r['kb']:>6} КБ {r['file'][:50]:<50} {r['orig']} -> {r['new']} disp={r['disp']}")
