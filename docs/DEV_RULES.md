# Outreach AI — Developer Rules & Workflow
> Read this before every session. Follow it exactly.

---

## The 4 Laws (Never Break These)

1. **One session = one atomic task.** Never combine planning + implementation. Never build two features in one session.
2. **Every session starts with `CURRENT_TASK.md`.** Never start by asking Claude to explore. Open the file, read it, do what it says.
3. **Every session ends with a commit + updated `CURRENT_TASK.md`.** Never close a session without saving state.
4. **Every feature ships with tests.** No exceptions. A feature without tests is not done.

---

## Account Roles

| Account | Purpose | Token budget |
|---|---|---|
| **Account A** | Planning, architecture debates, spinning agent teams, decisions | Heavy — use freely |
| **Account B** | Implementation only — writes code, runs tests, commits | Lean — protect aggressively |

**Account B should NEVER be asked to:**
- Explore the codebase broadly
- Debate architecture
- Read files it doesn't need for the current task
- Plan multiple future tasks

---

## Starting a Session (Account B — Implementation)

### Copy-paste template:
```
Working dir: /Users/pratham/Documents/Repositories/outlier-ai/webapp
Read CURRENT_TASK.md. Implement exactly what the "Next" section says.
Reference files listed under "Context Files" only.
If you need outlierai business logic, read: /Users/pratham/Documents/Repositories/outlierai/backend/server.py
Do not read anything else until you need it. Commit when done. Update CURRENT_TASK.md.
```

### What you provide in the prompt:
- The task name (from CURRENT_TASK.md)
- Max 3 specific file paths relevant to the task
- One sentence of context if needed

### What you do NOT say:
- ❌ "Understand the project structure"
- ❌ "Look around and figure out where to add X"
- ❌ "Continue building the app"
- ❌ "What should I work on next?"

---

## Ending a Session

Before closing ANY session, make sure Claude has:

1. ✅ Committed all changes (`git add [specific files] && git commit -m "feat: ..."`)
2. ✅ Updated `CURRENT_TASK.md`:
   ```markdown
   ## Completed: [what just got done]
   ## Next: [exact one-line description of next task]
   ## Context Files: [2-3 files the next session needs]
   ## Blocker: [anything pending or None]
   ```
3. ✅ Run relevant tests (`npm run test:unit` or `npm run test:integration`)

If session ends before commit — run `git stash`, note stash in CURRENT_TASK.md.

---

## Token-Saving Rules

### Rule 1 — Surgical prompts only
Never ask Claude to read a file unless it's directly needed for the task.
Bad: `"Look at the campaigns page and understand how it works, then add X"`
Good: `"In app/(dashboard)/campaigns/page.tsx line 45, add X. The data comes from /api/campaigns."`

### Rule 2 — Stop at 40 tool calls
Watch the tool call count. At ~40 calls, wrap up, commit whatever is done, open a fresh session with the next step in CURRENT_TASK.md. A fresh session costs nothing. A bloated session loses context and makes mistakes.

### Rule 3 — Never re-explore what you already know
CLAUDE.md, CURRENT_TASK.md, and the memory system mean Claude knows the project. Don't re-explain the architecture at session start. Just point at the task.

### Rule 4 — Use subagents for research
If you need to find where something is implemented across the codebase, say:
`"Use a subagent to find where X is implemented. Report back file path and line number."`
This keeps the main context clean.

### Rule 5 — /compact proactively
Before a session gets long (20+ back-and-forth messages), run `/compact`. Don't let context decay.

### Rule 6 — Split planning from doing
If you find yourself debating an approach mid-implementation session — stop. Make a note in CURRENT_TASK.md under "Blocker", close the session, open Account A, resolve the decision, update CURRENT_TASK.md, reopen Account B.

---

## CURRENT_TASK.md Format (always use this exact structure)

```markdown
# Current Task

## Status: [TODO / IN PROGRESS / BLOCKED / DONE]

## Task: [One-line name]

## Completed:
- [bullet list of what's done in this file/feature]

## Next:
[Single sentence describing the immediate next action]

## Context Files:
- path/to/file1.ts
- path/to/file2.ts
- path/to/file3.ts  (max 3)

## Blocker:
[None OR description of what's blocking]

## Test:
[How to verify the task is done — one sentence]
```

---

## Git Discipline

- Commit after **every task** — not every session, every task
- Message format: `feat: add campaign type selector` / `fix: auth session orgId` / `chore: switch to postgresql`
- Never commit node_modules, .env, prisma/dev.db
- Tag milestone commits: `git tag v0.1-postgresql-foundation`

### Commit granularity guide:
| Change | Commit? |
|---|---|
| One new API route + its page | Yes |
| Prisma schema migration | Yes (separate commit) |
| Multiple routes in one feature | Yes (one commit per feature) |
| Fixed a bug while building something else | Yes (separate commit before continuing) |
| Updated CURRENT_TASK.md | Include with the feature commit |

---

## Reference: Using outlierai as a Spec

`outlierai/backend/server.py` is your implementation reference. When building any feature:

1. Search for the feature in server.py: `Grep "campaign" in outlierai/backend/server.py`
2. Read only the relevant route handler (~20-40 lines)
3. Translate the logic to TypeScript + Prisma
4. Do not copy code verbatim — translate the intent

Key outlierai pages to reference by feature:
| Feature to build | outlierai reference |
|---|---|
| Campaign types | `server.py` `/api/campaigns` POST + `frontend/src/pages/Campaigns.jsx` |
| Analytics rollups | `server.py` `/api/analytics/overview` + `Analytics.jsx` |
| Sound tracker | `server.py` `/api/sounds` + `SoundTracker.jsx` |
| Audit log | `server.py` `/api/audit-logs` + `AuditLog.jsx` |
| Team invites | `server.py` `/api/invites` + `Settings.jsx` |
| Activations board | `server.py` `/api/activations` + `Activations.jsx` |

---

## Testing Rules — Mandatory Automated Testing

### The Stack
| Layer | Tool | Config file |
|---|---|---|
| Unit (lib functions, utils) | Jest + ts-jest | `jest.config.js` |
| Component (React UI) | Jest + @testing-library/react | `jest.config.js` |
| API Integration | Jest + supertest | `jest.integration.config.js` |
| E2E (full browser flows) | Playwright | `playwright.config.ts` |

---

### What Tests Are Required Per Change

#### When you add/modify a `lib/` function:
- `__tests__/unit/lib/[filename].test.ts`
- Cover: happy path, all edge cases, error/null inputs, boundary values

#### When you add/modify an API route (`app/api/**`):
- `__tests__/integration/[resource].test.ts`
- Cover every HTTP method on that route
- Required cases for EVERY route:
  - ✅ 200/201 happy path with valid data
  - ✅ 401 unauthenticated (no session)
  - ✅ 403 wrong org (cross-tenant attempt — critical)
  - ✅ 400 missing required fields
  - ✅ 400 invalid field types/formats (Zod rejection)
  - ✅ 404 resource not found
  - ✅ 409 duplicate/conflict where applicable
  - ✅ Soft delete — deleted records do not appear in GET responses

#### When you add/modify a React page or component:
- `__tests__/unit/components/[ComponentName].test.tsx`
- Cover:
  - ✅ Renders correctly with valid props
  - ✅ Renders loading state
  - ✅ Renders empty state (no data)
  - ✅ Renders error state
  - ✅ User interactions fire correct handlers (click, submit, change)
  - ✅ Conditional rendering based on `OrgUIConfig` feature flags

#### When you add/modify an E2E user flow:
- `e2e/[flow-name].spec.ts`
- Required E2E flows (one spec per flow):
  - `auth.spec.ts` — login, logout, session expiry
  - `campaigns.spec.ts` — create, view, filter, delete
  - `creators.spec.ts` — add, edit, platform link
  - `activations.spec.ts` — assign, status change, approve
  - `payouts.spec.ts` — create, mark paid, CSV export
  - `analytics.spec.ts` — dashboard loads, widgets render, data is correct org
  - `onboarding.spec.ts` — provision org → first campaign end-to-end
  - `social-sync.spec.ts` — YouTube sync populates metrics

#### When you change the Prisma schema:
- Update seed script to include new model
- Add integration test covering the new relation/constraint
- Verify cascade deletes work as expected

---

### Edge Cases You Must Always Test

These apply to every feature — never skip:

**Multi-tenancy (most critical)**
```typescript
// Always test that org A cannot access org B's data
it('returns 403 when accessing another org resource', async () => {
  const orgA = await createTestOrg()
  const orgB = await createTestOrg()
  const resource = await createResource({ orgId: orgA.id })
  const response = await request(app)
    .get(`/api/resource/${resource.id}`)
    .set('Authorization', orgBToken)
  expect(response.status).toBe(403)
})
```

**Auth edge cases**
- Expired session token
- Session with no orgId
- Request with no Authorization header
- Request with malformed JWT

**Input validation edge cases**
- Empty string where string is required
- Null where non-null required
- Number out of range (negative amounts, zero, MAX_SAFE_INTEGER)
- String too long (test DB constraint limits)
- SQL injection string as input (Prisma handles this but still verify)
- XSS payload as string input (verify it's stored escaped)

**Pagination edge cases**
- Page 0 / negative page
- Limit of 0
- Limit larger than max allowed
- Last page (fewer items than limit)
- Empty result set

**Soft delete edge cases**
- Deleted resource does not appear in list
- Deleted resource returns 404 on direct fetch
- Relations to deleted resource still valid

**Concurrent operations**
- Duplicate creation (same name/email twice in parallel)
- Payout marked paid twice simultaneously

---

### Test File Naming & Location

```
outlier-ai/webapp/
├── __tests__/
│   ├── unit/
│   │   ├── lib/
│   │   │   ├── rbac.test.ts
│   │   │   ├── orgUiConfig.test.ts       ← test Zod schema validation
│   │   │   ├── payoutCalculator.test.ts  ← all 4 campaign type payouts
│   │   │   ├── socialSync.test.ts        ← metric sync logic
│   │   │   └── crypto.test.ts            ← token encryption/decryption
│   │   └── components/
│   │       ├── CampaignCard.test.tsx
│   │       ├── WidgetGrid.test.tsx        ← SDUI widget rendering
│   │       ├── NavSidebar.test.tsx        ← feature flag nav hiding
│   │       └── StatCard.test.tsx
│   └── integration/
│       ├── campaigns.test.ts             ← all campaign routes + 4 campaign types
│       ├── creators.test.ts
│       ├── activations.test.ts
│       ├── payouts.test.ts
│       ├── analytics.test.ts
│       ├── social.test.ts                ← social API sync routes
│       ├── orgConfig.test.ts             ← OrgUIConfig CRUD + validation
│       └── provisioning.test.ts          ← provision-org.ts script
└── e2e/
    ├── auth.spec.ts
    ├── campaigns.spec.ts
    ├── activations.spec.ts
    ├── payouts.spec.ts
    ├── analytics.spec.ts
    ├── onboarding.spec.ts
    └── social-sync.spec.ts
```

---

### Running Tests

```bash
# Before starting implementation — verify baseline passes
npm run test:unit

# After writing API routes
npm run test:integration

# After writing UI components
npm run test:unit

# Before every commit
npm run test:unit && npm run test:integration

# Before every deployment / milestone
npm run test:e2e

# Run a single test file (faster during development)
npx jest __tests__/integration/campaigns.test.ts
npx playwright test e2e/campaigns.spec.ts
```

---

### CI/CD — GitHub Actions (set up in Phase 4)

Every push to `main` runs automatically:
```
1. npm run test:unit          (fast, ~30s)
2. npm run test:integration   (medium, ~2min)
3. npx tsc --noEmit           (type check)
4. npx next build             (build check)
5. npm run test:e2e           (slow, ~5min — only on PR to main)
```

A deployment to Vercel only proceeds if all checks pass. Never bypass this.

---

### Test DB Setup

```bash
# .env.test (never commit this file)
TEST_DATABASE_URL="postgresql://..."   # separate Neon branch or local PG

# Always reset test DB before integration test run
npx prisma migrate reset --force --skip-seed
npx prisma db push
npx tsx prisma/seed.ts --test
```

Use a **separate Neon branch** (free feature) for test DB — never run tests against production DB.

---

### What "Test Coverage" Means Here

Not a % number. A feature has adequate coverage when:
- Every API route has all 8 required cases (listed above)
- Every lib function has edge cases tested
- Every UI component has all 4 states tested (loading, empty, error, data)
- The cross-tenant 403 test exists for every route that touches org data
- At least one E2E test covers the full user-facing workflow

If you're unsure whether an edge case matters — add the test. Tests are cheap. Bugs in production are not.

---

## Security Checklist (run mentally before every commit)

- [ ] No hardcoded secrets, API keys, or tokens in source
- [ ] Every API route reads `orgId` from the **session**, never from request body/params
- [ ] Feature flags in `OrgUIConfig` are UI hints only — API routes enforce independently
- [ ] Social API tokens stored encrypted (use `lib/crypto/encrypt.ts`)
- [ ] New API routes have `await auth()` as first line, return 401 before any DB call
- [ ] Prisma queries always filter by `orgId` — no cross-tenant data leaks
- [ ] Zod validates all incoming request bodies before any DB operation

---

## What "Done" Means for a Task

A task is only done when:
1. ✅ Code written and working locally
2. ✅ `CURRENT_TASK.md` updated with next task
3. ✅ Tests pass
4. ✅ Committed with clear message
5. ✅ No TypeScript errors (`npx tsc --noEmit`)

---

## Emergency Recovery

If a session goes wrong (Claude writes bad code, gets confused, loops):
1. `git diff` — see what changed
2. `git stash` — undo all uncommitted changes
3. Open fresh session with a narrower, more specific prompt
4. Add the problematic sub-task to CURRENT_TASK.md "Blocker" section
5. Ask Account A to clarify the approach before retrying

---

## Files That Must Always Exist

| File | Location | Purpose |
|---|---|---|
| `CURRENT_TASK.md` | `outlier-ai/webapp/` | What to build next |
| `PROGRESS.md` | `outlier-ai/webapp/` | Running log of completions |
| `DECISIONS.md` | `outlier-ai/` (root) | Architecture decisions + why |
| `DEV_RULES.md` | `~/.claude-personal/` | This file |
| `serene-finding-mountain.md` | `~/.claude-personal/plans/` | Full implementation plan |
| `clients/*.json` | `outlier-ai/webapp/scripts/` | Client provisioning configs |
