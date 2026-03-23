/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_USE_MOCK?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
