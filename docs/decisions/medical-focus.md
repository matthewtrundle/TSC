# Medical Focus — Claims Ledger

The strict ledger of medical claims. Two sections, no middle ground: a claim
is either **CONFIRMED** (publishable) or **UNCONFIRMED** (never renders).
Nothing moves up without Dr. Modi's (or another physician-user's) explicit
say-so. See [[practice-decisions]] for the no-fabricated-content rule and the
`planoderm-site` skill for how these claims may be phrased.

## CONFIRMED (publishable)

### 2026-08-01 — Same-day melanoma Mohs with MART-1 + SOX10
- **Decision:** The practice performs Mohs surgery for melanoma with
  immunohistochemical staining using MART-1 and SOX10, all on the same day:
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
- **Status:** Superseded — see 2026-08-03 entry below (94%-recurrent removed
  from site; stage count corrected to one-to-two)
- **Source:** planoderm-site SKILL.md (verified-claims list)

### 2026-08-03 — Stage count and response-time claims (Dr. Modi confirmed in chat)
- **Decision:** "Most tumors clear in **one to two stages**" is the confirmed
  sitewide wording (not one-to-three). Response-time promises are confirmed
  publishable: referred patients "**seen within days of referral**" and online
  requests get a "**call within one business day**". The 94%-recurrent cure
  figure stays off the site (removed earlier at Dr. Modi's direction); the
  99%-previously-untreated figure stands. Skill ledger updated to match.
- **Status:** Confirmed
- **Source:** Dr. Modi, chat, 2026-08-03 ("one to two stages, yes seen within
  days of referral, call within one business day")
- **Links:** [[practice-decisions]]

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

### 2026-08-02 — Skin resurfacing service CONFIRMED (publishable)
- **Decision:** The practice offers skin resurfacing: fractional CO2 laser and
  medium-to-deep chemical peels with Jessner's solution and TCA, used for
  photodamaged skin, field treatment of actinic keratoses/precancers, and
  aesthetic rejuvenation. Performed/framed under Dr. Modi.
- **Status:** Confirmed — no percentages, downtime, or session counts are
  published (unconfirmed; add only if Dr. Modi supplies them).
- **Source:** chat 2026-08-02

### 2026-08-02 — Surgery-day timeline refinements (Dr. Modi confirmed)
- 7:30 AM typical check-in (not a fixed window); most tumors clear in one to
  two stages (practice experience); "Same morning: repair or reconstruction,
  then home"; patients usually do NOT need a driver. FAQ updated to match.

### 2026-08-03 — Stain correction: SOX10, not S-100
- **Decision:** The melanoma Mohs immunostain panel is MART-1 and SOX10.
  Dr. Modi corrected the earlier statement — S-100 is NOT used. All site
  copy, ledger entries, and the skill were swept.
- **Status:** Confirmed (supersedes the S-100 references above)
- **Source:** chat 2026-08-03
