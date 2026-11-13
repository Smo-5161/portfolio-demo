"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pushes the tracking plan's events to the dataLayer (see data/lab.ts).
 * GTM listens to them with Custom Event triggers; GA4 marks them as key events.
 * Nothing is sent anywhere by this file alone: the GTM container decides, under Consent Mode.
 */
type DL = Window & { dataLayer?: Record<string, unknown>[] };

function push(event: string, params: Record<string, unknown>) {
  const w = window as DL;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

/** Where on the page a link sits: header, footer, or the id of the closest section/article. */
function locationOf(el: Element) {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return el.closest("article[id], section[id]")?.id ?? "page";
}

export default function TrackingEvents({ portfolioPaths }: { portfolioPaths: string[] }) {
  const pathname = usePathname();

  // Clicks: contact (conversion), CV, links to projects.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const where = locationOf(a);

      const contact = href.startsWith("tel:")
        ? "phone"
        : href.startsWith("mailto:")
          ? "email"
          : /linkedin\.com\/in\//.test(href)
            ? "linkedin"
            : null;
      if (contact) return push("generate_lead", { contact_method: contact, link_location: where });

      if (href.includes("Antoine-Smolar-CV.pdf")) return push("cv_click", { link_location: where });

      const project = a.closest("article[data-project-id]")?.getAttribute("data-project-id");
      if (project && a.origin !== window.location.origin) {
        push("project_outbound_click", { project_id: project, link_url: a.href });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // "Show project details" opened. The toggle event does not bubble, so listen in the capture phase.
  useEffect(() => {
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (!d.open || d.dataset.track !== "project-details") return;
      push("project_expand", {
        project_id: d.closest("article[data-project-id]")?.getAttribute("data-project-id"),
        portfolio_section: window.location.pathname,
      });
    };
    document.addEventListener("toggle", onToggle, { capture: true });
    return () => document.removeEventListener("toggle", onToggle, { capture: true });
  }, []);

  // 50% scroll on a portfolio page, once per page view.
  useEffect(() => {
    if (!portfolioPaths.includes(pathname)) return;
    let sent = false;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (sent || max <= 0) return;
      if (window.scrollY / max >= 0.5) {
        sent = true;
        push("portfolio_scroll_50", { portfolio_section: pathname });
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, portfolioPaths]);

  return null;
}
