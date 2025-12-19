"use client";

import { useEffect, useRef, useState } from "react";

interface MohsStep {
  step: number;
  title: string;
  description: string;
}

interface MohsStepperProps {
  steps: MohsStep[];
}

export function MohsStepper({ steps }: MohsStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="mohs-stepper">
      {/* Vertical progress line */}
      <div className="mohs-stepper-line">
        <div
          className="mohs-stepper-progress"
          style={{
            height: `${((activeStep + 1) / steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      <div className="mohs-stepper-steps">
        {steps.map((step, index) => (
          <div
            key={step.step}
            ref={(el) => { stepRefs.current[index] = el; }}
            className={`mohs-stepper-item ${
              index === activeStep ? "active" : ""
            } ${index < activeStep ? "completed" : ""}`}
          >
            <div className="mohs-stepper-number">
              {index < activeStep ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step.step
              )}
            </div>
            <div className="mohs-stepper-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
