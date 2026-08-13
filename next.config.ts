import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ==========================================================================
  // LEGACY URL REDIRECTS — preserves Google equity when this site replaces
  // the old WordPress planoderm.com. Sources taken from the old site's own
  // sitemaps (page-sitemap.xml, our-team-sitemap.xml, post-sitemap.xml),
  // captured 2026-08-04. All permanent (301/308).
  //
  // Marked UPDATE-LATER: destinations to revisit when the patient-resources
  // and insurance pages ship — point them at the new pages then.
  // ==========================================================================
  async redirects() {
    return [
      // Contact & location
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/location", destination: "/contact", permanent: true },

      // Mohs surgery
      {
        source: "/mohs-micrographic-surgery",
        destination: "/services#mohs-surgery",
        permanent: true,
      },

      // Physicians
      { source: "/physicians", destination: "/team", permanent: true },
      // Old per-doctor URLs point at the dedicated surgeon pages
      // (2026-08-13) so their accumulated link equity lands there.
      { source: "/physicians/modi", destination: "/team/dr-gunjan-modi", permanent: true },
      { source: "/physicians/wells", destination: "/team/dr-michael-wells", permanent: true },
      { source: "/physicians/parry", destination: "/team/dr-edward-parry", permanent: true },

      // Patients hub — UPDATE-LATER: point at /resources when it exists
      { source: "/patients", destination: "/appointment", permanent: true },
      {
        source: "/patients/forms-and-resources",
        destination: "/appointment",
        permanent: true,
      },
      // UPDATE-LATER: point at the insurance page when it exists
      { source: "/patients/insurance", destination: "/appointment", permanent: true },
      // Wound-care pages — UPDATE-LATER: point at /resources wound-care
      // content when it exists; the Mohs band's FAQ covers aftercare today
      {
        source: "/patients/suture-wound-care",
        destination: "/services#mohs-surgery",
        permanent: true,
      },
      {
        source: "/patients/subcuticular-wound-care",
        destination: "/services#mohs-surgery",
        permanent: true,
      },
      // Sun protection → closest topical match on the new site
      {
        source: "/patients/sun-protection-tips",
        destination: "/services/actinic-keratosis",
        permanent: true,
      },

      // Legal
      { source: "/privacy-policy", destination: "/privacy", permanent: true },

      // WordPress debris — send home rather than 404
      { source: "/sitemap", destination: "/", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/category/:slug*", destination: "/", permanent: true },
      { source: "/author/:slug*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
