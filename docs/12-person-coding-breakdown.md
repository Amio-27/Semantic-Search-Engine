# CodeSense Project: 12-Person Coding Work Breakdown

এই ডকুমেন্টে project-এর codebase-কে 12টি ভাগে ভেঙে দেখানো হলো, যেন বোঝা যায় 12 জন আলাদা দায়িত্ব নিয়ে কাজ করেছে।

## High-Level Distribution

| Person | Area | Main Outcome |
|---|---|---|
| Person 1 | Project Foundation & Docs | Monorepo structure, onboarding, setup guide |
| Person 2 | API App Bootstrap | FastAPI app lifecycle, middleware, health check |
| Person 3 | Database & Entities | DB session/base setup, core SQLAlchemy models |
| Person 4 | Auth & Security Core | Register/login/logout flow, JWT, password hashing |
| Person 5 | Admin Access & User Control | Admin login, user list, block/unblock operations |
| Person 6 | Search Endpoint Design | Query contract, search route, response shaping |
| Person 7 | Embedding + Vector Layer | Embedding client, FAISS loading/search readiness |
| Person 8 | History + Analytics + Logs | Search history, dashboard metrics, activity logs |
| Person 9 | File Upload + Reindexing | Upload pipeline, chunking, index rebuild flow |
| Person 10 | Frontend Auth Experience | Auth context, login/register UI, route protection |
| Person 11 | Frontend Search Experience | Search page, result rendering, loading/error states |
| Person 12 | Admin UI + QA + Deployment | Admin pages, tests, deployment configs |

---

## Person 1: Project Foundation & Documentation

- কি করেছে:
  - Monorepo level structure define করেছে (apps/api, apps/web, scripts, docs, data)।
  - Project onboarding/readme এবং setup documentation লিখেছে।
- কেন করেছে:
  - নতুন developer যেন দ্রুত project run করতে পারে।
  - team-wide consistency ধরে রাখতে।
- কাজ কি:
  - Project scaffolding, setup instructions, architecture narrative maintain করা।
- Key files:
  - `README.md`
  - `docs/setup.md`
  - `docs/architecture.md`
  - `package.json`

## Person 2: API Application Bootstrap & Runtime Config

- কি করেছে:
  - FastAPI app startup/lifespan flow implement করেছে।
  - CORS middleware, exception handling, health endpoint configure করেছে।
- কেন করেছে:
  - API production-style ভাবে stable রাখতে এবং frontend connectivity নিশ্চিত করতে।
- কাজ কি:
  - App lifecycle orchestration, environment-driven config, runtime safety।
- Key files:
  - `apps/api/app/main.py`
  - `apps/api/app/core/config.py`

## Person 3: Database Layer & Core Entities

- কি করেছে:
  - SQLAlchemy base/session init করেছে।
  - users, uploaded_files, file_chunks, search_history, admin_activity_logs entities বানিয়েছে।
- কেন করেছে:
  - Auth, history, admin, upload feature-এর persistent storage লাগবে বলে।
- কাজ কি:
  - Data model design, relational integrity, DB access foundation।
- Key files:
  - `apps/api/app/db/base.py`
  - `apps/api/app/db/session.py`
  - `apps/api/app/models/entities.py`
  - `apps/api/app/models/__init__.py`

## Person 4: Authentication & Security Core

- কি করেছে:
  - User register/login/logout/me APIs implement করেছে।
  - Password hashing (bcrypt), JWT issue/verify logic implement করেছে।
- কেন করেছে:
  - Secure session-based login system ছাড়া protected features চালানো যায় না।
- কাজ কি:
  - Identity verification, session cookie strategy, token security।
- Key files:
  - `apps/api/app/api/routes/auth.py`
  - `apps/api/app/services/auth_service.py`
  - `apps/api/app/services/security.py`
  - `apps/api/app/api/dependencies.py`
  - `apps/api/app/schemas/auth.py`

## Person 5: Admin Access Control & User Governance

- কি করেছে:
  - Admin login endpoint করেছে।
  - Admin user তালিকা, user block/unblock workflows implement করেছে।
- কেন করেছে:
  - Platform moderation এবং role-based governance দরকার ছিল।
- কাজ কি:
  - RBAC enforcement, admin-only operations, user status management।
- Key files:
  - `apps/api/app/api/routes/admin.py`
  - `apps/api/app/services/user_service.py`
  - `apps/api/app/schemas/admin.py`

## Person 6: Search API Contract & Endpoint Flow

- কি করেছে:
  - Semantic search route এবং request/response schema তৈরি করেছে।
  - Query validation, top_k handling, API output structure ঠিক করেছে।
- কেন করেছে:
  - Frontend যেন predictable contract পায় এবং clean ভাবে ফলাফল দেখাতে পারে।
- কাজ কি:
  - Search endpoint orchestration, input validation, response standardization।
- Key files:
  - `apps/api/app/api/routes/search.py`
  - `apps/api/app/schemas/search.py`
  - `apps/api/app/services/search_service.py`

## Person 7: Embedding Integration & Vector Search Engine

- কি করেছে:
  - Embedding provider integration করেছে।
  - FAISS index load/search readiness logic implement করেছে।
  - Local embedding fallback/utility layer maintain করেছে।
- কেন করেছে:
  - Semantic retrieval core engine এই layer-এর উপর নির্ভরশীল।
- কাজ কি:
  - Embedding generation, vector similarity search, index lifecycle।
- Key files:
  - `apps/api/app/services/embedder.py`
  - `apps/api/app/services/local_embeddings.py`
  - `apps/api/app/services/vector_store.py`

## Person 8: Search History, Analytics & Activity Logging

- কি করেছে:
  - User search history APIs implement করেছে।
  - Admin dashboard analytics metrics তৈরি করেছে।
  - Admin activity log capture service লিখেছে।
- কেন করেছে:
  - Product usage বুঝতে, auditing করতে, dashboard insights দিতে।
- কাজ কি:
  - Event tracking, historical data services, admin observability।
- Key files:
  - `apps/api/app/api/routes/history.py`
  - `apps/api/app/schemas/history.py`
  - `apps/api/app/services/history_service.py`
  - `apps/api/app/services/analytics_service.py`
  - `apps/api/app/services/activity_log_service.py`

## Person 9: File Upload Pipeline & Index Rebuild

- কি করেছে:
  - Admin file upload pipeline (.txt/.md/.json/.pdf/.docx) implement করেছে।
  - Uploaded content chunking করে vector index rebuild flow যুক্ত করেছে।
- কেন করেছে:
  - Knowledge base dynamically update করতে (new docs ingest) এই pipeline দরকার।
- কাজ কি:
  - File ingestion, chunk processing, incremental/full reindex integration।
- Key files:
  - `apps/api/app/services/file_service.py`
  - `apps/api/app/services/indexing_service.py`
  - `apps/api/app/api/routes/admin.py` (files upload/delete/chunks অংশ)
  - `apps/api/uploads/`

## Person 10: Frontend Authentication UX & Route Protection

- কি করেছে:
  - Client-side auth context এবং session refresh flow বানিয়েছে।
  - Login/register/admin-login interfaces implement করেছে।
  - Protected routes guard করার middleware যোগ করেছে।
- কেন করেছে:
  - User/admin access আলাদা করে secure navigation নিশ্চিত করতে।
- কাজ কি:
  - Client auth state management, auth UI, protected routing behavior।
- Key files:
  - `apps/web/context/auth-context.tsx`
  - `apps/web/app/login/page.tsx`
  - `apps/web/app/admin/login/page.tsx`
  - `apps/web/components/auth/auth-shell.tsx`
  - `apps/web/components/auth/protected-gate.tsx`
  - `apps/web/middleware.ts`

## Person 11: Frontend Search UX & API Consumption

- কি করেছে:
  - Search page interactions এবং API integration করেছে।
  - Hero search, result card, empty/loading/error states implement করেছে।
  - Recent searches component যুক্ত করেছে।
- কেন করেছে:
  - End user যাতে smoothভাবে query থেকে result পর্যন্ত flow complete করতে পারে।
- কাজ কি:
  - Search interface behavior, result presentation, client API consumption।
- Key files:
  - `apps/web/app/search/page.tsx`
  - `apps/web/components/hero-search.tsx`
  - `apps/web/components/result-card.tsx`
  - `apps/web/components/search-states.tsx`
  - `apps/web/components/recent-searches.tsx`
  - `apps/web/lib/search-api.ts`

## Person 12: Admin Frontend, Testing & Deployment Integration

- কি করেছে:
  - Admin dashboard/files/users/logs pages implement করেছে।
  - Frontend/backend tests লিখেছে।
  - Vercel/Render/Railway deployment configs ও docs setup করেছে।
- কেন করেছে:
  - Feature completeness, regression safety, deployment readiness নিশ্চিত করতে।
- কাজ কি:
  - Admin panel delivery, test coverage, release/deployment pipeline readiness।
- Key files:
  - `apps/web/app/admin/dashboard/page.tsx`
  - `apps/web/app/admin/files/page.tsx`
  - `apps/web/app/admin/users/page.tsx`
  - `apps/web/app/admin/logs/page.tsx`
  - `apps/web/lib/admin-api.ts`
  - `apps/api/tests/test_search_api.py`
  - `apps/web/__tests__/hero-search.test.tsx`
  - `apps/web/__tests__/result-card.test.tsx`
  - `apps/web/__tests__/search-api.test.ts`
  - `render.yaml`
  - `railway.json`
  - `apps/web/vercel.json`
  - `docs/deployment.md`

---

## Suggested Presentation Note

এই breakdown commit-history based attribution না; এটা code ownership এবং feature responsibility ভিত্তিক team contribution mapping। রিপোর্ট/ভাইভা/প্রেজেন্টেশনে 12 জনের কাজ আলাদা করে explain করার জন্য এই format ব্যবহার করতে পারো।
