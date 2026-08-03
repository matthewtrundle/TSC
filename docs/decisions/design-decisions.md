# Design Decisions

Design-system history, including reversals. Entry format: see [[INDEX]].

> **Binding authority:** the `planoderm-site` skill
> (`.claude/skills/planoderm-site/` in the project root, one level above TSC/)
> plus `src/app/globals.css`. This file records the decisions and their
> history; the skill is what agents must load before doing site work.

## Staff group photo

### 2026-08-02 — Hybrid face-faithful composite pipeline for group photos
- **Decision:** Staff group images are produced by a hybrid pipeline: an AI
  pass transforms wardrobe/background once, then every person's REAL face
  pixels from the original photograph are composited back (template-matched
  alignment, capped Lab color transfer, feathered ellipse masks) via
  `TSC/scripts/face_restore_composite.py`. Whole-image AI generation of
  20-person groups was rejected — faces drift unusably. Small artifacts are
  fixed with face-protected CV inpainting, never global masks (a global red
  mask erased lips once — see script comments).
- **Rationale:** Real staff are identifiable employees; only real pixels
  guarantee likeness. Client explicitly rejected two rounds of whole-image
  attempts.
- **Status:** Confirmed. Candidate `team-navy-FINAL.png` (navy scrubs,
  de-Christmassed office) + per-face QA sheet awaiting client sign-off; staff
  consent for publication is the client's to obtain.
- **Source:** chat 2026-08-02
- **Links:** [[practice-decisions]]

## Logos & badges

### 2026-08-02 — Hi-res credential assets; official-art-only policy holds
- **Decision:** Society logos and D Magazine badges are served at high
  resolution from official artwork only: ABD uses the board's round seal
  extracted from ABD's own 2023 annual-report PDF (1700px, charcoal-tinted
  from its white-on-alpha original, `societies/abd-seal.png`); ACMS remains
  the site-served 375px lockup upscaled 5x from its alpha mask; ASDS at full
  native 1176px; AAD stays vector SVG. D badges 2017 and 2019–2025 are
  D Magazine's own files (`public/images/awards/`, the 2017/2025 vector PDFs
  rasterized at 1600px); 2026 is a 5x upscale of the only official file
  (211px) — re-check D's CDN later in 2026 for a vector.
- **Rationale:** Pinch-zoom sharpness without fabricating any organization's
  artwork; a user-supplied redrawn ABD seal was declined because its layout
  and motto text differ from the genuine seal.
- **Status:** Confirmed. Open gaps: no official badge files exist publicly
  for 2015/2016/2018 (typeset year chips only); ACMS has no press kit —
  email info@mohscollege.org for vector art.
- **Source:** chat 2026-08-02 / hires-logos agent hunt
- **Links:** [[practice-decisions]] [[INDEX]]

## Portraits

### 2026-08-02 — Warm office-bokeh portrait set is live
- **Decision:** Doctor portraits use the warm office-bokeh set
  (`public/images/dr-*-warm.webp`), picked by Dr. Modi.
- **Rationale:** Dr. Modi preferred the warmer look over the dark charcoal
  editorial set after visual review.
- **Status:** Confirmed
- **Source:** commit e68f3b6 (2026-08-02)
- **Links:** supersedes the editorial set below

### 2026-08-01 — Editorial portrait set
- **Decision:** Portraits regenerated as `dr-*-editorial.webp` (dark charcoal
  editorial style) from real photos via google/gemini-3-pro-image.
- **Status:** Reversed → warm office-bokeh set above (editorial and earlier
  gray-studio `dr-*.webp` sets kept in the repo as rollback)
- **Source:** chat 2026-08-01
- **Links:** [[focus-areas#operational]]

### 2026-08-01 — Likeness rules (permanent, apply to ALL photo work)
- **Decision:** Photo edits of the doctors must preserve likeness exactly:
  Dr. Modi wears NO glasses; Dr. Parry's readers hang on his collar, not his
  face; Dr. Wells keeps his frames. Originals preserved in `_original-photos/`
  at the project root.
- **Rationale:** These are real physicians — the user and his partners; a wrong
  likeness is a misrepresentation of real people.
- **Status:** Confirmed
- **Source:** chat 2026-08-01
- **Links:** [[practice-decisions]]

## Design system

### 2026-08-01 — LUXURY system (current)
- **Decision:** Ivory `#F7F4EF` page, charcoal `#1C242C` ink/dark bands,
  champagne bronze `#A6803E` decorative-only (two-tier: `#7A5C26` for body-size
  text on light, `#C9A96A` on dark — bronze fails AA at body size). Type:
  Cormorant Garamond display at ≥32px only, Source Serif 4 mid, Libre Franklin
  body at 18px. Legacy CSS var names (`--navy-primary`, `--teal-accent`,
  `--cream`) are REMAPPED to these values in globals.css — use the vars, never
  reintroduce navy/teal literals.
- **Rationale:** Modeled on nayakplasticsurgery.com and
  advancedfacialplastic.com after the user rejected two prior directions;
  reads luxury-institutional rather than AI-template.
- **Status:** Confirmed
- **Source:** plan zesty-munching-seahorse; commit e71d947
- **Links:** [[practice-decisions]] [[definitions#luxury-system]]

### 2026-08-01 — Layout rules
- **Decision:** Left-aligned asymmetric grids; hairlines and whitespace, never
  drop shadows; radius ≤4px; max ONE dark band per page plus the closing
  LuxuryCta; tracked caps for short labels only; no gradients, no icon-tile
  grids, no centered stacks. Page roots use `pt-28`; anchored sections
  `scroll-mt-32`.
- **Status:** Confirmed
- **Source:** planoderm-site SKILL.md
- **Links:** [[definitions]]

### 2026-08-01 — Component set
- **Decision:** Build with the existing components — `HeroMedia` (video-ready,
  Ken Burns stills for now, filmic grain), `PortraitCard` (duotone),
  `CredentialBar`, `LuxuryCta` (closes almost every page), `ServiceAccordion`,
  `MohsDiagram` (animated line-art, home dark band), `CountUpStat`, `FadeIn`
  (reveal-on-scroll with 2.5s never-blank failsafe), sticky `MobileCallBar`,
  inline-SVG logo `ui/Logo.tsx` (Cormorant TSC monogram with bronze incision
  lines; old PNG kept as rollback), two-row header (utility bar collapses on
  scroll).
- **Status:** Confirmed
- **Source:** "full send" pass, chat 2026-08-01
- **Links:** [[definitions]]

### 2026-08-01 — Accessibility floor
- **Decision:** 18px body / 16px minimum, AA contrast everywhere (two-tier
  bronze), 44px touch targets, `prefers-reduced-motion` respected (global
  kill-switch), content never depends on JS/observers to become visible.
- **Rationale:** Audience skews 55+; oncology patients on any device must be
  able to read and call.
- **Status:** Confirmed
- **Source:** planoderm-site SKILL.md; derm-web-research.md
- **Links:** [[practice-decisions]]

## Reversed systems (why not X)

### 2026-08-01 — Restrained editorial navy
- **Decision:** A restrained editorial style on navy `#0C2D48`.
- **Status:** Reversed → LUXURY system. User verdict: "too basic."
- **Source:** chat 2026-08-01; plan files of that day

### ~2025-12 — Bloom-derived navy/teal glassmorphism (original build)
- **Decision:** Navy `#1e3a5f` / teal `#4a9b9b` / cream palette, glass panels,
  organic blob shapes, badge pills.
- **Status:** Reversed → LUXURY system. Read as AI-template; also carried
  fabricated content that had to be stripped (see [[practice-decisions]]).
  Never reintroduce these patterns; the old CLAUDE.md documenting them was
  rewritten 2026-08-02.
- **Links:** [[medical-focus]]

### 2026-08-02 — New master logo adopted (riff-b1)
- **Decision:** The master logo is the stacked lockup: "THE SURGERY CENTER"
  in Cormorant Garamond 600, bronze rule, "PLANO DERMATOLOGY" in tracked
  Libre Franklin caps — implemented as live-text SVG in `ui/Logo.tsx` with
  light/dark variants (header/footer), brand hexes only. App icon updated to
  a matching SC monogram; OG card text updated. viewBox is 344 wide — 300
  clipped Cormorant's T/Y (client caught it).
- **Rationale:** Client selected concept riff-b1 from the _logo-concepts-v2
  album after two exploration rounds; emphasis intentionally on "The Surgery
  Center" with Plano Dermatology as anchor line.
- **Status:** Confirmed. Prior TSC incision-line mark archived in
  `_logo-concepts-v2/OLD-MASTER-*` (asset + component) for future revisit.
- **Source:** chat 2026-08-02
