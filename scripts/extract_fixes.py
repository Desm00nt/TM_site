#!/usr/bin/env python3
"""Extract exact geometry/fills for problem nodes from Figma JSON dump."""
import json, math

d = json.load(open('/home/z/my-project/figma/nodes_1-12.json'))
doc = d['nodes']['1:12']['document']
FX, FY = 2441.0, 0.0  # frame absolute offset -> rel coords

TARGETS = {
    '1:23', '1:24',                    # hero polaroid + photo
    '1:117', '1:118', '1:119',         # whyus photos
    '1:172', '1:173', '1:174', '1:175',# shifts photos
    '1:185','1:186','1:187','1:188','1:189','1:190','1:191','1:192',  # moments photos
    '1:216','1:223','1:226','1:229','1:232',                          # review avatars
    '1:262','1:263',                   # form polaroid + photo
}

def fmt_fill(n):
    out = []
    for f in n.get('fills', []):
        if not f.get('visible', True):
            out.append('hidden')
            continue
        t = f.get('type')
        if t == 'IMAGE':
            out.append(f"IMG {f.get('scaleMode')} ref={f.get('imageRef','')[:8]} tr={f.get('imageTransform')}")
        elif t == 'SOLID':
            c = f.get('color', {})
            out.append(f"SOLID #{int(round(c.get('r',0)*255)):02X}{int(round(c.get('g',0)*255)):02X}{int(round(c.get('b',0)*255)):02X} a={round(c.get('a',1),2)}")
        else:
            out.append(t)
    return ' | '.join(out) or '-'

def eff(n):
    es = n.get('effects', [])
    return '; '.join(f"{e.get('type')} off=({e.get('offset',{}).get('x')},{e.get('offset',{}).get('y')}) r={e.get('radius')} color={e.get('color',{}).get('a')}" for e in es) or '-'

def walk(n, parents):
    nid = n.get('id')
    if nid in TARGETS:
        bb = n.get('absoluteBoundingBox') or {}
        rb = n.get('absoluteRenderBounds') or {}
        x, y = bb.get('x', 0) - FX, bb.get('y', 0) - FY
        print(f"== {nid} '{n.get('name')}' type={n.get('type')} rot={round(n.get('rotation',0),3)}")
        print(f"   bbox rel=({round(x,1)},{round(y,1)}) {round(bb.get('width',0),1)}x{round(bb.get('height',0),1)}")
        if rb:
            print(f"   render rel=({round(rb.get('x',0)-FX,1)},{round(rb.get('y',0)-FY,1)}) {round(rb.get('width',0),1)}x{round(rb.get('height',0),1)}")
        print(f"   fills: {fmt_fill(n)}")
        print(f"   effects: {eff(n)}")
        print(f"   parent chain: {' > '.join(parents[-3:])}")
    for c in n.get('children', []):
        walk(c, parents + [f"{n.get('name')}({nid})"])

walk(doc, [])

# ---- form section: find input frames / texts (y 7750-8000) ----
print('\n===== FORM AREA NODES (y 7700-8050) =====')
def walk2(n, parents):
    bb = n.get('absoluteBoundingBox') or {}
    y = bb.get('y', -1) - FY
    if 7690 <= y <= 8060 and n.get('type') in ('RECTANGLE','FRAME','TEXT','GROUP') and bb.get('width',0) > 30:
        fills = fmt_fill(n)
        rad = n.get('cornerRadius')
        print(f"{n.get('type'):9s} {n.get('id'):7s} '{n.get('name')[:30]}' ({round(bb.get('x',0)-FX)},{round(y)}) {round(bb.get('width'))}x{round(bb.get('height'))} rad={rad} fills={fills[:90]}")
    for c in n.get('children', []):
        walk2(c, parents + [n.get('id')])

walk2(doc, [])

# ---- faq bubbles (y 6900-7150) ----
print('\n===== FAQ BUBBLES (y 6900-7150) =====')
def walk3(n):
    bb = n.get('absoluteBoundingBox') or {}
    y = bb.get('y', -1) - FY
    if 6900 <= y <= 7160 and n.get('type') in ('RECTANGLE','FRAME','TEXT','GROUP') and bb.get('width',0) > 100:
        rad = n.get('cornerRadius')
        print(f"{n.get('type'):9s} {n.get('id'):7s} '{n.get('name')[:30]}' ({round(bb.get('x',0)-FX)},{round(y)}) {round(bb.get('width'))}x{round(bb.get('height'))} rad={rad}")
    for c in n.get('children', []):
        walk3(c)
walk3(doc, [])
