# Focus Areas

Current priorities and open threads. Entry format: see [[INDEX]].

## Active

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

- **High-risk (non-melanoma) tumor/stain panel** — offering areas exist in
  `siteData.ts` as `PLACEHOLDER` lines; awaiting Dr. Modi's confirmation.
- **Pilonidal disease recovery details** — offering confirmed; recovery
  specifics unconfirmed.
- **PRP, nail biopsy, eyelid biopsy clinical specifics** — offerings confirmed
  by Dr. Modi; clinical details (anesthesia, recovery, protocols) not.

## Deferred

- **Real hero video clips** — `HeroMedia` is video-ready; currently runs Ken
  Burns stills. Waiting on real footage.
- **Deployment status** — Vercel deployment was referenced in the old (stale)
  CLAUDE.md but has not been verified. Treat as unknown until checked.

## Operational

- **OpenRouter API key** — the key used for the 2026-08-01 image generation was
  a temporary one supplied in chat. Ask Dr. Modi for a fresh key before any
  image regeneration (`TSC/scripts/generate-images.mjs`); never commit keys.
