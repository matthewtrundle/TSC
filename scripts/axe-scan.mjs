// WCAG 2.1 AA sweep of every route using axe-core inside real Chromium.
// Usage: node scripts/axe-scan.mjs   (expects the prod server on :3111)
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const AXE_SRC = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");

const ROUTES = [
  "/", "/practice", "/services", "/team", "/referring", "/contact",
  "/appointment", "/privacy", "/accessibility",
  "/services/melanoma", "/services/basal-cell-carcinoma",
  "/services/squamous-cell-carcinoma", "/services/actinic-keratosis",
  "/services/cyst-removal", "/services/lipoma-removal", "/services/mole-removal",
  "/services/keloid-scar-revision", "/services/benign-lesion-removal",
  "/services/nail-procedures", "/services/eyelid-biopsies",
  "/services/prp-hair-restoration", "/services/skin-resurfacing",
];

const browser = await chromium.launch({
  executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium`,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let totalViolations = 0;
for (const route of ROUTES) {
  await page.goto(`http://localhost:3111${route}`, { waitUntil: "networkidle" });
  // Let the FadeIn reveal failsafe fire so hidden-content states don't skew results.
  await page.waitForTimeout(2600);
  await page.evaluate(AXE_SRC);
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
    });
  });
  const v = results.violations;
  if (v.length === 0) {
    console.log(`OK    ${route}`);
  } else {
    totalViolations += v.length;
    console.log(`FAIL  ${route}`);
    for (const item of v) {
      console.log(`  [${item.impact}] ${item.id}: ${item.help} (${item.nodes.length} nodes)`);
      for (const n of item.nodes.slice(0, 3)) {
        console.log(`      ${n.target.join(" ")}`);
      }
    }
  }
}
await browser.close();
console.log(totalViolations === 0 ? "\nALL ROUTES CLEAN" : `\n${totalViolations} violation types found`);
