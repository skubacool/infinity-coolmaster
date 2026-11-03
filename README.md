# Infinity CoolMaster — Corporate Website

Premium, bright B2B website for **Infinity CoolMaster**, a Cooling-as-a-Service (CaaS)
and AI-driven HVAC optimization company.

Built with **Vite + React 19 + TypeScript + Tailwind CSS**, backed by a small
**Cloudflare Worker** API (D1 database for content and leads, R2 for images),
and deployable to **GitHub Pages** out of the box.

---

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # preview the production build
```

The site renders fully from typed default content even with no backend configured —
the API progressively enhances it.

## Environment variables

Copy `.env.example` to `.env.local`:

```
VITE_API_URL=https://icm-api.<account>.workers.dev
```

## Backend (`worker/`)

A single Cloudflare Worker serves everything dynamic:

| Endpoint | Purpose |
| --- | --- |
| `GET /api/cms` | every CMS collection in one request |
| `POST /api/leads` | audit-request form submissions |
| `GET /img/...` | images uploaded through the admin (R2) |
| `/api/admin/*` | content, image upload and leads management (login token required) |

Setup, secrets and local development: [`worker/README.md`](worker/README.md) and
[`DEPLOYMENT.md`](DEPLOYMENT.md). Staff guide for the content manager at `/admin/`:
[`ADMIN-GUIDE.md`](ADMIN-GUIDE.md).

## GitHub Pages deployment

1. The site is built for the custom domain root (`base: '/'` in
   [`vite.config.ts`](vite.config.ts), `SITE_ORIGIN` in
   [`src/config/routes.ts`](src/config/routes.ts)).
2. `npm run deploy` — builds and publishes `dist/` to the `gh-pages` branch.

### Routing and pre-rendering (SEO)

Every page has a real URL (`/en/about/`, `/th/case-studies/<slug>/`, …) and is
**pre-rendered to static HTML at build time**, so search engines and AI
crawlers see the full text without running JavaScript. `npm run build`:

1. builds the browser bundle (`vite build`),
2. builds a server bundle of [`src/entry-server.tsx`](src/entry-server.tsx),
3. runs [`scripts/prerender.mjs`](scripts/prerender.mjs), which renders every
   route into `dist/<route>/index.html` and writes `404.html`, `sitemap.xml`,
   `robots.txt` and `llms.txt`.

In the browser React hydrates the static HTML and then refreshes content from
the CMS, so admin edits still show to visitors right away. **Search engines see
CMS changes only after the next `npm run deploy`** — redeploy after adding or
editing case studies and articles (a new one has no static page until then).

Where to edit SEO text:

| What | File |
| --- | --- |
| Page titles, meta descriptions, standalone page copy | [`src/seo/meta.en.ts`](src/seo/meta.en.ts), [`src/seo/meta.th.ts`](src/seo/meta.th.ts) |
| Which standalone pages are live (others are `noindex` TODO scaffolds) | `PUBLISHED_PAGES` in [`src/seo/pages.ts`](src/seo/pages.ts) |
| Company facts in structured data (JSON-LD) | [`src/seo/organization.ts`](src/seo/organization.ts) |
| URL structure | [`src/config/routes.ts`](src/config/routes.ts) |
| Case-study / article URLs | the **Web address (slug)** field in the admin |

Old hash links (`/#/en/about`, `/#/en/project/1`) are redirected to the new
URLs by a small script at the top of [`index.html`](index.html).

## Architecture

```
src/
├── apis/          # Data access: CMS content via the API + typed default content
│   └── <domain>/  #   index.ts (fetch) + defaults.ts (fallback data)
├── components/
│   ├── layouts/   # layout-standard | layout-banner | layout-popup
│   ├── screens/   # One folder per route, with co-located sections/
│   ├── sections/  # Cross-screen sections (partners, next, two-cols)
│   └── _commons/  # Shared building blocks (nav, footer, cards, lead-form, …)
├── config/        # Site constants + the admin's form schema
├── lib/           # apiClient.ts (API address, admin session, fetch wrapper)
├── models/        # Typed domain models (LocalizedText th/en throughout)
├── stores/        # jotai view-models (vm-screen* with bind() pattern)
└── utils/         # localization, date, media, path helpers
worker/            # Cloudflare Worker API (src/index.ts, schema.sql, wrangler.jsonc)
```

### Design tokens (tailwind.config.js)

| Token | Value | Use |
| --- | --- | --- |
| `bg-base` / `bg-soft` | #FFFFFF / #F8FAFC | Primary surfaces |
| `text-main` | #0F172A | Headings & body (deep corporate navy) |
| `text-muted` | #475569 | Secondary copy |
| `brand-green` | #10B981 | Energy savings / sustainability |
| `brand-blue` | #38BDF8 | Chilled-water / cooling dynamics |
| `bg-gradient-caas` | green → blue | Signature gradient (logo, CTAs, accents) |

Component classes: `.btn-caas`, `.btn-navy`, `.btn-outline`, `.kicker`,
`.card-premium`, `.text-gradient-caas` (see `src/index.css`).
