"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data/siteData";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "phone",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[var(--cream)]/30 via-white to-white py-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Get in Touch</p>
              <h1 className="text-display mb-6">
                Contact Us
              </h1>
              <div className="organic-accent-line" />
              <p className="text-xl text-[var(--warm-gray)] mt-6">
                We&apos;re here to help. Reach out to schedule an appointment or ask a question.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <FadeIn>
              <div>
                <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Contact Information</p>
                <h2 className="text-display mb-8">
                  Get in Touch
                </h2>

                <div className="space-y-6 mb-10">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/15 to-[var(--teal-accent)]/5 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)] mb-1">Phone</h3>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="text-[var(--warm-gray)] hover:text-[var(--teal-accent)] transition-colors"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <p className="text-sm text-[var(--warm-gray)]/70">
                        Fax: {siteConfig.contact.fax}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/15 to-[var(--teal-accent)]/5 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)] mb-1">Email</h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-[var(--warm-gray)] hover:text-[var(--teal-accent)] transition-colors"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/15 to-[var(--teal-accent)]/5 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)] mb-1">Location</h3>
                      <p className="text-[var(--warm-gray)]">
                        {siteConfig.contact.address.street}<br />
                        {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--teal-accent)] font-medium hover:underline mt-1 inline-block"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/15 to-[var(--teal-accent)]/5 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)] mb-2">Office Hours</h3>
                      <div className="text-[var(--warm-gray)] text-sm space-y-1">
                        {siteConfig.hours.detailed.map((item) => (
                          <div key={item.day} className="flex justify-between gap-8">
                            <span>{item.day}</span>
                            <span className={item.hours === "Closed" ? "text-[var(--warm-gray)]/50" : ""}>
                              {item.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Embed */}
                <div className="rounded-2xl overflow-hidden h-72 shadow-lg">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right - Contact Form */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-10 border border-[var(--gray-200)] shadow-lg">
                <h2 className="text-2xl font-bold text-[var(--navy-primary)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  Send Us a Message
                </h2>
                <p className="text-[var(--warm-gray)] mb-8 text-sm">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--navy-primary)] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                      Message Sent!
                    </h3>
                    <p className="text-[var(--warm-gray)]">
                      Thank you for contacting us. We&apos;ll be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                          placeholder="(555) 555-5555"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="preferredContact"
                        className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                      >
                        Preferred Contact Method
                      </label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all resize-none bg-white"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--navy-primary)] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[var(--navy-primary)]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
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

                    <p className="text-xs text-[var(--warm-gray)] text-center">
                      By submitting this form, you agree to be contacted by our office.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-[var(--cream)]/30 border-t border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-xs text-[var(--warm-gray)]">
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

      {/* Quick Call CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--cream)] via-white to-[var(--teal-accent)]/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--teal-accent)]/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="bg-[var(--navy-primary)] rounded-3xl p-12 relative overflow-hidden shadow-2xl">
              {/* Inner decorative orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--teal-accent)]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'white' }}>
                  Prefer to Call?
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  Our team is ready to assist you during office hours.
                </p>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-[var(--teal-accent)] text-white px-10 py-5 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors text-xl shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
