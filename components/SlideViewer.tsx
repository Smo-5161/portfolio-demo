"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  /** Slide images in order, e.g. /projects/x/slide-1.webp */
  slides: string[];
  /** Slide titles, used in alt texts so each image says what it shows. */
  labels?: string[];
  /** Downloadable PDF of the same deck. */
  pdf?: string;
  width?: number;
  height?: number;
};

/**
 * One slide at a time, readable at full width. Arrows, keyboard (← →) and a thumbnail strip.
 * Only the current slide and its neighbours are loaded; the full deck is also offered as a PDF.
 */
export default function SlideViewer({ title, slides, labels, pdf, width = 1600, height = 900 }: Props) {
  const [i, setI] = useState(0);
  const stripRef = useRef<HTMLOListElement>(null);
  const go = useCallback((n: number) => setI(Math.max(0, Math.min(slides.length - 1, n))), [slides.length]);

  useEffect(() => {
    stripRef.current?.children[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [i]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} — slides`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      className="outline-none"
    >
      <div className="relative overflow-hidden rounded-2xl border border-stroke bg-surface">
        <Image
          key={slides[i]}
          src={slides[i]}
          alt={`${title} — slide ${i + 1} of ${slides.length}${labels?.[i] ? `: ${labels[i]}` : ""}`}
          width={width}
          height={height}
          sizes="(min-width: 1152px) 1050px, 95vw"
          className="h-auto w-full"
          priority={i === 0}
        />
        {/* Preload neighbours so navigation feels instant */}
        {[i - 1, i + 1]
          .filter((n) => n >= 0 && n < slides.length)
          .map((n) => (
            <Image
              key={`pre-${slides[n]}`}
              src={slides[n]}
              alt=""
              aria-hidden="true"
              width={width}
              height={height}
              sizes="(min-width: 1152px) 1050px, 95vw"
              className="hidden"
            />
          ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(i - 1)}
            disabled={i === 0}
            aria-label="Previous slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-stroke bg-white hover:bg-brand-50 disabled:opacity-40"
          >
            ←
          </button>
          <span className="min-w-16 text-center text-sm text-ink-700" aria-live="polite">
            {i + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => go(i + 1)}
            disabled={i === slides.length - 1}
            aria-label="Next slide"
            className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 text-white hover:bg-brand-900 disabled:opacity-40"
          >
            →
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={slides[i]} target="_blank" rel="noopener" className="btn btn-secondary">
            Full size ↗
          </a>
          {pdf && (
            <a href={pdf} download className="btn btn-secondary">
              Download PDF
            </a>
          )}
        </div>
      </div>

      <ol ref={stripRef} className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label="Slide thumbnails">
        {slides.map((s, n) => (
          <li key={s} className="shrink-0">
            <button
              type="button"
              onClick={() => go(n)}
              aria-label={`Go to slide ${n + 1}${labels?.[n] ? `: ${labels[n]}` : ""}`}
              aria-current={n === i}
              className={`block w-28 overflow-hidden rounded-lg border-2 transition-colors ${
                n === i ? "border-brand-700" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={s} alt="" width={160} height={90} sizes="112px" className="h-auto w-full" loading="lazy" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
