// One-off: Google profile icon candidates for the front-office Workspace
// account. Brand palette (charcoal/ivory/bronze), drawn-simply line art in
// the site's diagram language. Each is exported as a 1024px square PNG;
// Google crops to a circle, so everything important stays well inside it.
import { chromium } from "playwright-core";
import { readFileSync } from "fs";

const OUT = "/Users/gunjanmodi/Documents/PlanoDerm Website/_profile-icons/";
const CHARCOAL = "#1C242C", IVORY = "#F7F4EF", BRONZE = "#A6803E", CHAMPAGNE = "#C9A96A";

const FONT = `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=block" rel="stylesheet">`;

// Each candidate is a 512x512 SVG inside a square tile.
const candidates = {
  // A — SC monogram, matching the new favicon
  "icon-sc-monogram": `
    <svg width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="${CHARCOAL}"/>
      <text x="256" y="300" text-anchor="middle" fill="${IVORY}"
        style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:240px;letter-spacing:0.02em">SC</text>
      <rect x="146" y="352" width="220" height="10" fill="${BRONZE}"/>
    </svg>`,

  // B — microscope line art (the practice's in-house lab identity)
  "icon-microscope": `
    <svg width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="${CHARCOAL}"/>
      <g fill="none" stroke="${CHAMPAGNE}" stroke-width="14" stroke-linecap="round">
        <path d="M236,120 L306,190" />
        <path d="M252,104 L290,142" transform="rotate(0)" />
        <path d="M306,190 L280,262" />
        <ellipse cx="268" cy="292" rx="30" ry="18" transform="rotate(-40 268 292)"/>
        <path d="M226,318 C180,300 156,258 166,214" />
        <path d="M150,390 L362,390" />
        <path d="M208,390 C208,354 236,336 262,336 C300,336 322,362 322,390" />
      </g>
    </svg>`,

  // C — scalpel line art, tilted, minimal
  "icon-scalpel": `
    <svg width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="${CHARCOAL}"/>
      <g fill="none" stroke="${CHAMPAGNE}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
        <path d="M150,362 L296,216" />
        <path d="M296,216 L354,158 C376,136 376,136 366,170 L344,236 L296,216 Z" fill="${CHAMPAGNE}"/>
        <path d="M168,344 L196,372" />
      </g>
    </svg>`,

  // D — suture stitch across a fine line (quiet, surgical)
  "icon-suture": `
    <svg width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="${CHARCOAL}"/>
      <path d="M110,256 L402,256" stroke="${IVORY}" stroke-width="8" stroke-linecap="round"/>
      <g fill="none" stroke="${BRONZE}" stroke-width="12" stroke-linecap="round">
        <path d="M170,206 C196,236 196,276 170,306" />
        <path d="M256,206 C282,236 282,276 256,306" />
        <path d="M342,206 C368,236 368,276 342,306" />
      </g>
    </svg>`,
};

const b = await chromium.launch({
  executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium`,
});

for (const [name, svg] of Object.entries(candidates)) {
  const p = await b.newPage({ viewport: { width: 560, height: 560 }, deviceScaleFactor: 2 });
  await p.setContent(`${FONT}<div id="t" style="display:inline-block">${svg}</div>`);
  await p.waitForTimeout(1200);
  await p.locator("#t").screenshot({ path: OUT + name + ".png" });
  await p.close();
}

// Photo candidates: center-crop to square at 1024.
const sharp = (await import("sharp")).default;
const photos = [
  ["/Users/gunjanmodi/Documents/PlanoDerm Website/_google-business-photos/building-exterior-golden-hour.jpg", "photo-building"],
  ["/Users/gunjanmodi/Documents/PlanoDerm Website/_google-business-photos/team-three-surgeons.jpg", "photo-team"],
];
for (const [src, name] of photos) {
  const img = sharp(src);
  const m = await img.metadata();
  const side = Math.min(m.width, m.height);
  await img
    .extract({ left: Math.round((m.width - side) / 2), top: Math.round((m.height - side) * 0.25), width: side, height: side })
    .resize(1024, 1024)
    .png()
    .toFile(OUT + name + ".png");
}

// Comparison sheet: big circle + gmail-size circle for each.
const rows = [
  ["A — SC monogram (matches your new favicon)", "icon-sc-monogram"],
  ["B — the microscope (your in-house lab)", "icon-microscope"],
  ["C — the scalpel", "icon-scalpel"],
  ["D — the suture line", "icon-suture"],
  ["E — the building, golden hour", "photo-building"],
  ["F — the three surgeons", "photo-team"],
].map(([label, f]) => {
  const d = "data:image/png;base64," + readFileSync(OUT + f + ".png").toString("base64");
  return `<div style="margin-bottom:30px">
    <div style="font:600 14px Arial;color:#444;margin-bottom:10px">${label}</div>
    <div style="display:flex;align-items:center;gap:30px">
      <img src="${d}" style="width:140px;height:140px;border-radius:50%;object-fit:cover">
      <img src="${d}" style="width:40px;height:40px;border-radius:50%;object-fit:cover">
      <span style="font:400 13px Arial;color:#888">&larr; how it looks in Gmail / Google Maps</span>
    </div>
  </div>`;
}).join("");

const p2 = await b.newPage({ viewport: { width: 640, height: 1240 }, deviceScaleFactor: 2 });
await p2.setContent(`<body style="background:#fff;padding:30px;margin:0">
  <div style="font:700 16px Arial;color:#222;margin-bottom:24px">Google profile icon candidates — front office account</div>${rows}</body>`);
await p2.waitForTimeout(600);
await p2.screenshot({ path: OUT + "comparison.png", fullPage: true });
await b.close();
console.log("done");
