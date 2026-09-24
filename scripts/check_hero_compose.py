"""Сверка rc_1-24 с рендером + воспроизведение композиции героя."""
from PIL import Image, ImageChops
import numpy as np

render = Image.open("/home/z/my-project/figma/render_desktop_full.png").convert("RGB")

# 1) Что вырезано в rc_1-24 vs рендер в том же месте
ref = render.crop((742, 254, 742 + 425, 254 + 430))
rc = Image.open("/home/z/my-project/public/images/rc_1-24.png").convert("RGB")
diff = np.array(ImageChops.difference(ref, rc).convert("L"))
print("rc_1-24 vs render (742,254,425,430): mean diff =", round(diff.mean(), 2), " max =", diff.max())

# 2) Воспроизведение композиции сайта на белом
comp = Image.new("RGB", (1280, 800), (248, 248, 247))
frame = Image.open("/home/z/my-project/public/images/frag_image_84_1-23.png").resize((566, 566), Image.LANCZOS)
comp.paste(frame, (672, 186), frame)
photo = rc.resize((425, 430), Image.LANCZOS)
comp.paste(photo, (742, 254))
comp.crop((640, 140, 1280, 800)).save("/home/z/my-project/figma/audit/hero_composed.png")

# 3) Рендер той же зоны для сравнения
render.crop((640, 140, 1280, 800)).save("/home/z/my-project/figma/audit/hero_render_ref.png")
print("saved composed + ref")
