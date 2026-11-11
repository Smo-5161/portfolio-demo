import type { Metadata } from "next";
import { routeInfo } from "./site";

/**
 * Builds a page's metadata from lib/site.ts: title, description, canonical URL,
 * and the Open Graph / Twitter tags used when the link is shared (LinkedIn, Slack, X…).
 */
export function pageMetadata(path: string, options: { noindex?: boolean } = {}): Metadata {
  const r = routeInfo(path);
  return {
    title: path === "/" ? { absolute: r.title } : r.title,
    description: r.description,
    alternates: { canonical: path },
    openGraph: { url: path, title: r.title, description: r.description },
    twitter: { title: r.title, description: r.description },
    ...(options.noindex && { robots: { index: false, follow: true } }),
  };
}
