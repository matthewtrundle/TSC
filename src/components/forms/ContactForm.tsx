"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data/siteData";
import { CheckCircle, Send } from "lucide-react";

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
 * Client island for the general contact form, so /contact can stay a server
 * component. Submissions travel by ordinary email, so the form warns against
 * including medical detail. See src/lib/email.ts.
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "phone",
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
      const response = await fetch("/api/contact", {
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
            `We couldn't send your message. Please call us at ${siteConfig.contact.phone}.`,
        );
      }
    } catch {
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
        <div className="py-12">
          <p className="flex items-center gap-2 text-green-700 font-semibold mb-4">
            <CheckCircle className="w-5 h-5" />
            Message sent
          </p>
          <h3 className="text-2xl text-[var(--navy-primary)] mb-3" style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>
            Thank you for writing
          </h3>
          <p className="text-[var(--warm-gray)]">
            We&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-[var(--navy-primary)] mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
              placeholder="Your name"
            />
            <FieldError id="name" message={fieldErrors.name} />
          </div>
      
          <div className="grid md:grid-cols-2 gap-5">
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
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
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
              htmlFor="preferredContact"
              className="block text-base font-medium text-[var(--navy-primary)] mb-2"
            >
              Preferred Contact Method
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] bg-white"
            >
              <option value="phone">Phone</option>
              <option value="email">Email</option>
            </select>
          </div>
      
          <div>
            <label
              htmlFor="message"
              className="block text-base font-medium text-[var(--navy-primary)] mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              aria-invalid={!!fieldErrors.message}
              aria-describedby="message-privacy-note"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-base rounded-sm border border-[var(--gray-200)] resize-none bg-white"
              placeholder="How can we help you?"
            />
            <p
              id="message-privacy-note"
              className="mt-2 text-base text-[var(--warm-gray-light)]"
            >
              Please don&apos;t include medical details — this form isn&apos;t a
              secure channel for health information. Call us at{" "}
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="font-semibold text-[var(--teal-accent)] hover:underline"
              >
                {siteConfig.contact.phone}
              </a>{" "}
              to discuss symptoms or your medical history.
            </p>
            <FieldError id="message" message={fieldErrors.message} />
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
              "Sending..."
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
      
          <p className="text-sm text-[var(--warm-gray-light)]">
            By submitting this form, you agree to be contacted by our office.
          </p>
        </form>
      )}
    </>
  );
}
