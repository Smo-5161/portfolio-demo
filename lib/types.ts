// Portfolio project shape. Every field except id/name is optional.
export type ColorToken = { name: string; hex: string; role: string };

export type DesignSystem = {
  summary: string;
  palette: ColorToken[];
  fontFamily?: string;
};

export type WorkBlock = { title: string; text: string; points?: string[] };

export type SeoScore = { label: string; before?: string; after?: string; image?: string };

export type Project = {
  id: string;
  name: string;
  url?: string;
  /** Label of the main button (defaults to "Visit <host>"). */
  urlLabel?: string;
  /** Extra secondary buttons. */
  links?: { label: string; url: string }[];
  description?: string;
  context?: string[];
  scope?: string[];
  stack?: string[];
  duration?: string;
  work?: WorkBlock[];
  design?: DesignSystem;
  seoScores?: SeoScore[];
  /** Short, discreet note shown at the end of the details (e.g. why no screenshots). */
  note?: string;
  /** Presentation deck shown in a slide viewer (images) with a downloadable PDF. */
  slides?: {
    title: string;
    images: string[];
    pdf?: string;
    /** Text of each slide, in order, rendered as HTML so crawlers and LLMs can read the deck. */
    transcript?: SlideText[];
  };
};

/** Text version of one slide: a title plus paragraphs (or an ordered list) and an optional table. */
export type SlideText = {
  title: string;
  text: string[];
  list?: "ol";
  table?: { head: string[]; rows: string[][] };
};
