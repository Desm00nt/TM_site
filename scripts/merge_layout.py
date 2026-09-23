#!/usr/bin/env python3
"""Мерж всех данных в единую карту макета для сборки сайта."""
import json

with open('/home/z/my-project/figma/content_desktop.json') as f:
    content = json.load(f)
with open('/home/z/my-project/figma/fragments.json') as f:
    frags = json.load(f)
with open('/home/z/my-project/figma/mariinavo_texts.json') as f:
    mt = json.load(f)
with open('/home/z/my-project/figma/ref_map.json') as f:
    rm = json.load(f)

# индекс фрагментов по id ноды
frag_by_id = {fr['id']: fr for fr in frags}

# Mariinavo тексты (desktop root only) по id
mt_by_id = {t['id']: t for t in mt if t['root'] == '1:12'}

SECTIONS = [
    ('hero', 0, 671),
    ('about', 671, 2604),
    ('why', 2604, 3977),
    ('shifts', 3977, 4767),
    ('moments', 4767, 5866),
    ('reviews', 5866, 6689),
    ('faq', 6689, 7447),
    ('form', 7447, 8254),
    ('footer', 8254, 8740),
]


def sec_of(y):
    for name, a, b in SECTIONS:
        if a <= y < b:
            return name
    return 'hero' if y < 0 else 'footer'


layout = {name: {'y0': a, 'y1': b, 'elements': []} for name, a, b in SECTIONS}

for im in content['images']:
    nid = im['id']
    if nid in frag_by_id:
        fr = frag_by_id[nid]
        file = 'images/' + fr['file']
    else:
        file = 'images/' + rm['ref_to_file'].get(im['ref'], '').rsplit('.', 1)[0] + '.webp'
        # если нет webp — png
        import os
        if not os.path.exists('/home/z/my-project/public/' + file):
            alt = 'images/' + rm['ref_to_file'].get(im['ref'], '').rsplit('.', 1)[0] + '.png'
            if os.path.exists('/home/z/my-project/public/' + alt):
                file = alt
    layout[sec_of(im['y'])]['elements'].append({
        'kind': 'img', 'file': file, 'x': im['x'], 'y': im['y'],
        'w': im['w'], 'h': im['h'], 'name': im['name'], 'id': nid,
    })

for t in mt:
    if t['root'] != '1:12':
        continue
    layout[sec_of(t['y'])]['elements'].append({
        'kind': 'textpng', 'file': 'images/texts/' + t['file'],
        'x': t['x'], 'y': t['y'], 'w': t['w'], 'h': t['h'],
        'text': t['text'].replace('\n', ' '), 'id': t['id'],
    })

for name, sec in layout.items():
    sec['elements'].sort(key=lambda e: (e['y'], e['x']))

with open('/home/z/my-project/figma/layout_merged.json', 'w') as f:
    json.dump(layout, f, ensure_ascii=False, indent=1)

# сводка
for name, sec in layout.items():
    imgs = [e for e in sec['elements'] if e['kind'] == 'img']
    tpngs = [e for e in sec['elements'] if e['kind'] == 'textpng']
    print(f"{name}: {len(imgs)} img, {len(tpngs)} textpng, высота {sec['y1']-sec['y0']}px")
