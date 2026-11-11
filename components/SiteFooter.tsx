import { contact } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-gray-300 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="font-bold mb-3">Contact</h2>
        <address className="not-italic">
          <ul className="space-y-1 text-sm">
            <li>
              Téléphone :{" "}
              <a href={`tel:${contact.phoneIntl}`} className="underline">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              Email :{" "}
              <a href={`mailto:${contact.email}`} className="underline">
                {contact.email}
              </a>
            </li>
            <li>
              LinkedIn :{" "}
              <a href={contact.linkedin} className="underline" target="_blank" rel="noopener me">
                linkedin.com/in/antoine-smolar
              </a>
            </li>
          </ul>
        </address>
        <p className="text-xs text-gray-500 mt-6">© {new Date().getFullYear()} {contact.name}</p>
      </div>
    </footer>
  );
}
