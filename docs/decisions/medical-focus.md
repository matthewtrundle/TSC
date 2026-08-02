# Medical Focus — Claims Ledger

The strict ledger of medical claims. Two sections, no middle ground: a claim
is either **CONFIRMED** (publishable) or **UNCONFIRMED** (never renders).
Nothing moves up without Dr. Modi's (or another physician-user's) explicit
say-so. See [[practice-decisions]] for the no-fabricated-content rule and the
`planoderm-site` skill for how these claims may be phrased.

## CONFIRMED (publishable)

### 2026-08-01 — Same-day melanoma Mohs with MART-1 + S-100
- **Decision:** The practice performs Mohs surgery for melanoma with
  immunohistochemical staining using MART-1 and S-100, all on the same day:
  cancer removed, margins tested with IHC staining, and once margins are clear
  the patient is reconstructed — same day.
- **Contrast to draw:** historical wide local excision, and staged excision
  ("slow Mohs") which runs over 1–3 days. Dr. Modi's words: staged excision
  "is not even real Mohs" — phrase professionally on-site, factually, not
  derogatorily.
- **Status:** Confirmed — Dr. Modi, chat 2026-08-01 ("take that to the bank").
  This partially supersedes the immunostaining PLACEHOLDER in siteData.ts:
  the melanoma panel is publishable; the high-risk panel below is not.
- **Links:** [[definitions]] [[focus-areas]]

### 2026-08-01 — Cure-rate and procedure-shape claims
- **Decision:** Publishable numbers: cure rates "up to 99% for previously
  untreated / 94% for recurrent" skin cancers (ACMS/SCF figures — never the
  legacy "50–70%" comparator); "most tumors clear in one to three stages";
  "about an hour per stage".
- **Status:** Confirmed
- **Source:** planoderm-site SKILL.md (verified-claims list)

## UNCONFIRMED (never render)

These stay behind the `PLACEHOLDER` filter until a physician confirms them:

- **High-risk (non-melanoma) tumor/stain panel** — which stains, which tumors.
- **Pilonidal disease recovery details** — timelines, restrictions, protocol.
- **PRP, nail biopsy, eyelid biopsy clinical specifics** — offerings are
  confirmed and listed; anesthesia/recovery/protocol details are not.

## The rule

Facts come ONLY from `TSC/src/lib/data/siteData.ts` or explicit confirmation
by Dr. Modi (or another physician of the practice) in chat. Never invent
stats, testimonials, staff, response times, or clinical details. Feature lines
containing `PLACEHOLDER` must never render. When a physician confirms a claim
in chat, record it here with the date, then update siteData.
