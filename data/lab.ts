// Content of the Architecture Lab page.
// Tracking status: "live" = configured and verified, "planned" = specified, not yet deployed.
// Flip a status (or edit an event) here and the Lab page updates.

export type Status = "live" | "planned";

export type TrackingEvent = {
  name: string;
  trigger: string;
  params: string[];
  keyEvent: boolean; // GA4 "key event" (conversion)
  tool: string;
  status: Status;
};

export const trackingEvents: TrackingEvent[] = [
  {
    name: "page_view",
    trigger: "Every page load (GA4 enhanced measurement)",
    params: ["page_location", "page_title"],
    keyEvent: false,
    tool: "GA4",
    status: "planned",
  },
  {
    name: "scroll_depth",
    trigger: "Scroll past 25 / 50 / 75 / 90% of the page",
    params: ["percent_scrolled"],
    keyEvent: false,
    tool: "GA4",
    status: "planned",
  },
  {
    name: "cta_click",
    trigger: "Click on “View portfolio” or “Get in touch”",
    params: ["cta_label", "cta_location"],
    keyEvent: false,
    tool: "GA4 + Clarity tag",
    status: "planned",
  },
  {
    name: "faq_view",
    trigger: "Visit to the /faq page (from the footer link)",
    params: ["page_referrer"],
    keyEvent: false,
    tool: "GA4",
    status: "planned",
  },
  {
    name: "project_outbound_click",
    trigger: "Click on a project button (Helmo, Omi.ai…)",
    params: ["project_id", "link_url"],
    keyEvent: true,
    tool: "GA4 + Clarity tag",
    status: "planned",
  },
  {
    name: "generate_lead",
    trigger: "Click on phone, email or LinkedIn in the contact block",
    params: ["contact_method"],
    keyEvent: true,
    tool: "GA4 + Clarity tag",
    status: "planned",
  },
];

export type ScreenshotSlot = {
  id: string;
  title: string;
  description: string;
  image?: string; // e.g. "/lab/ga4-overview.png" (file in public/lab/)
};

export const screenshots: ScreenshotSlot[] = [
  { id: "ga4-overview", title: "GA4 — Overview", description: "Users, sessions and engagement over time." },
  { id: "ga4-key-events", title: "GA4 — Key events", description: "Leads and outbound project clicks." },
  { id: "clarity-heatmap", title: "Clarity — Click heatmap", description: "Where visitors click on the home page." },
  { id: "clarity-scroll", title: "Clarity — Scroll heatmap", description: "How far visitors read." },
  { id: "clarity-recordings", title: "Clarity — Session recordings", description: "Real journeys, rage and dead clicks." },
  { id: "search-console", title: "Search Console", description: "Impressions, clicks and indexed pages." },
  { id: "pagespeed", title: "PageSpeed Insights", description: "Core Web Vitals on mobile and desktop." },
  { id: "stape", title: "Stape — server container", description: "Server-side requests and recovered events." },
];
