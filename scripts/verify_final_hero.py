"""Финальная проверка героя: рамка (517x517, rotate +5.727) + rc_1-24 crop на AABB."""
from PIL import Image
import numpy as np

render = Image.open("/home/z/my-project/figma/render_desktop_full.png").convert("RGB")
frag = Image.open("/home/z/my-project/public/images/frag_image_84_1-23.png").convert("RGBA")
rc = Image.open("/home/z/my-project/public/images/rc_1-24.png").convert("RGB")

frame = frag.resize((517, 517), Image.LANCZOS).rotate(-5.727, expand=True, resample=Image.BICUBIC)

comp = render.copy()
fw, fh = frame.size
fx, fy = int(round(954.65 - fw/2)), int(round(469.06 - fh/2))
comp.paste(frame, (fx, fy), frame)
comp.paste(rc, (742, 254))  # AABB фото, как на сайте

ren_a = np.array(render).astype(int)
comp_a = np.array(comp).astype(int)
diff = np.abs(comp_a - ren_a).sum(axis=2)

zone = diff[100:820, 600:1320]
print(f"герой, зона полароида: mean diff = {zone.mean():.2f}, >90: {(zone>90).mean()*100:.2f}%")
comp.crop((600, 100, 1320, 820)).save("/home/z/my-project/figma/audit/hero_final_composed.png")
