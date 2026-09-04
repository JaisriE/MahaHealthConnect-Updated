# Maha Health Connect

Maha Health Connect is a Maharashtra-focused Smart India Hackathon prototype for continuity, accountability, and access in public healthcare. The existing React/Vite interface is paired with an Express REST API, JWT authentication, role checks, audit events, rule-based triage, facility matching, referrals, and durable offline queue storage.

## Run Locally

```bash
npm install
npm run backend
npm run dev
```

Run the last two commands in separate terminals. The API runs at `http://localhost:4000`; Vite runs at `http://localhost:5173` and proxies `/api`.

## Environment and Database

Copy `.env.example` to `.env` and set `JWT_SECRET`. `DATABASE_URL` is reserved for the PostgreSQL deployment path. The local API falls back to seeded in-memory demo data when PostgreSQL is not configured, so the workflow remains demonstrable without real patient data.

The PostgreSQL schema is in `backend/schema.sql` and covers users, facilities, patients, triage, appointments, referrals, referral targets, and audit logs. Apply it to a demo database with `psql` when preparing the database environment.

## Demo Accounts

Use the manual login form with the identifier and role below:

| Role | User identifier | Password |
| --- | --- | --- |
| Patient | `USR-PAT-001` | `patient123` |
| Health Worker | `USR-HW-002` | `worker123` |
| Doctor | `USR-DOC-003` | `doctor123` |
| Facility Admin | `USR-ADM-004` | `admin123` |
| District Authority | `USR-DHO-005` | `district123` |

The one-click launcher remains available for presentation mode; manual login exercises the JWT API.

## API and Workflows

Core routes include `/api/auth/login`, `/api/patients`, `/api/triage`, `/api/facilities/match`, `/api/referrals`, `/api/appointments`, `/api/medicines`, `/api/diagnostics`, `/api/audit`, and `/api/sync`.

Facility matching returns a transparent score using specialty 25%, diagnostics 20%, emergency capability 20%, equipment 15%, beds 10%, medicines 5%, and availability/distance 5%. Referral targets can be sent and accepted by a facility admin. Clinical patient access is restricted by role and an appointment/referral relationship.

## Offline Demo

Use the header network control or browser offline mode. Triage entries and sync records are stored in IndexedDB, show as pending, and are posted to `/api/sync` when connectivity returns. The service worker caches only the application shell; `/api` and sensitive patient records are not cached.

## Architecture and Limitations

The frontend retains the existing contexts, dashboards, translations, rule-based triage engine, and visual language. The API owns JWT verification, role checks, facility-scoped patient access, duplicate phone detection, and audit events. The current server uses seeded memory storage for the student demo; the PostgreSQL schema is provided, while a full persistence adapter, SMS/NFC hardware, ABHA, and teleconsultation integrations remain intentionally out of scope.

This is a demonstrator, not a production-certified medical system. Triage is deterministic workflow support and does not provide autonomous diagnosis or medical advice.
