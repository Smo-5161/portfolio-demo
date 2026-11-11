# Portfolio & Technical Lab — V1 Skeleton

Squelette Next.js (App Router, React 19, TypeScript strict, Tailwind v4) en état "zéro" SEO/GEO/CRO.

## Démarrage

```bash
npm install

npm run dev
```

Ouvrir http://localhost:3000.

## Déploiement Vercel

```bash
git init && git add . && git commit -m "init: V1 skeleton"
npx vercel        # ou import du repo GitHub sur vercel.com
```

## Routes

| Route | Rôle |
|---|---|
| `/` | Accueil, 4 liens vers les sections |
| `/websites` | Reads `data/sites.json` |
| `/saas` | Reads `data/saas.json` |
| `/internal-tools` | Reads `data/tools.json` |
| `/architecture-lab` | Bouton test tracking, inspecteur JSON-LD, tableau métriques |
| `POST /api/track` | Stub : `console.log(body)` → `{ "status": "received_stub" }` |
| `/robots.txt` | Généré par `app/robots.ts` : robots IA autorisés, `/api/` exclu, lien sitemap |
| `/sitemap.xml` | Généré par `app/sitemap.ts` |
| `/llms.txt` | Résumé Markdown du site pour les LLM |

## État "zéro" volontaire

- Métadonnées par défaut (`Create Next App`), pas d'OpenGraph / Twitter Cards
- Aucun JSON-LD, aucun `sitemap.ts`
- robots.txt sans règles pour les bots LLM
- GTM (`GTM-TWFXM6B4`) + Clarity actifs sur toutes les pages (`components/Analytics.tsx`)

## Ajouter un projet

Ajouter un objet dans le JSON correspondant :

```json
[{ "id": "mon-site", "name": "Mon site", "description": "…", "url": "https://…" }]
```
