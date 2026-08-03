# Practice Decisions

Business- and practice-level decisions. Entry format: see [[INDEX]].

## The practice

The Surgery Center at Plano Dermatology (Plano, TX) — three fellowship-trained
Mohs surgeons: **Dr. Gunjan Modi** (the client/user), **Dr. Michael Wells**,
**Dr. Edward Parry**.

### 2026-08-01 — Positioning: destination Mohs practice
- **Decision:** The site positions the practice as a destination for Mohs
  surgery; register is luxury-institutional (think private bank) — never spa,
  never startup.
- **Rationale:** Patients skew 55+ and usually arrive with a new skin-cancer
  diagnosis; the site must read as established, calm, and authoritative.
- **Status:** Confirmed
- **Source:** planoderm-site SKILL.md; derm-web-research.md
- **Links:** [[design-decisions]]

### 2026-08-01 — D Magazine awards attribution
- **Decision:** D Magazine "Best Doctors" recognition belongs to Dr. Modi
  personally, not the practice. Only the official badge
  `public/images/d-best-2026.jpg` may be displayed; other years are typeset as
  text, never fabricated as badge images.
- **Rationale:** Accuracy of professional recognition is a credibility and
  liability matter.
- **Status:** Confirmed
- **Source:** chat 2026-08-01; planoderm-site SKILL.md
- **Links:** [[medical-focus]]

### 2026-08-01 — No fabricated social proof
- **Decision:** No testimonials, patient quotes, star ratings, team counts, or
  staff photos unless Dr. Modi supplies real ones.
- **Rationale:** Earlier iterations contained invented content ("5-Star Patient
  Care", "20+ Team Members", fake quotes, an AI group photo) that had to be
  stripped; this is a real medical practice treating cancer patients.
- **Status:** Confirmed
- **Source:** auto-memory feedback note; chat 2026-08-01
- **Links:** [[medical-focus]]

### 2026-08-01 — Physician-referral audience
- **Decision:** The site serves referring physicians as a distinct audience via
  the `/referring` page.
- **Rationale:** Mohs practices receive much of their volume by referral;
  referring providers need a fast, factual page.
- **Status:** Confirmed
- **Source:** "full send" pass, chat 2026-08-01
- **Links:** [[focus-areas]]

### 2026-08-01 — Voice
- **Decision:** Short declarative sentences that say what happens and when
  ("You will know the cancer is out before you leave"). Banned words:
  "World-Class", "state-of-the-art", "Compassionate Care", "Excellence", and
  hype of any kind.
- **Rationale:** Hype reads as AI-template marketing and undermines trust with
  an audience deciding where to have cancer surgery.
- **Status:** Confirmed
- **Source:** planoderm-site SKILL.md
- **Links:** [[design-decisions]] [[definitions]]

### 2026-08-02 — Facts confirmed by Dr. Modi in chat (batch)
- **Decision:** (1) Combined experience is 68 years (Modi 12, Wells 16,
  Parry ~40); displayed as "65+ years" so the plus stays literally true.
  (2) The practice is described as "physician-owned and operated" (hero line,
  footer, practice intro). (3) office@planoderm.com is surfaced in the header
  utility bar, footer, and contact page. (4) Dr. Modi's D Magazine recognition
  displays as the range 2015–2026 for both awards, per his direct confirmation;
  badge gallery shows D's own files 2019–2026. (5) Dr. Wells is Assistant
  Editor of JAAD ("the Blue Journal"); shown with an ILLUSTRATIVE stylized
  blue-journal cover (awards/jaad-blue-journal.webp), not a real issue.
- **Status:** Confirmed
- **Source:** chat 2026-08-02
- **Links:** [[design-decisions]] [[medical-focus]]

### 2026-08-02 — Batch of eight (Dr. Modi confirmed in chat)
- Certification Matters (ABMS) logo + link added to credential strip; all
  credential marks now link out (light bar + footer). D Best year-less mark
  (cropped from official badge) links to Dr. Modi's D Magazine profile, as do
  his 12 badge tiles. Dr. Parry is a widower — Diane removed from bio, family
  facts otherwise kept. Redundant "Skin Cancer Treatment" service deleted.
  Pilonidal expanded: cysts/abscesses terminology, natal-cleft origin, ORIGINAL
  line-art diagram (third-party graphic declined — copyright), cleft lift as
  gold standard with 95–97% success per large published series (NOT 99% — the
  literature does not support it; Svarre 2023, Immerman series). Hair Loss &
  PRP added as holistic service (exam, labs, oral/topical meds, PRP) — band +
  rewritten detail page.

### 2026-08-02 — Batch of nine (Dr. Modi confirmed in chat)
- Parry: nine grandchildren; Hollabaugh mention removed. All three surgeons
  styled MD, FAAD, FACMS; Modi + Wells titled Double Board-Certified (Modi's
  ACMS line upgraded Associate→Fellow to match FACMS, per his instruction).
  Hero: "board-certified and **fellowship-trained**" bolded. "Why fellowship
  training matters" education blurb added under home surgeon stats. Redundant
  "Around surgery day" 3-column block deleted from services (also carried
  stale 2–3-stage/driver claims). Pilonidal diagram replaced with an ORIGINAL
  Mayo-style flat illustration (generated, no text baked in). D badges
  fill-normalized to exactly identical 880x1440 tiles. PRP page gained a
  before/after Results gallery from the practice's own brochure — pairs
  derived from the brochure's own slide layout (image2→3 = Patient 1,
  image4→5 = Patient 2), crops per the brochure's srcRect, 2x upscale only.
