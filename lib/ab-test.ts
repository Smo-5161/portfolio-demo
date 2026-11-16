// A/B test "contact position": contact block under the header (top) or above the footer (footer).
// Demonstration only: the portfolio's traffic is far too low for a usable result (see the Lab).

import { CONSENT_KEY } from "./tracking";

export const AB_TEST = {
  id: "contact_position",
  storageKey: "ab_contact_position",
  variants: ["top", "footer"] as const,
  /** URL parameter that forces a variant for a demo, without storing it or counting it. */
  forceParam: "contact",
};

export type ContactPosition = (typeof AB_TEST.variants)[number];

/**
 * Runs inline at the top of <body>, before anything is painted:
 * 1. picks the visitor's variant: the stored one if cookies were accepted, otherwise a 50/50 draw
 *    kept in memory only (nothing is written to the device before consent);
 * 2. sets <html data-contact-position>, which CSS uses to move the contact block (no flicker);
 * 3. pushes the variant to the dataLayer as a variable only. The experience_impression event is
 *    pushed later by TrackingEvents, once Consent Mode defaults are in place.
 * The variant is stored only when the visitor accepts (see rememberVariant).
 * ?contact=top or ?contact=footer forces a variant for the demo links: never stored, and flagged
 * "_forced" so these visits can be excluded from the analysis.
 */
export const abScript = `(function(){
var k='${AB_TEST.storageKey}',ok=['top','footer'],v=null,f=null,c=null;
try{f=new URLSearchParams(location.search).get('${AB_TEST.forceParam}');}catch(e){}
try{c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'){v=localStorage.getItem(k);}else{localStorage.removeItem(k);}}catch(e){}
if(ok.indexOf(f)<0){f=null;
if(ok.indexOf(v)<0){v=Math.random()<0.5?'top':'footer';if(c==='granted'){try{localStorage.setItem(k,v);}catch(e){}}}}
var p=f||v;
document.documentElement.setAttribute('data-contact-position',p);
window.dataLayer=window.dataLayer||[];
window.dataLayer.push({contact_position:f?p+'_forced':p});
})();`;

/** Called by the cookie banner: keep the variant for later visits on "Accept", forget it on "Refuse". */
export function rememberVariant(choice: "granted" | "denied") {
  try {
    if (choice === "denied") return localStorage.removeItem(AB_TEST.storageKey);
    const forced = new URLSearchParams(window.location.search).has(AB_TEST.forceParam);
    const variant = document.documentElement.dataset.contactPosition;
    if (!forced && variant) localStorage.setItem(AB_TEST.storageKey, variant);
  } catch {}
}
