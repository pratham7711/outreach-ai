# Architecture Decisions Log
> Add an entry every time a significant technical decision is made.
> Format: date, decision, why, what was rejected.

---

## 2026-03-29 — Codebase

**Decision:** Build on `outlier-ai/webapp` only (Next.js 16 + TypeScript + Prisma 7 + PostgreSQL)
**Why:** Correct stack for Vercel deployment, type-safe end-to-end, Prisma schema already 60% done, tests scaffolded
**Rejected:** `outlierai` (React CRA + FastAPI + MongoDB) — wrong deployment topology, no TypeScript, monolithic backend
**`outlierai` role:** Reference spec only. Read `backend/server.py` for business logic. Delete after Phase 2.

---

## 2026-03-29 — Server-Driven UI

**Decision:** Hybrid SDUI (unanimous 3-agent vote)
- Version A: `OrgUIConfig` JSON on Organization model — controls feature flags, nav, branding, limits, platform toggles. Zod-validated at every write.
- Version B scoped: dashboard widget grid only — typed `WIDGET_REGISTRY` (8 widgets, discriminated union), widgets own their own data fetching
**Why:** Version A handles 95% of per-client customization needs (features, branding). Version B scoped to dashboard avoids security risk of arbitrary data source binding in configs. Full SDUI is overengineering at current scale.
**Rejected:** Full SDUI across all pages — 1.5–2 week build, maintenance burden, cross-tenant data leak risk if widget configs specify arbitrary data sources

---

## 2026-03-29 — Database

**Decision:** Neon PostgreSQL (switched from SQLite)
**Why:** Production-ready, Vercel-native, connection pooling included, separate branch for test DB (free)
**Rejected:** MongoDB (outlierai uses it) — not Prisma-compatible, separate infrastructure, higher cost at scale

---

## 2026-03-29 — Social API Strategy

**Decision:** YouTube first (no approval), TikTok + Instagram after approval process
**Why:** YouTube Data API v3 is immediate, generous quota, no creator OAuth needed for channel stats. TikTok and Instagram require app approval (2-4 weeks).
**Manual bridge:** While TikTok/Instagram pending, org staff enters metrics manually. Same schema fields, same UI — just populated manually until OAuth approval.

---

## 2026-03-29 — Client Onboarding

**Decision:** JSON config file + provisioning CLI script
```bash
npx tsx scripts/provision-org.ts --config=docs/clients/sony-music.json
```
**Why:** Zero-code onboarding. Configs are version-controlled. Each client's settings are auditable via git history.
**Rejected:** Admin UI for onboarding — unnecessary for early stage, config files are faster

---

## 2026-03-29 — Testing

**Decision:** Mandatory automated testing on every feature — Unit (Jest) + Component (Testing Library) + Integration (supertest) + E2E (Playwright)
**Why:** Catches regressions before deployment, enables confident refactoring, required for CI/CD gate
**Rule:** Every API route needs 8 required test cases including 403 cross-tenant isolation test. Test DB = separate Neon branch.

---

## 2026-03-29 — Deployment

**Decision:** Single provider — Vercel (app + cron) + Neon (database)
**Why:** One billing account, one dashboard, Vercel Cron built-in, Neon auto-scales
**Rejected:** Railway + MongoDB Atlas + Vercel (3 providers, higher ops burden)

---

## 2026-03-29 — Phase Scope (Cut for MVP)

**Cut entirely:** Phase 3 (Creator Portal), Phase 6 (MCP/AI), Phase 7 (Bots), Phase 8 (Enterprise SSO)
**Active phases:** 0 (Foundation) → 1 (SDUI) → 2 (Feature parity) → 3 (Social APIs) → 4 (Demo ready)
**Why cut:** Customer doesn't need these for deal close. Add post-revenue when customers ask.
