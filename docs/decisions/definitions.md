# Definitions

Glossary of clinical and project-specific terms. Clinical definitions here are
for internal orientation — publishable clinical claims live only in
[[medical-focus]].

## Clinical terms

- **Mohs micrographic surgery** — Skin-cancer surgery in which the surgeon
  removes the tumor in thin stages and examines 100% of the margin under the
  microscope the same day, taking more tissue only where cancer remains.
  The practice's core service.
- **MART-1** — An immunohistochemical stain that highlights melanocytes; used
  to read melanoma margins. Part of the confirmed same-day melanoma Mohs
  workflow ([[medical-focus#confirmed-publishable]]).
- **S-100** — An immunohistochemical stain marking melanocytic (and neural)
  cells; used alongside MART-1 for melanoma margin assessment.
- **Immunohistochemistry (IHC)** — Antibody-based tissue staining that makes
  specific cell types visible under the microscope.
- **Staged excision ("slow Mohs")** — Melanoma excision done over 1–3 days
  with margins read between visits. Dr. Modi's contrast point to true same-day
  Mohs — phrase the comparison professionally on-site
  ([[medical-focus#confirmed-publishable]]).
- **Wide local excision** — The historical approach for melanoma: excise with a
  set margin, close, and wait days for pathology.
- **Bascom cleft lift** — A pilonidal disease operation. The offering is
  mentioned on-site; recovery specifics remain unconfirmed
  ([[medical-focus#unconfirmed-never-render]]).

## Project terms

- **`siteData.ts`** — `TSC/src/lib/data/siteData.ts`; the single source of
  content facts. If a fact isn't here or explicitly confirmed by Dr. Modi, it
  doesn't render.
- **`PLACEHOLDER` convention** — Feature lines in siteData containing
  `PLACEHOLDER —` are unconfirmed and must never render; filter with the
  `publishableFeatures` pattern (see `TSC/src/app/services/page.tsx`).
- **LUXURY system** <a id="luxury-system"></a> — The current design system:
  ivory/charcoal/bronze, Cormorant + Source Serif 4 + Libre Franklin. Full
  spec in the `planoderm-site` skill; history in [[design-decisions]].
- **Duotone** — The B&W-plus-bronze photo treatment (`.duotone-frame` +
  `.img-duotone`) used on portrait cards and the contact map.
- **Ken Burns** — Slow pan/zoom on hero stills (`.kenburns-*`); stands in
  until real video clips exist ([[focus-areas#deferred]]).
- **Decision KB** — This directory. Source of truth for decisions, mirrored to
  the memory MCP graph and auto-memory ([[INDEX]]).
