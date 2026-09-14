# -*- coding: utf-8 -*-
"""Generates placeholder brand images so the site looks complete on first
deploy. Replace docs/assets/img/cga-logo.jpeg and og-cover.png with the real
files (same names) whenever you have them."""

import os
from PIL import Image, ImageDraw, ImageFont

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "docs", "assets", "img")
NAVY = (0, 59, 87)
NAVY2 = (0, 104, 143)
GOLD = (201, 162, 39)
WHITE = (255, 255, 255)
PALE = (207, 227, 238)
SKY = (143, 208, 238)

FONTS = "/usr/share/fonts/truetype/google-fonts/"


def font(name, size):
    for cand in (FONTS + name, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"):
        if os.path.exists(cand):
            try:
                return ImageFont.truetype(cand, size)
            except Exception:
                pass
    return ImageFont.load_default()


def logo():
    s = 512
    im = Image.new("RGB", (s, s), NAVY)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, s, 14], fill=GOLD)
    f = font("Poppins-Bold.ttf", 190)
    d.text((s / 2, s / 2 - 26), "CGA", font=f, fill=WHITE, anchor="mm")
    f2 = font("Poppins-Medium.ttf", 42)
    d.text((s / 2, s / 2 + 116), "CANJAIN", font=f2, fill=SKY, anchor="mm")
    im.save(os.path.join(IMG, "cga-logo.jpeg"), quality=92)


def cover():
    w, h = 1200, 630
    im = Image.new("RGB", (w, h), NAVY)
    d = ImageDraw.Draw(im)
    for y in range(h):  # vertical gradient
        t = y / h
        d.line([(0, y), (w, y)],
               fill=(int(NAVY[0] + (NAVY2[0] - NAVY[0]) * t),
                     int(NAVY[1] + (NAVY2[1] - NAVY[1]) * t),
                     int(NAVY[2] + (NAVY2[2] - NAVY[2]) * t)))
    d.ellipse([880, -170, 1420, 370], fill=(20, 92, 124))
    d.text((80, 150), "ADVOCATE-LED  ·  CA  ·  CS  ·  CMA", font=font("Poppins-Bold.ttf", 26), fill=SKY)
    d.text((80, 210), "Canjain Global Advisors", font=font("Poppins-Bold.ttf", 72), fill=WHITE)
    d.text((80, 330), "Every registration, return and licence", font=font("Poppins-Regular.ttf", 36), fill=PALE)
    d.text((80, 384), "your business owes — filed on time.", font=font("Poppins-Regular.ttf", 36), fill=PALE)
    d.rectangle([80, 470, 200, 476], fill=GOLD)
    d.text((80, 520), "cgaindia.com  ·  5 offices  ·  UP, Delhi, Haryana",
           font=font("Poppins-Regular.ttf", 27), fill=(169, 205, 224))
    im.save(os.path.join(IMG, "og-cover.png"))


if __name__ == "__main__":
    logo()
    cover()
    print("brand images written to", IMG)
