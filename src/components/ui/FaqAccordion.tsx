"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

/**
 * Client island for the FAQ list. Exists so the pages that host it can stay
 * server components — the open/closed index is the only state on them.
 *
 * Styled as a hairline-divided list, not cards: no number badges, no color
 * inversion on open. The question row is the whole click target.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="lg:col-span-3 border-t border-[var(--gray-200)]">
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;

        return (
          <div key={faq.question} className="border-b border-[var(--gray-200)]">
            <h3>
              <button
                id={`faq-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="w-full py-5 text-left flex items-center gap-4 group"
              >
                <span className="flex-1 text-lg font-semibold text-[var(--navy-primary)] group-hover:text-[var(--teal-accent)] transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-5 h-5 flex-shrink-0 text-[var(--warm-gray-light)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            {/* grid-rows 0fr->1fr animates to the content's natural height, so
                long answers are never clipped the way a fixed max-height clips them.
                `inert` keeps the collapsed panel out of the a11y tree and tab order. */}
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pr-9 text-[var(--warm-gray)] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
