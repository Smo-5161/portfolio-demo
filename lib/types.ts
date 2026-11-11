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
  description?: string;
  context?: string[];
  scope?: string[];
  stack?: string[];
  duration?: string;
  work?: WorkBlock[];
  design?: DesignSystem;
  seoScores?: SeoScore[];
};
