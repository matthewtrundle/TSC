import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/siteData";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "The Surgery Center at Plano Dermatology's commitment to an accessible website for all patients.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility Statement",
    description:
      "The Surgery Center at Plano Dermatology's commitment to an accessible website for all patients.",
    url: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <div className="pt-28">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <div className="max-w-3xl">
            <h1 className="text-display mb-10">Accessibility statement</h1>

            <div className="space-y-10 leading-relaxed text-[var(--warm-gray)]">
              <section>
                <p>
                  {siteConfig.name} is committed to making this website usable
                  by everyone, including patients who rely on assistive
                  technology. We aim to conform to the Web Content
                  Accessibility Guidelines (WCAG) 2.1 Level AA.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  What we&rsquo;ve built in
                </h2>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Body text set at a comfortable reading size with high-contrast color pairings</li>
                  <li>Full keyboard navigation with visible focus indicators</li>
                  <li>Descriptive alternative text on images</li>
                  <li>Animation disabled for visitors whose devices request reduced motion</li>
                  <li>Generously sized touch targets for phones and tablets</li>
                  <li>Semantic headings and landmarks for screen readers</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl text-[var(--navy-primary)]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                  Found a barrier?
                </h2>
                <p>
                  If any part of this site is difficult for you to use, we
                  want to know — and our staff is available by phone during
                  office hours.
                  Call{" "}
                  <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-semibold text-[var(--bronze-text)] hover:underline">
                    {siteConfig.contact.phone}
                  </a>{" "}
                  or email{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-[var(--bronze-text)] hover:underline">
                    {siteConfig.contact.email}
                  </a>{" "}
                  and we will help directly and work to fix the issue.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
