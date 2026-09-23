#!/usr/bin/env python3
"""Compute exact wave placements: asset blue bbox -> design node bbox mapping."""
from PIL import Image
import numpy as np, json

d = json.load(open('/home/z/my-project/figma/nodes_1-12.json'))
doc = d['nodes']['1:12']['document']
FX, FY = 2441.0, 0.0

WAVES = {
    '1:16': 'wave_Vector_23_1-16_627.png',
    '1:22': 'wave_Vector_22_1-22_2604.png',
    '1:19': 'wave_Vector_21_1-19_3975.png',
    '1:25': 'wave_Vector_24_1-25_4767.png',
    '1:20': 'wave_Vector_26_1-20_5866.png',
    '1:26': 'wave_Vector_29_1-26_6689.png',
    '1:21': 'wave_Vector_30_1-21_7447.png',
    '1:27': 'wave_Vector_31_1-27_8254.png',
}

# collect wave node bboxes
nodes = {}
def walk(n):
    if n.get('id') in WAVES:
        bb = n.get('absoluteBoundingBox')
        nodes[n['id']] = (bb['x']-FX, bb['y']-FY, bb['width'], bb['height'])
    for c in n.get('children', []):
        walk(c)
walk(doc)

out = ['// AUTO-GENERATED: точное позиционирование волн (учёт полей внутри PNG-ассетов)',
       'export interface Wave { src: string; x: number; y: number; w: number; h: number; z: number }',
       'export const WAVES: Record<string, Wave> = {']

for nid, fname in WAVES.items():
    im = np.asarray(Image.open(f'/home/z/my-project/public/images/{fname}').convert('RGBA'))
    blue = im[...,3] > 180
    ys, xs = np.where(blue)
    ax0, ay0, ax1, ay1 = xs.min(), ys.min(), xs.max(), ys.max()
    AW, AH = im.shape[1], im.shape[0]
    if nid not in nodes:
        print('MISSING node', nid); continue
    nx, ny, nw, nh = nodes[nid]
    k = nw / (ax1 - ax0)
    img_w = AW * k
    img_h = AH * k
    img_x = nx - ax0 * k
    img_y = ny - ay0 * k
    print(f'{nid} {fname}: node=({nx},{ny},{nw},{nh}) assetBlue=({ax0},{ay0},{ax1},{ay1}) k={k:.4f} -> img(x={img_x:.1f}, y={img_y:.1f}, w={img_w:.1f}, h={img_h:.1f})')
    out.append(f"  '{nid}': {{ src: '/images/{fname}', x: {img_x:.2f}, y: {img_y:.2f}, w: {img_w:.2f}, h: {img_h:.2f}, z: 2 }},")
out.append('};')
open('/home/z/my-project/src/lib/tm-waves.ts', 'w').write('\n'.join(out) + '\n')
print('written tm-waves.ts')
