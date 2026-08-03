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
};

export const procedures: Procedure[] = [
  {
    slug: "cyst-removal",
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
    slug: "prp-hair-restoration",
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
    name: "Basal Cell Carcinoma",
    summary:
      "The most common skin cancer — slow to spread, but destructive locally. Mohs offers the most precise removal.",
    body: [
      "Basal cell carcinoma is the most common type of skin cancer. It typically develops on sun-exposed skin, grows slowly, and rarely spreads to other parts of the body — but left untreated it can be locally destructive, especially on the face.",
      "For most basal cell carcinomas, Mohs micrographic surgery is the most precise treatment: the cancer is removed layer by layer with 100% of the margin examined on site, sparing as much healthy tissue as possible. Cure rates reach 99% for previously untreated cancers.",
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
];

export function getProcedure(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}
