"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/lib/tracking";

type Choice = "granted" | "denied";

// Typed locally (not via "declare global") so the tracking globals stay scoped to this file.
type TrackingWindow = Window & {
  dataLayer?: unknown[];
  clarity?: (...args: unknown[]) => void;
};
const w = () => window as unknown as TrackingWindow;

export const OPEN_CONSENT_EVENT = "open-consent";

// gtag.js only reads real `arguments` objects from the dataLayer: a plain array is ignored,
// so the consent update must be pushed with `arguments`, exactly like Google's snippet.
function gtag(..._args: unknown[]) {
  const win = w();
  win.dataLayer = win.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  win.dataLayer.push(arguments);
}

/**
 * Clarity is loaded by the GTM container, only once analytics consent is granted (GTM consent
 * check on the tag, fired on page load or on the consent_update event). This passes the
 * visitor's choice through Clarity's Consent API v2.
 * No stub is created here: the GTM template skips loading Clarity when window.clarity already
 * exists, so the call waits (up to 15 s) for the real script instead.
 */
function clarityConsent(choice: Choice) {
  const send = () => w().clarity?.("consentv2", { ad_Storage: choice, analytics_Storage: choice });
  if (w().clarity) return send();
  if (choice === "denied") return; // Clarity never loads without consent: nothing to tell it.
  let tries = 0;
  const timer = window.setInterval(() => {
    if (w().clarity || ++tries > 30) {
      window.clearInterval(timer);
      send();
    }
  }, 500);
}

function consentState(value: Choice) {
  return { ad_storage: value, ad_user_data: value, ad_personalization: value, analytics_storage: value };
}

function applyChoice(choice: Choice) {
  gtag("consent", "update", consentState(choice));
  w().dataLayer?.push({ event: "consent_update", consent: choice });
  clarityConsent(choice);
}

/** Cookie banner: equal "Accept" / "Refuse" buttons, choice saved for next visits. */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(CONSENT_KEY);
    } catch {}
    // Returning visitor: re-apply the saved choice to Google tags and Clarity on every page load.
    if (saved === "granted" || saved === "denied") {
      gtag("consent", "update", consentState(saved));
      clarityConsent(saved);
    }
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
