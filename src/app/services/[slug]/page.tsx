import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data/siteData";
import { procedures, getProcedure } from "@/lib/data/proceduresData";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CleftLiftDiagram } from "@/components/ui/CleftLiftDiagram";
import { JsonLd, faqPageSchema } from "@/lib/structuredData";

export function generateStaticParams() {
  return procedures.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const procedure = getProcedure((await params).slug);
  if (!procedure) return {};
  return {
    title: procedure.seoTitle ?? procedure.name,
    description: procedure.seoDescription ?? procedure.summary,
    alternates: { canonical: `/services/${procedure.slug}` },
    openGraph: {
      title: procedure.name,
      description: procedure.summary,
      url: `/services/${procedure.slug}`,
    },
  };
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const procedure = getProcedure((await params).slug);
  if (!procedure) notFound();

  // Curated per page: cancer pages cross-link cancers, benign pages link
  // benign — the old first-three fallback sent melanoma readers to lipoma
  // removal and starved the cancer pages of internal links.
  const RELATED: Record<string, string[]> = {
    melanoma: ["basal-cell-carcinoma", "squamous-cell-carcinoma", "actinic-keratosis"],
    "basal-cell-carcinoma": ["squamous-cell-carcinoma", "melanoma", "actinic-keratosis"],
    "squamous-cell-carcinoma": ["basal-cell-carcinoma", "actinic-keratosis", "melanoma"],
    "actinic-keratosis": ["squamous-cell-carcinoma", "basal-cell-carcinoma", "skin-resurfacing"],
    "cyst-removal": ["lipoma-removal", "benign-lesion-removal", "mole-removal"],
    "lipoma-removal": ["cyst-removal", "benign-lesion-removal", "mole-removal"],
    "mole-removal": ["benign-lesion-removal", "cyst-removal", "melanoma"],
    "keloid-scar-revision": ["skin-resurfacing", "cyst-removal", "benign-lesion-removal"],
    "benign-lesion-removal": ["mole-removal", "cyst-removal", "lipoma-removal"],
    "nail-procedures": ["benign-lesion-removal", "mole-removal", "squamous-cell-carcinoma"],
    "eyelid-biopsies": ["basal-cell-carcinoma", "mole-removal", "benign-lesion-removal"],
    "lip-oral-biopsies": ["eyelid-biopsies", "benign-lesion-removal", "squamous-cell-carcinoma"],
    "prp-hair-restoration": ["skin-resurfacing", "keloid-scar-revision", "mole-removal"],
    "skin-resurfacing": ["actinic-keratosis", "prp-hair-restoration", "keloid-scar-revision"],
    "sebaceous-carcinoma": ["eyelid-biopsies", "basal-cell-carcinoma", "microcystic-adnexal-carcinoma"],
    "dermatofibrosarcoma-protuberans": ["atypical-fibroxanthoma", "squamous-cell-carcinoma", "melanoma"],
    "atypical-fibroxanthoma": ["squamous-cell-carcinoma", "dermatofibrosarcoma-protuberans", "actinic-keratosis"],
    "microcystic-adnexal-carcinoma": ["sebaceous-carcinoma", "basal-cell-carcinoma", "squamous-cell-carcinoma"],
    "extramammary-paget-disease": ["squamous-cell-carcinoma", "melanoma", "microcystic-adnexal-carcinoma"],
    "pilonidal-cyst-surgery": ["cyst-removal", "benign-lesion-removal", "keloid-scar-revision"],
  };
  const relatedSlugs = RELATED[procedure.slug] ?? [];
  const related = relatedSlugs.length
    ? relatedSlugs.map((s) => procedures.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p))
    : procedures.filter((p) => p.slug !== procedure.slug).slice(0, 3);

  return (
    <div className="pt-28">
      {/* Header */}
      <section className="bg-[var(--surface)] border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--warm-gray-light)]">
            <Link href="/services" className="hover:text-[var(--teal-accent)] transition-colors">
              Services
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-[var(--warm-gray)]">{procedure.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <h1 className="text-display-lg mb-6">{procedure.name}</h1>
              <span aria-hidden="true" className="rule-bronze mb-6" />
              {procedure.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-5 text-lg leading-relaxed text-[var(--warm-gray)] last:mb-0"
                >
                  {paragraph}
                </p>
              ))}

              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="mt-8 inline-flex items-center gap-3 text-2xl font-medium text-[var(--navy-primary)] transition-colors hover:text-[var(--teal-accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Phone className="h-5 w-5 shrink-0" />
                {siteConfig.contact.phone}
              </a>
            </div>

            <div className="lg:col-span-2">
              <div className="duotone-frame relative aspect-[4/3]">
                <Image
                  src={procedure.image}
                  alt={procedure.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="img-duotone object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 z-10 border border-[var(--hairline-bronze)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to consider + how we treat it */}
      <section className="py-20 bg-[var(--ivory-deep)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-display mb-6">When to come in</h2>
              <ul className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                {procedure.whenToConsider.map((item) => (
                  <li key={item} className="flex gap-3 py-4 text-[var(--warm-gray)]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6875rem] h-px w-4 shrink-0 bg-[var(--bronze)]"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-display mb-6">How we treat it</h2>
              <div className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                {procedure.techniques.map((technique) => (
                  <div key={technique.name} className="py-4">
                    <h3 className="mb-1 text-lg font-semibold text-[var(--navy-primary)]">
                      {technique.name}
                    </h3>
                    <p className="leading-relaxed text-[var(--warm-gray)]">{technique.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[var(--warm-gray-light)]">
                Your surgeon will walk you through what to expect — including
                preparation and aftercare — before anything is scheduled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilonidal only: the operation, drawn simply */}
      {procedure.slug === "pilonidal-cyst-surgery" && (
        <section className="border-t border-[var(--gray-200)] bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="label-caps mb-10">A lift and a shift, drawn simply</p>
            <CleftLiftDiagram />
          </div>
        </section>
      )}

      {/* Optional treatment comparison table */}
      {procedure.comparison && (
        <section className="border-t border-[var(--gray-200)] bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-display mb-8">{procedure.comparison.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-t border-[var(--gray-200)] text-left">
                <thead>
                  <tr className="border-b border-[var(--gray-200)]">
                    <th scope="col" className="w-1/4 py-4 pr-6 align-bottom">
                      <span className="label-caps text-xs">Compare</span>
                    </th>
                    <th scope="col" className="w-[37.5%] py-4 pr-6 align-bottom text-lg font-semibold text-[var(--warm-gray-light)]">
                      {procedure.comparison.columns[0]}
                    </th>
                    <th scope="col" className="w-[37.5%] py-4 align-bottom text-lg font-semibold text-[var(--navy-primary)]">
                      {procedure.comparison.columns[1]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--gray-200)]">
                  {procedure.comparison.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="py-4 pr-6 align-top text-sm font-semibold text-[var(--warm-gray-light)]">
                        {row.label}
                      </th>
                      <td className="py-4 pr-6 align-top leading-relaxed text-[var(--warm-gray)]">{row.a}</td>
                      <td className="py-4 align-top font-medium leading-relaxed text-[var(--navy-primary)]">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {procedure.comparison.note && (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--warm-gray-light)]">
                {procedure.comparison.note}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Optional page-specific FAQ */}
      {procedure.faqs && (
        <section className="border-t border-[var(--gray-200)] bg-[var(--ivory-deep)] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <JsonLd data={faqPageSchema(procedure.faqs)} />
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              <div className="lg:col-span-2">
                <h2 className="text-display mb-4">Common questions</h2>
                <span aria-hidden="true" className="rule-bronze mb-6" />
                <p className="leading-relaxed text-[var(--warm-gray-light)]">
                  Answers reflect the typical course — your surgeon will go
                  over the specifics of your own plan.
                </p>
              </div>
              <div className="lg:col-span-3">
                <FaqAccordion faqs={procedure.faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Before & after gallery — only for procedures with practice photos. */}
      {procedure.gallery && (
        <section className="border-t border-[var(--gray-200)] bg-[var(--surface)] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-display mb-3">Results</h2>
            <span aria-hidden="true" className="rule-bronze mb-10" />
            <div className="grid gap-12 md:grid-cols-2">
              {procedure.gallery.map((pair) => (
                <figure key={pair.label} className="m-0">
                  <div className="grid grid-cols-2 gap-px border border-[var(--hairline)] bg-[var(--hairline)]">
                    <div className="relative bg-white">
                      <Image
                        src={pair.before}
                        alt={`${procedure.name} — ${pair.label}, before treatment`}
                        width={800}
                        height={800}
                        className="h-auto w-full"
                      />
                      <span className="label-caps absolute left-3 top-3 bg-[var(--ivory)]/90 px-2.5 py-1 text-xs">
                        Before
                      </span>
                    </div>
                    <div className="relative bg-white">
                      <Image
                        src={pair.after}
                        alt={`${procedure.name} — ${pair.label}, after treatment`}
                        width={800}
                        height={800}
                        className="h-auto w-full"
                      />
                      <span className="label-caps absolute left-3 top-3 bg-[var(--ivory)]/90 px-2.5 py-1 text-xs">
                        After
                      </span>
                    </div>
                  </div>
                  <figcaption className="mt-3 text-sm text-[var(--warm-gray-light)]">
                    {pair.label} — our patient, photographed by the practice.
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-8 text-sm text-[var(--warm-gray-light)]">
              Individual results vary. Photographs are of this practice&rsquo;s
              own patients, unretouched apart from cropping.
            </p>
          </div>
        </section>
      )}

      {/* Related procedures */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-display mb-10">Related procedures</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                className="group border-t border-[var(--gray-200)] pt-5"
              >
                <h3
                  className="mb-2 text-xl text-[var(--navy-primary)] transition-colors group-hover:text-[var(--teal-accent)]"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                >
                  {p.name}
                </h3>
                <p className="mb-3 text-[0.9375rem] leading-relaxed text-[var(--warm-gray-light)]">
                  {p.summary}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal-accent)]">
                  Read more
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LuxuryCta
        heading="Talk to us about this procedure"
        subtext="Call the office and we will find a time that works."
      />
    </div>
  );
}
