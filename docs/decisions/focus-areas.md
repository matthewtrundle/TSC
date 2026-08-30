# Focus Areas

Current priorities and open threads. Entry format: see [[INDEX]].

## Active

### 2026-08-30 — /learn section built and APPROVED to publish
- **Decision:** The /learn patient-education section (index + Neosporin
  article, footer + service-page links, sitemap, generated still-life
  image) was built on branch `learn-education` and held unpublished at
  Dr. Modi's direction; later the same day he approved it ("love it. go
  live") and it was merged to production.
- **Status:** Confirmed — live on planoderm.com
- **Source:** Dr. Modi, chat 2026-08-30; commits 04adf03, 9601308 + merge
- **Links:** [[practice-decisions]] [[medical-focus]]

### 2026-08-21 — Two-model pressure test: findings triaged
- **Decision:** From the 34-page GPT-5.1 + Gemini 3.1 Pro site audit, Dr. Modi
  applied all P1 referrer-risk rewrites (/services "Done properly", /practice
  "highest credential", lip-oral "too far inside") plus two P2s (cyst-removal
  "properly", DFSP "judged by eye leaves" → "may leave"); schema description's
  "World-class" also removed. The REMAINING P2s and P3s (pilonidal absolutes,
  /referring "coordinators of care", PRP phrasing) are deliberately left
  as-is — do not re-pitch. Audit's medical-judgment items (medications
  promise, "safest way" anesthesia) remain open for his call.
- **Rationale:** Referring-doc-safe voice rule applied where risk is real;
  his judgment that the rest is fine.
- **Status:** Confirmed
- **Source:** chat 2026-08-21; commits 92039bb, 258898a, df9a7ad; report
  artifact 0c5ed8ae-97ee-4363-b07f-802765912b68
- **Links:** [[practice-decisions]] [[medical-focus]]

### 2026-08-10 — Site LAUNCHED on planoderm.com (launch day was 2026-08-07)
- **Decision:** planoderm.com serves the redesign from Dr. Modi's own Vercel;
  registrar, DNS, and DNSSEC all live in his Cloudflare account.
- Post-launch, all complete: production form test passed; Search Console
  verified with sitemap accepted (29 pages); Google Business Profile
  optimized by Dr. Modi (photos, services, launch post, booking link);
  listed in the ACMS surgeon finder and AAD directory.
- Remaining launch-related tail: cancel DreamHost hosting ~2026-08-21 after
  two weeks of stability; mid-August SERP + Search Console pull on request.
- **Status:** Confirmed
- **Source:** chat 2026-08-07 through 2026-08-10
- **Links:** [[practice-decisions]]

### 2026-08-02 — Site is live on the LUXURY system
- **Decision:** The LUXURY design system (ivory/charcoal/bronze) is the shipped
  design; all new work builds on it, never around it.
- **Rationale:** Third design iteration, user-approved after two reversals —
  see [[design-decisions]] for the full history.
- **Status:** Confirmed
- **Source:** commit e71d947; plan zesty-munching-seahorse
- **Links:** [[design-decisions]]

### 2026-08-02 — Decision knowledge base established
- **Decision:** All durable decisions get recorded in `docs/decisions/` as they
  are made, dual-written to the memory MCP graph and auto-memory via the
  `decision-log` skill.
- **Rationale:** Dr. Modi runs multiple Claude sessions and wants instant
  context restoration in every new session, in this project and globally.
- **Status:** Confirmed
- **Source:** chat 2026-08-02
- **Links:** [[INDEX]]

## Pending confirmations (blocking content)

These block publishable copy — details in [[medical-focus]]:

**All clear as of 2026-08-10** — every rendered claim is confirmed; see
[[medical-focus]] for the ledger.

- ~~High-risk tumor/stain panel~~ — CONFIRMED 2026-08-10 (AE1/AE3 for
  high-risk SCC and EMPD, capability framing).
- ~~Pilonidal recovery~~ and ~~PRP/nail/eyelid specifics~~ — both CONFIRMED
  2026-08-10 (PRP now carries the PRFM claim).

## Deferred

- **IHC Mohs histology photos** — PHOTOS RECEIVED 2026-08-10 (5 through-scope
  captures). Archived at _original-photos/ihc-histology/ (project root):
  originals/ untouched, cleaned/ = crop + white-balance + contrast ONLY —
  conventional adjustments; generative AI on medical imagery is banned
  (Dr. Modi asked; rule confirmed in chat). LABELED by Dr. Modi 2026-08-10:
  mart1-01..05 are MART-1; sox10-01..02 are SOX10 (from IMG_0224/0225.HEIC).
  All 7 cleaned with one hue-preserving pipeline (crop, softened WB,
  tone-preserving contrast — per-channel stretch turned pale slides green,
  lesson recorded). NEXT: placement design on the /services immunostaining
  bands + melanoma page via preview; caption wording (tumor naming) goes to
  Dr. Modi for approval on the preview.
- **Real hero video clips** — `HeroMedia` is video-ready; currently runs Ken
  Burns stills. Waiting on real footage.
- **Staff photography / team imagery** — Dr. Modi wants better source photos
  of the staff before any AI-assisted team content; team-navy-FINAL.png stays
  parked (2026-08-10).
- **Patient portal URL** — Dr. Modi is waiting on material from Sadio before
  the portal link (currently sadio.com in siteData) can be confirmed
  (2026-08-10).
- ~~Deployment status~~ — resolved: launched 2026-08-07 from Dr. Modi's own
  Vercel; see the Active entry above.

## Operational

- **OpenRouter API key** — the key used for the 2026-08-01 image generation was
  a temporary one supplied in chat. Ask Dr. Modi for a fresh key before any
  image regeneration (`TSC/scripts/generate-images.mjs`); never commit keys.

### 2026-08-13 — SEO expansion brief adopted (from parallel session)
- **Decision:** The 7-task SEO brief (individual surgeon pages, referring-page
  sharpening, pilonidal/melanoma expansion, schema polish) is adopted as the
  active work queue — reconciled plan in [[../plans/2026-08-13-seo-expansion-brief]].
  Tasks 2 and 4 were found already satisfied; surgeon pages build first.
- **Status:** Confirmed
- **Source:** Dr. Modi, chat 2026-08-13 (brief transferred from another session)
