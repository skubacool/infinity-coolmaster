import { useCallback, useEffect, useMemo, useState } from 'react';

import { textGroups } from '../../../../../config/cms-schema';
import { deleteRow, listRows, upsertRow } from '../../../../../apis/admin';
import defaultLocalizations from '../../../../../apis/localization/defaults';
import { LocalizedText } from '../../../../../models/_commons/localized';
import Loading from '../../../../_commons/loading';

const inputClass =
  'w-full rounded-lg border border-sep-light bg-white px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue';

interface TextItem {
  key: string;
  defaults: LocalizedText;
  override: LocalizedText | null;
  draft: LocalizedText;
}

/** Site Text tab — every heading/paragraph/label on the site, EN + TH. */
const SectionText = () => {
  const [items, setItems] = useState<TextItem[] | null>(null);
  const [search, setSearch] = useState('');
  const [busyKey, setBusyKey] = useState('');
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setItems(null);
    try {
      const rows = await listRows('localizations');
      const overrides = new Map<string, LocalizedText>();
      for (const row of rows) {
        const data = row.data as { key?: string; text?: LocalizedText };
        if (data.key && data.text) overrides.set(data.key, data.text);
      }
      setItems(
        defaultLocalizations.map((item) => {
          const override = overrides.get(item.key) ?? null;
          return {
            key: item.key,
            defaults: item.text,
            override,
            draft: { ...(override ?? item.text) },
          };
        })
      );
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to load');
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setDraft = useCallback(
    (key: string, lang: 'en' | 'th', value: string) => {
      setItems((prev) =>
        prev
          ? prev.map((item) =>
              item.key === key
                ? { ...item, draft: { ...item.draft, [lang]: value } }
                : item
            )
          : prev
      );
    },
    []
  );

  const onSave = useCallback(
    async (item: TextItem) => {
      setBusyKey(item.key);
      setMessage('');
      try {
        await upsertRow({
          collection: 'localizations',
          key: item.key,
          seq: 0,
          data: { key: item.key, text: item.draft },
        });
        setMessage(`Saved "${item.key}".`);
        await load();
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Save failed');
      } finally {
        setBusyKey('');
      }
    },
    [load]
  );

  const onReset = useCallback(
    async (item: TextItem) => {
      setBusyKey(item.key);
      setMessage('');
      try {
        await deleteRow('localizations', item.key);
        setMessage(`"${item.key}" reset to default.`);
        await load();
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Reset failed');
      } finally {
        setBusyKey('');
      }
    },
    [load]
  );

  const grouped = useMemo(() => {
    if (!items) return [];
    const query = search.trim().toLowerCase();
    const filtered = !query
      ? items
      : items.filter(
          (item) =>
            item.key.toLowerCase().includes(query) ||
            item.draft.en.toLowerCase().includes(query) ||
            item.draft.th.toLowerCase().includes(query)
        );
    return textGroups
      .map((group) => ({
        ...group,
        items: filtered.filter(
          (item) => item.key.split('.')[0] === group.prefix
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [items, search]);

  if (!items) return <Loading />;
  return (
    <div className="gap-y-5 flex flex-col justify-start items-stretch">
      <p className="text-sm text-text-muted">
        Every text on the website, in English and Thai. Edit and press Save —
        the site updates on next page load. “Reset” returns a text to the
        built-in default.
      </p>
      <input
        className={`${inputClass} max-w-[420px]`}
        type="search"
        placeholder="Search text… (e.g. headline, ประหยัด, about)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {message && (
        <p className="text-sm font-medium text-brand-green">{message}</p>
      )}
      {grouped.map((group) => (
        <details
          key={group.prefix}
          className="card-premium overflow-hidden"
          open={Boolean(search.trim())}
        >
          <summary className="cursor-pointer select-none px-5 py-4 text-base font-semibold text-text-main">
            {group.label}
            <span className="ml-2 text-xs font-normal text-title-pale">
              {group.items.length} items
            </span>
          </summary>
          <div className="px-5 pb-5 gap-y-5 flex flex-col border-t border-sep-pale pt-4">
            {group.items.map((item) => {
              const multiline =
                item.defaults.en.includes('\n') || item.defaults.en.length > 80;
              const dirty =
                item.draft.en !== (item.override ?? item.defaults).en ||
                item.draft.th !== (item.override ?? item.defaults).th;
              return (
                <div key={item.key} className="gap-y-2 flex flex-col">
                  <div className="gap-x-2 flex flex-row items-center">
                    <code className="text-2xs text-title-pale">{item.key}</code>
                    {item.override && (
                      <span className="text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green-soft text-brand-green">
                        customized
                      </span>
                    )}
                  </div>
                  <div className="gap-3 grid grid-cols-1 lg:grid-cols-2">
                    {(['en', 'th'] as const).map((lang) =>
                      multiline ? (
                        <textarea
                          key={lang}
                          className={`${inputClass} min-h-[72px]`}
                          value={item.draft[lang]}
                          onChange={(e) =>
                            setDraft(item.key, lang, e.target.value)
                          }
                        />
                      ) : (
                        <input
                          key={lang}
                          className={inputClass}
                          type="text"
                          value={item.draft[lang]}
                          onChange={(e) =>
                            setDraft(item.key, lang, e.target.value)
                          }
                        />
                      )
                    )}
                  </div>
                  <div className="gap-x-3 flex flex-row items-center">
                    <button
                      type="button"
                      className="rounded-lg bg-navy text-white text-xs font-semibold px-4 py-1.5 disabled:opacity-40"
                      disabled={!dirty || busyKey === item.key}
                      onClick={() => onSave(item)}
                    >
                      {busyKey === item.key ? 'Saving…' : 'Save'}
                    </button>
                    {item.override && (
                      <button
                        type="button"
                        className="text-xs text-title-light underline"
                        disabled={busyKey === item.key}
                        onClick={() => onReset(item)}
                      >
                        Reset to default
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );
};

export default SectionText;
