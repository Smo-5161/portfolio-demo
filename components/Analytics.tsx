import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

// Scripts prêts mais désactivés en V1 (NEXT_PUBLIC_ANALYTICS_ENABLED=false).
const ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "xxxxxxxxxx";

export default function Analytics() {
  if (!ENABLED) return null;

  return (
    <>
      <GoogleAnalytics gaId={GA_ID} />
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
      </Script>
    </>
  );
}
