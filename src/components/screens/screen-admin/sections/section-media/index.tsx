import { useCallback, useEffect, useState } from 'react';

import { mediaSlots } from '../../../../../config/cms-schema';
import {
  deleteRow,
  listRows,
  upsertRow,
} from '../../../../../apis/admin';
import defaultMedia from '../../../../../apis/media/defaults';
import { ImageInput } from '../../../../_commons/admin-field';
import Loading from '../../../../_commons/loading';

interface SlotState {
  draft: string;
  saved: string | null; // override URL currently in the CMS (null = default)
}

/** Banners & Images tab — per-slot image override with upload. */
const SectionMedia = () => {
  const [slots, setSlots] = useState<Record<string, SlotState> | null>(null);
  const [busyKey, setBusyKey] = useState('');
  const [message, setMessage] = useState('');

  const defaultUrl = useCallback((key: string): string => {
    return defaultMedia.find((m) => m.key === key)?.url ?? '';
  }, []);

  const load = useCallback(async () => {
    setSlots(null);
    try {
      const rows = await listRows('media');
      const next: Record<string, SlotState> = {};
      for (const slot of mediaSlots) {
        const row = rows.find((r) => r.key === slot.key);
        const url = row ? String((row.data as { url?: string }).url ?? '') : null;
        next[slot.key] = { draft: url ?? defaultUrl(slot.key), saved: url };
      }
      setSlots(next);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to load');
      setSlots({});
    }
  }, [defaultUrl]);

  useEffect(() => {
    load();
  }, [load]);

  const onSave = useCallback(
    async (key: string) => {
      if (!slots) return;
      setBusyKey(key);
      setMessage('');
      try {
        const index = mediaSlots.findIndex((s) => s.key === key);
        await upsertRow({
          collection: 'media',
          key,
          seq: index + 1,
          data: { id: 100 + index, key, type: 'image', url: slots[key].draft },
        });
        setMessage('Saved. The website shows the new image on next page load.');
        await load();
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Save failed');
      } finally {
        setBusyKey('');
      }
    },
    [slots, load]
  );

  const onReset = useCallback(
    async (key: string) => {
      setBusyKey(key);
      setMessage('');
      try {
        await deleteRow('media', key);
        setMessage('Reset to the built-in default.');
        await load();
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Reset failed');
      } finally {
        setBusyKey('');
      }
    },
    [load]
  );

  if (!slots) return <Loading />;
  return (
    <div className="gap-y-6 flex flex-col justify-start items-stretch">
      <p className="text-sm text-text-muted">
        Upload a new image (or paste a URL) for each slot, then press Save.
        Changes appear on the website immediately — no redeploy needed.
      </p>
      {message && (
        <p className="text-sm font-medium text-brand-green">{message}</p>
      )}
      {mediaSlots.map((slot) => {
        const state = slots[slot.key];
        if (!state) return null;
        const overridden = state.saved !== null;
        const dirty = state.draft !== (state.saved ?? defaultUrl(slot.key));
        return (
          <div
            key={slot.key}
            className="card-premium p-5 gap-y-3 flex flex-col justify-start items-stretch"
          >
            <div className="gap-x-3 flex flex-row items-center">
              <h3 className="text-base font-semibold text-text-main">
                {slot.label}
              </h3>
              <span
                className={`text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  overridden
                    ? 'bg-brand-green-soft text-brand-green'
                    : 'bg-pale text-title-pale'
                }`}
              >
                {overridden ? 'customized' : 'default'}
              </span>
            </div>
            <p className="text-xs text-title-pale">{slot.help}</p>
            <ImageInput
              value={state.draft}
              folder="banners"
              onChange={(url) =>
                setSlots((prev) =>
                  prev ? { ...prev, [slot.key]: { ...prev[slot.key], draft: url } } : prev
                )
              }
            />
            <div className="gap-x-3 flex flex-row items-center">
              <button
                type="button"
                className="btn-caas !py-2 !px-5 !text-sm disabled:opacity-50"
                disabled={busyKey === slot.key || !dirty}
                onClick={() => onSave(slot.key)}
              >
                {busyKey === slot.key ? 'Saving…' : 'Save'}
              </button>
              {overridden && (
                <button
                  type="button"
                  className="text-sm text-title-light underline"
                  disabled={busyKey === slot.key}
                  onClick={() => onReset(slot.key)}
                >
                  Reset to default
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionMedia;
