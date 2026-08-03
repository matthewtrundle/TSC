import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data/siteData";
import { Phone, MapPin, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { LuxuryCta } from "@/components/ui/LuxuryCta";


export const metadata: Metadata = {
  title: "Our Practice",
  description:
    "The Surgery Center at Plano Dermatology: an on-site Mohs laboratory, fellowship trained surgeons, and skin cancer care in Plano, Texas.",
  alternates: { canonical: "/practice" },
  openGraph: { title: "Our Practice", description: "The Surgery Center at Plano Dermatology: an on-site Mohs laboratory, fellowship trained surgeons, and skin cancer care in Plano, Texas.", url: "/practice" },
};

export default function PracticePage() {
  return (
    <div className="pt-28">
      {/* Intro. What the practice is, in plain terms. */}
      <section className="bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
          <FadeIn>
            <div className="duotone-frame aspect-[21/9] mb-14">
              <Image
                src="/images/hero-microscope-dark.webp"
                alt="Macro detail of a bronze-rimmed microscope objective against a dark ground"
                fill
                sizes="(min-width: 1152px) 1104px, 100vw"
                priority
                fetchPriority="high"
                className="img-duotone object-cover"
              />
              <div
                className="absolute inset-2 z-10 border border-[var(--hairline-bronze)] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h1 className="text-hero mb-6">A practice built around skin cancer surgery</h1>
              <p className="text-lg text-[var(--warm-gray-light)] leading-relaxed">
                One office, one operating focus, and a laboratory down the hall
                from the exam rooms.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="space-y-6">
                <p className="text-lg text-[var(--warm-gray)] leading-relaxed">
                  The Surgery Center at Plano Dermatology is a
                  physician-owned and operated surgical dermatology practice.
                  Dr.&nbsp;Modi, Dr.&nbsp;Wells, and Dr.&nbsp;Parry are each
                  board certified in dermatology and fellowship trained in the
                  surgical treatment of skin cancer — the people who own this
                  practice are the ones holding the scalpel.
                </p>
                <p className="text-lg text-[var(--warm-gray)] leading-relaxed">
                  The work is Mohs micrographic surgery and everything that
                  surrounds it: reconstruction once the margins are clear,
                  treatment of melanoma and other high-risk skin cancers, and
                  everyday dermatologic surgery — mole and cyst removal and nail
                  procedures. Everything is done here, as an outpatient, under
                  local anesthetic.
                </p>
                <p className="text-lg text-[var(--warm-gray)] leading-relaxed">
                  If you have just been diagnosed, the two things worth knowing
                  about this office are below: the laboratory is on site, and
                  the surgeons have spent much of their careers teaching this
                  operation to other physicians.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--gray-200)] flex flex-wrap items-center gap-x-10 gap-y-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-[var(--teal-accent)] font-semibold hover:underline"
                >
                  What we treat
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center gap-2 font-semibold text-[var(--navy-primary)] hover:text-[var(--teal-accent)] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The on-site laboratory — the practical reason the day works the way
          it does, and the reason margins are read while you wait. */}
      <section className="py-24 texture-ivory border-y border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-display mb-6">The laboratory is on site</h2>
              <p className="text-[var(--warm-gray)] leading-relaxed mb-6">
                Mohs surgery only works if the tissue can be read during the
                operation. Our laboratory is in the office: your tissue is
                frozen, sectioned, and examined under the microscope by your
                surgeon while you wait in the next room — nothing is sent out.
              </p>
              <p className="text-[var(--warm-gray)] leading-relaxed mb-8">
                The laboratory also runs immunoperoxidase stains, which make
                melanoma and high-risk squamous cell carcinoma visible at the
                margin. That allows cancers usually treated with wide excision
                to be removed with the same tissue-sparing, margin-controlled
                technique.
              </p>

              <div className="card-dark p-2">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/images/svc-slide-glass.webp"
                    alt="Prepared glass microscope slides catching the light in the laboratory"
                    fill
                    sizes="(min-width: 1024px) 26rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="label-caps-light px-3 py-3">
                  The On-Site Laboratory
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <p className="text-[var(--warm-gray-light)] font-semibold mb-2">
                What that means for your surgery
              </p>
              <dl className="border-t border-[var(--gray-200)]">
                {[
                  [
                    "100%",
                    "of the surgical margin is examined under the microscope — not a sample of it.",
                  ],
                  [
                    "Up to 99%",
                    "cure rate, including cancers that have been treated before.",
                  ],
                  [
                    "Same day",
                    "results. The cancer is confirmed out, and the wound repaired, before you go home.",
                  ],
                  [
                    "Less removed",
                    "because the cancer is traced to its roots, healthy tissue is preserved and scars stay smaller.",
                  ],
                ].map(([value, label]) => (
                  <div
                    key={value}
                    className="grid sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6 py-5 border-b border-[var(--gray-200)]"
                  >
                    <dt
                      className="text-2xl text-[var(--navy-primary)]"
                      style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                    >
                      {value}
                    </dt>
                    <dd className="text-[var(--warm-gray)] leading-relaxed self-center">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/services#mohs-surgery"
                className="mt-8 inline-flex items-center gap-1.5 text-[var(--teal-accent)] font-semibold hover:underline"
              >
                How Mohs surgery works, step by step
                <ChevronRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Teaching record. Fellowship training is the credential that matters
          in Mohs surgery; these three spent careers on the teaching side. */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-display mb-6">
                Surgeons who taught the surgery
              </h2>
              <p className="text-[var(--warm-gray)] leading-relaxed mb-6">
                Fellowship training is the highest credential in Mohs surgery: a
                year or more spent doing nothing but this operation under a
                senior surgeon. All three of our physicians hold it — and each
                has spent a substantial part of his career on the teaching side
                of that arrangement.
              </p>
              <Link
                href="/team"
                className="inline-flex items-center gap-1.5 text-[var(--teal-accent)] font-semibold hover:underline"
              >
                Full biographies
                <ChevronRight className="w-4 h-4" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                {[
                  {
                    name: "Dr. Edward Parry",
                    record:
                      "Professor of dermatology and director of Mohs surgery at LSU Medical Center for 17 years. He taught hundreds of dermatology residents and founded a Mohs fellowship program that graduated 15 Mohs surgeons before he entered private practice in Plano.",
                  },
                  {
                    name: "Dr. Michael Wells",
                    record:
                      "Tenured associate professor at Texas Tech University Health Sciences Center from 2001 to 2012, then fellowship trained at UT Southwestern. He continues to edit and peer review for the medical literature.",
                  },
                  {
                    name: "Dr. Gunjan Modi",
                    record:
                      "Fellowship trained at UT Southwestern, where he was voted outstanding teaching fellow. He specializes in immunoperoxidase staining and skin cancer in organ transplant recipients.",
                  },
                ].map((surgeon) => (
                  <div key={surgeon.name} className="py-6">
                    <h3
                      className="text-xl text-[var(--navy-primary)] mb-2"
                      style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                    >
                      {surgeon.name}
                    </h3>
                    <p className="text-[var(--warm-gray)] leading-relaxed">
                      {surgeon.record}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--gray-200)] grid grid-cols-3 gap-8">
                {[
                  { value: "3", label: "Fellowship-trained Mohs surgeons" },
                  { value: "15", label: "Mohs surgeons trained by our physicians" },
                  { value: "100", suffix: "s", label: "Dermatology Resident Physicians trained" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-4xl lg:text-5xl mb-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        color: "var(--bronze)",
                      }}
                    >
                      {stat.value}
                      {/* Cormorant's display "s" reads as a capital next to
                          lining figures — shrink it to lowercase scale. */}
                      {"suffix" in stat && (
                        <span className="text-[0.62em]">{stat.suffix}</span>
                      )}
                    </div>
                    <div className="text-[var(--warm-gray-light)] text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Where and when. Address, hours, parking — the logistics section. */}
      <section className="py-24 texture-ivory border-t border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-display mb-6">Where and when to come</h2>
              <p className="text-[var(--warm-gray)] leading-relaxed mb-8">
                The office is at{" "}
                <span className="font-semibold text-[var(--navy-primary)]">
                  {siteConfig.contact.address.full}
                </span>
                , with parking at the door. Surgery days start early — most
                patients check in between 7:30 and 8:00am.
              </p>

              <div className="space-y-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--teal-accent)] font-semibold hover:underline"
                >
                  <MapPin className="w-4 h-4" />
                  Get directions
                  <ChevronRight className="w-4 h-4" />
                </a>
                <p className="text-[var(--warm-gray)]">
                  Phone{" "}
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="font-semibold text-[var(--navy-primary)] hover:text-[var(--teal-accent)] transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  {" "}· Fax{" "}
                  <span className="font-semibold text-[var(--navy-primary)]">
                    {siteConfig.contact.fax}
                  </span>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <p className="text-[var(--warm-gray-light)] font-semibold mb-2">
                Office hours
              </p>
              <dl className="border-t border-[var(--gray-200)]">
                {siteConfig.hours.detailed.map((item) => (
                  <div
                    key={item.day}
                    className="grid grid-cols-[8rem_1fr] gap-6 py-3.5 border-b border-[var(--gray-200)]"
                  >
                    <dt className="text-[var(--warm-gray)]">{item.day}</dt>
                    <dd
                      className={
                        item.hours === "Closed"
                          ? "text-[var(--warm-gray-light)]"
                          : "font-semibold text-[var(--navy-primary)]"
                      }
                    >
                      {item.hours}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* The practice's own building at dusk (replaced the generic
                  Legacy West streetscape — archived in _archived-site-images/). */}
              <div className="duotone-frame aspect-[16/9] mt-10">
                <Image
                  src="/images/building-dusk.webp"
                  alt="The Plano Dermatology building at dusk, windows glowing"
                  fill
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="img-duotone object-cover"
                />
                <div
                  className="absolute inset-2 z-10 border border-[var(--hairline-bronze)] pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Final CTA. Full-bleed dark marble band, phone number set large. */}
      <LuxuryCta
        heading="Talk to us about your diagnosis"
        subtext="Most patients are seen within days of referral."
      />
    </div>
  );
}
