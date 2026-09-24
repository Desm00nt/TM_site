"""Проверка вырезки фрагмента рамки 1:23: alpha-bbox фрагмента vs ожидание из листа."""
from PIL import Image
import numpy as np

frag = Image.open("/home/z/my-project/public/images/frag_image_84_1-23.png")
a = np.array(frag)[:, :, 3]
ys, xs = np.where(a > 10)
print("frag 800x800, alpha-bbox:", xs.min(), xs.max(), ys.min(), ys.max())
print("  доля непрозрачного: x", (xs.max()-xs.min())/800, "y", (ys.max()-ys.min())/800)

# Ожидание: вырезка из листа (2000x2000) региона (0.0535..0.9512, 0.0502..0.9485)
# => поля в фрагменте должны быть ~ (107/1795, 100/1797) = 6%/5.6%
sheet = Image.open("/home/z/my-project/figma/img/image_84_1-23.png")
sa = np.array(sheet)[:, :, 3]
sys_, sxs = np.where(sa > 10)
print("sheet 2000x2000, alpha-bbox:", sxs.min(), sxs.max(), sys_.min(), sys_.max())
# Какая доля листа занята полароидом:
print("sheet: x", sxs.min()/2000, (sxs.max()+1)/2000, " y", sys_.min()/2000, (sys_.max()+1)/2000)

# Правильная вырезка региона трансформа:
x0, x1 = int(0.0535*2000), int(0.9512*2000)
y0, y1 = int(0.0502*2000), int(0.9485*2000)
region = sheet.crop((x0, y0, x1, y1))
ra = np.array(region)[:, :, 3]
rys, rxs = np.where(ra > 10)
print("region:", region.size, "alpha-bbox в регионе:", rxs.min(), rxs.max(), rys.min(), rys.max())
print("  поля: left", rxs.min()/region.width, "right", (region.width-rxs.max())/region.width,
      "top", rys.min()/region.height, "bottom", (region.height-rys.max())/region.height)
