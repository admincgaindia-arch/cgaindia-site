# -*- coding: utf-8 -*-
"""Turns the master CGA logo (flat artwork on white) into the files the site
needs: a transparent horizontal lockup, a knockout version for dark
backgrounds, a square monogram tile, a favicon and the social-share cover."""

import os
from PIL import Image, ImageDraw, ImageFont

SRC = "/mnt/user-data/uploads/CGA_LOGO.jpeg"
OUT = "/home/claude/cga-site/docs/assets/img"
FONTS = "/usr/share/fonts/truetype/google-fonts/"

NAVY = (0, 81, 118)
CYAN = (75, 189, 216)
WHITE = (255, 255, 255)


def font(name, size):
    p = FONTS + name
    return ImageFont.truetype(p, size) if os.path.exists(p) else ImageFont.load_default()


def dist(px, ref):
    return sum((a - b) ** 2 for a, b in zip(px, ref)) ** 0.5


def cut_white(im, tol=95):
    """White background -> alpha, with a soft band so edges stay smooth."""
    im = im.convert("RGB")
    w, h = im.size
    src = im.load()
    out = Image.new("RGBA", (w, h))
    dst = out.load()
    for y in range(h):
        for x in range(w):
            p = src[x, y]
            d = dist(p, WHITE)
            if d <= 2:
                dst[x, y] = (0, 0, 0, 0)
                continue
            a = 255 if d >= tol else int(255 * d / tol)
            # push the colour back to full strength so edges don't go milky
            if a < 255 and a > 0:
                k = 255.0 / a
                p = tuple(max(0, min(255, int(255 - (255 - c) * k))) for c in p)
            dst[x, y] = (p[0], p[1], p[2], a)
    return out


def trim(im, pad=0):
    bb = im.getbbox()
    im = im.crop(bb)
    if pad:
        w, h = im.size
        c = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
        c.paste(im, (pad, pad))
        im = c
    return im


def knockout(im):
    """Navy -> white, cyan kept, for use on dark backgrounds."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if dist((r, g, b), NAVY) < dist((r, g, b), CYAN):
                px[x, y] = (255, 255, 255, a)
            else:
                px[x, y] = (125, 212, 234, a)
    return im


def main():
    os.makedirs(OUT, exist_ok=True)
    master = cut_white(Image.open(SRC))
    full = trim(master)
    print("trimmed lockup:", full.size)

    # 1. horizontal lockup for the header and light backgrounds
    lock = full.copy()
    lock.thumbnail((900, 900), Image.LANCZOS)
    lock.save(os.path.join(OUT, "cga-logo.png"))

    # 2. knockout lockup for the dark footer
    knockout(full.copy()).resize(lock.size, Image.LANCZOS).save(
        os.path.join(OUT, "cga-logo-light.png"))

    # 3. monogram only — the CGA glyph, left portion of the artwork
    w, h = full.size
    mono = trim(full.crop((0, 0, int(w * 0.56), h)))
    print("monogram:", mono.size)
    mono.thumbnail((512, 512), Image.LANCZOS)
    mono.save(os.path.join(OUT, "cga-mark.png"))

    # 4. square app tile — knockout mark on brand navy
    tile = Image.new("RGB", (512, 512), NAVY)
    m = knockout(mono.copy())
    m.thumbnail((360, 360), Image.LANCZOS)
    tile.paste(m, ((512 - m.size[0]) // 2, (512 - m.size[1]) // 2), m)
    tile.save(os.path.join(OUT, "cga-logo.jpeg"), quality=94)

    # 5. favicon — same tile, small, as png + ico
    tile.resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, "apple-touch-icon.png"))
    tile.resize((64, 64), Image.LANCZOS).save(
        os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
    if os.path.exists(os.path.join(OUT, "favicon.svg")):
        os.remove(os.path.join(OUT, "favicon.svg"))

    # 6. social share cover — real logo, brand colours
    W, H = 1200, 630
    cov = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(cov)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=(int(NAVY[0] + 10 * t), int(NAVY[1] + 33 * t), int(NAVY[2] + 37 * t)))
    d.ellipse([900, -180, 1460, 380], fill=(18, 104, 140))
    lg = knockout(full.copy())
    lg.thumbnail((520, 520), Image.LANCZOS)
    cov.paste(lg, (80, 96), lg)
    d.rectangle([80, 300, 176, 305], fill=CYAN)
    d.text((80, 344), "Every registration, return and licence", font=font("Poppins-Regular.ttf", 38), fill=(207, 227, 238))
    d.text((80, 400), "your business owes — filed on time.", font=font("Poppins-Regular.ttf", 38), fill=(207, 227, 238))
    d.text((80, 496), "Advocate  ·  CA  ·  CS  ·  CMA", font=font("Poppins-Bold.ttf", 26), fill=CYAN)
    d.text((80, 544), "cgaindia.com  ·  5 offices  ·  UP, Delhi, Haryana",
           font=font("Poppins-Regular.ttf", 25), fill=(160, 196, 216))
    cov.save(os.path.join(OUT, "og-cover.png"))
    for junk in ("og-cover.svg",):
        p = os.path.join(OUT, junk)
        if os.path.exists(p):
            os.remove(p)

    print("written to", OUT)


if __name__ == "__main__":
    main()
