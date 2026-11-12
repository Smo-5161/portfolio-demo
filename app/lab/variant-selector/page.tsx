import type { Metadata } from "next";
import Link from "next/link";
import VariantSelector from "@/components/VariantSelector";

// Demo page: fictional product, so it is kept out of search results on purpose
// (noindex, absent from the sitemap and llms.txt, not linked from the menu).
export const metadata: Metadata = {
  title: "Demo: e-commerce variant selector & SEO",
  description:
    "Interactive demo of a colour and size selector with a live SEO inspector: variant URLs, canonical tags, ProductGroup structured data and GA4 e-commerce events.",
  alternates: { canonical: "/lab/variant-selector" },
  robots: { index: false, follow: true },
};

export default function VariantSelectorPage() {
  return (
    <main>
      <div className="hero-gradient border-b border-stroke">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-4">
            <Link href="/" className="link">
              Home
            </Link>{" "}
            <span aria-hidden="true">›</span>{" "}
            <Link href="/architecture-lab#variant-demo" className="link">
              Lab
            </Link>{" "}
            <span aria-hidden="true">›</span> Variant selector
          </nav>
          <h1 className="text-4xl mb-3">E-commerce variant selector</h1>
          <p className="text-ink-700 max-w-3xl mb-4">
            Pick a colour and a size: the page updates instantly, the URL follows your choice, and
            the inspector shows what such a product page should tell search engines at each step.{" "}
            <Link href="/architecture-lab#variant-demo" className="link">
              Read the explanation in the Lab
            </Link>
            .
          </p>
          <p className="inline-block rounded-full bg-accent-100 px-3 py-1 text-sm">
            Demo: fictional product, not for sale. This page is not indexed.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <VariantSelector />
      </div>
    </main>
  );
}
