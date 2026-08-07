"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export type ServiceAccordionItem = {
  href: string;
  name: string;
  note: string;
  /** Expanded copy — the service's fuller description. */
  detail: string;
  /** Feature bullets, already filtered of anything unpublishable. */
  features: string[];
};

/**
 * The homepage treatment index as expand-in-place rows. Feedback-driven: the
 * previous version linked each row to /services#anchor, which navigated,
 * shifted, and reloaded — jarring mid-scroll. Now the row opens a summary
 * right here, with a quiet link through for the full write-up.
 */
export function ServiceAccordion({ items }: { items: ServiceAccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-[var(--gray-200)]">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.href} className="border-b border-[var(--gray-200)]">
            <h3 className="m-0">
              <button
                id={`svc-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`svc-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-7 text-left transition-colors hover:bg-[var(--cream)] md:gap-8"
              >
                <span>
                  <span
                    className="mb-1 block text-2xl leading-snug text-[var(--navy-primary)] lg:text-[1.75rem]"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                  >
                    {item.name}
                  </span>
                  <span className="block text-[var(--warm-gray-light)]">{item.note}</span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 self-center text-[var(--teal-accent)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>

            <div
              id={`svc-panel-${index}`}
              role="region"
              aria-labelledby={`svc-trigger-${index}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-8 pb-8 lg:grid-cols-2 lg:gap-14">
                  <p className="leading-relaxed text-[var(--warm-gray)]">{item.detail}</p>
                  <div>
                    <ul className="space-y-2.5">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-[var(--warm-gray)]">
                          <span
                            aria-hidden="true"
                            className="mt-[0.6875rem] h-px w-4 shrink-0 bg-[var(--bronze)]"
                          />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex items-center gap-1.5 font-semibold text-[var(--teal-accent)] transition-all hover:gap-2.5"
                    >
                      The full write-up
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
