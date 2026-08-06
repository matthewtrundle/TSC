import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, doctors } from "@/lib/data/siteData";
import { FadeIn } from "@/components/ui/FadeIn";
import { DoctorPortrait } from "@/components/ui/DoctorPortrait";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { JsonLd, physicianSchema } from "@/lib/structuredData";


export const metadata: Metadata = {
  title: "Board-Certified Dermatologists & Mohs Surgeons in Plano, TX",
  description:
    "Meet Dr. Gunjan Modi, Dr. Michael Wells, and Dr. Edward Parry — three board certified, fellowship trained Mohs surgeons in Plano, Texas.",
  alternates: { canonical: "/team" },
  openGraph: { title: "Board-Certified Dermatologists & Mohs Surgeons in Plano, TX", description: "Meet Dr. Gunjan Modi, Dr. Michael Wells, and Dr. Edward Parry — three board certified, fellowship trained Mohs surgeons in Plano, Texas.", url: "/team" },
};

// Fellowship line per surgeon, pulled from the education data so the header
// under each name says something specific.
const fellowships: Record<string, string> = {
  "dr-modi": "Fellowship, UT Southwestern Medical Center",
  "dr-wells": "Fellowship, UT Southwestern Medical Center",
  "dr-parry": "Fellowship, Scripps Clinic, San Diego",
};

export default function TeamPage() {
  return (
    <div className="pt-28">
      <JsonLd data={physicianSchema()} />

      {/* Intro. Left-aligned, says who they are in two sentences. */}
      <section className="bg-white border-b border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="text-display mb-6">Our surgeons</h1>
              <p className="text-lg text-[var(--warm-gray)] leading-relaxed mb-4">
                Dr. Gunjan Modi, Dr. Michael Wells, and Dr. Edward Parry are each
                board certified in dermatology and fellowship trained in Mohs
                micrographic surgery. Between them they have trained fifteen Mohs
                surgeons and hundreds of dermatology residents.
              </p>
              <p className="text-[var(--warm-gray-light)]">
                Their full biographies follow. To see one of them, call{" "}
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="font-semibold text-[var(--navy-primary)] hover:text-[var(--teal-accent)] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* One editorial section per surgeon, alternating white and stone bands. */}
      {doctors.map((doctor, index) => (
        <section
          key={doctor.id}
          id={doctor.id}
          className={`scroll-mt-32 py-24 ${index % 2 === 1 ? "bg-[var(--ivory-deep)]" : "bg-[var(--surface)]"} ${
            index % 2 === 0 && index > 0 ? "border-t border-[var(--hairline)]" : ""
          }`}
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Portrait beside name and biography. */}
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <FadeIn className="lg:col-span-2">
                <div className="lg:sticky lg:top-32">
                  {/* Full-color editorial portrait inside a bronze inset frame. */}
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
                    <h2
                      className="text-4xl text-[var(--charcoal)] mb-3"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                    >
                      {doctor.name}
                    </h2>
                    {/* The board-certification line links to the surgeon's
                        ABMS Certification Matters profile — third-party
                        verification a click away. */}
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
                      {/* Minimal **bold** support for bio emphasis. */}
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
                  <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                    Education and training
                  </h3>
                  <span aria-hidden="true" className="rule-bronze mb-5" />
                  <ul className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                    {doctor.education.map((edu) => (
                      <li key={edu.degree} className="py-3.5">
                        <div className="font-semibold text-[var(--warm-gray)]">
                          {edu.degree}, {edu.institution}
                        </div>
                        <div className="text-sm text-[var(--warm-gray-light)] mt-0.5">
                          {edu.field}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                    Board certification and societies
                  </h3>
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
                  <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                    Special interests
                  </h3>
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

            {/* Recognition — only for surgeons with award data. Badge images
                are D Magazine's own official files (hi-res, the 2017/2025
                vectors rasterized at 1600px). Years with no publicly issued
                badge file (2015, 2016, 2018) appear in the typeset lists
                only — their artwork is never recreated. */}
            {doctor.awards && (
              <FadeIn delay={0.2}>
                <div className="mt-16 pt-10 border-t border-[var(--gray-200)]">
                  <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-3">
                    Recognition
                  </h3>
                  <span aria-hidden="true" className="rule-bronze mb-8" />

                  <div className="space-y-6">
                    {doctor.id !== "dr-wells" && doctor.awards.map((award) => (
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

                  {/* Dr. Modi: one badge tile per year, 2015–2026. Files for
                      2019–2026 are D Magazine's own; 2015/2016/2018 are
                      derived from that official artwork (no files were ever
                      published for those years). */}
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

                  {/* Dr. Wells: linked JAAD cover to the left of the
                      editorial title — the cover and the title are the whole
                      story. */}
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
          </div>
        </section>
      ))}

      {/* Final CTA — shared closing band. */}
      <LuxuryCta
        heading="See one of our surgeons"
        subtext="Most patients are seen within days of referral."
      />
    </div>
  );
}
