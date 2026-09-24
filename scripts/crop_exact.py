"""Точная вырезка bbox 1:188 из рендера + сравнение с сырым фото."""
from PIL import Image
import math

src = Image.open("/home/z/my-project/figma/render_desktop_full.png").convert("RGB")

# bbox 1:188: page (1044.0, 5048.0) 242.5x327.8, rotation -0.1432 rad
c = src.crop((1030, 5030, 1300, 5390))
c = c.resize((c.width * 2, c.height * 2), Image.LANCZOS)
c.save("/home/z/my-project/figma/audit/node_188_exact.png")

# То же для героя: bbox 1:23 (671.6,185.8) 566.1x566.4
h = src.crop((660, 175, 1250, 765))
h.save("/home/z/my-project/figma/audit/node_23_exact.png")
print("ok")
