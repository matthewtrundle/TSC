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

### 2026-08-03 — Referring-page facts (Dr. Modi confirmed)
- What goes back to referrers: a PROCEDURE LETTER with clinical photos and
  disposition (not "operative note and margin status"; unconfirmed "same
  week" timing removed). The practice coordinates escalation of care —
  referrals to radiation oncology, plastic surgery, and medical oncology.

### 2026-08-03 — Post-audit fixes batch (Dr. Modi approved in chat)
- Google reviews: integrated as LINKS to the practice's real Google Business
  Profile (place ID ChIJUTM9KV8jTIYRgt9pgc15Z6g, verified to resolve to the
  6100 Windhaven listing — 28 Google reviews at time of check). Placement:
  appointment page ("Wondering what to expect?") + footer champagne link.
  Deliberately NO on-site star widgets, review quotes, or aggregateRating
  schema — Google treats self-serving ratings markup as spam, and on-site
  numbers would go stale or shade into fabrication. If Dr. Modi supplies the
  short "review us" link (g.page/...) from his GBP dashboard, swap it in.
- Legal pages: /privacy (website-scope only; PHI/HIPAA explicitly deferred to
  the office's Notice of Privacy Practices; states factually that the site
  sets no advertising cookies/trackers) and /accessibility (WCAG 2.1 AA
  target) added, linked in footer bottom bar, in sitemap. Office/counsel
  should review privacy wording before production launch.
- Mechanical: MobileCallBar safe-area padding fix (iPhone footer overlap),
  aria-expanded on mobile menu, home stat row stacks on narrow phones,
  framer-motion + motion uninstalled (dead), ScrollProgress/AnimatedText
  deleted (never rendered).
- RESOLVED same day (Dr. Modi confirmed): one-to-two stages wording; "seen
  within days of referral"; "call within 1 business day" — see
  [[medical-focus]] 2026-08-03 entry.
- Still OPEN from the audit: Resend env vars in Vercel before launch (+ one
  live test submission); office/counsel review of /privacy; insurance page
  carrier list; patient-resources/wound-care page content.

### 2026-08-04 — Appointment-form upgrades deferred (Dr. Modi)
- Researched 2026 derm scheduling landscape (retail groups self-schedule;
  surgical/Mohs practices universally phone/callback-based — our model is
  correct). Proposed: SMS-consent checkbox + preferred-contact field,
  optional referring-physician field, and (office-side) a two-way texting
  vendor (Klara/Weave; McGuiness runs Klara). Dr. Modi: hold off for now.
  Do not re-pitch unprompted; revisit if he raises scheduling or texting.

### 2026-08-04 — Appointment form: date/time out, message field in (Dr. Modi)
- Preferred-date and preferred-time fields removed. Optional free-text
  Message field (1000 chars) added for triage. Wording walks the HIPAA
  tightrope: invites logistics/triage context (referrer, urgency, insurance
  questions) and explicitly steers diagnosis/medical history to the phone,
  because transport is ordinary email (Resend, no BAA). Dr. Modi's ideal —
  patients sharing freely — requires a BAA-covered transport (e.g., Paubox
  API swap or a HIPAA form vendor like Jotform HIPAA/IntakeQ); presented as
  an upgrade path, no vendor chosen yet. If a BAA transport lands, broaden
  the message-field copy and email footer accordingly.

### 2026-08-04 — Form transport: practice's own Google Workspace (Dr. Modi)
- Dr. Modi confirmed the practice's Google Workspace BAA has been signed
  since 2018. Form email transport switched from Resend (never configured;
  no BAA) to Gmail SMTP via the practice's own Workspace account
  (nodemailer, app password; env: GMAIL_USER, GMAIL_APP_PASSWORD,
  PRACTICE_INBOX defaults to office@planoderm.com). Mail therefore stays in
  BAA-covered infrastructure at rest end to end.
- CONSEQUENCE: message fields on both forms now INVITE health context
  ("share as much as you're comfortable"; diagnosis/biopsy/referrer),
  per Dr. Modi's triage goal. Appointment + contact routes' email footers
  now carry a handling reminder (may contain PHI, do not forward outside
  the practice). Privacy page updated to match. RULE: if the transport
  ever changes to a non-BAA sender, the form copy MUST be re-restricted
  first — see comments in src/lib/email.ts.
- Residual nuance flagged for counsel: the Vercel serverless function
  handles submissions transiently in memory (no persistence, no content
  logging); strictest reading would want a BAA with the host too.
- Launch blocker is now: create app password on a Workspace account
  (2-Step Verification required), set GMAIL_USER + GMAIL_APP_PASSWORD in
  Vercel, redeploy, one live test submission.

### 2026-08-04 — Combined experience: 70+ years (Dr. Modi)
- Home stat changed 65+ → 70+ years combined experience, per Dr. Modi's
  direct instruction. Supersedes the 2026-08-02 "68 shown as 65+" note.
  Only the home stat displays a number; other copy says "decades".

### 2026-08-04 — Bio cleanup batch (Dr. Modi confirmed in chat)
- New confirmed personal facts: Dr. Modi is married with two young boys;
  Dr. Wells is married with three grown children. Modi origin wording:
  "born in Buffalo, New York, but grew up and graduated from high school in
  Sugar Land, Texas." Wells "over 20 years of experience" CONFIRMED correct
  (stands alongside the 70+ combined stat). Parry bio now opens "Edward"
  (not "Ed"). Wells bio: para-1 split, "tenured associate professor"
  lowercased, final paragraph rebuilt with present-tense "serves as an
  Assistant Editor of JAAD". Modi closing stain sentence tightened;
  shortBio says "skin cancer in transplant patients". Unused doctor
  `quote` fields DELETED from siteData (never rendered; not the doctors'
  real words — must never be resurrected without their actual quotes).
