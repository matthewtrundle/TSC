import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, services, skinCancerTypes, mohsProcess, practiceInfo, faqs } from "@/lib/data/siteData";
import { procedures } from "@/lib/data/proceduresData";
import { Phone, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd, faqPageSchema } from "@/lib/structuredData";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { PilonidalDiagram } from "@/components/ui/PilonidalDiagram";


export const metadata: Metadata = {
  title: "Skin Cancer Treatment & Mohs Surgery in Plano, TX",
  description:
    "Mohs micrographic surgery, skin cancer treatment, and reconstruction at The Surgery Center at Plano Dermatology. Cure rates up to 99% with same-day margin results.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Skin Cancer Treatment & Mohs Surgery in Plano, TX", description: "Mohs micrographic surgery, skin cancer treatment, and reconstruction at The Surgery Center at Plano Dermatology. Cure rates up to 99% with same-day margin results.", url: "/services" },
};

// Feature lines still awaiting confirmation from the practice are marked
// PLACEHOLDER in siteData. They stay in the data file as TODOs but must never
// reach the page. One legacy line is rewritten here to match the site's voice.
function publishableFeatures(features: string[]): string[] {
  return features
    .filter((feature) => !feature.includes("PLACEHOLDER"))
    .map((feature) =>
      feature === "Performed in our state-of-the-art outpatient facility"
        ? "Performed as an outpatient procedure in our own facility"
        : feature
    );
}

// The same-day claim is the practice's sharpest differentiator (Dr. Modi,
// 2026-08-10) — when a description carries this exact phrase, it renders
// bold and underlined so it cannot be skimmed past.
const SAME_DAY_PHRASE = "all on the same day";
function withSameDayEmphasis(text: string) {
  const at = text.indexOf(SAME_DAY_PHRASE);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-[var(--navy-primary)] underline decoration-[var(--bronze)] decoration-2 underline-offset-4">
        {SAME_DAY_PHRASE}
      </strong>
      {text.slice(at + SAME_DAY_PHRASE.length)}
    </>
  );
}

// Evocative laboratory/instrument imagery for the bands that carry it — no
// staged patients, no fake interiors. Keyed by service id.
const serviceImages: Record<
  string,
  { src: string; alt: string; color?: boolean; caption?: string }
> = {
  // Real slide photography (Dr. Modi's own lab, 2026-08-10) stays in COLOR
  // with a caption — the stain is the story; duotone is for mood imagery.
  immunostaining: {
    src: "/images/ihc/mart1-03.webp",
    alt: "MART-1 immunostain photographed through the microscope: melanoma cells stained blue beneath the pink epidermis",
    color: true,
    caption:
      "From our own laboratory: a MART-1 immunostain read during Mohs surgery — melanoma cells stained blue, unmistakable at the margin.",
  },
  "high-risk-immunostaining": {
    src: "/images/svc-slide-glass.webp",
    alt: "Prepared glass microscope slides catching the laboratory light",
  },
  "mohs-surgery": {
    src: "/images/svc-microscope-detail.webp",
    alt: "Close detail of a surgical microscope's polished optics",
  },
  reconstruction: {
    src: "/images/svc-surgical-light.webp",
    alt: "Soft gleam of a surgical light against a darkened room",
  },
};

// Detail pages that belong to each band — rendered as "In detail" links so
// the bands and the nested pages stop living in separate worlds.
const bandDetailLinks: Record<string, { name: string; slug: string }[]> = {
  "mohs-surgery": [
    { name: "Basal cell carcinoma", slug: "basal-cell-carcinoma" },
    { name: "Squamous cell carcinoma", slug: "squamous-cell-carcinoma" },
    { name: "Actinic keratosis", slug: "actinic-keratosis" },
  ],
  immunostaining: [
    { name: "Melanoma, in detail", slug: "melanoma" },
    { name: "Sebaceous carcinoma", slug: "sebaceous-carcinoma" },
    { name: "DFSP", slug: "dermatofibrosarcoma-protuberans" },
  ],
  "high-risk-immunostaining": [
    { name: "Atypical fibroxanthoma", slug: "atypical-fibroxanthoma" },
    { name: "Microcystic adnexal carcinoma", slug: "microcystic-adnexal-carcinoma" },
    { name: "Extramammary Paget's disease", slug: "extramammary-paget-disease" },
  ],
  pilonidal: [
    { name: "Pilonidal disease & the cleft lift, in detail", slug: "pilonidal-cyst-surgery" },
  ],
  "skin-resurfacing": [{ name: "Skin resurfacing, in detail", slug: "skin-resurfacing" }],
  "hair-loss": [{ name: "Hair loss & PRP, in detail", slug: "prp-hair-restoration" }],
  "other-procedures": [
    { name: "Cyst removal", slug: "cyst-removal" },
    { name: "Lipoma removal", slug: "lipoma-removal" },
    { name: "Mole evaluation & removal", slug: "mole-removal" },
    { name: "Keloid & scar revision", slug: "keloid-scar-revision" },
    { name: "Earlobe repair", slug: "earlobe-repair" },
    { name: "Benign lesion removal", slug: "benign-lesion-removal" },
    { name: "Nail procedures & biopsies", slug: "nail-procedures" },
    { name: "Eyelid biopsies", slug: "eyelid-biopsies" },
    { name: "Lip & oral biopsies", slug: "lip-oral-biopsies" },
  ],
};

// Cancers in the "we treat" list that have their own detail pages.
const cancerDetailSlugs: Record<string, string> = {
  BCC: "basal-cell-carcinoma",
  SCC: "squamous-cell-carcinoma",
  Melanoma: "melanoma",
  Sebaceous: "sebaceous-carcinoma",
  DFSP: "dermatofibrosarcoma-protuberans",
  AFX: "atypical-fibroxanthoma",
  MAC: "microcystic-adnexal-carcinoma",
  EMPD: "extramammary-paget-disease",
};

export default function ServicesPage() {
  const mohsParagraphs = practiceInfo.mohsDescription.split("\n\n");

  return (
    <div className="pt-28">
      {/* Intro. Says what the page holds and lets a reader jump straight to
          the service they came for. */}
      <section className="bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h1 className="text-hero mb-6">What we do</h1>
              <p className="text-lg text-[var(--warm-gray)] leading-relaxed mb-4">
                Skin cancer surgery is the core of the practice. Mohs
                micrographic surgery removes the tumor with every margin read
                on site, and our own immunostaining laboratory extends that
                margin control to melanoma and other high-risk cancers few
                practices can treat this way.
              </p>
              <p className="text-[var(--warm-gray-light)] leading-relaxed mb-8">
                Reconstruction, pilonidal surgery, and everyday dermatologic
                procedures round out the list below.
              </p>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--navy-primary)] hover:text-[var(--teal-accent)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.contact.phone}
              </a>
            </FadeIn>

            {/* Index of the page — hairline list, one row per service. */}
            <FadeIn delay={0.1} className="lg:col-span-3">
              <nav aria-label="Services on this page" className="border-t border-[var(--gray-200)]">
                {services.map((service) => (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="group grid grid-cols-[1fr_auto] gap-4 items-center py-4 border-b border-[var(--gray-200)] transition-colors hover:bg-[var(--cream)]"
                  >
                    <span>
                      <span
                        className="block text-xl leading-snug text-[var(--navy-primary)]"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                      >
                        {service.name}
                      </span>
                      <span className="block text-sm text-[var(--warm-gray-light)] mt-0.5">
                        {service.shortDescription}
                      </span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[var(--teal-accent)] transition-transform group-hover:translate-x-1" />
                  </a>
                ))}
              </nav>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* One editorial band per service, in the data's deliberate order:
          the immunostaining work leads because it is what sets the practice
          apart. Bands alternate deep ivory and surface. */}
      {services.map((service, index) => {
        const band = index % 2 === 0 ? "bg-[var(--ivory-deep)]" : "bg-[var(--surface)]";
        const features = publishableFeatures(service.features);
        const image = serviceImages[service.id];

        return (
          <section key={service.id} id={service.id} className={`${band} scroll-mt-32 py-20 lg:py-24`}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
                {/* Narrow intro column. */}
                <FadeIn>
                  <p className="label-caps mb-3">{service.badge}</p>
                  <h2 className="text-display mb-4">{service.name}</h2>
                  <p className="text-[var(--warm-gray-light)] leading-relaxed">
                    {service.shortDescription}
                  </p>
                  {image && (
                    <figure className="m-0 mt-8">
                      <div
                        className={
                          image.color
                            ? "relative overflow-hidden aspect-[4/3]"
                            : "duotone-frame aspect-[4/5]"
                        }
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 21rem, 100vw"
                          className={image.color ? "object-cover" : "img-duotone object-cover"}
                        />
                        <div
                          className="absolute inset-2 z-10 border border-[var(--hairline-bronze)] pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>
                      {image.caption && (
                        <figcaption className="mt-3 text-sm leading-snug text-[var(--warm-gray-light)]">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </FadeIn>

                {/* Wide content column. */}
                <FadeIn delay={0.1} className="lg:col-span-2">
                  <p className="text-lg text-[var(--warm-gray)] leading-relaxed mb-6">
                    {withSameDayEmphasis(service.description)}
                  </p>

                  {/* All of the rewritten explainer paragraphs — the old copy
                      skipped [0] because it duplicated the description; the
                      2026 rewrite has three distinct paragraphs. */}
                  {/* Pilonidal gets an educational diagram, full width of
                      the content column. */}
                  {service.id === "pilonidal" && (
                    <div className="my-8 bg-[var(--surface)] border border-[var(--hairline)] p-5 lg:p-7">
                      <PilonidalDiagram />
                    </div>
                  )}

                  {service.id === "mohs-surgery" &&
                    mohsParagraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="text-lg text-[var(--warm-gray)] leading-relaxed mb-6"
                      >
                        {paragraph}
                      </p>
                    ))}

                  <ul className="border-t border-[var(--gray-200)] mb-8">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="py-3 border-b border-[var(--gray-200)] text-[var(--navy-primary)]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* The Mohs entry carries the full procedure walk-through
                      and the list of cancers the technique treats. */}
                  {service.id === "mohs-surgery" && (
                    <>
                      <h3
                        className="text-2xl text-[var(--navy-primary)] mt-12 mb-4"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                      >
                        The procedure, step by step
                      </h3>
                      <ol className="border-t border-[var(--gray-200)] mb-8">
                        {mohsProcess.map((step) => (
                          <li
                            key={step.step}
                            className="grid grid-cols-[2.5rem_1fr] gap-5 py-4 border-b border-[var(--gray-200)]"
                          >
                            <span
                              className="text-lg text-[var(--warm-gray-light)] tabular-nums"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              {step.step}.
                            </span>
                            <span>
                              <span className="block font-semibold text-[var(--navy-primary)]">
                                {step.title}
                              </span>
                              <span className="block text-[var(--warm-gray)] leading-relaxed mt-0.5">
                                {step.description}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>

                      <h3
                        className="text-2xl text-[var(--navy-primary)] mt-12 mb-4"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                      >
                        Skin cancers we treat
                      </h3>
                      <p className="text-[var(--warm-gray)] leading-relaxed mb-4">
                        From the most common cancers to rare and locally
                        aggressive tumors.
                      </p>
                      <dl className="border-t border-[var(--gray-200)] mb-8">
                        {skinCancerTypes.map((type) => (
                          <div
                            key={type.name}
                            className="py-4 border-b border-[var(--gray-200)]"
                          >
                            <dt className="font-semibold text-[var(--navy-primary)]">
                              {cancerDetailSlugs[type.shortName] ? (
                                <Link
                                  href={`/services/${cancerDetailSlugs[type.shortName]}`}
                                  className="inline-flex items-center gap-1.5 underline decoration-[var(--hairline-bronze)] underline-offset-4 transition-colors hover:text-[var(--teal-accent)] hover:decoration-[var(--bronze)]"
                                >
                                  {type.name}
                                  <ChevronRight className="h-4 w-4 text-[var(--teal-accent)]" />
                                </Link>
                              ) : (
                                type.name
                              )}
                            </dt>
                            <dd className="text-[var(--warm-gray)] leading-relaxed mt-0.5">
                              {type.description}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <h3
                        className="text-2xl text-[var(--navy-primary)] mt-12 mb-2"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                      >
                        Common questions
                      </h3>
                      <p className="text-[var(--warm-gray-light)] mb-4">
                        For anything else, call the office — you will reach a
                        person, not a phone tree.
                      </p>
                      <JsonLd data={faqPageSchema(faqs)} />
                      {/* mb-8 mirrors the feature lists' bottom margin, so
                          the appointment button keeps the same rhythm on
                          every band. */}
                      <div className="mb-8">
                        <FaqAccordion faqs={faqs} />
                      </div>
                    </>
                  )}

                  {bandDetailLinks[service.id] && (
                    <div className="mb-8 flex flex-wrap gap-x-7 gap-y-2.5">
                      {bandDetailLinks[service.id].map((link) => (
                        <Link
                          key={link.slug}
                          href={`/services/${link.slug}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-[var(--teal-accent)] transition-all hover:gap-2.5"
                        >
                          {link.name}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <Link href="/appointment" className="btn-outline-bronze">
                    Request an appointment
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}

      {/* Procedure directory — every nested detail page, as a quiet index. */}
      <section className="border-t border-[var(--gray-200)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-display mb-4">Procedures, in detail</h2>
            <span aria-hidden="true" className="rule-bronze mb-5" />
            <p className="leading-relaxed text-[var(--warm-gray)]">
              Every procedure we perform has its own page — what it is, when to
              come in, and how we treat it.
            </p>
          </div>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-3">
            {[
              {
                group: "Skin cancer & precancer",
                slugs: ["melanoma", "basal-cell-carcinoma", "squamous-cell-carcinoma", "actinic-keratosis", "sebaceous-carcinoma", "dermatofibrosarcoma-protuberans", "atypical-fibroxanthoma", "microcystic-adnexal-carcinoma", "extramammary-paget-disease", "mole-removal"],
              },
              {
                group: "Everyday procedures",
                slugs: ["cyst-removal", "lipoma-removal", "benign-lesion-removal", "nail-procedures", "eyelid-biopsies", "lip-oral-biopsies", "pilonidal-cyst-surgery"],
              },
              {
                group: "Restorative & aesthetic",
                slugs: ["skin-resurfacing", "prp-hair-restoration", "keloid-scar-revision", "earlobe-repair"],
              },
            ].map(({ group, slugs }) => (
              <div key={group}>
                <h3 className="label-caps mb-2">{group}</h3>
                <span aria-hidden="true" className="rule-bronze mb-3" />
                <div>
                  {slugs
                    .map((slug) => procedures.find((p) => p.slug === slug))
                    .filter((p): p is NonNullable<typeof p> => Boolean(p))
                    .map((p) => (
                      <Link
                        key={p.slug}
                        href={`/services/${p.slug}`}
                        className="group flex items-baseline justify-between gap-4 border-b border-[var(--gray-200)] py-3.5"
                      >
                        <span
                          className="text-lg text-[var(--navy-primary)] transition-colors group-hover:text-[var(--teal-accent)]"
                          style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                        >
                          {p.name}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 self-center text-[var(--teal-accent)] transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA. Full-bleed dark marble band, phone number set large —
          the one dark band on the page, matching the homepage's closing
          section. */}
      <LuxuryCta
        heading="Talk to us about your diagnosis"
        subtext="Most patients are seen within days of referral."
      />
    </div>
  );
}
