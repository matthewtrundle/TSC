# Focus Areas

Current priorities and open threads. Entry format: see [[INDEX]].

## Active

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
  (Dr. Modi asked; rule confirmed in chat). NEXT: Dr. Modi to label each
  photo (stain + tumor) — captions are clinical claims, never guessed —
  then design placement on the /services immunostaining bands + melanoma
  page via preview.
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
