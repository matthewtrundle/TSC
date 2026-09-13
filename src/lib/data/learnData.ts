// =============================================================================
// PATIENT EDUCATION ARTICLES (/learn)
//
// Traffic-driving educational pages: each answers a question patients actually
// type into a search engine, then routes readers to the relevant services.
//
// Content-integrity rules apply in full (see planoderm-site skill and
// docs/decisions/medical-focus.md): every clinical claim here was confirmed
// by Dr. Modi in chat 2026-08-30, and every reference is a verified, real
// publication. Nothing may be added to this file without the same sign-off.
// =============================================================================

export type Article = {
  slug: string;
  /** The question, as people search it — rendered as the H1. */
  title: string;
  seoTitle: string;
  seoDescription: string;
  /** Short line for index cards. */
  summary: string;
  /** The featured-snippet block: a direct answer, first thing on the page. */
  shortAnswer: string;
  sections: {
    heading: string;
    paragraphs: string[];
    /** Optional list rendered after the paragraphs, hairline-divided. */
    list?: string[];
    /** Optional chart rendered after the paragraphs/list — see
     *  components/ui/MelanomaCharts.tsx. Every figure is drawn only from
     *  numbers printed in a verified publication cited in `references`. */
    figure?: "melanoma-survival" | "melanoma-icon-array" | "melanoma-recurrence";
  }[];
  faqs: { question: string; answer: string }[];
  references: { label: string; url: string }[];
  image: string;
  imageAlt: string;
  /** Real photographs (e.g. the practice's own histology slides) render in
   *  full color; evocative imagery stays duotone. */
  imageColor?: boolean;
  /** ISO dates for the article schema and the byline. */
  datePublished: string;
  dateModified: string;
  /** Slugs under /services the article should point readers toward. */
  relatedProcedures: string[];
  /** Heading + lead for the related-services band (defaults suit wound care). */
  relatedHeading?: string;
  relatedLead?: string;
  /** Closing line of the body (defaults to the wound-care line). */
  disclaimer?: string;
};

export const articles: Article[] = [
  {
    slug: "mohs-surgery-for-melanoma",
    title: "Can Mohs Surgery Be Used for Melanoma?",
    seoTitle: "Can Mohs Surgery Be Used for Melanoma? What the Research Shows",
    seoDescription:
      "Yes, for selected melanomas. A Plano Mohs surgeon explains how Mohs compares with wide excision, what the recurrence and survival studies actually show, and who may be a candidate. Plain English, with charts.",
    summary:
      "Yes, for selected melanomas. Here is how Mohs compares with wide excision, what the recurrence and survival studies show, and who may be a candidate.",
    shortAnswer:
      "Yes. Mohs surgery is an established option for selected melanoma in situ, especially the lentigo maligna type on the face and scalp, and experienced teams also use it for selected thin invasive melanomas. At this practice we offer same-day Mohs for appropriate cases of both. Mohs is designed to examine the complete outer and deep edges of the removed tissue, using special stains that make pigment cells visible. Published studies report low rates of melanoma returning at the treated spot, and some large registry studies have found better survival among patients treated with Mohs, though none of them can prove Mohs caused the difference. Wide local excision remains the standard operation for invasive melanoma and is the right choice for many patients.",
    sections: [
      {
        heading: "How melanoma surgery usually works",
        paragraphs: [
          "The standard operation for melanoma is **wide local excision**. The surgeon removes the biopsy site and any remaining melanoma together with a measured border of normal-looking skin. For invasive melanoma that border is usually one to two centimeters, roughly three-eighths to three-quarters of an inch, depending on how thick the melanoma is. Melanoma in situ usually starts with a smaller planned margin, though some need more skin removed to clear their edges.",
          "The tissue goes to a pathology laboratory, where sections are examined to describe the tumor and check whether it reaches the edges of the specimen. Results usually take several days. Wide excision is the guideline-recommended standard for invasive melanoma and works well for many patients. Standard pathology samples the edges rather than examining the complete outer and deep margins the way Mohs does. If melanoma is found at an edge, another operation may be needed.",
        ],
      },
      {
        heading: "How Mohs surgery for melanoma is different",
        paragraphs: [
          "During Mohs, the surgeon removes the tissue in carefully mapped stages. The **outer and deep edges** of each stage are prepared and examined under the microscope while you wait. If melanoma is found at an edge, the surgeon removes another thin layer from exactly that spot and checks again. Repair is planned once the examined margins are clear.",
          "Melanoma Mohs needs specialized laboratory methods. Special stains, **MART-1 and SOX10**, highlight melanocytes, the pigment cells melanoma arises from. The stains highlight normal pigment cells too, so the surgeon reads the pattern, the number, and the arrangement of the stained cells to judge whether melanoma is present. Our laboratory runs these stains in-house during your surgery, which is what makes same-day margin assessment possible. Appropriate cases have removal and repair in the same visit; some need additional testing or a different repair plan.",
          "Checking mapped margins also helps preserve healthy skin while the melanoma is removed. That matters most near the eyes, nose, lips, and ears, where extra tissue removal affects function and repair. The central tumor tissue is examined separately to confirm depth and the other features that guide staging. Occasionally this shows a higher stage than the original biopsy suggested and changes the plan. In one published Mohs series, 5.5 percent of melanomas were upstaged this way, and almost all were identified before repair.",
        ],
      },
      {
        heading: "Recurrence: what the numbers show",
        paragraphs: [
          "Many studies of melanoma Mohs focus on **local recurrence**, meaning melanoma returning at the treated spot. A 2022 systematic review pooled 71 published studies covering 16,575 patients. The pooled local recurrence estimates were about 7 percent after wide local excision, 3 percent after staged excision, and less than 1 percent after Mohs. Staged excision also uses mapped margins, usually with laboratory processing that takes longer. The studies included different tumors and follow-up periods, so these figures are a pattern across the literature, not a direct comparison of otherwise identical patients.",
          "Several individual Mohs series report low local recurrence too, although they have no wide-excision group to compare against. In a multicenter study of 785 invasive melanomas of the head and neck treated with Mohs and MART-1 staining, four local recurrences were reported, about half of one percent, over a twelve-year study period. Another series reported seven local recurrences among 1,419 primary melanomas, again about half of one percent. In a separate single-center study of melanoma in situ, estimated five-year recurrence was 1.1 percent after Mohs and 4.1 percent after wide excision, a difference that was not statistically conclusive.",
        ],
        figure: "melanoma-recurrence",
      },
      {
        heading: "Survival: the newest evidence",
        paragraphs: [
          "Keeping melanoma from returning at the treated spot is important, but it is not the same as preventing spread or death. Survival comparisons between Mohs and wide excision come from observational studies, which can show an association but cannot prove that the operation caused a difference.",
          "A 2026 study used the U.S. SEER cancer registry to compare melanoma-specific survival after Mohs and after wide excision in more than 90,000 patients with invasive melanoma treated between 2000 and 2020. The reported five-year melanoma-specific survival was **93 percent after Mohs and 88 percent after wide excision**. At ten years it was 88 percent and 83 percent. These figures count deaths attributed to melanoma, not deaths from all causes, and they were not adjusted for the differences between the two groups. The authors also reported that an association favoring Mohs remained after statistical adjustment, but adjustment cannot make the groups fully comparable.",
        ],
        figure: "melanoma-survival",
      },
      {
        heading: "The same estimates, shown with 100 squares",
        paragraphs: [
          "The display below shows the same survival estimates in another form. Each square is one percentage point, not an individual patient. The gap is five percentage points at both time points. That does not tell us how many lives either operation saved.",
        ],
        figure: "melanoma-icon-array",
      },
      {
        heading: "What this study can and cannot tell you",
        paragraphs: [
          "This was a registry study, not a randomized trial, and the two groups were not the same to begin with. Patients treated with Mohs generally had thinner, earlier-stage tumors, more often on the head and neck, and more often of the lentigo maligna melanoma subtype. Statistical adjustment tries to account for the differences that were measured, but important differences can remain, including overall health and the other care each patient received. The authors describe their finding as a potential advantage that deserves confirmation in prospective studies, and we agree.",
          "Other registry studies give useful context, though several drew on overlapping years of the same national database and should not be counted as fully independent confirmations. A 2019 study of stage I invasive melanoma and a 2020 study of head and neck melanoma both reported better overall survival among patients treated with Mohs. Overall survival includes deaths from all causes, so general health can influence those results. A 2021 study of melanoma on the trunk and limbs found no statistically significant survival difference between the two operations.",
          "Taken together, these studies support considering Mohs for appropriately selected melanomas. They do not prove that Mohs is better than wide excision for survival, and they do not prove the two are equivalent. The choice depends on the melanoma's features, its location, what staging it needs, and the expertise available.",
        ],
      },
      {
        heading: "Who may be a candidate",
        paragraphs: [
          "Mohs may be considered when a melanoma's borders are hard to define or when preserving nearby healthy skin matters. These are reasons for an assessment, not automatic eligibility:",
        ],
        list: [
          "Selected melanoma in situ, including lentigo maligna, especially on the face, scalp, ears, and neck, where the cancer often extends beyond its visible edge",
          "Selected thin invasive melanomas in areas where preserving tissue helps protect function or simplify repair, after reviewing tumor depth and any need for lymph node evaluation",
          "Some melanomas with tumor remaining at a previous surgical margin, or a local recurrence, after the diagnosis and stage have been reassessed",
          "Melanomas with poorly defined borders",
        ],
      },
      {
        heading: "When wide excision is the right choice",
        paragraphs: [
          "Wide local excision remains the standard operation for invasive melanoma and is often the most appropriate approach, including for many melanomas on the trunk and limbs. Tumor thickness and other pathology findings determine whether a **sentinel lymph node biopsy** should be discussed. If melanoma has already been found in a lymph node, that calls for a separate staging and treatment plan. We recommend, or coordinate, whatever care your melanoma needs.",
          "The decision weighs tumor thickness, ulceration and other pathology findings, location, lymph node evaluation, your health, and your preferences. Your surgeon will explain the recommendation and bring in another specialist when that is the right thing to do.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Mohs surgery safe for melanoma?",
        answer:
          "Mohs can be an appropriate treatment for carefully selected melanomas when performed by a team experienced in melanoma surgery and in reading melanoma margins. Published studies report low local recurrence and generally similar or better observed survival compared with wide excision, but they do not prove equal or superior survival. Our approach uses specialized stains and full margin examination. As with any surgery, risks include bleeding, infection, scarring, and the possibility of additional treatment.",
      },
      {
        question: "Does Mohs have a higher cure rate for melanoma?",
        answer:
          "There is no single proven cure-rate advantage for Mohs across all melanomas. A large review found lower pooled rates of melanoma returning at the treated spot after Mohs, but the studies included different patients and follow-up periods. Local recurrence is only one outcome; it does not measure spread or death. Some registry studies found better survival among patients selected for Mohs, but they cannot prove that Mohs caused the difference.",
      },
      {
        question: "Why doesn't every surgeon use Mohs for melanoma?",
        answer:
          "Wide excision is the standard treatment for invasive melanoma and is appropriate for many patients. Melanoma Mohs also requires specialized laboratory support, with immunostains run on frozen tissue during the surgery, and experience interpreting melanoma margins. Its role depends on the tumor and on the expertise available. Neither operation replaces appropriate staging, lymph node evaluation, or other treatment when those are needed.",
      },
      {
        question: "Will I still need a sentinel lymph node biopsy?",
        answer:
          "Possibly. A sentinel lymph node biopsy checks the first lymph node or nodes that drain the area of the melanoma. Whether it should be discussed depends mainly on tumor thickness, ulceration, and other findings on your pathology report, not on which operation removes the skin cancer. When it is indicated, we coordinate the evaluation with the appropriate specialist and plan its timing with your skin surgery.",
      },
      {
        question: "What if my melanoma is on my back or leg, not my face?",
        answer:
          "Mohs may still be considered for selected cases, including some melanoma in situ, and published Mohs series in these locations report low local recurrence. But a large registry study found no statistically significant survival difference between Mohs and wide excision on the trunk and limbs. Wide excision remains the standard for invasive melanoma there and is often the straightforward choice.",
      },
      {
        question: "How long does Mohs surgery for melanoma take?",
        answer:
          "Plan to keep the day available. Each stage takes about an hour including tissue processing, and the immunostains add time compared with routine Mohs. Most tumors are clear in one to two stages, but some melanomas need more. Many patients have their wound repaired the same day; final pathology, the size or location of the wound, or other treatment needs can change that plan. Your team will tell you what to expect.",
      },
    ],
    references: [
      {
        label:
          "Sharma D, Taylor MA, Thomas S, Farberg A, Voss VB. Improved disease-specific outcomes in invasive cutaneous melanomas treated with Mohs surgery compared to wide local excision. Archives of Dermatological Research. 2026;318:242.",
        url: "https://doi.org/10.1007/s00403-026-04680-x",
      },
      {
        label:
          "Pride RLD, et al. Local recurrence of melanoma is higher after wide local excision versus Mohs micrographic surgery or staged excision: a systematic review and meta-analysis. Dermatologic Surgery. 2022;48(2):164–170.",
        url: "https://pubmed.ncbi.nlm.nih.gov/34889212/",
      },
      {
        label:
          "Cheraghlou S, et al. Comparison of survival after Mohs micrographic surgery vs wide margin excision for early-stage invasive melanoma. JAMA Dermatology. 2019;155(11):1252–1259.",
        url: "https://pubmed.ncbi.nlm.nih.gov/31553403/",
      },
      {
        label:
          "Hanson J, et al. Improved overall survival of melanoma of the head and neck treated with Mohs micrographic surgery versus wide local excision. Journal of the American Academy of Dermatology. 2020;82(1):149–155.",
        url: "https://pubmed.ncbi.nlm.nih.gov/31473297/",
      },
      {
        label:
          "Demer AM, et al. Association of Mohs micrographic surgery vs wide local excision with overall survival outcomes for patients with melanoma of the trunk and extremities. JAMA Dermatology. 2021;157(1):84–89.",
        url: "https://pubmed.ncbi.nlm.nih.gov/33084853/",
      },
      {
        label:
          "Beal BT, et al. Outcomes of invasive melanoma of the head and neck treated with Mohs micrographic surgery: a multicenter study. Journal of the American Academy of Dermatology. 2023;89(3):544–550.",
        url: "https://pubmed.ncbi.nlm.nih.gov/36642331/",
      },
      {
        label:
          "Valentín-Nogueras SM, et al. Mohs micrographic surgery using MART-1 immunostain in the treatment of invasive melanoma and melanoma in situ. Dermatologic Surgery. 2016;42(6):733–744.",
        url: "https://pubmed.ncbi.nlm.nih.gov/27158886/",
      },
      {
        label:
          "Etzkorn JR, et al. Low recurrence rates for in situ and invasive melanomas using Mohs micrographic surgery with MART-1 immunostaining: tissue processing methodology to optimize pathologic staging and margin assessment. Journal of the American Academy of Dermatology. 2015;72(5):840–850.",
        url: "https://pubmed.ncbi.nlm.nih.gov/25774012/",
      },
      {
        label:
          "Nosrati A, et al. Outcomes of melanoma in situ treated with Mohs micrographic surgery compared with wide local excision. JAMA Dermatology. 2017;153(5):436–441.",
        url: "https://pubmed.ncbi.nlm.nih.gov/28241261/",
      },
      {
        label:
          "Stigall LE, Brodland DG, Zitelli JA. The use of Mohs micrographic surgery for melanoma in situ of the trunk and proximal extremities. Journal of the American Academy of Dermatology. 2016;75(5):1015–1021.",
        url: "https://pubmed.ncbi.nlm.nih.gov/27473456/",
      },
      {
        label:
          "Swetter SM, et al. Guidelines of care for the management of primary cutaneous melanoma. Journal of the American Academy of Dermatology. 2019;80(1):208–250.",
        url: "https://pubmed.ncbi.nlm.nih.gov/30392755/",
      },
    ],
    image: "/images/ihc/mart1-03.webp",
    imageAlt:
      "Microscope image of a Mohs tissue section stained with MART-1, used to assess melanoma margins, from the practice's own laboratory",
    imageColor: true,
    datePublished: "2026-09-13",
    dateModified: "2026-09-13",
    relatedProcedures: ["melanoma", "basal-cell-carcinoma", "squamous-cell-carcinoma"],
    relatedHeading: "If you have been diagnosed with melanoma",
    relatedLead:
      "Removing skin cancer with the margins checked is what this practice does all day, every day. We treat melanoma and the other common skin cancers, and we will tell you plainly which operation fits yours.",
    disclaimer:
      "This page is general education, not medical advice for your specific situation. Published study results are not a prediction or a guarantee of your outcome; the right operation for a melanoma depends on its depth, its location, and your health. If you have a new diagnosis and want a straight answer about your options, call us at",
  },
  {
    slug: "neosporin-on-wounds",
    title: "Should You Put Neosporin on a Wound?",
    seoTitle: "Should You Put Neosporin on a Wound? A Dermatologist Answers",
    seoDescription:
      "Dermatologists usually say no: Neosporin's antibiotics are among the most common causes of allergic skin rashes, and plain petrolatum protects a clean wound just as well. Here is what to use instead.",
    summary:
      "Probably not. Two of its three antibiotics are among the most common causes of allergic skin rashes — and for a clean wound, plain petrolatum works just as well.",
    shortAnswer:
      "For most clean wounds, no. Dermatologists generally recommend plain petrolatum (plain Vaseline) instead. Two of Neosporin's antibiotics — neomycin and bacitracin — are among the most common causes of allergic contact dermatitis, an itchy rash that is easily mistaken for a wound infection. For clean wounds, research shows the antibiotic adds no protection that plain petrolatum does not already provide.",
    sections: [
      {
        heading: "Why dermatologists say no",
        paragraphs: [
          "Neosporin is a triple antibiotic ointment: **neomycin, bacitracin, and polymyxin B**. Two of the three are notorious in dermatology. Neomycin and bacitracin rank among the most common causes of allergic contact dermatitis in the United States — each has been named Allergen of the Year by the American Contact Dermatitis Society (bacitracin in 2003, neomycin in 2010), a designation created to draw attention to allergens doing outsized harm.",
          "The allergy does not always show up the first time. Sensitivity builds with repeated exposure — so an ointment that seemed fine for years can one day produce a red, itchy, weeping rash exactly where you applied it.",
        ],
      },
      {
        heading: "The rash that looks like an infection",
        paragraphs: [
          "Here is the part that causes real trouble. An allergic reaction to the ointment looks a great deal like a wound infection: the skin around the wound turns red, itches, weeps, and seems to be getting worse. The natural response is to apply **more** Neosporin — which feeds the reaction it is causing.",
          "That cycle sends people to urgent care, and some end up taking oral antibiotics for an infection they never had. Stopping the ointment is often the entire treatment.",
        ],
      },
      {
        heading: "What the research shows",
        paragraphs: [
          "This is not just opinion. A randomized controlled trial of 922 ambulatory surgery patients, published in JAMA, compared white petrolatum against bacitracin ointment on healing surgical wounds. Infection rates were statistically no different between the two — and the allergic reactions occurred only in the antibiotic group. The full citation appears below.",
          "For a clean wound, the antibiotic is risk without benefit. What a healing wound actually needs is simpler: keep it moist, keep it covered, keep it clean.",
        ],
      },
      {
        heading: "What to do instead",
        paragraphs: [
          "For everyday cuts, scrapes, and healing surgical wounds, the routine dermatologists recommend is short:",
        ],
        list: [
          "Wash the area gently with mild soap and water. No peroxide, no alcohol — both damage healing tissue.",
          "Apply a thin layer of plain petrolatum (plain Vaseline). Check the label: petrolatum only, no added antibiotics or fragrances.",
          "Cover with a nonstick bandage, and change it daily or when wet.",
          "Repeat until healed. A moist, covered wound heals more comfortably and with less crusting than one left open to scab.",
        ],
      },
      {
        heading: "When to call a doctor",
        paragraphs: [
          "Most wounds heal without drama. Call your physician if you notice any of the following:",
        ],
        list: [
          "Redness that spreads beyond the edge of the wound",
          "Pain that increases after the first two to three days instead of easing",
          "Pus or cloudy drainage",
          "Fever",
          "A sore that simply will not heal over several weeks — some skin cancers first appear as a small wound that never quite closes, and that deserves a professional look",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Neosporin bad for wounds?",
        answer:
          "It is not dangerous for most people, but it carries a real risk of allergic contact dermatitis — an itchy rash that mimics infection — and for clean wounds it has not been shown to prevent infection any better than plain petrolatum. Most dermatologists recommend plain petrolatum instead.",
      },
      {
        question: "What should I put on a wound after skin surgery?",
        answer:
          "Follow your surgeon's specific aftercare instructions. In dermatologic surgery the typical routine is gentle cleansing, a thin layer of plain petrolatum, and a nonstick dressing changed daily.",
      },
      {
        question: "Is triple antibiotic ointment the same as Neosporin?",
        answer:
          "Generic triple antibiotic ointment contains the same three antibiotics — neomycin, bacitracin, and polymyxin B — so everything on this page applies to it equally.",
      },
      {
        question: "I used Neosporin and now the skin is red and itchy. What should I do?",
        answer:
          "Stop using the ointment and wash the area gently. If the redness is spreading, the wound is draining pus, or you develop fever, contact a physician — those signs need a proper look to separate an allergic reaction from a true infection.",
      },
      {
        question: "Should a wound be covered or left open to air?",
        answer:
          "Covered. A wound kept moist with petrolatum under a bandage heals more comfortably and with less crusting than one left open to dry out and scab.",
      },
    ],
    references: [
      {
        label:
          "Smack DP, et al. Infection and allergy incidence in ambulatory surgery patients using white petrolatum vs bacitracin ointment: a randomized controlled trial. JAMA. 1996;276(12):972–977.",
        url: "https://jamanetwork.com/journals/jama/fullarticle/408314",
      },
      {
        label:
          "American Contact Dermatitis Society Allergens of the Year 2000 to 2020 (neomycin, 2010; bacitracin, 2003).",
        url: "https://pubmed.ncbi.nlm.nih.gov/32475509/",
      },
      {
        label:
          "Use of antibiotic-containing ointment versus plain petrolatum during and after clean cutaneous surgery. Journal of the American Academy of Dermatology.",
        url: "https://www.jaad.org/article/S0190-9622(06)00617-7/fulltext",
      },
    ],
    image: "/images/learn-wound-care.webp",
    imageAlt:
      "Still life of a glass jar of plain petrolatum and a roll of cotton gauze on linen",
    datePublished: "2026-08-30",
    dateModified: "2026-08-30",
    relatedProcedures: ["melanoma", "basal-cell-carcinoma", "squamous-cell-carcinoma"],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
