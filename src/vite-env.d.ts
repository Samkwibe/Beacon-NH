/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_WHATSAPP_E164: string
  readonly VITE_LOCAL_ADMIN_PASSWORD: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_API_URL: string
  /** When "true", production builds expose the admin UI route (still requires Firebase/local login). */
  readonly VITE_PUBLIC_ADMIN?: string
  /** Optional single URL segment; default admin. */
  readonly VITE_ADMIN_ROUTE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
