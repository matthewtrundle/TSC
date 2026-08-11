import { siteConfig, doctors, services } from "@/lib/data/siteData";

export const SITE_URL = "https://planoderm.com";

/**
 * Schema.org JSON-LD.
 *
 * For a single-location practice this is the highest-leverage SEO work
 * available: it is what populates the knowledge panel, the map pack, and the
 * "hours" and "phone" chips in search results. The site previously shipped none.
 *
 * Every value here is derived from siteData.ts so the markup cannot drift away
 * from what the pages actually display.
 */

/** Maps our hours record onto schema.org day names, skipping closed days. */
function openingHours() {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday"];
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: weekdays.map((d) => `https://schema.org/${d}`),
      opens: "07:30",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["https://schema.org/Friday"],
      opens: "10:00",
      closes: "14:00",
    },
  ];
}

export function medicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#practice`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: SITE_URL,
    telephone: siteConfig.contact.phone,
    faxNumber: siteConfig.contact.fax,
    email: siteConfig.contact.email,
    medicalSpecialty: "Dermatology",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: openingHours(),
    // The practice's true catchment (Dr. Modi, 2026-08-09): Collin County
    // suburbs, the US-75 corridor through Grayson County, Denton/Cooke to
    // the west, and southern Oklahoma. Follows /areas-we-serve, EXCEPT:
    // Durant is the only Oklahoma town in the schema — Calera and Kingston
    // are deliberately excluded (Dr. Modi, 2026-08-11). Every name in the
    // main array gets a ", TX" suffix, so never add Oklahoma towns to it.
    areaServed: [
      "Plano", "Frisco", "Allen", "McKinney", "Prosper", "Celina", "Anna",
      "Melissa", "Lucas", "Wylie", "Sachse", "Murphy", "Richardson", "Dallas",
      "The Colony", "Gunter", "Howe", "Van Alstyne", "Sherman", "Denison",
      "Pottsboro", "Bells", "Denton", "Little Elm", "Gainesville", "Paris",
    ]
      .map((name) => ({ "@type": "City" as const, name: `${name}, TX` }))
      .concat([{ "@type": "City" as const, name: "Durant, OK" }]),
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.name,
      description: service.shortDescription,
      url: `${SITE_URL}/services#${service.id}`,
    })),
  };
}

type Doctor = (typeof doctors)[number];

function singlePhysician(doctor: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/team#${doctor.id}`,
    name: doctor.name,
    // Only emit `image` when a real photograph exists. Never point this at a
    // synthetic portrait — search engines surface it as the physician's face.
    ...(doctor.image ? { image: `${SITE_URL}${doctor.image}` } : {}),
    jobTitle: doctor.title,
    medicalSpecialty: "Dermatology",
    description: doctor.shortBio,
    url: `${SITE_URL}/team#${doctor.id}`,
    worksFor: { "@id": `${SITE_URL}/#practice` },
    alumniOf: doctor.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
  };
}

/**
 * With no argument: one Physician block per surgeon (the /team page usage).
 * With a doctor: that surgeon's Physician block alone (per-surgeon pages).
 */
export function physicianSchema(): ReturnType<typeof singlePhysician>[];
export function physicianSchema(doctor: Doctor): ReturnType<typeof singlePhysician>;
export function physicianSchema(doctor?: Doctor) {
  return doctor ? singlePhysician(doctor) : doctors.map(singlePhysician);
}

/**
 * FAQPage markup. Pass only Q&A pairs that are rendered verbatim on the page
 * carrying the markup — Google requires the visible content to match.
 */
export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Renders one or more JSON-LD blocks into a page. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
