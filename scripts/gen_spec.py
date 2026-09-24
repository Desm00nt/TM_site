#!/usr/bin/env python3
"""Generate src/lib/tm-spec.ts from figma/layout_merged.json with latin filename mapping."""
import json, os, re, unicodedata

SPEC = json.load(open('/home/z/my-project/figma/layout_merged.json'))
PUB = '/home/z/my-project/public/'

def translit(s):
    repl = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i',
            'й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t',
            'у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'',
            'э':'e','ю':'yu','я':'ya',
            'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ё':'E','Ж':'Zh','З':'Z','И':'I',
            'Й':'Y','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T',
            'У':'U','Ф':'F','Х':'H','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'','Ы':'Y','Ь':'',
            'Э':'E','Ю':'Yu','Я':'Ya'}
    return ''.join(repl.get(ch, ch) for ch in s)

def find_file(fname):
    """map 'images/frag_бумага_1-13.png' -> actual file in public/images"""
    base = os.path.basename(fname)              # frag_бумага_1-13.png
    stem, ext = os.path.splitext(base)
    m = re.search(r'(\d+-\d+)$', stem)          # node id suffix e.g. 1-13
    suffix = m.group(1) if m else None
    prefix = stem[:stem.find(suffix)] if suffix else stem
    # try direct, translit, else suffix match
    cands = [fname, 'images/' + translit(base)]
    for c in cands:
        if os.path.exists(PUB + c):
            return c
    if suffix:
        pat_prefix = translit(prefix)
        for f in os.listdir(PUB + 'images'):
            if suffix in f and f.startswith(pat_prefix[:6]) and f.endswith(ext):
                return 'images/' + f
        # any file with suffix
        for f in os.listdir(PUB + 'images'):
            if re.search(re.escape(suffix) + re.escape(ext) + '$', f):
                return 'images/' + f
    return None

out = ['// AUTO-GENERATED from figma/layout_merged.json — точные координаты элементов макета',
       '// Фрейм «ТМ полный дизайн» (1:12), 1280x8732. Все x/y/w/h в дизайн-пикселях.',
       'export interface SpecEl {',
       '  id: string;',
       '  src: string;',
       '  x: number;',
       '  y: number;',
       '  w: number;',
       '  h: number;',
       '  alt?: string;',
       '  float?: boolean;',
       '}',
       '']
missing = []
for sec, data in SPEC.items():
    els = []
    for e in data['elements']:
        if e.get('kind') not in ('img', 'textpng'):
            continue
        f = find_file(e['file'])
        if not f:
            missing.append((sec, e['file'], e.get('id')))
            continue
        alt = e.get('text') or e.get('name') or ''
        kind = 'textpng' if e.get('kind') == 'textpng' else 'img'
        els.append((e['x'], e['y'], e['w'], e['h'], f, e.get('id'), alt, kind))
    var = sec.upper()
    out.append(f'export const {var}: SpecEl[] = [')
    for x, y, w, h, f, eid, alt, kind in sorted(els, key=lambda t: (t[1], t[0])):
        a = alt.replace("'", "\\'").replace('"', '')
        out.append(f"  {{ id: '{eid}', src: '/{f}', x: {x}, y: {y}, w: {w}, h: {h}, kind: '{kind}', alt: '{a}' }},")
    out.append('];')
    out.append('')

open('/home/z/my-project/src/lib/tm-spec.ts', 'w').write('\n'.join(out))
print('written, missing:', len(missing))
for m in missing:
    print('MISSING:', m)
