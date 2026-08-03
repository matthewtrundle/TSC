// =============================================================================
// PLANODERM SITE DATA
// Central data store for content from The Surgery Center at Plano Dermatology
// =============================================================================

export const siteConfig = {
  name: "The Surgery Center at Plano Dermatology",
  shortName: "Plano Dermatology",
  tagline: "Experts in Mohs Micrographic Surgery",
  description:
    "World-class skin cancer care in a safe and comfortable environment. Our board certified and fellowship trained surgeons specialize in Mohs micrographic surgery and the treatment of skin cancer.",

  contact: {
    phone: "(972) 378-0620",
    phoneRaw: "9723780620",
    fax: "(972) 378-0630",
    email: "office@planoderm.com",
    address: {
      street: "6100 Windhaven Parkway",
      city: "Plano",
      state: "TX",
      zip: "75093",
      full: "6100 Windhaven Parkway, Plano, TX 75093",
    },
  },

  hours: {
    weekdays: "Monday-Thursday: 7:30am - 4:00pm",
    friday: "Friday: 10:00am - 2:00pm",
    weekend: "Saturday-Sunday: Closed",
    short: "Mon-Thurs: 7:30-4 | Fri: 10-2",
    detailed: [
      { day: "Monday", hours: "7:30am - 4:00pm" },
      { day: "Tuesday", hours: "7:30am - 4:00pm" },
      { day: "Wednesday", hours: "7:30am - 4:00pm" },
      { day: "Thursday", hours: "7:30am - 4:00pm" },
      { day: "Friday", hours: "10:00am - 2:00pm" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" },
    ],
  },

  links: {
    patientPortal: "https://sadio.com/",
    billPay: "https://quickclick.com/r/c5orl",
  },

  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
};

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Our Practice", href: "/practice" },
    { name: "Services", href: "/services" },
    { name: "Our Surgeons", href: "/team" },
    { name: "Referring Physicians", href: "/referring" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Mohs Surgery", href: "/services#mohs-surgery" },
    { name: "Mohs for Melanoma", href: "/services#immunostaining" },
    { name: "Reconstructive Surgery", href: "/services#reconstruction" },
    { name: "Pilonidal Disease", href: "/services#pilonidal" },
    { name: "Skin Resurfacing", href: "/services#skin-resurfacing" },
    { name: "Hair Loss & PRP", href: "/services#hair-loss" },
  ],
  // Legal pages are not yet written. These links are intentionally empty rather
  // than pointing at routes that 404. A medical practice does need a Privacy
  // Policy and a HIPAA Notice of Privacy Practices — both must be drafted by the
  // practice's counsel, not generated. Restore entries here once those pages exist.
  legal: [] as { name: string; href: string }[],
};

export const doctors = [
  {
    id: "dr-modi",
    certificationUrl: "https://www.certificationmatters.org/practitioner/?crtmat_pid=997770&crtmat_ped=OWVJdlRsYXBwOXhpdlhBcGFKYy83UFZIc3hCUUNMcVhDTjIxdkVrdEZUcz0&qs=ZHNlYXJjaD0xJmxuYW1lPW1vZGkmZm5hbWU9Z3VuamFuJnN0YXRlPSZzcGVjaWFsdHk9",
    name: "Gunjan Modi, MD, FAAD, FACMS",
    credentials: "MD, FAAD, FACMS",
    title: "Double Board-Certified Dermatologist & Mohs Surgeon",
    specialty: "Mohs Surgery & Cutaneous Oncology",
    slug: "dr-gunjan-modi",
    // Real photograph from the practice's own site, colour- and exposure-matched
    // to the other two surgeons. Replaces the previous AI-generated face.
    image: "/images/dr-modi-warm.webp" as string | undefined,
    shortBio:
      "Double board-certified dermatologist and fellowship-trained Mohs surgeon with expertise in transplant skin cancer and immunoperoxidase staining techniques.",
    fullBio: `Gunjan Modi is a double board-certified dermatologist and fellowship-trained Mohs surgeon. Originally from Buffalo, New York, he graduated from high school in Sugar Land, Texas. He received his bachelor's degree from the University of Pennsylvania. He went on to medical school at Baylor College of Medicine in Houston, where he graduated with honors.

Dr. Modi remained at Baylor to do his dermatology residency, where he scored in the top 1% of all residents in the country on the national dermatology inservice examination. He then completed a fellowship in Mohs surgery, cutaneous oncology, and procedural dermatology at UT Southwestern Medical Center in Dallas, where he was voted outstanding teaching fellow.

During his fellowship, Dr. Modi developed a keen interest in the management of solid organ transplant recipients with skin cancer, and he is now an active member of the International Transplant Skin Cancer Collaborative. He also specializes in the use of immunoperoxidase stains in Mohs surgery. These special stains have made certain more aggressive cancers such as melanoma and high-risk squamous cell carcinoma more amenable to tissue sparing surgical techniques with higher cure rates.`,
    education: [
      { degree: "Fellowship", institution: "University of Texas Southwestern Medical Center", field: "Mohs Surgery and Dermatologic Oncology" },
      { degree: "Residency", institution: "Baylor College of Medicine", field: "Dermatology" },
      { degree: "Medical School", institution: "Baylor College of Medicine", field: "Doctor of Medicine" },
      { degree: "Undergraduate", institution: "University of Pennsylvania", field: "Bachelor's Degree" },
    ],
    certifications: [
      "Diplomate, American Board of Dermatology",
      "Fellow, American College of Mohs Surgery",
      "Fellow, American Academy of Dermatology",
      "Fellow, American Society for Dermatologic Surgery",
    ],
    specialInterests: [
      "Solid organ transplant recipients with skin cancer",
      "Immunoperoxidase stains in Mohs surgery",
      "Melanoma treatment",
      "High-risk squamous cell carcinoma",
    ],
    // Source: D Magazine directory listing + Dr. Modi's direct confirmation
    // in chat 2026-08-02 that the recognition runs 2015 through 2026 for both
    // awards. Badge assets are D Magazine's own files; recognition displays
    // the year RANGE (min–max), not per-year chips.
    awards: [
      {
        name: "Best Doctors in Collin County",
        source: "D Magazine",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
      },
      {
        name: "Best Doctors",
        source: "D Magazine",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
      },
    ] as { name: string; source: string; years: number[] }[] | undefined,
    quote: "Every patient deserves the highest standard of care, and that's what we deliver every day.",
  },
  {
    id: "dr-wells",
    certificationUrl: "https://www.certificationmatters.org/practitioner/?crtmat_pid=708100&crtmat_ped=T2VVcy82M2IzZzF0YzBSbk9vUFJ6Mm5ZeEFGbVorMG42Ym1KeFdRM0JXQT0&qs=ZHNlYXJjaD0xJmxuYW1lPXdlbGxzJmZuYW1lPW1pY2hhZWwmc3RhdGU9JnNwZWNpYWx0eT0",
    name: "Michael Wells, MD, FAAD, FACMS",
    credentials: "MD, FAAD, FACMS",
    title: "Double Board-Certified Dermatologist & Mohs Surgeon",
    specialty: "Mohs Surgery & Procedural Dermatology",
    slug: "dr-michael-wells",
    image: "/images/dr-wells-warm.webp" as string | undefined,
    shortBio:
      "Double board-certified dermatologist and fellowship-trained Mohs surgeon; former tenured associate professor with over 20 years of experience.",
    fullBio: `Michael Wells, M.D. earned his Bachelor of Science from the University of Central Arkansas, graduating with Alpha Chi honors, and completed medical school at the University of Arkansas for Medical Sciences in Little Rock — where he was the top student in pathology and anatomy and was inducted into the AOA medical honor society.

He served as an assistant instructor during his Internal Medicine internship at Vanderbilt University Medical Center in Nashville, then completed his dermatology residency at Texas Tech University Health Sciences Center in Lubbock, serving as chief resident in his final year.

Texas Tech invited him to stay on as faculty, where he rose to the level of Tenured Associate Professor and received numerous Dean's awards between 2001 and 2012. He went on to complete a Mohs Micrographic Surgery Fellowship at the University of Texas Southwestern in Dallas.

Dr. Wells remains deeply engaged with the academic side of the specialty. He has served on the Editorial Board and as a reviewer for the Journal of the American Academy of Dermatology (JAAD), the preeminent peer-reviewed publication in dermatology, in addition to serving as an editor for e-medicine, authoring chapters for clinical decision-making resources, and active involvement with the Texas Medical Association.`,
    education: [
      { degree: "Fellowship", institution: "University of Texas Southwestern Medical Center", field: "Mohs Surgery and Dermatologic Oncology" },
      { degree: "Residency", institution: "Texas Tech University Health Sciences Center", field: "Dermatology (Chief Resident)" },
      { degree: "Internship", institution: "Vanderbilt University Medical Center", field: "Internal Medicine" },
      { degree: "Medical School", institution: "University of Arkansas for Medical Sciences", field: "Doctor of Medicine" },
      { degree: "Undergraduate", institution: "University of Central Arkansas", field: "Bachelor of Science" },
    ],
    certifications: [
      "Diplomate, American Board of Dermatology",
      "Fellow, American College of Mohs Surgery",
      "Fellow, American Academy of Dermatology",
      "Fellow, American Society for Dermatologic Surgery",
    ],
    specialInterests: [
      "Medical education and training",
      "Peer review and medical literature",
      "Texas Medical Association committees",
      "Clinical decision-making resources",
    ],
    // Confirmed by Dr. Modi in chat 2026-08-02.
    awards: [
      {
        name: "Assistant Editor, Journal of the American Academy of Dermatology (JAAD)",
        source: "Editorial Board",
        years: [],
      },
    ] as { name: string; source: string; years: number[] }[] | undefined,
    quote: "Education and precision are the foundations of exceptional patient outcomes.",
  },
  {
    id: "dr-parry",
    certificationUrl: "https://www.certificationmatters.org/practitioner/?crtmat_pid=264474&crtmat_ped=dGJ6aERiaUdvK1l6b0NHSEpub0dDejErZmNnYUxqaTZaV1lucVBEa3lhTT0&qs=ZHNlYXJjaD0xJmxuYW1lPXBhcnJ5JmZuYW1lPWVkd2FyZCZzdGF0ZT0mc3BlY2lhbHR5PQ=",
    name: "Edward Parry, MD, FAAD, FACMS",
    credentials: "MD, FAAD, FACMS",
    title: "Board Certified Dermatologist & Mohs Surgeon",
    specialty: "Mohs Surgery & Cutaneous Oncology",
    slug: "dr-edward-parry",
    image: "/images/dr-parry-warm.webp" as string | undefined,
    shortBio:
      "Former LSU professor and fellowship program director with 17 years in academics, having trained hundreds of residents and 15 Mohs surgeons.",
    fullBio: `Ed Parry is a board certified dermatologist and fellowship trained Mohs surgeon. He is a native of upstate New York. He received his bachelor's degree from the United States Air Force Academy in Colorado Springs, Colorado. He then moved to New Orleans and received his medical degree from Tulane University Medical School on a military scholarship.

Dr. Parry did his internship in general medicine at Scott Air Force Base Medical Center in Illinois, after which he came to Texas to do his dermatology residency at Wilford Hall Medical Center in San Antonio. He then completed a fellowship in Mohs surgery and cutaneous oncology at Scripps Clinic in San Diego.

Dr. Parry subsequently joined the faculty at LSU Medical Center, where he served as a professor of dermatology and the director of Mohs surgery for 17 years. During his tenure at LSU, Dr. Parry taught hundreds of residents, and started a fellowship training program in Mohs surgery, which graduated 15 Mohs surgeons. Dr. Parry retired from academics in 2007 and moved to Plano to enter private practice.

Dr. Parry has three adult children – Hugh, Phillip, and David – and nine grandchildren. He is an avid sailor and tennis player.`,
    education: [
      { degree: "Fellowship", institution: "Scripps Clinic and Research Foundation", field: "Mohs Surgery and Dermatologic Oncology" },
      { degree: "Residency", institution: "Wilford Hall Medical Center", field: "Dermatology" },
      { degree: "Internship", institution: "Scott Air Force Base Medical Center", field: "General Medicine" },
      { degree: "Medical School", institution: "Tulane University Medical School", field: "Doctor of Medicine" },
      { degree: "Undergraduate", institution: "United States Air Force Academy", field: "Bachelor's Degree" },
    ],
    certifications: [
      "Diplomate, American Board of Dermatology",
      "Fellow, American College of Mohs Surgery",
      "Fellow, American Academy of Dermatology",
      "Fellow, American Society for Dermatologic Surgery",
    ],
    specialInterests: [
      "Medical education and fellowship training",
      "Complex skin cancer cases",
      "Academic dermatology",
      "Cutaneous oncology",
    ],
    awards: undefined as { name: string; source: string; years: number[] }[] | undefined,
    quote: "Training the next generation of surgeons while caring for patients is my greatest privilege.",
  },
];

// =============================================================================
// SERVICES
//
// Ordering is deliberate (client-set 2026-08-02): Mohs surgery leads as the
// core service, followed immediately by the two immunostaining services that
// distinguish this practice from every other Mohs practice in North Texas.
// =============================================================================

export const services = [
  {
    id: "mohs-surgery",
    badge: "Gold Standard Treatment",
    name: "Mohs Micrographic Surgery",
    shortName: "Mohs Surgery",
    slug: "mohs-surgery",
    description:
      "Mohs micrographic surgery is the most precise way to remove a skin cancer. Pioneered by Dr. Frederick Mohs and refined over nearly a century, it is today's gold standard for treating most skin cancers: the tumor is removed one thin layer at a time, and every margin is read under the microscope before you go home.",
    shortDescription:
      "The gold standard for skin cancer treatment with up to 99% cure rate.",
    icon: "microscope",
    features: [
      "Up to 99% cure rate for previously untreated cancers",
      "Tissue-sparing technique preserves maximum healthy skin",
      "Complete microscopic examination during surgery",
      "Same-day results - know cancer is gone before you leave",
      "Optimal cosmetic outcomes with minimal scarring",
      "Performed in our state-of-the-art outpatient facility",
    ],
    image: undefined as string | undefined,
  },
  {
    id: "immunostaining",
    badge: "What Sets Us Apart",
    // Stain panel (MART-1, SOX10) and the same-day framing confirmed by
    // Dr. Modi on 2026-08-01.
    name: "Mohs Surgery for Melanoma",
    shortName: "Mohs for Melanoma",
    slug: "immunostaining",
    description:
      "We perform Mohs surgery for melanoma with immunohistochemical staining — MART-1 and SOX10 — run in our own laboratory during your surgery. These stains make melanoma cells visible at the margin in a way routine frozen sections cannot. The cancer is removed, every margin is tested with the stains, and once the margins are clear the wound is reconstructed — all on the same day. The traditional alternatives are wide local excision, or a staged excision (sometimes called \"slow Mohs\") that stretches the removal and margin reading over one to three days. True same-day, margin-controlled Mohs for melanoma is what this laboratory was built to do.",
    shortDescription:
      "Same-day Mohs for melanoma: removed, margins tested with MART-1 and SOX10 stains, and reconstructed — in one visit.",
    icon: "microscope",
    features: [
      "MART-1 and SOX10 immunostains, run in our own laboratory",
      "Removal, margin testing, and reconstruction in a single day",
      "100% of the margin examined for melanoma and melanoma in situ",
      "Tissue-sparing alternative to wide local excision",
      "No multi-day staged excision (\"slow Mohs\") — margins are read while you wait",
    ],
    image: undefined as string | undefined,
  },
  {
    id: "high-risk-immunostaining",
    badge: "What Sets Us Apart",
    name: "Immunostaining for High-Risk Skin Cancers",
    shortName: "High-Risk Immunostaining",
    slug: "high-risk-immunostaining",
    description:
      "The same on-site immunostaining capability is applied to aggressive non-melanoma tumors, including high-risk squamous cell carcinoma. Cancers that are difficult to see on routine sections can be traced accurately to their margins, which makes them amenable to tissue-sparing surgery with higher cure rates.",
    shortDescription:
      "Aggressive non-melanoma tumors traced accurately to their true margins.",
    icon: "shield",
    features: [
      // TODO(Dr. Modi): confirm which tumor types and which stains.
      "PLACEHOLDER — tumor types and stain panel to be supplied",
      "High-risk squamous cell carcinoma",
      "Same-day, on-site processing",
      "Margin control for poorly-defined tumors",
    ],
    image: undefined as string | undefined,
  },
  {
    id: "reconstruction",
    badge: "Skilled Reconstruction",
    name: "Reconstructive Surgery",
    shortName: "Reconstruction",
    slug: "reconstruction",
    description:
      "After skin cancer removal, our surgeons provide expert reconstructive techniques to restore both function and appearance. We work to achieve optimal cosmetic results while ensuring complete cancer removal.",
    shortDescription:
      "Expert wound closure and reconstruction after cancer removal.",
    icon: "heart",
    features: [
      "Wound closure with stitches",
      "Skin flap reconstruction",
      "Skin graft procedures",
      "Healing by secondary intention when appropriate",
      "Minimized scarring techniques",
      "Coordination with other specialists when needed",
    ],
    image: undefined as string | undefined,
  },
  {
    id: "pilonidal",
    badge: "Beyond Skin Cancer",
    name: "Pilonidal Disease and the Bascom Cleft Lift",
    shortName: "Pilonidal Disease",
    slug: "pilonidal",
    description:
      "Pilonidal disease — pilonidal cysts and pilonidal abscesses — arises in the natal cleft, the crease between the buttocks near the tailbone, where hair and debris work under the skin and form infected pockets and sinus tracts. It most often affects young adults, and it tends to come back when treated with drainage or simple excision alone. We treat it with the Bascom cleft lift, the current gold standard for cure: the sinus tracts are removed, the cleft is flattened, and the closure is moved off the midline where skin heals reliably. Success rates in large published series run 95 to 97 percent, and patients are typically left with a smaller, off-midline scar and a faster return to normal activity than with traditional wide excision.",
    shortDescription:
      "Definitive treatment for pilonidal disease, with an off-midline closure.",
    icon: "plus",
    features: [
      // TODO(Dr. Modi): confirm recovery expectations and anesthesia before publishing.
      "PLACEHOLDER — recovery time and anesthesia details to be confirmed",
      "Pilonidal cysts, abscesses, and sinus tracts — including recurrent disease",
      "Bascom cleft lift: the gold standard for cure",
      "Success rates of 95–97% in large published series",
      "Off-midline closure, where wounds heal more reliably",
      "Alternative to wide excision and open healing",
    ],
    image: undefined as string | undefined,
  },
  {
    // Confirmed by Dr. Modi in chat 2026-08-02: fractional CO2 and
    // Jessner's + TCA medium-to-deep peels, used for photodamage, actinic
    // keratosis / precancer field treatment, and aesthetic rejuvenation.
    id: "skin-resurfacing",
    badge: "Beyond Skin Cancer",
    name: "Skin Resurfacing",
    shortName: "Skin Resurfacing",
    slug: "skin-resurfacing",
    description:
      "Years of sun leave more than individual spots — they leave a field of damage: rough texture, mottled tone, fine lines, and scattered actinic keratoses, the precancers that can progress to squamous cell carcinoma. Skin resurfacing treats that whole field at once. Dr. Modi performs fractional CO2 laser resurfacing and medium-to-deep chemical peels using Jessner's solution and TCA — the same two tools serving two purposes: clearing photodamaged, precancerous skin, and aesthetic rejuvenation. It is resurfacing supervised by a surgeon who spends the rest of his week looking at skin cancer under a microscope.",
    shortDescription:
      "Fractional CO2 laser and full thickness chemical peels — for photo aging, actinic damage and pre-cancers, and facial rejuvenation.",
    icon: "shield",
    features: [
      "Fractional CO2 laser resurfacing",
      "Medium-to-deep chemical peels with Jessner's solution and TCA",
      "Field treatment of photodamage and actinic keratoses (precancers)",
      "Aesthetic rejuvenation — texture, tone, and fine lines",
      "Performed by a fellowship-trained skin cancer surgeon",
    ],
    image: undefined as string | undefined,
  },
  {
    // Confirmed by Dr. Modi in chat 2026-08-02: hair loss treated as a
    // medical problem — exam, labs, oral and topical medication, and PRP.
    id: "hair-loss",
    badge: "Beyond Skin Cancer",
    name: "Hair Loss & Platelet-Rich Plasma",
    shortName: "Hair Loss & PRP",
    slug: "hair-loss",
    description:
      "Hair loss is a medical problem before it is a cosmetic one, and we treat it that way. Evaluation starts with a physical and clinical examination and, where indicated, laboratory testing — because thyroid disease, iron deficiency, and other medical causes need to be found, not covered up. Treatment is then built holistically from the tools with evidence behind them: oral medications, topical medications, and platelet-rich plasma (PRP) — your own concentrated platelets injected into thinning areas over a series of sessions. PRP is one tool in a complete plan, not the whole plan.",
    shortDescription:
      "Hair loss treated holistically — clinical exam, laboratory workup, oral and topical medication, and PRP.",
    icon: "plus",
    features: [
      "Physical and clinical examination of the scalp and hair",
      "Laboratory evaluation where indicated",
      "Oral and topical medical therapy",
      "Platelet-rich plasma (PRP) injections",
      "A complete, medical approach — not PRP in isolation",
    ],
    image: undefined as string | undefined,
  },
  {
    id: "other-procedures",
    badge: "Additional Care",
    name: "Additional Procedures",
    shortName: "Other Services",
    slug: "other-procedures",
    description:
      "Beyond skin cancer treatment, our surgeons perform a variety of dermatologic procedures including mole and cyst removal, nail procedures, and treatment of other skin conditions.",
    shortDescription:
      "Mole removal, cyst removal, nail procedures, and more.",
    icon: "plus",
    features: [
      "Mole evaluation and removal",
      "Cyst removal",
      "Nail procedures",
      "Benign lesion removal",
      "Expert wound care",
    ],
    image: undefined as string | undefined,
  },
];

// Types of skin cancer treated
export const skinCancerTypes = [
  {
    name: "Basal Cell Carcinoma (BCC)",
    shortName: "BCC",
    description:
      "The most common skin cancer, typically appearing on sun-exposed skin as a pearly bump, a pinkish patch, or a sore that heals and returns. It grows slowly and rarely spreads, but left untreated it is locally destructive — Mohs surgery removes it with the most tissue spared.",
  },
  {
    name: "Squamous Cell Carcinoma (SCC)",
    shortName: "SCC",
    description:
      "The second most common skin cancer, often a firm red nodule or a scaly, crusted patch that grows or bleeds. Unlike BCC it can occasionally spread, which makes timely treatment important; high-risk tumors here get immunostained margin control in our own laboratory.",
  },
  {
    name: "Melanoma / Malignant Melanoma (MM)",
    shortName: "Melanoma",
    description:
      "The most serious common skin cancer, arising from the skin's pigment cells — watch for a mole that changes, has irregular borders, or stands out from the rest. For appropriate cases we perform same-day, margin-controlled Mohs surgery with MART-1 and SOX10 immunostains.",
  },
  {
    name: "Sebaceous Carcinoma",
    shortName: "Sebaceous",
    description:
      "A rare, aggressive cancer of the skin's oil glands, most often on the eyelids of older adults, where it can masquerade as a stye or chalazion that never resolves. Margin-controlled excision is central to treating it well.",
  },
  {
    name: "Dermatofibrosarcoma Protuberans (DFSP)",
    shortName: "DFSP",
    description:
      "A rare cancer that begins in the deeper layer of the skin as a firm, slowly enlarging plaque or nodule. It sends out root-like extensions well beyond what the eye can see, which is exactly the problem margin-controlled surgery was built to solve.",
  },
  {
    name: "Atypical Fibroxanthoma (AFX)",
    shortName: "AFX",
    description:
      "A rare tumor of heavily sun-damaged skin, usually on the scalp, ears, or face of older patients. It typically behaves locally, and complete margin-controlled removal is the standard of care.",
  },
  {
    name: "Microcystic Adnexal Carcinoma (MAC)",
    shortName: "MAC",
    description:
      "A rare, slow-growing cancer of the sweat-gland structures, most often around the lips and central face. It infiltrates far more widely and deeply than it appears on the surface, making complete margin examination especially valuable.",
  },
  {
    name: "Extramammary Paget's Disease (EMPD)",
    shortName: "EMPD",
    description:
      "A rare, slow-growing cancer of apocrine-gland-rich skin, typically in the genital or perianal area, that often looks like a stubborn rash or eczema for years before diagnosis. Its edges are indistinct, so margin-controlled surgery earns its keep here.",
  },
];

// Mohs surgery process steps
export const mohsProcess = [
  {
    step: 1,
    title: "Evaluation & Marking",
    description: "The visible tumor is identified and the surgical site is prepared. Reference marks are made on the skin.",
  },
  {
    step: 2,
    title: "Anesthesia",
    description: "Local anesthesia is administered to numb the area. You remain awake and comfortable throughout.",
  },
  {
    step: 3,
    title: "Tissue Removal",
    description: "The visible tumor is surgically removed along with a thin layer of surrounding tissue.",
  },
  {
    step: 4,
    title: "Mapping & Processing",
    description: "The tissue is color-coded, mapped, and processed in our on-site laboratory.",
  },
  {
    step: 5,
    title: "Microscopic Examination",
    description: "The surgeon examines 100% of the tissue margins under the microscope for cancer cells.",
  },
  {
    step: 6,
    title: "Repeat if Needed",
    description: "If cancer remains, only the affected area is removed. This process repeats until all cancer is gone.",
  },
  {
    step: 7,
    title: "Reconstruction",
    description: "Once cancer-free, the wound is repaired using the most appropriate technique for optimal results.",
  },
];

export const values = [
  {
    title: "World-Class Expertise",
    description: "Three fellowship-trained Mohs surgeons with decades of combined experience",
    icon: "award",
  },
  {
    title: "Highest Cure Rates",
    description: "Up to 99% cure rate using precise Mohs micrographic surgery techniques",
    icon: "target",
  },
  {
    title: "Compassionate Care",
    description: "Personalized attention in a safe, comfortable environment",
    icon: "heart",
  },
  {
    title: "Teaching Excellence",
    description: "Our surgeons have trained hundreds of residents and fellows",
    icon: "graduation-cap",
  },
];

export const practiceInfo = {
  about: `The Surgery Center at Plano Dermatology is committed to providing world-class care in a safe and comfortable environment. Dr. Modi, Dr. Wells, and Dr. Parry are each board certified and fellowship trained in the surgical treatment of skin cancer and other dermatologic conditions.

This includes Mohs micrographic surgery, reconstructive surgery, mole and cyst removal, nail procedures, as well as the treatment of melanoma and other high-risk skin cancers.`,

  mohsDescription: `What sets Mohs apart is simple. Instead of removing a margin of healthy skin and waiting days for a lab to report whether the edges were clear, your surgeon examines 100% of the margin under the microscope while you wait. If any cancer remains, its exact location is mapped and only that spot is removed — the cancer is traced to its roots, and nothing healthy is taken unnecessarily.

Done properly, Mohs requires a fellowship-trained surgeon, dedicated laboratory staff, and an on-site laboratory where your tissue is frozen, sectioned, stained, and read within the hour it is removed. This practice is built around exactly that. The stages of a Mohs day take time because the microscope — not estimation — decides when your surgery is finished.

The result is the treatment's defining combination: cure rates up to 99% for previously untreated cancers, the most healthy skin preserved, and an answer before you leave that the cancer is gone.`,

  advantages: [
    "Highest cure rates - up to 99% for previously untreated cancers",
    "Maximum preservation of healthy tissue",
    "Microscopic examination of 100% of tissue margins",
    "Same-day results - cancer removal verified before you leave",
    "Optimal cosmetic outcomes",
    "Outpatient procedure in our comfortable facility",
  ],
};

export const faqs = [
  {
    question: "How long does Mohs surgery take?",
    answer: "Generally, the procedure takes about half a day. It is difficult to predict in advance how many stages a tumor will need. Most tumors are clear in one to two stages, and each stage takes about an hour including tissue processing — longer when special stains are needed, as for melanoma.",
  },
  {
    question: "Is Mohs surgery painful?",
    answer: "Most patients find the procedure extremely well tolerated. The area is numbed with local anesthesia, so you should not feel pain during the surgery itself — you will be awake and comfortable throughout. Some mild soreness after the numbness wears off is normal, and pain medicine is routinely prescribed so you have it if you need it.",
  },
  {
    question: "What should I bring on surgery day?",
    answer: "Bring something to read or a screen — there will be waiting between stages while we read your tissue. Eat a good breakfast and take your regular medications unless we instruct otherwise. Most patients do not need a driver to get home.",
  },
  {
    question: "What happens after the cancer is removed?",
    answer: "Once all cancer is removed, your surgeon will discuss reconstruction, which typically follows immediately. This may include stitches, skin flaps, skin grafts, or allowing the wound to heal naturally.",
  },
  {
    question: "How long will my recovery be?",
    answer: "Most patients are back to normal light activity the next day. Expect stitches for one to two weeks depending on the site, and hold off on strenuous exercise until they are out. The wound itself heals over a few weeks, and the scar continues to fade and soften over the following months.",
  },
  {
    question: "Will I have a scar?",
    answer: "Any surgery will leave some scarring. However, Mohs surgery minimizes scarring by removing only cancerous tissue. Our surgeons use advanced reconstruction techniques to achieve optimal cosmetic results. Scars typically improve significantly over 6-18 months.",
  },
  {
    question: "Do I need follow-up appointments?",
    answer: "Yes. Our surgical team will follow you while your wound heals — in the short term as the scar matures, and then on an as-needed basis for as long as necessary.",
  },
];
