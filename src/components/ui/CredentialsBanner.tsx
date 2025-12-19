"use client";

import Image from "next/image";

export function CredentialsBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Container crops the gray areas from the banner image */}
        <div className="relative h-[100px] overflow-hidden">
          <Image
            src="/images/banner.png"
            alt="TSC - The Surgery Center credentials: American Board of Dermatology, American College of Mohs Surgery, American Academy of Dermatology, American Society for Dermatologic Surgery"
            fill
            className="object-contain object-center scale-[1.3]"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
