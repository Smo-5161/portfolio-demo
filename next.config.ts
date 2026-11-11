import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old French URLs → new English URLs (301, keeps any SEO value already earned).
  async redirects() {
    return [
      { source: "/sites-web", destination: "/websites", permanent: true },
      { source: "/outils-internes", destination: "/internal-tools", permanent: true },
    ];
  },
};

export default nextConfig;
