"""Диагностика: раздельные метрики рамки и фото, зум сравнения."""
from PIL import Image, ImageDraw
import numpy as np
import math

render = Image.open("/home/z/my-project/figma/render_desktop_full.png").convert("RGB")
frag = Image.open("/home/z/my-project/public/images/frag_image_84_1-23.png").convert("RGBA")
photo_raw = Image.open("/home/z/my-project/figma/img/общее_фото_1-24.png").convert("RGB")

x0 = int(round(0.1746 * 1280)); x1 = int(round((0.1746 + 0.6564) * 1280))
region = photo_raw.crop((x0, 0, x1, 853))

frame = frag.resize((517, 517), Image.LANCZOS).rotate(-5.727, expand=True, resample=Image.BICUBIC)
photo = region.resize((370, 376), Image.LANCZOS).rotate(9.109, expand=True, resample=Image.BICUBIC).convert("RGBA")

comp = render.copy()
fw, fh = frame.size; fx, fy = int(round(954.65 - fw/2)), int(round(469.06 - fh/2))
comp.paste(frame, (fx, fy), frame)
pw, ph_ = photo.size; ppx, ppy = int(round(954.98 - pw/2)), int(round(468.92 - ph_/2))
comp.paste(photo, (ppx, ppy), photo)

ren_a = np.array(render).astype(int)
comp_a = np.array(comp).astype(int)
diff = np.abs(comp_a - ren_a).sum(axis=2)

# маски
m_frame = np.zeros(diff.shape, bool)
am = np.array(frame)[:, :, 3] > 200
H, W = diff.shape
xs0, ys0 = max(0, fx), max(0, fy); xs1, ys1 = min(W, fx+fw), min(H, fy+fh)
m_frame[ys0:ys1, xs0:xs1] |= am[ys0-fy:ys1-fy, xs0-fx:xs1-fx]
m_photo = np.zeros(diff.shape, bool)
am2 = np.array(photo)[:, :, 3] > 200
xs0, ys0 = max(0, ppx), max(0, ppy); xs1, ys1 = min(W, ppx+pw), min(H, ppy+ph_)
m_photo[ys0:ys1, xs0:xs1] |= am2[ys0-ppy:ys1-ppy, xs0-ppx:xs1-ppx]
m_ring = m_frame & ~m_photo

print(f"рамка-кольцо: mean={diff[m_ring].mean():.1f} ({m_ring.sum()}px)")
print(f"фото:         mean={diff[m_photo].mean():.1f} ({m_photo.sum()}px)")

# Зум: рендер vs композиция, область фото
zx0, zy0, zx1, zy1 = 660, 175, 1250, 765
side = Image.new("RGB", ((zx1-zx0)*2 + 10, zy1-zy0), (255, 0, 255))
side.paste(render.crop((zx0, zy0, zx1, zy1)), (0, 0))
side.paste(comp.crop((zx0, zy0, zx1, zy1)), (zx1-zx0+10, 0))
side.save("/home/z/my-project/figma/audit/hero_side_by_side.png")
