// Public site URL. On Vercel, VERCEL_PROJECT_PRODUCTION_URL is provided automatically.
// For a custom domain, set NEXT_PUBLIC_SITE_URL (e.g. https://antoinesmolar.com).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const contact = {
  name: "Antoine Smolar",
  jobTitle: "Growth Marketer & Product Builder",
  phoneDisplay: "+33 7 69 34 94 81",
  phoneIntl: "+33769349481",
  email: "antoine.smolar.23@neoma-bs.com",
  linkedin: "https://www.linkedin.com/in/antoine-smolar/",
};

export const routes = [
  { path: "/", label: "Home" },
  { path: "/websites", label: "Websites" },
  { path: "/saas", label: "SaaS" },
  { path: "/internal-tools", label: "Internal Tools" },
  { path: "/architecture-lab", label: "Architecture & SEO/GEO/CRO Lab" },
];
