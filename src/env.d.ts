/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ENV: "development" | "production" | "staging";
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_TIENDA_URL: string;
  readonly PUBLIC_RESTOBAR_URL: string;
  readonly PUBLIC_CITAS_URL: string;
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_SUPPORT_EMAIL: string;
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_ENABLE_ANALYTICS: string;
  readonly PUBLIC_DEBUG_LOGS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
