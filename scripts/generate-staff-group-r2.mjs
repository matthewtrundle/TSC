#!/usr/bin/env node
/**
 * Staff group photo, round 2 — laboratory backdrop, bright light, natural
 * hands, professional polish. Sources: last year's Christmas-card shoot.
 * Output: _staff-group-candidates/round2-*, for review only.
 * Usage: node scripts/generate-staff-group-r2.mjs   (key from .env.local)
 */
import "./lib/env.mjs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(path.dirname(ROOT), "_staff-group-candidates");
const SCRATCH =
  "/private/tmp/claude-501/-Users-gunjanmodi-Documents-PlanoDerm-Website/5980a116-21ee-4b5d-b736-5db44f923539/scratchpad";
const SRC = SCRATCH + "/staff-photos-2";
// Album 1 (brown-sweater shoot) — the composition behind the old site's
// Gemini 2.5 group image the client referenced.
const SRC1 = SCRATCH + "/staff-photos";
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("OPENROUTER_API_KEY not set"); process.exit(1); }

const IDENTITY =
  "Edit this real group photograph of a medical practice's staff into a polished " +
  "professional team portrait. CRITICAL identity rule: keep every person — same " +
  "people, same count, same faces, ages, skin tones, hairstyles, and glasses. No " +
  "one added or removed, no face replaced or reshaped, no beauty-filter " +
  "smoothing. Within that rule, present everyone at their absolute best: " +
  "well-rested, flattering bright light on every face, tidy hair, confident " +
  "relaxed smiles — the look of a professional photographer's finished retouch. " +
  "Remove all Santa hats and holiday items. Poses: natural and composed, " +
  "standing in relaxed rows, hands relaxed at sides or lightly behind backs — " +
  "no crossed hand gestures, no hands clasped in front of chests. ";

const LOOKS = {
  "lab-charcoal":
    "Dress everyone in matching deep charcoal medical scrubs. Background: a " +
    "bright, modern medical laboratory rendered with a soft depth-of-field blur " +
    "— clean white benches, microscopes, glass — airy and full of light. " +
    "Bright, even, high-key professional lighting. Photorealistic.",
  "lab-navy":
    "Dress everyone in matching deep navy medical scrubs. Background: a bright, " +
    "modern medical laboratory rendered with a soft depth-of-field blur — clean " +
    "white benches, microscopes, glass — airy and full of light. Bright, even, " +
    "high-key professional lighting. Photorealistic.",
  "lab-whitecoats":
    "Dress the three physicians (the three men at the center) in crisp white " +
    "physician coats over charcoal scrubs, and everyone else in matching deep " +
    "charcoal medical scrubs. Background: a bright, modern medical laboratory " +
    "rendered with a soft depth-of-field blur — clean white benches, " +
    "microscopes, glass — airy and full of light. Bright, even, high-key " +
    "professional lighting. Photorealistic.",
  "keep-room-scrubs":
    "Dress everyone in matching deep charcoal medical scrubs. Keep the room " +
    "they are actually standing in, but remove every trace of Christmas: " +
    "hats, antlers, candy canes, garlands, decorations. Brighten and clean " +
    "the room's light so it reads fresh and professional. Photorealistic.",
};

const VARIANTS = [
  // Round-2 lab looks (album 2, black-shirt shoot)
  ["google/gemini-3-pro-image", SRC + "/source-008.jpg", "lab-charcoal", "round2-nbpro-008-lab-charcoal"],
  ["google/gemini-3-pro-image", SRC + "/source-008.jpg", "lab-whitecoats", "round2-nbpro-008-lab-whitecoats"],
  ["google/gemini-3-pro-image", SRC + "/source-013.jpg", "lab-navy", "round2-nbpro-013-lab-navy"],
  ["google/gemini-3-pro-image", SRC + "/source-018.jpg", "lab-charcoal", "round2-nbpro-018-lab-charcoal"],
  ["openai/gpt-5.4-image-2", SRC + "/source-008.jpg", "lab-whitecoats", "round2-gpt54-008-lab-whitecoats"],
  ["openai/gpt-5.4-image-2", SRC + "/source-018.jpg", "lab-charcoal", "round2-gpt54-018-lab-charcoal"],
  // Client-requested: GPT-5.4 on the album-1 original behind the old site's
  // group image — de-Christmas + scrubs, identity locked.
  ["openai/gpt-5.4-image-2", SRC1 + "/source-023.jpg", "keep-room-scrubs", "round2-gpt54-023-decluttered"],
  ["openai/gpt-5.4-image-2", SRC1 + "/source-023.jpg", "lab-charcoal", "round2-gpt54-023-lab-charcoal"],
  ["openai/gpt-5.4-image-2", SRC1 + "/source-049.jpg", "lab-whitecoats", "round2-gpt54-049-lab-whitecoats"],
];

async function gen(model, src, look, id) {
  const b64src = (await readFile(src)).toString("base64");
  for (let attempt = 1; attempt <= 3; attempt++) {
    // Everything inside the retry loop is guarded — a truncated response
    // body from the API must retry, not crash the whole batch.
    let data;
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          modalities: ["image", "text"],
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: IDENTITY + LOOKS[look] },
                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${b64src}` } },
              ],
            },
          ],
        }),
      });
      data = await res.json();
    } catch (e) {
      console.error(`[${id}] attempt ${attempt} transport error:`, e.message);
      await new Promise((r) => setTimeout(r, 4000 * attempt));
      continue;
    }
    const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (url) {
      const b64 = url.slice(url.indexOf(",") + 1);
      const header = url.slice(0, url.indexOf(","));
      const ext = header.includes("jpeg") || header.includes("jpg") ? "jpg" : "png";
      await writeFile(path.join(OUT, `${id}.${ext}`), Buffer.from(b64, "base64"));
      console.log("DONE", id);
      return;
    }
    console.error(`[${id}] attempt ${attempt}:`, JSON.stringify(data).slice(0, 200));
    await new Promise((r) => setTimeout(r, 4000 * attempt));
  }
  console.error("FAIL", id);
}

await mkdir(OUT, { recursive: true });
// Resume-safe: skip variants whose output already exists.
const { readdirSync } = await import("node:fs");
const existing = readdirSync(OUT).map((f) => f.replace(/\.(png|jpg)$/, ""));
const queue = VARIANTS.filter(([, , , id]) => !existing.includes(id));
console.log(`running ${queue.length} of ${VARIANTS.length} variants`);
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const [model, src, look, id] = queue.shift();
      await gen(model, src, look, id);
    }
  })
);
