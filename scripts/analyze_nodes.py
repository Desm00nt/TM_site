#!/usr/bin/env python3
"""Полный анализ нод Figma: тексты со стилями, цвета, картинки."""
import json
import sys

path = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/figma/nodes_1-12.json'
root_id = sys.argv[2] if len(sys.argv) > 2 else '1:12'

with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['nodes'][root_id]['document']
ox = doc['absoluteBoundingBox']['x']
oy = doc['absoluteBoundingBox']['y']


def color_to_hex(c):
    if not c:
        return None
    r, g, b = [round(c.get(k, 0) * 255) for k in ('r', 'g', 'b')]
    a = c.get('a', 1)
    return f'#{r:02X}{g:02X}{b:02X}' + (f' ({a:.2f})' if a < 1 else '')


def get_fills(node):
    out = []
    for fl in node.get('fills', []):
        if fl.get('type') == 'SOLID' and fl.get('visible', True):
            out.append(('solid', color_to_hex(fl.get('color'))))
        elif fl.get('type') in ('IMAGE',) and fl.get('visible', True):
            sr = fl.get('scaleMode', 'FILL')
            out.append(('image', fl.get('imageRef', '?') + f' [{sr}]'))
    return out


texts = []      # (y, x, text, fontsize, weight, font, color)
colors = {}     # hex -> count
images = []     # (name, node_id, x, y, w, h, imageRef)


def walk(node, depth=0):
    t = node.get('type')
    bb = node.get('absoluteBoundingBox') or {}
    x, y = bb.get('x', 0) - ox, bb.get('y', 0) - oy
    w, h = bb.get('width', 0), bb.get('height', 0)
    name = node.get('name', '?')
    nid = node.get('id')

    if t == 'TEXT':
        st = node.get('style', {})
        fills = get_fills(node)
        col = fills[0][1] if fills else None
        texts.append({
            'y': round(y), 'x': round(x), 'text': node.get('characters', ''),
            'size': st.get('fontSize'), 'weight': st.get('fontWeight'),
            'font': st.get('fontFamily'), 'style': st.get('fontStyle'),
            'lh': st.get('lineHeightPx'), 'color': col, 'id': nid,
            'w': round(w), 'h': round(h),
            'align': st.get('textAlignHorizontal'),
        })
    elif t in ('RECTANGLE', 'ELLIPSE', 'VECTOR', 'LINE', 'POLYGON', 'STAR', 'BOOLEAN_OPERATION'):
        for kind, val in get_fills(node):
            if kind == 'solid' and val:
                colors[val] = colors.get(val, 0) + 1
            elif kind == 'image':
                images.append({'name': name, 'id': nid, 'x': round(x), 'y': round(y),
                               'w': round(w), 'h': round(h), 'ref': val})
    elif t in ('FRAME', 'GROUP', 'INSTANCE', 'COMPONENT'):
        for fl in node.get('fills', []):
            if fl.get('type') == 'SOLID' and fl.get('visible', True):
                c = color_to_hex(fl.get('color'))
                if c:
                    colors[c] = colors.get(c, 0) + 1
    for ch in node.get('children', []):
        walk(ch, depth + 1)


walk(doc)

mode = sys.argv[3] if len(sys.argv) > 3 else 'headers'

if mode == 'headers':
    # крупные тексты = заголовки
    big = sorted([t for t in texts if (t['size'] or 0) >= 28], key=lambda t: (t['y'], t['x']))
    print('=== ЗАГОЛОВКИ (font >= 28) ===')
    for t in big:
        print(f"y={t['y']:>5} x={t['x']:>4} {t['size']}px/{t['weight']} {t['font']} {t['color']} | {t['text'][:70]!r}")
elif mode == 'colors':
    print('=== ЦВЕТА (по частоте) ===')
    for c, n in sorted(colors.items(), key=lambda kv: -kv[1])[:20]:
        print(f'{n:>4}  {c}')
elif mode == 'texts':
    ys = int(sys.argv[4]) if len(sys.argv) > 4 else 0
    ye = int(sys.argv[5]) if len(sys.argv) > 5 else 100000
    print(f'=== ТЕКСТЫ y в [{ys};{ye}] ===')
    for t in sorted(texts, key=lambda t: (t['y'], t['x'])):
        if ys <= t['y'] <= ye:
            print(f"y={t['y']:>5} x={t['x']:>4} {t['size']}px {t['font']} {t['color']} | {t['text'][:80]!r}")
elif mode == 'images':
    print(f'=== КАРТИНКИ ({len(images)}) ===')
    for im in sorted(images, key=lambda i: (i['y'], i['x'])):
        print(f"y={im['y']:>5} x={im['x']:>4} {im['w']}x{im['h']} id={im['id']} {im['name'][:40]!r} ref={im['ref'][:30]}")
