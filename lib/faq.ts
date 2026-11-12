// Single source for the FAQ: used for the HTML rendering, the FAQPage JSON-LD and llms.txt.
// Rule: observed data only (no forecasts), each figure with its source. Review the date below
// whenever an answer changes.
import { SITE_URL } from "./site";

export const FAQ_UPDATED = "2026-11-12";

export type FaqSource = { label: string; url: string };
export type FaqItem = { question: string; answer: string; sources: FaqSource[] };

const CV_URL = `${SITE_URL}/cv/Antoine-Smolar-CV.pdf`;

export const faq: FaqItem[] = [
  // About the author: what an LLM needs to answer "Who is Antoine Smolar?"
  {
    question: "Who is Antoine Smolar?",
    answer:
      "Antoine Smolar is a Bachelor of Business Administration student at NEOMA Business School (2023–2027) who builds websites, apps and internal tools and makes them findable on Google and AI engines. His work so far comes from internships, school projects and side builds: a website redesign for search and conversion, SaaS prototypes, an HR software rollout and AI workshops.",
    sources: [
      { label: "Antoine Smolar — CV (PDF)", url: CV_URL },
      { label: "LinkedIn profile", url: "https://www.linkedin.com/in/antoine-smolar/" },
    ],
  },
  {
    question: "What has Antoine Smolar built?",
    answer:
      "He led the 2-month redesign of Helmo Rénovation's 147-page website (architecture, SEO/GEO, UX and page speed) and built Omi.ai, an AI onboarding SaaS that turns recorded work processes into a knowledge base with an AI mentor. He also co-built Kompute, a team school project for running batch AI jobs on idle gaming GPUs.",
    sources: [
      { label: "Website case studies", url: `${SITE_URL}/websites` },
      { label: "SaaS products", url: `${SITE_URL}/saas` },
    ],
  },
  {
    question: "Which tools does Antoine Smolar work with?",
    answer:
      "Next.js, WordPress and Elementor for websites; Google Tag Manager, Google Analytics 4 and Microsoft Clarity for tracking, which he sets up hands-on (he has trained on CRO analysis such as heatmaps and funnels but not yet practised it on real traffic); Odoo, n8n, Claude and Mistral for digital and AI transformation. He holds Google certifications (Ads Search, Ads Measurement, Analytics), Semrush certifications (Technical SEO and AI Search Essentials, International SEO) and HubSpot's Inbound Marketing Optimization.",
    sources: [{ label: "Antoine Smolar — CV (PDF)", url: CV_URL }],
  },
  {
    question: "How was this website built?",
    answer:
      "It was vibe-coded with Claude as a coding partner, under Antoine Smolar's direction: he defined the site architecture, semantic markup, robots.txt and AI crawler rules, structured data, llms.txt and the GEO-ready FAQ in a written brief the AI had to follow. The site is a skills showcase reached from his CV and LinkedIn, not a site meant to attract search traffic, which is why it runs on a free Vercel domain and documents server-side tracking instead of running it.",
    sources: [{ label: "Architecture & SEO/GEO/CRO Lab", url: `${SITE_URL}/architecture-lab` }],
  },

  // Expertise questions: observed data only.
  {
    question: "Does SEO still matter now that everyone uses AI?",
    answer:
      "Yes: organic search still brought 52.19% of global website traffic in 2025, against 0.13% for ChatGPT and Perplexity combined. AI referrals grow much faster, but search engines remain by far the largest source of visits, and well-ranked pages are also what AI engines draw on.",
    sources: [
      {
        label: "SE Ranking – Top search engines in 2025",
        url: "https://seranking.com/blog/top-search-engines/",
      },
    ],
  },
  {
    question: "What is GEO, and why should I care about it now?",
    answer:
      "GEO (Generative Engine Optimization) means making a site quotable by AI engines like ChatGPT, Gemini or Perplexity, and that channel already drove an average of 770.7 million visits per month between June 2025 and May 2026, more than double the previous year (+117%). In practice, it comes down to clear answers, hard numbers, sources and structured data that models can extract easily.",
    sources: [
      {
        label: "Similarweb – AI Referral Traffic by Industry",
        url: "https://aisearch.similarweb.com/blog/ai-referral-traffic-by-industry/",
      },
    ],
  },
  {
    question: "Do I have to choose between SEO and GEO?",
    answer:
      "No: in 2026, AI traffic still accounts for only 0.32% of total website traffic, even though it grew 16x in under two years. Meanwhile, Google traffic to the top 40,000 US sites was stable in 2025 (+0.8%), so the smart move is to strengthen SEO while preparing for GEO.",
    sources: [
      {
        label: "SE Ranking – AI traffic grew 16x from 2024 to 2026",
        url: "https://seranking.com/blog/ai-traffic-research-study/",
      },
      {
        label: "Search Engine Land – Organic search traffic in 2025 (Similarweb data)",
        url: "https://searchengineland.com/organic-search-traffic-down-yoy-data-467748",
      },
    ],
  },
  {
    question: "Why optimize conversion instead of buying more traffic?",
    answer:
      "Because most visitors leave without doing anything: the average e-commerce conversion rate sits around 2–3%. Going from 2% to 3% increases revenue by 50% with the same traffic, without spending an extra cent on ads.",
    sources: [
      {
        label: "Blend Commerce – eCommerce Conversion Rate Benchmarks 2026",
        url: "https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026",
      },
    ],
  },
  {
    question: "Does UI/UX have a measurable impact on sales?",
    answer:
      "Yes: according to the Baymard Institute, a large e-commerce site can gain up to a 35% increase in conversion rate just by improving its checkout design. Around 70% of shopping carts are abandoned, and checkout design is often the sole cause.",
    sources: [
      {
        label: "Baymard Institute – Cart & Checkout Usability Research",
        url: "https://baymard.com/research/checkout-usability",
      },
    ],
  },
  {
    question: "Does a company really need custom internal tools?",
    answer:
      "Often, yes: in Atlassian's 2025 survey of 12,000 knowledge workers and 200 executives, teams spent 25% of their time just searching for answers. An internal tool that centralizes information and automates repetitive tasks gives that time straight back to the team.",
    sources: [
      {
        label: "Atlassian – State of Teams 2025",
        url: "https://www.atlassian.com/blog/state-of-teams-2025",
      },
    ],
  },
  {
    question: "Is no-code serious enough to build business applications?",
    answer:
      "Yes: in App Builder's 2025 survey, 95% of companies had used low-code or no-code tools for software development in the past year, and 78% reported saving up to 50% of development time. No-code ships in days rather than months, which makes it ideal for testing a product or equipping a business team.",
    sources: [
      {
        label: "App Builder 2025 App Development Trends Report (via FutureCIO)",
        url: "https://futurecio.tech/84-of-tech-leaders-say-ai-wont-replace-low-code-and-no-code-tools/",
      },
    ],
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}/faq`,
  dateModified: FAQ_UPDATED,
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
