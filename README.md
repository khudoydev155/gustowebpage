# Gusto Coffee

Gusto Coffee Bar — Xorazim viloyat, Xonqa tumanidagi qahvaxona uchun
rasmiy marketing sayti. Coffee worth slowing down for.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Uzbek / Russian / English i18n (`src/i18n`), with an optional
  `?lang=uz|ru|en` URL parameter for direct-linking a language
- Table reservation requests

## Local development

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Deploying (Vercel)

1. Push this project to a Git repository and import it in Vercel.
2. Deploy. Vercel builds the static site with `npm run build`.

## SEO

- `index.html` ships full Open Graph, Twitter Card, canonical, robots
  and `CafeOrCoffeeShop` JSON-LD structured data (name, address, geo,
  phone, hours) statically, so social-link previews and search
  crawlers get real content without running JavaScript.
- `public/robots.txt` and `public/sitemap.xml` are served from the
  site root. The sitemap's hreflang alternates use `?lang=` and are
  backed by real query-param language selection in
  `src/i18n/LanguageContext.tsx`.
