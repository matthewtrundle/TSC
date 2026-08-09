import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structuredData";
import { procedures } from "@/lib/data/proceduresData";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...procedures.map((p) => ({
      url: `${SITE_URL}/services/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/team`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/practice`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/referring`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/areas-we-serve`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/appointment`, lastModified, changeFrequency: "yearly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/accessibility`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
