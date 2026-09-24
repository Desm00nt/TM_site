#!/usr/bin/env python3
"""Парсинг структуры Figma-файла: дерево каналов и фреймов."""
import json
import sys

with open('/home/z/my-project/figma/file_meta.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data.get('document', {})
print(f"Файл: {data.get('name')}")
print(f"Версия: {data.get('version')}")
print(f"Последнее изменение: {data.get('lastModified')}")
print(f"Документ содержит страниц: {len(doc.get('children', []))}")
print("=" * 70)


def walk(node, depth=0, max_depth=3):
    t = node.get('type', '?')
    name = node.get('name', '?')
    nid = node.get('id', '?')
    if t in ('CANVAS', 'DOCUMENT'):
        print(f"{'  ' * depth}[{t}] {name} (id={nid})")
        for ch in node.get('children', []):
            walk(ch, depth + 1, max_depth)
    else:
        w = node.get('absoluteBoundingBox') or {}
        size = f"{int(w.get('width', 0))}x{int(w.get('height', 0))}" if w else '?'
        print(f"{'  ' * depth}<{t}> \"{name}\" id={nid} {size}px")
        if depth < max_depth:
            for ch in node.get('children', []):
                walk(ch, depth + 1, max_depth)
        else:
            n = len(node.get('children', []))
            if n:
                print(f"{'  ' * (depth + 1)}... ещё {n} дочерних элементов")


for canvas in doc.get('children', []):
    walk(canvas, 0, max_depth=2)
