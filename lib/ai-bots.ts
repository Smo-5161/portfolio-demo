// AI crawlers explicitly allowed in robots.txt, grouped by vendor.
// Single source: used by app/robots.ts AND displayed on the Architecture Lab page.
export type BotGroup = { vendor: string; product: string; bots: string[]; note?: string };

export const aiBotGroups: BotGroup[] = [
  { vendor: "OpenAI", product: "ChatGPT", bots: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"] },
  {
    vendor: "Anthropic",
    product: "Claude",
    bots: ["ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai", "Claude-Web"],
  },
  { vendor: "Google", product: "Gemini", bots: ["Google-Extended", "GoogleOther", "Google-CloudVertexBot"] },
  { vendor: "Mistral", product: "Le Chat", bots: ["MistralAI-User", "MistralAI-Index", "MistralAI-Training"] },
  {
    vendor: "DeepSeek",
    product: "DeepSeek",
    bots: ["DeepSeekBot", "Deepseekbot"],
    note: "No official documentation: observed tokens",
  },
  {
    vendor: "xAI",
    product: "Grok",
    bots: ["GrokBot", "xAI-Grok", "Grok-DeepSearch", "xAI-SearchBot"],
    note: "No official documentation: observed tokens",
  },
  {
    vendor: "Others",
    product: "Perplexity, Apple, Meta, Common Crawl",
    bots: ["PerplexityBot", "Perplexity-User", "Applebot-Extended", "Meta-ExternalAgent", "CCBot"],
  },
];

export const aiBots = aiBotGroups.flatMap((g) => g.bots);
