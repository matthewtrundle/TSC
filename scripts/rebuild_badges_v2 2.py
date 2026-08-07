#!/usr/bin/env python3
"""
Badge rebuild, final pass: one canonical FONT for every year.

The yearly files use slightly different digit fonts/weights (2017 and 2025
come from vector renders in a lighter cut). This pass harvests a single
digit glyph library from the matching-weight badges, then composes every
year's numerals from the same ten glyphs — identical font, weight, height,
and spacing across all twelve badges by construction.

Depends on rebuild_badges.py having produced component-normalized badges
(canonical BEST + D). Reads the CURRENT webp files to harvest, then rewrites.
"""
import os

import cv2
import numpy as np

DIR = "/Users/gunjanmodi/Documents/PlanoDerm Website/TSC/public/images/awards"
YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]

CANVAS_W, CANVAS_H = 880, 1440
BEST_W, D_W = 560, 620
YEAR_H = 240
GAP1, GAP2 = 36, 44
KERN = 16  # uniform inter-digit gap

# digit -> (source year, index of glyph within that year's numerals)
GLYPH_SOURCES = {
    "2": (2020, 0), "0": (2020, 1), "1": (2019, 2), "9": (2019, 3),
    "3": (2023, 3), "4": (2024, 3), "5": (2015, 3), "6": (2016, 3),
    "8": (2018, 3), "7": (2017, 3),
}


def load_rgba(year):
    img = cv2.imread(os.path.join(DIR, f"d-best-{year}.webp"), cv2.IMREAD_UNCHANGED)
    assert img is not None and img.shape[2] == 4, f"{year} not RGBA"
    return img


def row_blocks(alpha):
    content = (alpha > 40).any(axis=1)
    blocks, start = [], None
    for i, has in enumerate(content):
        if has and start is None:
            start = i
        elif not has and start is not None:
            if i - start > 12:
                blocks.append((start, i))
            start = None
    if start is not None:
        blocks.append((start, len(content)))
    return blocks


def year_strip(img):
    a = img[:, :, 3]
    blocks = row_blocks(a)
    top, bottom = blocks[-1]
    strip = img[top:bottom]
    cols = (strip[:, :, 3] > 40).any(axis=0)
    x0, x1 = int(np.argmax(cols)), len(cols) - int(np.argmax(cols[::-1]))
    return strip[:, x0:x1]


def split_glyphs(strip):
    cols = (strip[:, :, 3] > 40).any(axis=0)
    glyphs, start = [], None
    for i, has in enumerate(cols):
        if has and start is None:
            start = i
        elif not has and start is not None:
            if i - start > 8:
                glyphs.append(strip[:, start:i])
            start = None
    if start is not None:
        glyphs.append(strip[:, start:])
    return glyphs


def scale_h(img, height):
    h, w = img.shape[:2]
    return cv2.resize(img, (max(1, round(w * height / h)), height),
                      interpolation=cv2.INTER_AREA if height < h else cv2.INTER_LANCZOS4)


def main():
    # Harvest glyph library.
    lib = {}
    cache = {y: load_rgba(y) for y in set(y for y, _ in GLYPH_SOURCES.values())}
    for digit, (year, idx) in GLYPH_SOURCES.items():
        glyphs = split_glyphs(year_strip(cache[year]))
        assert len(glyphs) == 4, f"{year}: found {len(glyphs)} glyphs"
        g = scale_h(glyphs[idx], YEAR_H)
        if digit == "7":
            # 2017's seven comes from a lighter vector cut — thicken to match.
            a = g[:, :, 3]
            a = cv2.dilate(a, np.ones((5, 5), np.uint8))
            a = cv2.GaussianBlur(a, (3, 3), 0)
            g = g.copy()
            g[:, :, 3] = a
            g[:, :, :3] = np.where(a[..., None] > 60, 20, g[:, :, :3])
        lib[digit] = g
        print(f"glyph {digit}: {g.shape[1]}x{g.shape[0]} from {year}")

    # Canonical BEST + D from the current 2020 badge.
    b2020 = cache[2020]
    blocks = row_blocks(b2020[:, :, 3])
    def crop(span):
        top, bottom = span
        strip = b2020[top:bottom]
        cols = (strip[:, :, 3] > 40).any(axis=0)
        x0, x1 = int(np.argmax(cols)), len(cols) - int(np.argmax(cols[::-1]))
        return strip[:, x0:x1]
    best, dbox = crop(blocks[0]), crop(blocks[1])

    def paste(canvas, rgba, cx, y):
        h, w = rgba.shape[:2]
        x = cx - w // 2
        roi = canvas[y : y + h, x : x + w]
        a = rgba[:, :, 3:4].astype(np.float32) / 255.0
        roi[:, :, :3] = (rgba[:, :, :3] * a + roi[:, :, :3] * (1 - a)).astype(np.uint8)
        roi[:, :, 3] = np.clip(roi[:, :, 3] + rgba[:, :, 3], 0, 255)
        return y + h

    total_h = best.shape[0] + GAP1 + dbox.shape[0] + GAP2 + YEAR_H
    top0 = (CANVAS_H - total_h) // 2

    for year in YEARS:
        digits = [lib[c] for c in str(year)]
        w_total = sum(g.shape[1] for g in digits) + KERN * (len(digits) - 1)
        strip = np.zeros((YEAR_H, w_total, 4), np.uint8)
        x = 0
        for g in digits:
            strip[:, x : x + g.shape[1]] = g
            x += g.shape[1] + KERN

        canvas = np.zeros((CANVAS_H, CANVAS_W, 4), np.uint8)
        y = top0
        y = paste(canvas, best, CANVAS_W // 2, y) + GAP1
        y = paste(canvas, dbox, CANVAS_W // 2, y) + GAP2
        paste(canvas, strip, CANVAS_W // 2, y)
        cv2.imwrite(os.path.join(DIR, f"d-best-{year}.webp"), canvas, [cv2.IMWRITE_WEBP_QUALITY, 92])
        print(year, "composed, year width", w_total)

    # Verification sheet on ivory.
    sheet = np.full((360, 12 * 230, 3), (239, 244, 247), np.uint8)
    for i, year in enumerate(YEARS):
        rgba = cv2.imread(os.path.join(DIR, f"d-best-{year}.webp"), cv2.IMREAD_UNCHANGED)
        small = cv2.resize(rgba, (round(CANVAS_W * 330 / CANVAS_H), 330), interpolation=cv2.INTER_AREA)
        h, w = small.shape[:2]
        x = i * 230 + (230 - w) // 2
        roi = sheet[15 : 15 + h, x : x + w]
        a = small[:, :, 3:4].astype(np.float32) / 255.0
        roi[:] = (small[:, :, :3] * a + roi * (1 - a)).astype(np.uint8)
    cv2.imwrite("/tmp/badge-sheet-v2.png", sheet)
    print("sheet: /tmp/badge-sheet-v2.png")


if __name__ == "__main__":
    main()
