"""Найти узлы полароидов (1:23, 1:24, 1:185-1:193) в JSON Figma и понять их структуру."""
import json

d = json.load(open("/home/z/my-project/figma/nodes_1-12.json"))
nodes = d["nodes"]
WANT = {"1:23", "1:24", "1:185", "1:186", "1:187", "1:188",
        "1:189", "1:190", "1:191", "1:192", "1:193"}

found = {}

def walk(n, parent=None):
    nid = n.get("id", "")
    if nid in WANT:
        bb = n.get("absoluteBoundingBox", {}) or {}
        kids = [(c.get("id"), c.get("type"), c.get("name")) for c in n.get("children", [])]
        fills = n.get("fills")
        fill_info = None
        if fills:
            f0 = fills[0]
            fill_info = {"type": f0.get("type"), "visible": f0.get("visible", True),
                         "imageRef": f0.get("imageRef"), "scaleMode": f0.get("scaleMode")}
        rot = n.get("rotation")
        found[nid] = dict(type=n.get("type"), name=n.get("name"),
                          bbox={k: bb.get(k) for k in ("x", "y", "width", "height")},
                          rotation=rot, fill=fill_info, children=kids[:8], parent=parent)
    for c in n.get("children", []):
        walk(c, nid)

for k, v in nodes.items():
    walk(v)

for nid in sorted(WANT):
    if nid in found:
        f = found[nid]
        print(f"{nid} [{f['type']}] '{f['name']}' rot={f['rotation']}")
        print(f"   bbox={f['bbox']}")
        print(f"   fill={f['fill']}")
        print(f"   children={f['children']}")
    else:
        print(f"{nid}: NOT FOUND")
