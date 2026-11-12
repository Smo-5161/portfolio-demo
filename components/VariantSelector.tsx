"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { demoProduct, type DemoSize } from "@/data/demo-product";

const BASE_PATH = "/lab/variant-selector";
const p = demoProduct;

type LogEntry = { time: string; payload: Record<string, unknown> };

function readUrl() {
  const q = new URLSearchParams(window.location.search);
  const color = p.colors.some((c) => c.id === q.get("color")) ? q.get("color")! : p.colors[0].id;
  const size = p.sizes.includes(q.get("size") as DemoSize) ? (q.get("size") as DemoSize) : null;
  return { color, size };
}

function pushDataLayer(payload: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ecommerce: null }); // GA4 recommendation: clear the previous ecommerce object
  w.dataLayer.push(payload);
}

/**
 * E-commerce variant selector with a live "SEO inspector".
 * - Colour and size are kept in the URL (shareable links, back button works).
 * - The inspector shows the canonical / robots tags such a page should send for each state:
 *   colour = indexable variant, size = canonicalised to the colour URL.
 * - Every choice pushes a GA4 e-commerce event to the dataLayer.
 */
export default function VariantSelector() {
  const [color, setColor] = useState(p.colors[0].id);
  const [size, setSize] = useState<DemoSize | null>(null);
  const [events, setEvents] = useState<LogEntry[]>([]);

  const colorObj = p.colors.find((c) => c.id === color)!;
  const stockFor = useCallback((c: string, s: DemoSize) => p.stock[c]?.[s] ?? 0, []);

  const item = useCallback(
    (c: string, s: DemoSize | null) => ({
      item_id: s ? `${p.id}-${c}-${s.toLowerCase()}` : `${p.id}-${c}`,
      item_name: p.name,
      item_variant: s ? `${p.colors.find((x) => x.id === c)?.name} / ${s}` : p.colors.find((x) => x.id === c)?.name,
      price: p.price,
    }),
    [],
  );

  const track = useCallback(
    (event: string, c: string, s: DemoSize | null) => {
      const payload = { event, ecommerce: { currency: p.currency, value: p.price, items: [item(c, s)] } };
      pushDataLayer(payload);
      setEvents((prev) => [{ time: new Date().toLocaleTimeString(), payload }, ...prev].slice(0, 4));
    },
    [item],
  );

  // Initial state from the URL, view_item once, and back/forward support.
  useEffect(() => {
    const s = readUrl();
    setColor(s.color);
    setSize(s.size && stockFor(s.color, s.size) > 0 ? s.size : null);
    track("view_item", s.color, null);
    const onPop = () => {
      const st = readUrl();
      setColor(st.color);
      setSize(st.size);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [stockFor, track]);

  function update(nextColor: string, nextSize: DemoSize | null) {
    const q = new URLSearchParams({ color: nextColor });
    if (nextSize) q.set("size", nextSize);
    window.history.pushState(null, "", `${BASE_PATH}?${q.toString()}`);
    setColor(nextColor);
    setSize(nextSize);
    track("select_variant", nextColor, nextSize);
  }

  function chooseColor(c: string) {
    // Keep the size if it is still in stock in the new colour.
    update(c, size && stockFor(c, size) > 0 ? size : null);
  }

  // What the page SHOULD send to search engines for the current state.
  const seo = useMemo(() => {
    const colorUrl = `${BASE_PATH}?color=${color}`;
    const current = size ? `${colorUrl}&size=${size}` : colorUrl;
    return {
      current,
      canonical: colorUrl,
      indexable: !size,
      robots: size ? "index, follow (canonical points to the colour URL)" : "index, follow",
      reason: size
        ? "Size does not change what the page shows to a searcher: the size URL is canonicalised to the colour URL, so Google keeps one page per colour."
        : "Each colour has its own images and its own searches (“sand t-shirt”): it is an indexable variant with a self-referencing canonical.",
    };
  }, [color, size]);

  const productGroup = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      name: p.name,
      productGroupID: p.id,
      variesBy: ["https://schema.org/color", "https://schema.org/size"],
      hasVariant: p.colors.flatMap((c) =>
        p.sizes.map((s) => ({
          "@type": "Product",
          sku: `${p.id}-${c.id}-${s.toLowerCase()}`,
          color: c.name,
          size: s,
          url: `${BASE_PATH}?color=${c.id}`,
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: p.currency,
            availability: `https://schema.org/${stockFor(c.id, s) > 0 ? "InStock" : "OutOfStock"}`,
          },
        })),
      ).filter((v) => v.color === colorObj.name),
    }),
    [colorObj.name, stockFor],
  );

  const stock = size ? stockFor(color, size) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Shopper side */}
      <section aria-labelledby="product-title" className="card p-6">
        <div className="grid place-items-center rounded-2xl bg-surface py-8 mb-6" aria-hidden="true">
          <svg viewBox="0 0 200 180" className="h-48 w-48 transition-colors duration-300">
            <path
              d="M70 12 L40 22 L8 52 L30 78 L48 66 L48 170 L152 170 L152 66 L170 78 L192 52 L160 22 L130 12 C124 28 112 36 100 36 C88 36 76 28 70 12 Z"
              fill={colorObj.hex}
              stroke="#1b2427"
              strokeOpacity="0.25"
              strokeWidth="2"
            />
          </svg>
        </div>

        <h2 id="product-title" className="text-2xl mb-1">
          {p.name}
        </h2>
        <p className="text-sm text-ink-500 mb-1">{p.description}</p>
        <p className="text-xl font-medium mb-6">{p.price} €</p>

        <fieldset className="mb-6">
          <legend className="text-sm font-medium mb-2">
            Colour: <span className="font-normal text-ink-700">{colorObj.name}</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {p.colors.map((c) => (
              <label key={c.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={c.id}
                  checked={color === c.id}
                  onChange={() => chooseColor(c.id)}
                  className="peer sr-only"
                />
                <span
                  className="flex items-center gap-2 rounded-full border border-stroke py-1.5 pl-1.5 pr-3 text-sm transition-colors peer-checked:border-brand-700 peer-checked:ring-2 peer-checked:ring-brand-700 peer-focus-visible:outline-2 peer-focus-visible:outline-brand-700"
                >
                  <span className="h-6 w-6 rounded-full border border-stroke" style={{ backgroundColor: c.hex }} />
                  {c.name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-6">
          <legend className="text-sm font-medium mb-2">
            Size: <span className="font-normal text-ink-700">{size ?? "choose a size"}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => {
              const out = stockFor(color, s) === 0;
              return (
                <label key={s} className={out ? "cursor-not-allowed" : "cursor-pointer"}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    disabled={out}
                    onChange={() => update(color, s)}
                    className="peer sr-only"
                  />
                  <span
                    className={`grid h-11 min-w-14 place-items-center rounded-xl border px-3 text-sm transition-colors peer-checked:bg-brand-700 peer-checked:text-white peer-checked:border-brand-700 peer-focus-visible:outline-2 peer-focus-visible:outline-brand-700 ${
                      out ? "border-stroke text-ink-300 line-through" : "border-stroke hover:bg-brand-50"
                    }`}
                  >
                    {s}
                    {out && <span className="sr-only"> (sold out)</span>}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <p className="text-sm text-ink-700 mb-4" aria-live="polite">
          {stock === null ? "Select a size to see availability." : `${stock} in stock — ships in 48 h.`}
        </p>
        <button type="button" disabled className="btn btn-primary opacity-60 cursor-not-allowed">
          Add to cart (demo)
        </button>
      </section>

      {/* SEO inspector */}
      <section aria-labelledby="inspector-title" className="space-y-4">
        <h2 id="inspector-title" className="text-xl">
          SEO inspector
        </h2>
        <dl className="card divide-y divide-stroke text-sm">
          {[
            ["Current URL", seo.current],
            ["Canonical", seo.canonical],
            ["Meta robots", seo.robots],
            ["Indexable variant", seo.indexable ? "Yes (colour)" : "No (size → colour)"],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-3">
              <dt className="text-ink-500">{k}</dt>
              <dd className="font-mono break-all">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-ink-700" aria-live="polite">
          {seo.reason}
        </p>

        <details className="card overflow-hidden">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
            ProductGroup JSON-LD for this colour (shown, not injected)
          </summary>
          <pre className="max-h-72 overflow-auto border-t border-stroke bg-surface p-4 text-xs font-mono">
            {JSON.stringify(productGroup, null, 2)}
          </pre>
        </details>

        <div className="card">
          <p className="px-4 pt-3 text-sm font-medium">GA4 e-commerce events (dataLayer)</p>
          <ol className="p-4 space-y-2">
            {events.map((e, i) => (
              <li key={i} className="rounded-xl bg-accent-50 p-3 text-xs font-mono break-all">
                <span className="text-ink-500">{e.time}</span> {JSON.stringify(e.payload)}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
