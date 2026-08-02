#!/usr/bin/env node
/**
 * Luxury asset generation for the PlanoDerm site via OpenRouter.
 *
 * Usage: OPENROUTER_API_KEY=... node scripts/generate-images.mjs [id ...]
 * With no args, generates every asset in the manifest. Raw model output lands
 * in scripts/.gen-raw/, finished WebP (and AVIF for heroes) in public/images/.
 *
 * The key comes from the environment on purpose — never commit it.
 */
import "./lib/env.mjs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RAW_DIR = path.join(ROOT, "scripts", ".gen-raw");
const OUT_DIR = path.join(ROOT, "public", "images");
const ORIGINALS = path.join(path.dirname(ROOT), "_original-photos");
const MODEL = "google/gemini-3-pro-image";
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) {
  console.error("OPENROUTER_API_KEY is not set");
  process.exit(1);
}

// Shared fragments keep the set visually coherent.
const GRADE =
  "Color grade: warm ivory highlights, deep charcoal (#1C242C) shadows, champagne-bronze " +
  "(#A6803E) accent light. Ultra-high-end, cinematic, editorial. Photorealistic, shot on " +
  "medium-format digital, natural film grain, no text, no watermarks, no logos.";

const PORTRAIT = (who, glasses) =>
  "Edit this photograph into a dramatic editorial portrait of the same physician for a " +
  "luxury medical practice, preserving the person's exact facial identity. CRITICAL: real " +
  `physician — do not alter face, age, skin, hair, or facial hair. ${glasses} ` +
  "Replace the background with a seamless deep charcoal (#1C242C) studio backdrop with a " +
  "very subtle warm vignette. Dramatic soft key light from upper left, gentle champagne rim " +
  "light on the shoulder, magazine-cover grade. Crisp white physician's coat over a light " +
  "blue dress shirt, no embroidery. Head-and-shoulders, 4:5 portrait, eyes at upper third. " +
  "Natural skin texture, no beauty smoothing. " +
  GRADE;

const MANIFEST = [
  // Portraits: two candidates each, generated from the practice's real photos.
  ...["a", "b"].flatMap((v) => [
    {
      id: `dr-modi-editorial-${v}`,
      src: path.join(ORIGINALS, "dr-modi.webp"),
      prompt: PORTRAIT(
        "Dr. Modi",
        "This man does NOT wear eyeglasses — output must show him WITHOUT glasses."
      ),
      width: 1240,
      height: 1550,
      out: `dr-modi-editorial-${v}.webp`,
      quality: 82,
    },
    {
      id: `dr-wells-editorial-${v}`,
      src: path.join(ORIGINALS, "dr-wells.webp"),
      prompt: PORTRAIT(
        "Dr. Wells",
        "He wears rectangular dark-framed glasses — keep them exactly as in the source."
      ),
      width: 1240,
      height: 1550,
      out: `dr-wells-editorial-${v}.webp`,
      quality: 82,
    },
    {
      id: `dr-parry-editorial-${v}`,
      src: path.join(ORIGINALS, "dr-parry.webp"),
      prompt: PORTRAIT(
        "Dr. Parry",
        "His tortoiseshell reading glasses hang from his collar — NOT on his face. Do not " +
          "place glasses on his face."
      ),
      width: 1240,
      height: 1550,
      out: `dr-parry-editorial-${v}.webp`,
      quality: 82,
    },
  ]),

  // Heroes — wide, with overscan headroom for the Ken Burns pan.
  {
    id: "hero-skyline-dusk",
    prompt:
      "Cinematic ultra-wide view of a prosperous North Texas city district at dusk in the " +
      "style of Plano's Legacy West: elegant mid-rise glass and warm stone architecture, " +
      "golden-hour ivory sky fading to dusk blue, warm interior lights beginning to glow, " +
      "tree-lined boulevard, anamorphic lens feel. No people close to camera, no readable " +
      "signage, no logos. Aspect ratio 21:9. " + GRADE,
    width: 2880,
    height: 1300,
    out: "hero-skyline-dusk.webp",
    quality: 72,
    avif: true,
  },
  {
    id: "hero-microscope-dark",
    prompt:
      "Extreme macro photograph of a premium laboratory microscope objective turret against " +
      "near-black charcoal, champagne-bronze rim lighting tracing the metal edges, shallow " +
      "depth of field, abstract and evocative fine-art style — not documentary. Aspect " +
      "ratio 21:9. " + GRADE,
    width: 2880,
    height: 1300,
    out: "hero-microscope-dark.webp",
    quality: 72,
    avif: true,
  },
  {
    id: "hero-marble-light",
    prompt:
      "Ivory marble slab with subtle veining lit by raking golden-hour light through a tall " +
      "window, long soft shadows, abstract luxury minimalism, very low contrast. Aspect " +
      "ratio 21:9. " + GRADE,
    width: 2880,
    height: 1300,
    out: "hero-marble-light.webp",
    quality: 72,
    avif: true,
  },

  // Textures — quiet backdrops, heavily compressed.
  {
    id: "texture-marble-ivory",
    prompt:
      "Seamless-feeling ivory marble surface, tone-on-tone veining barely a shade deeper " +
      "than the stone, flat even light, extremely subtle, background texture only. " + GRADE,
    width: 2000,
    height: 1200,
    out: "texture-marble-ivory.webp",
    quality: 60,
  },
  {
    id: "texture-marble-charcoal",
    prompt:
      "Dark charcoal marble surface with faint champagne-gold veining, moody low light, " +
      "subtle background texture only, near-black. " + GRADE,
    width: 2000,
    height: 1200,
    out: "texture-marble-charcoal.webp",
    quality: 60,
  },

  // Subject imagery — evocative, never documentary.
  {
    id: "svc-histology-art",
    prompt:
      "Abstract fine-art macro of a stained histology tissue section seen through a " +
      "microscope: flowing magenta and violet cellular structures graded toward bronze and " +
      "charcoal, resembling abstract expressionist art. Aspect 4:3. " + GRADE,
    width: 1600,
    height: 1200,
    out: "svc-histology-art.webp",
    quality: 78,
  },
  {
    id: "svc-slide-glass",
    prompt:
      "Macro photograph of glass microscope slides with jewel-toned stained tissue " +
      "sections, dark-field lighting, specular gleams along the glass edges, dark charcoal " +
      "background. Aspect 3:2. " + GRADE,
    width: 1600,
    height: 1067,
    out: "svc-slide-glass.webp",
    quality: 78,
  },
  {
    id: "svc-microscope-detail",
    prompt:
      "Close macro detail of a laboratory microscope stage and eyepiece, brushed metal and " +
      "black enamel, champagne-bronze accent light, shallow focus, abstract. Aspect 3:2. " +
      GRADE,
    width: 1600,
    height: 1067,
    out: "svc-microscope-detail.webp",
    quality: 78,
  },
  {
    id: "svc-surgical-light",
    prompt:
      "Abstract serene photograph: soft circular bokeh of a surgical light reflected in " +
      "polished steel, dark charcoal field, calm and non-graphic, luxurious minimalism. " +
      "Aspect 3:2. " + GRADE,
    width: 1600,
    height: 1067,
    out: "svc-surgical-light.webp",
    quality: 78,
  },
  {
    id: "practice-legacy-west",
    prompt:
      "Elegant North Texas mixed-use streetscape at dusk in the style of Legacy West in " +
      "Plano: warm stone facades, glass, string lights in young trees, blue-hour sky, " +
      "inviting and prosperous, no readable signage, no close people. Aspect 3:2. " + GRADE,
    width: 1600,
    height: 1067,
    out: "practice-legacy-west.webp",
    quality: 78,
  },
];

async function generate(item) {
  const content = [{ type: "text", text: item.prompt }];
  if (item.src) {
    const b64 = (await readFile(item.src)).toString("base64");
    content.push({
      type: "image_url",
      image_url: { url: `data:image/webp;base64,${b64}` },
    });
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        modalities: ["image", "text"],
        messages: [{ role: "user", content }],
      }),
    });
    const data = await res.json();
    const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (url) {
      const b64 = url.slice(url.indexOf(",") + 1);
      const raw = path.join(RAW_DIR, `${item.id}.png`);
      await writeFile(raw, Buffer.from(b64, "base64"));
      return raw;
    }
    console.error(
      `[${item.id}] attempt ${attempt} failed:`,
      JSON.stringify(data).slice(0, 300)
    );
    await new Promise((r) => setTimeout(r, 4000 * attempt));
  }
  throw new Error(`generation failed: ${item.id}`);
}

async function finish(item, raw) {
  // cover-resize to the exact target box; model aspect ratios are approximate.
  const base = sharp(raw).resize(item.width, item.height, { fit: "cover" });
  const outPath = path.join(OUT_DIR, item.out);
  await base.clone().webp({ quality: item.quality }).toFile(outPath);
  const { size } = await sharp(outPath).metadata().then(() => import("node:fs/promises").then((fs) => fs.stat(outPath)));
  let report = `${item.out} ${(size / 1024).toFixed(0)}KB`;
  if (item.avif) {
    const avifPath = outPath.replace(/\.webp$/, ".avif");
    await base.clone().avif({ quality: 52 }).toFile(avifPath);
    const { size: asize } = await (await import("node:fs/promises")).stat(avifPath);
    report += ` | avif ${(asize / 1024).toFixed(0)}KB`;
  }
  console.log("DONE", report);
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });
  await mkdir(OUT_DIR, { recursive: true });
  const only = process.argv.slice(2);
  const items = only.length ? MANIFEST.filter((m) => only.includes(m.id)) : MANIFEST;
  // Concurrency 4 — polite to the API, still fast for 16 items.
  const queue = [...items];
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        const raw = await generate(item);
        await finish(item, raw);
      } catch (e) {
        console.error("FAIL", item.id, e.message);
      }
    }
  });
  await Promise.all(workers);
}

main();
