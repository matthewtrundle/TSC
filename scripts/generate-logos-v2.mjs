#!/usr/bin/env node
/**
 * Logo concepts, round 2 — hierarchy flipped per client: "PLANO DERMATOLOGY"
 * large, "The Surgery Center" small. Output: _logo-concepts-v2/ for review.
 * Usage: node scripts/generate-logos-v2.mjs   (key from .env.local)
 */
import "./lib/env.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(path.dirname(ROOT), "_logo-concepts-v2");
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("OPENROUTER_API_KEY not set"); process.exit(1); }

const BASE =
  "Professional vector-style logo design presented flat and centered on a solid " +
  "ivory (#F7F4EF) background with generous margins, as a brand identity " +
  "presentation slide. Brand hierarchy is CRITICAL and exact: the words " +
  "'PLANO DERMATOLOGY' are the LARGE, dominant element; the words 'THE SURGERY " +
  "CENTER' appear SMALL — a quiet tracked-capitals over-line or under-line. " +
  "Both spelled exactly. Palette strictly: deep charcoal (#1C242C), champagne " +
  "bronze (#A6803E), ivory. Register: luxury medical practice — private-bank " +
  "elegance, NOT playful, NO gradients, NO 3D, NO drop shadows, NO photorealism. " +
  "Crisp flat shapes and refined typography only. ";

const CONCEPTS = [
  ["v2-01-serif-stack", "google/gemini-3-pro-image",
   "Concept: pure typographic stack. 'THE SURGERY CENTER' as a tiny tracked-caps over-line, thin bronze rule beneath it, then 'PLANO' and 'DERMATOLOGY' stacked in a large, elegant high-contrast serif (Didot-like), charcoal."],
  ["v2-02-incision-evolved", "openai/gpt-5.4-image-2",
   "Concept: evolution of the practice's incision-line mark. Two thin horizontal bronze lines pass behind the large serif words 'PLANO DERMATOLOGY'; 'THE SURGERY CENTER' small above in tracked caps. Refined, balanced, editorial."],
  ["v2-03-pd-monogram", "google/gemini-3-pro-image",
   "Concept: an interlocked 'PD' serif monogram in charcoal with a single bronze suture thread weaving through it, above 'PLANO DERMATOLOGY' set large in refined serif, with 'THE SURGERY CENTER' tiny beneath."],
  ["v2-04-crest-seal", "openai/gpt-5.4-image-2",
   "Concept: circular crest — thin double bronze ring, a small elegant microscope glyph at top, 'PLANO DERMATOLOGY' large across the center in serif, 'THE SURGERY CENTER' in small tracked caps curving along the lower ring. University-crest gravitas, modernized."],
  ["v2-05-layers-mark", "google/gemini-3-pro-image",
   "Concept: an abstract mark of three thin stacked horizontal layers (the Mohs layers), the middle one bronze, to the LEFT of a two-line lockup: 'THE SURGERY CENTER' small tracked caps on top, 'PLANO DERMATOLOGY' large serif below."],
  ["v2-06-widelock", "openai/gpt-5.4-image-2",
   "Concept: wide horizontal lockup. 'PLANO' in large charcoal serif, a small bronze diamond separator, 'DERMATOLOGY' in large charcoal serif — all on one line; 'THE SURGERY CENTER' centered above in very small tracked capitals with thin bronze rules extending left and right."],
  ["v2-07-texas-star", "google/gemini-3-pro-image",
   "Concept: a minimal five-pointed Texas lone star outlined in bronze, small, centered above 'PLANO DERMATOLOGY' in large elegant serif, 'THE SURGERY CENTER' in small tracked caps beneath. Subtle Texan pride, luxury register."],
  ["v2-08-scalpel-serif", "openai/gpt-5.4-image-2",
   "Concept: 'PLANO DERMATOLOGY' large in a refined serif where the crossbar of the letter A is a subtle elongated bronze scalpel-blade silhouette — almost invisible until noticed. 'THE SURGERY CENTER' small tracked caps above."],
  ["v2-09-emblem-shield", "google/gemini-3-pro-image",
   "Concept: a slim, modern shield emblem in outline bronze containing a tiny serif 'PD', positioned left of the stacked lockup: small 'THE SURGERY CENTER', large 'PLANO DERMATOLOGY'. Quietly institutional."],
  ["v2-10-microscope-line", "openai/gpt-5.4-image-2",
   "Concept: a single continuous thin bronze line drawing of a microscope silhouette in profile, minimal and abstract, sitting above 'PLANO DERMATOLOGY' in large charcoal serif with 'THE SURGERY CENTER' small beneath in tracked caps."],
];

async function gen([id, model, concept]) {
  for (let a = 1; a <= 3; a++) {
    let data;
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          modalities: ["image", "text"],
          messages: [{ role: "user", content: [{ type: "text", text: BASE + concept }] }],
        }),
      });
      data = await res.json();
    } catch (e) {
      console.error(id, "attempt", a, e.message);
      continue;
    }
    const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (url) {
      await writeFile(path.join(OUT, `${id}.png`), Buffer.from(url.slice(url.indexOf(",") + 1), "base64"));
      console.log("DONE", id);
      return;
    }
    console.error(id, "attempt", a, JSON.stringify(data).slice(0, 120));
  }
  console.error("FAIL", id);
}

await mkdir(OUT, { recursive: true });
const queue = [...CONCEPTS];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) await gen(queue.shift());
}));
