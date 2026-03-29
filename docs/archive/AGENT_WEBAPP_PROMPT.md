You are building a full-stack SaaS web application — a clone of CreatorCore (influencer campaign management platform).

## PROJECT SETUP

Working directory: ~/Documents/Repositories/creatorcore-clone/webapp/

Initialize a Next.js 14 project:
```bash
cd ~/Documents/Repositories/creatorcore-clone/webapp
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

Install all dependencies:
```bash
npm install @prisma/client prisma
npm install next-auth@beta @auth/prisma-adapter
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install zustand
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-underline @tiptap/extension-link
npm install recharts
npm install framer-motion
npm install lucide-react
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-avatar @radix-ui/react-badge
npm install date-fns
npm install zod
npm install react-hook-form @hookform/resolvers
npx shadcn@latest init -y
npx shadcn@latest add button input label card dialog dropdown-menu select tabs avatar badge toast separator
npx prisma init
```

## TASK 1: Complete Prisma Schema

Create the FULL database schema in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  OWNER
  MANAGER
  VIEWER
}

enum CampaignStatus {
  DRAFT
  PENDING
  IN_PROGRESS
  COMPLETE
  CANCELLED
}

enum Platform {
  TIKTOK
  INSTAGRAM
  YOUTUBE
  TWITTER
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

model Organization {
  id             String   @id @default(cuid())
  name           String
  subdomain      String   @unique
  logoUrl        String?
  primaryColor   String   @default("#4F46E5")
  currency       Currency @default(USD)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  users          User[]
  campaigns      Campaign[]
  creators       Creator[]
  creatorLists   CreatorList[]
  clients        Client[]
  folders        Folder[]
  payoutBalances PayoutBalance[]
  payouts        Payout[]
  tiktokSounds   TikTokSound[]
  connections    Connection[] @relation("FromOrg")
  connectionsTo  Connection[] @relation("ToOrg")
}

model User {
  id        String   @id @default(cuid())
  orgId     String
  email     String   @unique
  name      String
  avatarUrl String?
  role      UserRole @default(VIEWER)
  createdAt DateTime @default(now())

  org              Organization        @relation(fields: [orgId], references: [id])
  campaignMembers  CampaignTeamMember[]
  comments         CampaignComment[]
  activityLogs     ActivityLog[]
  documents        Document[]
  briefsUpdated    CreativeBrief[]
}

model Campaign {
  id          String         @id @default(cuid())
  orgId       String
  title       String
  status      CampaignStatus @default(DRAFT)
  thumbnailUrl String?
  budget      Decimal?       @db.Decimal(10, 2)
  currency    Currency       @default(USD)
  notes       String?        @db.Text
  clientId    String?
  folderId    String?
  createdById String
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  deletedAt   DateTime?

  org         Organization   @relation(fields: [orgId], references: [id])
  client      Client?        @relation(fields: [clientId], references: [id])
  folder      Folder?        @relation(fields: [folderId], references: [id])
  teamMembers CampaignTeamMember[]
  tags        CampaignTag[]
  posts       Post[]
  activations Activation[]
  brief       CreativeBrief?
  analytics   AnalyticsModule[]
  financials  CampaignFinancials?
  documents   Document[]
  comments    CampaignComment[]
  activityLogs ActivityLog[]
  payouts     Payout[]
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

  campaign Campaign @relation(fields: [campaignId], references: [id])

  @@id([campaignId, tag])
}

model CreativeBrief {
  id          String   @id @default(cuid())
  campaignId  String   @unique
  content     Json
  version     Int      @default(1)
  updatedById String?
  updatedAt   DateTime @updatedAt

  campaign  Campaign @relation(fields: [campaignId], references: [id])
  updatedBy User?    @relation(fields: [updatedById], references: [id])
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
  bio            String?  @db.Text
  contactEmail   String?
  paymentInfo    Json?
  rate           Decimal? @db.Decimal(10, 2)
  notes          String?  @db.Text
  addedAt        DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  org         Organization @relation(fields: [orgId], references: [id])
  listItems   CreatorListItem[]
  activations Activation[]
  posts       Post[]
  payouts     Payout[]
}

model CreatorList {
  id          String   @id @default(cuid())
  orgId       String
  name        String
  description String?  @db.Text
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
  id               String           @id @default(cuid())
  campaignId       String
  creatorId        String
  status           ActivationStatus @default(AWAITING_DRAFT)
  deliverableDueDate DateTime?
  postedUrl        String?
  feedbackNotes    String?          @db.Text
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  deletedAt        DateTime?

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
  caption        String?  @db.Text
  postedAt       DateTime

  viewsCount      Int     @default(0)
  likesCount      Int     @default(0)
  commentsCount   Int     @default(0)
  sharesCount     Int     @default(0)
  downloadsCount  Int     @default(0)
  engagementRate  Decimal @default(0) @db.Decimal(5, 4)

  lastSyncedAt DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  campaign Campaign @relation(fields: [campaignId], references: [id])
  creator  Creator  @relation(fields: [creatorId], references: [id])
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

  org       Organization          @relation(fields: [orgId], references: [id])
  snapshots SoundTrackerSnapshot[]
}

model SoundTrackerSnapshot {
  id            String   @id @default(cuid())
  soundId       String
  usesCount     Int
  videosAdded24h Int     @default(0)
  recordedAt    DateTime @default(now())

  sound TikTokSound @relation(fields: [soundId], references: [id])
}

model Client {
  id          String   @id @default(cuid())
  orgId       String
  name        String
  logoUrl     String?
  contactInfo Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  org       Organization @relation(fields: [orgId], references: [id])
  campaigns Campaign[]
}

model AnalyticsModule {
  id         String  @id @default(cuid())
  campaignId String
  type       String
  title      String
  config     Json
  position   Int     @default(0)
  createdAt  DateTime @default(now())

  campaign Campaign @relation(fields: [campaignId], references: [id])
}

model CampaignFinancials {
  id          String   @id @default(cuid())
  campaignId  String   @unique
  totalBudget Decimal  @default(0) @db.Decimal(10, 2)
  spentAmount Decimal  @default(0) @db.Decimal(10, 2)
  notes       String?  @db.Text
  updatedAt   DateTime @updatedAt

  campaign Campaign @relation(fields: [campaignId], references: [id])
}

model Payout {
  id                   String        @id @default(cuid())
  orgId                String
  creatorId            String
  campaignId           String?
  amount               Decimal       @db.Decimal(10, 2)
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
  currentBalance Decimal  @default(0) @db.Decimal(10, 2)
  currency       Currency @default(USD)
  updatedAt      DateTime @updatedAt

  org Organization @relation(fields: [orgId], references: [id])
}

model Document {
  id         String   @id @default(cuid())
  campaignId String
  name       String
  fileUrl    String
  fileSize   Int
  mimeType   String
  uploadedById String
  uploadedAt DateTime @default(now())

  campaign   Campaign @relation(fields: [campaignId], references: [id])
  uploadedBy User     @relation(fields: [uploadedById], references: [id])
}

model ActivityLog {
  id         String   @id @default(cuid())
  campaignId String
  userId     String?
  action     String
  metadata   Json?
  createdAt  DateTime @default(now())

  campaign Campaign @relation(fields: [campaignId], references: [id])
  user     User?    @relation(fields: [userId], references: [id])
}

model CampaignComment {
  id         String   @id @default(cuid())
  campaignId String
  userId     String
  content    String   @db.Text
  createdAt  DateTime @default(now())
  updatedAt  DateTime?
  deletedAt  DateTime?

  campaign Campaign @relation(fields: [campaignId], references: [id])
  user     User     @relation(fields: [userId], references: [id])
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

model Connection {
  id           String   @id @default(cuid())
  fromOrgId    String
  toOrgId      String
  status       String   @default("pending")
  shareRoster  Boolean  @default(false)
  shareCampaigns Boolean @default(false)
  createdAt    DateTime @default(now())
  acceptedAt   DateTime?

  fromOrg Organization @relation("FromOrg", fields: [fromOrgId], references: [id])
  toOrg   Organization @relation("ToOrg", fields: [toOrgId], references: [id])
}
```

## TASK 2: Project Structure Setup

Create this folder structure with placeholder files:

```
webapp/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← Dashboard layout with sidebar
│   │   ├── dashboard/page.tsx  ← Default redirect
│   │   ├── campaigns/
│   │   │   ├── page.tsx        ← Campaign list
│   │   │   └── [id]/
│   │   │       └── page.tsx    ← Campaign detail
│   │   ├── creators/page.tsx
│   │   ├── lists/page.tsx
│   │   ├── activations/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── trackers/page.tsx
│   │   ├── discovery/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── payouts/page.tsx
│   │   ├── requests/page.tsx
│   │   └── connections/page.tsx
│   ├── api/
│   │   ├── campaigns/route.ts
│   │   ├── campaigns/[id]/route.ts
│   │   ├── creators/route.ts
│   │   └── auth/[...nextauth]/route.ts
│   ├── layout.tsx
│   └── page.tsx  (redirect to /dashboard)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   └── DashboardLayout.tsx
│   ├── campaigns/
│   │   ├── CampaignList.tsx
│   │   ├── CampaignCard.tsx
│   │   ├── CampaignDetail.tsx
│   │   └── NewCampaignDialog.tsx
│   └── ui/   (shadcn components here)
├── lib/
│   ├── db.ts      ← Prisma client singleton
│   ├── auth.ts    ← NextAuth config
│   └── utils.ts   ← cn() helper
├── types/
│   └── index.ts   ← TypeScript types
└── prisma/
    └── schema.prisma
```

## TASK 3: Build Core Components

### 3a. Sidebar (components/layout/Sidebar.tsx)
Build the sidebar matching CreatorCore's design:
- Dark deep blue background (#1e1b4b or similar dark indigo)
- Logo at top: "CreatorCore" with icon
- Navigation sections:
  - **Campaigns & Reporting**: Campaigns, Activations, Calendar
  - **Clients**: Clients, Fan Pages (BETA badge), Trackers (BETA badge)
  - **Creators & Pitching**: Discovery (BETA), Creators, Lists
  - **Financial**: Payouts, Requests, Recipients
  - **Settings**: Connections
- User profile at bottom (avatar + name + notification bell)
- Active state styling
- Hover effects

### 3b. Campaign List Page (app/(dashboard)/campaigns/page.tsx)
- Header: "Campaigns" title + count
- Status filter tabs: All | In Progress | Pending | Complete | Cancelled
- Search input
- Filter button + Folders button
- "New Campaign +" button
- Campaign cards list:
  - Thumbnail
  - Title
  - Status badge
  - Budget
  - Creators count + Posts count
  - Last updated
  - Team member avatars

### 3c. Campaign APIs (app/api/campaigns/route.ts)
- GET: list campaigns (with filters, pagination)
- POST: create campaign

### 3d. Lib files
- `lib/db.ts`: Prisma client singleton
- `lib/utils.ts`: `cn()` from tailwind-merge + clsx

## IMPORTANT INSTRUCTIONS
1. Use TypeScript everywhere — no `any` types
2. All components should be Server Components where possible
3. Use Tailwind utility classes — no inline styles
4. Build proper, production-ready code
5. Run `npm run build` at the end to verify no errors

## ENV SETUP
Create `.env.local`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/creatorcore"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

When completely finished, run this command to notify:
openclaw system event --text "Done: CreatorCore webapp foundation built! Prisma schema + sidebar + campaign list complete. Check ~/Documents/Repositories/creatorcore-clone/webapp/" --mode now
