#!/usr/bin/env node
/**
 * Staff group-photo candidates: transform the practice's real Christmas group
 * photos into professional all-in-scrubs team portraits.
 * Output: _staff-group-candidates/ at the repo root, for review only.
 * Usage: node scripts/generate-staff-group.mjs   (key from .env.local)
 */
import "./lib/env.mjs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(path.dirname(ROOT), "_staff-group-candidates");
const SRC =
  "/private/tmp/claude-501/-Users-gunjanmodi-Documents-PlanoDerm-Website/5980a116-21ee-4b5d-b736-5db44f923539/scratchpad/staff-photos";
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("OPENROUTER_API_KEY not set"); process.exit(1); }

const IDENTITY =
  "Edit this real group photograph of a medical practice's staff. CRITICAL: " +
  "every person's face, identity, age, skin tone, hair, glasses, expression, " +
  "position, and pose must remain EXACTLY as in the source — same people, same " +
  "arrangement, same count, nobody added, removed, or moved. Photorealistic, " +
  "natural skin texture, no beauty smoothing. No text or watermarks. ";

const LOOKS = {
  "charcoal-office":
    "Change every person's clothing to matching professional medical scrubs in " +
    "deep charcoal, and remove all holiday items (Santa hats, reindeer antlers, " +
    "candy canes). Keep the existing room but tidy it: soften and declutter the " +
    "background slightly, warm neutral office tones, even flattering light.",
  "navy-office":
    "Change every person's clothing to matching professional medical scrubs in " +
    "deep navy blue, and remove all holiday items (Santa hats, reindeer " +
    "antlers, candy canes). Keep the existing room but tidy it: soften and " +
    "declutter the background slightly, warm neutral tones, even light.",
  "charcoal-studio":
    "Change every person's clothing to matching professional medical scrubs in " +
    "deep charcoal, remove all holiday items (Santa hats, reindeer antlers, " +
    "candy canes), and replace the background with a warm ivory studio " +
    "backdrop with soft professional lighting — an elegant, editorial team " +
    "portrait.",
};

const VARIANTS = [
  ["google/gemini-3-pro-image", "source-023.jpg", "charcoal-office", "nbpro-023-charcoal-office"],
  ["google/gemini-3-pro-image", "source-034.jpg", "navy-office", "nbpro-034-navy-office"],
  ["google/gemini-3-pro-image", "source-049.jpg", "charcoal-studio", "nbpro-049-charcoal-studio"],
  ["openai/gpt-5.4-image-2", "source-023.jpg", "charcoal-office", "gpt54-023-charcoal-office"],
  ["openai/gpt-5.4-image-2", "source-034.jpg", "navy-office", "gpt54-034-navy-office"],
  ["openai/gpt-5.4-image-2", "source-049.jpg", "charcoal-studio", "gpt54-049-charcoal-studio"],
];

async function gen(model, src, look, id) {
  const b64src = (await readFile(path.join(SRC, src))).toString("base64");
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
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${b64src}` } },
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
const queue = [...VARIANTS];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const [model, src, look, id] = queue.shift();
      await gen(model, src, look, id);
    }
  })
);
