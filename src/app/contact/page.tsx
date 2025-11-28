"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data/siteData";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f8f9fa] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--navy-primary)] mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              We&apos;re here to help. Reach out to schedule an appointment or ask a question.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-[var(--navy-primary)] mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6 mb-8">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)]">Phone</h3>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="text-gray-600 hover:text-[var(--teal-accent)]"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <p className="text-sm text-gray-500">
                        Fax: {siteConfig.contact.fax}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)]">Email</h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-gray-600 hover:text-[var(--teal-accent)]"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)]">Location</h3>
                      <p className="text-gray-600">
                        {siteConfig.contact.address.street}<br />
                        {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--teal-accent)] hover:underline"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--navy-primary)]">Office Hours</h3>
                      <div className="text-gray-600 text-sm space-y-1">
                        {siteConfig.hours.detailed.map((item) => (
                          <div key={item.day} className="flex justify-between gap-8">
                            <span>{item.day}</span>
                            <span className={item.hours === "Closed" ? "text-gray-400" : ""}>
                              {item.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Embed */}
                <div className="rounded-xl overflow-hidden h-64 bg-gray-100">
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

              {/* Right - Contact Form */}
              <div>
                <div className="bg-[#f8f9fa] rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-[var(--navy-primary)] mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-[var(--navy-primary)] mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. We&apos;ll be in touch soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-1"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[var(--navy-primary)] mb-1"
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-[var(--navy-primary)] mb-1"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="preferredContact"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-1"
                        >
                          Preferred Contact Method
                        </label>
                        <select
                          id="preferredContact"
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="phone">Phone</option>
                          <option value="email">Email</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-1"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[var(--navy-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--navy-primary)]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        By submitting this form, you agree to be contacted by our office.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-xs text-gray-500">
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
      <section className="py-12 bg-[var(--navy-primary)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Prefer to Call?
          </h2>
          <p className="text-white/80 mb-6">
            Our team is ready to assist you during office hours.
          </p>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-white text-[var(--navy-primary)] px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors text-lg"
          >
            <Phone className="w-5 h-5" />
            {siteConfig.contact.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
