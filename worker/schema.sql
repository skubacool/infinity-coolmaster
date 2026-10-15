-- Infinity CoolMaster API — D1 schema.
-- Apply locally:  npm run db:local     Apply to production:  npm run db:remote
-- Safe to re-run: every statement is IF NOT EXISTS.

-- One row per editable entity, grouped by collection (see src/config/cms-schema.ts).
CREATE TABLE IF NOT EXISTS cms_content (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  collection TEXT    NOT NULL,
  "key"      TEXT    NOT NULL,
  seq        INTEGER NOT NULL DEFAULT 0,
  data       TEXT    NOT NULL, -- JSON matching the models in src/models/*
  updated_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (collection, "key")
);
CREATE INDEX IF NOT EXISTS cms_content_collection_seq
  ON cms_content (collection, seq);

-- Audit-request form submissions from the public site.
CREATE TABLE IF NOT EXISTS leads (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name   TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL DEFAULT '',
  current_bill   TEXT NOT NULL DEFAULT '',
  industry       TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'new', -- new | contacted | qualified | won | lost
  created_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS leads_created_at ON leads (created_at);

-- Failed admin logins, used to throttle password guessing.
CREATE TABLE IF NOT EXISTS login_failures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT    NOT NULL,
  at INTEGER NOT NULL -- epoch milliseconds
);
CREATE INDEX IF NOT EXISTS login_failures_at ON login_failures (at);
