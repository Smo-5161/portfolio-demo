// Structure d'un projet du portfolio. Tous les champs sauf id/name sont optionnels.
export type ColorToken = { name: string; hex: string; role: string };
export type TypeToken = { role: string; size: string; weight: string; note?: string };

export type DesignSystem = {
  summary: string;
  palette: ColorToken[];
  fontFamily: string;
  typeScale: TypeToken[];
  principles: string[];
};

export type SeoScore = { label: string; before?: string; after?: string; image?: string };

export type Project = {
  id: string;
  name: string;
  url?: string;
  description?: string;
  context?: string[];
  scope?: string[];
  duration?: string;
  design?: DesignSystem;
  seoScores?: SeoScore[];
};
