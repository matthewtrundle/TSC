#!/usr/bin/env node
/**
 * One-shot cleanup pass on a generated group-photo base: empty the hands,
 * remove leftover holiday/red-garment remnants. Composition and faces must
 * not move (faces get re-restored from the original afterward anyway).
 * Usage: node scripts/cleanup-base.mjs <in-image> <out-image>
 */
import "./lib/env.mjs";
import { readFile, writeFile } from "node:fs/promises";

const [, , IN, OUTP] = process.argv;
const KEY = process.env.OPENROUTER_API_KEY;

const PROMPT =
  "Edit this group photo minimally. Keep every person exactly in place — same " +
  "faces, poses, count, clothing, background. ONLY: remove every small object " +
  "held in anyone's hands (candy canes, candy hearts, props) so all hands are " +
  "empty and relaxed; and remove any leftover red garment fragments or " +
  "holiday-colored remnants anywhere in the frame, replacing them with the " +
  "same charcoal scrubs fabric. Change nothing else. Photorealistic.";

const b64src = (await readFile(IN)).toString("base64");
for (let attempt = 1; attempt <= 3; attempt++) {
  let data;
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image",
        modalities: ["image", "text"],
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${b64src}` } },
            ],
          },
        ],
      }),
    });
    data = await res.json();
  } catch (e) {
    console.error(`attempt ${attempt} transport error:`, e.message);
    continue;
  }
  const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (url) {
    await writeFile(OUTP, Buffer.from(url.slice(url.indexOf(",") + 1), "base64"));
    console.log("DONE", OUTP);
    process.exit(0);
  }
  console.error(`attempt ${attempt}:`, JSON.stringify(data).slice(0, 200));
}
console.error("FAIL");
process.exit(1);
