# Beacon NH — operations

Who does what before and after launch. Update this when roles change.

## Content & listings

| Area | Owner | Cadence / notes |
| --- | --- | --- |
| **Community hub posts** (Firestore `community_announcements`) | _Name:_ _______ | IINE / partners / community reps with Firebase login: **Admin → Community hubs**. **Deploy** updated `firestore.rules` + indexes when you ship. |
| **Events** (MySQL / admin / API) | _Name:_ _______ | Weekly: confirm dates, locations, registration links. |
| **Community updates** (`communitiesCatalog` dated posts) | _Name:_ _______ | When organizers send confirmed info only. |
| **Verified contacts** (`nhPublicResources.ts`, `nhRefugeeNeedsCatalog.ts`) | _Name:_ _______ | **Quarterly:** re-check top 10 numbers/sites; bump `lastVerified` (YYYY-MM). |
| **Policy / urgent alerts** (`VITE_POLICY_ALERT`, `VITE_POLICY_ALERT_UNTIL`) | _Name:_ _______ | Set on deploy host when there is a time-sensitive statewide notice; clear when done. |

## Inbound contact

| Channel | Owner | Notes |
| --- | --- | --- |
| **`VITE_CONTACT_EMAIL`** | _Name:_ _______ | Monitor inbox; goal: respond within 1–2 business days where possible. |
| **Footer mailto / community “Email Beacon NH”** | Same as above | |

## Trust & safety

| Area | Owner | Notes |
| --- | --- | --- |
| **Community discussion (Firestore)** | _Name:_ _______ | Review flagged content; apply [Privacy](/privacy): rules, bans, deletion requests. |
| **Admin / Firebase users** | _Name:_ _______ | Who may publish events, RSVPs, **community hub posts**, and view private data. |
| **AI guide** (`GEMINI_API_KEY` or `OPENAI_API_KEY` on API) | _Name:_ _______ | Prefer Gemini; keep keys server-side only; disable with `VITE_AI_HELPER_ENABLED` if needed. |

## Deploy & secrets

Deployment steps live in **DEPLOYMENT.md** (or **DEPLOY.txt**). API env vars live on the host running `server/`; `VITE_*` vars on the static frontend host.

---

_Last updated: 2026-05._
