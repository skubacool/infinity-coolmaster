import { useCallback, useEffect, useMemo, useState } from 'react';

import { CmsListCollection } from '../../../../../config/cms-schema';
import {
  bulkUpsertRows,
  CmsRow,
  deleteRow,
  listRows,
  upsertRow,
} from '../../../../../apis/admin';
import AdminField from '../../../../_commons/admin-field';
import Loading from '../../../../_commons/loading';

export interface SectionCollectionProps {
  schema: CmsListCollection;
}

interface EditorState {
  key: string | null; // null = creating a new item
  seq: number;
  data: Record<string, unknown>;
}

/** Generic list editor (case studies, articles, partners, …). */
const SectionCollection = (props: SectionCollectionProps) => {
  const { schema } = props;

  const [rows, setRows] = useState<CmsRow[] | null>(null);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setRows(null);
    setEditor(null);
    try {
      setRows(await listRows(schema.collection));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to load');
      setRows([]);
    }
  }, [schema.collection]);

  useEffect(() => {
    load();
  }, [load]);

  const nextId = useMemo(() => {
    if (!rows) return 1;
    const ids = rows.map((row) => Number((row.data as { id?: number }).id ?? 0));
    return (ids.length ? Math.max(...ids) : 0) + 1;
  }, [rows]);

  // ---- defaults mode: collection not yet copied into the CMS ----
  const onCopyDefaults = useCallback(async () => {
    setBusy(true);
    setMessage('');
    try {
      const seeded: CmsRow[] = schema.defaults.map((data, index) => ({
        collection: schema.collection,
        key: `${schema.collection}-${String((data as { id?: number }).id ?? index + 1)}`,
        seq: index + 1,
        data,
      }));
      await bulkUpsertRows(seeded);
      setMessage('Editing enabled — the list below is now yours to change.');
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not enable editing');
    } finally {
      setBusy(false);
    }
  }, [schema, load]);

  // ---- create / edit / delete ----
  const onAdd = useCallback(() => {
    const data: Record<string, unknown> = { id: nextId };
    for (const field of schema.fields) {
      switch (field.type) {
        case 'localized':
        case 'localized-multiline':
          data[field.name] = { en: '', th: '' };
          break;
        case 'number':
          data[field.name] = null;
          break;
        case 'photos':
          data[field.name] = [];
          break;
        case 'select':
          data[field.name] = field.options?.[0] ?? '';
          break;
        case 'icon':
          data[field.name] = 'snowflake';
          break;
        case 'preset':
          data[field.name] = field.presets?.[0]?.value ?? null;
          break;
        default:
          data[field.name] = '';
      }
    }
    setEditor({ key: null, seq: (rows?.length ?? 0) + 1, data });
  }, [schema, rows, nextId]);

  const onEdit = useCallback((row: CmsRow) => {
    setEditor({ key: row.key, seq: row.seq, data: { ...row.data } });
  }, []);

  const onDelete = useCallback(
    async (row: CmsRow) => {
      const name = schema.summary(row.data);
      if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
      setBusy(true);
      setMessage('');
      try {
        await deleteRow(schema.collection, row.key);
        setMessage(`Deleted "${name}".`);
        await load();
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Delete failed');
      } finally {
        setBusy(false);
      }
    },
    [schema, load]
  );

  const onSave = useCallback(async () => {
    if (!editor) return;
    setBusy(true);
    setMessage('');
    try {
      const data = { ...editor.data };
      const id = Number((data as { id?: number }).id ?? nextId);
      if (schema.syncSeqIntoData) data.seq = editor.seq;
      await upsertRow({
        collection: schema.collection,
        key: editor.key ?? `${schema.collection}-${id}`,
        seq: editor.seq,
        data,
      });
      setMessage('Saved. The website updates on next page load.');
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }, [editor, schema, nextId, load]);

  if (!rows) return <Loading />;

  // ---------------- defaults preview (not yet editable) ----------------
  if (rows.length === 0 && !editor) {
    return (
      <div className="gap-y-5 flex flex-col justify-start items-stretch">
        <div className="card-premium p-5 gap-y-3 flex flex-col border-l-4 border-l-brand-blue">
          <p className="text-sm text-text-main font-medium">
            This list currently shows the built-in defaults. Click below to
            copy them into the CMS — then you can edit, add and delete items.
          </p>
          <button
            type="button"
            className="btn-caas self-start !py-2.5 !px-6 !text-sm disabled:opacity-50"
            disabled={busy}
            onClick={onCopyDefaults}
          >
            {busy ? 'Copying…' : 'Enable editing (copy defaults)'}
          </button>
          {message && <p className="text-sm text-red-500">{message}</p>}
        </div>
        <ul className="gap-y-2 flex flex-col">
          {schema.defaults.map((data, index) => (
            <li
              key={index}
              className="card-premium px-5 py-3 text-sm text-text-muted"
            >
              {index + 1}. {schema.summary(data)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // ----------------------------- editor -------------------------------
  if (editor) {
    return (
      <div className="gap-y-5 flex flex-col justify-start items-stretch">
        <div className="gap-x-3 flex flex-row items-center">
          <h3 className="text-lg font-semibold text-text-main">
            {editor.key ? `Edit ${schema.itemName}` : `New ${schema.itemName}`}
          </h3>
          <span className="text-xs text-title-pale">
            #{String((editor.data as { id?: number }).id ?? '')}
          </span>
        </div>
        <div className="card-premium p-5 lg:p-6 gap-y-5 flex flex-col">
          <label className="gap-y-1.5 flex flex-col max-w-[160px]">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Display order
            </span>
            <input
              className="w-full rounded-lg border border-sep-light px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
              type="number"
              value={editor.seq}
              onChange={(e) =>
                setEditor((prev) =>
                  prev ? { ...prev, seq: Number(e.target.value) } : prev
                )
              }
            />
          </label>
          {schema.fields.map((field) => (
            <AdminField
              key={field.name}
              field={field}
              value={editor.data[field.name]}
              imageFolder={schema.imageFolder}
              onChange={(value) =>
                setEditor((prev) =>
                  prev
                    ? { ...prev, data: { ...prev.data, [field.name]: value } }
                    : prev
                )
              }
            />
          ))}
          {message && <p className="text-sm text-red-500">{message}</p>}
          <div className="gap-x-3 flex flex-row items-center">
            <button
              type="button"
              className="btn-caas !py-2.5 !px-6 !text-sm disabled:opacity-50"
              disabled={busy}
              onClick={onSave}
            >
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              className="text-sm text-title-light underline"
              disabled={busy}
              onClick={() => setEditor(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------ list --------------------------------
  return (
    <div className="gap-y-5 flex flex-col justify-start items-stretch">
      <p className="text-sm text-text-muted">{schema.description}</p>
      {message && (
        <p className="text-sm font-medium text-brand-green">{message}</p>
      )}
      <button
        type="button"
        className="btn-navy self-start !py-2.5 !px-6 !text-sm"
        onClick={onAdd}
      >
        + Add {schema.itemName}
      </button>
      <ul className="gap-y-2 flex flex-col">
        {rows.map((row) => (
          <li
            key={row.key}
            className="card-premium px-5 py-3 gap-x-4 flex flex-row items-center"
          >
            <span className="text-xs text-title-pale w-8 flex-shrink-0">
              {row.seq}
            </span>
            <span className="flex-1 text-sm text-text-main truncate">
              {schema.summary(row.data)}
            </span>
            <button
              type="button"
              className="text-sm font-semibold text-brand-blue"
              onClick={() => onEdit(row)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-sm text-red-400"
              disabled={busy}
              onClick={() => onDelete(row)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionCollection;
