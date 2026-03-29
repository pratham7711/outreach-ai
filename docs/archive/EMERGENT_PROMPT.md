# Outreach AI — Complete Build Prompt for Emergent

---

## IMPORTANT: Read This First

You are building **Outreach AI** — an enterprise-grade influencer campaign management SaaS — from scratch. This prompt is self-contained. Build everything described here. Do not ask follow-up questions. Do not skip sections. Follow every instruction exactly as written. When in doubt, build more, not less.

The app runs on port **3009**. Use `PORT=3009` in all dev commands.

---

## 1. Product Overview

**Outreach AI** is a multi-tenant SaaS platform used by music labels, talent agencies, and brands to manage influencer marketing campaigns across TikTok, Instagram, and YouTube Shorts.

**Primary users:**
- **Org users** (campaign managers, admins, owners) — log in at `/login`, access the full dashboard at `/dashboard`
- **Creators** (influencers) — log in via magic link at `/portal/login`, access a stripped-down portal at `/portal/dashboard`

**Core capabilities:**
- Run influencer campaigns with four business models: budget-based, view-based, open community, private invite
- Manage a creator roster with follower counts, platform handles, rates, and payout info
- Track post performance and TikTok sound virality with time-series snapshots
- Process payouts via PayPal or bank transfer
- Generate PDF/Excel reports with org branding
- Expose an MCP (Model Context Protocol) endpoint for AI assistant integration
- Deliver daily/weekly briefings via Slack, Discord, Telegram, WhatsApp, and email
- Provide an analytics dashboard with 8 configurable widgets reading from pre-computed metric rollups

---

## 2. Tech Stack — Exact Packages

Install these exact packages. Do not substitute alternatives.

### Core
```
next@^16 (App Router, TypeScript, Turbopack)
typescript
tailwindcss@^4
@tailwindcss/postcss
postcss
```

### Database & ORM
```
prisma@^7
@prisma/client@^7
@prisma/adapter-better-sqlite3
better-sqlite3
@types/better-sqlite3
```

### Auth
```
next-auth@^5
@auth/prisma-adapter
bcryptjs
@types/bcryptjs
```

### UI
```
@radix-ui/react-dialog
@radix-ui/react-dropdown-menu
@radix-ui/react-select
@radix-ui/react-tabs
@radix-ui/react-avatar
@radix-ui/react-separator
@radix-ui/react-tooltip
@radix-ui/react-label
@radix-ui/react-badge
shadcn/ui (run: npx shadcn@latest init, then add components as needed)
lucide-react
```

### Charts & Animation
```
recharts
framer-motion
```

### Forms & Validation
```
react-hook-form
zod
@hookform/resolvers
```

### State Management
```
zustand
@tanstack/react-query
@tanstack/react-query-devtools
```

### Rich Text
```
@tiptap/react
@tiptap/starter-kit
@tiptap/extension-placeholder
```

### AI & MCP
```
openai
@anthropic-ai/sdk
@modelcontextprotocol/sdk
```

### Reports & Export
```
@react-pdf/renderer
xlsx
```

### Notifications & Email
```
sonner
resend
```

### Dates & Utilities
```
date-fns
clsx
tailwind-merge
```

### Dev
```
@types/node
@types/react
@types/react-dom
tsx (for seed script)
```

---

## 3. Design System

### 3a. CSS Variables

Define these in `app/globals.css` under `:root`. Use them **everywhere**. Never hardcode a color value anywhere in the codebase.

```css
:root {
  --cc-bg: #EFF0F8;
  --cc-sidebar: #FFFFFF;
  --cc-card: #FFFFFF;
  --cc-border: #E4E6F0;
  --cc-primary: #5B5BD6;
  --cc-primary-hover: #4A4AC8;
  --cc-text: #1C2048;
  --cc-text-muted: #9097B4;
  --cc-text-subtle: #C4C9E0;
  --cc-success: #10B981;
  --cc-warning: #F59E0B;
  --cc-danger: #EF4444;
}

* {
  font-family: Inter, system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}

body {
  background: var(--cc-bg);
  color: var(--cc-text);
}
```

### 3b. Design Rules — Enforce These Everywhere

1. **No hardcoded colors.** Every color reference must be `var(--cc-*)`.
2. **8px spacing grid.** All margin, padding, gap values must be multiples of 4px or 8px.
3. **Border radius:** 8px for buttons and inputs, 12px for cards and modals.
4. **Typography scale:** Page titles 26px, section headers 15px semi-bold, body 14px, labels/captions 11px.
5. **Interactive states:** Every button, row, nav item must have `hover:`, `active:`, `focus-visible:`, and `disabled:` states.
6. **Sidebar navigation items** use the class `.cc-nav-item`. Table rows use `.cc-table-row`.
7. **List animations:** Apply `transition-all duration-200` and staggered `animationDelay` for list items.
8. **Slide-up entrance:** New page content fades in with a 200ms ease-out translate-y animation.
9. **Accessibility:** Use semantic HTML (`<main>`, `<nav>`, `<section>`, `<aside>`). All interactive elements must have aria-labels. Maintain 4.5:1 contrast ratio minimum. Full keyboard navigation support.
10. **Three states required:** Every page that loads data must handle **loading** (skeleton), **empty** (EmptyState component with icon + message + CTA), and **error** (error card with retry button).
11. **Server Components by default.** Only add `"use client"` to components that require browser APIs, event handlers, or hooks.

### 3c. Tailwind Configuration

Configure Tailwind v4 with these custom values in `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      'cc-bg': 'var(--cc-bg)',
      'cc-sidebar': 'var(--cc-sidebar)',
      'cc-card': 'var(--cc-card)',
      'cc-border': 'var(--cc-border)',
      'cc-primary': 'var(--cc-primary)',
      'cc-primary-hover': 'var(--cc-primary-hover)',
      'cc-text': 'var(--cc-text)',
      'cc-text-muted': 'var(--cc-text-muted)',
      'cc-text-subtle': 'var(--cc-text-subtle)',
      'cc-success': 'var(--cc-success)',
      'cc-warning': 'var(--cc-warning)',
      'cc-danger': 'var(--cc-danger)',
    },
    borderRadius: {
      'card': '12px',
      'btn': '8px',
    }
  }
}
```

---

## 4. Build Order — Follow This Sequence

Build in this exact order. Complete each phase before starting the next.

**Phase 1:** Project scaffold, environment, Prisma schema, seed data
**Phase 2:** Auth system (NextAuth v5 + credentials + PrismaAdapter)
**Phase 3:** Core layout (sidebar, topbar, route groups)
**Phase 4:** Dashboard page
**Phase 5:** Campaigns (list + detail with 7 tabs)
**Phase 6:** Creators (roster + profile)
**Phase 7:** Clients
**Phase 8:** Activations
**Phase 9:** Payouts + recipients + requests
**Phase 10:** Creator Lists
**Phase 11:** Analytics dashboard (8 widgets)
**Phase 12:** Sound Tracker
**Phase 13:** Reports + PDF/Excel export
**Phase 14:** Settings (team, org, billing, API keys, integrations, briefings)
**Phase 15:** Audit log
**Phase 16:** Admin + Plans
**Phase 17:** AI features (briefing, discovery, NL query)
**Phase 18:** MCP endpoint
**Phase 19:** Bot integrations (Slack, Discord, Telegram, WhatsApp)
**Phase 20:** Creator Portal (separate auth + all portal routes)
**Phase 21:** Cron jobs + scheduled jobs runner
**Phase 22:** Public report viewer
**Phase 23:** Calendar page
**Phase 24:** Discovery page
**Phase 25:** Connections page
**Phase 26:** Final audit (empty states, loading states, error states, accessibility)

---

## 5. Database Schema

Create `prisma/schema.prisma` with this exact content. Do not modify any field names, types, or relations.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum UserRole {
  OWNER
  ADMIN
  MANAGER
  MEMBER
  VIEWER
}

enum CampaignStatus {
  DRAFT
  PENDING
  IN_PROGRESS
  COMPLETE
  CANCELLED
}

enum CampaignType {
  BUDGET_BASED
  VIEW_BASED
  OPEN_COMMUNITY
  PRIVATE_INVITE
}

enum Platform {
  TIKTOK
  INSTAGRAM
  YOUTUBE
}

enum ActivationStatus {
  AWAITING_DRAFT
  DRAFT_SUBMITTED
  AWAITING_APPROVAL
  APPROVED
  POSTING
  POSTED
  COMPLETE
  DECLINED
}

enum PayoutStatus {
  PENDING
  PROCESSING
  SUCCESS
  FAILED
}

enum PaymentMethod {
  PAYPAL
  BANK_TRANSFER
}

enum Currency {
  USD
  EUR
  GBP
  INR
}

enum InviteStatus {
  PENDING
  ACCEPTED
  DECLINED
  EXPIRED
}

enum NotifChannelType {
  WHATSAPP
  DISCORD
  TELEGRAM
  EMAIL
}

enum IntegrationType {
  SLACK
  DISCORD
  WHATSAPP
  TELEGRAM
}

enum JobType {
  DAILY_TOP_POSTS
  DAILY_CAMPAIGN_VELOCITY
  WEEKLY_CREATOR_PERFORMANCE
  WEEKLY_EARNINGS_PENDING
  SYNC_POST_VIEWS
  SYNC_SOUND_TRACKER
  SEND_CAMPAIGN_BRIEFING
  SEND_NOTIFICATION
  PROCESS_PAYOUT
}

enum JobStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}

model Organization {
  id              String   @id @default(cuid())
  name            String
  brandName       String?
  subdomain       String   @unique
  logoUrl         String?
  primaryColor    String   @default("#5B5BD6")
  fontFamily      String   @default("Inter")
  currency        Currency @default(USD)
  timezone        String   @default("UTC")
  snapshotIntervalHours Int @default(6)
  snapshotRetentionDays Int @default(90)
  viralThresholdPct     Float @default(0.10)
  mcpApiKey       String?  @unique
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  users           User[]
  invites         UserInvite[]
  apiKeys         ApiKey[]
  planConfig      OrgPlanConfig?
  campaigns       Campaign[]
  creators        Creator[]
  creatorLists    CreatorList[]
  clients         Client[]
  folders         Folder[]
  payoutBalances  PayoutBalance[]
  payouts         Payout[]
  tiktokSounds    TikTokSound[]
  connections     Connection[] @relation("FromOrg")
  connectionsTo   Connection[] @relation("ToOrg")
  integrations    OrgIntegration[]
  jobSchedules    OrgJobSchedule[]
  scheduledJobs   ScheduledJob[]
  metricRollups   OrgMetricRollup[]
  postAlerts      PostAlert[]
  auditLogs       AuditLog[]
  dashboardLayouts DashboardLayout[]
  reports         Report[]
  mediaKits       MediaKit[]
}

model OrgPlanConfig {
  id              String    @id @default(cuid())
  orgId           String    @unique
  planName        String    @default("free")
  maxCampaigns    Int       @default(3)
  maxCreators     Int       @default(50)
  maxUsers        Int       @default(2)
  features        String    @default("[]")
  customLimits    String?
  validUntil      DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  org             Organization @relation(fields: [orgId], references: [id])
}

model User {
  id                  String    @id @default(cuid())
  orgId               String
  email               String    @unique
  name                String
  avatarUrl           String?
  role                UserRole  @default(VIEWER)
  passwordHash        String?
  permissionOverrides String    @default("[]")
  isActive            Boolean   @default(true)
  lastLoginAt         DateTime?
  lastLoginIp         String?
  totpSecret          String?
  totpEnabled         Boolean   @default(false)
  invitedById         String?
  deactivatedAt       DateTime?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  org              Organization         @relation(fields: [orgId], references: [id])
  invitedBy        User?                @relation("UserInvites", fields: [invitedById], references: [id])
  invitedUsers     User[]               @relation("UserInvites")
  campaignMembers  CampaignTeamMember[]
  comments         CampaignComment[]
  activityLogs     ActivityLog[]
  documents        Document[]
  briefsUpdated    CreativeBrief[]
  auditLogs        AuditLog[]
  apiKeys          ApiKey[]
  dashboardLayouts DashboardLayout[]
  accounts         Account[]
  sessions         Session[]
}

model UserInvite {
  id          String       @id @default(cuid())
  orgId       String
  email       String
  role        UserRole     @default(MEMBER)
  invitedById String
  token       String       @unique @default(cuid())
  expiresAt   DateTime
  status      InviteStatus @default(PENDING)
  acceptedAt  DateTime?
  createdAt   DateTime     @default(now())

  org         Organization @relation(fields: [orgId], references: [id])
  invitedBy   User         @relation(fields: [invitedById], references: [id])
}

model ApiKey {
  id           String    @id @default(cuid())
  orgId        String
  createdById  String
  name         String
  keyHash      String    @unique
  keyPrefix    String
  permissions  String    @default("[]")
  lastUsedAt   DateTime?
  expiresAt    DateTime?
  revokedAt    DateTime?
  createdAt    DateTime  @default(now())

  org          Organization @relation(fields: [orgId], references: [id])
  createdBy    User         @relation(fields: [createdById], references: [id])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Campaign {
  id            String         @id @default(cuid())
  orgId         String
  title         String
  status        CampaignStatus @default(DRAFT)
  campaignType  CampaignType   @default(BUDGET_BASED)
  typeConfig    String         @default("{}")
  enrollmentOpen Boolean       @default(false)
  thumbnailUrl  String?
  budget        Float?
  currency      Currency       @default(USD)
  notes         String?
  clientId      String?
  folderId      String?
  createdById   String
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  deletedAt     DateTime?

  org           Organization         @relation(fields: [orgId], references: [id])
  client        Client?              @relation(fields: [clientId], references: [id])
  folder        Folder?              @relation(fields: [folderId], references: [id])
  teamMembers   CampaignTeamMember[]
  tags          CampaignTag[]
  posts         Post[]
  activations   Activation[]
  invites       CampaignInvite[]
  brief         CreativeBrief?
  analytics     AnalyticsModule[]
  financials    CampaignFinancials?
  documents     Document[]
  comments      CampaignComment[]
  activityLogs  ActivityLog[]
  payouts       Payout[]
  viewLedger    ViewLedger[]
  metricRollups CampaignMetricRollup[]
  reports       Report[]
}

model CampaignInvite {
  id          String       @id @default(cuid())
  campaignId  String
  creatorId   String?
  email       String?
  token       String       @unique @default(cuid())
  status      InviteStatus @default(PENDING)
  message     String?
  sentAt      DateTime     @default(now())
  expiresAt   DateTime
  respondedAt DateTime?

  campaign    Campaign @relation(fields: [campaignId], references: [id])
  creator     Creator? @relation(fields: [creatorId], references: [id])
}

model CampaignTeamMember {
  id         String   @id @default(cuid())
  campaignId String
  userId     String
  addedAt    DateTime @default(now())

  campaign Campaign @relation(fields: [campaignId], references: [id])
  user     User     @relation(fields: [userId], references: [id])
  @@unique([campaignId, userId])
}

model CampaignTag {
  campaignId String
  tag        String
  campaign   Campaign @relation(fields: [campaignId], references: [id])
  @@id([campaignId, tag])
}

model CreativeBrief {
  id          String   @id @default(cuid())
  campaignId  String   @unique
  content     String
  version     Int      @default(1)
  updatedById String?
  updatedAt   DateTime @updatedAt

  campaign  Campaign @relation(fields: [campaignId], references: [id])
  updatedBy User?    @relation(fields: [updatedById], references: [id])
}

model CampaignFinancials {
  id          String   @id @default(cuid())
  campaignId  String   @unique
  totalBudget Float    @default(0)
  spentAmount Float    @default(0)
  notes       String?
  updatedAt   DateTime @updatedAt

  campaign Campaign @relation(fields: [campaignId], references: [id])
}

model Creator {
  id             String   @id @default(cuid())
  orgId          String
  name           String
  handle         String
  platform       Platform @default(TIKTOK)
  platformUserId String?
  avatarUrl      String?
  followersCount Int      @default(0)
  averageViews   Int      @default(0)
  bio            String?
  contactEmail   String?
  paymentInfo    String?
  rate           Float?
  notes          String?
  addedAt        DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  org            Organization       @relation(fields: [orgId], references: [id])
  listItems      CreatorListItem[]
  activations    Activation[]
  posts          Post[]
  payouts        Payout[]
  campaignInvites CampaignInvite[]
  viewLedger     ViewLedger[]
  creatorAccount CreatorAccount?
}

model CreatorAccount {
  id               String    @id @default(cuid())
  creatorId        String    @unique
  email            String    @unique
  passwordHash     String?
  emailVerified    DateTime?
  loginToken       String?   @unique
  loginTokenExp    DateTime?
  lastLoginAt      DateTime?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  creator          Creator              @relation(fields: [creatorId], references: [id])
  socialAccounts   CreatorSocialAccount[]
  notifChannels    CreatorNotifChannel[]
  sessions         CreatorSession[]
}

model CreatorSession {
  id               String    @id @default(cuid())
  creatorAccountId String
  sessionToken     String    @unique
  expires          DateTime
  createdAt        DateTime  @default(now())

  account          CreatorAccount @relation(fields: [creatorAccountId], references: [id], onDelete: Cascade)
}

model CreatorSocialAccount {
  id                String    @id @default(cuid())
  creatorAccountId  String
  platform          Platform
  platformUserId    String
  handle            String
  accessToken       String
  refreshToken      String?
  tokenExpiresAt    DateTime?
  followerCount     Int       @default(0)
  lastSyncedAt      DateTime?
  createdAt         DateTime  @default(now())

  creatorAccount    CreatorAccount @relation(fields: [creatorAccountId], references: [id])
  @@unique([creatorAccountId, platform])
}

model CreatorNotifChannel {
  id               String           @id @default(cuid())
  creatorAccountId String
  channelType      NotifChannelType
  channelId        String
  verified         Boolean          @default(false)
  verifiedAt       DateTime?
  createdAt        DateTime         @default(now())

  creatorAccount   CreatorAccount @relation(fields: [creatorAccountId], references: [id])
  @@unique([creatorAccountId, channelType])
}

model CreatorList {
  id          String   @id @default(cuid())
  orgId       String
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  org   Organization      @relation(fields: [orgId], references: [id])
  items CreatorListItem[]
}

model CreatorListItem {
  id        String   @id @default(cuid())
  listId    String
  creatorId String
  addedAt   DateTime @default(now())

  list    CreatorList @relation(fields: [listId], references: [id])
  creator Creator     @relation(fields: [creatorId], references: [id])
  @@unique([listId, creatorId])
}

model Activation {
  id                  String           @id @default(cuid())
  campaignId          String
  creatorId           String
  status              ActivationStatus @default(AWAITING_DRAFT)
  deliverableDueDate  DateTime?
  postedUrl           String?
  feedbackNotes       String?
  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt
  deletedAt           DateTime?

  campaign Campaign @relation(fields: [campaignId], references: [id])
  creator  Creator  @relation(fields: [creatorId], references: [id])
}

model Post {
  id             String   @id @default(cuid())
  campaignId     String
  creatorId      String
  platform       Platform
  platformPostId String
  postUrl        String
  thumbnailUrl   String?
  caption        String?
  postedAt       DateTime
  viewsCount     Int      @default(0)
  likesCount     Int      @default(0)
  commentsCount  Int      @default(0)
  sharesCount    Int      @default(0)
  engagementRate Float    @default(0)
  lastSyncedAt   DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  campaign  Campaign               @relation(fields: [campaignId], references: [id])
  creator   Creator                @relation(fields: [creatorId], references: [id])
  snapshots PostMetricSnapshot[]
  alerts    PostAlert[]
  viewLedger ViewLedger[]
}

model ViewLedger {
  id         String   @id @default(cuid())
  postId     String
  campaignId String
  creatorId  String
  viewCount  Int
  snapshotAt DateTime @default(now())
  source     String
  rawPayload String?
  lockedForPayout Boolean @default(false)

  post     Post     @relation(fields: [postId], references: [id])
  campaign Campaign @relation(fields: [campaignId], references: [id])
  creator  Creator  @relation(fields: [creatorId], references: [id])
}

model PostMetricSnapshot {
  id             String   @id @default(cuid())
  postId         String
  recordedAt     DateTime @default(now())
  viewsCount     Int
  likesCount     Int
  commentsCount  Int
  sharesCount    Int
  engagementRate Float

  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
}

model OrgMetricRollup {
  id                String   @id @default(cuid())
  orgId             String
  periodType        String
  periodStart       DateTime
  totalViews        Int      @default(0)
  totalLikes        Int      @default(0)
  totalPosts        Int      @default(0)
  totalCreators     Int      @default(0)
  totalSpend        Float    @default(0)
  totalPayouts      Float    @default(0)
  campaignCount     Int      @default(0)
  platformBreakdown String   @default("{}")

  org Organization @relation(fields: [orgId], references: [id])
  @@unique([orgId, periodType, periodStart])
}

model CampaignMetricRollup {
  id                String   @id @default(cuid())
  campaignId        String
  periodStart       DateTime
  periodType        String
  totalViews        Int      @default(0)
  totalEngagement   Float    @default(0)
  postCount         Int      @default(0)
  creatorCount      Int      @default(0)
  spendAmount       Float    @default(0)
  roi               Float    @default(0)
  platformBreakdown String   @default("{}")

  campaign Campaign @relation(fields: [campaignId], references: [id])
  @@unique([campaignId, periodType, periodStart])
}

model PostAlert {
  id            String   @id @default(cuid())
  orgId         String
  postId        String
  type          String
  velocityScore Float
  triggeredAt   DateTime @default(now())
  acknowledged  Boolean  @default(false)

  post Post         @relation(fields: [postId], references: [id])
  org  Organization @relation(fields: [orgId], references: [id])
}

model DashboardLayout {
  id        String   @id @default(cuid())
  userId    String
  orgId     String
  scope     String
  widgets   String   @default("[]")
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])
  @@unique([userId, orgId, scope])
}

model AnalyticsModule {
  id         String   @id @default(cuid())
  campaignId String
  type       String
  title      String
  config     String
  position   Int      @default(0)
  createdAt  DateTime @default(now())

  campaign Campaign @relation(fields: [campaignId], references: [id])
}

model TikTokSound {
  id            String   @id @default(cuid())
  orgId         String
  tiktokSoundId String
  title         String
  artist        String
  coverImageUrl String?
  trackedSince  DateTime @default(now())
  createdAt     DateTime @default(now())

  org       Organization           @relation(fields: [orgId], references: [id])
  snapshots SoundTrackerSnapshot[]
}

model SoundTrackerSnapshot {
  id             String   @id @default(cuid())
  soundId        String
  usesCount      Int
  videosAdded24h Int      @default(0)
  deltaUses24h   Int      @default(0)
  velocityScore  Float    @default(0)
  recordedAt     DateTime @default(now())

  sound TikTokSound @relation(fields: [soundId], references: [id])
}

model Client {
  id             String   @id @default(cuid())
  orgId          String
  name           String
  logoUrl        String?
  contactInfo    String?
  planName       String?
  featureOverrides String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  org       Organization @relation(fields: [orgId], references: [id])
  campaigns Campaign[]
}

model Folder {
  id             String   @id @default(cuid())
  orgId          String
  name           String
  parentFolderId String?
  createdAt      DateTime @default(now())

  org           Organization @relation(fields: [orgId], references: [id])
  parentFolder  Folder?      @relation("FolderHierarchy", fields: [parentFolderId], references: [id])
  subfolders    Folder[]     @relation("FolderHierarchy")
  campaigns     Campaign[]
}

model Payout {
  id                   String        @id @default(cuid())
  orgId                String
  creatorId            String
  campaignId           String?
  amount               Float
  currency             Currency      @default(USD)
  status               PayoutStatus  @default(PENDING)
  paymentMethod        PaymentMethod @default(PAYPAL)
  recipientPaypalEmail String?
  transactionId        String?
  initiatedAt          DateTime      @default(now())
  completedAt          DateTime?
  failureReason        String?
  createdAt            DateTime      @default(now())
  updatedAt            DateTime      @updatedAt

  org      Organization @relation(fields: [orgId], references: [id])
  creator  Creator      @relation(fields: [creatorId], references: [id])
  campaign Campaign?    @relation(fields: [campaignId], references: [id])
}

model PayoutBalance {
  id             String   @id @default(cuid())
  orgId          String
  label          String   @default("Default Balance")
  currentBalance Float    @default(0)
  currency       Currency @default(USD)
  updatedAt      DateTime @updatedAt

  org Organization @relation(fields: [orgId], references: [id])
}

model Document {
  id           String   @id @default(cuid())
  campaignId   String
  name         String
  fileUrl      String
  fileSize     Int
  mimeType     String
  uploadedById String
  uploadedAt   DateTime @default(now())

  campaign   Campaign @relation(fields: [campaignId], references: [id])
  uploadedBy User     @relation(fields: [uploadedById], references: [id])
}

model ActivityLog {
  id         String   @id @default(cuid())
  campaignId String
  userId     String?
  action     String
  metadata   String?
  createdAt  DateTime @default(now())

  campaign Campaign @relation(fields: [campaignId], references: [id])
  user     User?    @relation(fields: [userId], references: [id])
}

model CampaignComment {
  id         String    @id @default(cuid())
  campaignId String
  userId     String
  content    String
  createdAt  DateTime  @default(now())
  updatedAt  DateTime?
  deletedAt  DateTime?

  campaign Campaign @relation(fields: [campaignId], references: [id])
  user     User     @relation(fields: [userId], references: [id])
}

model AuditLog {
  id          String   @id @default(cuid())
  orgId       String
  actorId     String?
  actorType   String   @default("USER")
  actorEmail  String?
  action      String
  entityType  String
  entityId    String?
  entityLabel String?
  ipAddress   String?
  userAgent   String?
  before      String?
  after       String?
  metadata    String?
  createdAt   DateTime @default(now())

  org  Organization @relation(fields: [orgId], references: [id])
  user User?        @relation(fields: [actorId], references: [id])
}

model Report {
  id          String   @id @default(cuid())
  orgId       String
  campaignId  String?
  title       String
  config      String   @default("{}")
  shareToken  String   @unique @default(cuid())
  isPublic    Boolean  @default(false)
  createdById String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  org      Organization    @relation(fields: [orgId], references: [id])
  campaign Campaign?       @relation(fields: [campaignId], references: [id])
  schedule ReportSchedule?
}

model ReportSchedule {
  id         String    @id @default(cuid())
  reportId   String    @unique
  frequency  String
  recipients String    @default("[]")
  channels   String    @default("{}")
  nextRunAt  DateTime
  lastRunAt  DateTime?
  isActive   Boolean   @default(true)

  report Report @relation(fields: [reportId], references: [id])
}

model MediaKit {
  id          String   @id @default(cuid())
  orgId       String
  creatorId   String?
  shareToken  String   @unique @default(cuid())
  config      String   @default("{}")
  isPublic    Boolean  @default(false)
  createdById String
  createdAt   DateTime @default(now())

  org Organization @relation(fields: [orgId], references: [id])
}

model OrgIntegration {
  id        String          @id @default(cuid())
  orgId     String
  type      IntegrationType
  config    String
  isActive  Boolean         @default(true)
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt

  org Organization @relation(fields: [orgId], references: [id])
  @@unique([orgId, type])
}

model NotificationQueue {
  id          String    @id @default(cuid())
  orgId       String?
  channel     String
  recipientId String
  payload     String
  status      String    @default("PENDING")
  attempts    Int       @default(0)
  scheduledFor DateTime @default(now())
  processedAt DateTime?
  error       String?
  createdAt   DateTime  @default(now())
}

model ScheduledJob {
  id           String    @id @default(cuid())
  orgId        String?
  type         JobType
  status       JobStatus @default(PENDING)
  payload      String
  scheduledFor DateTime
  startedAt    DateTime?
  completedAt  DateTime?
  failedAt     DateTime?
  attempts     Int       @default(0)
  maxAttempts  Int       @default(3)
  error        String?
  createdAt    DateTime  @default(now())

  org Organization? @relation(fields: [orgId], references: [id])
}

model OrgJobSchedule {
  id             String    @id @default(cuid())
  orgId          String
  jobType        JobType
  cronExpression String
  timezone       String    @default("UTC")
  enabled        Boolean   @default(true)
  recipients     String    @default("[]")
  config         String    @default("{}")
  lastRunAt      DateTime?
  nextRunAt      DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  org Organization @relation(fields: [orgId], references: [id])
  @@unique([orgId, jobType])
}

model Connection {
  id             String   @id @default(cuid())
  fromOrgId      String
  toOrgId        String
  status         String   @default("pending")
  shareRoster    Boolean  @default(false)
  shareCampaigns Boolean  @default(false)
  createdAt      DateTime @default(now())
  acceptedAt     DateTime?

  fromOrg Organization @relation("FromOrg", fields: [fromOrgId], references: [id])
  toOrg   Organization @relation("ToOrg", fields: [toOrgId], references: [id])
}
```

---

## 6. Environment Variables

Create `.env.local` at the project root:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="outreach-ai-dev-secret-change-in-prod"
NEXTAUTH_URL="http://localhost:3009"
RESEND_API_KEY=""
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
CRON_SECRET="cron-secret-change-in-prod"
SLACK_SIGNING_SECRET=""
DISCORD_PUBLIC_KEY=""
TELEGRAM_BOT_TOKEN=""
WHATSAPP_VERIFY_TOKEN=""
WHATSAPP_ACCESS_TOKEN=""
WHATSAPP_PHONE_NUMBER_ID=""
```

Also add to `package.json` scripts:
```json
"dev": "PORT=3009 next dev --turbopack",
"db:push": "prisma db push",
"db:seed": "tsx prisma/seed.ts",
"db:studio": "prisma studio"
```

---

## 7. Core Library Files

### `lib/db.ts`
Prisma client singleton using `@prisma/adapter-better-sqlite3`:
```ts
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const sqlite = new Database(process.env.DATABASE_URL!.replace('file:', ''))
  const adapter = new PrismaLibSQL(sqlite)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### `lib/utils.ts`
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `lib/rbac.ts`

Define the full permissions matrix:

```ts
export const PERMISSIONS = {
  OWNER: ['*'],
  ADMIN: [
    'campaigns:read','campaigns:create','campaigns:edit','campaigns:edit_own','campaigns:delete',
    'creators:read','creators:create','creators:edit','creators:delete',
    'payouts:read','payouts:create','payouts:approve',
    'reports:read','reports:create','reports:export',
    'audit_log:read','audit_log:export',
    'users:read','users:invite','users:manage',
    'org:settings',
    'mcp:connect','mcp:read','mcp:write',
    'analytics:read'
  ],
  MANAGER: [
    'campaigns:read','campaigns:create','campaigns:edit','campaigns:edit_own','campaigns:delete',
    'creators:read','creators:create','creators:edit','creators:delete',
    'payouts:read','payouts:create','payouts:approve',
    'reports:read','reports:create','reports:export',
    'analytics:read'
  ],
  MEMBER: [
    'campaigns:read','campaigns:edit_own',
    'creators:read',
    'analytics:read'
  ],
  VIEWER: [
    'campaigns:read',
    'creators:read',
    'analytics:read'
  ]
}

export function resolvePermissions(role: string, overrides: string[]): string[] {
  const base = PERMISSIONS[role as keyof typeof PERMISSIONS] ?? []
  const effective = base.includes('*') ? ['*'] : [...base]
  for (const override of overrides) {
    if (override.startsWith('-')) {
      const perm = override.slice(1)
      const idx = effective.indexOf(perm)
      if (idx > -1) effective.splice(idx, 1)
    } else {
      if (!effective.includes(override)) effective.push(override)
    }
  }
  return effective
}

export function hasPermission(permissions: string[], required: string): boolean {
  return permissions.includes('*') || permissions.includes(required)
}
```

### `lib/audit.ts`
```ts
import { prisma } from './db'

export interface AuditEvent {
  orgId: string
  actorId?: string
  actorEmail?: string
  actorType?: string
  action: string
  entityType: string
  entityId?: string
  entityLabel?: string
  before?: object
  after?: object
  metadata?: object
  ipAddress?: string
  userAgent?: string
}

export async function logAudit(event: AuditEvent) {
  await prisma.auditLog.create({
    data: {
      ...event,
      before: event.before ? JSON.stringify(event.before) : undefined,
      after: event.after ? JSON.stringify(event.after) : undefined,
      metadata: event.metadata ? JSON.stringify(event.metadata) : undefined,
    }
  })
}
```

### `lib/plan-enforcement.ts`
```ts
import { prisma } from './db'

export async function assertPlanLimit(orgId: string, resource: 'campaigns' | 'creators' | 'users') {
  const config = await prisma.orgPlanConfig.findUnique({ where: { orgId } })
  if (!config) return
  const counts = {
    campaigns: () => prisma.campaign.count({ where: { orgId, deletedAt: null } }),
    creators: () => prisma.creator.count({ where: { orgId, deletedAt: null } }),
    users: () => prisma.user.count({ where: { orgId, isActive: true } })
  }
  const limits = {
    campaigns: config.maxCampaigns,
    creators: config.maxCreators,
    users: config.maxUsers
  }
  const current = await counts[resource]()
  if (current >= limits[resource]) {
    throw new Error(`Plan limit reached: maximum ${limits[resource]} ${resource} allowed on your current plan.`)
  }
}
```

### `lib/campaigns/payoutCalculator.ts`
```ts
export function calculateBudgetBasedPayout(typeConfig: string, approvedPostCount: number): number {
  const config = JSON.parse(typeConfig)
  return config.ratePerPost * approvedPostCount
}

export function calculateViewBasedPayout(typeConfig: string, totalVerifiedViews: number): number {
  const config = JSON.parse(typeConfig)
  if (totalVerifiedViews < config.minimumViewsForPayout) return 0
  const raw = (totalVerifiedViews / 1000) * config.ratePerThousandViews
  return Math.min(raw, config.capAmount)
}
```

### `lib/analytics/viralDetection.ts`
```ts
export function computeEMAVelocity(snapshots: { usesCount: number; recordedAt: Date }[], alpha = 0.3): number {
  if (snapshots.length < 2) return 0
  const sorted = [...snapshots].sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime())
  let ema = 0
  for (let i = 1; i < sorted.length; i++) {
    const delta = sorted[i].usesCount - sorted[i - 1].usesCount
    ema = alpha * delta + (1 - alpha) * ema
  }
  return Math.max(0, ema)
}

export function isViral(velocityScore: number, threshold = 0.1): boolean {
  return velocityScore >= threshold
}
```

### `lib/analytics/computeRollups.ts`
Write functions `computeOrgMetricRollup(orgId, periodType, periodStart)` and `computeCampaignMetricRollup(campaignId, periodType, periodStart)`. These should aggregate `Post` and `Payout` records for the given period, then upsert into `OrgMetricRollup` / `CampaignMetricRollup`. `platformBreakdown` is stored as JSON string with keys `TIKTOK`, `INSTAGRAM`, `YOUTUBE`.

### `lib/notifications/dispatch.ts`
Central notification dispatcher. It reads `OrgIntegration` records and the `NotificationQueue` table. Implement:
- `dispatchToSlack(orgId, message)` — HTTP POST to Slack webhook URL from config
- `dispatchToDiscord(orgId, embed)` — HTTP POST to Discord webhook
- `dispatchToTelegram(orgId, text)` — HTTP POST to Telegram Bot API
- `dispatchToEmail(to, subject, html)` — uses Resend SDK
- `enqueueNotification(channel, recipientId, payload)` — inserts into `NotificationQueue`

---

## 8. Auth System

### `lib/auth.ts`
Configure NextAuth v5 with:
- **PrismaAdapter** from `@auth/prisma-adapter`
- **Credentials provider**: look up user by email, verify password with `bcryptjs.compare`, check `isActive === true`
- **JWT strategy** (not database sessions for portal users)
- **Session callback**: attach `user.id`, `user.orgId`, `user.role`, `user.name` to the session token
- **Authorized callback**: protect all `(dashboard)` and `(analytics)` routes — redirect to `/login` if no session

### `lib/auth.config.ts`
Export `authConfig` for middleware. The `authorized` function must:
- Allow all `/portal/*` routes through (handled by creator portal auth separately)
- Allow `/login`, `/signup`, `/accept-invite`, `/r/*` without auth
- Require session for everything else

### `middleware.ts`
Use NextAuth's `auth` middleware with the auth config. Apply to the matcher:
```
['/((?!api|_next/static|_next/image|favicon.ico).*)']
```

### API Routes for Auth
- `POST /api/auth/register` — create org + first OWNER user. Body: `{ orgName, subdomain, name, email, password }`. Hash password with `bcryptjs`. Create `OrgPlanConfig` with free plan defaults. Return 409 if subdomain or email taken.
- `GET /api/invites/[token]` — return invite info (org name, role, email) for display on accept page
- `POST /api/invites/accept` — validate token, create user, mark invite ACCEPTED

---

## 9. App Layout

### Route Groups
Create these route group folders exactly:
- `app/(auth)/` — login, signup, accept-invite pages (no sidebar)
- `app/(dashboard)/` — all org dashboard pages (with sidebar)
- `app/(analytics)/` — analytics pages (same sidebar as dashboard)
- `app/(portal)/` — creator portal (different layout, no org sidebar)
- `app/(public)/` — no auth required

### `app/(dashboard)/layout.tsx`
Renders a two-column layout: `<Sidebar />` (fixed left, 240px wide) + `<main>` (flex-1, overflow-y-auto). Wraps children in a `<QueryClientProvider>` and `<Toaster />` from sonner.

### Sidebar Component (`components/layout/Sidebar.tsx`)
Left sidebar with:
- **Logo area** at top — shows org `brandName` or "Outreach AI"
- **Navigation sections** with labels:
  - **Workspace:** Dashboard, Campaigns, Creators, Clients, Activations, Lists
  - **Finance:** Payouts, Recipients, Requests
  - **Analytics:** Analytics, Sound Tracker, Discovery, Calendar
  - **Settings:** Connections, Fan Pages, Audit Log, Admin, Plans
  - **Settings (bottom):** Settings (with sub-items: Team, Org, Billing, API Keys, Integrations, Briefings)
- Each nav item is `<Link>` with active state highlighting using `var(--cc-primary)` background at 10% opacity and `var(--cc-primary)` text
- Add user avatar + name + role badge at the very bottom

### Topbar Component (`components/layout/Topbar.tsx`)
Thin top bar (56px height) with:
- Current page title (h1, 26px)
- Right side: search button, notifications bell (badge count), user avatar dropdown (profile, settings, logout)

---

## 10. Dashboard Page (`/dashboard`)

This is the first page users see after login. Build it as a server component that fetches data from the database.

**Layout:** Page title "Dashboard" + subtitle with org name and today's date.

**KPI Cards row** (4 cards using `StatCard` pattern):
- Total Views (from OrgMetricRollup, last 30d)
- Total Spend (sum of SUCCESS payouts)
- Active Campaigns (count where status = IN_PROGRESS)
- Active Creators (count with at least 1 activation not DECLINED/COMPLETE)

Each card: metric label (11px, muted), large number (26px bold), delta vs prior period (+12% trend arrow in success/danger color).

**Campaign Status Chart:** Recharts `BarChart` — campaigns grouped by status. Colors: DRAFT=muted, PENDING=warning, IN_PROGRESS=primary, COMPLETE=success, CANCELLED=danger.

**Recent Activity Feed:** Last 10 `ActivityLog` records across all campaigns. Each row: avatar, action text, campaign name (linked), relative time (date-fns `formatDistanceToNow`).

**Top Campaigns table:** Top 5 campaigns by view count. Columns: Campaign, Status (badge), Budget, Views, Creators, Actions.

**Pending Alerts:** `PostAlert` records where `acknowledged = false`. Show as a dismissible banner list. Each alert: post thumbnail, creator name, velocity score, "View Post" link.

---

## 11. Campaigns

### Campaign List Page (`/campaigns`)

**Header:** "Campaigns" title + "New Campaign" button (opens `CreateCampaignDialog`).

**Filters row:**
- Status tabs: All | Draft | Pending | In Progress | Complete | Cancelled (with count badges)
- Search input (debounced, filters by title)
- Campaign type filter dropdown
- Client filter dropdown
- Sort by: Created, Updated, Budget, Views

**Campaign Cards Grid** (3 columns on desktop, 1 on mobile):
Each card shows:
- Thumbnail image (or gradient placeholder based on campaign type)
- Status badge (color-coded)
- Campaign type badge
- Title (16px semi-bold)
- Client name (if assigned)
- Budget + currency
- Creator count + Post count
- Activation progress bar (complete/total)
- "···" action menu: Edit, View, Archive, Delete

**Empty state:** "No campaigns yet" with a rocket icon and "Create your first campaign" button.

**CreateCampaignDialog:**
Fields: Title (required), Campaign Type (select with 4 options), Client (optional select), Budget + Currency, Notes. Dynamic fields based on campaign type:
- BUDGET_BASED: Rate Per Post, Max Posts
- VIEW_BASED: Rate Per 1K Views, Cap Amount, Tracking Window Days, Minimum Views
- OPEN_COMMUNITY: Self-Enroll Deadline, Requires Approval toggle, Max Creators
- PRIVATE_INVITE: Invite Message, Response Deadline Days, Allow Counter Offer toggle

Uses `react-hook-form` + `zod` validation. On submit, POST to `/api/campaigns`.

### Campaign Detail Page (`/campaigns/[id]`)

Full-width page. Header shows campaign title, status badge (editable inline), campaign type badge, and action buttons (Sync Posts, Generate Report, Archive).

**7-Tab Navigation** (use shadcn Tabs component):

#### Tab 1: Overview
- Top section: Status card, Budget card, Created date, Client name
- Team Members section: avatars of assigned users with "Add Member" button
- Notes section: TipTap rich text editor (editable by MANAGER+), auto-saves on blur
- Activity Feed: chronological list of `ActivityLog` + `CampaignComment` entries, interleaved by timestamp. Comments have a text input to add new ones.

#### Tab 2: Posts
- Sync button (calls `POST /api/sync/posts` with campaignId) with last-synced timestamp
- Posts table: Thumbnail | Creator | Platform icon | Caption (truncated) | Posted Date | Views | Likes | Comments | Shares | Engagement Rate | Actions
- Row click expands to show all metrics and a sparkline chart from `PostMetricSnapshot` history
- Sort by any column
- Filter by platform
- Empty state: "No posts tracked yet. Add post URLs to start tracking."

#### Tab 3: Creators
- Table of `Activation` records for this campaign
- Columns: Creator avatar + name | Platform | Status (color-coded badge) | Due Date | Posted URL | Actions
- Status badges: AWAITING_DRAFT=muted, DRAFT_SUBMITTED=warning, AWAITING_APPROVAL=warning, APPROVED=primary, POSTING=primary, POSTED=success, COMPLETE=success, DECLINED=danger
- "Add Creator" button opens a dialog to search and select from the org's creator roster
- Inline status update dropdown per activation
- Feedback notes popover (click note icon to open/edit)

#### Tab 4: Analytics
- Date range picker (7d / 30d / 90d / custom)
- **Views Over Time** — Recharts AreaChart from `CampaignMetricRollup` daily data, filled with `var(--cc-primary)` at 20% opacity
- **Platform Breakdown** — PieChart with three slices (TikTok purple, Instagram pink, YouTube red)
- **Creator Comparison** — BarChart: top 10 creators by view count
- **Engagement Rate Trend** — LineChart
- All charts show loading skeleton while data fetches

#### Tab 5: Financials
- Budget vs Spend gauge (donut chart, spend in center)
- Budget: total budget, spent amount, remaining, % used progress bar
- Payout Ledger table: Creator | Amount | Status | Method | Date | Transaction ID
- "Initiate Payout" button (opens PayoutDialog)
- Export to Excel button (calls `/api/reports/[id]/generate/xlsx`)

#### Tab 6: Documents
- File upload zone (drag + drop, or click to browse). Accepted: PDF, DOCX, XLSX, PNG, JPG, ZIP. Max 50MB.
- Documents list: icon by mime type, file name, size, uploader avatar + name, uploaded date, download link, delete button
- Files are stored as base64 URLs or file paths (use `/public/uploads/` in dev)

#### Tab 7: Settings
- Edit form: Title, Status, Campaign Type, Client, Folder, Enrollment Open toggle, Tags (multi-input)
- Danger Zone: "Delete Campaign" (soft-delete, sets `deletedAt`) with confirmation dialog
- "Archive Campaign" button (sets status to CANCELLED)

---

## 12. Creators

### Creator Roster Page (`/creators`)

**Header:** "Creators" title + "Add Creator" button + View toggle (grid / table icons).

**Filters:** Platform tabs (All | TikTok | Instagram | YouTube), search by name/handle, sort by followers/views/rate.

**Grid View:** Creator cards. Each card:
- Avatar (large, 64px)
- Name (16px bold) + `@handle` (muted)
- Platform icon badge
- Followers count (formatted: 1.2M, 450K)
- Avg views badge
- Rate (if set): "$X/post"
- Action menu: View Profile, Edit, Add to List, Delete

**Table View:** Columns: Avatar+Name | Handle | Platform | Followers | Avg Views | Rate | Active Campaigns | Actions

**AddCreatorDialog:** Fields: Name, Handle, Platform (select), Followers Count, Average Views, Contact Email, Rate, Bio, Notes. POST to `/api/creators`.

### Creator Profile Page (`/creators/[id]`)

**Header:** Large avatar, name, handle, platform badge, followers count, "Edit" button.

**Stats row (4 cards):** Total Posts, Total Views, Avg Engagement Rate, Total Earned (sum of SUCCESS payouts).

**Tabs:**
- **Performance** — LineChart of views over time across all posts, BarChart of engagement rate per post
- **Campaigns** — Table of all activations: Campaign | Status | Due Date | Posted URL
- **Payouts** — Table of all payouts: Amount | Status | Method | Date
- **Profile** — Editable fields: bio, contact email, payment info, notes

---

## 13. Clients

### Client List Page (`/clients`)
Table with columns: Logo | Name | Plan | Campaign Count | Created Date | Actions (View, Edit, Delete). "Add Client" button opens a dialog with: Name, Logo URL, Contact Info, Plan Name.

### Client Detail Page (`/clients/[id]`)
Header with client logo and name. Tabs:
- **Campaigns** — same campaign card grid as `/campaigns` but filtered to this client
- **Settings** — editable client fields, feature overrides (JSON textarea), danger zone

---

## 14. Activations Page (`/activations`)

All activations across all campaigns, with filters:
- Status filter (all statuses)
- Campaign filter (dropdown)
- Creator filter (search)
- Date range
- Platform filter

Table columns: Creator | Campaign | Platform | Status (badge) | Due Date | Days Until Due (colored: red if past due) | Posted URL | Actions

Row actions: Update Status, View Campaign, View Creator.

Bulk action: Select multiple → bulk status update.

---

## 15. Payouts

### Payouts Page (`/payouts`)

**Stats row:** Total Paid, Total Pending, Total Processing, Failed Count.

**Filters:** Status tabs, date range, creator search, campaign filter.

**Table:** Creator | Campaign | Amount + Currency | Status (badge) | Method | PayPal Email | Initiated | Completed | Failure Reason | Actions

**InitiatePayoutDialog:** Creator select (searchable), Campaign select (optional), Amount, Currency, Payment Method (PAYPAL / BANK_TRANSFER), PayPal Email. On submit POST to `/api/payouts`.

**Bulk Payout:** Select multiple PENDING payouts → "Process Selected" → POST to `/api/payouts/bulk`.

### Payout Recipients Page (`/recipients`)
List of unique creators who have received or are pending payouts. For each: avatar, name, total earned, payout count, last payout date, preferred payment method, PayPal email on file. Edit payment info inline.

### Payout Requests Page (`/requests`)
Shows activations with status COMPLETE that don't yet have a payout — these are pending payment requests. Columns: Creator | Campaign | Calculated Amount | Campaign Type | Actions (Approve + Pay, Decline).

---

## 16. Creator Lists

### Lists Page (`/lists`)
Grid of `CreatorList` cards. Each card: name, description, creator count, created date. "New List" button (dialog with name + description).

### List Detail Page (`/lists/[id]`)
Header with list name. Two panels:
- Left: creators in this list (with remove button per row)
- Right: search org creators to add (with "Add to List" button)

---

## 17. Analytics Dashboard (`/analytics`)

All-widgets page reading from `OrgMetricRollup` and live aggregates.

**Date Range Selector:** 7d / 30d / 90d / YTD / All (updates all widgets).

**8 Configurable Widgets** (user can toggle visibility, stored in `DashboardLayout`):

### Widget 1: KPI Grid
Four stat cards in a row:
- Total Views — sum of `OrgMetricRollup.totalViews` for period
- Total Spend — sum of `OrgMetricRollup.totalSpend`
- Active Campaigns — `OrgMetricRollup.campaignCount`
- Active Creators — `OrgMetricRollup.totalCreators`

Each shows delta vs prior equivalent period (e.g., last 30d vs prior 30d) as a colored percentage badge.

### Widget 2: Platform Breakdown
`PieChart` from Recharts. Parse `platformBreakdown` JSON to get TikTok/Instagram/YouTube slices. Show legend with exact numbers and percentages.

### Widget 3: Views Over Time
`AreaChart` from Recharts. X-axis: dates, Y-axis: totalViews. Fill gradient using `var(--cc-primary)`. Show tooltip with exact views + date.

### Widget 4: Creator Performance
`BarChart` from Recharts. Top 10 creators by total views across the selected period. Horizontal bars sorted descending.

### Widget 5: Financial Summary
Donut chart showing budget allocated vs spent. Center shows remaining budget. Below: table with campaign name, budget, spent, remaining, ROI%.

### Widget 6: Sound Tracker
Top 5 TikTok sounds by velocity score. Each row: cover image, title, artist, current uses count, velocity score, sparkline (mini LineChart from last 7 days of snapshots).

### Widget 7: Top Posts
Ranked list of top 10 posts by views. Each item: thumbnail, creator avatar, platform icon, caption snippet, view count (large), engagement rate, posted date. Click opens post URL.

### Widget 8: Payout Summary
Table: Creator | Total Paid | Pending Amount | Last Payout | Method. Shows total row at bottom.

### Widget Customization
"Customize Dashboard" button opens a sidebar drawer showing all 8 widgets as toggleable cards. Drag to reorder. Save persists to `DashboardLayout` via `PUT /api/dashboard/layout`.

### Campaign Analytics Page (`/analytics/campaigns/[id]`)
Deep-dive for one campaign. Same widgets as above but scoped to single campaign. Add a "Campaign Health Score" computed as: (engagementRate × 0.4) + (budgetUtilization × 0.3) + (activationCompletionRate × 0.3), displayed as a 0–100 gauge.

### Creator Analytics Page (`/analytics/creators`)
Leaderboard table + per-creator sparklines. Filter by platform and date range.

### Sounds Analytics Page (`/analytics/sounds`)
Full sound tracker with all tracked sounds. Each sound has a full LineChart of velocity over time. Show trending badge if velocity above org `viralThresholdPct`.

---

## 18. Sound Tracker Page (`/trackers`)

Dedicated sound tracker page.

**Header:** "Sound Tracker" + "Track New Sound" button.

**AddSoundDialog:** Fields: TikTok Sound ID, Title, Artist, Cover Image URL.

**Sound Cards:** For each tracked sound:
- Cover image (48px) + title + artist
- Current uses count (large)
- 24h delta (green if positive)
- Velocity score badge (red "VIRAL" badge if above threshold)
- 7-day uses count sparkline (mini Recharts LineChart)
- "Stop Tracking" button

All sound data comes from `TikTokSound` + latest `SoundTrackerSnapshot`.

---

## 19. Reports

### Reports Page (`/reports`) — within Settings or as standalone
List of reports with: title, campaign (if linked), created by, public/private badge, share link, created date. Actions: View, Regenerate, Schedule, Delete.

**CreateReportDialog:** Title, Template (Campaign Summary / Financial / ROI Analysis / Creator Performance), Campaign (optional select), Make Public toggle.

**Report Detail** — opens in a modal or separate page. Shows the report content rendered inline. Two export buttons:
- "Export PDF" → calls `/api/reports/[id]/generate/pdf` → downloads PDF
- "Export Excel" → calls `/api/reports/[id]/generate/xlsx` → downloads .xlsx

**Schedule Dialog:** Frequency (daily/weekly/monthly), Recipients (email addresses, comma-separated), Delivery Channels (Slack/Discord/Email checkboxes), Save.

**Public Report Viewer** (`/r/[token]/view`): No-auth page. Fetches report by `shareToken`. Renders full report in clean branded layout using org's `primaryColor` and `brandName`. Shows a "Powered by Outreach AI" footer.

### Report Templates in `lib/reports/templates/`

**CampaignSummaryPDF.tsx** — React PDF component with:
- Org logo header + org name + report title
- Campaign KPIs: views, engagement rate, creator count, post count, total spend
- Platform breakdown table
- Creator list with per-creator stats
- Branded in org primary color

**FinancialPDF.tsx** — React PDF component with:
- Budget vs spend summary
- Payout ledger table
- ROI calculation (CPM, cost per view, engagement rate)

---

## 20. Settings

### Team Settings (`/settings/team`)
Two-section page:

**Current Team Members** table: Avatar + Name | Email | Role | Last Login | Status | Actions (Change Role, Deactivate, Remove)

**Invite User** form (inline or dialog): Email, Role select. On submit POST to `/api/invites`. Show pending invites list below with status and "Resend" / "Cancel" buttons. Invites expire after 48 hours.

### Org Settings (`/settings/org`)
Form with: Org Name, Brand Name, Subdomain (read-only), Logo URL, Primary Color (color picker), Font Family (select), Currency (select), Timezone (select), Snapshot Interval Hours, Snapshot Retention Days, Viral Threshold Percentage.

### Billing Settings (`/settings/billing`)
Current plan card: plan name, limits (maxCampaigns, maxCreators, maxUsers), valid until, features list. Usage bars showing current vs max. "Upgrade Plan" button (navigates to `/plans`).

### API Keys Settings (`/settings/api-keys`)
Table of API keys: Name | Prefix | Permissions | Last Used | Expires | Created. "Create API Key" button — shows generated key ONCE in a dialog (never shown again). "Revoke" button per key. Keys are stored as SHA-256 hashes, only the prefix is shown.

### Integrations Settings (`/settings/integrations`)
Cards for each integration type (Slack, Discord, Telegram, WhatsApp). Each card:
- Integration logo icon
- Connected/Disconnected status badge
- Config form (webhook URL for Slack/Discord, bot token for Telegram, verify token + access token for WhatsApp)
- Test Connection button
- Toggle enabled/disabled

### Briefings Settings (`/settings/briefings`)
Configure scheduled briefing jobs. Cards for each JobType. For DAILY_TOP_POSTS and DAILY_CAMPAIGN_VELOCITY: cron expression field (default `0 6 * * *`), enabled toggle, delivery channels (Slack/Discord/Email/Telegram checkboxes), recipient email list. For weekly jobs: default `0 7 * * 1`.

---

## 21. Audit Log (`/audit-log`)

Full-width table page.

**Filters:** Actor email search, Action type filter, Entity type filter, Date range picker.

**Table columns:** Timestamp | Actor | Action | Entity Type | Entity Label | IP Address | Before/After (expandable)

Row click expands to show `before` and `after` JSON diffs side-by-side.

**Export CSV** button — calls `GET /api/audit-logs/export?startDate=&endDate=&orgId=` — returns CSV download.

---

## 22. Admin & Plans

### Admin Page (`/admin`)
Feature access control. Table of all features (from `lib/features.ts`) with per-client and per-org toggles. Only accessible to OWNER role.

`lib/features.ts`:
```ts
export const FEATURES = [
  'ai_briefings', 'mcp_access', 'sound_tracker', 'creator_portal',
  'bulk_payouts', 'pdf_export', 'xlsx_export', 'white_label',
  'view_based_campaigns', 'open_community_campaigns',
  'discord_integration', 'telegram_integration', 'whatsapp_integration'
] as const
```

### Plans Pages (`/plans`, `/plans/new`, `/plans/[id]`)
CRUD for `OrgPlanConfig`. List page shows all orgs with their plan configs. New/Edit page has form with: Plan Name, Max Campaigns, Max Creators, Max Users, Features (multi-select), Valid Until, Custom Limits (JSON textarea).

---

## 23. AI Features

### AI Briefing (`POST /api/ai/briefing`)

Uses `@anthropic-ai/sdk` with model `claude-haiku-4-5-20251001`.

Request: `{ orgId: string, periodType: '7d' | '30d', style: 'slack' | 'email' | 'discord' }`

Logic:
1. Fetch top 5 posts by views for the period
2. Fetch campaign velocity data (view counts across periods)
3. Fetch pending payouts total
4. Build a structured prompt with all the data
5. Call Claude Haiku with the prompt asking for a concise campaign performance summary
6. Format response in the requested style (Slack block kit JSON / HTML email / Discord embed JSON)

Response: `{ summary: string, formattedPayload: object, model: string }`

### AI Creator Discovery (`POST /api/ai/discover-creators`)

Uses OpenAI `gpt-4o-mini`.

Request: `{ query: string, orgId: string, limit?: number }`

Logic:
1. Call GPT-4o-mini to extract search parameters from the natural language query (platform, follower range, bio keywords)
2. Run Prisma query on `Creator` table using extracted parameters
3. Return ranked results

Response: `{ creators: Creator[], extractedParams: object }`

### NL Query (`POST /api/ai/query`)

Uses OpenAI `gpt-4o-mini`.

Request: `{ question: string, orgId: string }`

Logic:
1. Build system prompt describing the database schema (tables, fields, relationships)
2. Call GPT-4o-mini to classify intent into one of: campaigns_list, campaigns_stats, creators_list, payouts_summary, top_posts
3. Based on classified intent, run the appropriate typed Prisma query
4. Format results as a human-readable answer

Response: `{ answer: string, data: object, intent: string }`

Implement all logic in `lib/ai/nlQuery.ts`, `lib/ai/briefings.ts`, `lib/ai/creatorDiscovery.ts`.

---

## 24. MCP Server

Endpoint: `POST /api/mcp`
Content-Type: `application/json`

Auth middleware: Extract `Authorization: Bearer sk_outreach_XXXX` header → SHA-256 hash → look up in `ApiKey` table → get `orgId` → load `permissions` JSON array.

Use `@modelcontextprotocol/sdk` to create a server instance in `lib/mcp/server.ts`.

Implement these 8 tools exactly:

**1. list_campaigns**
Input: `{ status?: CampaignStatus, clientId?: string, startDate?: string, endDate?: string }`
Returns: Array of campaigns with id, title, status, campaignType, budget, currency, creatorCount, postCount, totalViews.

**2. get_campaign_analytics**
Input: `{ campaignId: string, period?: '7d' | '30d' | '90d' }`
Returns: Latest `CampaignMetricRollup` for the campaign + platform breakdown parsed from JSON.

**3. search_creators**
Input: `{ platform?: Platform, minFollowers?: number, maxFollowers?: number, keywords?: string, limit?: number }`
Returns: Matching creators with stats.

**4. get_org_kpis**
Input: `{ period: '7d' | '30d' | '90d' | 'ytd' | 'all' }`
Returns: Aggregated metrics from `OrgMetricRollup` for the period.

**5. list_creators**
Input: `{ platform?: Platform, limit?: number, offset?: number }`
Returns: Full creator roster.

**6. generate_report**
Input: `{ campaignId?: string, template: 'campaign_summary' | 'financial' | 'roi' | 'creator_performance', title: string }`
Creates a `Report` record, sets `isPublic = true`, returns `{ reportId, shareUrl }` where shareUrl = `{NEXTAUTH_URL}/r/{shareToken}/view`.

**7. send_payout**
Input: `{ creatorId: string, campaignId?: string, amount: number, currency: Currency, method: PaymentMethod, paypalEmail?: string }`
Requires `payouts:create` permission on the API key. Creates a `Payout` record with PENDING status.

**8. nl_query**
Input: `{ question: string }`
Delegates to `lib/ai/nlQuery.ts`. Returns `{ answer, data, intent }`.

The MCP route handler receives JSON-RPC 2.0 requests, routes to the correct tool, and returns JSON-RPC 2.0 responses.

Also implement `GET /api/mcp/manifest` — returns the MCP tool manifest JSON describing all 8 tools with their input schemas.

---

## 25. Bot Integrations

### Slack (`/api/slack/events`)

POST handler. Verify request signature using `SLACK_SIGNING_SECRET` (HMAC-SHA256 of request body with timestamp).

Handle `url_verification` challenge. Handle `app_mention` events and slash commands.

Commands:
- `/outreach campaigns [status]` — calls `list_campaigns` MCP tool, formats as Slack Block Kit
- `/outreach stats [campaign-name]` — finds campaign by title, calls `get_campaign_analytics`, formats as Block Kit section
- `/outreach pay [creator-handle]` — shows pending payout for that creator, with approve button
- `/outreach brief [campaign-name]` — calls `/api/ai/briefing`, returns AI-generated summary
- `/outreach ask [question]` — calls `/api/ai/query`, returns natural language answer

All responses use Slack Block Kit JSON format with sections, markdown text, and action buttons.

### Discord (`/api/discord/interactions`)

POST handler. Verify request signature using `DISCORD_PUBLIC_KEY` (Ed25519 signature verification).

Handle `PING` type (return `{ type: 1 }`). Handle `APPLICATION_COMMAND` type.

Mirror Slack commands as Discord slash commands:
- `/campaigns [status]`
- `/stats [campaign]`
- `/pay [creator]`
- `/brief [campaign]`
- `/ask [question]`

All responses use Discord embed format with color `0x5B5BD6` (the primary purple as decimal).

### Telegram (`/api/telegram/webhook`)

POST handler. Verify using `TELEGRAM_BOT_TOKEN`.

Handle `/start`, `/campaigns`, `/stats`, `/earnings`, `/ask [question]` commands.

Respond using Telegram Bot API `sendMessage` with `parse_mode: 'Markdown'`.

Commands:
- `/campaigns` — lists active campaigns
- `/stats` — org KPI summary
- `/earnings` — pending payout total for all creators
- `/ask [question]` — NL query

### WhatsApp (`/api/whatsapp/webhook`)

GET handler for webhook verification: check `hub.verify_token === WHATSAPP_VERIFY_TOKEN`, return `hub.challenge`.

POST handler for messages. Parse incoming message text. Handle keywords:
- `STATUS` — reply with active campaign count and latest KPIs
- `EARNINGS` — reply with pending payouts total
- Any other message — reply with help text listing available keywords

Send replies using WhatsApp Cloud API via `https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages` with Bearer token from `WHATSAPP_ACCESS_TOKEN`.

---

## 26. Creator Portal

The creator portal is a completely separate auth flow. Creators are **not** org users. They authenticate via magic link.

### Portal Auth Flow

**`POST /api/portal/auth/login`**
- Body: `{ email: string }`
- Find `CreatorAccount` by email
- Generate a random 32-byte hex token, store as `loginToken` + `loginTokenExp` (30 min)
- In dev: return token directly in response body (for testing). In prod: send via email.
- Response: `{ message: "Magic link sent" }`

**`GET /api/portal/auth/login?token=XXX`** (magic link click handler)
- Validate token and expiry
- Create a `CreatorSession` with 30-day expiry
- Set HttpOnly cookie `creator_portal_token` with session token
- Redirect to `/portal/dashboard`

**`GET /api/portal/auth/me`**
- Read cookie, look up `CreatorSession` → `CreatorAccount` → `Creator`
- Return creator info or 401

**`POST /api/portal/auth/logout`**
- Delete `CreatorSession`, clear cookie

### Portal Layout (`app/(portal)/layout.tsx`)
Minimal layout: simple top navbar with creator avatar + name + logout button. No org sidebar. Clean white background.

### Portal Pages

**`/portal/login`**
Simple centered card: "Creator Portal" heading, email input, "Send Magic Link" button. Shows success state after submission.

**`/portal/dashboard`**
Shows:
- Welcome message with creator name
- Stats row: Total Views, Total Earnings, Active Campaigns, Pending Invites
- Active Activations list (campaigns where creator has AWAITING_DRAFT or DRAFT_SUBMITTED status)
- Recent earnings table

**`/portal/campaigns`**
Two sections:
- "Your Campaigns" — campaigns creator is enrolled in (via activations)
- "Open Campaigns" — campaigns where `enrollmentOpen = true` and campaign type is OPEN_COMMUNITY. Shows "Apply to Join" button.

**`/portal/campaigns/[id]`**
Campaign detail for the creator's perspective:
- Campaign title, status, brief (read-only TipTap render of `CreativeBrief.content`)
- Activation status card with clear status indicator
- "Submit Draft" form (if status is AWAITING_DRAFT): URL input, notes textarea. POST to `/api/portal/activations/[id]/submit`
- "Your Post" section (if POSTED/COMPLETE): shows post URL and metrics

**`/portal/activations/[id]`**
If status is AWAITING_APPROVAL: shows submitted draft URL, "Approve" and "Decline" buttons (for creator to confirm their own submission). Updates via `/api/portal/activations/[id]`.

**`/portal/earnings`**
Table of all payouts for this creator: Amount | Status | Campaign | Method | Date. Summary stats at top: total earned, pending, last payment.

**`/portal/invites`**
List of pending `CampaignInvite` records for this creator. Each shows campaign name, message, expiry date. "Accept" and "Decline" buttons. POST to `/api/portal/invites/[id]/accept` or `/decline`.

**`/portal/profile`**
Creator profile editing: name, bio, contact email. Payment info section (PayPal email, bank details). Connected Social Accounts section — shows platforms linked via `CreatorSocialAccount`. "Connect" buttons for TikTok/Instagram/YouTube (these initiate OAuth flows via `/api/portal/social/connect/[platform]`).

### Portal API Routes

All portal API routes must:
1. Read `creator_portal_token` cookie
2. Look up `CreatorSession` (check `expires > now()`)
3. Load the `CreatorAccount` + `Creator`
4. Scope all data queries to that creator's `orgId` + `creatorId`

Implement all routes listed under `api/portal/*` in the route structure above.

---

## 27. Cron Jobs

### Job Runner (`/api/cron/minutely`)

Cron-triggered route (protect with `Authorization: Bearer {CRON_SECRET}` check).

On each call:
1. Find all `ScheduledJob` records where `status = PENDING` and `scheduledFor <= now()` and `attempts < maxAttempts`
2. For each job, set `status = RUNNING`, `startedAt = now()`
3. Dispatch to the appropriate handler based on `type`
4. On success: set `status = COMPLETED`, `completedAt = now()`
5. On failure: set `status = FAILED`, `failedAt = now()`, `error = errorMessage`, increment `attempts`. If `attempts < maxAttempts`, reset to `PENDING` with `scheduledFor = now() + 5 minutes`.

### Job Handlers

**`SYNC_POST_VIEWS`** (`/api/cron/sync-posts`): For each org, for each campaign post, simulate a view count update (in dev: add a random delta). Create a `PostMetricSnapshot`. Update `Post.viewsCount`. Check if `deltaViews / previousViews > viralThresholdPct` → create `PostAlert` if so.

**`SYNC_SOUND_TRACKER`** (`/api/cron/sync-sounds`): For each tracked sound, create a `SoundTrackerSnapshot` with simulated data. Compute `velocityScore` using EMA from `lib/analytics/viralDetection.ts`.

**`DAILY_TOP_POSTS`** (`/api/cron/daily`): Find top 5 posts by `viewsCount` updated in last 24h. Generate briefing via `lib/ai/briefings.ts`. Dispatch to all configured `OrgIntegration` channels.

**`WEEKLY_CREATOR_PERFORMANCE`** (`/api/cron/weekly`): Aggregate per-creator stats for the past 7 days. Generate weekly summary. Dispatch to channels.

**`ROLLUP_METRICS`** (`/api/cron/rollup-metrics`): Call `computeOrgMetricRollup` for all orgs for `periodType = 'daily'` with today's `periodStart`.

**`SEND_SCHEDULED_REPORTS`** (`/api/cron/send-scheduled-reports`): Find `ReportSchedule` where `isActive = true` and `nextRunAt <= now()`. For each: generate PDF, send via `resend` to `recipients`. Update `lastRunAt` and compute next `nextRunAt` based on frequency.

**`SNAPSHOT_CLEANUP`** (`/api/cron/snapshot-cleanup`): Delete `PostMetricSnapshot` records older than `org.snapshotRetentionDays`. Delete `SoundTrackerSnapshot` records older than 90 days.

---

## 28. Calendar Page (`/calendar`)

Deliverable timeline view.

**Month/Week toggle** at top.

**Month View:** Standard calendar grid. Days with deliverables show colored dot badges. Color = activation status.

**Week View:** Horizontal timeline. Each activation with a `deliverableDueDate` appears as a colored bar on the correct day.

Clicking a deliverable opens a popover: creator avatar, campaign name, status badge, posted URL (if available), quick status update dropdown.

**Filter:** Campaign select (show only that campaign's deliverables).

---

## 29. Discovery Page (`/discovery`)

AI-powered creator discovery.

**Search bar** (large, prominent): "Describe the creator you're looking for..." placeholder. E.g. "TikTok dancers with over 500K followers in the US"

Submit calls `POST /api/ai/discover-creators`.

**Results grid:** Same creator card format as the roster page. Each card has "Add to Roster" button (if not already in org) and "Add to Campaign" button (opens campaign select dialog).

**Filter sidebar:** Platform, follower range sliders, minimum engagement rate, sort by.

Shows loading skeleton (pulsing cards) while AI processes.

---

## 30. Connections Page (`/connections`)

B2B connections between organizations.

**My Connections** table: Org Name | Status | Share Roster | Share Campaigns | Connected Date | Actions (Disconnect)

**Pending Requests** section: Incoming connection requests with Accept/Decline buttons.

**Send Connection Request** button → dialog with: Target Org Subdomain input, Share Roster toggle, Share Campaigns toggle.

When a connection is active and `shareRoster = true`, the connected org can see your creator roster in their discovery page.

---

## 31. Seed Data (`prisma/seed.ts`)

Create this file and run it after `prisma db push`. Seed exactly this data:

```ts
// 1 Organization
const org = await prisma.organization.create({
  data: {
    name: "Demo Agency",
    brandName: "Demo Agency",
    subdomain: "demo",
    primaryColor: "#5B5BD6",
    currency: "USD",
    timezone: "America/New_York",
    snapshotIntervalHours: 6,
    snapshotRetentionDays: 90,
    viralThresholdPct: 0.10,
  }
})

// 1 OrgPlanConfig — Pro plan
await prisma.orgPlanConfig.create({
  data: {
    orgId: org.id,
    planName: "pro",
    maxCampaigns: 20,
    maxCreators: 500,
    maxUsers: 10,
    features: JSON.stringify(['ai_briefings','mcp_access','sound_tracker','creator_portal','bulk_payouts','pdf_export','xlsx_export','view_based_campaigns','open_community_campaigns','discord_integration','telegram_integration']),
  }
})

// 1 Admin user — email: admin@demo.com, password: admin123
const adminUser = await prisma.user.create({
  data: {
    orgId: org.id,
    email: "admin@demo.com",
    name: "Admin User",
    role: "OWNER",
    passwordHash: await bcrypt.hash("admin123", 12),
    isActive: true,
  }
})

// 3 Clients
const clients = await Promise.all([
  prisma.client.create({ data: { orgId: org.id, name: "Atlantic Records", planName: "enterprise" } }),
  prisma.client.create({ data: { orgId: org.id, name: "Universal Music", planName: "pro" } }),
  prisma.client.create({ data: { orgId: org.id, name: "Warner Music", planName: "pro" } }),
])

// 8 Creators — mix of TikTok + Instagram, 50K–2M followers
const creators = await Promise.all([
  prisma.creator.create({ data: { orgId: org.id, name: "Alex Rivera", handle: "@alexrivera", platform: "TIKTOK", followersCount: 2100000, averageViews: 850000, rate: 1500, contactEmail: "alex@creator.com", bio: "Lifestyle & music content creator" } }),
  prisma.creator.create({ data: { orgId: org.id, name: "Jordan Kim", handle: "@jordankim", platform: "TIKTOK", followersCount: 890000, averageViews: 340000, rate: 800, contactEmail: "jordan@creator.com", bio: "Dance & trending sounds" } }),
  prisma.creator.create({ data: { orgId: org.id, name: "Maya Chen", handle: "@mayachen", platform: "INSTAGRAM", followersCount: 650000, averageViews: 120000, rate: 600, contactEmail: "maya@creator.com", bio: "Fashion and beauty" } }),
  prisma.creator.create({ data: { orgId: org.id, name: "Sam Torres", handle: "@samtorres", platform: "TIKTOK", followersCount: 430000, averageViews: 200000, rate: 450, contactEmail: "sam@creator.com", bio: "Music reaction and covers" } }),
  prisma.creator.create({ data: { orgId: org.id, name: "Riley Patel", handle: "@rileypatel", platform: "INSTAGRAM", followersCount: 210000, averageViews: 45000, rate: 300, contactEmail: "riley@creator.com", bio: "Fitness and lifestyle" } }),
  prisma.creator.create({ data: { orgId: org.id, name: "Casey Morgan", handle: "@caseymorgan", platform: "YOUTUBE", followersCount: 180000, averageViews: 95000, rate: 400, contactEmail: "casey@creator.com", bio: "Music reviews and shorts" } }),
  prisma.creator.create({ data: { orgId: org.id, name: "Taylor Nguyen", handle: "@taylornguyen", platform: "TIKTOK", followersCount: 95000, averageViews: 38000, rate: 200, contactEmail: "taylor@creator.com", bio: "Comedy and music trends" } }),
  prisma.creator.create({ data: { orgId: org.id, name: "Drew Okafor", handle: "@drewokafor", platform: "TIKTOK", followersCount: 52000, averageViews: 21000, rate: 150, contactEmail: "drew@creator.com", bio: "Emerging music content" } }),
])

// 5 Campaigns — one of each type + one extra
const campaigns = await Promise.all([
  prisma.campaign.create({ data: { orgId: org.id, createdById: adminUser.id, clientId: clients[0].id, title: "Summer Hits 2025", status: "IN_PROGRESS", campaignType: "BUDGET_BASED", typeConfig: JSON.stringify({ ratePerPost: 500, currency: "USD", maxPosts: 20 }), budget: 10000, currency: "USD", notes: "Focus on Gen Z audience on TikTok" } }),
  prisma.campaign.create({ data: { orgId: org.id, createdById: adminUser.id, clientId: clients[1].id, title: "Viral Views Push Q3", status: "IN_PROGRESS", campaignType: "VIEW_BASED", typeConfig: JSON.stringify({ ratePerThousandViews: 2.5, capAmount: 5000, currency: "USD", trackingWindowDays: 30, minimumViewsForPayout: 10000 }), budget: 25000, currency: "USD" } }),
  prisma.campaign.create({ data: { orgId: org.id, createdById: adminUser.id, clientId: clients[2].id, title: "Community Sound Drop", status: "PENDING", campaignType: "OPEN_COMMUNITY", typeConfig: JSON.stringify({ selfEnrollDeadline: "2025-09-01T00:00:00Z", requiresApproval: true, maxCreators: 50, eligibilityCriteria: { minFollowers: 10000 } }), enrollmentOpen: true, budget: 8000 } }),
  prisma.campaign.create({ data: { orgId: org.id, createdById: adminUser.id, clientId: clients[0].id, title: "Exclusive Artist Collab", status: "DRAFT", campaignType: "PRIVATE_INVITE", typeConfig: JSON.stringify({ inviteMessage: "You've been selected for an exclusive collaboration.", responseDeadlineDays: 7, allowCounterOffer: true }), budget: 15000 } }),
  prisma.campaign.create({ data: { orgId: org.id, createdById: adminUser.id, clientId: clients[1].id, title: "Q2 Brand Awareness", status: "COMPLETE", campaignType: "BUDGET_BASED", typeConfig: JSON.stringify({ ratePerPost: 300, currency: "USD" }), budget: 6000, currency: "USD" } }),
])

// 10 Activations across campaigns
await Promise.all([
  prisma.activation.create({ data: { campaignId: campaigns[0].id, creatorId: creators[0].id, status: "POSTED", postedUrl: "https://tiktok.com/@alexrivera/video/123", deliverableDueDate: new Date("2025-07-15") } }),
  prisma.activation.create({ data: { campaignId: campaigns[0].id, creatorId: creators[1].id, status: "APPROVED", deliverableDueDate: new Date("2025-07-20") } }),
  prisma.activation.create({ data: { campaignId: campaigns[0].id, creatorId: creators[3].id, status: "AWAITING_DRAFT", deliverableDueDate: new Date("2025-07-25") } }),
  prisma.activation.create({ data: { campaignId: campaigns[1].id, creatorId: creators[0].id, status: "COMPLETE", postedUrl: "https://tiktok.com/@alexrivera/video/456" } }),
  prisma.activation.create({ data: { campaignId: campaigns[1].id, creatorId: creators[2].id, status: "POSTED", postedUrl: "https://instagram.com/p/abc123" } }),
  prisma.activation.create({ data: { campaignId: campaigns[1].id, creatorId: creators[4].id, status: "DRAFT_SUBMITTED", feedbackNotes: "Great content, needs minor edit" } }),
  prisma.activation.create({ data: { campaignId: campaigns[2].id, creatorId: creators[6].id, status: "AWAITING_APPROVAL" } }),
  prisma.activation.create({ data: { campaignId: campaigns[4].id, creatorId: creators[0].id, status: "COMPLETE", postedUrl: "https://tiktok.com/@alexrivera/video/789" } }),
  prisma.activation.create({ data: { campaignId: campaigns[4].id, creatorId: creators[1].id, status: "COMPLETE", postedUrl: "https://tiktok.com/@jordankim/video/321" } }),
  prisma.activation.create({ data: { campaignId: campaigns[4].id, creatorId: creators[5].id, status: "DECLINED" } }),
])

// 5 Payouts — mix of statuses
await Promise.all([
  prisma.payout.create({ data: { orgId: org.id, creatorId: creators[0].id, campaignId: campaigns[0].id, amount: 1500, currency: "USD", status: "SUCCESS", paymentMethod: "PAYPAL", recipientPaypalEmail: "alex@paypal.com", transactionId: "PAY-001", completedAt: new Date() } }),
  prisma.payout.create({ data: { orgId: org.id, creatorId: creators[1].id, campaignId: campaigns[0].id, amount: 800, currency: "USD", status: "PROCESSING", paymentMethod: "PAYPAL", recipientPaypalEmail: "jordan@paypal.com" } }),
  prisma.payout.create({ data: { orgId: org.id, creatorId: creators[0].id, campaignId: campaigns[1].id, amount: 2500, currency: "USD", status: "SUCCESS", paymentMethod: "BANK_TRANSFER", transactionId: "BANK-002", completedAt: new Date() } }),
  prisma.payout.create({ data: { orgId: org.id, creatorId: creators[2].id, campaignId: campaigns[1].id, amount: 600, currency: "USD", status: "PENDING", paymentMethod: "PAYPAL", recipientPaypalEmail: "maya@paypal.com" } }),
  prisma.payout.create({ data: { orgId: org.id, creatorId: creators[3].id, campaignId: campaigns[4].id, amount: 450, currency: "USD", status: "FAILED", paymentMethod: "PAYPAL", failureReason: "Invalid PayPal email address" } }),
])

// 3 Creator Lists
const lists = await Promise.all([
  prisma.creatorList.create({ data: { orgId: org.id, name: "TikTok Tier 1", description: "Top performing TikTok creators" } }),
  prisma.creatorList.create({ data: { orgId: org.id, name: "Instagram Partners", description: "Instagram creator partnerships" } }),
  prisma.creatorList.create({ data: { orgId: org.id, name: "Emerging Talent", description: "Creators to watch — under 200K followers" } }),
])

// Add creators to lists
await Promise.all([
  prisma.creatorListItem.create({ data: { listId: lists[0].id, creatorId: creators[0].id } }),
  prisma.creatorListItem.create({ data: { listId: lists[0].id, creatorId: creators[1].id } }),
  prisma.creatorListItem.create({ data: { listId: lists[0].id, creatorId: creators[3].id } }),
  prisma.creatorListItem.create({ data: { listId: lists[1].id, creatorId: creators[2].id } }),
  prisma.creatorListItem.create({ data: { listId: lists[1].id, creatorId: creators[4].id } }),
  prisma.creatorListItem.create({ data: { listId: lists[2].id, creatorId: creators[6].id } }),
  prisma.creatorListItem.create({ data: { listId: lists[2].id, creatorId: creators[7].id } }),
])

// 3 TikTok Sounds being tracked
const sounds = await Promise.all([
  prisma.tikTokSound.create({ data: { orgId: org.id, tiktokSoundId: "7291234567890", title: "Flowers (Remix)", artist: "Miley Cyrus", trackedSince: new Date() } }),
  prisma.tikTokSound.create({ data: { orgId: org.id, tiktokSoundId: "7291234567891", title: "As It Was", artist: "Harry Styles", trackedSince: new Date() } }),
  prisma.tikTokSound.create({ data: { orgId: org.id, tiktokSoundId: "7291234567892", title: "Unholy", artist: "Sam Smith", trackedSince: new Date() } }),
])

// Seed SoundTrackerSnapshots for charts (7 days of data per sound)
for (const sound of sounds) {
  let uses = Math.floor(Math.random() * 50000) + 10000
  for (let i = 7; i >= 0; i--) {
    const delta = Math.floor(Math.random() * 2000) + 100
    uses += delta
    const dt = new Date()
    dt.setDate(dt.getDate() - i)
    await prisma.soundTrackerSnapshot.create({
      data: { soundId: sound.id, usesCount: uses, videosAdded24h: delta, deltaUses24h: delta, velocityScore: delta / uses, recordedAt: dt }
    })
  }
}

// Seed Posts with metric snapshots
const post1 = await prisma.post.create({
  data: { campaignId: campaigns[0].id, creatorId: creators[0].id, platform: "TIKTOK", platformPostId: "tt_001", postUrl: "https://tiktok.com/@alexrivera/video/123", viewsCount: 1250000, likesCount: 89000, commentsCount: 4500, sharesCount: 12000, engagementRate: 8.4, postedAt: new Date(Date.now() - 7 * 86400000) }
})
// Add 7 days of snapshots for the post
for (let i = 7; i >= 0; i--) {
  const dt = new Date(Date.now() - i * 86400000)
  await prisma.postMetricSnapshot.create({
    data: { postId: post1.id, viewsCount: Math.floor(1250000 * (1 - i * 0.08)), likesCount: Math.floor(89000 * (1 - i * 0.08)), commentsCount: Math.floor(4500 * (1 - i * 0.08)), sharesCount: Math.floor(12000 * (1 - i * 0.08)), engagementRate: 8.4, recordedAt: dt }
  })
}

// Seed OrgMetricRollups for the last 30 days
for (let i = 30; i >= 0; i--) {
  const dt = new Date()
  dt.setDate(dt.getDate() - i)
  dt.setHours(0, 0, 0, 0)
  await prisma.orgMetricRollup.upsert({
    where: { orgId_periodType_periodStart: { orgId: org.id, periodType: 'daily', periodStart: dt } },
    create: { orgId: org.id, periodType: 'daily', periodStart: dt, totalViews: Math.floor(Math.random() * 500000) + 100000, totalLikes: Math.floor(Math.random() * 40000) + 5000, totalPosts: Math.floor(Math.random() * 8) + 1, totalCreators: Math.floor(Math.random() * 5) + 2, totalSpend: Math.random() * 2000 + 200, totalPayouts: Math.random() * 1500 + 100, campaignCount: 3, platformBreakdown: JSON.stringify({ TIKTOK: 0.65, INSTAGRAM: 0.25, YOUTUBE: 0.10 }) },
    update: {}
  })
}

// Seed a PayoutBalance for the org
await prisma.payoutBalance.create({
  data: { orgId: org.id, label: "Main Balance", currentBalance: 45000, currency: "USD" }
})

// Seed OrgJobSchedules
for (const [jobType, cron] of [
  ['DAILY_TOP_POSTS', '0 6 * * *'],
  ['DAILY_CAMPAIGN_VELOCITY', '0 7 * * *'],
  ['WEEKLY_CREATOR_PERFORMANCE', '0 7 * * 1'],
  ['WEEKLY_EARNINGS_PENDING', '0 8 * * 1'],
  ['SYNC_POST_VIEWS', '0 */6 * * *'],
  ['SYNC_SOUND_TRACKER', '0 */12 * * *'],
]) {
  await prisma.orgJobSchedule.create({
    data: { orgId: org.id, jobType: jobType as any, cronExpression: cron, enabled: true, recipients: JSON.stringify(['admin@demo.com']), config: JSON.stringify({}) }
  })
}

console.log('Seed complete. Login: admin@demo.com / admin123')
```

---

## 32. Full Route Structure

Create all of these files. Build stubs for any route not detailed above so the app compiles without errors.

**API Routes:**
```
app/api/auth/[...nextauth]/route.ts
app/api/auth/register/route.ts
app/api/invites/route.ts
app/api/invites/accept/route.ts
app/api/invites/[token]/route.ts
app/api/campaigns/route.ts
app/api/campaigns/[id]/route.ts
app/api/campaigns/[id]/invites/route.ts
app/api/campaigns/[id]/enroll/route.ts
app/api/campaigns/[id]/view-ledger/route.ts
app/api/creators/route.ts
app/api/creators/[id]/route.ts
app/api/clients/route.ts
app/api/clients/[id]/route.ts
app/api/payouts/route.ts
app/api/payouts/[id]/route.ts
app/api/payouts/bulk/route.ts
app/api/activations/route.ts
app/api/activations/[id]/route.ts
app/api/lists/route.ts
app/api/lists/[id]/route.ts
app/api/lists/[id]/creators/route.ts
app/api/audit-logs/route.ts
app/api/audit-logs/export/route.ts
app/api/analytics/org/route.ts
app/api/analytics/campaigns/[id]/route.ts
app/api/analytics/creators/[id]/route.ts
app/api/analytics/sounds/route.ts
app/api/dashboard/layout/route.ts
app/api/reports/route.ts
app/api/reports/[id]/route.ts
app/api/reports/[id]/generate/pdf/route.ts
app/api/reports/[id]/generate/xlsx/route.ts
app/api/reports/[id]/schedule/route.ts
app/api/r/[token]/route.ts
app/api/mcp/route.ts
app/api/mcp/manifest/route.ts
app/api/ai/briefing/route.ts
app/api/ai/query/route.ts
app/api/ai/discover-creators/route.ts
app/api/sync/posts/route.ts
app/api/sync/sounds/route.ts
app/api/plans/route.ts
app/api/plans/[id]/route.ts
app/api/tenant/config/route.ts
app/api/portal/auth/login/route.ts
app/api/portal/auth/logout/route.ts
app/api/portal/auth/me/route.ts
app/api/portal/dashboard/route.ts
app/api/portal/campaigns/route.ts
app/api/portal/campaigns/[id]/route.ts
app/api/portal/invites/route.ts
app/api/portal/invites/[id]/accept/route.ts
app/api/portal/invites/[id]/decline/route.ts
app/api/portal/activations/[id]/route.ts
app/api/portal/activations/[id]/submit/route.ts
app/api/portal/earnings/route.ts
app/api/portal/profile/route.ts
app/api/portal/social/connect/[platform]/route.ts
app/api/portal/social/callback/[platform]/route.ts
app/api/slack/events/route.ts
app/api/discord/interactions/route.ts
app/api/telegram/webhook/route.ts
app/api/whatsapp/webhook/route.ts
app/api/cron/minutely/route.ts
app/api/cron/sync-posts/route.ts
app/api/cron/sync-sounds/route.ts
app/api/cron/rollup-metrics/route.ts
app/api/cron/daily/route.ts
app/api/cron/weekly/route.ts
app/api/cron/send-scheduled-reports/route.ts
app/api/cron/snapshot-cleanup/route.ts
```

**Page Routes:**
```
app/(auth)/login/page.tsx
app/(auth)/signup/page.tsx
app/(auth)/accept-invite/page.tsx
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/campaigns/page.tsx
app/(dashboard)/campaigns/[id]/page.tsx
app/(dashboard)/creators/page.tsx
app/(dashboard)/creators/[id]/page.tsx
app/(dashboard)/clients/page.tsx
app/(dashboard)/clients/[id]/page.tsx
app/(dashboard)/payouts/page.tsx
app/(dashboard)/activations/page.tsx
app/(dashboard)/lists/page.tsx
app/(dashboard)/lists/[id]/page.tsx
app/(dashboard)/discovery/page.tsx
app/(dashboard)/calendar/page.tsx
app/(dashboard)/trackers/page.tsx
app/(dashboard)/requests/page.tsx
app/(dashboard)/recipients/page.tsx
app/(dashboard)/connections/page.tsx
app/(dashboard)/fan-pages/page.tsx
app/(dashboard)/audit-log/page.tsx
app/(dashboard)/admin/page.tsx
app/(dashboard)/plans/page.tsx
app/(dashboard)/plans/new/page.tsx
app/(dashboard)/plans/[id]/page.tsx
app/(dashboard)/settings/team/page.tsx
app/(dashboard)/settings/billing/page.tsx
app/(dashboard)/settings/api-keys/page.tsx
app/(dashboard)/settings/integrations/page.tsx
app/(dashboard)/settings/briefings/page.tsx
app/(dashboard)/settings/org/page.tsx
app/(analytics)/analytics/page.tsx
app/(analytics)/analytics/campaigns/[id]/page.tsx
app/(analytics)/analytics/creators/page.tsx
app/(analytics)/analytics/sounds/page.tsx
app/(portal)/portal/login/page.tsx
app/(portal)/portal/dashboard/page.tsx
app/(portal)/portal/campaigns/page.tsx
app/(portal)/portal/campaigns/[id]/page.tsx
app/(portal)/portal/activations/[id]/page.tsx
app/(portal)/portal/earnings/page.tsx
app/(portal)/portal/invites/page.tsx
app/(portal)/portal/profile/page.tsx
app/(public)/r/[token]/view/page.tsx
```

---

## 33. Shared Components to Build

Build these reusable components in `components/`:

**Layout:**
- `components/layout/Sidebar.tsx`
- `components/layout/Topbar.tsx`
- `components/layout/PageHeader.tsx` — title + subtitle + right-side actions slot

**UI Primitives:**
- `components/ui/StatCard.tsx` — metric label, large value, delta badge with arrow
- `components/ui/EmptyState.tsx` — icon, heading, subtext, optional CTA button
- `components/ui/LoadingSkeleton.tsx` — configurable skeleton shapes (card, table row, text)
- `components/ui/ErrorCard.tsx` — error message + retry button
- `components/ui/ConfirmDialog.tsx` — shadcn Dialog with confirm/cancel for destructive actions
- `components/ui/PlatformBadge.tsx` — TikTok/Instagram/YouTube icon + label badge

**Campaign:**
- `components/campaigns/CampaignCard.tsx`
- `components/campaigns/CampaignStatusBadge.tsx`
- `components/campaigns/CreateCampaignDialog.tsx`
- `components/campaigns/tabs/OverviewTab.tsx`
- `components/campaigns/tabs/PostsTab.tsx`
- `components/campaigns/tabs/CreatorsTab.tsx`
- `components/campaigns/tabs/AnalyticsTab.tsx`
- `components/campaigns/tabs/FinancialsTab.tsx`
- `components/campaigns/tabs/DocumentsTab.tsx`
- `components/campaigns/tabs/SettingsTab.tsx`

**Creators:**
- `components/creators/CreatorCard.tsx`
- `components/creators/CreatorTableRow.tsx`
- `components/creators/AddCreatorDialog.tsx`

**Analytics:**
- `components/analytics/ViewsOverTimeChart.tsx`
- `components/analytics/PlatformBreakdownChart.tsx`
- `components/analytics/CreatorPerformanceChart.tsx`
- `components/analytics/SoundSparkline.tsx`

**Payouts:**
- `components/payouts/PayoutStatusBadge.tsx`
- `components/payouts/InitiatePayoutDialog.tsx`

---

## 34. IAM — Permission Enforcement

On every API route that mutates data:
1. Get the session with `auth()` from NextAuth
2. Load the user's `role` and `permissionOverrides` from the database
3. Call `resolvePermissions(role, JSON.parse(permissionOverrides))` to get the effective permission set
4. Call `hasPermission(permissions, 'required:permission')` — return 403 if false
5. Call `logAudit(...)` for every successful mutation

Example pattern for every POST/PUT/DELETE API route:
```ts
const session = await auth()
if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
const user = await prisma.user.findUnique({ where: { id: session.user.id } })
const perms = resolvePermissions(user.role, JSON.parse(user.permissionOverrides))
if (!hasPermission(perms, 'campaigns:create')) {
  return Response.json({ error: 'Forbidden' }, { status: 403 })
}
```

All queries must include an `orgId` filter scoped to `session.user.orgId` to prevent cross-tenant data access.

---

## 35. Campaign Type Business Logic

When a creator submits a post and it reaches COMPLETE status, the payout calculator runs:

**BUDGET_BASED:** Count creator's COMPLETE activations in the campaign. Multiply by `typeConfig.ratePerPost`. Create Payout record with PENDING status.

**VIEW_BASED:** Sum all `ViewLedger` records for `creatorId` + `campaignId` where `lockedForPayout = false` and `snapshotAt` is within `typeConfig.trackingWindowDays` of the post's `postedAt`. Run `calculateViewBasedPayout`. If above minimum, create Payout with calculated amount. Mark ViewLedger rows as `lockedForPayout = true`.

**OPEN_COMMUNITY** (with `requiresApproval = true`): When creator self-enrolls, create Activation with `AWAITING_APPROVAL`. Manager must change status to APPROVED for the creator to proceed. Follow BUDGET_BASED payout logic after.

**PRIVATE_INVITE:** Manager creates `CampaignInvite` for a specific creator. Creator accepts/declines from portal. If accepted, Activation is created with AWAITING_DRAFT. Follow BUDGET_BASED payout logic.

---

## 36. Final Verification Checklist

After building everything, verify each of these:

**Auth:**
- [ ] Can register a new org at `/signup`
- [ ] Can log in at `/login` with admin@demo.com / admin123
- [ ] Unauthenticated requests to `/dashboard` redirect to `/login`
- [ ] Creator portal at `/portal/login` works with magic link flow (token returned in response for dev)
- [ ] RBAC blocks VIEWER from accessing payouts routes (403 response)

**Core CRUD:**
- [ ] Can create, edit, and soft-delete a campaign
- [ ] Can add a creator and assign to a campaign
- [ ] Can update activation status
- [ ] Can initiate a payout
- [ ] Can upload a document to a campaign
- [ ] Can add a comment to a campaign

**UI States:**
- [ ] All data pages show loading skeleton while fetching
- [ ] All data pages show EmptyState when no data exists
- [ ] All data pages show ErrorCard when API returns an error
- [ ] All forms show validation errors inline (react-hook-form)
- [ ] All mutations show sonner toast on success and error

**Analytics:**
- [ ] Dashboard KPI cards show correct numbers from seed data
- [ ] Analytics page loads all 8 widgets
- [ ] Charts render without error (check for empty data edge cases)
- [ ] DashboardLayout preferences persist after page refresh

**Campaign Detail Tabs:**
- [ ] All 7 tabs render on `/campaigns/[id]`
- [ ] TipTap editor in Overview tab saves on blur
- [ ] Posts tab shows metric data and allows sync
- [ ] Analytics tab charts show data from CampaignMetricRollup
- [ ] Financials tab shows budget vs spend donut chart
- [ ] Documents tab allows file upload

**MCP:**
- [ ] `POST /api/mcp` with valid Bearer token returns tool list
- [ ] `list_campaigns` tool returns campaign data
- [ ] Invalid Bearer token returns 401

**Bots:**
- [ ] `/api/slack/events` returns 200 for url_verification challenge
- [ ] `/api/discord/interactions` returns `{ type: 1 }` for PING
- [ ] `/api/telegram/webhook` handles `/campaigns` command
- [ ] `/api/whatsapp/webhook` GET returns hub.challenge

**Creator Portal:**
- [ ] `/portal/login` accepts email and returns magic link token
- [ ] `/portal/dashboard` shows creator's campaigns and earnings
- [ ] Creator can submit a draft post URL

**Cron:**
- [ ] `GET /api/cron/minutely` with correct CRON_SECRET header runs without error
- [ ] ScheduledJob records are processed and status updated

**Reports:**
- [ ] Can create a report and download as PDF
- [ ] Can create a report and download as Excel
- [ ] Public share URL at `/r/[token]/view` shows report without login

**Design System:**
- [ ] No hardcoded hex colors anywhere in the codebase (search for `#` in TSX/CSS files — only var(--cc-*) references should exist outside globals.css and tailwind.config.ts)
- [ ] All spacing is in multiples of 4px
- [ ] Light theme is consistent across all pages
- [ ] Mobile responsive (sidebar collapses to hamburger on screens < 768px)

---

Build the complete system now. Start with Phase 1 (scaffold + schema + seed) and proceed through all 26 phases in order. The app must be fully functional and runnable with `cd webapp && PORT=3009 npm run dev` followed by `npm run db:push && npm run db:seed`.