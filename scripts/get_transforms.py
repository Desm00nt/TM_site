"""relativeTransform узлов — точная геометрия поворотов (ground truth)."""
import json, math

d = json.load(open("/home/z/my-project/figma/nodes_1-12.json"))
root = d["nodes"]["1:12"]["document"]
FX = 2441.0

WANT = {"1:23", "1:24", "1:185", "1:188", "1:192"}

def walk(n):
    nid = n.get("id", "")
    if nid in WANT:
        rt = n.get("relativeTransform")
        bb = n.get("absoluteBoundingBox", {})
        print(f"=== {nid} '{n.get('name')}'")
        print(f"  relTransform = {rt}")
        if rt:
            a, b, tx = rt[0]
            c, e, ty = rt[1]
            # Figma: [[a b tx],[c e ty]] — столбцы базиса
            ang = math.degrees(math.atan2(c, a))
            print(f"  угол из матрицы (atan2(c,a)) = {ang:.4f} deg; a={a:.6f} b={b:.6f} c={c:.6f} e={e:.6f}")
            print(f"  translate in file: ({tx:.2f},{ty:.2f}) -> page x {tx-FX:.2f}, y {ty:.2f}")
        print(f"  AABB page: ({bb.get('x')-FX:.2f},{bb.get('y'):.2f}) {bb.get('width'):.2f}x{bb.get('height'):.2f}")
        # собственный размер узла из матрицы и AABB
        if rt:
            a, b, tx = rt[0]; c, e, ty = rt[1]
            W, H = bb.get("width"), bb.get("height")
            det = a*a - c*c
            if abs(det) > 1e-9:
                w_n = (W*a - H*c)/det
                h_n = (a*H - c*W)/det
                print(f"  собств. размер: {w_n:.2f} x {h_n:.2f}")
    for ch in n.get("children", []):
        walk(ch)

walk(root)
