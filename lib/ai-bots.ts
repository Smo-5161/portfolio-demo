// AI crawlers named in robots.txt, grouped by what they do.
// Single source: used by app/robots.txt/route.ts AND displayed on the Architecture Lab page.
//
// Policy for this site: every category is allowed. The content is public and the goal is
// to be known and cited by AI assistants, including through their training data.
// A site protecting its content would typically block "training" and keep "search" + "user".

export type BotCategory = {
  id: "training" | "search" | "user" | "other" | "undocumented";
  label: string;
  what: string;
  decision: string;
  bots: { name: string; vendor: string }[];
};

export const aiBotCategories: BotCategory[] = [
  {
    id: "training",
    label: "Model training",
    what: "Collect pages to train future AI models.",
    decision: "Allowed: being part of the models' knowledge is the point of a public portfolio.",
    bots: [
      { name: "GPTBot", vendor: "OpenAI" },
      { name: "ClaudeBot", vendor: "Anthropic" },
      { name: "Google-Extended", vendor: "Google (Gemini)" },
      { name: "MistralAI-Training", vendor: "Mistral" },
      { name: "Applebot-Extended", vendor: "Apple" },
      { name: "Meta-ExternalAgent", vendor: "Meta" },
      { name: "CCBot", vendor: "Common Crawl" },
    ],
  },
  {
    id: "search",
    label: "AI search indexing",
    what: "Index pages so AI assistants can find and cite them in answers.",
    decision: "Allowed: this is what makes the site citable (GEO).",
    bots: [
      { name: "OAI-SearchBot", vendor: "OpenAI" },
      { name: "Claude-SearchBot", vendor: "Anthropic" },
      { name: "MistralAI-Index", vendor: "Mistral" },
      { name: "PerplexityBot", vendor: "Perplexity" },
    ],
  },
  {
    id: "user",
    label: "User-triggered fetch",
    what: "Open a page live because a person asked the assistant about it.",
    decision: "Allowed: a recruiter asking ChatGPT or Claude about me gets the real page.",
    bots: [
      { name: "ChatGPT-User", vendor: "OpenAI" },
      { name: "Claude-User", vendor: "Anthropic" },
      { name: "MistralAI-User", vendor: "Mistral" },
      { name: "Perplexity-User", vendor: "Perplexity" },
    ],
  },
  {
    id: "other",
    label: "Other crawlers",
    what: "Generic crawlers used by a vendor's product and research teams, not tied to one documented AI use.",
    decision: "Allowed: same public content, no reason to block.",
    bots: [{ name: "GoogleOther", vendor: "Google" }],
  },
  {
    id: "undocumented",
    label: "Undocumented tokens",
    what: "DeepSeek and xAI (Grok) publish no crawler documentation; these names are reported by third parties.",
    decision: "Listed for completeness, with no guarantee they are used.",
    bots: [
      { name: "DeepSeekBot", vendor: "DeepSeek" },
      { name: "GrokBot", vendor: "xAI" },
      { name: "xAI-Grok", vendor: "xAI" },
      { name: "Grok-DeepSearch", vendor: "xAI" },
    ],
  },
];

export const aiBots = aiBotCategories.flatMap((c) => c.bots.map((b) => b.name));
