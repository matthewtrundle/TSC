import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/siteData";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Surgery Center at Plano Dermatology handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How The Surgery Center at Plano Dermatology handles information submitted through this website.",
    url: "/privacy",
  },
};

const EFFECTIVE_DATE = "August 3, 2026";

export default function PrivacyPage() {
  return (
    <div className="pt-28">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <div className="max-w-3xl">
            <h1 className="text-display mb-4">Privacy policy</h1>
            <p className="mb-12 text-sm text-[var(--warm-gray-light)]">
              Effective {EFFECTIVE_DATE} · Applies to this website
            </p>

            <div className="space-y-10 leading-relaxed text-[var(--warm-gray)]">
              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  What this policy covers
                </h2>
                <p>
                  This policy describes how {siteConfig.name} handles
                  information you submit through this website. Your medical
                  records and protected health information are governed
                  separately by our Notice of Privacy Practices under HIPAA,
                  available from our office — please call{" "}
                  <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-semibold text-[var(--bronze-text)] hover:underline">
                    {siteConfig.contact.phone}
                  </a>{" "}
                  to request a copy.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  Information we collect
                </h2>
                <p>
                  The only personal information this website collects is what
                  you choose to submit through our contact and appointment
                  request forms: your name, phone number, email address, and
                  any message you include. Form submissions are delivered to
                  our practice&apos;s email system, which operates under our
                  HIPAA compliance program, and any health information you
                  choose to share is treated as confidential patient
                  information.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  How we use it
                </h2>
                <p>
                  Form submissions are delivered securely to our office staff
                  and used to respond to your request, verify insurance, and
                  schedule your visit. We do not sell personal information,
                  and we do not share it with third parties for their
                  marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  Cookies and tracking
                </h2>
                <p>
                  This website uses privacy-preserving, cookieless analytics
                  (Vercel Web Analytics) that count page visits without
                  identifying or tracking individual visitors. It does not set
                  advertising cookies and does not use advertising or
                  social-media tracking pixels. Embedded
                  third-party content — such as the Google map on our contact
                  page — and the external services we link to (our patient
                  portal, bill pay, and Google reviews) are operated by their
                  respective providers and governed by their own privacy
                  policies.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  Text messages
                </h2>
                <p>
                  If you provide a wireless phone number, {siteConfig.name}{" "}
                  may send text messages to that number, including appointment
                  communications. Message and data rates may apply and message
                  frequency will vary. Reply &quot;STOP&quot; to opt out or
                  &quot;HELP&quot; for assistance. No mobile information will
                  be shared with third parties or affiliates for marketing or
                  promotional purposes.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  Questions
                </h2>
                <p>
                  Contact us at{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-[var(--bronze-text)] hover:underline">
                    {siteConfig.contact.email}
                  </a>{" "}
                  or {siteConfig.contact.phone}, or write to us at{" "}
                  {siteConfig.contact.address.full}.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
