"""Зум проблемных зон на скриншотах сайта."""
from PIL import Image

# Герой: полароид (viewport = page coords, скролла нет)
hero = Image.open("/home/z/my-project/figma/audit/site_hero.png")
hero.crop((640, 140, 1280, 700)).resize((960, 840)).save("/home/z/my-project/figma/audit/dup_hero_site.png")

# Моменты: фото 1:188 (scrollY=4950, фото на (1044,5048) 243x328)
mom = Image.open("/home/z/my-project/figma/audit/site_moments.png")
mom.crop((980, 60, 1280, 440)).resize((900, 1140)).save("/home/z/my-project/figma/audit/dup_moments_site.png")
print("ok")
