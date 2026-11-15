// Site footer: utility links. The contact block sits just above it (components/ContactBlock.tsx),
// or under the header for visitors in the "top" variant of the A/B test.
import { REPO_URL, contact } from "@/lib/site";
import CookieSettingsButton from "./CookieSettingsButton";

export default function SiteFooter() {
  return (
    <footer className="site-footer bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <p className="text-xs text-ink-500 flex flex-wrap gap-4">
          <span>
            © {new Date().getFullYear()} {contact.name}
          </span>
          <span>
            Skills showcase, vibe-coded with Claude under my direction ·{" "}
            <a href="/architecture-lab" className="underline underline-offset-2 hover:text-ink-900">
              How it&apos;s built
            </a>
          </span>
          <a href="/faq" className="underline underline-offset-2 hover:text-ink-900">
            FAQ
          </a>
          <a href={REPO_URL} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-ink-900">
            Source code
          </a>
          <CookieSettingsButton />
        </p>
      </div>
    </footer>
  );
}
