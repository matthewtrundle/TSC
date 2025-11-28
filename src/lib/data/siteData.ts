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
    { name: "Our Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Mohs Surgery", href: "/services/mohs-surgery" },
    { name: "Skin Cancer Treatment", href: "/services/skin-cancer" },
    { name: "Reconstructive Surgery", href: "/services/reconstruction" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "HIPAA Notice", href: "/hipaa" },
  ],
};

export const doctors = [
  {
    id: "dr-modi",
    name: "Gunjan Modi, MD, FAAD",
    credentials: "MD, FAAD",
    title: "Board Certified Dermatologist & Mohs Surgeon",
    specialty: "Mohs Surgery & Cutaneous Oncology",
    slug: "dr-gunjan-modi",
    image: "/images/doctors/dr-modi.jpg",
    shortBio:
      "Board certified dermatologist and fellowship trained Mohs surgeon with expertise in transplant skin cancer and immunoperoxidase staining techniques.",
    fullBio: `Gunjan Modi is a board certified dermatologist and fellowship trained Mohs surgeon. Originally from Buffalo, New York, he graduated from high school in Sugar Land, Texas. He received his bachelor's degree from the University of Pennsylvania. He went on to medical school at Baylor College of Medicine in Houston, where he graduated with honors.

Dr. Modi remained at Baylor to do his dermatology residency, where he scored in the top 1% of all residents in the country on the national dermatology inservice examination. He then completed a fellowship in Mohs surgery, cutaneous oncology, and procedural dermatology at UT Southwestern Medical Center in Dallas, where he was voted outstanding teaching fellow.

During his fellowship, Dr. Modi developed a keen interest in the management of solid organ transplant recipients with skin cancer, and he is now an active member of the International Transplant Skin Cancer Collaborative. He also specializes in the use of immunoperoxidase stains in Mohs surgery. These special stains have made certain more aggressive cancers such as melanoma and high-risk squamous cell carcinoma more amenable to tissue sparing surgical techniques with higher cure rates.`,
    education: [
      { degree: "Fellowship", institution: "University of Texas Southwestern Medical Center", field: "Mohs Surgery & Cutaneous Oncology" },
      { degree: "Residency", institution: "Baylor College of Medicine", field: "Dermatology" },
      { degree: "Medical School", institution: "Baylor College of Medicine", field: "Medicine" },
      { degree: "Undergraduate", institution: "University of Pennsylvania", field: "Bachelor's Degree" },
    ],
    certifications: [
      "Diplomate, American Board of Dermatology",
      "Associate, American College of Mohs Surgery",
      "Fellow, American Academy of Dermatology",
      "Fellow, American Society for Dermatologic Surgery",
    ],
    specialInterests: [
      "Solid organ transplant recipients with skin cancer",
      "Immunoperoxidase stains in Mohs surgery",
      "Melanoma treatment",
      "High-risk squamous cell carcinoma",
    ],
  },
  {
    id: "dr-wells",
    name: "Michael Wells, MD, FAAD",
    credentials: "MD, FAAD",
    title: "Board Certified Dermatologist & Mohs Surgeon",
    specialty: "Mohs Surgery & Procedural Dermatology",
    slug: "dr-michael-wells",
    image: "/images/doctors/dr-wells.jpg",
    shortBio:
      "Former tenured associate professor with over 20 years of experience, specializing in Mohs surgery and dermatologic education.",
    fullBio: `Michael Wells, M.D. began his college career earning a Bachelor of Science degree from the University of Central Arkansas, where he graduated with Alpha Chi honors. He then moved on to complete medical school at the University of Arkansas for Medical Sciences in Little Rock, Arkansas. Here too, Michael Wells, M.D. earned numerous high honors including top pathology and anatomy student, as well as being inducted into the AOA honor society.

Following medical school, he served as an assistant instructor during his Internal Medicine Internship at Vanderbilt University Medical Center in Nashville. He then completed a three-year dermatology residency program at Texas Tech University Health Sciences Center in Lubbock, where he served as chief resident in his final year.

After his residency he reached the level of tenured associate professor while at TTUHSC and received many Dean's awards during his time there from 2001-2012. Additionally, he completed an ACGME-approved Procedural Dermatology / ACMS-approved Mohs Micrographic Surgery Fellowship at the University of Texas Southwestern in Dallas, TX.

He actively shares his wealth of knowledge and expertise with other healthcare professionals in numerous ways, including serving as editor for e-medicine, authoring chapters for clinical decision-making resources, peer reviewing medical journals, and active involvement with the Texas Medical Association.`,
    education: [
      { degree: "Fellowship", institution: "University of Texas Southwestern Medical Center", field: "Procedural Dermatology & Mohs Surgery" },
      { degree: "Residency", institution: "Texas Tech University Health Sciences Center", field: "Dermatology (Chief Resident)" },
      { degree: "Internship", institution: "Vanderbilt University Medical Center", field: "Internal Medicine" },
      { degree: "Medical School", institution: "University of Arkansas for Medical Sciences", field: "Medicine" },
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
  },
  {
    id: "dr-parry",
    name: "Edward Parry, MD, FAAD, FACMS",
    credentials: "MD, FAAD, FACMS",
    title: "Board Certified Dermatologist & Mohs Surgeon",
    specialty: "Mohs Surgery & Cutaneous Oncology",
    slug: "dr-edward-parry",
    image: "/images/doctors/dr-parry.jpg",
    shortBio:
      "Former LSU professor and fellowship program director with 17 years in academics, having trained hundreds of residents and 15 Mohs surgeons.",
    fullBio: `Ed Parry is a board certified dermatologist and fellowship trained Mohs surgeon. He is a native of upstate New York. He received his bachelor's degree from the United States Air Force Academy in Colorado Springs, Colorado. He then moved to New Orleans and received his medical degree from Tulane University Medical School on a military scholarship.

Dr. Parry did his internship in general medicine at Scott Air Force Base Medical Center in Illinois, after which he came to Texas to do his dermatology residency at Wilford Hall Medical Center in San Antonio. He then completed a fellowship in Mohs surgery and cutaneous oncology at Scripps Clinic in San Diego.

Dr. Parry subsequently joined the faculty at LSU Medical Center, where he served as a professor of dermatology and the director of Mohs surgery for 17 years. During his tenure at LSU, Dr. Parry taught hundreds of residents, and started a fellowship training program in Mohs surgery, which graduated 15 Mohs surgeons. Dr. Parry retired from academics in 2007 and moved to Plano to join his first fellow, Dr. Eric Hollabaugh, in private practice.

Dr. Parry is happily married to Diane, his wife of 37 years. They have three adult children – Hugh, Phillip, and David – and four grandchildren. Dr. Parry is an avid sailor and tennis player.`,
    education: [
      { degree: "Fellowship", institution: "Scripps Clinic and Research Foundation", field: "Mohs Surgery & Cutaneous Oncology" },
      { degree: "Residency", institution: "Wilford Hall Medical Center", field: "Dermatology" },
      { degree: "Internship", institution: "Scott Air Force Base Medical Center", field: "General Medicine" },
      { degree: "Medical School", institution: "Tulane University Medical School", field: "Medicine" },
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
  },
];

export const services = [
  {
    id: "mohs-surgery",
    name: "Mohs Micrographic Surgery",
    shortName: "Mohs Surgery",
    slug: "mohs-surgery",
    description:
      "Mohs micrographic surgery is a highly specialized procedure for the removal of skin cancer. Developed by Dr. Frederick Mohs in the late 1930s, it has been refined into an incredibly precise and tissue-sparing process, and is the gold standard for treating most skin cancers.",
    shortDescription:
      "The gold standard for skin cancer treatment with up to 99% cure rate.",
    icon: "microscope",
    features: [
      "Up to 99% cure rate, even for previously treated cancers",
      "Tissue-sparing technique preserves maximum healthy skin",
      "Complete microscopic examination during surgery",
      "Same-day results - know cancer is gone before you leave",
      "Optimal cosmetic outcomes with minimal scarring",
      "Performed in our state-of-the-art outpatient facility",
    ],
    image: "/images/services/mohs-surgery.jpg",
  },
  {
    id: "skin-cancer-treatment",
    name: "Skin Cancer Treatment",
    shortName: "Skin Cancer",
    slug: "skin-cancer",
    description:
      "The most common form of cancer in the United States, skin cancer is defined as the uncontrolled growth of abnormal skin cells. Our surgeons are experts in diagnosing and treating all types of skin cancer before they spread.",
    shortDescription:
      "Expert diagnosis and treatment for all types of skin cancer.",
    icon: "shield",
    features: [
      "Comprehensive skin cancer evaluation",
      "Biopsy and diagnosis services",
      "Treatment for basal cell carcinoma (BCC)",
      "Treatment for squamous cell carcinoma (SCC)",
      "Melanoma and high-risk skin cancer care",
      "Long-term follow-up and monitoring",
    ],
    image: "/images/services/skin-cancer.jpg",
  },
  {
    id: "reconstruction",
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
    image: "/images/services/reconstruction.jpg",
  },
  {
    id: "other-procedures",
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
    image: "/images/services/other-procedures.jpg",
  },
];

// Types of skin cancer treated
export const skinCancerTypes = [
  {
    name: "Basal Cell Carcinoma (BCC)",
    shortName: "BCC",
    description: "The most common type of skin cancer, typically appearing as a pearly bump or pinkish patch of skin.",
  },
  {
    name: "Squamous Cell Carcinoma (SCC)",
    shortName: "SCC",
    description: "The second most common skin cancer, often appearing as a firm red nodule or scaly patch.",
  },
  {
    name: "Melanoma / Malignant Melanoma (MM)",
    shortName: "Melanoma",
    description: "The most serious type of skin cancer, developing from cells that give skin its color.",
  },
  {
    name: "Dermatofibrosarcoma Protuberans (DFSP)",
    shortName: "DFSP",
    description: "A rare skin cancer that begins in the dermis, the middle layer of skin.",
  },
  {
    name: "Atypical Fibroxanthoma (AFX)",
    shortName: "AFX",
    description: "A rare skin tumor typically occurring on sun-damaged skin of elderly patients.",
  },
  {
    name: "Microcystic Adnexal Carcinoma (MAC)",
    shortName: "MAC",
    description: "A rare, slow-growing but locally aggressive skin cancer.",
  },
  {
    name: "Extramammary Paget's Disease (EMP)",
    shortName: "EMP",
    description: "A rare, slow-growing skin cancer typically affecting the genital area.",
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

  mohsDescription: `Mohs micrographic surgery is a highly specialized procedure for the removal of skin cancer. It was originally developed in the 1930's by Dr. Frederick Mohs and has been refined since, gaining substantial application only in the past decade.

Although this procedure is very precise, its major drawback is that it is very time consuming, and requires specialized training, personnel, and equipment. Consequently, only a few major medical centers can provide this type of therapy.

Unlike standard microscopic examination, with the advanced Mohs techniques, our surgeons can pinpoint areas involved with cancer and selectively remove only those areas. In this way, the skin cancer is traced out to its "roots." This results in preserving as much normal tissue as possible with the highest chance for cure.`,

  advantages: [
    "Highest cure rates - up to 99% even for previously treated cancers",
    "Maximum preservation of healthy tissue",
    "Microscopic examination of 100% of tissue margins",
    "Same-day results - cancer removal verified before you leave",
    "Optimal cosmetic outcomes",
    "Outpatient procedure in our comfortable facility",
  ],
};

export const faqs = [
  {
    question: "What is Mohs surgery?",
    answer: "Mohs micrographic surgery is a highly specialized procedure for the removal of skin cancer. It offers the highest cure rate (up to 99%) while preserving the maximum amount of healthy tissue. The surgeon removes thin layers of skin and examines them under a microscope until no cancer cells remain.",
  },
  {
    question: "How long does Mohs surgery take?",
    answer: "Plan for a full day at our office. The average procedure requires 2-3 stages, with each stage taking about 1-2 hours including tissue processing. Most patients complete their surgery by midday, though complex cases may take longer.",
  },
  {
    question: "Is Mohs surgery painful?",
    answer: "Local anesthesia is used to numb the surgical area, so you should not feel pain during the procedure. You will be awake throughout. Some patients experience mild discomfort during the healing process.",
  },
  {
    question: "What should I bring on surgery day?",
    answer: "Bring a book or magazine, as there will be waiting time between stages. Have someone drive you home. Eat a good breakfast and take your regular medications unless otherwise instructed. Avoid aspirin for two weeks prior.",
  },
  {
    question: "What happens after the cancer is removed?",
    answer: "Once all cancer is removed, your surgeon will discuss reconstruction options. This may include stitches, skin grafts, skin flaps, or allowing the wound to heal naturally. The best option depends on the size and location of the wound.",
  },
  {
    question: "Will I have a scar?",
    answer: "Any surgery will leave some scarring. However, Mohs surgery minimizes scarring by removing only cancerous tissue. Our surgeons use advanced reconstruction techniques to achieve optimal cosmetic results. Scars typically improve significantly over 6-18 months.",
  },
  {
    question: "Do I need follow-up appointments?",
    answer: "Yes. Follow-up observation for five years is necessary. You'll return at 4-6 weeks, then at 3 months, 6 months, and annually. Patients who have had one skin cancer are at higher risk for developing others.",
  },
];
