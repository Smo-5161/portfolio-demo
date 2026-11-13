import pageDates from "./page-dates.json";
// Public site URL. On Vercel, VERCEL_PROJECT_PRODUCTION_URL is provided automatically.
// For a custom domain, set NEXT_PUBLIC_SITE_URL (e.g. https://antoinesmolar.com).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Date of the last real content update (used in the sitemap). Change it when content changes.
/** Last update of each page = last commit on its content files (scripts/page-dates.mjs). */
export const PAGE_DATES = pageDates as Record<string, string>;
export function pageUpdated(path: string) {
  return PAGE_DATES[path] ?? SITE_UPDATED;
}
/** Most recent page update across the site. */
export const SITE_UPDATED = Object.values(pageDates as Record<string, string>).sort().pop() ?? "2026-11-11";
/** "13 November 2026" */
export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// Public source code of this site.
export const REPO_URL = "https://github.com/Smo-5161/portfolio-demo";
export const repoFile = (path: string) => `${REPO_URL}/blob/main/${path}`;

export const contact = {
  name: "Antoine Smolar",
  // Schema.org Person.jobTitle: what Antoine actually is today, not a job he has not held yet.
  jobTitle: "Business Administration student",
  // One-line positioning shown under the name (home hero, share image, llms.txt).
  tagline:
    "Business student · I build websites, apps and tools, and make them findable on Google and AI engines",
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
    title: "Antoine Smolar — Portfolio: SEO, GEO, no-code & digital transformation",
    description:
      "Antoine Smolar, business student at NEOMA: websites, SaaS and internal tools, SEO and GEO for AI search, no-code apps. Case studies and a live technical lab.",
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
    label: "Internal Tools & Digital Transformation",
    portfolio: true,
    title: "Internal tools & digital transformation",
    description:
      "Internal tools, business apps and digital transformation projects, like the rollout of the Factorial HR software at a public waste authority, that automate work and modernize how teams operate.",
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
    label: "Research & School Projects",
    portfolio: true,
    title: "Research & school projects",
    description:
      "Research and school projects by Antoine Smolar: the question explored, the method, the deliverable and what was learned.",
  },
  {
    path: "/hackathons",
    label: "Hackathons",
    portfolio: true,
    title: "Hackathons",
    description:
      "Hackathons Antoine Smolar took part in: the challenge, the team, the prototype built in limited time and the outcome.",
  },
  {
    path: "/traditional-marketing",
    label: "Traditional Marketing",
    portfolio: true,
    title: "Traditional marketing: brand, events and campaigns",
    description:
      "The human side of marketing by Antoine Smolar: brand, events, partnerships, print and field campaigns, with their goals and results.",
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
