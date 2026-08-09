// Horizontal-overflow sweep: loads every route at common device widths and
// reports (a) page-level horizontal scroll and (b) any visible link/button
// that pokes past the viewport edge (fixed headers clip silently, so page
// scroll width alone misses cropped nav items — the iPad landscape bug).
// Usage: node scripts/overflow-scan.mjs   (expects prod server on :3111)
import { chromium } from "playwright-core";

const ROUTES = [
  "/", "/practice", "/services", "/team", "/referring", "/contact",
  "/appointment", "/privacy", "/accessibility",
  "/services/melanoma", "/services/basal-cell-carcinoma",
  "/services/squamous-cell-carcinoma", "/services/actinic-keratosis",
  "/services/cyst-removal", "/services/lipoma-removal", "/services/mole-removal",
  "/services/keloid-scar-revision", "/services/benign-lesion-removal",
  "/services/nail-procedures", "/services/eyelid-biopsies", "/services/lip-oral-biopsies", "/services/earlobe-repair", "/areas-we-serve",
  "/services/pilonidal-cyst-surgery", "/services/sebaceous-carcinoma", "/services/dermatofibrosarcoma-protuberans", "/services/atypical-fibroxanthoma", "/services/microcystic-adnexal-carcinoma", "/services/extramammary-paget-disease", "/services/prp-hair-restoration", "/services/skin-resurfacing",
];

// iPhone SE .. small Android .. iPhones .. iPad mini/portrait .. iPad Air/Pro
// portrait .. iPad landscape variants .. laptop breakpoints.
const WIDTHS = [320, 360, 390, 414, 744, 768, 820, 834, 1024, 1112, 1180, 1194, 1280, 1366, 1440];

const browser = await chromium.launch({
  executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium`,
});
const page = await browser.newPage();

let failures = 0;
for (const width of WIDTHS) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ROUTES) {
    await page.goto(`http://localhost:3111${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(350);
    const problems = await page.evaluate(() => {
      const out = [];
      const doc = document.documentElement;
      if (doc.scrollWidth > doc.clientWidth + 1) {
        out.push(`PAGE overflows: scrollWidth ${doc.scrollWidth} > viewport ${doc.clientWidth}`);
      }
      // Interactive elements must sit fully inside the viewport horizontally
      // unless an ancestor with overflow hidden/auto/scroll clips or scrolls them.
      const clippedByAncestor = (el) => {
        for (let a = el.parentElement; a; a = a.parentElement) {
          const o = getComputedStyle(a).overflowX;
          if (o === "hidden" || o === "auto" || o === "scroll" || o === "clip") return true;
        }
        return false;
      };
      for (const el of document.querySelectorAll("a, button, input, select, textarea")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const style = getComputedStyle(el);
        if (style.visibility === "hidden" || style.display === "none") continue;
        if (r.right > window.innerWidth + 1 || r.left < -1) {
          if (clippedByAncestor(el)) continue;
          const label = (el.textContent || el.getAttribute("aria-label") || el.name || "").trim().slice(0, 40);
          out.push(`CROPPED <${el.tagName.toLowerCase()}> "${label}" left=${Math.round(r.left)} right=${Math.round(r.right)} viewport=${window.innerWidth}`);
        }
      }
      return [...new Set(out)];
    });
    if (problems.length) {
      failures++;
      console.log(`FAIL ${width}px ${route}`);
      for (const p of problems) console.log(`   ${p}`);
    }
  }
  console.log(`done ${width}px`);
}
await browser.close();
console.log(failures === 0 ? "\nALL WIDTHS x ROUTES CLEAN" : `\n${failures} route/width failures`);
