import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/data/siteData";
import { Phone } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";


export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact The Surgery Center at Plano Dermatology — 6100 Windhaven Parkway, Plano, TX 75093. Phone (972) 378-0620.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Us", description: "Contact The Surgery Center at Plano Dermatology — 6100 Windhaven Parkway, Plano, TX 75093. Phone (972) 378-0620.", url: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-28">
      {/* Header. The phone number leads — most patients would rather call. */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div>
                <h1 className="text-display mb-6">Contact the office</h1>
                <p className="text-lg text-[var(--warm-gray)] leading-relaxed mb-8">
                  Call, write, or come by. During office hours you will reach a
                  person, not a phone tree.
                </p>
                <p className="text-[var(--warm-gray)] mb-3">
                  Prefer to call? Most questions are settled fastest by phone.
                </p>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center gap-4 text-4xl lg:text-5xl text-[var(--charcoal)] hover:text-[var(--bronze-text)] transition-colors"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  <Phone className="w-7 h-7" style={{ color: "var(--bronze)" }} />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </FadeIn>

            {/* The building, wide and prominent — so patients know what they
                are looking for before they ever open the map. Full color on
                purpose: wayfinding, not mood. */}
            <FadeIn delay={0.1}>
              <figure className="m-0">
                <div className="border border-[var(--gray-200)] rounded-sm overflow-hidden">
                  <Image
                    src="/images/building-morning.webp"
                    alt="The Plano Dermatology building: two-story red brick with a drive-under porte-cochere and PLANO DERMATOLOGY in white letters"
                    width={1600}
                    height={679}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </figure>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact details, map, and the message form. */}
      <section className="py-20 bg-white border-t border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left — the facts, typeset plainly. */}
            <FadeIn className="lg:col-span-2">
              <div>
                <dl className="border-t border-[var(--gray-200)]">
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-6 py-4 border-b border-[var(--gray-200)]">
                    <dt className="label-caps pt-1">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="text-lg font-semibold text-[var(--navy-primary)] hover:text-[var(--teal-accent)] transition-colors"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </dd>
                  </div>

                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-6 py-4 border-b border-[var(--gray-200)]">
                    <dt className="label-caps pt-1">Fax</dt>
                    <dd className="text-[var(--warm-gray)]">{siteConfig.contact.fax}</dd>
                  </div>

                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-6 py-4 border-b border-[var(--gray-200)]">
                    <dt className="label-caps pt-1">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-[var(--navy-primary)] font-semibold hover:text-[var(--teal-accent)] transition-colors break-all"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>

                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-6 py-4 border-b border-[var(--gray-200)]">
                    <dt className="label-caps pt-1">Address</dt>
                    <dd className="text-[var(--warm-gray)]">
                      {siteConfig.contact.address.street}
                      <br />
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                      {siteConfig.contact.address.zip}
                      <br />
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--teal-accent)] font-semibold hover:underline mt-1 inline-block"
                      >
                        Get directions
                      </a>
                    </dd>
                  </div>

                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-6 py-4 border-b border-[var(--gray-200)]">
                    <dt className="label-caps pt-1">Hours</dt>
                    <dd className="text-[var(--warm-gray)]">
                      <div className="space-y-1">
                        {siteConfig.hours.detailed.map((item) => (
                          // flex-wrap: on the narrowest phones the label column
                          // leaves too little room for day + time on one line,
                          // so the time drops to its own right-aligned line.
                          <div key={item.day} className="flex flex-wrap justify-between gap-x-4">
                            <span>{item.day}</span>
                            <span
                              className={`ml-auto whitespace-nowrap ${
                                item.hours === "Closed" ? "text-[var(--warm-gray-light)]" : ""
                              }`}
                            >
                              {item.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </dd>
                  </div>
                </dl>

                {/* Map — hairline border; the CSS filter mutes Google's default
                    palette toward the site's ivory/charcoal so the embed stops
                    looking like a foreign widget. */}
                <div className="mt-8 h-72 border border-[var(--gray-200)] rounded-sm overflow-hidden">
                  <iframe
                    // Keyless embed endpoint — the previous URL used a public
                    // demo API key that Google rejects, leaving a blank box.
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address.full)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: "grayscale(0.92) sepia(0.18) contrast(0.96) brightness(1.02)",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right — the message form on a stone panel with a hairline. */}
            <FadeIn delay={0.15} className="lg:col-span-3">
              <div className="bg-[var(--surface)] border border-[var(--hairline-bronze)] rounded-sm p-6 lg:p-10">
                <h2
                  className="text-2xl text-[var(--navy-primary)] mb-2"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                >
                  Send us a message
                </h2>
                <p className="text-[var(--warm-gray)] mb-8">
                  Write to us here and we will reply by phone or email,
                  whichever you prefer.
                </p>

                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white border-t border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl text-sm text-[var(--warm-gray-light)]">
            <p>
              <strong>DISCLAIMER:</strong> By providing my wireless phone number to The Surgery
              Center at Plano Dermatology, I agree and acknowledge that The Surgery Center at
              Plano Dermatology may send text messages to my wireless phone number for any purpose,
              including marketing purposes. Message and data rates may apply. Message frequency
              will vary, and you will be able to Opt-out by replying &quot;STOP&quot;, assistance can be
              found by texting &quot;HELP&quot;.
            </p>
            <p className="mt-2">
              Privacy Policy: No mobile information will be shared with third parties/affiliates
              for marketing/promotional purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
