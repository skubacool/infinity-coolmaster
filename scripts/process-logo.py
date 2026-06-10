# One-off asset pipeline: exports web-ready brand assets from the official
# stacked logo PNG (which already carries a transparent background).
#   - logo-official.png : full lockup (mark + INFINITY COOLMASTER)
#   - logo-mark.png     : infinity mark only (split at the widest empty row)
#   - favicon.png       : mark centered on a square transparent canvas
import numpy as np
from PIL import Image

SRC = r"D:\Desktop\Infinity Cool Master\Logo\logo infinity final.png"
OUT_DIR = r"D:\Desktop\Infinity Cool Master\Website\public"
OUT_FULL = OUT_DIR + r"\assets\brand\logo-official.png"
OUT_MARK = OUT_DIR + r"\assets\brand\logo-mark.png"
OUT_FAVICON = OUT_DIR + r"\favicon.png"

im = Image.open(SRC).convert("RGBA")
alpha = np.array(im)[..., 3]

# Crop to the alpha bounding box (PIL's getbbox scans RGB too, so do it manually).
ys, xs = np.nonzero(alpha)
im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
print("content bbox size:", im.size)

# Split mark from wordmark at the widest fully-transparent horizontal gap.
a = np.array(im)[..., 3]
empty_rows = (a.max(axis=1) == 0).astype(int)
gaps, start = [], None
for y, e in enumerate(empty_rows):
    if e and start is None:
        start = y
    elif not e and start is not None:
        gaps.append((y - start, start, y))
        start = None
split = max(gaps)[1] + max(gaps)[0] // 2 if gaps else round(im.height * 0.40)
print("split row:", split, "of", im.height)


def save_scaled(img: Image.Image, path: str, max_w: int) -> None:
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    img.save(path, optimize=True)
    print(path.split("\\")[-1], img.size)


save_scaled(im, OUT_FULL, 1200)

mark = im.crop((0, 0, im.width, split))
mark_a = np.array(mark)[..., 3]
mys, mxs = np.nonzero(mark_a)
mark = mark.crop((mxs.min(), mys.min(), mxs.max() + 1, mys.max() + 1))
save_scaled(mark, OUT_MARK, 600)

# Square favicon: mark centered with padding on a transparent canvas.
SIZE, PAD = 128, 10
scale = min((SIZE - 2 * PAD) / mark.width, (SIZE - 2 * PAD) / mark.height)
small = mark.resize(
    (round(mark.width * scale), round(mark.height * scale)), Image.LANCZOS
)
canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
canvas.paste(small, ((SIZE - small.width) // 2, (SIZE - small.height) // 2), small)
canvas.save(OUT_FAVICON, optimize=True)
print("favicon.png", canvas.size)
