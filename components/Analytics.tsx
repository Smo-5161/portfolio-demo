import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

// GTM + Microsoft Clarity, chargés sur toutes les pages via le root layout.
// GA4 se configure désormais dans le conteneur GTM.
export const GTM_ID = "GTM-TWFXM6B4";
const CLARITY_ID = "zc1u4r8qm1";

export default function Analytics() {
  return (
    <>
      <GoogleTagManager gtmId={GTM_ID} />
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
      </Script>
    </>
  );
}
