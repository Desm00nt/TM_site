#!/usr/bin/env python3
"""Полное извлечение контента: тексты по секциям + imageRefs + шрифты."""
import json

with open('/home/z/my-project/figma/nodes_1-12.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['nodes']['1:12']['document']
bb = doc['absoluteBoundingBox']
ox, oy = bb['x'], bb['y']

texts, images, img_refs = [], [], set()
fonts, colors = {}, {}


def hexc(c):
    if not c:
        return None
    return '#%02X%02X%02X' % tuple(round(c.get(k, 0) * 255) for k in ('rgb'[0:0] + 'r', 'g', 'b'))


def hexc2(c):
    if not c:
        return None
    return '#%02X%02X%02X' % (round(c['r'] * 255), round(c['g'] * 255), round(c['b'] * 255))


def walk(node):
    t = node.get('type')
    b = node.get('absoluteBoundingBox') or {}
    x, y = round(b.get('x', 0) - ox), round(b.get('y', 0) - oy)
    if t == 'TEXT':
        st = node.get('style', {})
        fills = [fl for fl in node.get('fills', []) if fl.get('type') == 'SOLID' and fl.get('visible', True)]
        col = hexc2(fills[0]['color']) if fills else None
        fam = st.get('fontFamily', '?')
        fonts[fam] = fonts.get(fam, 0) + 1
        texts.append({
            'y': y, 'x': x, 'w': round(b.get('width', 0)), 'h': round(b.get('height', 0)),
            'text': node.get('characters', ''), 'size': st.get('fontSize'),
            'weight': st.get('fontWeight'), 'font': fam, 'color': col,
            'align': st.get('textAlignHorizontal'), 'lh': st.get('lineHeightPx'),
            'id': node.get('id'),
        })
    elif t in ('RECTANGLE', 'ELLIPSE', 'VECTOR', 'INSTANCE', 'FRAME', 'GROUP', 'BOOLEAN_OPERATION', 'POLYGON', 'STAR'):
        for fl in node.get('fills', []):
            if not fl.get('visible', True):
                continue
            if fl.get('type') == 'IMAGE':
                ref = fl.get('imageRef')
                if ref:
                    img_refs.add(ref)
                    images.append({
                        'y': y, 'x': x, 'w': round(b.get('width', 0)), 'h': round(b.get('height', 0)),
                        'name': node.get('name'), 'ref': ref, 'id': node.get('id'),
                        'mode': fl.get('scaleMode'),
                    })
            elif fl.get('type') == 'SOLID':
                c = hexc2(fl.get('color', {}))
                if c:
                    colors[c] = colors.get(c, 0) + 1
    for ch in node.get('children', []):
        walk(ch)


walk(doc)

texts.sort(key=lambda t: (t['y'], t['x']))
out = {
    'frame': {'w': bb['width'], 'h': bb['height']},
    'fonts': fonts,
    'colors': colors,
    'texts': texts,
    'images': sorted(images, key=lambda i: (i['y'], i['x'])),
}
with open('/home/z/my-project/figma/content_desktop.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)

print(f"Текстов: {len(texts)}, картинок(imageRef): {len(images)}, уникальных ref: {len(img_refs)}")
print(f"Шрифты: {fonts}")
print(f"Цвета: {sorted(colors.items(), key=lambda kv: -kv[1])}")
print("\n--- Все тексты сверху вниз ---")
for t in texts:
    one = t['text'].replace('\n', ' | ')
    print(f"y={t['y']:>5} {t['size']:>5}px {t['font'][:12]:<12} {t['color']} w={t['w']:>4} | {one}")
