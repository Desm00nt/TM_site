"""Strokes и effects у фото-узлов (полароидные рамки = белые обводки)."""
import json

d = json.load(open("/home/z/my-project/figma/nodes_1-12.json"))
root = d["nodes"]["1:12"]["document"]

WANT = {"1:23", "1:24", "1:185", "1:186", "1:187", "1:188",
        "1:189", "1:190", "1:191", "1:192", "1:193"}

def walk(n):
    nid = n.get("id", "")
    if nid in WANT:
        st = n.get("stroke")
        strokes = n.get("strokes") or []
        sinfo = []
        for s in strokes:
            c = s.get("color") or {}
            sinfo.append({"type": s.get("type"), "color": [round(c.get(k, 0), 3) for k in ("r", "g", "b", "a")],
                          "visible": s.get("visible", True)})
        print(f"{nid} '{n.get('name')}': strokeWeight={n.get('strokeWeight')} strokeAlign={n.get('strokeAlign')} "
              f"strokes={sinfo} effects={json.dumps(n.get('effects') or [], default=str)[:200]}")
    for c in n.get("children", []):
        walk(c)

walk(root)
