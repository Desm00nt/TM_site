"""Точный разбор узлов 1:23, 1:24, 1:185-1:193: fills, imageTransform, rotation, bbox."""
import json

d = json.load(open("/home/z/my-project/figma/nodes_1-12.json"))
root = d["nodes"]["1:12"]["document"]

WANT = {"1:23", "1:24", "1:185", "1:186", "1:187", "1:188",
        "1:189", "1:190", "1:191", "1:192", "1:193"}

def fmt_fill(f):
    t = f.get("type")
    if not f.get("visible", True):
        return f"{t} (hidden)"
    info = {"type": t, "scaleMode": f.get("scaleMode")}
    if f.get("imageRef"):
        info["imageRef"] = f["imageRef"]
    tr = f.get("imageTransform")
    if tr:
        info["imageTransform"] = [[round(v, 4) for v in row] for row in tr]
    if f.get("rotation") is not None:
        info["fill_rotation"] = f.get("rotation")
    col = f.get("color")
    if col:
        info["color"] = [round(c, 3) for c in (col.get("r"), col.get("g"), col.get("b"), col.get("a"))]
    return info

def walk(n):
    nid = n.get("id", "")
    if nid in WANT:
        bb = n.get("absoluteBoundingBox", {}) or {}
        print(f"=== {nid} [{n.get('type')}] '{n.get('name')}'")
        print(f"  bbox: x={bb.get('x')} y={bb.get('y')} w={bb.get('width')} h={bb.get('height')}")
        print(f"  rotation: {n.get('rotation')}")
        rt = n.get("relativeTransform")
        if rt:
            print(f"  relTransform: [[{rt[0][0]:.4f},{rt[0][1]:.4f},{rt[0][2]:.2f}],[{rt[1][0]:.4f},{rt[1][1]:.4f},{rt[1][2]:.2f}]]")
        print(f"  size: {n.get('width')}x{n.get('height')}")
        fills = n.get("fills") or []
        for f in fills:
            print(f"  fill: {json.dumps(fmt_fill(f), ensure_ascii=False)}")
    for c in n.get("children", []):
        walk(c)

walk(root)
