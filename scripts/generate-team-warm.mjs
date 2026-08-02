#!/usr/bin/env node
/**
 * Match Dr. Wells and Dr. Parry to Dr. Modi's chosen warm office-bokeh look
 * (gpt-5.4-image-2). Output to _headshot-refresh/ for review.
 * Usage: OPENROUTER_API_KEY=... node scripts/generate-team-warm.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(path.dirname(ROOT), "_headshot-refresh");
const SRC = path.join(path.dirname(ROOT), "_original-photos");
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("OPENROUTER_API_KEY not set"); process.exit(1); }

const LOOK =
  "Wardrobe: crisp white physician's coat over a light blue dress shirt. " +
  "Background: a warm, elegant modern medical office rendered as deep creamy " +
  "bokeh — completely unrecognizable detail, just warm neutral tones and soft " +
  "window light from the side. Natural, approachable, editorial. " +
  "Photorealistic, medium-format digital, 85mm portrait look, natural skin " +
  "texture retained — no beauty smoothing, no plastic skin, no AI sheen. " +
  "Head-and-shoulders, 4:5 portrait framing, eyes at upper third. No text, " +
  "no watermarks.";

const SUBJECTS = [
  {
    id: "gpt54-office-bokeh-wells",
    src: "dr-wells.webp",
    identity:
      "Edit this photograph of a real physician into a professional headshot " +
      "while preserving his exact facial identity — do not alter his face, " +
      "age, skin, hair, or beard. He wears rectangular dark-framed glasses: " +
      "keep them exactly as in the source. Keep his natural expression. ",
  },
  {
    id: "gpt54-office-bokeh-parry",
    src: "dr-parry.webp",
    identity:
      "Edit this photograph of a real physician into a professional headshot " +
      "while preserving his exact facial identity — do not alter his face, " +
      "age, skin, white hair, or mustache. His tortoiseshell reading glasses " +
      "hang from his collar, NOT on his face — keep it that way; never place " +
      "glasses on his face. Keep his natural warm smile. ",
  },
];

async function gen({ id, src, identity }) {
  const b64src = (await readFile(path.join(SRC, src))).toString("base64");
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-5.4-image-2",
        modalities: ["image", "text"],
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: identity + LOOK },
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
      await writeFile(path.join(OUT, `${id}.png`), Buffer.from(b64, "base64"));
      console.log("DONE", id);
      return;
    }
    console.error(`[${id}] attempt ${attempt}:`, JSON.stringify(data).slice(0, 200));
    await new Promise((r) => setTimeout(r, 4000 * attempt));
  }
  console.error("FAIL", id);
}

await Promise.all(SUBJECTS.map(gen));
