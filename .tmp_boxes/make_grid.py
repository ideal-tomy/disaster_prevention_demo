from pathlib import Path
from PIL import Image, ImageDraw

src = Path(__file__).resolve().parents[1] / "public" / "img"
out = Path(__file__).resolve().parent

boxes = {
    "b1.png": (28, 34, 38, 42),
    "b2.png": (36, 42, 34, 28),
    "b3.png": (32, 38, 36, 36),
}

for name, (left, top, width, height) in boxes.items():
    im = Image.open(src / name).convert("RGB")
    w, h = im.size
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for i in range(1, 10):
        x = int(w * i / 10)
        y = int(h * i / 10)
        draw.line([(x, 0), (x, h)], fill=(255, 255, 0, 90), width=1)
        draw.line([(0, y), (w, y)], fill=(255, 255, 0, 90), width=1)
        draw.text((x + 4, 8), f"{i * 10}", fill=(255, 220, 0, 220))
        draw.text((4, y + 2), f"{i * 10}", fill=(255, 220, 0, 220))
    x1, y1 = int(w * left / 100), int(h * top / 100)
    x2, y2 = int(w * (left + width) / 100), int(h * (top + height) / 100)
    draw.rectangle([x1, y1, x2, y2], outline=(91, 77, 183, 255), width=4)
    merged = Image.alpha_composite(im.convert("RGBA"), overlay)
    dest = out / f"{name[:-4]}_grid.jpg"
    merged.convert("RGB").save(dest, quality=80)
    print(name, w, h, "box", x1, y1, x2, y2)
