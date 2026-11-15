// A/B test "contact position": contact block under the header (top) or above the footer (footer).
// Demonstration only: the portfolio's traffic is far too low for a usable result (see the Lab).

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
 * 1. reads the visitor's stored variant, or draws one (50/50) and stores it in localStorage;
 * 2. sets <html data-contact-position>, which CSS uses to move the contact block (no flicker);
 * 3. pushes the variant to the dataLayer as a variable only. The experience_impression event is
 *    pushed later by TrackingEvents, once Consent Mode defaults are in place.
 * ?contact=top or ?contact=footer forces a variant for the demo links: not stored, and flagged
 * "_forced" so these visits can be excluded from the analysis.
 */
export const abScript = `(function(){
var k='${AB_TEST.storageKey}',ok=['top','footer'],v=null,f=null;
try{f=new URLSearchParams(location.search).get('${AB_TEST.forceParam}');}catch(e){}
if(ok.indexOf(f)<0){f=null;try{v=localStorage.getItem(k);}catch(e){}
if(ok.indexOf(v)<0){v=Math.random()<0.5?'top':'footer';try{localStorage.setItem(k,v);}catch(e){}}}
var p=f||v;
document.documentElement.setAttribute('data-contact-position',p);
window.dataLayer=window.dataLayer||[];
window.dataLayer.push({contact_position:f?p+'_forced':p});
})();`;
