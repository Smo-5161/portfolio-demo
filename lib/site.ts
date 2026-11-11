// Public site URL. On Vercel, VERCEL_PROJECT_PRODUCTION_URL is provided automatically.
// For a custom domain, set NEXT_PUBLIC_SITE_URL (e.g. https://antoinesmolar.com).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Date of the last real content update (used in the sitemap). Change it when content changes.
export const SITE_UPDATED = "2026-11-11";

// Public source code of this site.
export const REPO_URL = "https://github.com/Smo-5161/portfolio-demo";
export const repoFile = (path: string) => `${REPO_URL}/blob/main/${path}`;

export const contact = {
  name: "Antoine Smolar",
  jobTitle: "Growth Marketer & Product Builder",
  phoneDisplay: "+33 7 69 34 94 81",
  phoneIntl: "+33769349481",
  email: "antoine.smolar.23@neoma-bs.com",
  linkedin: "https://www.linkedin.com/in/antoine-smolar/",
};

export type RouteInfo = {
  path: string;
  label: string;
  /** <title> of the page (the layout appends " | Antoine Smolar"). */
  title: string;
  /** Meta description: ~150 characters, shown under the title in Google. */
  description: string;
  /** Part of the portfolio (listed in "Explore the rest of the portfolio"). */
  portfolio?: boolean;
};

export const routes: RouteInfo[] = [
  {
    path: "/",
    label: "Home",
    title: "Antoine Smolar — Growth Marketer & Product Builder (SEO, GEO, CRO)",
    description:
      "Growth Marketer & Product Builder: SEO, GEO for ChatGPT and AI search, conversion optimization, UI/UX and no-code apps. Portfolio, case studies and live lab.",
  },
  {
    path: "/websites",
    label: "Websites",
    portfolio: true,
    title: "Website case studies: SEO & UX redesigns",
    description:
      "Website redesigns built for search and conversion: site architecture, technical SEO, structured data, page speed and GEO-ready FAQs, with real results.",
  },
  {
    path: "/saas",
    label: "SaaS",
    portfolio: true,
    title: "SaaS products built from idea to launch",
    description:
      "SaaS products designed and built end to end, like Omi.ai, an AI onboarding platform with process capture, RAG knowledge base and an AI mentor.",
  },
  {
    path: "/internal-tools",
    label: "Internal Tools",
    portfolio: true,
    title: "Internal tools & business apps",
    description:
      "Internal tools and no-code business apps that automate repetitive work and centralize company data for teams.",
  },
  {
    path: "/workshops",
    label: "Workshops & Talks",
    portfolio: true,
    title: "Workshops & talks on AI, vibe coding and growth",
    description:
      "Workshops and conferences led by Antoine Smolar on AI, vibe coding, no-code and growth marketing: format, audience and takeaways.",
  },
  {
    path: "/research",
    label: "Research & Hackathons",
    portfolio: true,
    title: "Research projects & hackathons",
    description:
      "Research projects and hackathons by Antoine Smolar: the problem tackled, the prototype built and the results.",
  },
  {
    path: "/architecture-lab",
    label: "Architecture & SEO/GEO/CRO Lab",
    portfolio: true,
    title: "SEO, GEO & tracking lab: how this site is built",
    description:
      "A visual report on this site: architecture, semantic markup, JSON-LD, AI crawlers in robots.txt, GEO-ready FAQ, GA4, Clarity and server-side tracking.",
  },
  {
    path: "/faq",
    label: "FAQ",
    title: "FAQ: SEO, GEO, CRO, UX and internal tools, with sourced figures",
    description:
      "Short, sourced answers on why SEO still matters, what GEO is, conversion and UX impact, and when custom internal tools or no-code make sense.",
  },
];

export function routeInfo(path: string): RouteInfo {
  const r = routes.find((x) => x.path === path);
  if (!r) throw new Error(`Unknown route ${path}`);
  return r;
}
