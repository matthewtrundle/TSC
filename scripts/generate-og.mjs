// Generates public/og-card.png (1200x630) — the site-wide Open Graph card.
// Charcoal ground, bronze rule, serif display line: the same luxury register
// as the site itself. Run: node scripts/generate-og.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "og-card.png");

const WIDTH = 1200;
const HEIGHT = 630;

// Palette — mirrors globals.css.
const CHARCOAL = "#1C242C";
const BRONZE = "#A6803E";
const CHAMPAGNE = "#C9A96A";
const IVORY = "#F7F4EF";

// Left-aligned text block, generous margins.
const MARGIN_X = 110;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${CHARCOAL}"/>

  <!-- Bronze rule above the display line -->
  <rect x="${MARGIN_X}" y="176" width="72" height="2" fill="${BRONZE}"/>

  <!-- Display line -->
  <text x="${MARGIN_X}" y="288" font-family="Georgia, serif" font-size="84" fill="${IVORY}">THE SURGERY CENTER</text>

  <!-- Tracked small-caps secondary line -->
  <text x="${MARGIN_X + 4}" y="352" font-family="Georgia, serif" font-size="30" letter-spacing="7" fill="${IVORY}" opacity="0.85">AT PLANO DERMATOLOGY</text>

  <!-- Champagne descriptor -->
  <text x="${MARGIN_X + 4}" y="452" font-family="Georgia, serif" font-size="30" fill="${CHAMPAGNE}">Fellowship-Trained Mohs Surgery &#183; Plano, Texas</text>

  <!-- Phone -->
  <text x="${MARGIN_X + 4}" y="520" font-family="Georgia, serif" font-size="28" fill="${IVORY}" opacity="0.9">(972) 378-0620</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(outPath);

const { size } = fs.statSync(outPath);
console.log(`Wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
if (size < 20 * 1024) {
  console.warn("Warning: output smaller than expected (<20KB) — check the render.");
}
