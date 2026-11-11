// Single source for the FAQ: used for the HTML rendering AND the FAQPage JSON-LD.
export type FaqSource = { label: string; url: string };
export type FaqItem = { question: string; answer: string; sources: FaqSource[] };

export const faq: FaqItem[] = [
  {
    question: "Does SEO still matter now that everyone uses AI?",
    answer:
      "Yes: organic search still drives 53.3% of all trackable website traffic, more than ten times organic social media (5%). AI assistants are growing fast, but Google remains by far the largest source of visits, and a well-ranked site is also the raw material generative engines draw on.",
    sources: [
      {
        label: "BrightEdge – Organic Share of Traffic Increases to 53%",
        url: "https://www.brightedge.com/blog/organic-share-of-traffic-increases-to-53",
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
      "No: in 2026, AI traffic still accounts for only 0.32% of total website traffic, even though it grew 16x in under two years. Gartner predicted a 25% drop in traditional search engine volume by 2026 in favor of chatbots, so the smart move is to strengthen SEO while preparing for GEO.",
    sources: [
      {
        label: "SE Ranking – AI traffic grew 16x from 2024 to 2026",
        url: "https://seranking.com/blog/ai-traffic-research-study/",
      },
      {
        label: "Gartner – Search engine volume will drop 25% by 2026",
        url: "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents",
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
      "Often, yes: according to the McKinsey Global Institute, employees spend nearly 20% of their workweek looking for internal information or tracking down colleagues who can help. An internal tool that centralizes data and automates repetitive tasks gives that time straight back to the team.",
    sources: [
      {
        label: "McKinsey Global Institute – The social economy",
        url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy",
      },
    ],
  },
  {
    question: "Is no-code serious enough to build business applications?",
    answer:
      "Yes: Gartner predicted that 70% of new enterprise applications would use low-code or no-code technologies by 2025, up from less than 25% in 2020. No-code ships in days rather than months, which makes it ideal for testing a product or equipping a business team.",
    sources: [
      {
        label: "Computerworld – Gartner: low-code development platforms",
        url: "https://www.computerworld.com/article/1616390/low-code-development-platforms-to-grow-25-in-2023.html",
      },
    ],
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
