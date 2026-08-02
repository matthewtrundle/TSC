#!/usr/bin/env python3
"""
Face-faithful group composite.

Takes an AI-transformed group photo (wardrobe/background changed) plus the
ORIGINAL photograph, and puts every person's real face back:

1. Detect faces in the original.
2. For each face, find its location in the generated base via normalized
   template matching in a local search window (the base should have kept the
   composition; small shifts are expected and corrected).
3. Color-match the original face patch to the base lighting (per-channel
   mean/std transfer in Lab space).
4. Composite with a feathered elliptical mask.
5. Emit a QA contact sheet: original face | base face | composited face.

Usage:
  python3 face_restore_composite.py <original.jpg> <base.png> <out_prefix>

Faces that fail to match confidently are listed for AI-fallback treatment
rather than silently pasted wrong. Nothing here regenerates a face — the
composite face pixels are the original photograph's.
"""
import sys

import cv2
import numpy as np


def detect_faces(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )
    faces = cascade.detectMultiScale(
        gray, scaleFactor=1.08, minNeighbors=6, minSize=(48, 48)
    )
    return sorted(faces, key=lambda f: (f[1] // 80, f[0]))


def color_transfer(src, ref):
    """Gently match src patch to ref lighting in Lab. Shifts are capped hard:
    the goal is exposure harmony, never a recolored face."""
    src_lab = cv2.cvtColor(src, cv2.COLOR_BGR2LAB).astype(np.float32)
    ref_lab = cv2.cvtColor(ref, cv2.COLOR_BGR2LAB).astype(np.float32)
    caps = (18.0, 7.0, 7.0)  # L, a, b max mean shift
    for c in range(3):
        s_mean, s_std = src_lab[:, :, c].mean(), src_lab[:, :, c].std() + 1e-6
        r_mean, r_std = ref_lab[:, :, c].mean(), ref_lab[:, :, c].std() + 1e-6
        ratio = min(max(r_std / s_std, 0.8), 1.25)
        shift = min(max(r_mean - s_mean, -caps[c]), caps[c])
        src_lab[:, :, c] = (src_lab[:, :, c] - s_mean) * ratio + s_mean + shift
    return cv2.cvtColor(np.clip(src_lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)


def feathered_mask(h, w, feather_frac=0.22):
    """Elliptical mask with a wide feather."""
    mask = np.zeros((h, w), np.float32)
    cv2.ellipse(
        mask,
        (w // 2, h // 2),
        (int(w * 0.40), int(h * 0.42)),
        0, 0, 360, 1.0, -1,
    )
    k = max(3, int(min(h, w) * feather_frac) | 1)
    return cv2.GaussianBlur(mask, (k, k), 0)


def main():
    orig_path, base_path, prefix = sys.argv[1], sys.argv[2], sys.argv[3]
    orig = cv2.imread(orig_path)
    base = cv2.imread(base_path)

    # Work at the base's scale.
    scale = base.shape[1] / orig.shape[1]
    orig_scaled = cv2.resize(
        orig, (base.shape[1], round(orig.shape[0] * scale)), interpolation=cv2.INTER_LANCZOS4
    )

    faces = detect_faces(orig_scaled)
    print(f"faces detected in original: {len(faces)}")

    out = base.copy()
    qa_rows = []
    weak = []

    for idx, (x, y, w, h) in enumerate(faces):
        # TIGHT identity core only — brows to chin, cheek to cheek. Hats,
        # antlers, hair, and clothing all sit OUTSIDE this crop, so the AI
        # base keeps supplying them and no holiday props can leak back in.
        x0 = max(0, x + int(w * -0.02))
        y0 = max(0, y + int(h * 0.16))
        x1 = min(orig_scaled.shape[1], x + w + int(w * 0.02))
        y1 = min(orig_scaled.shape[0], y + h + int(h * 0.04))
        patch = orig_scaled[y0:y1, x0:x1]
        ph, pw = patch.shape[:2]

        # Search window in the base around the same coordinates.
        sx0, sy0 = max(0, x0 - 60), max(0, y0 - 60)
        sx1 = min(base.shape[1], x1 + 60)
        sy1 = min(base.shape[0], y1 + 60)
        window = base[sy0:sy1, sx0:sx1]
        if window.shape[0] < ph or window.shape[1] < pw:
            weak.append(idx)
            continue

        res = cv2.matchTemplate(window, patch, cv2.TM_CCOEFF_NORMED)
        _, conf, _, loc = cv2.minMaxLoc(res)
        bx, by = sx0 + loc[0], sy0 + loc[1]

        if conf < 0.30:
            weak.append(idx)
            print(f"  face {idx:02d}: LOW confidence {conf:.2f} — flagged for fallback")
            continue

        base_patch = out[by : by + ph, bx : bx + pw]
        matched = color_transfer(patch, base_patch)
        mask = feathered_mask(ph, pw)[:, :, None]
        blended = (matched.astype(np.float32) * mask + base_patch.astype(np.float32) * (1 - mask)).astype(np.uint8)
        out[by : by + ph, bx : bx + pw] = blended

        qa = np.hstack([
            cv2.resize(patch, (160, 160)),
            cv2.resize(base_patch, (160, 160)),
            cv2.resize(blended, (160, 160)),
        ])
        cv2.putText(qa, f"{idx:02d} conf={conf:.2f}", (6, 20),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        qa_rows.append(qa)
        print(f"  face {idx:02d}: restored at ({bx},{by}) conf={conf:.2f}")

    cv2.imwrite(f"{prefix}-composite.png", out)
    if qa_rows:
        cv2.imwrite(f"{prefix}-qa.jpg", np.vstack(qa_rows))
    print(f"composite: {prefix}-composite.png | QA sheet: {prefix}-qa.jpg")
    print(f"weak/unmatched faces needing AI fallback: {weak if weak else 'none'}")


if __name__ == "__main__":
    main()
