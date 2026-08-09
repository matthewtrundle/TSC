// One-off export: the header's wide logo lockup as high-res PNGs for use
// outside the site (Workspace email signature etc.). Mirrors Logo.tsx
// layout="wide" with the CSS variables resolved to their literal values.
import { chromium } from "playwright-core";

const b = await chromium.launch({
  executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium`,
});

const svg = (ink, accent, subInk) => `
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Libre+Franklin:wght@600&display=block" rel="stylesheet">
<div id="wrap" style="display:inline-block;padding:20px">
<svg width="520" height="104" viewBox="0 0 520 104">
  <text x="260" y="46" text-anchor="middle" fill="${ink}" style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:46px;letter-spacing:0.04em">THE SURGERY CENTER</text>
  <rect x="140" y="62" width="240" height="2.5" fill="${accent}" />
  <text x="260" y="92" text-anchor="middle" fill="${subInk}" style="font-family:'Libre Franklin',sans-serif;font-weight:600;font-size:16.5px;letter-spacing:0.34em">PLANO DERMATOLOGY</text>
</svg></div>`;

const out = "/Users/gunjanmodi/Documents/PlanoDerm Website/_logo-exports/";
const variants = [
  ["logo-wide-transparent.png", svg("#1C242C", "#A6803E", "#7A5C26"), true],
  ["logo-wide-ivory.png", `<body style="background:#F7F4EF;margin:0">${svg("#1C242C", "#A6803E", "#7A5C26")}</body>`, false],
  ["logo-wide-white.png", `<body style="background:#ffffff;margin:0">${svg("#1C242C", "#A6803E", "#7A5C26")}</body>`, false],
  ["logo-wide-dark.png", `<body style="background:#1C242C;margin:0">${svg("#F7F4EF", "#C9A96A", "#C9A96A")}</body>`, false],
];

for (const [name, html, transparent] of variants) {
  const p = await b.newPage({ viewport: { width: 600, height: 180 }, deviceScaleFactor: 5 });
  await p.setContent(html);
  await p.waitForTimeout(1500);
  await p.locator("#wrap").screenshot({ path: out + name, omitBackground: transparent });
  await p.close();
}
await b.close();
console.log("exported");
