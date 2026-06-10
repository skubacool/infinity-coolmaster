-- =====================================================================
-- Infinity CoolMaster — Admin CMS setup
-- Run this ONCE in the Supabase SQL Editor, AFTER schema.sql.
--
-- It enables the browser-based content manager at  https://<site>/#/admin
--   1) unique (collection, key) index so the admin can save by key
--   2) policies: signed-in admins manage cms_content and read/update leads
--   3) public storage bucket "site-images" + upload policies
--
-- ⚠️ AFTER RUNNING THIS, DO THESE TWO STEPS IN THE DASHBOARD — REQUIRED:
--   A) Authentication → Sign In / Up →
--        DISABLE "Allow new users to sign up"
--      (otherwise strangers could register and edit your site)
--   B) Authentication → Users → Add user →
--        your admin email + a strong password, tick "Auto Confirm User"
--      Repeat for each staff member who should edit content.
-- =====================================================================

-- 1) Admin saves rows by (collection, key) — make that pair unique.
create unique index if not exists cms_content_collection_key_uidx
  on public.cms_content (collection, key);

-- 2) Signed-in users (your staff) get full content management rights.
drop policy if exists "authenticated manage cms content" on public.cms_content;
create policy "authenticated manage cms content"
  on public.cms_content for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated read leads" on public.leads;
create policy "authenticated read leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "authenticated update leads" on public.leads;
create policy "authenticated update leads"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

-- 3) Image hosting: public bucket the admin uploads into.
insert into storage.buckets (id, name, public)
  values ('site-images', 'site-images', true)
  on conflict (id) do nothing;

drop policy if exists "authenticated upload site-images" on storage.objects;
create policy "authenticated upload site-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images');

drop policy if exists "authenticated update site-images" on storage.objects;
create policy "authenticated update site-images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images');

drop policy if exists "authenticated delete site-images" on storage.objects;
create policy "authenticated delete site-images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images');

drop policy if exists "public read site-images" on storage.objects;
create policy "public read site-images"
  on storage.objects for select
  to public
  using (bucket_id = 'site-images');
