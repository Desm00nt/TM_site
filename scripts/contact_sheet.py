#!/usr/bin/env python3
"""Контактный лист всех обработанных ассетов с именами файлов."""
import os
from PIL import Image, ImageDraw, ImageFont

SRC = '/home/z/my-project/public/images'
files = sorted(os.listdir(SRC))
cols, thumb, pad, label_h = 8, 150, 8, 16
rows = (len(files) + cols - 1) // cols
W = cols * (thumb + pad) + pad
H = rows * (thumb + label_h + pad) + pad
sheet = Image.new('RGB', (W, H), (240, 240, 240))
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 10)
except Exception:
    font = ImageFont.load_default()

for i, f in enumerate(files):
    r, c = divmod(i, cols)
    x = pad + c * (thumb + pad)
    y = pad + r * (thumb + label_h + pad)
    try:
        im = Image.open(os.path.join(SRC, f))
        if im.mode in ('RGBA', 'LA', 'P'):
            im = im.convert('RGBA')
            bg = Image.new('RGBA', im.size, (200, 200, 200, 255))
            bg.alpha_composite(im)
            im = bg.convert('RGB')
        else:
            im = im.convert('RGB')
        im.thumbnail((thumb, thumb))
        sheet.paste(im, (x + (thumb - im.size[0]) // 2, y + (thumb - im.size[1]) // 2))
        draw.text((x, y + thumb + 2), f[:24], fill=(0, 0, 0), font=font)
    except Exception as e:
        draw.text((x, y), 'ERR', fill=(255, 0, 0), font=font)

out = '/home/z/my-project/figma/contact_sheet.png'
# лист может быть большим - делим на 2 части по вертикали
if H > 6500:
    half = H // 2
    sheet.crop((0, 0, W, half)).save(out.replace('.png', '_1.png'))
    sheet.crop((0, half, W, H)).save(out.replace('.png', '_2.png'))
    print(f'{out}_1.png и _2.png, всего файлов: {len(files)}')
else:
    sheet.save(out)
    print(f'{out}, всего файлов: {len(files)}')
