"""Вырезка зон из рендера Figma для сравнения с сайтом: герой + моменты (фото 1:188)."""
from PIL import Image

src = Image.open("/home/z/my-project/figma/render_desktop_full.png").convert("RGB")
print("render size:", src.size)

# 1) Герой: полароид с детьми на корте (фрейм 1:23 в районе x 650-1260, y 150-780)
hero = src.crop((640, 140, 1280, 800))
hero.save("/home/z/my-project/figma/audit/dup_hero_render.png")

# 2) Моменты: фото 1:188 (дети кругом) — bbox (1044, 5048, 243x328) + запас
mom = src.crop((950, 4950, 1280, 5480))
mom.save("/home/z/my-project/figma/audit/dup_moments_render.png")
print("saved")
