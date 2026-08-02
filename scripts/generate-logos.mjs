#!/usr/bin/env node
/**
 * Logo concept candidates for TSC via OpenRouter image models.
 * Output: _logo-concepts/ at the repo root (review folder, not public/).
 * Usage: OPENROUTER_API_KEY=... node scripts/generate-logos.mjs
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(path.dirname(ROOT), "_logo-concepts");
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("OPENROUTER_API_KEY not set"); process.exit(1); }

const BASE =
  "Professional vector-style logo design on a plain solid ivory (#F7F4EF) background, " +
  "presented flat and centered with generous margins, as a brand identity presentation. " +
  "Brand: 'TSC — The Surgery Center', a luxury Mohs skin-cancer surgery practice in Plano, " +
  "Texas. Palette strictly: deep charcoal (#1C242C), champagne bronze (#A6803E), ivory. " +
  "Elegant, restrained, medical, expensive — the register of a luxury law firm or private " +
  "bank, NOT playful, NO gradients, NO 3D, NO drop shadows, no photorealism. Crisp flat " +
  "shapes and typography only. The words must be spelled exactly: 'TSC' and " +
  "'THE SURGERY CENTER'.";

const CONCEPTS = [
  {
    id: "concept-1-incision-monogram",
    model: "google/gemini-3-pro-image",
    prompt: BASE + " Concept: a refined serif 'TSC' monogram crossed by two thin horizontal " +
      "incision lines that pass behind the letters — evoking a surgical incision and suture. " +
      "'THE SURGERY CENTER' in small tracked capitals beneath.",
  },
  {
    id: "concept-2-scalpel-serif",
    model: "openai/gpt-5.4-image-2",
    prompt: BASE + " Concept: wordmark 'TSC' where the crossbar of the T is an abstract, " +
      "elongated scalpel-blade silhouette in bronze. Minimal, almost invisible until noticed. " +
      "'THE SURGERY CENTER' small caps below.",
  },
  {
    id: "concept-3-microscope-seal",
    model: "google/gemini-3-pro-image",
    prompt: BASE + " Concept: a circular seal/crest — thin bronze double ring, tiny abstract " +
      "microscope objective glyph at top, 'TSC' serif monogram centered, 'THE SURGERY CENTER " +
      "· PLANO' in tracked caps around the ring. Think university medical crest, modernized.",
  },
  {
    id: "concept-4-layered-square",
    model: "openai/gpt-5.4-image-2",
    prompt: BASE + " Concept: an abstract mark of three thin stacked horizontal layers (the " +
      "Mohs layers) with the bottom layer in bronze, beside a serif 'TSC' wordmark. " +
      "'THE SURGERY CENTER' small caps beneath the wordmark.",
  },
  {
    id: "concept-5-suture-ligature",
    model: "google/gemini-3-pro-image",
    prompt: BASE + " Concept: elegant serif ligature logotype 'TSC' where a single continuous " +
      "thin bronze thread weaves through the three letters like a suture line, ending in a " +
      "small knot. 'THE SURGERY CENTER' tracked caps beneath.",
  },
];

async function gen(c) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: c.model,
        modalities: ["image", "text"],
        messages: [{ role: "user", content: c.prompt }],
      }),
    });
    const data = await res.json();
    const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (url) {
      const b64 = url.slice(url.indexOf(",") + 1);
      const out = path.join(OUT, `${c.id}.png`);
      await writeFile(out, Buffer.from(b64, "base64"));
      console.log("DONE", c.id);
      return;
    }
    console.error(`[${c.id}] attempt ${attempt}:`, JSON.stringify(data).slice(0, 200));
    await new Promise((r) => setTimeout(r, 4000 * attempt));
  }
  console.error("FAIL", c.id);
}

await mkdir(OUT, { recursive: true });
const queue = [...CONCEPTS];
await Promise.all(Array.from({ length: 3 }, async () => {
  while (queue.length) await gen(queue.shift());
}));
