# Outreach AI — Claude Context

## What This Is
Multi-tenant influencer campaign SaaS for music labels and talent agencies.
Monorepo: `webapp/` (Next.js 16 app) + `landing/` (marketing site).

## Stack
- Next.js 16 App Router, TypeScript, Tailwind v4
- Prisma 7 + PostgreSQL (Neon)
- NextAuth v5 + @auth/prisma-adapter
- `@pratham7711/ui` component library

## Run Commands
```bash
cd webapp && PORT=3009 npm run dev   # → http://localhost:3009
cd landing && npm run dev            # → http://localhost:3000
```
Login: admin@demo.com / admin123

## Key Docs (read these, not this file)
- `docs/DEV_RULES.md` — session rules, token-saving, testing mandate
- `docs/DECISIONS.md` — all architecture decisions and why
- `webapp/CURRENT_TASK.md` — what to build right now
- `webapp/PROGRESS.md` — what's been completed

## Reference Repo
`/Users/pratham/Documents/Repositories/outlierai/backend/server.py` — business logic spec for all features. Read this when implementing any API route.

## Design Rules (always follow)
1. Use `@pratham7711/ui` components first — Button, Card, Badge, StatCard, Input, Avatar, EmptyState, Modal, Tag, Tooltip, Skeleton
2. CSS variables only — `var(--cc-*)` tokens, never hardcode colors
3. 8px spacing grid — all spacing multiples of 4 or 8
4. Every page needs loading, empty, and error states
5. Server Components by default — `"use client"` only when needed
6. Every API route: `await auth()` first, orgId from session only, never from request body

## Testing (mandatory)
Every feature ships with: unit test + integration test + E2E test.
See `docs/DEV_RULES.md` for the full testing checklist.
