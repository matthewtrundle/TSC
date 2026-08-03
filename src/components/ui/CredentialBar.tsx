import Image from "next/image";

// Official marks, downloaded from each organization's own site. All render
// grayscale at uniform height so six different brand palettes read as one
// quiet strip; each links out to the organization (or, for D Best, to
// Dr. Modi's D Magazine directory profile).
const ITEMS = [
  {
    // True vector (Adobe-vectorized from the College's own artwork) —
    // resolution-independent at any zoom.
    name: "American College of Mohs Surgery",
    logo: "/images/societies/acms.svg",
    width: 1875,
    height: 475,
    href: "https://www.mohscollege.org",
  },
  {
    // The board's official round seal, extracted from ABD's own 2023 annual
    // report PDF. The name renders as live text beside it (per abderm.org's
    // own header lockup) — text stays perfectly sharp at any zoom.
    name: "American Board of Dermatology",
    logo: "/images/societies/abd-seal.png",
    width: 1700,
    height: 1700,
    href: "https://www.abderm.org",
    seal: true,
    textLockup: true,
  },
  {
    name: "American Academy of Dermatology",
    logo: "/images/societies/aad.svg",
    width: 1157,
    height: 475,
    href: "https://www.aad.org",
  },
  {
    name: "American Society for Dermatologic Surgery",
    logo: "/images/societies/asds.png",
    width: 1176,
    height: 398,
    href: "https://www.asds.net",
  },
  {
    name: "Certification Matters — American Board of Medical Specialties",
    logo: "/images/societies/certification-matters.png",
    width: 300,
    height: 103,
    href: "https://www.certificationmatters.org",
  },
  {
    // Year-less crop of D Magazine's official badge artwork.
    name: "D Magazine Best Doctors",
    logo: "/images/societies/d-best-mark.png",
    width: 821,
    height: 978,
    href: "https://directory.dmagazine.com/doctors/gunjan-m-modi-md/",
    seal: true,
  },
] as const;

type CredentialBarProps = {
  variant?: "light" | "dark";
  className?: string;
};

/**
 * The credential strip. Light variant: official logos, grayscale and muted,
 * uniform height, each linking out. Dark variant (footer): the color artwork
 * doesn't survive charcoal, so names stay typeset in champagne tracked caps —
 * now as links — with diamond separators.
 */
export function CredentialBar({
  variant = "light",
  className = "",
}: CredentialBarProps) {
  if (variant === "dark") {
    return (
      <ul
        className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-3 ${className}`.trim()}
      >
        {ITEMS.map((item, index) => (
          <li key={item.name} className="flex items-center gap-x-5">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="text-[0.4375rem] leading-none text-[var(--champagne)]"
              >
                &#9670;
              </span>
            )}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps-light whitespace-nowrap text-xs transition-opacity hover:opacity-75"
            >
              {item.name.split(" — ")[0]}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 ${className}`.trim()}
    >
      {ITEMS.map((item) => (
        <li key={item.name} className="flex items-center">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-100"
            title={item.name}
          >
            <Image
              src={item.logo}
              alt={item.name}
              width={item.width}
              height={item.height}
              // Round/stacked marks optically read smaller than horizontal
              // lockups, so they get a step more height.
              className={`w-auto opacity-75 grayscale ${
                "seal" in item && item.seal ? "h-12 lg:h-14" : "h-9 lg:h-11"
              }`}
            />
            {"textLockup" in item && item.textLockup && (
              <span className="text-left text-[0.8125rem] font-semibold leading-snug text-[var(--charcoal)] opacity-75">
                American Board
                <br />
                of Dermatology
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
