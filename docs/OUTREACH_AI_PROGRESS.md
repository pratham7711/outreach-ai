# Outreach AI — Progress Tracker
> Last Updated: 2026-03-30 | Update this after every work session.

---

## Current Status: Foundation In Progress, Core Product Already Running

**Active Phase:** Phase 1 — IAM Foundation
**Next Action:** Finish plan enforcement, audit-log UI/export, and remaining IAM polish on top of the already-shipped schema/routes

---

## Phase Completion Overview

| Phase | Status | Started | Completed | Notes |
|---|---|---|---|---|
| Planning | ✅ Done | 2026-03-29 | 2026-03-29 | Plan written to OUTREACH_AI_PLAN.md |
| 1 — IAM Foundation | 🔄 In Progress | 2026-03-29 | — | Schema landed; audit/RBAC/enforcement partially implemented |
| 2 — Campaign Types | 🔄 In Progress | 2026-03-29 | — | Campaign type enum/model fields and API support landed; full business logic still pending |
| 3 — Creator Portal | 🔲 Not started | — | — | |
| 4 — Analytics & KPI | 🔲 Not started | — | — | |
| 5 — Reports | 🔲 Not started | — | — | |
| 6 — AI / MCP | 🔲 Not started | — | — | |
| 7 — Comms Channels | 🔲 Not started | — | — | |
| 8 — Enterprise Polish | 🔲 Not started | — | — | |

Status key: ✅ Done | 🔄 In Progress | 🔲 Not Started | ⏸ Blocked

---

## Phase 1 — IAM Foundation

### Schema Changes
- [x] Add `OrgPlanConfig` model (replaces hard-coded `PLANS` const in `lib/plans.ts`)
- [x] Add `UserInvite` model (invite flow with token + expiry)
- [x] Add `ApiKey` model (SHA-256 hashed, MCP auth)
- [ ] Extend `User`: `permissionOverrides`, `isActive`, `lastLoginAt`, `lastLoginIp`, `invitedById`
- [x] Extend `AuditLog`: `actorType`, `actorEmail`, `entityLabel`, `ipAddress`, `before`, `after`
- [x] Extend `Organization`: fields for plan config link
- [x] Run `prisma migrate dev`

### Backend
- [x] Update `lib/rbac.ts` — `resolvePermissions()` with override-ready evaluation scaffold
- [x] Update `lib/audit.ts` — support actor metadata, IP, before/after payloads
- [x] Wire `logAudit()` into `app/api/campaigns/route.ts`
- [x] Wire `logAudit()` into `app/api/campaigns/[id]/route.ts`
- [x] Wire `logAudit()` into `app/api/creators/route.ts`
- [x] Wire `logAudit()` into `app/api/creators/[id]/route.ts`
- [x] Wire `logAudit()` into `app/api/payouts/route.ts`
- [x] Wire `logAudit()` into `app/api/payouts/[id]/route.ts`
- [x] Wire `logAudit()` into `app/api/activations/[id]/route.ts`
- [x] Wire `logAudit()` into `app/api/clients/route.ts`
- [x] Wire `logAudit()` into `app/api/clients/[id]/route.ts`
- [x] Wire `logAudit()` into invite and API key flows
- [x] Build `POST /api/invites` — create invite
- [~] Build `GET /app/accept-invite?token=xxx` page + `POST /api/invites/accept`
- [ ] Build `lib/plan-enforcement.ts` — `assertPlanLimit()` + `assertFeatureEnabled()`
- [ ] Wire plan enforcement into campaign/creator/user creation routes
- [x] Seed `OrgPlanConfig` alongside existing plan constants; full removal of `lib/plans.ts` still pending

### Frontend
- [ ] Build `app/(dashboard)/audit-log/page.tsx` — table with date/actor/action filters
- [ ] Build audit log CSV export button → `GET /api/audit-logs/export`
- [ ] Build `app/(dashboard)/settings/billing/page.tsx` — plan info + limits display
- [x] Build user invite flow in `app/(dashboard)/settings/team/` — invite form, pending list
- [ ] Add "Deactivate user" action to team members list

### API Routes
- [ ] `GET  /api/audit-logs` — paginated with filters
- [ ] `GET  /api/audit-logs/export` — streaming CSV
- [x] `POST /api/invites` — create invite
- [x] `POST /api/invites/accept` — accept invite, create User
- [ ] `GET  /api/invites/[token]` — validate token (for invite landing page)

---

## Phase 2 — Campaign Type System
*(not started)*

### Schema Changes
- [x] Add `CampaignType` enum: `BUDGET_BASED`, `VIEW_BASED`, `OPEN_COMMUNITY`, `PRIVATE_INVITE`
- [x] Add to `Campaign`: `campaignType`, `typeConfig` (JSON string), `enrollmentOpen`
- [ ] Add `CampaignInvite` model
- [ ] Add `ViewLedger` model
- [x] Run `prisma migrate dev`

### Backend
- [ ] `lib/campaigns/payoutCalculator.ts` — budget-based + view-based logic
- [ ] `lib/fraud/viewAnomalyDetector.ts` — flag suspicious view spikes
- [x] Extend `POST /api/campaigns` — accept `campaignType` + `typeConfig`
- [ ] `POST /api/campaigns/[id]/invites`
- [ ] `GET  /api/campaigns/[id]/invites`
- [ ] `POST /api/campaigns/[id]/enroll` (OPEN_COMMUNITY, portal auth)
- [ ] `GET  /api/campaigns/[id]/view-ledger`
- [ ] `POST /api/campaigns/[id]/sync-views`

### Frontend
- [ ] Campaign creation wizard — type selector step
- [ ] Conditional config forms per type (budget field, view rate + cap, enrollment settings, invite settings)
- [ ] Campaign list — type badge on each card
- [ ] Campaign invites management page: `/campaigns/[id]/invites`

---

## Phase 3 — Creator Portal
*(not started)*

### Schema Changes
- [ ] Add `CreatorAccount` model
- [ ] Add `CreatorSocialAccount` model
- [ ] Add `CreatorNotifChannel` model
- [ ] Add `CreatorSession` model
- [ ] Run `prisma migrate dev`

### Backend
- [ ] Extend `proxy.ts` middleware — `/portal/*` uses `creator_portal_token` cookie
- [ ] `POST /api/portal/auth/login` — magic link request
- [ ] `GET  /api/portal/auth/callback?token=xxx` — validate + set cookie
- [ ] `POST /api/portal/auth/logout`
- [ ] `GET  /api/portal/auth/me`
- [ ] `GET  /api/portal/dashboard`
- [ ] `GET  /api/portal/campaigns`
- [ ] `GET  /api/portal/campaigns/discover` (OPEN_COMMUNITY only)
- [ ] `GET  /api/portal/campaigns/[id]`
- [ ] `POST /api/portal/campaigns/[id]/enroll`
- [ ] `GET  /api/portal/invites`
- [ ] `POST /api/portal/invites/[id]/accept`
- [ ] `POST /api/portal/invites/[id]/decline`
- [ ] `POST /api/portal/activations/[id]/submit`
- [ ] `GET  /api/portal/earnings`
- [ ] `GET  /api/portal/profile` + `PATCH`
- [ ] `POST /api/portal/social/connect/[platform]`
- [ ] `GET  /api/portal/social/callback/[platform]`
- [ ] `DELETE /api/portal/social/[platform]`

### Frontend (portal route group)
- [ ] `(portal)/layout.tsx` — minimal creator-branded layout
- [ ] `/portal/login` — magic link form
- [ ] `/portal/dashboard` — overview cards
- [ ] `/portal/campaigns` — enrolled + available campaigns
- [ ] `/portal/campaigns/[id]` — brief view + post submission
- [ ] `/portal/activations/[id]` — approve/decline
- [ ] `/portal/earnings` — earnings timeline chart
- [ ] `/portal/invites` — pending invite cards
- [ ] `/portal/profile` — social account connection cards

---

## Phase 4 — Analytics & KPI Dashboard
*(not started)*

- [ ] Schema: `PostMetricSnapshot`, `OrgMetricRollup`, `CampaignMetricRollup`, `PostAlert`, `DashboardLayout`
- [ ] `lib/analytics/computeRollups.ts`
- [ ] `lib/analytics/viralDetection.ts`
- [ ] `vercel.json` cron configuration
- [ ] `/api/cron/sync-posts` — 6-hourly snapshot collection
- [ ] `/api/cron/sync-sounds` — 2-hourly sound tracker
- [ ] `/api/cron/rollup-metrics` — nightly aggregation
- [ ] Replace `DashboardClient.tsx` hardcoded stats
- [ ] Wire trackers page to real data
- [ ] `(analytics)` route group — 4 pages
- [ ] Dashboard widget config panel

---

## Phase 5 — Reports
*(not started)*

- [ ] Install `@react-pdf/renderer` + `xlsx`
- [ ] 4 PDF report templates
- [ ] PDF + Excel generation endpoints
- [ ] `ReportSchedule` model + scheduled delivery cron
- [ ] Public report viewer page
- [ ] White-label PDF branding

---

## Phase 6 — AI / MCP
*(not started)*

- [ ] Install `@modelcontextprotocol/sdk`, `openai`, `@anthropic-ai/sdk`
- [ ] MCP server at `/api/mcp`
- [ ] 8 MCP tools (priority: `list_campaigns`, `get_campaign_analytics`, `search_creators` first)
- [ ] NL query endpoint
- [ ] AI briefings endpoint
- [ ] AI creator discovery
- [ ] API key management UI

---

## Phase 7 — Communication Channels
*(not started)*

> Start Meta Business API application during Phase 5 (multi-week approval process).

- [ ] `OrgIntegration`, `NotificationQueue`, `ScheduledJob`, `OrgJobSchedule` models
- [ ] `lib/notifications/dispatch.ts`
- [ ] Slack bot + slash commands
- [ ] Discord bot + slash commands
- [ ] Telegram bot + commands
- [ ] WhatsApp Business API notifications
- [ ] Fly.io outbound worker (deploy separately)
- [ ] Briefing engine (daily + weekly jobs)
- [ ] Integration settings UI
- [ ] Briefing schedule config UI

---

## Phase 8 — Enterprise Polish
*(not started)*

- [ ] TOTP two-factor auth
- [ ] SSO / SAML (WorkOS)
- [ ] Audit log retention config
- [ ] Custom subdomain white-labeling
- [ ] PGVECTOR semantic creator search
- [ ] Role-based MCP access enforcement

---

## Session Log

| Date | Who | What Was Done |
|---|---|---|
| 2026-03-29 | Pratham + Claude | Full codebase analysis, plan created, progress file initialized |

---

## Blockers & Notes

- Meta Business API verification must be started **during Phase 5** — takes 2-4 weeks
- Vercel Cron (minutely) requires **Vercel Pro plan**
- PostgreSQL (Neon/Supabase) must be set up **before Phase 1 is deployed to prod** — dev still uses SQLite
- Fly.io worker needed **before Phase 7 ships** — can set up during Phase 6

---

*Update this file at the start and end of every work session.*
