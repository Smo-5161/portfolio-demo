"use client";

import { useEffect, useState } from "react";
import { CLARITY_ID, CONSENT_KEY } from "@/lib/tracking";

type Choice = "granted" | "denied";

// Typed locally (not via "declare global") to avoid clashing with the dataLayer type
// already declared by @next/third-parties.
type TrackingWindow = Window & {
  dataLayer?: unknown[];
  clarity?: (...args: unknown[]) => void;
};
const w = () => window as unknown as TrackingWindow;

export const OPEN_CONSENT_EVENT = "open-consent";

function gtag(...args: unknown[]) {
  const win = w();
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push(args);
}

function loadClarity() {
  if (w().clarity) return;
  /* eslint-disable */
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode!.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
  /* eslint-enable */
  w().clarity?.("consent");
}

function applyChoice(choice: Choice) {
  const value = choice;
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
  w().dataLayer?.push({ event: "consent_update", consent: choice });
  if (choice === "granted") loadClarity();
}

/** Cookie banner: equal "Accept" / "Refuse" buttons, choice saved for next visits. */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(CONSENT_KEY);
    } catch {}
    if (saved === "granted") loadClarity();
    if (saved !== "granted" && saved !== "denied") setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  function choose(choice: Choice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {}
    applyChoice(choice);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-[20px] border border-stroke bg-white p-5 shadow-lg sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <h2 id="consent-title" className="text-base mb-1">
        Cookies &amp; measurement
      </h2>
      <p id="consent-text" className="text-sm text-ink-700 mb-4">
        I use Google Analytics and Microsoft Clarity to understand how visitors use this site
        and improve it. Nothing is stored on your device unless you accept. You can change your
        choice at any time from the footer.
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary">
          Accept
        </button>
        <button type="button" onClick={() => choose("denied")} className="btn btn-secondary">
          Refuse
        </button>
      </div>
    </div>
  );
}
