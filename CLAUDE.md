# TSC — The Surgery Center at Plano Dermatology

Next.js (App Router) + TypeScript + Tailwind site for a real Mohs surgery
practice in Plano, TX. The client is Dr. Gunjan Modi, one of the practice's
three Mohs surgeons. Content is real medical information — accuracy is
non-negotiable.

## Authorities (load before working)

- **Design system, content-integrity rules, verified clinical claims:**
  the `planoderm-site` skill at `../.claude/skills/planoderm-site/`
  (project root, one level above this repo) — BINDING for all page, style,
  image, and copy work, including subagent work.
- **Decision history, glossary, medical-claims ledger:**
  `docs/decisions/INDEX.md` — read it when starting substantive work.

Current design: the LUXURY system — ivory/charcoal/bronze, Cormorant +
Source Serif 4 + Libre Franklin. `src/app/globals.css` is the styling source
of truth. Never reintroduce the old navy/teal/glassmorphism patterns; their
reversal is recorded in `docs/decisions/design-decisions.md`.

## Commands

```bash
npm run dev        # dev server — site runs on port 3111
npx tsc --noEmit   # typecheck FIRST
npm run build      # then production build
```

## Content rules

- All content facts live in `src/lib/data/siteData.ts`; feature lines
  containing `PLACEHOLDER` must never render (filter via the
  `publishableFeatures` pattern — see `src/app/services/page.tsx`).
- Confirmed vs unconfirmed medical claims: `docs/decisions/medical-focus.md`.
  Never promote a claim to confirmed without Dr. Modi's explicit say-so.

## Recording decisions

When Dr. Modi makes, confirms, or reverses a decision, follow the
`decision-log` personal skill: append to `docs/decisions/`, cross-link with
`[[wiki-links]]`, and mirror to the `memory` MCP graph. The markdown KB is
the source of truth.
