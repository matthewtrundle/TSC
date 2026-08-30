import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data/learnData";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { JsonLd, breadcrumbSchema, SITE_URL } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Patient Education",
  description:
    "Straight answers to the skin and wound-care questions patients actually ask, written and reviewed by the board-certified Mohs surgeons of The Surgery Center at Plano Dermatology.",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Patient Education",
    description:
      "Straight answers to the skin and wound-care questions patients actually ask, reviewed by board-certified Mohs surgeons.",
    url: "/learn",
  },
};

export default function LearnIndexPage() {
  return (
    <div className="pt-28">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Patient Education", url: `${SITE_URL}/learn` },
        ])}
      />

      <section className="bg-[var(--surface)] border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-16">
          <p className="label-caps mb-6">Patient Education</p>
          <h1 className="text-display-lg mb-6 max-w-3xl">
            Straight answers to common skin questions
          </h1>
          <span aria-hidden="true" className="rule-bronze mb-6" />
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--warm-gray)]">
            Short, plainly written articles on the questions patients actually
            ask — each one reviewed by a board-certified dermatologist at this
            practice, with the supporting literature cited at the bottom.
          </p>
        </div>
      </section>

      <section className="bg-[var(--ivory-deep)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="group"
              >
                <div className="duotone-frame relative mb-5 aspect-[4/3]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="img-duotone object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 z-10 border border-[var(--hairline-bronze)]"
                  />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-[var(--navy-primary)] transition-colors group-hover:text-[var(--bronze-text)]">
                  {article.title}
                </h2>
                <p className="text-[var(--warm-gray-light)] leading-relaxed">
                  {article.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LuxuryCta
        heading="When a page is not enough"
        subtext="Call us, or send an appointment request — requests receive a call back within one business day."
      />
    </div>
  );
}
