import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { siteConfig, doctors } from "@/lib/data/siteData";
import { procedures } from "@/lib/data/proceduresData";
import { articles, getArticle } from "@/lib/data/learnData";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd, faqPageSchema, breadcrumbSchema, SITE_URL } from "@/lib/structuredData";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: `/learn/${article.slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: `/learn/${article.slug}`,
      type: "article",
    },
  };
}

/** The same bronze-underline emphasis treatment the service pages use. */
function Emphasized({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong
            key={i}
            className="font-semibold text-[var(--navy-primary)] underline decoration-[var(--bronze)] decoration-2 underline-offset-4"
          >
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const reviewer = doctors[0]; // Dr. Modi — reviewed the clinical content.
  const related = article.relatedProcedures
    .map((s) => procedures.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title,
    description: article.seoDescription,
    url: `${SITE_URL}/learn/${article.slug}`,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    lastReviewed: article.dateModified,
    reviewedBy: {
      "@type": "Physician",
      name: reviewer.name,
      url: `${SITE_URL}/team/${reviewer.slug}`,
    },
    publisher: {
      "@type": "MedicalBusiness",
      name: siteConfig.name,
      url: SITE_URL,
    },
  };

  const updatedDisplay = new Date(
    article.dateModified + "T12:00:00Z"
  ).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="pt-28">
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Patient Education", url: `${SITE_URL}/learn` },
            { name: article.title, url: `${SITE_URL}/learn/${article.slug}` },
          ]),
        ]}
      />

      {/* Header: question, short answer, image */}
      <section className="bg-[var(--surface)] border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--warm-gray-light)]">
            <Link href="/" className="hover:text-[var(--teal-accent)] transition-colors">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <Link href="/learn" className="hover:text-[var(--teal-accent)] transition-colors">
              Patient Education
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-[var(--warm-gray)]">{article.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <h1 className="text-display-lg mb-5 [overflow-wrap:anywhere] [hyphens:auto]" lang="en">
                {article.title}
              </h1>
              <p className="mb-8 text-sm text-[var(--warm-gray-light)]">
                Medically reviewed by{" "}
                <Link
                  href={`/team/${reviewer.slug}`}
                  className="font-semibold text-[var(--bronze-text)] underline decoration-[var(--hairline-bronze)] underline-offset-4 hover:decoration-[var(--bronze)] transition-colors"
                >
                  {reviewer.name}
                </Link>
                , board-certified dermatologist and fellowship-trained Mohs
                surgeon &middot; Updated {updatedDisplay}
              </p>

              <div className="border-l-2 border-[var(--bronze)] pl-6">
                <p className="label-caps mb-3 text-xs">The short answer</p>
                <p className="text-lg leading-relaxed text-[var(--warm-gray)]">
                  {article.shortAnswer}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="duotone-frame relative aspect-[4/3]">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
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

      {/* Body sections */}
      <section className="bg-[var(--ivory-deep)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl space-y-14">
            {article.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-display mb-5">{section.heading}</h2>
                <span aria-hidden="true" className="rule-bronze mb-6" />
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-5 text-lg leading-relaxed text-[var(--warm-gray)] last:mb-0"
                  >
                    <Emphasized text={paragraph} />
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-2 divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3 py-4 text-lg text-[var(--warm-gray)]">
                        <span
                          aria-hidden="true"
                          className="mt-[0.8125rem] h-px w-4 shrink-0 bg-[var(--bronze)]"
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <p className="text-sm leading-relaxed text-[var(--warm-gray-light)]">
              This page is general education, not medical advice for your
              specific situation. If you are our patient, your surgeon&rsquo;s
              aftercare instructions come first — call us at{" "}
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="font-semibold text-[var(--bronze-text)]"
              >
                {siteConfig.contact.phone}
              </a>{" "}
              with any question about a healing wound.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--gray-200)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <JsonLd data={faqPageSchema(article.faqs)} />
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-display mb-4">Common questions</h2>
              <span aria-hidden="true" className="rule-bronze mb-6" />
              <p className="leading-relaxed text-[var(--warm-gray-light)]">
                Answers reflect the general case — a physician who can see the
                wound always beats a page that cannot.
              </p>
            </div>
            <div className="lg:col-span-3">
              <FaqAccordion faqs={article.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="border-t border-[var(--gray-200)] bg-[var(--surface)] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            className="text-2xl font-semibold text-[var(--navy-primary)] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Selected peer-reviewed literature
          </h2>
          <p className="text-[var(--warm-gray-light)] mb-6">
            The data behind the answer.
          </p>
          <span aria-hidden="true" className="rule-bronze mb-6" />
          <ol className="space-y-3 max-w-4xl list-decimal pl-5">
            {article.references.map((ref) => (
              <li key={ref.url} className="text-sm leading-relaxed text-[var(--warm-gray)]">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--bronze-text)] transition-colors underline decoration-[var(--hairline-bronze)] underline-offset-4"
                >
                  {ref.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t border-[var(--gray-200)] bg-[var(--ivory-deep)] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-display mb-3">If a spot will not heal</h2>
            <span aria-hidden="true" className="rule-bronze mb-6" />
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-[var(--warm-gray)]">
              A wound that never quite closes is one of the ways skin cancer
              first announces itself. Diagnosing and removing skin cancer is
              what this practice does all day, every day.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="group border-t border-[var(--gray-200)] pt-5"
                >
                  <h3 className="mb-2 text-lg font-semibold text-[var(--navy-primary)] transition-colors group-hover:text-[var(--bronze-text)]">
                    {p.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--warm-gray-light)]">
                    {p.summary}
                  </p>
                </Link>
              ))}
            </div>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="mt-12 inline-flex items-center gap-3 text-2xl font-medium text-[var(--navy-primary)] transition-colors hover:text-[var(--teal-accent)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Phone className="h-5 w-5 shrink-0" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </section>
      )}

      <LuxuryCta
        heading="A question about a spot that worries you?"
        subtext="Call us, or send an appointment request — requests receive a call back within one business day."
      />
    </div>
  );
}
