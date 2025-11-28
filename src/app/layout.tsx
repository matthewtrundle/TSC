import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Surgery Center at Plano Dermatology | Skin Cancer Specialists",
    template: "%s | Plano Dermatology",
  },
  description:
    "Expert skin cancer surgery and medical dermatology care in Plano, Texas. Board-certified Mohs surgeons Dr. Modi, Dr. Wells, and Dr. Parry provide compassionate, advanced treatment.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "The Surgery Center at Plano Dermatology",
    description: "Expert skin cancer surgery and medical dermatology care in Plano, Texas.",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
