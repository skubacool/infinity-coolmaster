-- =============================================================
-- Infinity CoolMaster — Supabase schema
-- Run in the Supabase SQL editor (or via supabase db push).
-- =============================================================

-- -------------------------------------------------------------
-- 1) Lead ingestion: one row per audit-request form submission
-- -------------------------------------------------------------
create table if not exists public.leads (
  id            bigint generated always as identity primary key,
  company_name  text not null,
  contact_person text not null,
  email         text not null,
  phone         text not null,
  current_bill  text not null,
  industry      text not null,
  status        text not null default 'new', -- new | contacted | qualified | won | lost
  created_at    timestamptz not null default now()
);

alter table public.leads enable row level security;

-- The public site may INSERT leads but never read them back.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads for insert
  to anon
  with check (true);

-- -------------------------------------------------------------
-- 2) CMS content: one row per entity, grouped by collection
--    Collections used by the site:
--    localizations | media | benefits | hero_banners | sectors |
--    projects | activities | partners | contacts
-- -------------------------------------------------------------
create table if not exists public.cms_content (
  id          bigint generated always as identity primary key,
  collection  text not null,
  key         text,            -- optional stable key within the collection
  seq         int  not null default 0,
  data        jsonb not null,  -- the serialized entity (matches src/models/*)
  updated_at  timestamptz not null default now()
);

create index if not exists cms_content_collection_idx
  on public.cms_content (collection, seq);

alter table public.cms_content enable row level security;

-- The public site reads CMS content; writes happen via the dashboard/service role.
drop policy if exists "anon can read cms content" on public.cms_content;
create policy "anon can read cms content"
  on public.cms_content for select
  to anon
  using (true);
