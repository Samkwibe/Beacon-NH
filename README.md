# Beacon NH

Student-built **React + TypeScript** site that highlights **real** New Hampshire refugee-admissions context and routes visitors to **verifiable** programs (211 NH, 603 Legal Aid, NH Legal Assistance, NH DHHS, Ascentria, IINE, NH Food Bank, and others). The stack pairs a **Vite** SPA with an optional **Node + MySQL** API and **Firebase** (Firestore events/chat when configured).

## Highlights

- **Routing**: `react-router-dom` — home, services, communities, events, stories, support partners, privacy, first-week guide, know-your-rights, and a gated admin path when enabled.
- **i18n**: `react-i18next` with locales including `en`, `ar`, `fr`, `uk`, `sw`, `ne`, `rw` in `src/i18n/resources.ts`.
- **Data**: Events and RSVPs load from **MySQL via REST** when `VITE_API_URL` is set, otherwise from **Firestore**, otherwise from **localStorage** for local-only demos. Community discussion and optional hub announcements use Firestore when `VITE_FIREBASE_*` is present.
- **AI help guide (optional)**: Floating **Beacon guide** calls `POST /api/ai-assistant`. Prefer **Google Gemini** (`GEMINI_API_KEY` on the API); OpenAI is a fallback. Enable in the SPA with `VITE_AI_HELPER_ENABLED=true`. See **DEPLOYMENT.md** → *AI help guide*.
- **Admin**: `/admin` (or `VITE_ADMIN_ROUTE`) uses **Firebase Authentication** when the API or Firestore is active. In local dev without Firebase, the dashboard may fall back to an optional password from env — see `src/admin/Dashboard.tsx` (do not use dev defaults in production).

## Prerequisites

- Node.js 22+ (for the API; Vite works on current LTS)
- npm 10+
- For full stack: MySQL 8, Firebase project (web app + optional Admin SDK on the API)

## Quick start (frontend only)

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Full stack locally

1. MySQL: `npm run db:up` (see `docker-compose.yml`; schema in `server/schema.sql`).
2. Firebase service account JSON at `server/firebase-admin.json` (never commit — see `server/firebase-admin.example.json`).
3. `server/.env` from `server/.env.example`; root `.env` with `VITE_API_URL=http://localhost:3001` and `VITE_FIREBASE_*` if you use Firebase on the client.
4. `npm run api:install && npm run api:dev` — health: `http://localhost:3001/api/health`.

Optional **AI guide** locally: set **`GEMINI_API_KEY`** (Google AI Studio) in `server/.env`, optional **`GEMINI_MODEL`**, then in root `.env` add `VITE_AI_HELPER_ENABLED=true` and keep `VITE_API_URL=http://localhost:3001`. Restart API and Vite. (OpenAI works instead if you omit Gemini and set `OPENAI_API_KEY`.)

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for Vercel + Railway (or similar) environment wiring, CORS, and smoke checks.

## License / ethics

Content on public programs should cite **official** sources. This repo removes fictional testimonials, unverified impact counters, and stock photo personas in favor of links and phone numbers you can confirm on agency sites.
