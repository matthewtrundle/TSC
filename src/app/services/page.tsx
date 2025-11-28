import Link from "next/link";
import Image from "next/image";
import { siteConfig, services, skinCancerTypes, mohsProcess, practiceInfo } from "@/lib/data/siteData";
import { Phone, ChevronRight, CheckCircle, Microscope, Shield, Heart, Plus } from "lucide-react";

export const metadata = {
  title: "Services | The Surgery Center at Plano Dermatology",
  description: "Comprehensive skin cancer treatment services including Mohs micrographic surgery, skin cancer diagnosis, reconstructive surgery, and more.",
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  microscope: Microscope,
  shield: Shield,
  heart: Heart,
  plus: Plus,
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f8f9fa] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--navy-primary)] mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive skin cancer treatment from diagnosis through reconstruction.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Microscope;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24"
                >
                  <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={!isEven ? 'lg:order-2' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[var(--teal-accent)]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--navy-primary)]">
                          {service.name}
                        </h2>
                      </div>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <div className="space-y-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`bg-[#f8f9fa] rounded-xl p-6 ${!isEven ? 'lg:order-1' : ''}`}>
                      {service.id === 'mohs-surgery' ? (
                        <>
                          <h3 className="font-semibold text-[var(--navy-primary)] mb-4">
                            The Mohs Process
                          </h3>
                          <div className="space-y-3">
                            {mohsProcess.slice(0, 6).map((step) => (
                              <div key={step.step} className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-[var(--navy-primary)] text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                                  {step.step}
                                </div>
                                <div>
                                  <div className="font-medium text-[var(--navy-primary)] text-sm">
                                    {step.title}
                                  </div>
                                  <div className="text-xs text-gray-600">{step.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                          <Image
                            src="/images/generated/medical-consultation.png"
                            alt={service.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {index < services.length - 1 && (
                    <hr className="mt-16 border-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skin Cancer Types */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-3">
                Skin Cancers We Treat
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our surgeons are experts in treating all types of skin cancer, from the
                most common to rare and complex cases.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skinCancerTypes.map((type) => (
                <div
                  key={type.shortName}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="font-semibold text-[var(--navy-primary)] mb-2">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mohs Surgery Detail Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-6 text-center">
              About Mohs Micrographic Surgery
            </h2>

            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-600 mb-4">
                {practiceInfo.mohsDescription.split('\n\n')[0]}
              </p>
              <p className="text-gray-600 mb-4">
                {practiceInfo.mohsDescription.split('\n\n')[1]}
              </p>
              <p className="text-gray-600">
                {practiceInfo.mohsDescription.split('\n\n')[2]}
              </p>
            </div>

            <div className="bg-[#f8f9fa] rounded-xl p-6">
              <h3 className="font-semibold text-[var(--navy-primary)] mb-4">
                Advantages of Mohs Surgery
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {practiceInfo.advantages.map((advantage) => (
                  <div key={advantage} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-8 text-center">
              What to Expect
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-[var(--navy-primary)] mb-3">
                  Before Surgery
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Get a good night&apos;s rest</li>
                  <li>Eat a good breakfast</li>
                  <li>Take regular medications unless directed otherwise</li>
                  <li>Avoid aspirin for 2 weeks prior</li>
                  <li>Avoid alcohol for 2 days prior</li>
                  <li>Bring a book or magazine</li>
                  <li>Arrange for someone to drive you home</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-[var(--navy-primary)] mb-3">
                  During Surgery
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Local anesthesia keeps you comfortable</li>
                  <li>Each stage takes 1-2 hours</li>
                  <li>Average of 2-3 stages needed</li>
                  <li>Most complete by midday</li>
                  <li>Tissue examined while you wait</li>
                  <li>Stay in our comfortable waiting area</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-[var(--navy-primary)] mb-3">
                  After Surgery
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Wound care instructions provided</li>
                  <li>Follow-up in 4-6 weeks</li>
                  <li>Then at 3 months, 6 months, annually</li>
                  <li>5-year observation period</li>
                  <li>Healing takes 6-18 months</li>
                  <li>Use sun protection going forward</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--navy-primary)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Our Services?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Contact us to learn more about our services or to schedule
            a consultation with one of our board certified surgeons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--navy-primary)] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.contact.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us Online
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
