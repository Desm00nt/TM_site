"""Все узлы, пересекающие зону полароида 1:188 (page 990-1300, 4990-5420) и героя (640-1280, 150-800)."""
import json

d = json.load(open("/home/z/my-project/figma/nodes_1-12.json"))
root = d["nodes"]["1:12"]["document"]
FX = 2441  # x фрейма 1:12 в файле

ZONES = {
    "MOMENTS_1:188": (3431, 4990, 3761, 5420),
    "HERO": (3081, 150, 3741, 820),
}

def bbox(n):
    bb = n.get("absoluteBoundingBox")
    if not bb:
        return None
    return (bb["x"], bb["y"], bb["x"] + bb["width"], bb["y"] + bb["height"])

def intersects(b, z):
    return not (b[2] <= z[0] or b[0] >= z[2] or b[3] <= z[1] or b[1] >= z[3])

def walk(n, order, depth=0):
    b = bbox(n)
    nid = n.get("id", "")
    if b and nid != "1:12":
        for zname, z in ZONES.items():
            if intersects(b, z):
                px, py = round(b[0] - FX, 1), round(b[1], 1)
                fills = n.get("fills") or []
                ftypes = []
                for f in fills:
                    t = f.get("type")
                    if not f.get("visible", True):
                        t += "(hidden)"
                    elif f.get("imageRef"):
                        t += ":" + f["imageRef"][:8]
                    ftypes.append(t)
                print(f"[{zname}] order={order} {nid} [{n.get('type')}] '{n.get('name')}' "
                      f"page=({px},{py}) {round(b[2]-b[0],1)}x{round(b[3]-b[1],1)} rot={n.get('rotation')} fills={ftypes}")
                break
    for c in n.get("children", []):
        walk(c, order + 1, depth + 1)

walk(root, 0)
