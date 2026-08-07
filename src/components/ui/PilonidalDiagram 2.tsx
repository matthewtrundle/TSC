import Image from "next/image";

/**
 * Patient-education illustration of pilonidal disease in the Mayo-style flat
 * medical-diagram idiom: posterior view with a magnified cross-section inset
 * (cyst with trapped hairs, sinus tract to the surface, tailbone). Original
 * commissioned artwork — the widely-copied reference diagrams belong to other
 * clinics. Labels are HTML so they stay crisp at any zoom.
 */
export function PilonidalDiagram() {
  return (
    <figure className="m-0">
      {/* Same duotone-at-rest, color-on-hover treatment as the site's other
          imagery. */}
      <div className="duotone-frame border border-[var(--hairline)]">
        <Image
          src="/images/pilonidal-illustration.webp"
          alt="Medical illustration: posterior view of the natal cleft with an inflamed pilonidal area, and a magnified cross-section showing a pilonidal cyst containing trapped hairs, its sinus tract to the skin surface, and the tailbone"
          width={1408}
          height={768}
          className="img-duotone w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-[var(--warm-gray-light)]">
        Pilonidal cysts and abscesses form in the natal cleft near the
        tailbone. Magnified: the cyst cavity with trapped hair, and the narrow
        sinus tract opening at the skin surface.
      </figcaption>
    </figure>
  );
}
