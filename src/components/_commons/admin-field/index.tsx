import { ChangeEvent, useRef, useState } from 'react';

import { CmsField } from '../../../config/cms-schema';
import { uploadImage } from '../../../apis/admin';
import { LocalizedText } from '../../../models/_commons/localized';
import Icon, { iconNames } from '../icon';

const inputClass =
  'w-full rounded-lg border border-sep-light bg-white px-3 py-2 text-sm text-text-main placeholder:text-title-pale focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue';

const labelClass = 'text-xs font-semibold text-text-muted uppercase tracking-wider';

// ------------------------------------------------------------------------
// Image input: URL box + preview + "Upload" button (Supabase Storage)
// ------------------------------------------------------------------------
export interface ImageInputProps {
  value: string;
  folder: string;
  onChange: (url: string) => void;
}

export const ImageInput = (props: ImageInputProps) => {
  const { value, folder, onChange } = props;
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="gap-y-2 flex flex-col justify-start items-stretch">
      <div className="gap-x-3 flex flex-row justify-start items-center">
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="w-20 h-14 object-cover rounded-lg border border-sep-light bg-pale flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-14 rounded-lg border border-dashed border-sep-smoke bg-pale flex-shrink-0 flex items-center justify-center text-2xs text-title-pale">
            no image
          </div>
        )}
        <div className="flex-1 gap-y-1.5 flex flex-col">
          <input
            className={inputClass}
            type="text"
            placeholder="Image URL (or click Upload)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="gap-x-2 flex flex-row items-center">
            <button
              type="button"
              className="rounded-lg bg-navy text-white text-xs font-semibold px-3 py-1.5 disabled:opacity-50"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
            >
              {busy ? 'Uploading…' : 'Upload image'}
            </button>
            {value && (
              <button
                type="button"
                className="text-xs text-title-light underline"
                onClick={() => onChange('')}
              >
                clear
              </button>
            )}
          </div>
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
    </div>
  );
};

// ------------------------------------------------------------------------
// Generic field renderer driven by the CMS schema
// ------------------------------------------------------------------------
export interface AdminFieldProps {
  field: CmsField;
  value: unknown;
  imageFolder: string;
  onChange: (value: unknown) => void;
}

const asLocalized = (value: unknown): LocalizedText => {
  const v = (value ?? {}) as Partial<LocalizedText>;
  return { en: v.en ?? '', th: v.th ?? '' };
};

const AdminField = (props: AdminFieldProps) => {
  const { field, value, imageFolder, onChange } = props;

  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            className={inputClass}
            type="text"
            value={String(value ?? '')}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'number':
        return (
          <input
            className={inputClass}
            type="number"
            value={value === null || value === undefined ? '' : String(value)}
            onChange={(e) =>
              onChange(e.target.value === '' ? null : Number(e.target.value))
            }
          />
        );

      case 'date':
        return (
          <input
            className={inputClass}
            type="date"
            value={String(value ?? '')}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'select':
        return (
          <select
            className={inputClass}
            value={String(value ?? '')}
            onChange={(e) => onChange(e.target.value)}
          >
            {(field.options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'icon': {
        const current = String(value ?? '');
        return (
          <div className="gap-x-3 flex flex-row items-center">
            <span className="w-10 h-10 rounded-lg bg-gradient-caas-soft border border-sep-pale flex items-center justify-center text-brand-blue flex-shrink-0">
              <Icon name={current} size={22} />
            </span>
            <select
              className={inputClass}
              value={current}
              onChange={(e) => onChange(e.target.value)}
            >
              {iconNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        );
      }

      case 'preset': {
        const presets = field.presets ?? [];
        const currentJson = JSON.stringify(value ?? null);
        const matched = presets.findIndex(
          (p) => JSON.stringify(p.value ?? null) === currentJson
        );
        return (
          <select
            className={inputClass}
            value={matched >= 0 ? String(matched) : '-1'}
            onChange={(e) => {
              const index = Number(e.target.value);
              if (index >= 0) onChange(presets[index].value ?? null);
            }}
          >
            {matched < 0 && (
              <option value="-1" disabled>
                (current custom value)
              </option>
            )}
            {presets.map((preset, index) => (
              <option key={preset.label} value={String(index)}>
                {preset.label}
              </option>
            ))}
          </select>
        );
      }

      case 'localized':
      case 'localized-multiline': {
        const localized = asLocalized(value);
        const multiline = field.type === 'localized-multiline';
        const set = (lang: 'en' | 'th') => (text: string) =>
          onChange({ ...localized, [lang]: text });
        return (
          <div className="gap-3 grid grid-cols-1 lg:grid-cols-2">
            {(['en', 'th'] as const).map((lang) => (
              <div key={lang} className="gap-y-1 flex flex-col">
                <span className="text-2xs font-semibold text-title-pale uppercase">
                  {lang === 'en' ? 'English' : 'ภาษาไทย'}
                </span>
                {multiline ? (
                  <textarea
                    className={`${inputClass} min-h-[90px]`}
                    value={localized[lang]}
                    onChange={(e) => set(lang)(e.target.value)}
                  />
                ) : (
                  <input
                    className={inputClass}
                    type="text"
                    value={localized[lang]}
                    onChange={(e) => set(lang)(e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'image':
        return (
          <ImageInput
            value={String(value ?? '')}
            folder={imageFolder}
            onChange={onChange}
          />
        );

      case 'photos': {
        const photos = Array.isArray(value) ? (value as string[]) : [];
        return (
          <div className="gap-y-3 flex flex-col justify-start items-stretch">
            {photos.map((photo, index) => (
              <div key={index} className="gap-x-2 flex flex-row items-start">
                <div className="flex-1">
                  <ImageInput
                    value={photo}
                    folder={imageFolder}
                    onChange={(url) => {
                      const next = [...photos];
                      next[index] = url;
                      onChange(next);
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="mt-1 text-xs text-red-500 underline flex-shrink-0"
                  onClick={() => onChange(photos.filter((_, i) => i !== index))}
                >
                  remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="self-start rounded-lg border border-sep-light text-xs font-semibold text-text-muted px-3 py-1.5 hover:border-brand-blue hover:text-brand-blue"
              onClick={() => onChange([...photos, ''])}
            >
              + Add photo
            </button>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <label className="gap-y-1.5 flex flex-col justify-start items-stretch">
      <span className={labelClass}>{field.label}</span>
      {renderInput()}
      {field.help && (
        <span className="text-xs text-title-pale">{field.help}</span>
      )}
    </label>
  );
};

export default AdminField;
