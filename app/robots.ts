import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI crawlers explicitly allowed (training, indexing and on-demand browsing).
const aiBots = [
  // OpenAI (ChatGPT)
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic (Claude)
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Claude-Web",
  // Google (Gemini)
  "Google-Extended",
  "GoogleOther",
  "Google-CloudVertexBot",
  // Mistral (Le Chat)
  "MistralAI-User",
  "MistralAI-Index",
  "MistralAI-Training",
  // DeepSeek (no official documentation: observed tokens)
  "DeepSeekBot",
  "Deepseekbot",
  // xAI (Grok) (no official documentation: observed tokens)
  "GrokBot",
  "xAI-Grok",
  "Grok-DeepSearch",
  "xAI-SearchBot",
  // Other AI assistants
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: aiBots, allow: "/", disallow: "/api/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
