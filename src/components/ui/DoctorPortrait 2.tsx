import Image from "next/image";

/**
 * Portrait slot for a surgeon.
 *
 * Renders the photograph when one exists, and an initials monogram when one
 * does not. The site previously shipped AI-generated faces (carrying visible
 * Gemini watermarks) captioned with the real names of three practising
 * physicians. A monogram is honest about the absence; a synthetic face is not.
 *
 * To restore photography: drop the file in /public/images/, set `image` on the
 * doctor record in src/lib/data/siteData.ts, and this renders it automatically.
 */
export function DoctorPortrait({
  name,
  image,
  className = "",
  sizes,
  priority = false,
}: {
  name: string;
  image?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover object-top ${className}`}
      />
    );
  }

  // "Gunjan Modi, MD, FAAD" -> "GM"
  const initials = name
    .split(",")[0]
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[var(--cream)]"
      role="img"
      aria-label={`Portrait of ${name} not yet available`}
    >
      <span
        className="text-5xl text-[var(--navy-primary)]/30 tracking-widest"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {initials}
      </span>
    </div>
  );
}
