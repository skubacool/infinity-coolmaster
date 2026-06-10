-- =====================================================================
-- Infinity CoolMaster — content management examples (cms_content)
-- Copy, edit, and run blocks in the Supabase SQL Editor as needed.
--
-- HOW THE SITE READS THIS TABLE
--   media / localizations : MERGED  — your rows override matching keys,
--                                     defaults fill everything else.
--   projects / activities /
--   partners / benefits /
--   hero_banners / sectors /
--   contacts               : REPLACED — if the collection has ANY rows,
--                                     the site shows ONLY those rows.
--                                     Insert the complete list you want.
--
-- IMAGES
--   1) Dashboard -> Storage -> New bucket -> name: site-images -> Public.
--   2) Upload files (drag & drop, folders allowed).
--   3) Click a file -> Copy URL. Public URLs look like:
--      https://<project-ref>.supabase.co/storage/v1/object/public/site-images/<path>
--   Recommended sizes (match current layout aspect ratios):
--      project thumbnail  ~ 800 x 550   (aspect 1.45)
--      page/section banner ~ 1600 x 700
--      gallery photo      ~ 1040 x 720  (aspect 1.45)
-- =====================================================================


-- ---------------------------------------------------------------------
-- A) SWAP A BANNER OR FIGURE (collection: media — per-key override)
--    Keys used by the site:
--      about.banner-main        (About page hero banner)
--      project-list.banner-main (Case Studies page hero banner)
--      front.figure-impact      (impact section figure, currently unused art)
--      general.logo-official / general.logo-mark (brand, normally leave as-is)
-- ---------------------------------------------------------------------
insert into cms_content (collection, key, seq, data) values
(
  'media', 'about.banner-main', 1,
  '{
    "id": 101,
    "key": "about.banner-main",
    "type": "image",
    "url": "https://<project-ref>.supabase.co/storage/v1/object/public/site-images/banners/about-hero.jpg"
  }'
);

-- To change it later, UPDATE instead of inserting a duplicate key:
-- update cms_content
--   set data = jsonb_set(data, '{url}', '"https://...new-url..."'), updated_at = now()
--   where collection = 'media' and key = 'about.banner-main';


-- ---------------------------------------------------------------------
-- B) ADD / MANAGE CASE STUDIES (collection: projects — REPLACES defaults)
--    data JSON must match src/models/project. Fields:
--      id (unique number)   thumbnail, banner (image URLs)
--      title/excerpt/details/client/location ({"en":..,"th":..})
--      sector: commercial|industrial|healthcare|hospitality|retail|data-center
--      capacityTr (number)  savingsPct (number)  completion (year)
--      energySavedKwh, co2AvoidedTons (number or null)
--      photos (array of URLs)  nextProjectId (id of next case study or null)
--    Tip: chain nextProjectId in a loop (1->2->...->1) like below.
-- ---------------------------------------------------------------------
insert into cms_content (collection, key, seq, data) values
(
  'projects', 'project-1', 1,
  '{
    "id": 1,
    "thumbnail": "https://<project-ref>.supabase.co/storage/v1/object/public/site-images/projects/tower-thumb.jpg",
    "banner":    "https://<project-ref>.supabase.co/storage/v1/object/public/site-images/projects/tower-banner.jpg",
    "title":   {"en": "Grade-A Office Tower, Sathorn", "th": "อาคารสำนักงานเกรดเอ ย่านสาทร"},
    "excerpt": {"en": "28% verified savings from day one with zero capital outlay.", "th": "ประหยัด 28% ตั้งแต่วันแรก โดยไม่ใช้เงินลงทุน"},
    "details": {"en": "Full case study text here. Use \\n\\n for paragraphs.", "th": "รายละเอียดกรณีศึกษา ใช้ \\n\\n เพื่อขึ้นย่อหน้าใหม่"},
    "client":   {"en": "Client name or Confidential", "th": "ชื่อลูกค้า"},
    "location": {"en": "Sathorn, Bangkok", "th": "สาทร กรุงเทพฯ"},
    "sector": "commercial",
    "capacityTr": 2400,
    "savingsPct": 28,
    "completion": 2025,
    "energySavedKwh": 3800000,
    "co2AvoidedTons": 1900,
    "photos": [
      "https://<project-ref>.supabase.co/storage/v1/object/public/site-images/projects/tower-1.jpg",
      "https://<project-ref>.supabase.co/storage/v1/object/public/site-images/projects/tower-2.jpg"
    ],
    "nextProjectId": 2
  }'
),
(
  'projects', 'project-2', 2,
  '{
    "id": 2,
    "thumbnail": "https://<project-ref>.supabase.co/storage/v1/object/public/site-images/projects/hospital-thumb.jpg",
    "banner":    "https://<project-ref>.supabase.co/storage/v1/object/public/site-images/projects/hospital-banner.jpg",
    "title":   {"en": "Regional Hospital, Chonburi", "th": "โรงพยาบาลประจำภูมิภาค ชลบุรี"},
    "excerpt": {"en": "99.95% uptime and 22% verified savings.", "th": "ความพร้อม 99.95% และประหยัด 22%"},
    "details": {"en": "Full case study text here.", "th": "รายละเอียดกรณีศึกษา"},
    "client":   {"en": "Leading Hospital Group", "th": "เครือโรงพยาบาลชั้นนำ"},
    "location": {"en": "Chonburi", "th": "ชลบุรี"},
    "sector": "healthcare",
    "capacityTr": 1800,
    "savingsPct": 22,
    "completion": 2024,
    "energySavedKwh": 2600000,
    "co2AvoidedTons": 1300,
    "photos": [],
    "nextProjectId": 1
  }'
);

-- Portfolio stats (facilities count, total TR, GWh, avg savings) are computed
-- automatically from the project rows — no separate table to maintain.


-- ---------------------------------------------------------------------
-- C) ADD AN INSIGHT / NEWS ARTICLE (collection: activities — REPLACES)
--    data JSON must match src/models/activity.
-- ---------------------------------------------------------------------
-- insert into cms_content (collection, key, seq, data) values
-- (
--   'activities', 'activity-1', 1,
--   '{
--     "id": 1,
--     "thumbnail": "https://.../site-images/insights/article-thumb.jpg",
--     "banner":    "https://.../site-images/insights/article-banner.jpg",
--     "tag":  {"id": 1, "color": "#10B981", "title": {"en": "CaaS", "th": "CaaS"}},
--     "type": {"id": 1, "color": "#10B981", "title": {"en": "Guide", "th": "คู่มือ"}},
--     "title":   {"en": "Article title", "th": "ชื่อบทความ"},
--     "excerpt": {"en": "One-line teaser.", "th": "คำโปรยสั้น ๆ"},
--     "details": {"en": "Body text. \\n\\n for paragraphs.", "th": "เนื้อหา"},
--     "publishedAt": "2026-06-15",
--     "nextActivityId": null
--   }'
-- );


-- ---------------------------------------------------------------------
-- D) REAL PARTNER / CLIENT LOGOS (collection: partners — REPLACES)
--    type: "vendor" (technology partners strip) or "client" (clients strip)
-- ---------------------------------------------------------------------
-- insert into cms_content (collection, key, seq, data) values
-- (
--   'partners', 'partner-1', 1,
--   '{
--     "id": 1,
--     "logo": "https://.../site-images/partners/partner-logo.png",
--     "name": {"en": "Partner Name", "th": "ชื่อพันธมิตร"},
--     "type": "vendor",
--     "seq": 1
--   }'
-- );


-- ---------------------------------------------------------------------
-- E) CHANGE ANY TEXT ON THE SITE (collection: localizations — per-key)
--    All keys live in src/apis/localization/defaults.ts
-- ---------------------------------------------------------------------
-- insert into cms_content (collection, key, seq, data) values
-- (
--   'localizations', 'contact.tel', 1,
--   '{"key": "contact.tel", "text": {"en": "+66 (0)2 123 4567", "th": "02-123-4567"}}'
-- );


-- ---------------------------------------------------------------------
-- Inspect what the site will read:
-- select collection, key, seq, data->>'id' as id, updated_at
--   from cms_content order by collection, seq;
-- =====================================================================
