// Root layout: metadata defaults, fonts, consent defaults, A/B test script, tracking (production only), header, contact block, footer and consent banner.
import TrackingEvents from "@/components/TrackingEvents";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Google_Sans_Flex } from "next/font/google";
import Analytics, { consentDefaults } from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactBlock from "@/components/ContactBlock";
import { abScript } from "@/lib/ab-test";
import { JsonLd, websiteJsonLd } from "@/lib/jsonld";
import { GTM_ID } from "@/lib/tracking";
import { SITE_URL, contact, routeInfo, routes } from "@/lib/site";
import "./globals.css";

const home = routeInfo("/");

// Font served from this site (no third-party stylesheet), with a size-adjusted fallback
// so the swap causes no layout shift.
const brandFont = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-brand",
  adjustFontFallback: true,
});

// Site-wide defaults. Each page overrides title, description and canonical via lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: home.title, template: `%s | ${contact.name}` },
  description: home.description,
  applicationName: `${contact.name} — Portfolio`,
  authors: [{ name: contact.name, url: contact.linkedin }],
  creator: contact.name,
  openGraph: {
    type: "website",
    siteName: `${contact.name} — Portfolio`,
    locale: "en_US",
    title: home.title,
    description: home.description,
  },
  twitter: { card: "summary_large_image", title: home.title, description: home.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Tracking only on the production deployment: preview URLs and local dev stay out of GA4 and Clarity.
const TRACKING = process.env.VERCEL_ENV === "production";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${brandFont.variable}`} suppressHydrationWarning>
      <Script id="consent-defaults" strategy="beforeInteractive">
        {consentDefaults}
      </Script>
      {TRACKING && <Analytics />}
      <body className="font-sans">
        {/* A/B test: draws or reads the variant and sets <html data-contact-position> before the first paint.
            suppressHydrationWarning on <html> because that attribute is not in the server HTML. */}
        <script dangerouslySetInnerHTML={{ __html: abScript }} />
        {TRACKING && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        )}
        <JsonLd data={websiteJsonLd} />
        <SiteHeader />
        <div id="content">{children}</div>
        <ContactBlock />
        <SiteFooter />
        <TrackingEvents portfolioPaths={routes.filter((r) => r.portfolio).map((r) => r.path)} />
        <ConsentBanner />
      </body>
    </html>
  );
}
