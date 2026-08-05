"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data/siteData";
import { CheckCircle, ChevronRight, Send } from "lucide-react";

/** Renders a server-side validation message beneath its field, if there is one. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  );
}

/**
 * Client island for the appointment request form, so /appointment can stay a
 * server component.
 *
 * Deliberately collects no clinical information: submissions travel by ordinary
 * email, which is not a HIPAA-compliant transport. See src/lib/email.ts.
 */
export function AppointmentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    visitType: "new-patient",
    reason: "",
    referralSource: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        setIsSubmitted(true);
      } else if (result.errors) {
        setFieldErrors(result.errors);
        setFormError("Please correct the highlighted fields.");
      } else {
        setFormError(
          result.message ??
            `We couldn't submit your request. Please call us at ${siteConfig.contact.phone}.`,
        );
      }
    } catch {
      // Network failure — the request never reached the server.
      setFormError(
        `We couldn't reach our server. Please call us at ${siteConfig.contact.phone}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {isSubmitted ? (
        <div className="py-10 lg:py-16">
          <p className="flex items-center gap-2 text-green-700 font-semibold mb-4">
            <CheckCircle className="w-5 h-5" />
            Request received
          </p>
          <h3 className="text-2xl lg:text-3xl text-[var(--navy-primary)] mb-3 lg:mb-4" style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>
            Thank you for your request
          </h3>
          <p className="text-[var(--warm-gray)] text-base lg:text-lg mb-6 lg:mb-8 max-w-md">
            Our team will call you within 1 business day to confirm your appointment.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--teal-accent)] font-semibold hover:gap-3 transition-all"
          >
            Return to Homepage
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-base font-medium text-[var(--navy-primary)] mb-2"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                aria-invalid={!!fieldErrors.firstName}
                aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
                placeholder="First name"
              />
              <FieldError id="firstName" message={fieldErrors.firstName} />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-base font-medium text-[var(--navy-primary)] mb-2"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                aria-invalid={!!fieldErrors.lastName}
                aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
                placeholder="Last name"
              />
              <FieldError id="lastName" message={fieldErrors.lastName} />
            </div>
          </div>
      
          {/* Contact Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-[var(--navy-primary)] mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
                placeholder="you@example.com"
              />
              <FieldError id="email" message={fieldErrors.email} />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-base font-medium text-[var(--navy-primary)] mb-2"
              >
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
                placeholder="(555) 555-5555"
              />
              <FieldError id="phone" message={fieldErrors.phone} />
            </div>
          </div>
      
          <div>
            <label
              htmlFor="visitType"
              className="block text-base font-medium text-[var(--navy-primary)] mb-2"
            >
              Have you been seen here before? *
            </label>
            <select
              id="visitType"
              name="visitType"
              required
              value={formData.visitType}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
            >
              <option value="new-patient">No — I&apos;m a new patient</option>
              <option value="returning-patient">Yes — I&apos;m a returning patient</option>
            </select>
          </div>

          {/* Referral Source */}
          <div>
            <label
              htmlFor="referralSource"
              className="block text-base font-medium text-[var(--navy-primary)] mb-2"
            >
              How did you hear about us?
            </label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
            >
              <option value="">Select an option</option>
              <option value="doctor-referral">Doctor Referral</option>
              <option value="friend-family">Friend or Family</option>
              <option value="google">Google Search</option>
              <option value="insurance">Insurance Provider</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Reason for visit — ordered by how often each brings patients in.
              Collecting this is fine on the BAA-covered Workspace transport
              (see src/lib/email.ts); it was previously omitted because the
              old email pipe couldn't carry it. */}
          <div>
            <label
              htmlFor="reason"
              className="block text-base font-medium text-[var(--navy-primary)] mb-2"
            >
              Reason for your visit *
            </label>
            <select
              id="reason"
              name="reason"
              required
              aria-invalid={!!fieldErrors.reason}
              aria-describedby={fieldErrors.reason ? "reason-error" : undefined}
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
            >
              <option value="">Select a reason</option>
              <option value="skin-cancer">Skin cancer</option>
              <option value="follow-up">Follow-up / wound check</option>
              <option value="cyst-lipoma">Cyst or lipoma</option>
              <option value="pilonidal">Pilonidal cyst</option>
              <option value="keloid">Keloids</option>
              <option value="prp-hair-loss">PRP / hair loss</option>
              <option value="skin-biopsy">Skin biopsy</option>
              <option value="laser-chemical-peel">Laser or chemical peel</option>
              <option value="nail-issue">Nail issue</option>
              <option value="other">Other</option>
            </select>
            <FieldError id="reason" message={fieldErrors.reason} />
          </div>
      
          {/* Free-text message. The copy may invite health context because
              submissions travel through the practice's own BAA-covered Google
              Workspace (see src/lib/email.ts). If that transport ever
              changes, this wording must be re-reviewed first. */}
          <div>
            <label
              htmlFor="message"
              className="block text-base font-medium text-[var(--navy-primary)] mb-2"
            >
              Message <span className="font-normal text-[var(--warm-gray-light)]">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={1000}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "message-error" : "message-help"}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
              placeholder="Tell us as much as you're comfortable sharing"
            />
            <FieldError id="message" message={fieldErrors.message} />
            <p id="message-help" className="mt-2 text-sm text-[var(--warm-gray)] leading-relaxed">
              The more context, the better we can prepare for your call — for
              example, who referred you, your diagnosis or biopsy results if
              you know them, and how soon you&apos;d like to be seen. Your
              message goes directly to our office&apos;s secure practice
              email. Prefer to talk it through instead? Call{" "}
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="font-semibold text-[var(--teal-accent)] hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
              .
            </p>
          </div>
      
          {formError && (
            <div
              role="alert"
              className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {formError}
            </div>
          )}
      
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              "Submitting Request..."
            ) : (
              <>
                <Send className="w-5 h-5" />
                Request Appointment
              </>
            )}
          </button>
      
          <p className="text-sm text-[var(--warm-gray-light)]">
            By submitting this form, you agree to be contacted by our office to schedule your appointment.
          </p>
        </form>
      )}
    </>
  );
}
