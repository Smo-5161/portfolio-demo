import type { Metadata } from "next";
import Link from "next/link";

// Own metadata so a 404 never inherits the home page's description or canonical URL.
export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="eyebrow mb-2">404</p>
      <h1 className="text-4xl mb-4">Page not found</h1>
      <p className="text-ink-700 mb-8">This page does not exist or has moved.</p>
      <Link href="/" className="btn btn-primary">
        Back to the home page
      </Link>
    </main>
  );
}
