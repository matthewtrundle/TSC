#!/usr/bin/env node
/**
 * Dr. Modi headshot refresh — 10 candidates across frontier image models.
 * Output: _headshot-refresh/ at the repo root, for review only.
 * Usage: OPENROUTER_API_KEY=... node scripts/generate-modi-refresh.mjs
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(path.dirname(ROOT), "_headshot-refresh");
const SRC = path.join(path.dirname(ROOT), "_original-photos", "dr-modi.webp");
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("OPENROUTER_API_KEY not set"); process.exit(1); }

// Likeness contract shared by every variant. Dr. Modi wears NO glasses.
const IDENTITY =
  "Edit this photograph of a real physician into a professional headshot while " +
  "preserving his exact facial identity. CRITICAL: do not alter his face, age, " +
  "skin tone, hair, or salt-and-pepper beard in any way. He does NOT wear " +
  "eyeglasses — the output must show him without glasses. Keep his natural warm " +
  "smile and direct gaze. Photorealistic, shot on medium-format digital, 85mm " +
  "portrait look, natural skin texture retained — absolutely no beauty smoothing, " +
  "no plastic skin, no AI sheen. Head-and-shoulders, 4:5 portrait framing, eyes " +
  "at the upper third. No text, no watermarks. ";

const LOOKS = {
  "editorial-charcoal":
    "Wardrobe: crisp white physician's coat over a light blue dress shirt. " +
    "Backdrop: seamless deep charcoal (#1C242C) studio with a subtle warm " +
    "vignette. Dramatic soft key light from upper left with a gentle champagne " +
    "rim light — luxury magazine-cover grade.",
  "studio-gray":
    "Wardrobe: crisp white physician's coat over a light blue dress shirt. " +
    "Backdrop: softly graded neutral warm-gray studio, slightly out of focus. " +
    "Even, flattering corporate-portrait lighting with soft fill.",
  "ivory-bright":
    "Wardrobe: crisp white physician's coat over a light blue dress shirt. " +
    "Backdrop: bright ivory (#F7F4EF) seamless studio, high-key but not blown " +
    "out. Airy, modern, premium-clinic look with soft wraparound light.",
  "office-bokeh":
    "Wardrobe: crisp white physician's coat over a light blue dress shirt. " +
    "Background: a warm, elegant modern medical office rendered as deep " +
    "creamy bokeh — completely unrecognizable detail, just warm neutral tones " +
    "and soft window light from the side. Natural, approachable, editorial.",
  "outdoor-dusk":
    "Wardrobe: crisp white physician's coat over a light blue dress shirt. " +
    "Background: warm golden-hour exterior rendered as soft bokeh — glass and " +
    "warm stone tones, shallow depth of field. Confident, natural light on the " +
    "face with gentle warm rim.",
};

const VARIANTS = [
  ["openai/gpt-5.4-image-2", "editorial-charcoal", "gpt54-editorial-charcoal"],
  ["openai/gpt-5.4-image-2", "studio-gray", "gpt54-studio-gray"],
  ["openai/gpt-5.4-image-2", "ivory-bright", "gpt54-ivory-bright"],
  ["openai/gpt-5.4-image-2", "office-bokeh", "gpt54-office-bokeh"],
  ["openai/gpt-5-image", "editorial-charcoal", "gpt5-editorial-charcoal"],
  ["openai/gpt-5-image", "outdoor-dusk", "gpt5-outdoor-dusk"],
  ["google/gemini-3-pro-image", "editorial-charcoal", "nbpro-editorial-charcoal"],
  ["google/gemini-3-pro-image", "ivory-bright", "nbpro-ivory-bright"],
  ["google/gemini-3-pro-image", "office-bokeh", "nbpro-office-bokeh"],
  ["google/gemini-3.1-flash-image", "studio-gray", "nb31-studio-gray"],
];

async function gen(model, look, id, b64src) {
  for (let attempt = 1; attempt <= 3; attempt++) {
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
              { type: "image_url", image_url: { url: `data:image/webp;base64,${b64src}` } },
            ],
          },
        ],
      }),
    });
    const data = await res.json();
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
const b64src = (await readFile(SRC)).toString("base64");
const queue = [...VARIANTS];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const [model, look, id] = queue.shift();
      await gen(model, look, id, b64src);
    }
  })
);
