#!/usr/bin/env python3
"""Экспорт всех текстов шрифтом Mariinavo как прозрачных PNG @3x."""
import json
import os
import subprocess
import time

TOKEN = "FIGD_TOKEN_REMOVED"
KEY = "UoIfFG8jHL6avKjPKokZCo"
DST = '/home/z/my-project/public/images/texts'
os.makedirs(DST, exist_ok=True)

NODES = [
    ('/home/z/my-project/figma/nodes_1-12.json', '1:12'),
    ('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '1:298'),
    ('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '1:327'),
    ('/home/z/my-project/figma/nodes_30-8_30-299_17-8_1-298_1-327.json', '17:8'),
]

items = []
for path, root in NODES:
    with open(path) as f:
        d = json.load(f)
    doc = d['nodes'][root]['document']
    bb = doc.get('absoluteBoundingBox') or {'x': 0, 'y': 0}
    ox, oy = bb.get('x', 0), bb.get('y', 0)

    def walk(n):
        if n.get('type') == 'TEXT' and n.get('style', {}).get('fontFamily') == 'Mariinavo Font':
            b = n.get('absoluteBoundingBox') or {}
            items.append({
                'id': n['id'],
                'text': n.get('characters', ''),
                'x': round(b.get('x', 0) - ox), 'y': round(b.get('y', 0) - oy),
                'w': round(b.get('width', 0)), 'h': round(b.get('height', 0)),
                'root': root,
            })
        for c in n.get('children', []):
            walk(c)

    walk(doc)

print(f"Mariinavo-текстов: {len(items)}")
# уникальные id
uniq = {it['id']: it for it in items}
ids = ','.join(uniq.keys())
url = f"https://api.figma.com/v1/images/{KEY}?ids={ids}&format=png&scale=3"
r = subprocess.run(["curl", "-s", "-H", f"X-Figma-Token: {TOKEN}", url], capture_output=True, text=True, timeout=180)
imgs = json.loads(r.stdout).get('images', {})

for nid, it in uniq.items():
    u = imgs.get(nid)
    if not u:
        print(f"нет URL: {nid} {it['text'][:30]!r}")
        continue
    out = os.path.join(DST, f"t_{nid.replace(':', '-')}.png")
    if not (os.path.exists(out) and os.path.getsize(out) > 0):
        subprocess.run(["curl", "-s", "-L", "-o", out, u], timeout=120)
        time.sleep(0.05)

for it in items:
    it['file'] = f"t_{it['id'].replace(':', '-')}.png"

with open('/home/z/my-project/figma/mariinavo_texts.json', 'w') as f:
    json.dump(items, f, ensure_ascii=False, indent=1)
print(f"Сохранено PNG: {len(os.listdir(DST))}")
sizes = sum(os.path.getsize(os.path.join(DST, f)) for f in os.listdir(DST))
print(f"Общий вес: {sizes // 1024} КБ")
