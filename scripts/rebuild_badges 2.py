#!/usr/bin/env python3
"""
Rebuild the twelve D Best badges with pixel-identical composition.

The yearly badge art varies internally (D-box scale, BEST weight, spacing),
so outer-canvas normalization can never look uniform. This script:
  1. splits each badge into its three stacked elements (BEST / red D / year)
     by finding the white row-gaps between them;
  2. takes ONE canonical BEST and ONE canonical red D (from the cleanest
     official file, 2020) for every year;
  3. keeps each year's own digits, scaled to one uniform height;
  4. reassembles all twelve on identical transparent canvases with fixed
     spacing — whites become alpha so the page's ivory shows through.
"""
import glob
import os

import cv2
import numpy as np

DIR = "/Users/gunjanmodi/Documents/PlanoDerm Website/TSC/public/images/awards"
YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]

# Output geometry (identical for every badge).
CANVAS_W, CANVAS_H = 880, 1440
BEST_W = 560          # canonical BEST width
D_W = 620             # canonical D-box width
YEAR_H = 240          # every year's digits scaled to this cap height
GAP1, GAP2 = 36, 44   # BEST->D, D->year


def load(year):
    path = os.path.join(DIR, f"d-best-{year}.webp")
    img = cv2.imread(path, cv2.IMREAD_COLOR)
    if img is None:
        raise SystemExit(f"cannot read {path}")
    return img


def split_elements(img):
    """Return list of (top, bottom) row-spans of non-white content blocks."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    content = (gray < 235).any(axis=1)
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


def crop_block(img, span):
    top, bottom = span
    strip = img[top:bottom]
    gray = cv2.cvtColor(strip, cv2.COLOR_BGR2GRAY)
    cols = (gray < 235).any(axis=0)
    x0, x1 = int(np.argmax(cols)), len(cols) - int(np.argmax(cols[::-1]))
    return strip[:, x0:x1]


def to_rgba(img):
    """White -> transparent. Alpha from distance-to-white of the min channel."""
    mn = img.min(axis=2).astype(np.int16)
    alpha = np.clip(255 - mn, 0, 255).astype(np.uint8)
    rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = alpha
    return rgba


def scale_to(img, width=None, height=None):
    h, w = img.shape[:2]
    if width is not None:
        return cv2.resize(img, (width, round(h * width / w)), interpolation=cv2.INTER_AREA if width < w else cv2.INTER_LANCZOS4)
    return cv2.resize(img, (round(w * height / h), height), interpolation=cv2.INTER_AREA if height < h else cv2.INTER_LANCZOS4)


def paste(canvas, rgba, cx, y):
    h, w = rgba.shape[:2]
    x = cx - w // 2
    roi = canvas[y : y + h, x : x + w]
    a = (rgba[:, :, 3:4].astype(np.float32)) / 255.0
    roi[:, :, :3] = (rgba[:, :, :3] * a + roi[:, :, :3] * (1 - a)).astype(np.uint8)
    roi[:, :, 3] = np.clip(roi[:, :, 3] + rgba[:, :, 3], 0, 255)
    return y + h


def main():
    # Canonical BEST + D from the 2020 official badge.
    ref = load(2020)
    ref_blocks = split_elements(ref)
    assert len(ref_blocks) >= 3, f"2020 split into {len(ref_blocks)} blocks"
    best = to_rgba(scale_to(crop_block(ref, ref_blocks[0]), width=BEST_W))
    dbox = to_rgba(scale_to(crop_block(ref, ref_blocks[1]), width=D_W))

    total_h = best.shape[0] + GAP1 + dbox.shape[0] + GAP2 + YEAR_H
    top0 = (CANVAS_H - total_h) // 2

    for year in YEARS:
        img = load(year)
        blocks = split_elements(img)
        assert len(blocks) >= 3, f"{year}: split into {len(blocks)} blocks"
        year_img = to_rgba(scale_to(crop_block(img, blocks[-1]), height=YEAR_H))

        canvas = np.zeros((CANVAS_H, CANVAS_W, 4), np.uint8)
        y = top0
        y = paste(canvas, best, CANVAS_W // 2, y) + GAP1
        y = paste(canvas, dbox, CANVAS_W // 2, y) + GAP2
        paste(canvas, year_img, CANVAS_W // 2, y)

        out = os.path.join(DIR, f"d-best-{year}.webp")
        cv2.imwrite(out, canvas, [cv2.IMWRITE_WEBP_QUALITY, 92])
        print(year, "rebuilt: year strip", year_img.shape[1], "x", year_img.shape[0])

    # Contact sheet for verification (on ivory).
    sheet = np.full((360, 12 * 230, 3), (239, 244, 247), np.uint8)  # BGR ivory
    for i, year in enumerate(YEARS):
        rgba = cv2.imread(os.path.join(DIR, f"d-best-{year}.webp"), cv2.IMREAD_UNCHANGED)
        small = cv2.resize(rgba, (round(CANVAS_W * 330 / CANVAS_H), 330), interpolation=cv2.INTER_AREA)
        h, w = small.shape[:2]
        x = i * 230 + (230 - w) // 2
        roi = sheet[15 : 15 + h, x : x + w]
        a = small[:, :, 3:4].astype(np.float32) / 255.0
        roi[:] = (small[:, :, :3] * a + roi * (1 - a)).astype(np.uint8)
    cv2.imwrite("/tmp/badge-sheet.png", sheet)
    print("verification sheet: /tmp/badge-sheet.png")


if __name__ == "__main__":
    main()
