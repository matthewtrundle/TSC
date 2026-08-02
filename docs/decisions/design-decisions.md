# Design Decisions

Design-system history, including reversals. Entry format: see [[INDEX]].

> **Binding authority:** the `planoderm-site` skill
> (`.claude/skills/planoderm-site/` in the project root, one level above TSC/)
> plus `src/app/globals.css`. This file records the decisions and their
> history; the skill is what agents must load before doing site work.

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
