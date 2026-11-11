"use client";

import { OPEN_CONSENT_EVENT } from "./ConsentBanner";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="underline underline-offset-2 hover:text-ink-900"
    >
      Cookie settings
    </button>
  );
}
