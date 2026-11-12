// Fictional product for the variant selector demo (/lab/variant-selector). Not for sale.
export type DemoColor = { id: string; name: string; hex: string };
export type DemoSize = "XS" | "S" | "M" | "L" | "XL";

export const demoProduct = {
  id: "portfolio-tee",
  name: "Portfolio Tee",
  description: "Organic cotton T-shirt. Fictional product used to demonstrate variant SEO.",
  price: 29,
  currency: "EUR",
  colors: [
    { id: "teal", name: "Deep teal", hex: "#145c63" },
    { id: "sand", name: "Sand", hex: "#e6d3ad" },
    { id: "apricot", name: "Apricot", hex: "#e8995b" },
    { id: "charcoal", name: "Charcoal", hex: "#33393b" },
  ] as DemoColor[],
  sizes: ["XS", "S", "M", "L", "XL"] as DemoSize[],
  // Units in stock per colour and size (0 = sold out).
  stock: {
    teal: { XS: 4, S: 12, M: 0, L: 7, XL: 3 },
    sand: { XS: 0, S: 5, M: 9, L: 6, XL: 0 },
    apricot: { XS: 2, S: 8, M: 11, L: 0, XL: 1 },
    charcoal: { XS: 6, S: 14, M: 10, L: 9, XL: 5 },
  } as Record<string, Record<DemoSize, number>>,
};
