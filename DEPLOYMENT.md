# Deployment Guide — Infinity CoolMaster Website

Two independent parts: a **Cloudflare Worker API** (backend: leads + CMS +
image storage — see [`worker/`](worker)) and **GitHub Pages** (static
hosting). Do the API first so the production build knows its address.

> History: until Oct 2026 the backend was a Supabase project. It was replaced
> by Cloudflare (Worker + D1 + R2) so nothing needs to be kept alive and no
> database slot is tied up. The old Supabase project can be deleted.

---

## Part 1 — Cloudflare API (Worker + D1 database + R2 images)

Already set up for this project: API at `https://icm-api.skubacool.workers.dev`,
database `icm-cms`, image bucket `icm-images`. The steps below rebuild it from
scratch (new account, disaster recovery) or explain what each piece is.

### 1.1 Prerequisites
- A Cloudflare account (free plan is enough).
- Log the CLI in once: `npx wrangler login` (opens a browser).

### 1.2 Create the resources and deploy
```powershell
cd "D:\Desktop\Infinity Cool Master\Website\worker"
npm install
npx wrangler d1 create icm-cms --location apac       # copy the printed database_id into wrangler.jsonc
npx wrangler r2 bucket create icm-images --location apac
npm run db:remote                                    # creates the tables (worker/schema.sql)
npm run deploy                                       # prints https://icm-api.<account>.workers.dev
```

### 1.3 Set the secrets (never stored in git)
```powershell
cd "D:\Desktop\Infinity Cool Master\Website\worker"
npx wrangler secret put AUTH_SECRET      # any long random value; signs login tokens
npx wrangler secret put ADMIN_EMAIL      # the admin login email
npx wrangler secret put ADMIN_PASSWORD   # the admin login password
```
Wrangler asks for each value and hides what you type.
- **Change the password:** run `npx wrangler secret put ADMIN_PASSWORD` again.
- **Sign everyone out:** set a new `AUTH_SECRET` (all existing tokens stop working).
- Logins are throttled: 5 wrong attempts from one address, or 30 in total,
  lock the login for 15 minutes.

### 1.4 Point the site at the API
Create `.env.local` in the project root (gitignored):
```
VITE_API_URL=https://icm-api.skubacool.workers.dev
```
**It must exist on the machine where you run `npm run deploy`** — Vite bakes
the value into the build. Without it the site still renders from its built-in
default content, but the lead form and admin report that no API is configured.

### 1.5 Try everything locally with fake data
```powershell
cd "D:\Desktop\Infinity Cool Master\Website"
Copy-Item worker\.dev.vars.example worker\.dev.vars     # fake credentials, local only
npm --prefix worker run db:local                        # local copy of the database
npm --prefix worker run dev                             # API on http://localhost:8793
# in a second terminal, with VITE_API_URL=http://localhost:8793 in .env.local:
npm run dev
```
Local runs use a throw-away database and image store; production is untouched.

### 1.6 Browser admin for non-IT staff
The site ships with a hidden content manager at **`https://<site>/#/admin`** —
log in with the email + password from step 1.3 and edit everything through
forms: site text (EN/TH), banners (with direct image upload), case studies,
articles, partners, benefits, services, sectors, contact channels, plus a
**Leads inbox** with status tracking. Staff instructions: [`ADMIN-GUIDE.md`](ADMIN-GUIDE.md).

Editing rules inside the admin:
- **Site Text / Banners & Images**: per-item override with a “customized”
  badge and a *Reset to default* button.
- **List tabs (Case Studies, Articles, …)**: the first visit shows the
  built-in defaults with an **“Enable editing (copy defaults)”** button —
  click it once, then add/edit/delete freely.
- Saves are live on the next page load — no redeploy.

### 1.7 How content is stored
One table, `cms_content`: a row per item with `collection`, `key`, `seq`
(order) and `data` (JSON matching the models in `src/models/*`). The site
fetches every collection in a single request (`GET /api/cms`).
- `media` and `localizations` rows override the built-in defaults **per key**.
- Every other collection (`projects`, `activities`, `partners`, …)
  **replaces** its defaults entirely once it has any rows.
- Images uploaded in the admin go to the R2 bucket and are served from
  `https://icm-api.<account>.workers.dev/img/<folder>/<file>`.

Direct database access (rarely needed):
```powershell
cd "D:\Desktop\Infinity Cool Master\Website\worker"
npx wrangler d1 execute icm-cms --remote --command "SELECT collection, key FROM cms_content"
```

### 1.8 Leads
Every submission of the audit-request form lands in the `leads` table and the
admin's **Leads** tab (status: new → contacted → qualified → won/lost). Check
the tab on working days. To get an email or LINE alert instead, hook it into
`postLead` in `worker/src/index.ts` — the single place leads are created.
Spam protection: a hidden honeypot field, field-length limits, and a cap of
100 submissions per hour.

### 1.9 Cost and limits
Workers, D1 and R2 free allowances are far above what a small informational
site uses, and — unlike many free database hosts — nothing is paused for
inactivity, so there is nothing to keep alive.

---

## Part 2 — GitHub Pages

### 2.1 Create the repository
On <https://github.com/new>: create e.g. `infinity-coolmaster` (public or
private — Pages works on private repos only with GitHub Pro/Team).

### 2.2 Set the base path
In [`vite.config.ts`](vite.config.ts), `base` depends on where the site lives:
```ts
base: '/',                       // custom domain (current setup: infinitycoolmaster.com)
// base: '/infinity-coolmaster/', // plain https://<you>.github.io/<repo>/ address
```

### 2.3 Push the source code
```powershell
cd "D:\Desktop\Infinity Cool Master\Website"
git init
git add .
git commit -m "Infinity CoolMaster CaaS website"
git branch -M main
git remote add origin https://github.com/<your-username>/infinity-coolmaster.git
git push -u origin main
```
(`.env.local` and `worker/.dev.vars` are gitignored, so nothing secret is pushed.)

### 2.4 Deploy
```powershell
npm run deploy
```
This runs the production build (with your `.env.local` baked in) and pushes
`dist/` to a `gh-pages` branch.

### 2.5 Enable Pages
GitHub repo → **Settings → Pages** → Source: **Deploy from a branch** →
Branch: **gh-pages**, folder **/ (root)** → Save. After ~1–2 minutes the site
is live. Deep links like `/#/en/project/1` survive refresh — that is why the
app uses HashRouter.

### 2.6 Every future update
```powershell
git add . ; git commit -m "describe change" ; git push   # source history
npm run deploy                                           # publish to Pages
```
Changes to the API (`worker/`) are published separately with
`npm --prefix worker run deploy`.

### 2.7 Custom domain via GoDaddy

**Prerequisite:** the site works at `https://<you>.github.io/<repo>/`.

**Step 1 — Set the custom domain on GitHub (do this BEFORE touching DNS).**
Repo → **Settings → Pages → Custom domain** → enter your apex domain, e.g.
`infinitycoolmaster.com` → **Save**. It will show a DNS warning until Step 2
propagates — that is expected.

**Step 2 — Add DNS records in GoDaddy.**
GoDaddy → sign in → **My Products** → next to the domain click **DNS**
(or **Manage DNS**) → **DNS Records**:

1. **Delete** the default parked record: type `A`, name `@`, value `Parked`
   (and any other `A @` records).
2. **Add four A records** (type `A`, name `@`, TTL default):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. **Edit or add the CNAME** for `www`: type `CNAME`, name `www`, value
   `<your-username>.github.io`. GitHub will then redirect `www.…` → apex.
4. Do **not** use GoDaddy's "Forwarding" feature.

**Step 3 — Wait for propagation, then verify.**
Usually under an hour (worst case 48 h):
```powershell
Resolve-DnsName infinitycoolmaster.com -Type A      # → the four 185.199.x.153 IPs
Resolve-DnsName www.infinitycoolmaster.com -Type CNAME  # → <you>.github.io
```
Back in **Settings → Pages**, the DNS check should turn green.

**Step 4 — Two code edits for root-path hosting.**
1. `vite.config.ts`: `base: '/'`.
2. `package.json`: `"deploy": "gh-pages -d dist --cname infinitycoolmaster.com"`
   — this writes a `CNAME` file into every deploy; without it the custom
   domain is wiped on the next `npm run deploy`.

**Step 5 — Enforce HTTPS** once the certificate is issued (minutes up to ~24 h).

**Step 6 — Test.** Visit `https://infinitycoolmaster.com`,
`https://www.infinitycoolmaster.com` (redirects), and refresh a deep link.

> If the site's address ever changes, add the new address to `ALLOWED_ORIGINS`
> in `worker/wrangler.jsonc` and redeploy the Worker — the API only answers
> browsers coming from the origins listed there.

---

## Pre-launch checklist
- [ ] Real company facts replace placeholders (established year, capital,
      address, phone, email) — Site Text and Contact Channels in the admin.
- [ ] Real case-study clients/numbers (get client consent for names/logos).
- [ ] Real photos uploaded via the admin.
- [ ] Lead form tested end-to-end on the live URL.
- [ ] Someone checks the admin's Leads tab on working days.
- [ ] PDPA privacy notice if you add analytics or expand data collection.
