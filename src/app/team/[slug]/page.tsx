import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctors, siteConfig } from "@/lib/data/siteData";
import { FadeIn } from "@/components/ui/FadeIn";
import { DoctorPortrait } from "@/components/ui/DoctorPortrait";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { JsonLd, physicianSchema, breadcrumbSchema, SITE_URL } from "@/lib/structuredData";

// Individual surgeon pages (SEO brief Task 1, 2026-08-13): real routes so
// name searches land on a dedicated page instead of a /team anchor. The
// detailed biography markup moved here from /team, which is now the roster.

const fellowships: Record<string, string> = {
  "dr-modi": "Fellowship, UT Southwestern Medical Center",
  "dr-wells": "Fellowship, UT Southwestern Medical Center",
  "dr-parry": "Fellowship, Scripps Clinic, San Diego",
};

/** "Gunjan Modi, MD, FAAD, FACMS" -> "Gunjan Modi, MD" for titles. */
function shortName(name: string) {
  return `${name.split(",")[0]}, MD`;
}

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return {};
  const title = `${shortName(doctor.name)} — Mohs Surgeon in Plano, TX`;
  const description = `${doctor.shortBio} Board certified, fellowship trained, practicing at The Surgery Center at Plano Dermatology in Plano, Texas.`;
  return {
    title,
    description,
    alternates: { canonical: `/team/${doctor.slug}` },
    openGraph: { title, description, url: `/team/${doctor.slug}` },
  };
}

export default async function SurgeonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) notFound();

  return (
    <div className="pt-28">
      <JsonLd data={physicianSchema(doctor)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Our Surgeons", url: `${SITE_URL}/team` },
          { name: shortName(doctor.name), url: `${SITE_URL}/team/${doctor.slug}` },
        ])}
      />

      <section className="bg-[var(--surface)] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb — mirrors the BreadcrumbList schema. */}
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-[var(--warm-gray-light)]">
              <Link href="/" className="hover:text-[var(--bronze-text)] transition-colors">
                Home
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <Link href="/team" className="hover:text-[var(--bronze-text)] transition-colors">
                Our Surgeons
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span aria-current="page" className="text-[var(--warm-gray)]">{shortName(doctor.name)}</span>
            </nav>
          </FadeIn>

          {/* Portrait beside name and biography — markup carried over from
              the original /team sections so the design stays identical. */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <div className="lg:sticky lg:top-32">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ivory-deep)] border border-[var(--hairline)]">
                  <DoctorPortrait
                    name={doctor.name}
                    image={doctor.image}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-2 border border-[var(--hairline-bronze)] z-10 pointer-events-none"
                  />
                </div>
                <div className="mt-6">
                  <h1
                    className="text-4xl text-[var(--charcoal)] mb-3"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {doctor.name}
                  </h1>
                  <a
                    href={doctor.certificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-caps mb-1.5 inline-block underline decoration-[var(--hairline-bronze)] underline-offset-4 transition-colors hover:decoration-[var(--bronze)]"
                    title="Verify board certification at Certification Matters (ABMS)"
                  >
                    {doctor.title}
                  </a>
                  <p className="label-caps" style={{ color: "var(--warm-gray-light)" }}>
                    {fellowships[doctor.id]}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="max-w-none">
                {doctor.fullBio.split("\n\n").map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-lg text-[var(--warm-gray)] leading-relaxed mb-6 last:mb-0"
                  >
                    {paragraph.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="font-semibold text-[var(--navy-primary)]">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Education, certifications, and interests as typeset lists. */}
          <FadeIn delay={0.15}>
            <div className="mt-16 pt-10 border-t border-[var(--gray-200)] grid md:grid-cols-3 gap-10 lg:gap-14">
              <div>
                <h2 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                  Education and training
                </h2>
                <span aria-hidden="true" className="rule-bronze mb-5" />
                <ul className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                  {doctor.education.map((edu) => (
                    <li key={edu.degree} className="py-3.5">
                      <div className="font-semibold text-[var(--warm-gray)]">
                        {edu.degree}, {edu.institution}
                      </div>
                      <div className="text-sm text-[var(--warm-gray-light)] mt-0.5">{edu.field}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                  Board certification and societies
                </h2>
                <span aria-hidden="true" className="rule-bronze mb-5" />
                <ul className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                  {doctor.certifications.map((cert) => (
                    <li key={cert} className="py-3.5 text-[var(--warm-gray)]">
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                  Special interests
                </h2>
                <span aria-hidden="true" className="rule-bronze mb-5" />
                <ul className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                  {doctor.specialInterests.map((interest) => (
                    <li key={interest} className="py-3.5 text-[var(--warm-gray)]">
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Recognition — badge/citation markup carried over from /team.
              Badge images are D Magazine's own official files; years with no
              published badge file appear typeset only, never recreated. */}
          {doctor.awards && (
            <FadeIn delay={0.2}>
              <div className="mt-16 pt-10 border-t border-[var(--gray-200)]">
                <h2 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                  Recognition
                </h2>
                <span aria-hidden="true" className="rule-bronze mb-8" />

                <div className="space-y-6">
                  {doctor.id !== "dr-wells" &&
                    doctor.awards.map((award) => (
                      <div key={award.name}>
                        <p className="font-semibold text-[var(--warm-gray)]">
                          {award.name}
                          <span className="ml-2 text-sm font-normal text-[var(--warm-gray-light)]">
                            {award.source}
                          </span>
                        </p>
                        {award.years.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {award.years.map((year) => (
                              <span
                                key={year}
                                className="border border-[var(--hairline-bronze)] px-2.5 py-1 text-sm tabular-nums text-[var(--bronze-text)]"
                              >
                                {year}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {doctor.id === "dr-modi" && (
                  <div className="mt-10 grid grid-cols-4 items-end gap-4 sm:grid-cols-6 lg:grid-cols-12">
                    {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(
                      (year) => (
                        <a
                          key={year}
                          href="https://directory.dmagazine.com/doctors/gunjan-m-modi-md/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="justify-self-center transition-opacity hover:opacity-80"
                          title={`D Magazine Best Doctors — Dr. Modi's directory profile`}
                        >
                          <Image
                            src={`/images/awards/d-best-${year}.webp`}
                            alt={`D Magazine Best ${year} award badge`}
                            width={880}
                            height={1440}
                            className="h-24 w-auto lg:h-24"
                          />
                        </a>
                      )
                    )}
                  </div>
                )}

                {doctor.id === "dr-wells" && doctor.awards && (
                  <div className="flex items-center gap-6">
                    <a
                      href="https://www.jaad.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 transition-opacity hover:opacity-85"
                      title="Journal of the American Academy of Dermatology"
                    >
                      <Image
                        src="/images/awards/jaad-cover.webp"
                        alt="Cover of the Journal of the American Academy of Dermatology"
                        width={1140}
                        height={1525}
                        className="h-44 w-auto border border-[var(--hairline)] lg:h-52"
                      />
                    </a>
                    <p className="max-w-sm text-lg font-semibold leading-snug text-[var(--warm-gray)]">
                      {doctor.awards[0].name}
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.2}>
            <p className="mt-14 text-[var(--warm-gray-light)]">
              <Link
                href="/team"
                className="font-semibold text-[var(--bronze-text)] underline decoration-[var(--hairline-bronze)] underline-offset-4 hover:decoration-[var(--bronze)]"
              >
                &larr; All three surgeons
              </Link>
              <span className="mx-3" aria-hidden="true">
                &middot;
              </span>
              Referring a patient? See our{" "}
              <Link
                href="/referring"
                className="font-semibold text-[var(--bronze-text)] underline decoration-[var(--hairline-bronze)] underline-offset-4 hover:decoration-[var(--bronze)]"
              >
                physician referral page
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <LuxuryCta
        heading={`See Dr. ${doctor.name.split(",")[0].split(" ").slice(-1)[0]}`}
        subtext={`Most patients are seen within days of referral. Call ${siteConfig.contact.phone}.`}
      />
    </div>
  );
}
