You are building a stunning landing page for a SaaS called "CreatorCore Clone" — an influencer campaign management platform.

## PROJECT SETUP

Working directory: ~/Documents/Repositories/creatorcore-clone/landing/

Initialize a Next.js 14 project here:
```bash
cd ~/Documents/Repositories/creatorcore-clone/landing
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

Then install dependencies:
```bash
npm install framer-motion lucide-react @radix-ui/react-dialog class-variance-authority clsx tailwind-merge
npx shadcn@latest init -y
npx shadcn@latest add button badge card
```

## WHAT TO BUILD

A world-class SaaS landing page inspired by https://www.creatorcore.co but BETTER.

### Sections (in order):

#### 1. Navbar
- Logo: "CreatorCore" with a lightning bolt icon
- Links: Features, Pricing, Docs
- CTA: "Get Started Free" (indigo button, rounded)
- Sticky, blurred backdrop

#### 2. Hero Section (MOST IMPORTANT — make it stunning)
- Big bold headline: "The Operating System for Influencer Campaigns"
- Sub: "Manage creators, track TikTok analytics, process payouts — all in one place."
- CTA buttons: "Start for Free →" + "Watch Demo"
- Background: Deep dark blue/navy gradient with subtle animated particles or aurora glow effect
- Floating dashboard mockup screenshot (use a stylized screenshot-like element with campaign cards)
- Trusted by: Logo marquee strip — "Atlantic Records", "Universal Music", "P.C. Richard & Son"

#### 3. Stats Bar
- 4 stats in a row on a colored band:
  - "3x Average ROI"
  - "180% Engagement Uplift"
  - "240% Creator Growth"
  - "398+ Payouts Processed"

#### 4. Features Section — "Your Complete Toolbox"
- 6 feature cards in a 2x3 or 3x2 grid:
  1. **Campaign Management** — "Create campaigns, assign creators, track deliverables end-to-end."
  2. **Creator Database** — "Build your roster of 250+ vetted creators with stats and rates."
  3. **Real-Time Analytics** — "Live TikTok + Instagram metrics. Views, likes, engagement, shares."
  4. **Sound Tracking** — "Track TikTok audio virality. Monitor growth velocity in real-time."
  5. **Smart Payouts** — "Pay creators via PayPal in seconds. Full transaction history."
  6. **AI Discovery** — "Find creators with natural language. 'Athletes who love country music.'"

#### 5. "Built For" Segment Section
- 4 columns: Agency | Manager | Music | Brand
- Each with icon, title, 2-line description
- Clean white cards

#### 6. How It Works (3 steps)
1. Create your campaign
2. Assign creators + set brief
3. Track results + pay creators

#### 7. Pricing Section
- 3 tiers: Starter (free), Pro ($49/mo), Agency ($149/mo)
- Feature comparison checklist per tier
- "Most popular" badge on Pro
- CTA on each card

#### 8. Social Proof / Testimonials
- 3 testimonials from fake customers
- Star ratings, avatar, name, role

#### 9. CTA Section (Bottom)
- Dark blue background
- "Ready to launch your next campaign?"
- "Start for Free" button

#### 10. Footer
- Logo, tagline
- Links: Product, Company, Legal
- "© 2026 CreatorCore. All rights reserved."

## DESIGN REQUIREMENTS

### Colors:
- Primary: #4F46E5 (indigo)
- Primary Dark: #312E81 (dark indigo)  
- Accent gradient: from-indigo-600 via-purple-600 to-pink-500
- Background: White + #F8F7FF for sections
- Dark sections: #0F0E1A (near black with blue tint)

### Typography:
- Font: Use Geist (default with Next.js) or Inter
- Hero h1: text-6xl md:text-7xl font-black tracking-tight
- Section headings: text-4xl font-bold

### Animations (use Framer Motion):
- Hero title: fade up on load
- Feature cards: staggered fade in on scroll
- Stats: count up animation
- Navbar: blur/shadow on scroll

### Code Quality:
- TypeScript everywhere
- Proper component structure (one file per section in components/)
- Mobile-first responsive
- Clean, production-ready code

## FILE STRUCTURE
```
landing/
├── app/
│   ├── layout.tsx    (font setup, metadata)
│   └── page.tsx      (import all sections)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── StatsBar.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
└── public/
    └── (any static assets)
```

## IMPORTANT
- Run `npm run build` at the end to make sure there are no TypeScript errors
- Make it absolutely BEAUTIFUL — this is the first thing users see
- Should be better than the original creatorcore.co landing page

When completely finished, run this command to notify:
openclaw system event --text "Done: CreatorCore landing page built! Check ~/Documents/Repositories/creatorcore-clone/landing/" --mode now
