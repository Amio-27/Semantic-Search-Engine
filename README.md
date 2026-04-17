# Semantic Programming Question Search Monorepo

Semantic search app for programming questions using embeddings + FAISS.

## Production-style additions

- JWT auth with httpOnly cookies
- Role-based access control (`user`, `admin`)
- Admin panel routes for analytics, files, users, and logs
- SQLite persistence with SQLAlchemy
- Admin upload pipeline (`.txt`, `.md`, `.json`, `.pdf`, `.docx`) with chunking + reindex
- Search history for authenticated users
- Admin activity logging

## Monorepo layout

- `apps/web`: Next.js frontend
- `apps/api`: FastAPI backend
- `scripts`: dataset processing and embedding generation
- `docs`: architecture and setup notes
- `data`: raw/processed/index data assets

## Quick start

1. Copy environment templates:
   - `cp .env.example .env`
   - `cp apps/web/.env.example apps/web/.env.local`
   - `cp apps/api/.env.example apps/api/.env`
2. In `apps/api/.env`, set at least these values:
   - `JWT_SECRET_KEY`
   - `SEED_ADMIN_EMAIL`
   - `SEED_ADMIN_PASSWORD`
   - `GITHUB_MODELS_API_KEY`

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

### Backend

```bash
cd apps/api
python3 -m venv .venv
.venv/bin/python -m pip install -U pip
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --reload --port 8000
```

Once both services are running:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

## Auth behavior

- Users can sign up and log in from the normal user flow.
- Admin self-registration is not enabled in the UI/API.
- Admin access is provided via seeded credentials from `apps/api/.env`.

### Default seeded admin credentials

- Admin ID (email): `admin@example.com`
- Admin password: `ChangeThisAdminPass123`

If your local `apps/api/.env` uses different seed values, those values become your admin login.

## Main routes

- Public: `/`, `/login`, `/admin/login`
- User protected: `/search`, `/history`
- Admin protected: `/admin/dashboard`, `/admin/files`, `/admin/users`, `/admin/logs`

See `docs/architecture.md` and `docs/setup.md` for full details.

## Deployment

- Deployment guide: `docs/deployment.md`
- Render config: `render.yaml`
- Railway config: `railway.json`
- Vercel config (web app): `apps/web/vercel.json`
- Production env examples:
   - `apps/api/.env.production.example`
   - `apps/web/.env.production.example`
