#!/usr/bin/env python3
"""Скачивание всех картинок из Figma: imageRef -> URL -> файлы."""
import json
import subprocess
import time
import urllib.parse

TOKEN = "FIGD_TOKEN_REMOVED"
KEY = "UoIfFG8jHL6avKjPKokZCo"
DIR = "/home/z/my-project/figma/img"
import os
os.makedirs(DIR, exist_ok=True)

# 1. Получить маппинг imageRef -> URL
url = f"https://api.figma.com/v1/files/{KEY}/images"
r = subprocess.run(["curl", "-s", "-H", f"X-Figma-Token: {TOKEN}", url],
                   capture_output=True, text=True, timeout=120)
data = json.loads(r.stdout)
meta = data.get('meta', {}).get('images', {})
print(f"Получено URL для {len(meta)} imageRef")

with open('/home/z/my-project/figma/content_desktop.json') as f:
    content = json.load(f)

# имя файла по node id, чтобы не зависеть от ref-хешей
ref_to_nodes = {}
for im in content['images']:
    ref_to_nodes.setdefault(im['ref'], []).append(im)

downloaded, failed = 0, []
for ref, url_img in meta.items():
    if not url_img:
        continue
    nodes = ref_to_nodes.get(ref, [])
    if nodes:
        im = nodes[0]
        safe_name = f"{im['name'].replace(' ', '_').replace('/', '_')[:30]}_{im['id'].replace(':', '-')}.png"
    else:
        safe_name = f"ref_{ref[:10]}.png"
    path = f"{DIR}/{safe_name}"
    if os.path.exists(path) and os.path.getsize(path) > 0:
        downloaded += 1
        continue
    rc = subprocess.run(["curl", "-s", "-L", "-o", path, url_img], timeout=180).returncode
    if rc == 0 and os.path.getsize(path) > 0:
        downloaded += 1
    else:
        failed.append(safe_name)
    time.sleep(0.1)

print(f"Скачано: {downloaded}, ошибок: {len(failed)}")
if failed:
    print("Не удалось:", failed)

# маппинг ref -> локальный файл для сборки
mapping = {ref: meta.get(ref) for ref in ref_to_nodes}
with open('/home/z/my-project/figma/ref_map.json', 'w') as f:
    json.dump({'ref_to_file': {ref: (f"{v[0]['name'].replace(' ', '_').replace('/', '_')[:30]}_{v[0]['id'].replace(':', '-')}.png" if v else None) for ref, v in ref_to_nodes.items()},
               'ref_to_url': mapping}, f, ensure_ascii=False, indent=1)
print("Маппинг сохранён: figma/ref_map.json")
