# Deployment Guide — Infinity CoolMaster Website

Two independent parts: **Supabase** (backend: leads + CMS) and **GitHub Pages**
(static hosting). Do Supabase first so the production build embeds the keys.

---

## Part 1 — Supabase

### 1.1 Create the project
1. Go to <https://supabase.com> → sign in → **New project**.
2. Pick your organization, name it `infinity-coolmaster`, set a strong
   database password (store it in your password manager), and choose region
   **Southeast Asia (Singapore)** for lowest latency from Thailand.
3. Wait ~2 minutes for provisioning.

### 1.2 Create the tables
1. In the dashboard, open **SQL Editor** → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql)
   and click **Run**.
3. Verify under **Table Editor**: you should see `leads` and `cms_content`,
   both with RLS enabled (shield icon). The policies allow the public site to
   *insert* leads (never read them) and *read* CMS content (never write it).

### 1.3 Get the API credentials
1. **Project Settings → API** (or **API Keys**).
2. Copy two values:
   - **Project URL** — `https://<project-ref>.supabase.co`
   - **anon / publishable key** — safe to ship in the browser; RLS is the guard.
   - ⚠️ Never use the `service_role` key anywhere in this project.

### 1.4 Configure the site
```powershell
cd "D:\Desktop\Infinity Cool Master\Website"
Copy-Item .env.example .env.local
# then edit .env.local:
#   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
#   VITE_SUPABASE_ANON_KEY=<anon key>
```
`.env.local` is gitignored. **It must exist on the machine where you run
`npm run build` / `npm run deploy`** — Vite bakes the values into the bundle
at build time. Without it the site still renders, but the lead form shows its
error state.

### 1.5 Test the lead pipeline
```powershell
npm run dev
```
Open the site → fill the **Request Your Free Audit** form → submit → you
should see the green success card. In Supabase **Table Editor → leads**, a new
row appears with `status = 'new'`.

### 1.6 Get notified of new leads (recommended)
A lead form nobody watches is a black hole. Easiest options:
- **Database Webhooks** (Dashboard → Database → Webhooks): fire on INSERT into
  `leads` → point it at a Make/Zapier/n8n webhook that emails or LINE-notifies
  your sales inbox.
- Or simply check the Table Editor daily until volume justifies automation.

### 1.7 Override content via CMS (optional, anytime)
**Ready-made, copy-paste examples — banners, projects, articles, partner
logos, text — live in [`supabase/seed-examples.sql`](supabase/seed-examples.sql),
including the Storage-bucket setup for hosting your images.**

Merge rules: `media` and `localizations` rows override per key (defaults fill
the gaps); all other collections (`projects`, `activities`, `partners`, …)
**replace** the defaults entirely once the collection has any rows — insert
the complete list you want shown.

Insert rows into `cms_content` to replace any default content without code:

| column | value |
| --- | --- |
| `collection` | `localizations`, `media`, `benefits`, `hero_banners`, `sectors`, `projects`, `activities`, `partners`, `contacts` |
| `key` | optional stable key (e.g. the localization key) |
| `seq` | sort order within the collection |
| `data` | JSON matching the TypeScript model in `src/models/*` |

Example — replace the hero headline (EN/TH):
```sql
insert into cms_content (collection, key, seq, data) values (
  'localizations', 'front.cta', 1,
  '{"key":"front.cta","text":{"en":"Your new headline","th":"พาดหัวใหม่ของคุณ"}}'
);
```
For images (case-study photos, banners): upload to Supabase **Storage** (make
the bucket public), copy the public URL, and use it in the `data` JSON.

> Free-tier note: Supabase pauses free projects after ~1 week of inactivity,
> which breaks the form until you unpause. For a production lead pipeline,
> use the Pro plan or schedule a periodic ping.

### 1.8 Browser admin for non-IT staff (recommended)
The site ships with a hidden content manager at **`https://<site>/#/admin`** —
staff log in with email + password and edit everything through forms:
site text (EN/TH), banners (with direct image upload), case studies,
articles, partners, benefits, services, sectors, contact channels, plus a
**Leads inbox** with status tracking.

Setup (once):
1. **SQL Editor** → run [`supabase/admin-setup.sql`](supabase/admin-setup.sql)
   (admin policies, unique CMS key index, `site-images` storage bucket).
2. **Authentication → Sign In / Up** → **disable “Allow new users to sign
   up”**. ⚠️ Required — otherwise strangers could register and edit the site.
3. **Authentication → Users → Add user** → admin email + strong password,
   tick **Auto Confirm User**. Repeat per staff member.
4. Open `/#/admin`, sign in, and edit. Changes are live on the next page
   load — no redeploy.

Editing rules inside the admin:
- **Site Text / Banners & Images**: per-item override with a “customized”
  badge and a *Reset to default* button.
- **List tabs (Case Studies, Articles, …)**: the first visit shows the
  built-in defaults with an **“Enable editing (copy defaults)”** button —
  click it once, then add/edit/delete freely.
- The SQL route ([`seed-examples.sql`](supabase/seed-examples.sql)) remains
  available for bulk operations; both write to the same `cms_content` table.

---

## Part 2 — GitHub Pages

### 2.1 Create the repository
On <https://github.com/new>: create e.g. `infinity-coolmaster` (public or
private — Pages works on private repos only with GitHub Pro/Team).

### 2.2 Set the base path
In [`vite.config.ts`](vite.config.ts), `base` **must exactly match the repo
name** with both slashes:
```ts
base: '/infinity-coolmaster/',   // repo: github.com/<you>/infinity-coolmaster
```
- Custom domain or `<you>.github.io` repo → use `base: '/'`.

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
(`.env.local` is gitignored, so your keys are never pushed.)

### 2.4 Deploy
```powershell
npm run deploy
```
This runs the production build (with your `.env.local` baked in) and pushes
`dist/` to a `gh-pages` branch.

### 2.5 Enable Pages
GitHub repo → **Settings → Pages** → Source: **Deploy from a branch** →
Branch: **gh-pages**, folder **/ (root)** → Save. After ~1–2 minutes the site
is live at:
```
https://<your-username>.github.io/infinity-coolmaster/
```
Deep links like `/#/en/project/1` survive refresh — that is why the app uses
HashRouter.

### 2.6 Every future update
```powershell
git add . ; git commit -m "describe change" ; git push   # source history
npm run deploy                                           # publish to Pages
```

### 2.7 Custom domain via GoDaddy (when ready)

**Prerequisite:** finish 2.1–2.5 first and confirm the site works at
`https://<you>.github.io/<repo>/`. Only then add the domain.

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
   `<your-username>.github.io` (GoDaddy often has a default `www → @` CNAME —
   change its value). GitHub will then redirect `www.…` → apex automatically.
4. Do **not** use GoDaddy's "Forwarding" feature — the DNS records above
   handle everything.

**Step 3 — Wait for propagation, then verify.**
Usually under an hour (worst case 48 h). Check from PowerShell:
```powershell
Resolve-DnsName infinitycoolmaster.com -Type A      # → the four 185.199.x.153 IPs
Resolve-DnsName www.infinitycoolmaster.com -Type CNAME  # → <you>.github.io
```
Back in **Settings → Pages**, the DNS check next to the custom domain should
turn green.

**Step 4 — Update the code for root-path hosting (two edits).**
1. `vite.config.ts`: `base: '/'` (the repo-name base no longer applies).
2. `package.json`: `"deploy": "gh-pages -d dist --cname infinitycoolmaster.com"`
   — this writes a `CNAME` file into every deploy. Without it, the custom
   domain setting is wiped on the next `npm run deploy`.

Then redeploy: `npm run deploy`.

**Step 5 — Enforce HTTPS.**
**Settings → Pages**: once the certificate is issued (minutes up to ~24 h),
tick **Enforce HTTPS**.

**Step 6 — Test.** Visit `https://infinitycoolmaster.com`,
`https://www.infinitycoolmaster.com` (should redirect), and refresh a deep
link like `…/#/en/project/1`.

**Optional hardening:** GitHub account **Settings → Pages → Add a verified
domain** — add a TXT record GoDaddy-side to prevent domain takeover if you
ever remove the Pages site.

---

## Pre-launch checklist
- [ ] Real company facts replace placeholders (established year, capital,
      address, phone, email) — `src/apis/localization/defaults.ts` and
      `src/apis/contact/defaults.ts`, or via `cms_content`.
- [ ] Real case-study clients/numbers (get client consent for names/logos).
- [ ] Real photos uploaded (Supabase Storage or `public/assets/`).
- [ ] Lead form tested end-to-end on the live URL.
- [ ] Lead notification (1.6) wired to a mailbox someone reads.
- [ ] PDPA privacy notice if you add analytics or expand data collection.
