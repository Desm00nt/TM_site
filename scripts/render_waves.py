#!/usr/bin/env python3
"""Рендер декоративных векторов (волны-разделители) в PNG."""
import json
import subprocess

TOKEN = "FIGD_TOKEN_REMOVED"
KEY = "UoIfFG8jHL6avKjPKokZCo"

with open('/home/z/my-project/figma/nodes_1-12.json') as f:
    data = json.load(f)

doc = data['nodes']['1:12']['document']

# найти все VECTOR верхнего уровня (волны)
vectors = []
def walk(node):
    if node.get('type') == 'VECTOR' and node.get('name', '').startswith('Vector'):
        bb = node.get('absoluteBoundingBox') or {}
        if bb.get('width', 0) > 1000:  # широкие волны-разделители
            vectors.append({'id': node['id'], 'name': node['name'],
                            'x': round(bb['x']), 'y': round(bb['y']),
                            'w': round(bb['width']), 'h': round(bb['height'])})
    for ch in node.get('children', []):
        walk(ch)

walk(doc)
print(f"Найдено волн: {len(vectors)}")
for v in vectors:
    print(v)

ids = ','.join(v['id'] for v in vectors)
url = f"https://api.figma.com/v1/images/{KEY}?ids={ids}&format=png&scale=2"
r = subprocess.run(["curl", "-s", "-H", f"X-Figma-Token: {TOKEN}", url],
                   capture_output=True, text=True, timeout=120)
resp = json.loads(r.stdout)
imgs = resp.get('images', {})
import time
for v in vectors:
    u = imgs.get(v['id'])
    if not u:
        print(f"НЕТ URL для {v['name']} {v['id']}")
        continue
    fname = f"/home/z/my-project/figma/img/wave_{v['name'].replace(' ', '_')}_{v['id'].replace(':', '-')}_{v['y']}.png"
    subprocess.run(["curl", "-s", "-L", "-o", fname, u], timeout=120)
    print(f"OK {fname}")
    time.sleep(0.1)

with open('/home/z/my-project/figma/waves.json', 'w') as f:
    json.dump(vectors, f, ensure_ascii=False, indent=1)
