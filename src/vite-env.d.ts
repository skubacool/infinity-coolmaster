/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origin of the Cloudflare Worker API, e.g. https://icm-api.<account>.workers.dev */
  readonly VITE_API_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
