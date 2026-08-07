import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/data/siteData";
import { Mail, Phone, Printer } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { LuxuryCta } from "@/components/ui/LuxuryCta";

export const metadata: Metadata = {
  title: "Referring Physicians",
  description:
    "Refer a patient for Mohs micrographic surgery in Plano, Texas. Referred patients are seen within days, and every patient returns to the referring physician's care.",
  alternates: { canonical: "/referring" },
  openGraph: {
    title: "Referring Physicians",
    description:
      "Refer a patient for Mohs micrographic surgery in Plano, Texas. Referred patients are seen within days, and every patient returns to the referring physician's care.",
    url: "/referring",
  },
};

export default function ReferringPage() {
  return (
    <div className="pt-28">
      {/* Header. The promise to the referring physician, stated plainly. */}
      <section className="bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <p className="label-caps mb-6">For Referring Physicians</p>
              <h1 className="text-hero mb-6">Refer a patient</h1>
              <p className="text-lg text-[var(--warm-gray-light)] leading-relaxed">
                Skin cancer surgery is what we do, and referrals are how most
                of it arrives.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <p className="text-lg text-[var(--warm-gray)] leading-relaxed">
                Most referred patients are seen within days. We report back
                promptly after surgery, and we return every patient to your
                care — we treat the cancer you send us and send the patient
                back. No referral forms or portals are required: a phone call
                or a fax is enough, and our staff handles the rest with your
                office and the patient.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How to refer — numbered hairline list. */}
      <section className="py-24 texture-ivory border-y border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-display mb-6">How to refer</h2>
              <p className="text-[var(--warm-gray)] leading-relaxed mb-8">
                Call the office, fax the referral, or send it by secure email.
                However it reaches us, we schedule directly with the patient
                and confirm the appointment with your office.
              </p>

              <div className="space-y-5">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center gap-3 py-1 text-3xl font-medium text-[var(--navy-primary)] transition-colors hover:text-[var(--teal-accent)] lg:text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <Phone className="h-6 w-6 shrink-0" />
                  {siteConfig.contact.phone}
                </a>
                <p
                  className="flex items-center gap-3 text-2xl font-medium text-[var(--navy-primary)] lg:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <Printer className="h-5 w-5 shrink-0 text-[var(--bronze-text)]" aria-hidden="true" />
                  <span>{siteConfig.contact.fax}</span>
                  <span className="label-caps pt-1 text-xs">Fax</span>
                </p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 py-1 text-xl font-medium text-[var(--navy-primary)] transition-colors hover:text-[var(--teal-accent)] lg:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <Mail className="h-5 w-5 shrink-0 text-[var(--bronze-text)]" aria-hidden="true" />
                  <span>{siteConfig.contact.email}</span>
                  <span className="label-caps whitespace-nowrap pt-1 text-xs">Secure email</span>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <p className="text-[var(--warm-gray-light)] font-semibold mb-2">
                What to include with the referral
              </p>
              <ol className="border-t border-[var(--gray-200)]">
                {[
                  {
                    title: "Patient contact information",
                    note: "Name, date of birth, and a phone number where we can reach the patient to schedule.",
                  },
                  {
                    title: "Diagnosis and biopsy report, if available",
                    note: "The pathology report and biopsy site help us plan the surgery — send what you have, and we will follow up for the rest.",
                  },
                  {
                    title: "Insurance details",
                    note: "So our staff can verify benefits before the patient's visit. Most insurance is accepted.",
                  },
                ].map((item, index) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-[3.5rem_1fr] gap-4 sm:gap-6 py-6 border-b border-[var(--gray-200)]"
                  >
                    <span
                      className="text-3xl text-[var(--bronze)] leading-none pt-0.5"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-lg font-semibold text-[var(--navy-primary)] mb-1">
                        {item.title}
                      </span>
                      <span className="block text-[var(--warm-gray)] leading-relaxed">
                        {item.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we send back — hairline list, mirrored structure. */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-display mb-6">What we send back</h2>
              <p className="text-[var(--warm-gray)] leading-relaxed">
                A referral is a loan, not a transfer. You stay the patient&rsquo;s
                dermatologist; we document what was done and hand the patient
                back.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                {[
                  {
                    title: "A procedure letter, with photos and disposition",
                    note: "Your office receives a procedure letter that includes clinical photographs and the final disposition — what was found, what was done, and where things stand.",
                  },
                  {
                    title: "Wound care handoff",
                    note: "How the wound was repaired and the follow-up instructions the patient was given, so your office knows exactly where healing stands.",
                  },
                  {
                    title: "Escalation of care, coordinated",
                    note: "We act as coordinators of care. When a case calls for it, we handle the referrals — radiation oncology, plastic surgery, medical oncology — and keep you informed at every step.",
                  },
                  {
                    title: "The patient, returned to your care",
                    note: "Ongoing surveillance belongs with you. Once the surgical follow-up is complete, the patient goes back to your practice for skin checks and long-term monitoring.",
                  },
                ].map((item) => (
                  <div key={item.title} className="py-6">
                    <h3
                      className="text-xl text-[var(--navy-primary)] mb-2"
                      style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[var(--warm-gray)] leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why physicians refer here — quiet dark panel with the differentiators. */}
      <section className="pb-24 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="card-dark p-8 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <p className="label-caps-light mb-5">Why Physicians Refer Here</p>
                  <h2
                    className="text-display mb-6"
                    style={{ color: "var(--ivory)" }}
                  >
                    A laboratory down the hall, and surgeons who taught the surgery
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-white/75">
                    Our laboratory runs immunoperoxidase stains on site during
                    Mohs surgery — including MART-1 and SOX10 for melanoma. Melanoma and high-risk squamous cell
                    carcinoma become visible at the margin, so cancers usually
                    treated with wide excision can be removed with the same
                    tissue-sparing, margin-controlled technique.
                  </p>
                  <p className="text-lg leading-relaxed text-white/75">
                    All three of our surgeons are board certified in dermatology
                    and fellowship trained in Mohs surgery, and between them
                    they have trained fifteen Mohs surgeons and hundreds of
                    dermatology residents.
                  </p>
                </div>

                <div className="duotone-frame aspect-[4/3]">
                  <Image
                    src="/images/svc-slides-he.webp"
                    alt="Glass slides with H&E-stained Mohs frozen sections — pink and magenta tissue discs"
                    fill
                    sizes="(min-width: 1024px) 32rem, 100vw"
                    className="img-duotone object-cover"
                  />
                  <div
                    className="absolute inset-2 z-10 border border-[var(--hairline-bronze)] pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA. Full-bleed dark marble band, phone number set large. */}
      <LuxuryCta
        heading="Refer a patient today"
        subtext="Call the office and we will take it from there."
      />
    </div>
  );
}
