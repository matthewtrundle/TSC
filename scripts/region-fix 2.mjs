#!/usr/bin/env node
/**
 * Targeted region edit: crop a rectangle, let the model fix ONLY that crop,
 * paste it back with a feathered seam. Keeps the rest of the image untouched
 * by construction.
 * Usage: node scripts/region-fix.mjs <img> <x> <y> <w> <h> "<instruction>" <out>
 */
import "./lib/env.mjs";
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const [, , IMG, X, Y, W, H, INSTRUCTION, OUTP] = process.argv;
const [x, y, w, h] = [X, Y, W, H].map(Number);
const KEY = process.env.OPENROUTER_API_KEY;

const cropBuf = await sharp(IMG).extract({ left: x, top: y, width: w, height: h }).png().toBuffer();

const PROMPT =
  "Edit this image crop. Keep every face and person's position exactly as-is. " +
  INSTRUCTION +
  " Change nothing else. Match the existing lighting and grain. Photorealistic.";

let edited = null;
for (let attempt = 1; attempt <= 3 && !edited; attempt++) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image",
        modalities: ["image", "text"],
        messages: [{
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: `data:image/png;base64,${cropBuf.toString("base64")}` } },
          ],
        }],
      }),
    });
    const data = await res.json();
    const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (url) edited = Buffer.from(url.slice(url.indexOf(",") + 1), "base64");
    else console.error(`attempt ${attempt}:`, JSON.stringify(data).slice(0, 160));
  } catch (e) {
    console.error(`attempt ${attempt}:`, e.message);
  }
}
if (!edited) { console.error("FAIL"); process.exit(1); }

// Resize model output back to the crop box and build a feathered alpha mask.
const editedSized = await sharp(edited).resize(w, h, { fit: "fill" }).toBuffer();
const feather = Math.round(Math.min(w, h) * 0.06);
const maskSvg = `<svg width="${w}" height="${h}"><defs><filter id="b"><feGaussianBlur stdDeviation="${feather}"/></filter></defs><rect x="${feather * 2}" y="${feather * 2}" width="${w - feather * 4}" height="${h - feather * 4}" fill="white" filter="url(#b)"/></svg>`;
const withAlpha = await sharp(editedSized)
  .composite([{ input: Buffer.from(maskSvg), blend: "dest-in" }])
  .png().toBuffer();

await sharp(IMG)
  .composite([{ input: withAlpha, left: x, top: y }])
  .png().toFile(OUTP);
console.log("DONE", OUTP);
