#!/usr/bin/env node
/**
 * Office-building glow-up: hero-grade treatments of the practice's real
 * building at 6100 Windhaven Parkway, from the client's own photos.
 * Output: _building-glowup/ album for review.
 * Usage: node scripts/generate-building-glowup.mjs   (key from .env.local)
 */
import "./lib/env.mjs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC =
  "/private/tmp/claude-501/-Users-gunjanmodi-Documents-PlanoDerm-Website/5980a116-21ee-4b5d-b736-5db44f923539/scratchpad/building";
const OUT = "/Users/gunjanmodi/Documents/PlanoDerm Website/_building-glowup";
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("OPENROUTER_API_KEY not set"); process.exit(1); }

// The building IS the identity — its architecture must survive exactly.
const IDENTITY =
  "Edit this photograph of a real medical office building for a luxury " +
  "practice website hero. CRITICAL: preserve the building's exact " +
  "architecture and identity — the red brick facade and its patterns, the " +
  "cast-stone bases, the stepped parapet, the arched second-floor window, " +
  "the porte-cochere canopy, and the white dimensional letters reading " +
  "exactly 'PLANO DERMATOLOGY'. Do not invent floors, wings, or signage. " +
  "CLEAN THE SCENE: remove all cars, parking-sign poles, painted parking " +
  "stripes and handicap symbols, traffic cones, and street clutter; replace " +
  "the empty foreground with clean paving and refreshed elegant landscaping " +
  "(sculpted shrubs, ornamental grasses). Photorealistic architectural " +
  "photography, wide 21:9 cinematic composition, crisp detail, no people. ";

const LOOKS = {
  dusk:
    "Lighting: cinematic dusk — deep blue-hour sky with warm ivory-gold " +
    "horizon glow, every window lit warm from within, the sign letters " +
    "catching warm uplighting, subtle landscape lighting. Color grade: warm " +
    "ivory highlights, deep charcoal shadows, champagne-bronze accents — " +
    "luxury, editorial, serene.",
  golden:
    "Lighting: golden hour — low warm sun raking across the brick, long " +
    "soft shadows, glowing warm sky with a few gilded clouds, windows " +
    "reflecting the sunset. Color grade: warm ivory highlights, deep " +
    "charcoal shadows, champagne-bronze accents — rich, inviting, luxury.",
  bluehour:
    "Lighting: full blue hour — twilight indigo sky, building glowing as " +
    "the brightest element, all windows warm amber, sign softly illuminated, " +
    "wet-look paving with subtle reflections. Dramatic, high-end, calm.",
  morning:
    "Lighting: pristine clear morning — soft directional sunlight, clean " +
    "blue sky with delicate high clouds, fresh and immaculate. Color grade: " +
    "airy ivory highlights, gentle charcoal shadows — crisp, premium, calm.",
};

const JOBS = [
  ["src-front-real.png", "dusk", "google/gemini-3-pro-image", "front-dusk-nb"],
  ["src-front-real.png", "golden", "google/gemini-3-pro-image", "front-golden-nb"],
  ["src-front-real.png", "bluehour", "openai/gpt-5.4-image-2", "front-bluehour-gpt"],
  ["src-front-real.png", "morning", "openai/gpt-5.4-image-2", "front-morning-gpt"],
  ["src-angle-real.png", "dusk", "google/gemini-3-pro-image", "angle-dusk-nb"],
  ["src-angle-real.png", "golden", "openai/gpt-5.4-image-2", "angle-golden-gpt"],
  ["src-angle-real.png", "bluehour", "google/gemini-3-pro-image", "angle-bluehour-nb"],
  ["src-street-wide.png", "dusk", "google/gemini-3-pro-image", "wide-dusk-nb"],
  ["src-street-wide.png", "golden", "google/gemini-3-pro-image", "wide-golden-nb"],
  ["src-street-front.jpg", "bluehour", "openai/gpt-5.4-image-2", "street-bluehour-gpt"],
];

async function gen([src, look, model, id]) {
  const buf = await readFile(path.join(SRC, src));
  const mime = src.endsWith(".jpg") ? "image/jpeg" : src.endsWith(".webp") ? "image/webp" : "image/png";
  for (let a = 1; a <= 3; a++) {
    let data;
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          modalities: ["image", "text"],
          messages: [{
            role: "user",
            content: [
              { type: "text", text: IDENTITY + LOOKS[look] },
              { type: "image_url", image_url: { url: `data:${mime};base64,${buf.toString("base64")}` } },
            ],
          }],
        }),
      });
      data = await res.json();
    } catch (e) {
      console.error(id, "attempt", a, e.message);
      continue;
    }
    const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (url) {
      const ext = url.slice(0, url.indexOf(",")).includes("jpeg") ? "jpg" : "png";
      await writeFile(path.join(OUT, `${id}.${ext}`), Buffer.from(url.slice(url.indexOf(",") + 1), "base64"));
      console.log("DONE", id);
      return;
    }
    console.error(id, "attempt", a, JSON.stringify(data).slice(0, 120));
  }
  console.error("FAIL", id);
}

await mkdir(OUT, { recursive: true });
const queue = [...JOBS];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) await gen(queue.shift());
}));
