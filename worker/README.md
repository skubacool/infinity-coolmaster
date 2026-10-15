# Infinity CoolMaster API

Cloudflare Worker + D1 (database) + R2 (images). One file of logic: [`src/index.ts`](src/index.ts).
Tables are defined in [`schema.sql`](schema.sql); bindings and allowed origins in
[`wrangler.jsonc`](wrangler.jsonc).

## Commands

```powershell
npm install            # once
npm run typecheck      # tsc --noEmit
npm run dev            # local API on http://localhost:8793 (local D1/R2, secrets from .dev.vars)
npm run db:local       # create the tables in the local database
npm run db:remote      # create the tables in production (safe to re-run)
npm run deploy         # publish to https://icm-api.<account>.workers.dev
```

## Secrets (production)

Set once with `npx wrangler secret put <NAME>` — the value is typed at a hidden prompt:

| Secret | What it is |
| --- | --- |
| `AUTH_SECRET` | long random value that signs admin login tokens (24 h) |
| `ADMIN_EMAIL` | admin login email |
| `ADMIN_PASSWORD` | admin login password |

For local development copy `.dev.vars.example` to `.dev.vars` (git-ignored) and use fake values.

## Endpoints

Public: `GET /api/cms` · `POST /api/leads` · `GET /img/<folder>/<file>`  
Admin (header `Authorization: Bearer <token>` except login): `POST /api/admin/login` ·
`GET /api/admin/me` · `GET | PUT | DELETE /api/admin/rows` · `PUT /api/admin/rows/bulk` ·
`POST /api/admin/upload` · `GET /api/admin/leads` · `PATCH /api/admin/leads/:id`

## Notes

- `ALLOWED_ORIGINS` (in `wrangler.jsonc`) lists the browser origins the API answers; add any new site address there.
- Uploaded SVGs are served with a sandboxing Content-Security-Policy so scripts inside them can never run.
- Failed logins are recorded in `login_failures` to throttle guessing (5 per address / 30 total per 15 minutes).
