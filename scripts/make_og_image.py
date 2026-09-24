#!/usr/bin/env python3
"""OG-баннер 1200x630 для соцсетей/мессенджеров: фото лагеря + название,
в стиле макета (бумажный фон, синий заголовок, оранжевый акцент)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
BLUE = (37, 108, 198)
ORANGE = (236, 129, 45)
DARK = (61, 61, 61)

BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

def cover(im, w, h):
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))

# фон — мятая бумага из макета
bg = Image.open("/home/z/my-project/public/images/bumaga_1-13.webp").convert("RGB")
bg = cover(bg, W, H)

# полароид: фото детей + белая рамка, лёгкий поворот
photo = Image.open("/home/z/my-project/public/images/obschee_foto_1-24.webp").convert("RGB")
PW, PH = 430, 286  # фото
PAD, BOTTOM = 18, 64
frame = Image.new("RGB", (PW + PAD * 2, PH + PAD + BOTTOM), (252, 252, 250))
frame.paste(photo.resize((PW, PH), Image.LANCZOS), (PAD, PAD))

polaroid = frame.convert("RGBA").rotate(-4, expand=True, resample=Image.BICUBIC)
px, py = 700, 120
# мягкая тень из альфа-канала полароида (тот же размер после поворота)
sh_mask = polaroid.split()[3].filter(ImageFilter.GaussianBlur(10))
sh_mask = sh_mask.point(lambda a: int(a * 0.35))
bg.paste(Image.new("RGB", polaroid.size, (40, 60, 90)), (px + 8, py + 16), sh_mask)
bg.paste(polaroid, (px, py), polaroid)

draw = ImageDraw.Draw(bg)

def text_center(x, y, s, font, fill, ls=0):
    """текст с межбуквенным интервалом ls (px) от левого края x"""
    if ls <= 0:
        draw.text((x, y), s, font=font, fill=fill)
        return
    cx = x
    for ch in s:
        draw.text((cx, y), ch, font=font, fill=fill)
        cx += draw.textlength(ch, font=font) + ls

f_eyebrow = ImageFont.truetype(BOLD, 25)
f_title = ImageFont.truetype(BOLD, 95)
f_tag = ImageFont.truetype(REG, 31)
f_small = ImageFont.truetype(REG, 26)

TX = 64
text_center(TX, 118, "ДЕТСКИЙ ЛАГЕРЬ · КАЗАНЬ · ТАТАРСТАН", f_eyebrow, ORANGE, ls=2)
text_center(TX, 168, "ТЕРРИТОРИЯ", f_title, BLUE)
text_center(TX, 276, "МЫ", f_title, BLUE)
text_center(TX, 398, "Лагерь, где становятся личностью", f_tag, DARK)
text_center(TX, 452, "Летние смены в ГК «Регина», Мамадыш", f_small, DARK)
text_center(TX, 494, "27 лет опыта · более 32 000 участников", f_small, DARK)

bg.save("/home/z/my-project/public/images/og-cover.jpg", "JPEG", quality=90)
print("OK:", bg.size)
