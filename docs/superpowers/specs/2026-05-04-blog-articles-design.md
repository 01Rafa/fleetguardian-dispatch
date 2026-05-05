# Blog & Articles — Design Spec
**Date:** 2026-05-04  
**Project:** Fleet Guardian Dispatch Services (fleetguardiandispatch.com)  
**Status:** Approved

---

## Overview

Add a blog section to the existing Next.js app with one listing page and three SEO-optimized article pages. The blog integrates into the existing app using shared layout, nav, and CSS — no duplicate code.

---

## Architecture

### Refactor: Move Nav/Footer to Root Layout

Currently `app/page.tsx` contains the nav and footer inline. To share them across all pages:

1. Move the `<nav>`, `<footer>`, `<div class="bg-layer">`, and `<div class="bg-overlay">` from `app/page.tsx` into `app/layout.tsx` body.
2. Remove those elements from `app/page.tsx` (page content stays).
3. All new blog pages automatically inherit nav and footer.

### New Files

```
app/
  layout.tsx                                    ← modified: nav + footer moved here
  page.tsx                                      ← modified: nav/footer removed
  blog/
    page.tsx                                    ← /blog listing page
    reefer-vs-dry-van-2025/
      page.tsx                                  ← Article 1
    flatbed-loads-without-dispatcher/
      page.tsx                                  ← Article 2
    signs-you-need-truck-dispatch-service/
      page.tsx                                  ← Article 3
```

### Nav Change

Add `<li><a href="/blog">Blog</a></li>` to the nav links in `layout.tsx`.

---

## Design System

All pages use the existing globals.css — no new CSS files needed. The blog adds these utility classes to globals.css:

- `.article-body` — centered reading column, max-width 720px
- `.article-body h2` — gold-light heading with top margin
- `.article-body h3` — smaller gold-dim subheading
- `.article-body p` — Inter 0.95rem, white-dim, line-height 1.8
- `.article-body ul li` — gold diamond bullet (◆), same as niche-card list
- `.breadcrumb` — small uppercase trail, gold accent on current page
- `.cta-box` — dark card with gold left-border, gold CTA button inside
- `.related-grid` — 2-column grid of small article cards

**No new fonts or colors.** Everything uses existing CSS variables.

---

## Blog Listing Page — `/blog`

**File:** `app/blog/page.tsx`

### Metadata
```ts
title: "Trucking Blog | Fleet Guardian Dispatch"
description: "Rates, dispatch strategy, and the business of owner-operating in 2025. Practical guides for reefer and flatbed owner-operators."
canonical: "https://fleetguardiandispatch.com/blog"
```

### Layout
1. **Hero** — eyebrow ("Fleet Guardian · Dispatch Blog"), H1 "Trucking Knowledge Base" with "Knowledge Base" in gold, italic subtitle
2. **Gold divider**
3. **Article grid** — `grid-template-columns: 1.65fr 1fr`
   - Left (featured): Article 1 card with "Featured" badge, full excerpt, reading time, gold top border
   - Right: Article 2 and Article 3 stacked, shorter excerpts

### Article Card Data
| Article | Category Badge | Reading Time | Slug |
|---------|---------------|--------------|------|
| Reefer vs Dry Van | Rates & Equipment | 7 min | `reefer-vs-dry-van-2025` |
| Flatbed Loads Without Dispatcher | Flatbed Operations | 8 min | `flatbed-loads-without-dispatcher` |
| 5 Signs You Need Dispatch | Dispatch Services | 5 min | `signs-you-need-truck-dispatch-service` |

---

## Article Pages

### Shared Article Structure (all 3 articles)

```
<breadcrumb>  Home › Blog › [Article Title]
<eyebrow>     [Category] · [X] min read
<h1>          Article title
<meta>        Fleet Guardian Dispatch · May 2025
<divider>
<body>        H2 → H3 → paragraphs → lists (800+ words each)
<cta-box>     Gold left-border card with button → /#lead-form
<related>     2-column grid linking to the other 2 articles
```

### Schema Markup (per article)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article Title]",
  "author": { "@type": "Organization", "name": "Fleet Guardian Dispatch Services" },
  "publisher": { "@type": "Organization", "name": "Fleet Guardian Dispatch Services", "url": "https://fleetguardiandispatch.com" },
  "datePublished": "2025-05-01",
  "description": "[meta description]"
}
```

Also add BreadcrumbList schema on each article page.

---

## Article 1 — Reefer vs Dry Van: Which Pays More Per Mile in 2025

**Slug:** `reefer-vs-dry-van-2025`  
**Meta title:** `Reefer vs Dry Van: Which Pays More Per Mile in 2025 | Fleet Guardian`  
**Meta description:** `The real 2025 rate data on reefer vs dry van — CPM averages, hidden costs, and which equipment puts more money in your pocket as an owner-operator.`

**H2 outline:**
1. Average Spot Rates: What 2025 Numbers Show
   - H3: Why Reefer Commands a Premium
   - H3: Dry Van: Lower Rate, Lower Complexity
2. The Hidden Costs of Reefer
   - H3: Reefer Unit Fuel Consumption
   - H3: Maintenance and Downtime
   - H3: Pre-Cool Time and Detention
3. Dry Van Advantages Often Overlooked
4. Which Equipment Wins on Take-Home Pay?
   - H3: Running the Monthly Math
5. The Role of Dispatch in Maximizing Either Equipment Type

**CTA headline:** "Ready to Earn More Per Mile?"  
**Internal links:** Articles 2 and 3 in Related section  
**CTA button → `https://fleetguardiandispatch.com/#lead-form`**

---

## Article 2 — How to Find Flatbed Loads Without a Dispatcher

**Slug:** `flatbed-loads-without-dispatcher`  
**Meta title:** `How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch) | Fleet Guardian`  
**Meta description:** `Load boards, broker calls, rate negotiation — finding flatbed loads solo is a full-time job on top of driving. Here's what it actually takes, and when it stops making sense.`

**H2 outline:**
1. The Three Ways Owner-Operators Find Flatbed Loads
   - H3: Load Boards (DAT, Truckstop, Amazon Relay)
   - H3: Direct Broker Relationships
   - H3: Freight Matching Apps
2. What Load Board Searching Actually Costs You
   - H3: Time Cost Per Week
   - H3: Rates You Leave on the Table
3. The Negotiation Problem Solo Operators Face
4. When Going Solo Makes Sense (And When It Doesn't)
5. What a Dispatcher Actually Does for Flatbed Operators
   - H3: Knowing Which Brokers Pay on Flatbed Lanes
   - H3: Negotiating Tarping and Oversize Premiums

**CTA headline:** "Stop Hunting Loads. Start Driving Them."  
**Internal links:** Articles 1 and 3 in Related section  
**CTA button → `https://fleetguardiandispatch.com/#lead-form`**

---

## Article 3 — 5 Signs You Need a Truck Dispatch Service as an Owner-Operator

**Slug:** `signs-you-need-truck-dispatch-service`  
**Meta title:** `5 Signs You Need a Truck Dispatch Service as an Owner-Operator | Fleet Guardian`  
**Meta description:** `Most owner-operators wait too long to get dispatch help. These five signs mean you're already losing money — and what to do about it.`

**H2 outline:**
1. Sign #1: You're Spending More Than 2 Hours a Day Finding Loads
2. Sign #2: Your Per-Mile Rate Hasn't Improved in 6+ Months
   - H3: Why Rates Stagnate Without Negotiation Leverage
3. Sign #3: You're Taking Loads Out of Desperation, Not Strategy
   - H3: The Cost of Dead Miles
4. Sign #4: Broker Back-and-Forth Is Eating Into Your Driving Time
5. Sign #5: You Have No Idea What Your Equipment Should Be Earning
   - H3: Market Rate Benchmarks by Equipment Type
6. What Happens When You Do Get a Dispatcher

**CTA headline:** "If Any of These Sound Familiar, Let's Talk."  
**Internal links:** Articles 1 and 2 in Related section  
**CTA button → `https://fleetguardiandispatch.com/#lead-form`**

---

## Contact Info (used in CTAs and footer)

- **Phone:** +1 (786) 822-6069
- **WhatsApp:** https://wa.me/17868226069
- **Lead form:** https://fleetguardiandispatch.com/#lead-form

---

## SEO Checklist (per article)

- [ ] `<title>` tag with article title + brand
- [ ] `<meta name="description">` under 160 chars
- [ ] `<link rel="canonical">` with full URL
- [ ] Article JSON-LD schema block
- [ ] BreadcrumbList JSON-LD schema block
- [ ] H1 contains primary keyword
- [ ] H2s use secondary/related keywords
- [ ] 800+ words of body content
- [ ] Internal links to other 2 articles
- [ ] CTA links to `/#lead-form`
- [ ] OpenGraph title + description

---

## Implementation Notes

- All pages are **React Server Components** (no `"use client"`) — only `app/page.tsx` keeps the client directive for its form logic.
- Article content is written directly as JSX in each `page.tsx` — no CMS or MDX needed.
- The `generateMetadata` export handles SEO metadata per page.
- JSON-LD schema is injected via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />` inside the page's returned JSX — same pattern already used in `app/layout.tsx`.
- `.superpowers/` should be added to `.gitignore`.
