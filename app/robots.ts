import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Robots d'IA explicitement autorisés (entraînement, indexation et navigation à la demande).
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
  // DeepSeek (pas de documentation officielle : jetons observés)
  "DeepSeekBot",
  "Deepseekbot",
  // xAI (Grok) (pas de documentation officielle : jetons observés)
  "GrokBot",
  "xAI-Grok",
  "Grok-DeepSearch",
  "xAI-SearchBot",
  // Autres assistants IA
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
