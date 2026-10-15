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
[`DEPLOYMENT.md`](DEPLOYMENT.md). Staff guide for the content manager at `/#/admin`:
[`ADMIN-GUIDE.md`](ADMIN-GUIDE.md).

## GitHub Pages deployment

1. In [`vite.config.ts`](vite.config.ts), set `base` to `'/'` for the custom domain
   (or `'/<repository-name>/'` for a plain github.io address).
2. `npm run deploy` — builds and publishes `dist/` to the `gh-pages` branch.

Routing uses **HashRouter**, so deep links and refreshes work on GitHub Pages
without any 404 redirect tricks.

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
