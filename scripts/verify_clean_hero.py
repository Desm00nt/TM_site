"""Проверка ЧИСТОЙ композиции героя (рамка 1:23 + фото 1:24 из сырых ассетов) против рендера."""
from PIL import Image, ImageDraw
import numpy as np

render = Image.open("/home/z/my-project/figma/render_desktop_full.png").convert("RGB")

frag = Image.open("/home/z/my-project/public/images/frag_image_84_1-23.png").convert("RGBA")
photo_raw = Image.open("/home/z/my-project/figma/img/общее_фото_1-24.png").convert("RGB")

# --- узел 1:24: регион заливки из imageTransform [[0.6564,0,0.1746],[0,1.0,-0.0002]] ---
iw, ih = photo_raw.size  # 1280x853
x0 = int(round(0.1746 * iw)); x1 = int(round((0.1746 + 0.6564) * iw))
y0 = int(round(0.0002 * ih)); y1 = ih  # v от -0.0002 до 0.9998 -> почти весь
region = photo_raw.crop((x0, y0, x1, y1))
print("регион фото:", region.size)

# собственные размеры узлов (из AABB и угла)
import math
def node_size(bb_w, bb_h, rad):
    c, s = math.cos(rad), math.sin(rad)
    D = c*c - s*s
    w = (bb_w*c - bb_h*s)/D
    h = (bb_h*c - bb_w*s)/D
    return w, h

w23, h23 = node_size(566.1038, 566.4390, 0.09994815)
w24, h24 = node_size(425.1560, 429.8438, 0.15901378)
print(f"1:23 unrotated {w23:.2f}x{h23:.2f}; 1:24 unrotated {w24:.2f}x{h24:.2f}")

ang23 = math.degrees(0.09994815)   # css +5.727
ang24 = math.degrees(0.15901378)   # css -9.109 (figma rotation отрицательный)

frame = frag.resize((int(round(w23)), int(round(h23))), Image.LANCZOS)
frame = frame.rotate(-ang23, expand=True, resample=Image.BICUBIC)  # PIL: минус => css-направление
photo = region.resize((int(round(w24)), int(round(h24))), Image.LANCZOS)
photo = photo.rotate(-(-ang24), expand=True, resample=Image.BICUBIC).convert("RGBA")

def paste_center(base, img, cx, cy):
    iw2, ih2 = img.size
    base.paste(img, (int(round(cx - iw2/2)), int(round(cy - ih2/2))), img)
    return img.size, (int(round(cx - iw2/2)), int(round(cy - ih2/2)))

comp = render.copy()
s23, p23 = paste_center(comp, frame, 671.60 + 566.10/2, 185.84 + 566.44/2)
s24, p24 = paste_center(comp, photo, 742.41 + 425.16/2, 254.00 + 429.84/2)

# метрика: пиксели вставленных изображений
comp_a = np.array(comp).astype(int)
ren_a = np.array(render).astype(int)
mask = np.zeros(comp.size[::-1], bool)
def put(mask, img, px, py):
    am = np.array(img)[:, :, 3] > 200
    h, w = am.shape; H, W = mask.shape
    xs0, ys0 = max(0, px), max(0, py)
    xs1, ys1 = min(W, px + w), min(H, py + h)
    mask[ys0:ys1, xs0:xs1] |= am[ys0-py:ys1-py, xs0-px:xs1-px]
put(mask, frame, *p23)
put(mask, photo, *p24)
diff = np.abs(comp_a - ren_a).sum(axis=2)
print(f"чистая композиция героя: mean diff = {diff[mask].mean():.1f} на {mask.sum()} px")

comp.crop((600, 100, 1320, 820)).save("/home/z/my-project/figma/audit/hero_clean_composed.png")
