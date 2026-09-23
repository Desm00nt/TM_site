"""Калибровка углов поворота по официальному рендеру:
подбираем знак/угол так, чтобы контент узла лёг точно на рендер.
Герой: рамка 1:23 (frag-ассет, alpha). Моменты: фото 1:188 (raw + белая обводка 11px).
"""
from PIL import Image, ImageDraw
import numpy as np
import math

render = Image.open("/home/z/my-project/figma/render_desktop_full.png").convert("RGB")

# ---------- 1:23 рамка ----------
frag = Image.open("/home/z/my-project/public/images/frag_image_84_1-23.png").convert("RGBA")
W, H = 517.04, 517.41           # собственный размер узла
cx, cy = 671.60 + 566.10/2, 185.84 + 566.44/2   # центр AABB
photo_box = (742, 254, 742+425, 254+430)        # AABB фото — исключаем из метрики

def try_frame(angle_css_deg):
    # CSS rotate(положит.) = по часовой; PIL rotate(положит.) = против часовой
    img = frag.resize((int(round(W)), int(round(H))), Image.LANCZOS)
    img = img.rotate(-angle_css_deg, expand=True, resample=Image.BICUBIC)  # PIL: -css = css-направление
    iw, ih = img.size
    canvas = render.crop((600, 100, 1320, 820)).copy()
    px, py = 600 + cx - iw/2, 100 + cy - ih/2
    canvas.paste(img, (int(round(px)), int(round(py))), img)
    return canvas, (px, py, iw, ih)

def score(canvas, px, py, iw, ih):
    comp = np.array(canvas).astype(int)
    ren = np.array(render.crop((600, 100, 1320, 820))).astype(int)
    # маска: только пиксели вставленного frag (alpha>200), вне зоны фото
    a = np.zeros((720, 720))
    fg = frag.resize((int(round(W)), int(round(H))), Image.LANCZOS).rotate(
        0, expand=True)  # форму маски возьмём из вставленного изображения ниже
    # проще: пересоберём маску тем же путём
    return None

# Упрощённо: сравниваем на КОЛЬЦЕ — пиксели, где вставленный frag непрозрачен
def apply_mask(mask, am, x0, y0):
    """Вставка маски am в mask с обрезкой по границам."""
    h, w = am.shape
    H, W = mask.shape
    xs0, ys0 = max(0, x0), max(0, y0)
    xs1, ys1 = min(W, x0 + w), min(H, y0 + h)
    if xs1 <= xs0 or ys1 <= ys0:
        return
    mask[ys0:ys1, xs0:xs1] = am[ys0 - y0:ys1 - y0, xs0 - x0:xs1 - x0]

def try_and_score(angle_css_deg):
    img = frag.resize((int(round(W)), int(round(H))), Image.LANCZOS)
    img = img.rotate(-angle_css_deg, expand=True, resample=Image.BICUBIC)
    iw, ih = img.size
    px, py = cx - iw/2, cy - ih/2
    base = render.copy()
    base.paste(img, (int(round(px)), int(round(py))), img)
    comp = np.array(base).astype(int)
    ren = np.array(render).astype(int)
    # маска вставки
    mask = np.zeros(base.size[::-1], bool)
    arr = np.array(img)
    am = arr[:, :, 3] > 200
    apply_mask(mask, am, int(round(px)), int(round(py)))
    # исключаем AABB фото (по странице)
    mask[photo_box[1]:photo_box[3], photo_box[0]:photo_box[2]] = False
    diff = np.abs(comp - ren).sum(axis=2)
    return diff[mask].mean(), mask.sum()

for ang in (5.727, -5.727):
    m, n = try_and_score(ang)
    print(f"рамка 1:23, css {ang:+.3f}deg: mean diff = {m:.1f} (px={n})")

# ---------- 1:188 фото ----------
raw = Image.open("/home/z/my-project/figma/img/image_167_1-188.png").convert("RGB")
W2, H2 = 201.47, 302.14
cx2, cy2 = 1044 + 242.51/2, 5048 + 327.78/2
BORDER = 11

def try_and_score_188(angle_css_deg):
    img = raw.resize((int(round(W2)), int(round(H2))), Image.LANCZOS)
    # белая обводка 11px INSIDE
    from PIL import ImageDraw
    ph = img.copy()
    dr = ImageDraw.Draw(ph)
    dr.rectangle([0, 0, ph.width - 1, ph.height - 1], outline=(248, 248, 248), width=BORDER)
    ph = ph.convert("RGBA")
    ph = ph.rotate(-angle_css_deg, expand=True, resample=Image.BICUBIC)
    iw, ih = ph.size
    px, py = cx2 - iw/2, cy2 - ih/2
    base = render.copy()
    base.paste(ph, (int(round(px)), int(round(py))), ph)
    comp = np.array(base).astype(int)
    ren = np.array(render).astype(int)
    mask = np.zeros(base.size[::-1], bool)
    am = np.array(ph)[:, :, 3] > 200
    apply_mask(mask, am, int(round(px)), int(round(py)))
    # исключаем гирлянду (лампочки поверх фото)
    ga = Image.open("/home/z/my-project/public/images/girlyanda_1-193.png").convert("RGBA")
    ga = ga.resize((1305, 894), Image.LANCZOS)
    gam = np.array(ga)[:, :, 3] > 10
    full = np.zeros(base.size[::-1], bool)
    apply_mask(full, gam, 3, 4828)
    mask &= ~full
    diff = np.abs(comp - ren).sum(axis=2)
    return diff[mask].mean(), mask.sum()

for ang in (8.208, -8.208):
    m, n = try_and_score_188(ang)
    print(f"фото 1:188, css {ang:+.3f}deg: mean diff = {m:.1f} (px={n})")
