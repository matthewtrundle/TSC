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
  }[];
  faqs: { question: string; answer: string }[];
  references: { label: string; url: string }[];
  image: string;
  imageAlt: string;
  /** ISO dates for the article schema and the byline. */
  datePublished: string;
  dateModified: string;
  /** Slugs under /services the article should point readers toward. */
  relatedProcedures: string[];
};

export const articles: Article[] = [
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
