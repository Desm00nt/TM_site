#!/usr/bin/env python3
"""Выгрузка конкретных нод Figma и разбор их внутренностей."""
import json
import subprocess
import sys

TOKEN = "FIGD_TOKEN_REMOVED"
KEY = "UoIfFG8jHL6avKjPKokZCo"

ids = sys.argv[1] if len(sys.argv) > 1 else "1:12,30:8,30:299"
depth = sys.argv[2] if len(sys.argv) > 2 else "10"

url = f"https://api.figma.com/v1/files/{KEY}/nodes?ids={ids}&depth={depth}"
out = subprocess.run(
    ["curl", "-s", "-H", f"X-Figma-Token: {TOKEN}", url],
    capture_output=True, text=True, timeout=120,
)
data = json.loads(out.stdout)
path = '/home/z/my-project/figma/nodes_' + ids.replace(',', '_').replace(':', '-') + '.json'
with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
print(f"Сохранено: {path} ({len(out.stdout)} байт)")

INTERESTING = {'TEXT', 'RECTANGLE', 'ELLIPSE', 'VECTOR', 'INSTANCE', 'COMPONENT', 'GROUP', 'FRAME', 'SECTION', 'LINE', 'BOOLEAN_OPERATION', 'SLICE', 'POLYGON', 'STAR'}


def brief(node, depth=0, max_depth=4):
    t = node.get('type', '?')
    name = node.get('name', '?')
    bb = node.get('absoluteBoundingBox') or {}
    x, y = int(bb.get('x', 0)), int(bb.get('y', 0))
    w, h = int(bb.get('width', 0)), int(bb.get('height', 0))
    extra = ''
    if t == 'TEXT':
        chars = node.get('characters', '')
        chars_short = chars.replace('\n', ' ⏎ ')[:80]
        extra = f' TEXT="{chars_short}"'
    print(f"{'  ' * depth}<{t}> \"{name}\" ({x},{y} {w}x{h}){extra}")
    if depth < max_depth:
        for ch in node.get('children', []):
            brief(ch, depth + 1, max_depth)
    else:
        n = len(node.get('children', []))
        if n:
            print(f"{'  ' * (depth + 1)}... +{n} children")


nodes = data.get('nodes', {})
for nid, nd in nodes.items():
    doc = nd.get('document', {})
    print("=" * 80)
    print(f"### Нода {nid}: \"{doc.get('name')}\" [{doc.get('type')}]")
    brief(doc, 0, max_depth=int(depth) if int(depth) < 6 else 4)
