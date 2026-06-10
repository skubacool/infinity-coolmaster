# Infinity CoolMaster — Corporate Website

Premium, bright B2B website for **Infinity CoolMaster**, a Cooling-as-a-Service (CaaS)
and AI-driven HVAC optimization company.

Built with **Vite + React 19 + TypeScript + Tailwind CSS**, backed by **Supabase**
(lead ingestion + dynamic CMS), and deployable to **GitHub Pages** out of the box.

---

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # preview the production build
```

The site renders fully from typed default content even with no backend configured —
Supabase progressively enhances it.

## Environment variables

Copy `.env.example` to `.env.local`:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

## Supabase setup

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql)
   in the SQL editor. It creates:
   - **`leads`** — receives audit-request form submissions
     (`company_name`, `contact_person`, `email`, `phone`, `current_bill`,
     `industry`, `status`), anon INSERT-only via RLS.
   - **`cms_content`** — generic CMS store: one row per entity
     (`collection`, `key`, `seq`, `data` jsonb), anon SELECT-only via RLS.
2. To override any default content, insert rows whose `data` matches the
   TypeScript models in `src/models/*`. Supported collections:
   `localizations`, `media`, `benefits`, `hero_banners`, `sectors`,
   `projects`, `activities`, `partners`, `contacts`.

## GitHub Pages deployment

1. In [`vite.config.ts`](vite.config.ts), set `base` to `'/<repository-name>/'`
   (or `'/'` for a custom domain / user page).
2. `npm run deploy` — builds and publishes `dist/` to the `gh-pages` branch.

Routing uses **HashRouter**, so deep links and refreshes work on GitHub Pages
without any 404 redirect tricks.

## Architecture

```
src/
├── apis/          # Data access: Supabase cms_content + typed default content
│   └── <domain>/  #   index.ts (fetch) + defaults.ts (fallback data)
├── components/
│   ├── layouts/   # layout-standard | layout-banner | layout-popup
│   ├── screens/   # One folder per route, with co-located sections/
│   ├── sections/  # Cross-screen sections (partners, next, two-cols)
│   └── _commons/  # Shared building blocks (nav, footer, cards, lead-form, …)
├── config/        # Site constants
├── lib/           # supabaseClient.ts
├── models/        # Typed domain models (LocalizedText th/en throughout)
├── stores/        # jotai view-models (vm-screen* with bind() pattern)
└── utils/         # localization, date, media, path helpers
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
