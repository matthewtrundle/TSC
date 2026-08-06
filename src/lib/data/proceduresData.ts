// =============================================================================
// PROCEDURE DETAIL PAGES
//
// One entry per nested page under /services/[slug]. Copy sources:
// - Legacy sites planoderm.com and planoderm.pillarwebdesign.com (crawled
//   2026-08-01), cleaned of flagged absolute claims ("ensures complete
//   removal", the 97%-vs-50-70% comparison) per the content-integrity rules.
// - Procedures with no legacy copy (PRP hair restoration, nail biopsies,
//   eyelid biopsies) are practice offerings confirmed by Dr. Modi in chat
//   2026-08-01; their descriptions are conservative and general — no
//   practice-specific protocol claims until the doctors supply them.
// =============================================================================

export type Procedure = {
  slug: string;
  name: string;
  /** Short line for index cards and meta descriptions. */
  summary: string;
  /** Body paragraphs, in order. */
  body: string[];
  whenToConsider: string[];
  techniques: { name: string; note: string }[];
  /** Which evocative image pairs with the page. */
  image: string;
  imageAlt: string;
  /** Optional before/after pairs, from the practice's own patient photos. */
  gallery?: { before: string; after: string; label: string }[];
  /** Optional SEO overrides for the metadata title/description. */
  seoTitle?: string;
  seoDescription?: string;
  /** Optional page-specific FAQ (rendered with FAQPage schema). */
  faqs?: { question: string; answer: string }[];
  /** Optional two-column treatment comparison table. */
  comparison?: {
    title: string;
    columns: [string, string];
    rows: { label: string; a: string; b: string }[];
    note?: string;
  };
};

export const procedures: Procedure[] = [
  {
    slug: "cyst-removal",
    seoTitle: "Cyst Removal in Plano, TX",
    name: "Cyst Removal",
    summary:
      "Complete excision of painful, infected, or bothersome cysts, including the sac, to help prevent recurrence.",
    body: [
      "Cysts are closed sacs under the skin that can fill with fluid, pus, or other material. Most are benign, but they can grow, become painful or infected, or simply be in a place where they bother you every day.",
      "Removing a cyst properly means removing the whole sac, not just draining it — a drained cyst usually refills. Our surgeons excise the cyst and its sac through a small incision under local anesthetic, and close the wound with attention to the final scar.",
    ],
    whenToConsider: [
      "A lump that is growing or changing",
      "Pain, redness, or swelling around the site",
      "A cyst that has become infected, or keeps becoming infected",
      "A visible cyst you would rather not live with",
    ],
    techniques: [
      {
        name: "Excisional surgery",
        note: "The cyst and its surrounding sac are removed together, which helps prevent recurrence.",
      },
      {
        name: "Drainage, then excision",
        note: "An acutely infected cyst may need drainage first, followed by complete excision once the infection settles.",
      },
    ],
    image: "/images/svc-surgical-light.webp",
    imageAlt: "Soft surgical light reflected in polished steel",
  },
  {
    slug: "lipoma-removal",
    seoTitle: "Lipoma Removal in Plano, TX",
    name: "Lipoma Removal",
    summary:
      "Removal of benign fatty growths through a small incision, preserving the surrounding tissue.",
    body: [
      "Lipomas are benign, soft fatty lumps that grow slowly under the skin. They are harmless, but they can become large, press on surrounding structures, restrict movement, or sit somewhere visible.",
      "Removal is a same-day procedure under local anesthetic: the lipoma comes out through a small incision, the surrounding tissue is preserved, and the wound is closed with attention to the scar.",
    ],
    whenToConsider: [
      "A soft lump that is growing",
      "Discomfort, or a lump that restricts movement",
      "A visible lump you would rather not live with",
    ],
    techniques: [
      {
        name: "Excisional surgery",
        note: "Complete removal through a small incision, preserving surrounding tissue.",
      },
    ],
    image: "/images/svc-surgical-light.webp",
    imageAlt: "Soft surgical light reflected in polished steel",
  },
  {
    slug: "mole-removal",
    seoTitle: "Mole Removal & Evaluation in Plano, TX",
    name: "Mole Evaluation & Removal",
    summary:
      "Surgical evaluation and removal of irregular, symptomatic, or unwanted moles — with pathology when it matters.",
    body: [
      "Most moles are benign. The ones worth attention are those that change — in size, shape, or color — or that bleed, itch, or stand out from your other moles. Because our surgeons spend their days looking at skin cancer under the microscope, evaluating a suspicious mole is home ground.",
      "Removed tissue is examined, and if a mole proves to be malignant, you are already in the right office: the same team performs margin-controlled Mohs surgery when it is indicated.",
    ],
    whenToConsider: [
      "A mole that is changing in size, shape, or color",
      "A mole that bleeds, itches, or is painful",
      "An irregular mole your dermatologist wants evaluated",
      "A mole you would simply rather not have",
    ],
    techniques: [
      {
        name: "Excisional removal",
        note: "Complete removal with minimal impact on the surrounding skin, with pathology review.",
      },
      {
        name: "Mohs surgery when malignant",
        note: "If a mole proves cancerous, the same practice provides margin-controlled removal.",
      },
    ],
    image: "/images/svc-histology-art.webp",
    imageAlt: "Stained tissue section as abstract art",
  },
  {
    slug: "keloid-scar-revision",
    seoTitle: "Keloid Removal & Scar Revision in Plano, TX",
    name: "Keloid & Scar Revision",
    summary:
      "Surgical revision of raised, thickened, or uncomfortable scars to improve appearance and function.",
    body: [
      "Keloids are raised, thickened scars that can follow surgery, injury, or acne. They can itch, hurt, restrict movement, or simply draw the eye. Scar revision surgery removes the scar tissue and closes the wound carefully, with technique choices aimed at keeping the new scar as quiet as possible.",
      "Reconstruction after skin cancer surgery is a daily part of this practice, and the same closure techniques — meticulous suturing, flaps and grafts where warranted — are what scar revision draws on.",
    ],
    whenToConsider: [
      "A keloid that is large or still growing",
      "Raised or thickened scarring that itches or hurts",
      "A scar that limits movement or catches on clothing",
      "A scar whose appearance affects your quality of life",
    ],
    techniques: [
      {
        name: "Scar excision and revision",
        note: "The scar tissue is removed and the wound closed carefully to minimize recurrence.",
      },
    ],
    image: "/images/svc-surgical-light.webp",
    imageAlt: "Soft surgical light reflected in polished steel",
  },
  {
    slug: "benign-lesion-removal",
    seoTitle: "Benign Skin Lesion Removal in Plano, TX",
    name: "Benign Lesion Removal",
    summary:
      "Seborrheic keratoses, skin tags, warts, and other benign growths, removed with attention to cosmetic outcome.",
    body: [
      "Not everything we remove is cancer. Seborrheic keratoses, skin tags, warts, and other benign growths are common, and many patients simply want them gone — because they catch on clothing, because they are irritated, or because of how they look.",
      "These are brief office procedures under local anesthetic. The approach is chosen per lesion, with the cosmetic result in mind.",
    ],
    whenToConsider: [
      "Seborrheic keratoses — the waxy, stuck-on growths of later adulthood",
      "Skin tags that catch on clothing or jewelry",
      "Warts that have resisted home treatment",
      "Any benign growth that is irritated, or that you want removed",
    ],
    techniques: [
      {
        name: "Lesion-appropriate removal",
        note: "Shave or excisional removal, cryotherapy, or electrodessication and curettage, chosen per lesion.",
      },
    ],
    image: "/images/svc-slide-glass.webp",
    imageAlt: "Prepared glass slides catching the light",
  },
  {
    slug: "nail-procedures",
    seoTitle: "Nail Surgery & Nail Biopsies in Plano, TX",
    name: "Nail Procedures & Nail Biopsies",
    summary:
      "Nail matrix surgery and nail-unit biopsies — including evaluation of streaks and growths under the nail.",
    body: [
      "The nail unit is one of the harder places on the body to evaluate and operate, and many practices do not offer nail surgery at all. Our surgeons perform nail procedures ranging from matrix surgery to biopsies of the nail bed and the skin beneath the nail.",
      "A nail biopsy matters most when there is a pigmented streak, a growth, or a non-healing change under or around a nail — changes that occasionally signal skin cancer, including melanoma of the nail unit. Biopsy gives an answer.",
    ],
    whenToConsider: [
      "A new or changing pigmented streak in a nail",
      "A growth or persistent sore under or beside a nail",
      "Nail changes your dermatologist wants evaluated at the source",
      "Recurrent ingrown or damaged nails needing matrix surgery",
    ],
    techniques: [
      {
        name: "Nail matrix surgery",
        note: "Surgery on the nail's growth plate, performed under local anesthetic.",
      },
      {
        name: "Nail-unit biopsy",
        note: "Sampling of the nail bed or surrounding skin, with pathology review.",
      },
    ],
    image: "/images/svc-microscope-detail.webp",
    imageAlt: "Macro detail of a laboratory microscope",
  },
  {
    slug: "eyelid-biopsies",
    seoTitle: "Eyelid Biopsies in Plano, TX",
    name: "Eyelid Biopsies",
    summary:
      "Careful sampling of suspicious eyelid lesions — delicate territory our surgeons work in routinely.",
    body: [
      "The eyelid is common ground for skin cancer and difficult ground for surgery: the skin is thin, the margin for error is small, and the cosmetic and functional stakes are high. It is also territory our surgeons know well, because eyelid skin cancers are regularly referred for Mohs surgery.",
      "An eyelid biopsy is a brief office procedure under local anesthetic that samples a suspicious lesion so pathology can give an answer. If cancer is found, treatment can proceed with the same team, with margin control and reconstruction planned together.",
    ],
    whenToConsider: [
      "A new or changing bump on the eyelid or lash line",
      "A sore or crusted area on the lid that does not heal",
      "Loss of lashes in one spot",
      "A lesion your optometrist, ophthalmologist, or dermatologist flagged",
    ],
    techniques: [
      {
        name: "Office biopsy under local anesthetic",
        note: "A small sample taken with the lid protected, sent for pathology review.",
      },
    ],
    image: "/images/svc-slide-glass.webp",
    imageAlt: "Prepared glass slides catching the light",
  },
  {
    slug: "lip-oral-biopsies",
    seoTitle: "Lip, Gum & Oral Biopsies in Plano, TX",
    name: "Lip & Oral Biopsies",
    summary:
      "Biopsies of the lip, gums, and tongue — for growths, and to help confirm inflammatory and autoimmune conditions.",
    body: [
      "Lesions of the mouth often fall between specialties: too far inside for many dermatologists, outside the territory of most physicians. Our surgeons perform biopsies of the lip, the gums, and the tongue as brief office procedures under local anesthetic.",
      "These biopsies do two different jobs. The first is diagnosing growths — a lump, sore, or patch that needs a name before it can be treated. The second is confirming inflammatory and autoimmune conditions: a biopsy can establish oral lichen planus, and a small sample from the inside of the lip — where the minor salivary glands sit — helps confirm Sjögren's syndrome. Either way, the tissue goes to pathology and you get an answer.",
    ],
    whenToConsider: [
      "A growth or lump on the lip, gums, or tongue",
      "A sore or patch in the mouth that does not heal",
      "White, lacy, or inflamed areas that may be lichen planus",
      "A lip biopsy recommended by your physician, dentist, or rheumatologist to help confirm Sjögren's syndrome",
    ],
    techniques: [
      {
        name: "Office biopsy under local anesthetic",
        note: "A small sample from the lip, gum, or tongue, taken comfortably and sent for pathology review.",
      },
      {
        name: "Lip biopsy for Sjögren's syndrome",
        note: "A small inner-lip sample of the minor salivary glands, read by pathology to support the diagnosis.",
      },
    ],
    image: "/images/svc-microscope-detail.webp",
    imageAlt: "Microscope objective in close detail",
  },
  {
    slug: "prp-hair-restoration",
    seoTitle: "PRP Hair Restoration & Hair Loss Treatment in Plano, TX",
    name: "Hair Loss & PRP",
    summary:
      "Hair loss treated holistically — clinical examination, laboratory workup, oral and topical medication, and platelet-rich plasma.",
    body: [
      "Hair loss is a medical problem before it is a cosmetic one, and we treat it that way. Evaluation starts with a physical and clinical examination of the scalp and hair and, where indicated, laboratory testing — because thyroid disease, iron deficiency, and other medical causes need to be found, not covered up.",
      "Treatment is then built from the tools with evidence behind them: oral medications, topical medications, and platelet-rich plasma (PRP). PRP is prepared from your own blood — a small sample is drawn and concentrated so the platelets, and the growth factors they carry, can be injected into the scalp where hair is thinning, typically over a series of sessions.",
      "PRP is one tool in a complete plan, not the whole plan. Whether it makes sense for you depends on the pattern and cause of your hair loss — that conversation comes first, and honest candidacy assessment is part of it.",
    ],
    whenToConsider: [
      "Thinning hair you want evaluated medically, not just treated cosmetically",
      "Androgenetic (pattern) hair loss, in men or women",
      "Hair loss that deserves a workup — labs, exam, and a diagnosis",
      "Early thinning you would like to address without surgery",
    ],
    techniques: [
      {
        name: "Clinical examination and laboratory workup",
        note: "Scalp and hair examination, with lab testing where indicated to find treatable medical causes.",
      },
      {
        name: "Oral and topical medical therapy",
        note: "Evidence-based medications, chosen for your pattern of loss and your health picture.",
      },
      {
        name: "PRP scalp injections",
        note: "Your own concentrated platelets, injected into thinning areas over a series of sessions.",
      },
    ],
    image: "/images/svc-surgical-light.webp",
    imageAlt: "Soft surgical light reflected in polished steel",
    // From the practice's own PRP brochure (crops per the brochure layout).
    gallery: [
      { before: "/images/prp/patient1-before.webp", after: "/images/prp/patient1-after.webp", label: "Patient 1" },
      { before: "/images/prp/patient2-before.webp", after: "/images/prp/patient2-after.webp", label: "Patient 2" },
    ],
  },
  {
    // Confirmed by Dr. Modi in chat 2026-08-02.
    slug: "skin-resurfacing",
    seoTitle: "CO2 Laser & Chemical Peel Skin Resurfacing in Plano, TX",
    name: "Skin Resurfacing",
    summary:
      "Fractional CO2 laser and full thickness chemical peels — for photo aging, actinic damage and pre-cancers, and facial rejuvenation.",
    body: [
      "Decades of sun leave a field of damage rather than a single spot: rough texture, uneven tone, fine lines, and scattered actinic keratoses — the precancerous lesions that can progress to squamous cell carcinoma. Resurfacing treats the entire field at once, removing the damaged outer layers so healthier skin can rebuild in their place.",
      "Dr. Modi uses two tools for this: fractional CO2 laser resurfacing, and medium-to-deep chemical peels with Jessner's solution and TCA. Both serve a double purpose. Medically, they are field treatment for photodamaged, precancer-prone skin. Aesthetically, the same treatments smooth texture, even tone, and soften fine lines — rejuvenation as a direct byproduct of treating the damage.",
      "Because these treatments are performed by a fellowship-trained skin cancer surgeon, anything suspicious found along the way is evaluated with a surgeon's eye — and the depth of each treatment is chosen deliberately for your skin and your goals.",
    ],
    whenToConsider: [
      "Widespread sun damage — rough, mottled, weathered skin",
      "Multiple or recurring actinic keratoses treated spot-by-spot until now",
      "A history of precancers and a desire to treat the whole field",
      "Aesthetic rejuvenation — texture, tone, and fine lines",
    ],
    techniques: [
      {
        name: "Fractional CO2 laser resurfacing",
        note: "Ablative laser resurfacing that treats a fraction of the skin per pass, stimulating collagen remodeling as the field heals.",
      },
      {
        name: "Jessner's + TCA chemical peels",
        note: "The classic medium-to-deep peel combination, applied in the office at a depth chosen for your skin and goals.",
      },
    ],
    image: "/images/svc-surgical-light.webp",
    imageAlt: "Soft surgical light reflected in polished steel",
  },
  {
    slug: "actinic-keratosis",
    seoTitle: "Actinic Keratosis Treatment in Plano, TX",
    name: "Actinic Keratosis",
    summary:
      "Treatment of precancerous sun-damage lesions before they can progress to squamous cell carcinoma.",
    body: [
      "Actinic keratoses are rough, scaly patches caused by years of sun — precancerous lesions, not yet cancer. Not every AK progresses, but some become squamous cell carcinoma, which is why persistent lesions deserve treatment.",
      "Small, early lesions are often handled with cryotherapy in the office. Thicker or stubborn lesions may warrant removal, and high-risk lesions in sensitive locations can be treated with margin control.",
    ],
    whenToConsider: [
      "Rough, scaly patches on sun-exposed skin that keep coming back",
      "A lesion that itches, bleeds, or has not resolved with creams",
      "A history of skin cancer with new sun-damage spots",
    ],
    techniques: [
      {
        name: "Cryotherapy",
        note: "Freezing of small, early lesions in the office.",
      },
      {
        name: "Excision or Mohs for high-risk lesions",
        note: "Thicker, persistent, or sensitively-located lesions may warrant surgical removal.",
      },
    ],
    image: "/images/svc-histology-art.webp",
    imageAlt: "Stained tissue section as abstract art",
  },
  {
    slug: "melanoma",
    seoTitle: "Mohs Surgery for Melanoma in Plano, TX",
    seoDescription: "Same-day Mohs surgery for melanoma with MART-1 and SOX10 immunostaining read in our own Plano laboratory - removal, margin control, and reconstruction in one visit. (972) 378-0620.",
    name: "Melanoma",
    summary:
      "The most serious common skin cancer — treated here with same-day, margin-controlled Mohs surgery for appropriate cases.",
    body: [
      "Melanoma arises from the skin's pigment cells and is the most serious of the common skin cancers, because it can spread if it is not treated early. It usually announces itself as a mole that changes — in size, shape, or color — or a new spot that stands out from the rest.",
      "For appropriate melanomas, we offer what few practices can: same-day, margin-controlled Mohs surgery with immunohistochemical staining — MART-1 and SOX10 — run in our own laboratory. The cancer is removed, every margin is tested, and once the margins are clear the wound is reconstructed, all in one visit. Wide local excision remains the right operation for some melanomas, and when a deeper melanoma calls for sentinel lymph node evaluation or additional specialists, we coordinate that care.",
      "Your surgeon will recommend the approach that fits your melanoma — its depth, its location, and you.",
    ],
    whenToConsider: [
      "A mole changing in size, shape, or color",
      "A spot with irregular borders or multiple colors",
      "A new or changing spot that stands out from your other moles",
      "A biopsy-confirmed melanoma referred for surgery",
    ],
    techniques: [
      {
        name: "Same-day Mohs surgery with immunostains",
        note: "MART-1 and SOX10 staining in our own laboratory — margin-controlled, tissue-sparing removal for appropriate melanomas.",
      },
      {
        name: "Wide local excision",
        note: "The standard operation for melanomas where conventional margins are the right approach.",
      },
      {
        name: "Coordinated escalation when indicated",
        note: "Sentinel lymph node evaluation and referrals to medical oncology, arranged and followed by our team.",
      },
    ],
    image: "/images/svc-histology-art.webp",
    imageAlt: "Stained tissue section as abstract art",
  },
  {
    slug: "basal-cell-carcinoma",
    seoTitle: "Basal Cell Carcinoma Treatment & Mohs Surgery in Plano, TX",
    seoDescription: "Mohs micrographic surgery for basal cell carcinoma in Plano, TX - margins read on site, cure rates up to 99% for previously untreated cancers, same-day reconstruction.",
    name: "Basal Cell Carcinoma",
    summary:
      "The most common skin cancer — slow to spread, but destructive locally. Mohs offers the most precise removal.",
    body: [
      "Basal cell carcinoma is the most common type of skin cancer. It typically develops on sun-exposed skin, grows slowly, and rarely spreads to other parts of the body — but left untreated it can be locally destructive, especially on the face.",
      "For most basal cell carcinomas, Mohs micrographic surgery is the most precise treatment: the cancer is removed layer by layer with 100% of the margin examined on site, sparing as much healthy tissue as possible. Cure rates are up to 99% for previously untreated cancers.",
    ],
    whenToConsider: [
      "A new bump that looks pearly, shiny, or translucent",
      "A sore that does not heal, or heals and returns",
      "A scar-like or flat, flesh-colored area that changes over time",
      "A biopsy-confirmed basal cell carcinoma referred for surgery",
    ],
    techniques: [
      {
        name: "Mohs micrographic surgery",
        note: "Layer-by-layer removal with complete margin examination — the most tissue-sparing option.",
      },
      {
        name: "Excision with margins",
        note: "Conventional excision where Mohs is not indicated.",
      },
    ],
    image: "/images/svc-microscope-detail.webp",
    imageAlt: "Macro detail of a laboratory microscope",
  },
  {
    slug: "squamous-cell-carcinoma",
    seoTitle: "Squamous Cell Carcinoma Treatment & Mohs Surgery in Plano, TX",
    seoDescription: "Mohs surgery for squamous cell carcinoma in Plano, TX by fellowship-trained surgeons - full margin control, high-risk tumors immunostained in our own laboratory.",
    name: "Squamous Cell Carcinoma",
    summary:
      "The second most common skin cancer — treated promptly because it can spread. High-risk tumors get immunostained margin control.",
    body: [
      "Squamous cell carcinoma often develops on sun-exposed areas — face, ears, neck, hands. Unlike basal cell carcinoma, SCC can occasionally spread to other parts of the body, which makes timely treatment important.",
      "Mohs surgery is the treatment of choice for high-risk or cosmetically sensitive locations. For aggressive, poorly-defined tumors, our on-site immunohistochemical staining traces the cancer to its true margins — the same laboratory capability we use for melanoma.",
    ],
    whenToConsider: [
      "A firm red bump or nodule on sun-exposed skin",
      "A scaly or crusted patch that grows or bleeds",
      "A sore that does not heal",
      "A biopsy-confirmed SCC referred for surgery",
    ],
    techniques: [
      {
        name: "Mohs micrographic surgery",
        note: "Margin-controlled removal, preferred for high-risk and cosmetically sensitive sites.",
      },
      {
        name: "Immunostained margin control",
        note: "On-site immunohistochemical staining for aggressive, hard-to-define tumors.",
      },
    ],
    image: "/images/svc-slide-glass.webp",
    imageAlt: "Prepared glass slides catching the light",
  },
  {
    slug: "sebaceous-carcinoma",
    seoTitle: "Sebaceous Carcinoma Treatment in Plano, TX",
    name: "Sebaceous Carcinoma",
    summary:
      "A rare, aggressive cancer of the skin's oil glands — often on the eyelid, often mistaken for a stye — treated with margin-controlled surgery.",
    body: [
      "Sebaceous carcinoma arises from the skin's oil glands, most often on the eyelids of older adults. Its reputation comes from disguise: it can look like a stye or chalazion that never resolves, or a patch of chronic eyelid irritation, and the delay that causes is the dangerous part.",
      "Because it can spread within the skin beyond what the eye can see, margin-controlled excision is central to treating it well. Our surgeons examine the margins microscopically during surgery, and eyelid work of this kind is territory they operate in routinely — with reconstruction planned by the same team.",
    ],
    whenToConsider: [
      "A stye or chalazion that keeps coming back in the same spot",
      "A firm, painless eyelid nodule that slowly enlarges",
      "Persistent one-sided eyelid inflammation that resists treatment",
      "A biopsy-confirmed sebaceous carcinoma referred for surgery",
    ],
    techniques: [
      {
        name: "Mohs micrographic surgery",
        note: "Margin-controlled removal, tissue-sparing where every millimeter matters — as on the eyelid.",
      },
      {
        name: "Coordinated reconstruction",
        note: "Repair planned with the excision, by surgeons who reconstruct eyelids regularly.",
      },
    ],
    image: "/images/svc-slide-glass.webp",
    imageAlt: "Prepared glass slides catching the light",
  },
  {
    slug: "dermatofibrosarcoma-protuberans",
    seoTitle: "DFSP Treatment (Dermatofibrosarcoma Protuberans) in Plano, TX",
    name: "Dermatofibrosarcoma Protuberans (DFSP)",
    summary:
      "A rare cancer of the deeper skin that spreads by root-like extensions — the problem margin-controlled surgery was built to solve.",
    body: [
      "DFSP begins in the deeper layer of the skin as a firm, slowly enlarging plaque or nodule, often on the trunk or shoulders, and often present for years before diagnosis. It rarely spreads to other organs — its danger is local: it sends out root-like extensions well beyond the visible edge of the tumor.",
      "That growth pattern is exactly what margin-controlled surgery exists for. Standard excision judged by eye leaves those roots behind; examining the full margin under the microscope lets the surgeon follow every extension to its end before closing.",
    ],
    whenToConsider: [
      "A firm, slowly growing plaque or nodule, often on the trunk or shoulder",
      "A scar-like patch that thickens or becomes raised over time",
      "A biopsy-confirmed DFSP referred for margin-controlled excision",
    ],
    techniques: [
      {
        name: "Mohs micrographic surgery",
        note: "Complete margin examination that follows DFSP's root-like extensions to their true end.",
      },
      {
        name: "Coordinated reconstruction",
        note: "Larger defects planned and repaired by the same surgical team.",
      },
    ],
    image: "/images/svc-microscope-detail.webp",
    imageAlt: "Microscope objective in close detail",
  },
  {
    slug: "atypical-fibroxanthoma",
    seoTitle: "Atypical Fibroxanthoma (AFX) Treatment in Plano, TX",
    name: "Atypical Fibroxanthoma (AFX)",
    summary:
      "A rare tumor of heavily sun-damaged skin — scalp, ears, face — where complete margin-controlled removal is the standard of care.",
    body: [
      "Atypical fibroxanthoma appears on heavily sun-damaged skin, usually the scalp, ears, or face of older patients — often as a rapidly growing, sometimes bleeding nodule. It typically behaves locally, and treated properly the outlook is good.",
      "Treated properly means removed completely. Complete margin-controlled excision is the standard of care, and on the thin, sun-worn skin of the scalp and ears, the tissue-sparing precision of Mohs surgery earns its keep twice: once in clearing the tumor, and again in leaving enough healthy tissue for a clean repair.",
    ],
    whenToConsider: [
      "A new, rapidly growing nodule on the scalp, ear, or face",
      "A sore or lump on sun-damaged skin that bleeds easily",
      "A biopsy-confirmed AFX referred for surgery",
    ],
    techniques: [
      {
        name: "Mohs micrographic surgery",
        note: "Margin-controlled, tissue-sparing removal on thin, sun-damaged skin.",
      },
      {
        name: "Reconstruction of scalp and ear defects",
        note: "Repair matched to the site, performed by the same team.",
      },
    ],
    image: "/images/svc-histology-art.webp",
    imageAlt: "Stained tissue section as seen under magnification",
  },
  {
    slug: "microcystic-adnexal-carcinoma",
    seoTitle: "Microcystic Adnexal Carcinoma Treatment in Plano, TX",
    name: "Microcystic Adnexal Carcinoma (MAC)",
    summary:
      "A rare sweat-gland cancer of the central face that runs far deeper and wider than it appears — margin control is what catches it.",
    body: [
      "Microcystic adnexal carcinoma is a rare, slow-growing cancer of the sweat-gland structures, most often around the lips and central face. On the surface it can look small and innocent — a firm patch or subtle thickening — while infiltrating far more widely and deeply than it appears, often along nerves.",
      "That mismatch between what shows and what is there makes complete margin examination especially valuable. Mohs surgery reads the entire margin under the microscope during the procedure, following the tumor's true extent rather than its visible footprint, on the part of the body where sparing every millimeter of healthy tissue matters most.",
    ],
    whenToConsider: [
      "A firm, slowly enlarging patch or thickening near the lips or central face",
      "Numbness or tingling around a subtle skin change",
      "A biopsy-confirmed MAC referred for margin-controlled excision",
    ],
    techniques: [
      {
        name: "Mohs micrographic surgery",
        note: "Full margin examination that tracks deep and nerve-associated extension the eye cannot see.",
      },
      {
        name: "Facial reconstruction",
        note: "Central-face repair planned with the excision by the same surgical team.",
      },
    ],
    image: "/images/svc-slide-glass.webp",
    imageAlt: "Prepared glass slides catching the light",
  },
  {
    slug: "extramammary-paget-disease",
    seoTitle: "Extramammary Paget's Disease Treatment in Plano, TX",
    name: "Extramammary Paget's Disease (EMPD)",
    summary:
      "A rare cancer that masquerades as a stubborn rash in delicate areas — indistinct edges make margin-controlled surgery the right tool.",
    body: [
      "Extramammary Paget's disease is a rare, slow-growing cancer of apocrine-gland-rich skin, typically in the genital or perianal area. It often looks like a stubborn rash or eczema — itching, redness, scale — and is commonly treated as one for years before a biopsy gives the real answer. If that story sounds familiar, no part of it is your fault; this disease is a known master of disguise.",
      "Its edges are indistinct: the cancer routinely extends well beyond the visible rash. That is why margin-controlled surgery earns its keep here — the entire margin is examined microscopically, so the surgery ends where the disease actually ends, not where it appears to. Care in these areas is handled with the discretion and respect it deserves.",
    ],
    whenToConsider: [
      "A persistent itchy, red, or scaly patch in the groin, genital, or perianal area",
      "A \"rash\" that has not responded to creams over months",
      "A biopsy-confirmed EMPD referred for margin-controlled excision",
    ],
    techniques: [
      {
        name: "Margin-controlled excision",
        note: "Microscopic examination of the full margin, so surgery ends where the disease truly ends.",
      },
      {
        name: "Coordinated care",
        note: "Reconstruction and any additional specialty care arranged by our team.",
      },
    ],
    image: "/images/svc-microscope-detail.webp",
    imageAlt: "Microscope objective in close detail",
  },
  {
    slug: "pilonidal-cyst-surgery",
    seoTitle: "Pilonidal Cyst Surgery & Bascom Cleft Lift in Plano, TX",
    seoDescription: "The Bascom cleft lift for pilonidal disease in Plano, TX - outpatient surgery that fixes the infection and the anatomy, with 95-97% success in published series.",
    name: "Pilonidal Disease & the Bascom Cleft Lift",
    summary:
      "Definitive surgery for pilonidal disease — a lift and a shift that fixes the infection, the wound, and the anatomy that caused it.",
    body: [
      "Pilonidal disease is usually called a cyst. It is really an infection: abscesses and sinus tracts near the tailbone, where hair and debris work into the deep cleft between the buttocks and the area cannot heal. The result is a cycle — painful flare-up, drainage, wait for the next one.",
      "Two things are worth saying plainly. It is nobody's fault: the cause is anatomy, hair, friction, and often heredity — not hygiene — and almost no one talks about it. And it is miserable. Sitting hurts. Many patients quietly plan their lives around it for years. You do not have to.",
      "Traditional excision removes the infection but leaves the deep cleft that caused it, which is why the disease so often returns. The Bascom cleft lift is a lift and a shift: diseased tissue out, the closure shifted off the midline to skin that actually heals, and the cleft flattened so nothing traps hair and moisture again. Disease, infection, and anatomy — fixed in one outpatient operation, successful in 95 to 97 percent of patients in large published series.",
    ],
    whenToConsider: [
      "Recurring abscesses or drainage near the tailbone",
      "A pilonidal wound from previous surgery that has never fully healed",
      "Disease that has come back after excision or other procedures",
      "Pain with sitting that you have been told to live with",
    ],
    techniques: [
      {
        name: "Bascom cleft lift",
        note: "The definitive repair: diseased tissue removed, closure shifted off the midline, cleft flattened so the disease has nowhere to return.",
      },
      {
        name: "Drainage of an acute abscess",
        note: "An acutely infected abscess is drained first for relief; the cleft lift then addresses the cause once things settle.",
      },
    ],
    faqs: [
      {
        question: "What kind of anesthesia is used for a cleft lift?",
        answer: "General anesthesia is the most common approach — it is the safest way to keep you comfortable while you are positioned face-down for the operation. Your surgeon will go over the anesthesia plan with you before anything is scheduled.",
      },
      {
        question: "Will I have a drain afterward?",
        answer: "Usually, yes. A small drain exits the skin well away from the incision and empties into a self-contained bulb that you empty a few times a day. It typically stays in for about two days, and removing it is quick and simple.",
      },
      {
        question: "What does wound care look like?",
        answer: "Minimal — and that is much of the point. The incision is closed with dissolvable sutures and skin glue: no open wound, no daily packing. Most patients can shower the day after surgery.",
      },
      {
        question: "Can I sit after the operation?",
        answer: "Yes — sitting is not just allowed, it is encouraged, starting the day after surgery on a cushioned but supportive surface. Gentle pressure on the area actually helps the healing tissue settle.",
      },
      {
        question: "How painful is the recovery?",
        answer: "Generally much milder than patients expect — most discomfort is managed with simple oral medication in the first days. The chronic pain of the disease itself, by contrast, is what patients are usually gladdest to be rid of.",
      },
      {
        question: "How much time will I need off work or school?",
        answer: "Most patients are back within a few days. If your work involves prolonged sitting or heavy lifting, plan on one to two weeks. Your surgeon will tailor this to what you actually do all day.",
      },
      {
        question: "When can I exercise again?",
        answer: "Walking is encouraged from the first week. More vigorous activity — running, swimming — typically resumes once the drain is out, and full unrestricted exercise follows complete healing, usually within three to six weeks.",
      },
      {
        question: "What will the area look like afterward?",
        answer: "A gently curved scar that sits off to the side of the midline, and a cleft that is noticeably shallower and flatter than before. That reshaping is not a side effect — it is the treatment, and it is why the disease does not come back.",
      },
    ],
    comparison: {
      title: "Traditional excision vs. the Bascom cleft lift",
      columns: ["Simple (midline) excision", "Bascom cleft lift"],
      rows: [
        {
          label: "What it addresses",
          a: "Removes the infected tissue, but the deep midline cleft — the cause — remains.",
          b: "Removes the disease and reshapes the cleft, so the cause is corrected too.",
        },
        {
          label: "Where the wound sits",
          a: "In the midline crease — the most difficult place on the body for a wound to heal.",
          b: "Shifted off the midline to healthy, well-aired skin that heals reliably.",
        },
        {
          label: "Healing",
          a: "Open wounds commonly take months, often with daily packing and dressing changes.",
          b: "Typically heals in weeks, with simple dressings and no packing.",
        },
        {
          label: "Setting",
          a: "Frequently a hospital operation.",
          b: "Outpatient — you go home the same day.",
        },
        {
          label: "Chance of cure",
          a: "Recurrence reported as high as 30-50% in published series.",
          b: "95-97% success in large published series, including recurrent disease.",
        },
      ],
      note: "Figures reflect ranges reported in the published surgical literature and patient-advocacy resources for midline excision and the Bascom cleft lift; individual results vary, and your surgeon will discuss what applies to you.",
    },
    image: "/images/pilonidal-illustration.webp",
    imageAlt: "Illustration of the cleft lift concept",
  },
];

export function getProcedure(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}
