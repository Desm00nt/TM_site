#!/usr/bin/env python3
"""Find missing nodes: moments polaroid frames, hero dark photo, faq ?-marks, review bubbles, header."""
import json

d = json.load(open('/home/z/my-project/figma/nodes_1-12.json'))
doc = d['nodes']['1:12']['document']
FX, FY = 2441.0, 0.0

def region_nodes(x0, y0, x1, y1, min_w=8):
    """all nodes whose bbox intersects region"""
    found = []
    def walk(n):
        bb = n.get('absoluteBoundingBox') or {}
        bx, by = bb.get('x', 0) - FX, bb.get('y', 0) - FY
        bw, bh = bb.get('width', 0), bb.get('height', 0)
        if bw >= min_w and bh >= 1 and bx < x1 and bx + bw > x0 and by < y1 and by + bh > y0:
            fills = []
            for f in n.get('fills', []):
                if not f.get('visible', True): continue
                t = f.get('type')
                if t == 'SOLID':
                    c = f.get('color', {})
                    fills.append(f"#{int(round(c.get('r',0)*255)):02X}{int(round(c.get('g',0)*255)):02X}{int(round(c.get('b',0)*255)):02X}")
                elif t == 'IMAGE':
                    fills.append(f"IMG({f.get('imageRef','')[:6]})")
            txt = ''
            if n.get('type') == 'TEXT':
                txt = ' «' + (n.get('characters','')[:40]).replace('\n','|') + '»'
            found.append((n.get('id'), n.get('type'), n.get('name','')[:24], round(bx), round(by), round(bw), round(bh), ','.join(fills)[:60], txt))
        for c in n.get('children', []):
            walk(c)
    walk(doc)
    return found

print('===== HERO cluster (x 560-1280, y 100-780), no text =====')
for r in region_nodes(560, 100, 1280, 780):
    if r[1] != 'TEXT':
        print(r)

print('\n===== MOMENTS photos+frames (y 4990-5780) =====')
for r in region_nodes(0, 4990, 1280, 5780, min_w=40):
    if r[1] in ('RECTANGLE','FRAME','GROUP') and r[6] > 40:
        print(r)

print('\n===== FAQ ?-marks + bubbles (y 6780-7160) =====')
for r in region_nodes(0, 6780, 1280, 7160, min_w=30):
    print(r)

print('\n===== REVIEW bubbles (y 6180-6620) =====')
for r in region_nodes(0, 6180, 1280, 6620, min_w=60):
    if r[1] in ('RECTANGLE','FRAME','GROUP'):
        print(r)

print('\n===== HEADER (y 0-120) =====')
for r in region_nodes(0, 0, 1280, 120, min_w=10):
    print(r)

print('\n===== HERO texts (y 120-560, x 0-700) =====')
for r in region_nodes(0, 120, 700, 560, min_w=10):
    if r[1] == 'TEXT':
        print(r)
