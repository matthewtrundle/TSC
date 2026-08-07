#!/usr/bin/env python3
"""
Deterministic CV fix for the one front-row figure the model edits keep
missing: recolor her brown sweater to match the charcoal scrubs, and inpaint
the small mint-green candy heart out of her hands. Operates only inside a
given bounding box; everything else is untouched.

Usage: fix_sweater_cv.py <img> <x> <y> <w> <h> <out>
"""
import sys

import cv2
import numpy as np


def main():
    img_path, x, y, w, h, out_path = (
        sys.argv[1], int(sys.argv[2]), int(sys.argv[3]),
        int(sys.argv[4]), int(sys.argv[5]), sys.argv[6],
    )
    img = cv2.imread(img_path)
    roi = img[y : y + h, x : x + w]
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)

    # --- Brown sweater: warm hue, moderate saturation, mid value.
    brown = cv2.inRange(hsv, (5, 40, 40), (30, 200, 200))
    brown = cv2.morphologyEx(brown, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
    brown = cv2.morphologyEx(brown, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    brown = cv2.GaussianBlur(brown, (9, 9), 0)

    # Target: sample the charcoal scrubs stats from the neighbor at the left
    # edge of the ROI (first front-row person, already charcoal).
    sample = img[y + h // 2 : y + h - 10, max(0, x - 80) : x - 10]
    tgt_hsv = cv2.cvtColor(sample, cv2.COLOR_BGR2HSV)
    tgt_h = float(np.median(tgt_hsv[:, :, 0]))
    tgt_s = float(np.median(tgt_hsv[:, :, 1]))
    tgt_v = float(np.median(tgt_hsv[:, :, 2]))

    hsv_f = hsv.astype(np.float32)
    alpha = (brown.astype(np.float32) / 255.0)
    # Keep the sweater's own shading (value variation), move hue/sat to target
    # and compress value toward the charcoal median.
    hsv_f[:, :, 0] = hsv_f[:, :, 0] * (1 - alpha) + tgt_h * alpha
    hsv_f[:, :, 1] = hsv_f[:, :, 1] * (1 - alpha) + tgt_s * alpha
    v = hsv_f[:, :, 2]
    v_moved = tgt_v + (v - float(np.median(v[brown > 128]) if (brown > 128).any() else tgt_v)) * 0.55
    hsv_f[:, :, 2] = v * (1 - alpha) + v_moved * alpha
    roi_re = cv2.cvtColor(np.clip(hsv_f, 0, 255).astype(np.uint8), cv2.COLOR_HSV2BGR)

    # --- Mint-green heart: bright, green-cyan hue.
    hsv2 = cv2.cvtColor(roi_re, cv2.COLOR_BGR2HSV)
    mint = cv2.inRange(hsv2, (35, 25, 120), (95, 255, 255))
    mint = cv2.dilate(mint, np.ones((7, 7), np.uint8))
    roi_fixed = cv2.inpaint(roi_re, mint, 7, cv2.INPAINT_TELEA)

    img[y : y + h, x : x + w] = roi_fixed
    cv2.imwrite(out_path, img)
    print(f"done: {out_path} (brown px: {(brown > 128).sum()}, mint px: {(mint > 0).sum()})")


if __name__ == "__main__":
    main()
