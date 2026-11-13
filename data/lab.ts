// Content of the Architecture Lab page.
// Tracking status: "live" = configured and verified, "planned" = specified, not yet deployed.
// Flip a status (or edit an event) here and the Lab page updates.

/**
 * live = GA4 tag configured and verified; datalayer = the site already pushes the event,
 * the GTM tag is still to configure; planned = specified only.
 */
export type Status = "live" | "datalayer" | "planned";

/** conversion = the real goal (contact); key_event = strong interest signal; event = context. */
export type EventType = "conversion" | "key_event" | "event";

export type TrackingEvent = {
  name: string;
  trigger: string;
  params: string[];
  type: EventType;
  tool: string;
  status: Status;
};

export const trackingEvents: TrackingEvent[] = [
  {
    name: "generate_lead",
    trigger: "Click on my phone number, email or LinkedIn, anywhere on the site",
    params: ["contact_method", "link_location"],
    type: "conversion",
    tool: "GA4 (via GTM)",
    status: "live",
  },
  {
    name: "cv_click",
    trigger: "Click on the CV (download button or preview image)",
    params: ["link_location"],
    type: "key_event",
    tool: "GA4 (via GTM)",
    status: "live",
  },
  {
    name: "portfolio_scroll_50",
    trigger: "Scroll past 50% of a portfolio page (once per page view)",
    params: ["portfolio_section"],
    type: "key_event",
    tool: "GA4 (via GTM)",
    status: "live",
  },
  {
    name: "project_expand",
    trigger: "Open “Show project details” on a project",
    params: ["project_id", "portfolio_section"],
    type: "key_event",
    tool: "GA4 (via GTM)",
    status: "live",
  },
  {
    name: "project_outbound_click",
    trigger: "Click on a link to see a project (e.g. the Helmo Rénovation site)",
    params: ["project_id", "link_url"],
    type: "key_event",
    tool: "GA4 (via GTM)",
    status: "live",
  },
  {
    name: "page_view",
    trigger: "Every page load (GA4 enhanced measurement)",
    params: ["page_location", "page_title"],
    type: "event",
    tool: "GA4 (Google tag)",
    status: "live",
  },
];

export type ScreenshotSlot = {
  id: string;
  title: string;
  description: string;
  /** File in public/lab/. No image = "coming soon" slot. */
  image?: string;
  width?: number;
  height?: number;
  /** Detailed alt text: what the screenshot shows, with the key figures. */
  alt?: string;
  /** When the data was captured (ISO date). */
  date?: string;
  /** Honest reading of the numbers. */
  note?: string;
};

export const screenshots: ScreenshotSlot[] = [
  {
    id: "pagespeed",
    title: "PageSpeed Insights — mobile",
    description: "Lighthouse lab test of the home page on an emulated mid-range phone over slow 4G.",
    image: "/lab/pagespeed-mobile.webp",
    width: 600,
    height: 522,
    alt: "PageSpeed Insights mobile report for antoine-smolar.vercel.app: Performance 100, Accessibility 100, Best Practices 100, SEO 100, agentic browsing 3/3; First Contentful Paint 0.9 s, Largest Contentful Paint 0.9 s, Total Blocking Time 0 ms, Cumulative Layout Shift 0, Speed Index 1.6 s",
    date: "2026-11-12",
    note: "100 in all four categories on mobile. Not enough real visitors yet for Chrome field data (CrUX), so these are lab values.",
  },
  {
    id: "clarity-overview",
    title: "Clarity — Overview",
    description: "Sessions, scroll depth, engagement time and frustration signals.",
    image: "/lab/clarity-overview.webp",
    width: 1044,
    height: 496,
    alt: "Microsoft Clarity dashboard for one day: 40 sessions (23 bot sessions excluded), 1 page per session, 80.40% average scroll depth, 1.3 min active time; 40 unique users; rage clicks 0%, dead clicks 25% (10 sessions), excessive scrolling 0%, quick backs 0%",
    date: "2026-11-12",
    note: "These sessions come from friends and family I let browse the site to get some data to show, not from real visitors. The 25% dead clicks point to elements that look clickable but are not: a lead for the next UX pass.",
  },
  {
    id: "clarity-traffic-performance",
    title: "Clarity — Traffic & real-user performance",
    description: "Referrers, browsers and Core Web Vitals measured on actual browser sessions (friends and family).",
    image: "/lab/clarity-traffic-performance.webp",
    width: 1044,
    height: 398,
    alt: "Microsoft Clarity panels: referrers vercel.com (36 sessions) and a preview deployment (3); browser Chrome 100% of 40 sessions; performance score 83/100 from 2 page views, LCP 0.87 s (good), INP 100 ms (good), CLS 0.2 (needs improvement)",
    date: "2026-11-12",
  },
  {
    id: "clarity-top-pages",
    title: "Clarity — Top pages",
    description: "Most viewed URLs, including Vercel preview deployments.",
    image: "/lab/clarity-top-pages.webp",
    width: 1400,
    height: 730,
    alt: "Microsoft Clarity top pages table: page views per URL, mostly Vercel preview deployments of the portfolio (home page 8, 5 and 4 views, /sites-web 4, /saas 2, /websites 1, /architecture-lab 1), all titled Create Next App",
    date: "2026-11-12",
    note: "An early snapshot: the pages still had the default \"Create Next App\" title and tracking also ran on preview URLs. Since then, every page has its own title and tracking only loads on the production domain.",
  },
  {
    id: "clarity-heatmap",
    title: "Clarity — Click heatmap",
    description: "Where visitors click on the home page.",
    image: "/lab/clarity-click-heatmap.webp",
    width: 1600,
    height: 707,
    alt: "Microsoft Clarity click heatmap of the home page (66 page views, 60 clicks), on an earlier version of the hero: the CV preview is the most clicked element (6 clicks, 10%), followed by the skill cards No-code App development (4 clicks), UI/UX User Interface & Experience (4) and Showcase and e-commerce sites (3); click hot spots sit on the experience and skills parts of the CV",
    date: "2026-11-12",
    note: "These few data points come from friends and family browsing the site on my computer, not from real visitors. The CV is what they clicked first, and they clicked inside it on the experience and skills lines, so they wanted the detail. The skill cards also got clicks although they were not links: likely part of the 25% dead clicks seen in the overview. Fix applied: they no longer lift on hover, so only real links look clickable.",
  },
  {
    id: "gtm-tags",
    title: "Google Tag Manager — Tags",
    description: "Web container GTM-TWFXM6B4, version 3, published on 13 November 2026.",
    image: "/lab/gtm-tags.webp",
    width: 626,
    height: 319,
    alt: "Google Tag Manager tag list for the portfolio-demo container: GA4 - Google tag on Initialization - All Pages; GA4 event tags cv_click, generate_lead, portfolio_scroll_50, project_expand and project_outbound_click, each fired by a custom event trigger of the same name; Microsoft Clarity - Official on All Pages",
    date: "2026-11-13",
    note: "One GA4 Google tag, one GA4 event tag per event in the tracking plan, each fired by a custom event trigger listening to the dataLayer, plus the Clarity tag.",
  },
  {
    id: "ga4-realtime",
    title: "GA4 — Real-time check",
    description: "Every event of the tracking plan received by GA4 property G-X0JLY7WKE3.",
    image: "/lab/ga4-realtime-events.webp",
    width: 822,
    height: 292,
    alt: "Google Analytics 4 real-time overview: views by page title (home page 2, Architecture Lab 1, Websites 1) and event count by event name across two pages of the table: page_view 4, first_visit 2, generate_lead 2, portfolio_scroll_50 2, scroll 2, session_start 2, click 1, cv_click 1, file_download 1, project_expand 1, project_outbound_click 1",
    date: "2026-11-13",
    note: "My own test visit right after publishing, used to check each event end to end: generate_lead, cv_click, portfolio_scroll_50, project_expand and project_outbound_click all arrive with their parameters. Not real traffic.",
  },
  { id: "search-console", title: "Search Console", description: "Impressions, clicks and indexed pages." },
  { id: "stape", title: "Stape — server container", description: "Server-side requests and recovered events." },
];
