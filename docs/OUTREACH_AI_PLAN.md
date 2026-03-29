# Outreach AI — Master Implementation Plan
> Generated: 2026-03-29 | Do NOT delete this file. Update it as decisions change.

---

## What Are We Building?

**Outreach AI** — an enterprise influencer campaign management SaaS.
Evolved from a CreatorCore clone. The codebase references CreatorCore internally (UI, schema names) but the product ships as Outreach AI.

**Monorepo:**
- `landing/` → Marketing site (Next.js 16)
- `webapp/` → Full SaaS platform (Next.js 16 + Prisma 7 + SQLite dev / PostgreSQL prod)

---

## Architecture — Final Decisions

### Unanimous (all agents agreed)

| Decision | Answer |
|---|---|
| App structure | One Next.js app, multiple route groups — NOT separate deployments |
| Time-series storage | PostgreSQL + rollup tables — NOT TimescaleDB |
| Creator portal | `(portal)` route group inside the same app |
| Job scheduling | Vercel Cron + Postgres job queue — NOT BullMQ/Redis |
| PDF generation | `@react-pdf/renderer` — NOT Puppeteer (breaks Vercel serverless) |
| MCP transport | HTTP + SSE — NOT stdio (CLI-only, not internet-accessible) |

### Debated — Final Calls

| Topic | Decision | Rejected |
|---|---|---|
| Creator auth | Custom JWT, `creator_portal_token` HttpOnly cookie, `CreatorSession` table | Second NextAuth instance |
| Bot outbound queue | Vercel for inbound webhooks + single Fly.io worker for outbound rate-limited queuing | Pure Vercel (can't hold persistent queue) |
| Dashboard widgets | Configurable toggle grid + preset layouts (v1) | Drag-and-drop (2-week UX project, ship later) |
| Plan enforcement | `OrgPlanConfig` DB table per org | Hard-coded `PLANS` const in `lib/plans.ts` |
| NL AI queries | LLM intent classifier → typed Prisma query | Text-to-SQL (brittle, SQL injection risk) |
| AI models | gpt-4o-mini for classification, claude-haiku-4-5 for summaries | GPT-4o/Opus (10x cost for prose) |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     OUTREACH AI (one Next.js app)            │
│                                                               │
│  (auth)/          Org team login / signup                    │
│  (dashboard)/     Campaign Manager — operational tools        │
│  (analytics)/     Analytics Dashboard — KPIs, reports, AI   │
│  (portal)/        Creator Portal — earnings, approvals        │
│  (public)/        Share links — r/[token], kit/[token]        │
│                                                               │
│  app/api/         REST APIs for all surfaces                  │
│  app/api/mcp/     MCP Server — AI agent connector             │
│  app/api/cron/    Scheduled job handlers (Vercel Cron)        │
│  app/api/slack|discord|telegram|whatsapp/  Bot webhooks      │
└─────────────────────────────────────────────────────────────┘
           │                              │
           ▼                              ▼
    PostgreSQL (Neon)              Fly.io Worker (~$6/mo)
    Primary DB + job queue         Outbound msg queue
    Prisma 7 ORM                   (WhatsApp, Telegram rate limits)
```

---

## Phased Roadmap

### Phase 1 — IAM Foundation *(unblocks everything)*

**Goal:** Proper permissions, plan limits, and audit trails before any new feature is built.

- [ ] Replace `Organization.plan` string → `OrgPlanConfig` DB table (migrate from `PLANS` const)
- [ ] Extend `User` model: `permissionOverrides`, `isActive`, `lastLoginAt`, `lastLoginIp`, `invitedById`
- [ ] Add `UserInvite` model + `POST /api/invites` + `/accept-invite` magic link flow
- [ ] Add `ApiKey` model (SHA-256 hashed, shown once on creation)
- [ ] Update `lib/rbac.ts` `resolvePermissions()` — per-user override evaluation, campaign-team-member scoping
- [ ] Wire `logAudit()` into ALL mutating API routes (currently zero calls)
- [ ] Extend `AuditLog` schema: `actorType`, `actorEmail`, `entityLabel`, `ipAddress`, `before`, `after`
- [ ] Build `/audit-log` dashboard page — filterable table + CSV export

**New schema:** `OrgPlanConfig`, `UserInvite`, `ApiKey`
**Extended:** `User`, `AuditLog`, `Organization`

---

### Phase 2 — Campaign Type System

**Goal:** Support 4 campaign types with correct business logic and payout calculations.

Campaign types:
1. **Budget-based** — fixed rate per post (e.g. $500/post)
2. **View-based** — pay per view up to a cap (e.g. $1 per 1K views, max $2K)
3. **Open community** — any creator can self-enroll
4. **Private/invite-only** — org sends invites to specific creators

- [ ] Add `CampaignType` enum to schema
- [ ] Add `campaignType`, `typeConfig` (JSON), `enrollmentOpen` to `Campaign` model
- [ ] Add `CampaignInvite` model (PRIVATE_INVITE type)
- [ ] Add `ViewLedger` model (VIEW_BASED type — point-in-time snapshots for payout calculation)
- [ ] Extend campaign creation wizard with type selector + conditional config forms
- [ ] Build `lib/campaigns/payoutCalculator.ts` — budget-based and view-based logic
- [ ] Add `POST /api/campaigns/[id]/invites` + `GET /api/campaigns/[id]/invites`
- [ ] View fraud detection: anomaly detector flags suspicious spikes before payout locks
- [ ] Self-enrollment flow for OPEN_COMMUNITY (creator portal)

**New schema:** `CampaignInvite`, `ViewLedger`
**Extended:** `Campaign`

#### typeConfig JSON shapes

```typescript
// BUDGET_BASED
{ ratePerPost: number; currency: string; maxPosts?: number }

// VIEW_BASED
{ ratePerThousandViews: number; capAmount: number; currency: string;
  trackingWindowDays: number; minimumViewsForPayout: number }

// OPEN_COMMUNITY
{ selfEnrollDeadline?: string; requiresApproval: boolean;
  maxCreators?: number; eligibilityCriteria?: { minFollowers?, platforms?, minEngagementRate? } }

// PRIVATE_INVITE
{ inviteMessage: string; responseDeadlineDays: number; allowCounterOffer: boolean }
```

---

### Phase 3 — Creator Portal

**Goal:** Creators get their own authenticated space. Orgs can review creator participation.

- [ ] Add `CreatorAccount`, `CreatorSocialAccount`, `CreatorNotifChannel`, `CreatorSession` models
- [ ] Extend `proxy.ts` middleware — split `/portal/*` routing with `creator_portal_token` cookie
- [ ] Build `(portal)` route group:
  - [ ] `/portal/login` — magic link email auth (no password friction)
  - [ ] `/portal/dashboard` — active campaigns, pending items, earnings summary
  - [ ] `/portal/campaigns/[id]` — view brief (read-only), submit post URL
  - [ ] `/portal/activations/[id]` — approve / decline draft
  - [ ] `/portal/earnings` — paid/pending breakdown per campaign + timeline chart
  - [ ] `/portal/profile` — social account OAuth linking
  - [ ] `/portal/invites` — accept/decline campaign invites
- [ ] Creator social OAuth flows: `/api/portal/social/connect/[platform]` + callbacks
  - Platforms: Instagram, TikTok, YouTube Shorts
- [ ] Creator notification channel linking (WhatsApp/Telegram/Discord)
- [ ] Org side: creators list shows portal status (invited / registered / active)

**New schema:** `CreatorAccount`, `CreatorSocialAccount`, `CreatorNotifChannel`, `CreatorSession`

---

### Phase 4 — Analytics & KPI Dashboard

**Goal:** Replace hardcoded/mock chart data. Add the `/analytics` surface.

- [ ] Add `PostMetricSnapshot`, `OrgMetricRollup`, `CampaignMetricRollup`, `PostAlert`, `DashboardLayout` models
- [ ] Build `lib/analytics/computeRollups.ts`
- [ ] Configure Vercel Cron (`vercel.json`)
- [ ] Build `(analytics)` route group:
  - [ ] `/analytics` — org KPI overview (8 configurable widgets, reads rollups)
  - [ ] `/analytics/campaigns/[id]` — campaign deep-dive with time-series charts
  - [ ] `/analytics/creators` — creator leaderboard
  - [ ] `/analytics/sounds` — sound tracker with real snapshot data
- [ ] Wire existing trackers page to real `SoundTrackerSnapshot` data
- [ ] Replace `DashboardClient.tsx` hardcoded stats with rollup reads
- [ ] Viral detection: `lib/analytics/viralDetection.ts` — EMA velocity scoring

**Widget types:** `kpi_grid`, `platform_breakdown`, `views_over_time`, `creator_performance`, `financial_summary`, `sound_tracker`, `top_posts`, `payout_summary`

**New schema:** `PostMetricSnapshot`, `OrgMetricRollup`, `CampaignMetricRollup`, `PostAlert`, `DashboardLayout`

---

### Phase 5 — Reports

**Goal:** Export-quality reports with white-labeling and scheduled delivery.

- [ ] Install `@react-pdf/renderer` + `xlsx`
- [ ] Build report templates:
  - [ ] `lib/reports/templates/CampaignSummaryPDF.tsx`
  - [ ] `lib/reports/templates/FinancialPDF.tsx`
  - [ ] `lib/reports/templates/ROIAnalysisPDF.tsx`
  - [ ] `lib/reports/templates/CreatorPerformancePDF.tsx`
- [ ] `POST /api/reports/[id]/generate/pdf` — streams binary PDF with org branding
- [ ] `POST /api/reports/[id]/generate/xlsx` — streams Excel
- [ ] Add `ReportSchedule` model + `/api/cron/send-scheduled-reports` + Resend delivery
- [ ] Build public viewer: `app/(public)/r/[token]/view/page.tsx` — no-auth branded report
- [ ] White-label: inject `org.logoUrl`, `org.primaryColor`, `org.brandName` at render time
- [ ] Add PDF / Excel download buttons to existing `/r/[token]` share link flow

**Report templates:** `campaign_summary`, `creator_performance`, `financial`, `roi_analysis`, `sound_tracker`

**New schema:** `ReportSchedule`

---

### Phase 6 — AI Integration (MCP + Direct)

**Goal:** Make Outreach AI connectable by Claude, ChatGPT, Perplexity, and custom agents.

- [ ] Install `@modelcontextprotocol/sdk`, `openai`, `@anthropic-ai/sdk`
- [ ] Build MCP server: `app/api/mcp/route.ts` + `lib/mcp/server.ts`
- [ ] Implement MCP tools (priority order):
  - [ ] `list_campaigns` — filter by status, date, client
  - [ ] `get_campaign_analytics` — KPIs + platform breakdown
  - [ ] `search_creators` — keyword, platform, follower range, bio keywords
  - [ ] `get_org_kpis` — org-level metrics by period
  - [ ] `list_creators` — full creator roster
  - [ ] `generate_report` — create + return public share link
  - [ ] `send_payout` — initiate payout (requires `payouts:create` permission)
  - [ ] `nl_query` — natural language → typed Prisma query
- [ ] MCP auth: `Authorization: Bearer sk_outreach_xxxx` → SHA-256 lookup on `ApiKey`
- [ ] Build API key management UI: `(dashboard)/settings/api-keys/`
- [ ] NL query: gpt-4o-mini intent classifier → typed Prisma query
- [ ] AI briefings: `POST /api/ai/briefing` — Claude Haiku narrative summaries
- [ ] AI creator discovery: keyword extraction → full-text search on `Creator.bio`
- [ ] Add "AI Summary" widget to campaign analytics page

**MCP rate limits by plan:** Free=0, Starter=0, Pro=1000/day, Enterprise=unlimited

---

### Phase 7 — Communication Channels

**Goal:** Orgs receive briefings and run commands via Slack, Discord, Telegram, WhatsApp.

**Deploy order:** Slack → Discord → Telegram → WhatsApp
> Start Meta Business API verification during Phase 5 (takes weeks).

- [ ] Add `OrgIntegration`, `NotificationQueue`, `ScheduledJob`, `OrgJobSchedule` models
- [ ] Build `lib/notifications/dispatch.ts` — centralized notification service
- [ ] Build integration settings UI: `(dashboard)/settings/integrations/`
- [ ] Build briefing schedule UI: `(dashboard)/settings/briefings/`

**Slack:**
- [ ] Slack App (OAuth + slash commands + events webhook → `/api/slack/events`)
- [ ] Commands: `/outreach campaigns`, `/outreach stats [name]`, `/outreach pay [creator]`, `/outreach brief [name]`, `/outreach ask [question]`
- [ ] Use `@vercel/functions` `waitUntil()` for async AI query responses (3s Slack deadline)

**Discord:**
- [ ] Interactions endpoint → `/api/discord/interactions` (Ed25519 verification)
- [ ] Mirror Slack commands as Discord slash commands
- [ ] Rich embeds with color-coded status indicators

**Telegram:**
- [ ] Webhook mode → `/api/telegram/webhook`
- [ ] Commands: `/campaigns`, `/stats`, `/earnings`, `/ask`
- [ ] Best channel for AI queries (no timeout constraint)

**WhatsApp:**
- [ ] Meta Business API (template-based notifications)
- [ ] Creator side: approval notifications, payout confirmations, invite delivery
- [ ] Keyword replies: `STATUS`, `EARNINGS`

**Briefings (Vercel Cron + Postgres job queue):**
- [ ] Daily 6am UTC: top 5 posts by views + campaign velocity alerts
- [ ] Weekly Monday 7am UTC: creator performance summary + earnings pending + best sounds
- [ ] Custom per-org schedules via `OrgJobSchedule` table

**New schema:** `OrgIntegration`, `NotificationQueue`, `ScheduledJob`, `OrgJobSchedule`

---

### Phase 8 — Enterprise Polish

- [ ] Two-factor authentication (TOTP) — `totpSecret`, `totpEnabled` on `User`
- [ ] SSO / SAML (WorkOS recommended for B2B SaaS)
- [ ] Org-configurable snapshot retention + viral detection threshold
- [ ] Audit log CSV export (enterprise plan gate)
- [ ] Custom subdomain white-labeling (schema already has `Organization.subdomain`)
- [ ] Role-based MCP access (VIEWER/MEMBER cannot use MCP)
- [ ] PGVECTOR semantic creator search (upgrade `nl_query` bio search to embedding similarity)

---

## Consolidated Schema Changes (All Phases)

```
Phase 1:  OrgPlanConfig, UserInvite, ApiKey
          extend: User, AuditLog, Organization

Phase 2:  CampaignInvite, ViewLedger
          extend: Campaign (CampaignType enum + typeConfig)

Phase 3:  CreatorAccount, CreatorSocialAccount,
          CreatorNotifChannel, CreatorSession

Phase 4:  PostMetricSnapshot, OrgMetricRollup,
          CampaignMetricRollup, PostAlert, DashboardLayout

Phase 5:  ReportSchedule

Phase 6:  (no new models — uses ApiKey from Phase 1)

Phase 7:  OrgIntegration, NotificationQueue,
          ScheduledJob, OrgJobSchedule

Phase 8:  extend User (totpSecret, totpEnabled)
```

---

## Vercel Cron Config

```json
{
  "crons": [
    { "path": "/api/cron/minutely",               "schedule": "* * * * *"   },
    { "path": "/api/cron/sync-posts",             "schedule": "0 */6 * * *" },
    { "path": "/api/cron/sync-sounds",            "schedule": "0 */2 * * *" },
    { "path": "/api/cron/rollup-metrics",         "schedule": "0 2 * * *"   },
    { "path": "/api/cron/daily",                  "schedule": "0 6 * * *"   },
    { "path": "/api/cron/weekly",                 "schedule": "0 7 * * 1"   },
    { "path": "/api/cron/send-scheduled-reports", "schedule": "0 8 * * *"   },
    { "path": "/api/cron/snapshot-cleanup",       "schedule": "0 3 * * *"   }
  ]
}
```

---

## New Route Map

```
(auth)/                   — unchanged
(dashboard)/              — Campaign Manager (existing, extended)
  settings/
    api-keys/             — MCP API key management         [Phase 6]
    integrations/         — Slack, Discord, Telegram, WA   [Phase 7]
    briefings/            — Custom job schedules            [Phase 7]
    billing/              — Plan + OrgPlanConfig UI         [Phase 1]
  audit-log/              — Audit trail viewer + export     [Phase 1]

(analytics)/              — Analytics Dashboard             [Phase 4]
  analytics/              — Org KPI overview
  analytics/campaigns/[id]/
  analytics/creators/
  analytics/sounds/

(portal)/                 — Creator Portal                  [Phase 3]
  portal/login/
  portal/dashboard/
  portal/campaigns/[id]/
  portal/activations/[id]/
  portal/earnings/
  portal/invites/
  portal/profile/

(public)/                 — Unauthenticated                 [Phase 5]
  r/[token]/view/         — Public report viewer
```

---

## Key External Services

| Service | Purpose | When |
|---|---|---|
| Neon / Supabase | PostgreSQL (prod) | Before Phase 1 deploy |
| Resend | Transactional email (invites, reports) | Phase 1 |
| Vercel | Hosting + Cron | Phase 1 |
| Fly.io (~$6/mo) | Outbound notification queue worker | Phase 7 |
| OpenAI API | NL query classification (gpt-4o-mini) | Phase 6 |
| Anthropic API | AI briefings (claude-haiku-4-5) | Phase 6 |
| Meta Business API | WhatsApp notifications | Phase 7 (apply early) |
| Slack API | Bot + slash commands | Phase 7 |
| Discord API | Bot + slash commands | Phase 7 |
| Telegram Bot API | Bot + commands | Phase 7 |
| WorkOS (optional) | SSO / SAML | Phase 8 |

---

*Last updated: 2026-03-29 | Update this file whenever architecture decisions change.*
