import { atom, createStore, PrimitiveAtom } from 'jotai';

/**
 * Build-time pre-rendering support.
 *
 * Screen state lives in jotai atoms that are normally filled by effects after
 * the page mounts. Effects never run while pre-rendering, so atoms that hold
 * page content are created with seededAtom() and registered under a stable
 * key. The pre-render script loads each page's data, sets those atoms in a
 * fresh store, renders the page to HTML and embeds the same values in the
 * page (window.__ICM_SEED__). The browser applies them to its store before
 * hydrating, so the first client render matches the static HTML exactly.
 */

export type Seed = Record<string, unknown>;

const registry = new Map<string, PrimitiveAtom<unknown>>();

export const seededAtom = <T>(key: string, initial: T): PrimitiveAtom<T> => {
  const a = atom<T>(initial);
  registry.set(key, a as PrimitiveAtom<unknown>);
  return a;
};

export type AppStore = ReturnType<typeof createStore>;

export const applySeed = (store: AppStore, seed: Seed): void => {
  for (const [key, value] of Object.entries(seed)) {
    const target = registry.get(key);
    if (target) store.set(target, value);
  }
};

/** Shape of the data embedded in each pre-rendered page. */
export interface PageSeed {
  /** Pathname the HTML was rendered for; hydrate only when it matches. */
  path: string;
  state: Seed;
}

declare global {
  interface Window {
    __ICM_SEED__?: PageSeed;
  }
}
