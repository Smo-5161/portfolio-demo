import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { aiBotCategories } from "@/lib/ai-bots";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // One explicit group per AI crawler category (training, AI search, user-triggered,
      // undocumented). All allowed on purpose: see the policy in lib/ai-bots.ts.
      ...aiBotCategories.map((c) => ({
        userAgent: c.bots.map((b) => b.name),
        allow: "/",
      })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
