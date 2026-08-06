import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCallBar from "@/components/layout/MobileCallBar";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd, medicalBusinessSchema, SITE_URL } from "@/lib/structuredData";

// Three-tier type system: Cormorant Garamond carries display sizes only
// (≥32px — too fine below that for a 55+ audience), Source Serif 4 the
// mid-size serif moments, Libre Franklin the reading and UI.
const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  // Lets per-page `openGraph` and `alternates` use relative paths.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mohs Surgery in Plano, TX | The Surgery Center at Plano Dermatology",
    template: "%s | Plano Dermatology",
  },
  alternates: { canonical: "/" },
  description:
    "Fellowship-trained Mohs surgeons treating skin cancer in Plano, TX - margins read in our own lab, cure rates up to 99%. Physician-owned. (972) 378-0620.",
  keywords: [
    "Mohs surgery",
    "skin cancer treatment",
    "dermatology Plano TX",
    "skin cancer surgery",
    "board certified dermatologist",
    "Plano dermatology",
    "Dr Modi dermatologist",
    "Dr Wells dermatologist",
    "Dr Parry dermatologist",
  ],
  authors: [{ name: "The Surgery Center at Plano Dermatology" }],
  creator: "The Surgery Center at Plano Dermatology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://planoderm.com",
    siteName: "The Surgery Center at Plano Dermatology",
    title: "The Surgery Center at Plano Dermatology | Skin Cancer Specialists",
    description:
      "Expert skin cancer surgery and medical dermatology care in Plano, Texas. Board-certified Mohs surgeons providing compassionate, advanced treatment.",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "The Surgery Center at Plano Dermatology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Surgery Center at Plano Dermatology",
    description: "Expert skin cancer surgery and medical dermatology care in Plano, Texas.",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "The Surgery Center at Plano Dermatology",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables must live on <html>, not <body>: globals.css composes
    // --font-serif from --font-source-serif inside :root. Declared on <body>,
    // the reference is unresolvable at :root and the whole property is invalid,
    // so every serif heading silently falls back to the sans stack.
    <html lang="en" className={`scroll-smooth ${franklin.variable} ${sourceSerif.variable} ${cormorant.variable}`}>
      {/* Reserves space for the fixed MobileCallBar below lg so no content
          (footer links especially) hides behind it — 56px bar height plus the
          home-indicator safe area on notched phones. */}
      <body className="antialiased pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <JsonLd data={medicalBusinessSchema()} />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileCallBar />
        <Analytics />
      </body>
    </html>
  );
}
