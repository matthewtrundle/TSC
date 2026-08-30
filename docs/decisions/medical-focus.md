# Medical Focus — Claims Ledger

The strict ledger of medical claims. Two sections, no middle ground: a claim
is either **CONFIRMED** (publishable) or **UNCONFIRMED** (never renders).
Nothing moves up without Dr. Modi's (or another physician-user's) explicit
say-so. See [[practice-decisions]] for the no-fabricated-content rule and the
`planoderm-site` skill for how these claims may be phrased.

## CONFIRMED (publishable)

### 2026-08-30 — Neosporin/wound-care claims for the /learn article
- **Decision:** Dr. Modi confirmed the full claim set for
  /learn/neosporin-on-wounds: (1) neomycin and bacitracin are among the most
  common causes of allergic contact dermatitis (ACDS Allergen of the Year —
  bacitracin 2003, neomycin 2010); (2) the reaction is frequently mistaken
  for wound infection; (3) for clean wounds, topical antibiotic shows no
  infection-prevention benefit over plain petrolatum (Smack et al., JAMA
  1996;276(12):972–977 — verified); (4) plain petrolatum keeps the wound
  moist, supports healing, and is the practice recommendation; (5)
  when-to-call signs: spreading redness, pain increasing after day 2–3, pus,
  fever, plus the non-healing-sore skin-cancer bridge already on the site.
- **Rationale:** First patient-education article; every clinical sentence
  needed explicit sign-off per the content-integrity rules. References
  verified against JAMA Network / PubMed 2026-08-30.
- **Status:** Confirmed (page itself not yet deployed — see [[focus-areas]])
- **Source:** Dr. Modi, chat 2026-08-30 ("Approved"); commit 04adf03 on
  branch learn-education
- **Links:** [[practice-decisions]] [[focus-areas]]

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

### 2026-08-04 — Lip and oral biopsies (Dr. Modi confirmed in chat)
- **Decision:** The practice performs lip and oral biopsies — including the
  gums and the tongue. Indications: growths, and confirming inflammatory or
  autoimmune conditions such as oral lichen planus and Sjögren's syndrome
  (lip biopsy). Published as a detail page (/services/lip-oral-biopsies)
  and listed under Additional Procedures. The inner-lip minor-salivary-gland
  description is standard medicine, phrased generally.
- **Status:** Confirmed
- **Source:** Dr. Modi, chat, 2026-08-04

### 2026-08-06 — Cleft-lift FAQ details CONFIRMED (Dr. Modi in chat)
- **Decision:** The pilonidal cleft-lift FAQ answers are confirmed practice
  facts: general anesthesia most common; drain typically ~TWO DAYS (his
  correction — not the adapted source's one week); sitting encouraged from
  the day after surgery; back to work in days (1-2 weeks for prolonged
  sitting/heavy lifting); full activity with no restrictions in 3-6 weeks.
  This supersedes the "pilonidal recovery details UNCONFIRMED" entry for
  these specific items.
- **Status:** Confirmed
- **Source:** Dr. Modi, chat, 2026-08-06

### 2026-08-10 — Melanoma stain panel reconfirmed: MART-1 + SOX10
- **Decision:** The melanoma IHC panel is MART-1 and SOX10 — reconfirmed by
  Dr. Modi ("we decided on mart and sox"), resolving a stray S-100 mention
  that had crept into session memory. Site copy verified correct (siteData
  description, melanoma procedure page, referring page).
- **Status:** Confirmed
- **Source:** chat 2026-08-10
- **Links:** [[definitions]]

### 2026-08-10 — Pilonidal recovery, nail/eyelid biopsy pages, and PRFM all confirmed
- **Decision:** Dr. Modi confirmed the pilonidal recovery read-back in full
  ("pilonidal stuff confirmed" — closing the loop the 2026-08-06 cleft-lift
  FAQ entry opened) and approved the nail-biopsy and eyelid-biopsy page
  details as written. NEW confirmed claim: the practice's PRP is
  **second-generation — platelet-rich fibrin matrix (PRFM)**. Site copy
  describes only the mechanism (platelet concentrate converted to a natural
  fibrin gel; gradual growth-factor release over days rather than minutes) —
  no superiority, session-count, or percentage claims.
- The pilonidal siteData PLACEHOLDER was replaced with a real feature line
  (general anesthesia; sitting the next day; back to work within days).
- **Status:** Confirmed
- **Source:** Dr. Modi, chat 2026-08-10
- **Links:** [[focus-areas]] [[practice-decisions]]

### 2026-08-10 — High-risk stain panel: AE1/AE3 for SCC and EMPD (LAST placeholder resolved)
- **Decision:** Publishable: cytokeratin immunostains (AE1/AE3) for high-risk
  squamous cell carcinoma and extramammary Paget's disease. Dr. Modi: "We do
  this, but sparingly. It's more for boasting my capability" — so it is
  phrased as a capability, NEVER as routine use, and no other stains or
  tumor types may be added without new confirmation.
- With this, the siteData PLACEHOLDER filter has nothing left to catch —
  every rendered claim on the site is confirmed.
- **Status:** Confirmed
- **Source:** Dr. Modi, chat 2026-08-10
- **Links:** [[definitions]] [[focus-areas]]

## UNCONFIRMED (never render)

These stay behind the `PLACEHOLDER` filter until a physician confirms them:

**(none as of 2026-08-10 — every rendered claim on the site is confirmed.)**
New unconfirmed claims land here, behind the PLACEHOLDER filter, as always.

- ~~High-risk tumor/stain panel~~ — CONFIRMED 2026-08-10 (AE1/AE3 for
  high-risk SCC and EMPD, capability framing), see above.
- ~~Pilonidal recovery details~~ — CONFIRMED 2026-08-10, see above.
- ~~PRP / nail biopsy / eyelid biopsy specifics~~ — CONFIRMED 2026-08-10
  (with the PRFM addition), see above.

## The rule

Facts come ONLY from `TSC/src/lib/data/siteData.ts` or explicit confirmation
by Dr. Modi (or another physician of the practice) in chat. Never invent
stats, testimonials, staff, response times, or clinical details. Feature lines
containing `PLACEHOLDER` must never render. When a physician confirms a claim
in chat, record it here with the date, then update siteData.

### 2026-08-13 — Melanoma margin-story copy + six literature citations LIVE
- **Decision:** Dr. Modi approved on preview: "Mohs Surgery for Melanoma"
  headline; margin-story paragraph (MIS/lentigo maligna extend beyond the
  visible edge, esp. head/neck; 100% margin exam vs fixed-margin excision);
  claims limited to "recurrence below one percent" and "survival at least
  equal to — and for early invasive melanoma, modestly better than — wide
  excision." Six citations, ALL verified on PubMed and cross-checked
  against two frontier models via OpenRouter: Cheraghlou JAMA Derm 2019
  (31553403), Nosrati JAMA Derm 2017 (28241261), Etzkorn JAAD 2015,
  Valentin-Nogueras Derm Surg 2016 (27158886), Bricca JAAD 2005
  (15627086), Kunishige JAAD 2012 (22196979). Rendered under "Mohs for
  melanoma is well-studied and validated" with an anchor link from the
  intro. NO hosted PDFs and NO journal-cover thumbnails (copyright — links
  to PubMed only).
- **Status:** Confirmed — live (merge f32519a)
- **Source:** Dr. Modi, chat 2026-08-13
- **Links:** [[focus-areas]] [[definitions]]
