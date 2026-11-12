import Script from "next/script";

// Google Tag Manager on every page. GA4 is configured inside the GTM container.
// Microsoft Clarity is loaded by a tag inside the GTM container; ConsentBanner passes the
// visitor's choice to it (Clarity Consent API v2). Without consent it runs cookieless.
import { GTM_ID, CONSENT_KEY } from "@/lib/tracking";

export { GTM_ID };

/**
 * Google Consent Mode v2 (advanced): before GTM loads, everything is "denied" by default.
 * Google tags then send only anonymous cookieless pings until the visitor accepts.
 * A choice saved on a previous visit is re-applied immediately.
 * Rendered by app/layout.tsx with strategy="beforeInteractive" (must live in the root layout).
 */
export const consentDefaults = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
`;

/**
 * Standard GTM snippet, loaded after the page becomes interactive. Unlike the
 * @next/third-parties component, it adds no <link rel="preload"> for gtm.js, so the tracking
 * script never competes with fonts, CSS or the hero image.
 */
export default function Analytics() {
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}
