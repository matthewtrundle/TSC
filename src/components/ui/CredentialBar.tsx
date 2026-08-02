import Image from "next/image";

// Official society marks, downloaded from each organization's own site.
// The ACMS artwork ships white-only, so a charcoal-tinted copy (same alpha)
// is used on light backgrounds. All render grayscale at uniform height so
// four different brand palettes read as one quiet strip.
const SOCIETIES = [
  {
    name: "American College of Mohs Surgery",
    logo: "/images/societies/acms.png",
    width: 1875,
    height: 475,
  },
  {
    // The board's official round seal, extracted from ABD's own 2023 annual
    // report PDF (their site serves no standalone asset above 258px).
    name: "American Board of Dermatology",
    logo: "/images/societies/abd-seal.png",
    width: 1700,
    height: 1700,
    seal: true,
  },
  {
    name: "American Academy of Dermatology",
    logo: "/images/societies/aad.svg",
    width: 1157,
    height: 475,
  },
  {
    name: "American Society for Dermatologic Surgery",
    logo: "/images/societies/asds.png",
    width: 1176,
    height: 398,
  },
] as const;

type CredentialBarProps = {
  variant?: "light" | "dark";
  className?: string;
};

/**
 * The four professional societies. On light backgrounds: their official
 * logos, grayscale and slightly muted, uniform height. On dark bands the
 * color artwork doesn't survive, so the names stay typeset in champagne
 * tracked caps with diamond separators.
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
        {SOCIETIES.map((society, index) => (
          <li key={society.name} className="flex items-center gap-x-5">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="text-[0.4375rem] leading-none text-[var(--champagne)]"
              >
                &#9670;
              </span>
            )}
            <span className="label-caps-light whitespace-nowrap text-xs">
              {society.name}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 ${className}`.trim()}
    >
      {SOCIETIES.map((society) => (
        <li key={society.name} className="flex items-center">
          <Image
            src={society.logo}
            alt={society.name}
            width={society.width}
            height={society.height}
            // Round seals optically read smaller than horizontal lockups, so
            // they get a step more height to sit at the same visual weight.
            className={`w-auto opacity-75 grayscale ${
              "seal" in society && society.seal ? "h-12 lg:h-14" : "h-9 lg:h-11"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
