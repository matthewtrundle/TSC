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
