import type { NextConfig } from "next";

// Baseline security headers. A full Content-Security-Policy is left out on purpose: GTM,
// GA4 and Clarity load scripts from several domains, and a strict CSP would need nonces
// for every inline script. frame-ancestors still blocks clickjacking.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Old French URLs → new English URLs (301, keeps any SEO value already earned).
  async redirects() {
    return [
      { source: "/sites-web", destination: "/websites", permanent: true },
      { source: "/outils-internes", destination: "/internal-tools", permanent: true },
    ];
  },
};

export default nextConfig;
