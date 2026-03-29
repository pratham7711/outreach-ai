# 🚀 CREATORCORE CLONE — MASTER CONTEXT FILE
> Last Updated: March 11, 2026 | Keep this file updated constantly!

---

## 📌 WHAT ARE WE BUILDING?

A **full-stack SaaS clone of CreatorCore** (https://www.creatorcore.co) — an influencer campaign management platform for music labels, talent agencies, and brands.

**Our version will be BETTER:** Custom code (not Bubble.io), proper APIs, real-time, scalable.

---

## 📂 PROJECT STRUCTURE

```
~/Documents/Repositories/creatorcore-clone/
├── landing/          → Next.js landing page (agent: claude-personal)
├── webapp/           → Full SaaS web app (agent: claude-work)
│   ├── src/
│   │   ├── app/          → Next.js App Router pages
│   │   ├── components/   → UI components
│   │   ├── lib/          → utilities, db client, API helpers
│   │   ├── hooks/        → React hooks
│   │   └── types/        → TypeScript types
│   ├── prisma/           → Database schema
│   └── public/           → Static assets
└── MASTER_CONTEXT.md  → THIS FILE (always update!)
```

---

## 🎯 TECH STACK (DECIDED)

### Frontend
- **Next.js 14+** (App Router, TypeScript)
- **TailwindCSS** + shadcn/ui (component library)
- **React Query** / TanStack Query (data fetching + caching)
- **TipTap** (rich text editor — Creative Brief feature)
- **Recharts** (analytics charts)
- **Zustand** (client state management)
- **Framer Motion** (animations)

### Backend
- **Next.js API Routes** (serverless)
- **PostgreSQL** via **Supabase** (free tier)
- **Prisma ORM** (type-safe DB queries)
- **NextAuth.js** (authentication)
- **Resend** (transactional emails)

### Infrastructure
- **Vercel** (hosting — free tier)
- **Supabase** (DB + Auth + Storage — free tier)
- **Cloudinary** (image uploads)

### 3rd Party APIs
- **TikTok Display API** (post metrics)
- **Instagram Basic Display API** (post metrics)
- **PayPal Payouts API** (creator payments)
- **Slack Webhooks** (campaign notifications)
- **OpenAI / Gemini** (AI creator discovery)

---

## 🗂 FEATURES — PRIORITY ORDER

### Phase 1 — Landing Page (THIS WEEK)
- [ ] Hero section (animated, with mockup screenshot)
- [ ] Features section (Campaign Mgmt, Analytics, Payouts, etc.)
- [ ] Social proof (client logos)
- [ ] Stats bar (3x ROI, 180% engagement, etc.)
- [ ] CTA sections
- [ ] Pricing section (3 tiers)
- [ ] Footer
- [ ] Mobile responsive

### Phase 2 — Auth + Organization Setup
- [ ] Sign up (email/password)
- [ ] Sign in
- [ ] Org creation wizard
- [ ] Invite team members
- [ ] User profile

### Phase 3 — Core Campaign Features
- [ ] Campaign list (filters, search, create/delete)
- [ ] Campaign detail (Overview tab)
- [ ] Campaign detail (Posts tab with metrics)
- [ ] Campaign detail (Creators tab)
- [ ] Campaign detail (Analytics tab — charts)
- [ ] Campaign detail (Financials tab)
- [ ] Campaign detail (Documents tab)
- [ ] Campaign detail (Settings tab)
- [ ] Creative Brief rich text editor

### Phase 4 — Creator Management
- [ ] Creators list (add/edit/delete)
- [ ] Creator profile page
- [ ] Creator Lists (grouping feature)
- [ ] Activations (creator-campaign workflow)
- [ ] Calendar view (deliverables)

### Phase 5 — Social Integrations
- [ ] TikTok API — fetch post metrics
- [ ] Instagram API — fetch post metrics
- [ ] TikTok Sound Tracker (Trackers feature)
- [ ] AI Creator Discovery

### Phase 6 — Financial Features
- [ ] Payouts (PayPal API)
- [ ] Balance management
- [ ] Transaction history
- [ ] Requests (creator payout requests)

### Phase 7 — Advanced
- [ ] Clients management
- [ ] B2B Connections (CreatorConnect)
- [ ] White-label (custom subdomains)
- [ ] Slack notifications
- [ ] Fan Pages (UGC collection)
- [ ] Export data (CSV/Excel)

---

## 🗄 DATABASE SCHEMA OVERVIEW

### Core Tables (Priority)
1. `organizations` — workspaces
2. `users` — team members
3. `campaigns` — main entity
4. `creators` — influencer roster
5. `posts` — TikTok/IG posts with metrics
6. `activations` — creator-campaign assignments
7. `payouts` — payment transactions

### Supporting Tables
8. `creator_lists` / `creator_list_items`
9. `campaign_tags` / `campaign_team_members`
10. `creative_briefs` — TipTap content
11. `analytics_modules` — dashboard widgets
12. `tiktok_sounds` / `sound_tracker_snapshots`
13. `clients` / `folders`
14. `activity_logs` / `campaign_comments`
15. `payout_balances`
16. `documents`
17. `connections` — B2B partnerships

---

## 🔌 API ENDPOINTS (High Level)

```
/api/campaigns       GET, POST
/api/campaigns/:id   GET, PATCH, DELETE
/api/campaigns/:id/posts    GET, POST
/api/campaigns/:id/posts/sync   POST (refresh TikTok data)
/api/campaigns/:id/brief        GET, PUT
/api/campaigns/:id/analytics    GET
/api/creators        GET, POST
/api/creators/:id    GET, PATCH, DELETE
/api/activations/:id PATCH
/api/payouts         GET, POST
/api/trackers        GET, POST, DELETE
/api/auth/[...nextauth]  (NextAuth)
```

---

## 🎨 DESIGN SYSTEM

### Colors
- Primary: `#4F46E5` (indigo)
- Primary Dark: `#2D2BE5` (deep indigo — sidebar)
- Accent: `#7C3AED` (purple)
- Success: `#10B981` (green)
- Background: `#F5F7FF` (light blue-white)
- Text: `#1F2937` (dark gray)

### Font: Inter (sans-serif)
### Border Radius: 8px (buttons), 12px (cards)

---

## 🤖 AGENT TASK DIVISION

| Agent | Account | Task | Directory | Status |
|-------|---------|------|-----------|--------|
| claude-personal | `~/.claude-personal` | Landing Page | `~/…/creatorcore-clone/landing/` | 🔄 Running |
| claude-work | `~/.claude-work` | Webapp + DB + API | `~/…/creatorcore-clone/webapp/` | 🔄 Running |

---

## 📊 CURRENT STATUS

### What's Done
- [x] Full feature research of CreatorCore
- [x] Tech stack decided
- [x] Database schema designed (20+ tables)
- [x] API endpoints planned
- [x] User flows documented
- [x] Wireframes created
- [x] Project directories created
- [x] This master context file created

### What's In Progress
- [x] **Webapp (claude-work) — COMPLETE ✅** (finished 00:52 IST, March 12)
- [x] **Landing page (claude-personal) — COMPLETE ✅** (finished 00:55 IST, March 12) — build passes

### What's Next
- Deploy landing to Vercel
- Set up Supabase project
- Build auth system

---

## 🔑 KEY DECISIONS MADE

1. **Next.js 14 App Router** — both landing and webapp
2. **Supabase** for DB + Auth (free tier, easy setup)
3. **Prisma** for ORM (type safety)
4. **shadcn/ui** for component library (copy-paste, customizable)
5. **Vercel** for deployment (free, zero config)
6. **NOT using Bubble.io** — full custom code for scalability
7. **Monorepo** — landing and webapp in same git repo

---

## ⚠️ IMPORTANT NOTES

- **Do NOT lose context** — always update this file after each session
- **Reference docs** in `~/.openclaw/workspace/projects/creatorcore-clone/`
- **Research** is in `RESEARCH.md`
- **Full dev plan** is in `COMPLETE_DEVELOPMENT_PLAN.md`
- **Wireframes** are in `USER_FLOWS_AND_WIREFRAMES.md`

---

## 🚀 COMMANDS TO KNOW

```bash
# Run landing page
cd ~/Documents/Repositories/creatorcore-clone/landing && npm run dev

# Run webapp
cd ~/Documents/Repositories/creatorcore-clone/webapp && npm run dev

# Prisma studio (DB browser)
cd ~/Documents/Repositories/creatorcore-clone/webapp && npx prisma studio

# Deploy landing
cd ~/Documents/Repositories/creatorcore-clone/landing && vercel --prod

# Deploy webapp
cd ~/Documents/Repositories/creatorcore-clone/webapp && vercel --prod
```

---

*Last updated by: Claw (OpenClaw AI) | Keep this updated every session!*
