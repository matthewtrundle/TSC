import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data/siteData";
import { procedures, getProcedure } from "@/lib/data/proceduresData";
import { LuxuryCta } from "@/components/ui/LuxuryCta";

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
    title: procedure.name,
    description: procedure.summary,
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

  const related = procedures.filter((p) => p.slug !== procedure.slug).slice(0, 3);

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
                Procedures are performed in our Plano office under local
                anesthetic, and you leave with written wound-care instructions.
                Your surgeon will walk you through what to expect before
                anything is scheduled.
              </p>
            </div>
          </div>
        </div>
      </section>

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
