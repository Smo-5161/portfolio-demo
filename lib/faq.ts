// Source unique pour la FAQ : sert au rendu HTML ET au JSON-LD FAQPage.
export type FaqSource = { label: string; url: string };
export type FaqItem = { question: string; answer: string; sources: FaqSource[] };

export const faq: FaqItem[] = [
  {
    question: "Le SEO sert-il encore à quelque chose maintenant que tout le monde utilise l'IA ?",
    answer:
      "Oui : la recherche organique génère encore 53,3 % du trafic web traçable, soit plus de dix fois les réseaux sociaux organiques (5 %). Les assistants IA progressent vite, mais Google reste de loin la première source de visites, et un site bien référencé est aussi la matière première dont se servent les moteurs génératifs.",
    sources: [
      {
        label: "BrightEdge – Organic Share of Traffic Increases to 53%",
        url: "https://www.brightedge.com/blog/organic-share-of-traffic-increases-to-53",
      },
    ],
  },
  {
    question: "C'est quoi le GEO, et pourquoi s'en occuper dès maintenant ?",
    answer:
      "Le GEO consiste à rendre un site citable par les IA génératives (ChatGPT, Gemini, Perplexity…), et ce canal a déjà généré en moyenne 770,7 millions de visites par mois entre juin 2025 et mai 2026, soit plus du double de l'année précédente (+117 %). Concrètement, cela passe par des réponses claires, des données chiffrées, des sources et des données structurées que les modèles peuvent extraire facilement.",
    sources: [
      {
        label: "Similarweb – AI Referral Traffic by Industry",
        url: "https://aisearch.similarweb.com/blog/ai-referral-traffic-by-industry/",
      },
    ],
  },
  {
    question: "Faut-il choisir entre SEO et GEO ?",
    answer:
      "Non : en 2026, le trafic issu des IA ne pèse encore que 0,32 % du trafic total des sites, même s'il a été multiplié par 16 en moins de deux ans. Gartner anticipait de son côté une baisse de 25 % du volume des moteurs de recherche classiques d'ici 2026 au profit des chatbots : la bonne stratégie est donc de consolider le SEO tout en préparant le GEO.",
    sources: [
      {
        label: "SE Ranking – AI traffic grew 16x from 2024 to 2026",
        url: "https://seranking.com/blog/ai-traffic-research-study/",
      },
      {
        label: "Gartner – Search engine volume will drop 25% by 2026",
        url: "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents",
      },
    ],
  },
  {
    question: "Pourquoi optimiser la conversion plutôt qu'acheter plus de trafic ?",
    answer:
      "Parce que la plupart des visiteurs repartent sans rien faire : le taux de conversion moyen d'un site e-commerce tourne autour de 2 à 3 %. Passer de 2 % à 3 % augmente le chiffre d'affaires de 50 % à trafic constant, sans un euro de publicité en plus.",
    sources: [
      {
        label: "Blend Commerce – eCommerce Conversion Rate Benchmarks 2026",
        url: "https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026",
      },
    ],
  },
  {
    question: "L'UI/UX a-t-elle un impact mesurable sur les ventes ?",
    answer:
      "Oui : selon le Baymard Institute, un grand site e-commerce peut gagner jusqu'à 35 % de conversion simplement en améliorant le design de son tunnel de commande. Environ 70 % des paniers sont abandonnés, et la conception du checkout en est souvent la seule cause.",
    sources: [
      {
        label: "Baymard Institute – Cart & Checkout Usability Research",
        url: "https://baymard.com/research/checkout-usability",
      },
    ],
  },
  {
    question: "Une entreprise a-t-elle vraiment besoin d'outils internes sur mesure ?",
    answer:
      "Souvent oui : selon le McKinsey Global Institute, les employés passent près de 20 % de leur semaine à chercher des informations internes ou la bonne personne pour les aider. Un outil interne qui centralise les données et automatise les tâches répétitives rend directement ce temps aux équipes.",
    sources: [
      {
        label: "McKinsey Global Institute – The social economy",
        url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy",
      },
    ],
  },
  {
    question: "Le no-code est-il assez sérieux pour construire des applications d'entreprise ?",
    answer:
      "Oui : Gartner prévoyait que 70 % des nouvelles applications d'entreprise utiliseraient des technologies low-code ou no-code dès 2025, contre moins de 25 % en 2020. Le no-code permet de livrer en jours plutôt qu'en mois, ce qui est idéal pour tester un produit ou outiller une équipe métier.",
    sources: [
      {
        label: "Computerworld – Gartner : low-code development platforms",
        url: "https://www.computerworld.com/article/1616390/low-code-development-platforms-to-grow-25-in-2023.html",
      },
    ],
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
