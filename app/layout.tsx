import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Google_Sans_Flex } from "next/font/google";
import Analytics, { consentDefaults } from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { JsonLd, websiteJsonLd } from "@/lib/jsonld";
import { GTM_ID } from "@/lib/tracking";
import { SITE_URL, contact, routeInfo } from "@/lib/site";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${brandFont.variable}`}>
      <Script id="consent-defaults" strategy="beforeInteractive">
        {consentDefaults}
      </Script>
      <Analytics />
      <body className="font-sans">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd data={websiteJsonLd} />
        <SiteHeader />
        <div id="content">{children}</div>
        <SiteFooter />
        <ConsentBanner />
      </body>
    </html>
  );
}
