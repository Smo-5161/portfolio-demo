// URL publique du site. Sur Vercel, VERCEL_PROJECT_PRODUCTION_URL est fourni automatiquement.
// Pour un domaine personnalisé, définir NEXT_PUBLIC_SITE_URL (ex : https://antoinesmolar.com).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const contact = {
  name: "Antoine Smolar",
  jobTitle: "Growth Marketer & Product Builder",
  phoneDisplay: "07 69 34 94 81",
  phoneIntl: "+33769349481",
  email: "antoine.smolar.23@neoma-bs.com",
  linkedin: "https://www.linkedin.com/in/antoine-smolar/",
};

export const routes = [
  { path: "/", label: "Accueil" },
  { path: "/sites-web", label: "Sites Web" },
  { path: "/saas", label: "SaaS" },
  { path: "/outils-internes", label: "Outils Internes" },
  { path: "/architecture-lab", label: "Architecture & SEO/GEO/CRO Lab" },
];
