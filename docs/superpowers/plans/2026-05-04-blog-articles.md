# Blog & Article Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a /blog listing page and three SEO-optimized article pages to the existing Next.js app, sharing the global nav and footer via the root layout.

**Architecture:** Move nav, footer, and background layers from `app/page.tsx` into `app/layout.tsx` so every page inherits them automatically. Add blog/article CSS classes to `globals.css`. Create static Server Component pages for the blog listing and each article. No new libraries needed.

**Tech Stack:** Next.js App Router, TypeScript, React Server Components, CSS (globals.css only)

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `app/layout.tsx` | Add nav, footer, bg-layer, bg-overlay; update anchor hrefs to absolute |
| Modify | `app/page.tsx` | Remove nav, footer, bg-layer, bg-overlay (moved to layout) |
| Modify | `app/globals.css` | Append blog listing and article CSS classes |
| Modify | `.gitignore` | Add `.superpowers/` |
| Create | `app/blog/page.tsx` | /blog listing — featured card + 2 side cards |
| Create | `app/blog/reefer-vs-dry-van-2025/page.tsx` | Article 1 |
| Create | `app/blog/flatbed-loads-without-dispatcher/page.tsx` | Article 2 |
| Create | `app/blog/signs-you-need-truck-dispatch-service/page.tsx` | Article 3 |

---

## Task 1: Refactor layout.tsx — Move shared UI from page.tsx

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

Moves nav, footer, and background divs into the root layout so all pages inherit them. Updates all `href="#section"` anchors to `href="/#section"` so they work from any route.

- [ ] **Step 1: Replace the entire contents of `app/layout.tsx` with the following**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fleet Guardian Dispatch | Reefer & Flatbed Load Dispatch for Owner-Operators",
  description:
    "Fleet Guardian helps reefer and flatbed owner-operators find better loads, negotiate stronger rates, and stay moving. No long-term contracts. You always approve.",
  keywords:
    "truck dispatch service, reefer dispatch, flatbed dispatch, owner operator dispatch, load board, rate negotiation, trucking dispatcher",
  alternates: {
    canonical: "https://fleetguardiandispatch.com/",
  },
  openGraph: {
    title: "Fleet Guardian Dispatch | Reefer & Flatbed Specialists",
    description:
      "We find loads, negotiate rates, and handle broker back-and-forth so you focus on driving. Built for reefer and flatbed owner-operators.",
    url: "https://fleetguardiandispatch.com/",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Fleet Guardian Dispatch Services",
  description:
    "Truck dispatch service specializing in reefer and flatbed loads for owner-operators and small carriers.",
  telephone: "+17868226069",
  url: "https://fleetguardiandispatch.com",
  serviceType: "Truck Dispatch",
  areaServed: "United States",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        <div className="bg-layer"></div>
        <div className="bg-overlay"></div>
        <nav>
          <a href="/" className="nav-logo">
            <img src="/logo.png" alt="Fleet Guardian" />
            <div>
              <span className="nav-logo-text">FLEET GUARDIAN</span>
              <span className="nav-logo-sub">DISPATCH SERVICES</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="/#niches">Specialties</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#testimonials">Results</a></li>
            <li><a href="/#team">Team</a></li>
            <li><a href="/#faq">FAQ</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/#lead-form" className="nav-cta">Get Started</a></li>
          </ul>
        </nav>
        {children}
        <footer>
          <div className="footer-logo">FLEET GUARDIAN · DISPATCH SERVICES</div>
          <p className="footer-copy">
            © 2025 Fleet Guardian Dispatch Services. Practical support for owner-operators and small U.S. fleets.
          </p>
        </footer>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Edit `app/page.tsx` — remove the four elements that moved to layout**

In the `return (` block of `app/page.tsx`, delete these four elements only (leave all `<section>` content untouched):

1. `<div className="bg-layer"></div>`
2. `<div className="bg-overlay"></div>`
3. The entire `{/* NAV */}` block — from `<nav>` through `</nav>`
4. The entire `{/* FOOTER */}` block — from `<footer>` through `</footer>`

The return should now open with `<>` and go straight into `{/* HERO */}`, ending just after `{/* CONTACT */}` closes.

- [ ] **Step 3: Verify the homepage renders correctly**

Run: `npm run dev`
Open: `http://localhost:3000`
Expected: Landing page looks identical to before. Nav shows all links including the new "Blog" link. Footer is present. Background texture visible. No console errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "refactor: move nav and footer to root layout, add Blog nav link"
```

---

## Task 2: Add blog and article CSS to globals.css

**Files:**
- Modify: `app/globals.css`

Append everything below after the existing `@media (max-width: 768px)` block at the bottom of the file.

- [ ] **Step 1: Append the following CSS to the end of `app/globals.css`**

```css
/* ── BLOG LISTING ── */
#blog-hero {
  padding: 8rem 2rem 3rem;
  text-align: center;
}

.blog-articles {
  padding: 0 2rem 6rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: 1.65fr 1fr;
  gap: 1.5rem;
  margin-top: 2.5rem;
  align-items: start;
}

.blog-featured-card {
  display: block;
  background: var(--black-2);
  border: 1px solid var(--gold-border);
  padding: 2.5rem 2rem;
  text-decoration: none;
  position: relative;
  transition: border-color 0.3s;
}

.blog-featured-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.blog-featured-card:hover { border-color: var(--gold); }

.blog-side-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-card {
  display: block;
  background: var(--black-2);
  border: 1px solid var(--gold-border);
  padding: 1.5rem;
  text-decoration: none;
  transition: border-color 0.3s;
}

.blog-card:hover { border-color: var(--gold); }

.blog-featured-tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(201,168,76,0.12);
  border: 1px solid var(--gold-border-bright);
  padding: 0.15rem 0.5rem;
  margin-right: 0.5rem;
}

.blog-card-badge {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.6rem;
}

.blog-card-title {
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--white);
  line-height: 1.35;
  margin-bottom: 0.6rem;
  letter-spacing: 0.02em;
}

.blog-featured-card .blog-card-title { font-size: 1.2rem; margin-bottom: 0.75rem; }

.blog-card-excerpt {
  font-family: 'Crimson Pro', serif;
  font-size: 0.95rem;
  color: var(--white-dim);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.blog-card-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.45);
  margin-bottom: 0.75rem;
}

.blog-card-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-light);
}

/* ── ARTICLE ── */
.article-container {
  max-width: 740px;
  margin: 0 auto;
  padding: 6rem 2rem 5rem;
}

.breadcrumb {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: var(--white-dim);
  letter-spacing: 0.04em;
  margin-bottom: 2rem;
}

.breadcrumb a { color: var(--white-dim); text-decoration: none; transition: color 0.2s; }
.breadcrumb a:hover { color: var(--gold-light); }
.breadcrumb-sep { margin: 0 0.5rem; color: var(--gold-dim); }
.breadcrumb-current { color: var(--gold); }

.article-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.75rem;
}

.article-h1 {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 700;
  color: var(--white);
  line-height: 1.2;
  letter-spacing: 0.02em;
  margin-bottom: 0.75rem;
}

.article-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.35);
  margin-bottom: 1.5rem;
}

.article-body { margin-top: 1.5rem; }

.article-body h2 {
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--gold-light);
  letter-spacing: 0.04em;
  margin: 2.5rem 0 0.75rem;
}

.article-body h3 {
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(201,168,76,0.75);
  letter-spacing: 0.04em;
  margin: 1.5rem 0 0.5rem;
}

.article-body p {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--white-dim);
  line-height: 1.85;
  margin-bottom: 1.1rem;
}

.article-body ul { list-style: none; margin: 0.5rem 0 1.1rem; padding: 0; }

.article-body ul li {
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  font-weight: 300;
  color: var(--white-dim);
  line-height: 1.7;
  padding: 0.3rem 0 0.3rem 1.5rem;
  position: relative;
}

.article-body ul li::before {
  content: '◆';
  position: absolute;
  left: 0;
  font-size: 0.45rem;
  top: 0.55rem;
  color: var(--gold-dim);
}

.article-cta-box {
  background: var(--black-2);
  border: 1px solid var(--gold-border-bright);
  border-left: 3px solid var(--gold);
  padding: 2rem 2.5rem;
  margin: 3rem 0;
}

.article-cta-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.5rem;
}

.article-cta-headline {
  font-family: 'Cinzel', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.article-cta-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  color: var(--white-dim);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.article-cta-btn {
  display: inline-block;
  font-family: 'Cinzel', serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--black);
  background: var(--gold);
  padding: 0.85rem 2rem;
  text-decoration: none;
  transition: all 0.2s;
}

.article-cta-btn:hover {
  background: var(--gold-light);
  box-shadow: 0 8px 30px rgba(201,168,76,0.3);
  transform: translateY(-2px);
}

.article-related {
  border-top: 1px solid var(--gold-border);
  padding-top: 2rem;
  margin-top: 1rem;
}

.article-related-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.article-related-label::before {
  content: '';
  display: block;
  width: 24px;
  height: 1px;
  background: var(--gold);
}

.article-related-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.article-related-card {
  display: block;
  background: var(--black-2);
  border: 1px solid var(--gold-border);
  padding: 1.25rem;
  text-decoration: none;
  transition: border-color 0.3s;
}

.article-related-card:hover { border-color: var(--gold); }

.article-related-badge {
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-dim);
  margin-bottom: 0.4rem;
}

.article-related-title {
  font-family: 'Cinzel', serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--gold-light);
  line-height: 1.4;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.article-related-cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.5);
}

/* ── RESPONSIVE: BLOG & ARTICLE ── */
@media (max-width: 768px) {
  .blog-grid { grid-template-columns: 1fr; }
  .article-related-grid { grid-template-columns: 1fr; }
  .article-container { padding: 6rem 1.5rem 3rem; }
  .article-cta-box { padding: 1.5rem; }
}
```

- [ ] **Step 2: Verify no CSS errors**

Run: `npm run dev` (if not already running)
Open: `http://localhost:3000`
Expected: Landing page renders identically to before. No errors in browser console.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add blog listing and article CSS classes"
```

---

## Task 3: Update .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and add this line anywhere in the file (e.g. after the `/node_modules` entry):

```
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm files"
```

---

## Task 4: Create blog listing page

**Files:**
- Create: `app/blog/page.tsx`

- [ ] **Step 1: Create `app/blog/page.tsx` with the following content**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trucking Blog | Fleet Guardian Dispatch",
  description:
    "Rates, dispatch strategy, and the business of owner-operating in 2025. Practical guides for reefer and flatbed owner-operators.",
  alternates: { canonical: "https://fleetguardiandispatch.com/blog" },
  openGraph: {
    title: "Trucking Blog | Fleet Guardian Dispatch",
    description:
      "Rates, dispatch strategy, and the business of owner-operating in 2025. Practical guides for reefer and flatbed owner-operators.",
    url: "https://fleetguardiandispatch.com/blog",
    type: "website",
  },
};

const articles = [
  {
    slug: "reefer-vs-dry-van-2025",
    badge: "Rates & Equipment",
    title: "Reefer vs Dry Van: Which Pays More Per Mile in 2025",
    excerpt:
      "The rate difference between reefer and dry van is real — but it's not as simple as CPM. Fuel surcharges, deadhead, maintenance, and broker behavior all affect your actual take-home. Here's the full picture with 2025 numbers.",
    readTime: "7 min read",
  },
  {
    slug: "flatbed-loads-without-dispatcher",
    badge: "Flatbed Operations",
    title: "How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch)",
    excerpt:
      "Load boards, broker calls, rate negotiation — finding flatbed loads solo is a full-time job on top of driving. Here's what it actually takes, and when it stops making sense to do it alone.",
    readTime: "8 min read",
  },
  {
    slug: "signs-you-need-truck-dispatch-service",
    badge: "Dispatch Services",
    title: "5 Signs You Need a Truck Dispatch Service as an Owner-Operator",
    excerpt:
      "Most owner-operators wait too long. If any of these five situations apply to you, you're already leaving money on the table every week.",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <section id="blog-hero">
        <div className="container">
          <div className="hero-eyebrow">Fleet Guardian · Dispatch Blog</div>
          <h1>
            Trucking <span>Knowledge Base</span>
          </h1>
          <p className="hero-sub">
            Rates, dispatch strategy, and the business of owner-operating in 2025.
          </p>
        </div>
      </section>

      <section className="blog-articles">
        <div className="container">
          <div className="blog-grid">
            <a href={`/blog/${featured.slug}`} className="blog-featured-card">
              <div className="blog-card-badge">
                <span className="blog-featured-tag">Featured</span>
                {featured.badge}
              </div>
              <div className="blog-card-title">{featured.title}</div>
              <div className="blog-card-excerpt">{featured.excerpt}</div>
              <div className="blog-card-meta">May 2025 · {featured.readTime}</div>
              <div className="blog-card-link">Read Full Article →</div>
            </a>

            <div className="blog-side-cards">
              {rest.map((article) => (
                <a key={article.slug} href={`/blog/${article.slug}`} className="blog-card">
                  <div className="blog-card-badge">{article.badge}</div>
                  <div className="blog-card-title">{article.title}</div>
                  <div className="blog-card-excerpt">{article.excerpt}</div>
                  <div className="blog-card-meta">May 2025 · {article.readTime}</div>
                  <div className="blog-card-link">Read Article →</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify /blog renders**

Open: `http://localhost:3000/blog`
Expected: "Trucking Knowledge Base" hero, featured "Reefer vs Dry Van" card on left with gold top border, two side cards on right stacked. Nav shows "Blog" as active-looking link. Footer present.

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: add /blog listing page with featured article layout"
```

---

## Task 5: Create Article 1 — Reefer vs Dry Van

**Files:**
- Create: `app/blog/reefer-vs-dry-van-2025/page.tsx`

- [ ] **Step 1: Create `app/blog/reefer-vs-dry-van-2025/page.tsx` with the following content**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reefer vs Dry Van: Which Pays More Per Mile in 2025 | Fleet Guardian",
  description:
    "The real 2025 rate data on reefer vs dry van — CPM averages, hidden costs, and which equipment puts more money in your pocket as an owner-operator.",
  alternates: {
    canonical: "https://fleetguardiandispatch.com/blog/reefer-vs-dry-van-2025",
  },
  openGraph: {
    title: "Reefer vs Dry Van: Which Pays More Per Mile in 2025 | Fleet Guardian",
    description:
      "The real 2025 rate data on reefer vs dry van — CPM averages, hidden costs, and which equipment puts more money in your pocket.",
    url: "https://fleetguardiandispatch.com/blog/reefer-vs-dry-van-2025",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Reefer vs Dry Van: Which Pays More Per Mile in 2025",
  author: { "@type": "Organization", name: "Fleet Guardian Dispatch Services" },
  publisher: {
    "@type": "Organization",
    name: "Fleet Guardian Dispatch Services",
    url: "https://fleetguardiandispatch.com",
  },
  datePublished: "2025-05-01",
  description:
    "The real 2025 rate data on reefer vs dry van — CPM averages, hidden costs, and which equipment puts more money in your pocket as an owner-operator.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fleetguardiandispatch.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://fleetguardiandispatch.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Reefer vs Dry Van: Which Pays More Per Mile in 2025",
      item: "https://fleetguardiandispatch.com/blog/reefer-vs-dry-van-2025",
    },
  ],
};

export default function ReeferVsDryVan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="article-container">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <a href="/blog">Blog</a>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Reefer vs Dry Van: Which Pays More Per Mile in 2025</span>
        </nav>

        <div className="article-eyebrow">Rates &amp; Equipment · 7 min read</div>
        <h1 className="article-h1">Reefer vs Dry Van: Which Pays More Per Mile in 2025</h1>
        <div className="article-meta">Fleet Guardian Dispatch · May 2025</div>

        <div className="gold-divider"><div className="gold-divider-diamond"></div></div>

        <div className="article-body">
          <p>
            If you&apos;re deciding between reefer and dry van, you&apos;ve probably heard that reefer pays more. And in most markets, that&apos;s true — but the margin between the two is narrower than most people think once you account for everything the reefer premium doesn&apos;t cover. This guide breaks down the real 2025 numbers, the hidden costs, and what actually ends up in your pocket at the end of the month.
          </p>

          <h2>Average Spot Rates: What 2025 Numbers Show</h2>
          <p>
            As of early 2025, national average spot rates for reefer loads are running $2.45–$3.10 per mile, while dry van averages $1.85–$2.40 per mile on comparable lanes. That&apos;s a spread of roughly $0.40–$0.70 per loaded mile — meaningful on a 500-mile run, and even more significant over a full week of driving.
          </p>
          <p>
            But averages obscure a lot. Rates swing dramatically by lane, season, and load type. A reefer hauling produce from California&apos;s Central Valley to the Southeast can hit $3.50+/mile in peak season. A dry van moving general freight between oversupplied Midwest markets might land at $1.60. Context matters more than the headline number.
          </p>

          <h3>Why Reefer Commands a Premium</h3>
          <p>
            Temperature-sensitive freight carries higher stakes — spoiled product means broker chargebacks and potential liability. That risk reduces the number of carriers willing and certified to handle it, which creates a tighter supply of trucks and gives reefer operators more leverage at the negotiating table.
          </p>
          <p>
            Pharmaceutical shipments, produce, frozen food, and dairy all require documented temperature compliance. Brokers pay to ensure those requirements are met, and that premium gets passed to the driver who can deliver it correctly.
          </p>

          <h3>Dry Van: Lower Rate, Lower Complexity</h3>
          <p>
            Dry van freight is the most abundant load type on every major load board. That volume means more options, faster load-finding, and less time sitting empty — but it also means more competition among carriers, which pushes rates down. Dry van shines when you prioritize predictability and simplicity over maximum per-mile revenue.
          </p>

          <h2>The Hidden Costs of Reefer</h2>
          <p>
            The reefer premium looks great on paper. The problem is that several costs chip away at it before the money reaches your account. Operators who don&apos;t account for these often discover that their actual take-home is closer to dry van territory than the spot rate suggested.
          </p>

          <h3>Reefer Unit Fuel Consumption</h3>
          <p>
            A reefer unit running continuously burns approximately 0.8–1.2 gallons of diesel per hour, depending on the temperature requirement and ambient conditions. On a 500-mile, 10-hour run, that&apos;s 8–12 extra gallons — at current diesel prices, $30–$45 in additional fuel cost per load. Multiply that across 20+ loads per month and the drag becomes significant.
          </p>
          <p>
            Some brokers offer fuel surcharges that partially offset this. Negotiating these surcharges explicitly is one of the highest-value things a dispatcher can do for a reefer operator — and one of the things most owner-operators leave on the table when negotiating solo.
          </p>

          <h3>Maintenance and Downtime</h3>
          <p>
            Reefer units require dedicated maintenance separate from the truck itself. Annual service, refrigerant recharges, and component replacements average $3,000–$6,000 per year depending on unit age and usage. Older units can cost significantly more. A single compressor failure can bench your truck for days during a high-demand season — a costly scenario with no income coming in.
          </p>

          <h3>Pre-Cool Time and Detention</h3>
          <p>
            Reefer loads often require pre-cooling the trailer to a set temperature before loading begins — time you&apos;re not paid for. Shippers who run behind schedule create detention situations that are harder to enforce on temperature-sensitive freight because carriers feel pressure to absorb delays to preserve the relationship. These unpaid hours add up faster than most operators realize.
          </p>

          <h2>Dry Van Advantages Often Overlooked</h2>
          <p>
            Dry van has real advantages that don&apos;t show up in the per-mile rate. Load variety is higher, which means more flexibility in lane selection and less exposure to seasonal demand swings. Equipment costs are lower — no reefer unit to maintain, no fuel surcharge battles. Loading and unloading is typically faster, which translates to more loaded miles per day on tight lanes.
          </p>
          <p>
            For operators who prioritize running volume over maximum rate on individual loads, dry van can produce competitive weekly revenue with less equipment complexity and fewer things that can go wrong mid-load.
          </p>

          <h2>Which Equipment Wins on Take-Home Pay?</h2>
          <p>
            The honest answer: it depends on how well you manage both the revenue and the costs. A reefer operator who negotiates fuel surcharges, minimizes pre-cool time, and sources high-paying lanes consistently will outperform a dry van operator at the same number of miles. A reefer operator who accepts whatever the broker offers and absorbs all the hidden costs often ends up in the same ballpark as dry van — or worse.
          </p>

          <h3>Running the Monthly Math</h3>
          <p>
            Consider a driver running 10,000 loaded miles per month. At $2.75/mile reefer versus $2.10/mile dry van, the gross revenue difference is $6,500. Subtract $400 in additional reefer fuel, $300 in monthly maintenance reserve, and $200 in detention and pre-cool time losses. The actual net advantage drops to roughly $5,600 per month — still meaningful, but significantly less than the raw rate spread implies. Without a dispatcher actively negotiating fuel surcharges and better rates, that advantage narrows further.
          </p>

          <h2>The Role of Dispatch in Maximizing Either Equipment</h2>
          <p>
            The rate you accept matters more than the equipment you drive. An experienced dispatcher who knows which brokers consistently pay well on specific lanes, when to push back on offered rates, and how to negotiate fuel surcharges and detention can add $0.15–$0.30 per mile to an operator&apos;s effective rate — on either equipment type.
          </p>
          <p>
            That&apos;s $1,500–$3,000 per month on a 10,000-mile operation, just from better negotiation. Fleet Guardian specializes in reefer and flatbed dispatch specifically because these equipment types have the most negotiating complexity — and therefore the most room to recover value that solo operators routinely leave on the table. If you&apos;re running either equipment type and negotiating your own loads, there&apos;s a good chance you&apos;re underearning on rates you could improve.
          </p>
        </div>

        <div className="article-cta-box">
          <div className="article-cta-label">Ready to Earn More Per Mile?</div>
          <div className="article-cta-headline">Fleet Guardian Negotiates Every Load for You</div>
          <p className="article-cta-text">
            We specialize in reefer and flatbed dispatch for owner-operators. We find loads on the lanes that pay, negotiate fuel surcharges and detention time, and handle all broker communication — so you keep more of what your equipment is actually worth. No long-term contracts.
          </p>
          <a href="https://fleetguardiandispatch.com/#lead-form" className="article-cta-btn">
            Request Dispatch Help →
          </a>
        </div>

        <div className="article-related">
          <div className="article-related-label">Continue Reading</div>
          <div className="article-related-grid">
            <a href="/blog/flatbed-loads-without-dispatcher" className="article-related-card">
              <div className="article-related-badge">Flatbed Operations</div>
              <div className="article-related-title">
                How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch)
              </div>
              <div className="article-related-cta">Read Article →</div>
            </a>
            <a href="/blog/signs-you-need-truck-dispatch-service" className="article-related-card">
              <div className="article-related-badge">Dispatch Services</div>
              <div className="article-related-title">
                5 Signs You Need a Truck Dispatch Service as an Owner-Operator
              </div>
              <div className="article-related-cta">Read Article →</div>
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
```

- [ ] **Step 2: Verify article 1 renders**

Open: `http://localhost:3000/blog/reefer-vs-dry-van-2025`
Expected: Breadcrumb (Home › Blog › Reefer vs Dry Van...), gold eyebrow, H1, divider, article body with 5 H2 sections and 5 H3 subsections, gold CTA box with button, two related article cards at the bottom.

- [ ] **Step 3: Commit**

```bash
git add app/blog/reefer-vs-dry-van-2025/page.tsx
git commit -m "feat: add article 1 — Reefer vs Dry Van 2025"
```

---

## Task 6: Create Article 2 — Flatbed Loads Without a Dispatcher

**Files:**
- Create: `app/blog/flatbed-loads-without-dispatcher/page.tsx`

- [ ] **Step 1: Create `app/blog/flatbed-loads-without-dispatcher/page.tsx` with the following content**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch) | Fleet Guardian",
  description:
    "Load boards, broker calls, rate negotiation — finding flatbed loads solo is a full-time job on top of driving. Here's what it actually takes, and when it stops making sense.",
  alternates: {
    canonical: "https://fleetguardiandispatch.com/blog/flatbed-loads-without-dispatcher",
  },
  openGraph: {
    title: "How to Find Flatbed Loads Without a Dispatcher | Fleet Guardian",
    description:
      "Finding flatbed loads solo is a full-time job on top of driving. Here's what it actually takes and when dispatch help makes sense.",
    url: "https://fleetguardiandispatch.com/blog/flatbed-loads-without-dispatcher",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch)",
  author: { "@type": "Organization", name: "Fleet Guardian Dispatch Services" },
  publisher: {
    "@type": "Organization",
    name: "Fleet Guardian Dispatch Services",
    url: "https://fleetguardiandispatch.com",
  },
  datePublished: "2025-05-01",
  description:
    "Load boards, broker calls, rate negotiation — finding flatbed loads solo is a full-time job on top of driving. Here's what it actually takes, and when it stops making sense.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fleetguardiandispatch.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://fleetguardiandispatch.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Find Flatbed Loads Without a Dispatcher",
      item: "https://fleetguardiandispatch.com/blog/flatbed-loads-without-dispatcher",
    },
  ],
};

export default function FlatbedLoadsWithoutDispatcher() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="article-container">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <a href="/blog">Blog</a>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">How to Find Flatbed Loads Without a Dispatcher</span>
        </nav>

        <div className="article-eyebrow">Flatbed Operations · 8 min read</div>
        <h1 className="article-h1">
          How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch)
        </h1>
        <div className="article-meta">Fleet Guardian Dispatch · May 2025</div>

        <div className="gold-divider"><div className="gold-divider-diamond"></div></div>

        <div className="article-body">
          <p>
            Running flatbed as an owner-operator means dealing with a load type that&apos;s already more complex than dry van — oversized dimensions, tarping requirements, specialized permits, and brokers who know flatbed capacity is tight and will lowball if you let them. Doing all of that while also spending hours every day hunting for the next load is sustainable for a while. But most experienced flatbed operators eventually reach the same conclusion: the time cost isn&apos;t worth it.
          </p>
          <p>
            This guide covers exactly how owner-operators find flatbed loads without a dispatcher, what it actually costs in time and money, and where the math tips toward getting help.
          </p>

          <h2>The Three Main Ways Owner-Operators Find Flatbed Loads</h2>
          <p>
            If you&apos;re running flatbed without a dispatcher, you&apos;re almost certainly using one or more of these three sources. Each has real advantages — and significant limitations at scale.
          </p>

          <h3>Load Boards — DAT, Truckstop, and the Alternatives</h3>
          <p>
            Load boards are the default starting point. DAT and Truckstop.com together list the majority of brokered spot freight in the U.S., and both have flatbed-specific filters. You can search by origin, destination, equipment type, and length of haul. The problem is that everyone else is doing the exact same search at the same time.
          </p>
          <p>
            Flatbed loads on load boards often sit at or below market rate because brokers post them knowing carriers are watching. The loads that actually pay well — the ones with tarping premiums, oversize freight, and better rates — tend to get booked through relationships before they hit the public board. By the time you see it posted, you&apos;re competing with every other flatbed carrier in the area.
          </p>

          <h3>Direct Broker Relationships</h3>
          <p>
            Building direct relationships with brokers who move flatbed freight consistently is the highest-value thing a solo operator can do. If a broker knows your equipment, your lanes, and that you deliver reliably, they&apos;ll call you before posting publicly. Rates on direct relationship loads are typically $0.10–$0.25/mile better than what&apos;s on the open board.
          </p>
          <p>
            The catch: building those relationships takes time — months of consistent work, reliable deliveries, and staying in contact even when you don&apos;t need a load. Most owner-operators have 3–5 solid broker relationships. Dispatchers who work these lanes full-time have 30–50, which means access to a fundamentally different tier of freight.
          </p>

          <h3>Freight Matching Apps</h3>
          <p>
            Apps like Convoy, Uber Freight, and Amazon Relay offer digital matching with less phone-negotiation friction. For dry van, they&apos;re increasingly competitive. For flatbed, the volume of available loads is lower and the rate transparency — while useful — often anchors negotiations below where a skilled negotiator could land. They&apos;re useful as a supplement but rarely the primary source for operators focused on maximizing flatbed rates.
          </p>

          <h2>What Load Board Searching Actually Costs You</h2>
          <p>
            The hidden expense of self-dispatching isn&apos;t the load board subscription fee — it&apos;s time. And for flatbed specifically, the time cost is higher than most operators admit when they calculate it honestly.
          </p>

          <h3>The Time Cost Per Week</h3>
          <p>
            A realistic load-searching session for flatbed looks like this: 30–45 minutes searching the board, filtering for equipment type and acceptable rates. Then calls or emails to 3–5 brokers per load to negotiate, confirm details, and get rate confirmations. Then check calls during transit. Then follow-up if paperwork is slow.
          </p>
          <p>
            For a driver running 3–4 loads per week, this adds up to 8–12 hours of non-driving work. At even a conservative effective hourly rate of $35/hour, that&apos;s $280–$420 worth of your time every single week — time that a dispatcher typically costs a fraction of.
          </p>

          <h3>The Rates You Leave on the Table</h3>
          <p>
            The larger cost isn&apos;t time — it&apos;s the difference between the rate you accept and the rate a skilled negotiator would have gotten. Flatbed brokers expect negotiation. If you take the first offer, you&apos;re leaving money on the table on almost every load. Most solo operators underperform on rate by $0.10–$0.25/mile simply because they&apos;re less informed about current market rates on specific lanes and less willing to push back when they need the load.
          </p>

          <h2>The Negotiation Problem Solo Flatbed Operators Face</h2>
          <p>
            Negotiating flatbed rates effectively requires knowing what the freight should pay — and that knowledge comes from running these lanes constantly. A dispatcher who works flatbed full-time knows that a tarped steel run from Gary, Indiana to Memphis on a Tuesday in April should be paying $X, not $Y. They know which brokers consistently underbid, which ones pay quickly, and which ones are worth a callback.
          </p>
          <p>
            Solo operators negotiating their own loads are at an information disadvantage. They know their own history, not the market. That gap costs real money — and it compounds over hundreds of loads per year.
          </p>

          <h2>When Going Solo Makes Sense</h2>
          <p>
            Self-dispatching makes the most sense in two scenarios: when you&apos;re just starting out and building knowledge of the market, or when you have a dedicated shipper relationship that keeps your truck moving without broker involvement. Both are legitimate. The first is temporary by nature; the second is rare and takes years to build.
          </p>
          <p>
            For the majority of owner-operators running spot flatbed freight on load boards, self-dispatching past the first year represents a real and ongoing opportunity cost — not just in rates, but in time that could be spent driving more miles or simply not working 12-hour days.
          </p>

          <h2>What a Dispatcher Actually Does for Flatbed Operators</h2>
          <p>
            A good flatbed dispatcher isn&apos;t just a load-finder. The specific value they add is built on market knowledge and broker relationships that solo operators can&apos;t replicate while also driving.
          </p>

          <h3>Knowing Which Brokers Pay on Flatbed Lanes</h3>
          <p>
            Not all brokers are equal. Some consistently underpay on flatbed freight; some are reasonable but slow on paperwork; some build strong relationships and offer preferred carrier rates to dispatchers they work with regularly. A flatbed dispatcher has this knowledge across dozens of brokers and applies it every time they search for your next load — eliminating the bad relationships before they waste your time.
          </p>

          <h3>Negotiating Tarping and Oversize Premiums</h3>
          <p>
            Tarping a flatbed load is physical, time-consuming work. Oversize freight requires permit coordination and route planning. Both should command rate premiums — and they often don&apos;t, unless someone negotiates for them explicitly. A dispatcher who knows the value of these services ensures you&apos;re being paid for them on every applicable load, not just when you remember to ask.
          </p>

          <h2>The Switch Most Truckers Make Eventually</h2>
          <p>
            Ask experienced flatbed owner-operators when they switched to using a dispatcher and most will say they wish they&apos;d done it sooner. The economics usually make sense within the first month — the combination of better rates and recovered time more than covers the dispatcher&apos;s fee. The hesitation is almost never financial; it&apos;s about control and trust.
          </p>
          <p>
            A good dispatcher gives you both: you approve every load before it&apos;s confirmed, and they have every incentive to get you rates that keep you on the road and coming back. If you&apos;re spending more than two hours a day on load research, it&apos;s time to run the numbers on what that time is actually worth.
          </p>
        </div>

        <div className="article-cta-box">
          <div className="article-cta-label">Stop Hunting Loads. Start Driving Them.</div>
          <div className="article-cta-headline">Fleet Guardian Finds Your Flatbed Loads</div>
          <p className="article-cta-text">
            We specialize in flatbed dispatch for owner-operators. We know the brokers, we know the lanes, and we negotiate every load so you&apos;re not leaving money on the table. You approve every load before we confirm it. No long-term contracts.
          </p>
          <a href="https://fleetguardiandispatch.com/#lead-form" className="article-cta-btn">
            Request Dispatch Help →
          </a>
        </div>

        <div className="article-related">
          <div className="article-related-label">Continue Reading</div>
          <div className="article-related-grid">
            <a href="/blog/reefer-vs-dry-van-2025" className="article-related-card">
              <div className="article-related-badge">Rates &amp; Equipment</div>
              <div className="article-related-title">
                Reefer vs Dry Van: Which Pays More Per Mile in 2025
              </div>
              <div className="article-related-cta">Read Article →</div>
            </a>
            <a href="/blog/signs-you-need-truck-dispatch-service" className="article-related-card">
              <div className="article-related-badge">Dispatch Services</div>
              <div className="article-related-title">
                5 Signs You Need a Truck Dispatch Service as an Owner-Operator
              </div>
              <div className="article-related-cta">Read Article →</div>
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
```

- [ ] **Step 2: Verify article 2 renders**

Open: `http://localhost:3000/blog/flatbed-loads-without-dispatcher`
Expected: Breadcrumb, H1, article body with 7 H2 sections and 5 H3 subsections, gold CTA box, two related cards (linking to Articles 1 and 3).

- [ ] **Step 3: Commit**

```bash
git add app/blog/flatbed-loads-without-dispatcher/page.tsx
git commit -m "feat: add article 2 — Flatbed Loads Without Dispatcher"
```

---

## Task 7: Create Article 3 — 5 Signs You Need a Dispatch Service

**Files:**
- Create: `app/blog/signs-you-need-truck-dispatch-service/page.tsx`

- [ ] **Step 1: Create `app/blog/signs-you-need-truck-dispatch-service/page.tsx` with the following content**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Signs You Need a Truck Dispatch Service as an Owner-Operator | Fleet Guardian",
  description:
    "Most owner-operators wait too long to get dispatch help. These five signs mean you're already losing money — and what to do about it.",
  alternates: {
    canonical: "https://fleetguardiandispatch.com/blog/signs-you-need-truck-dispatch-service",
  },
  openGraph: {
    title: "5 Signs You Need a Truck Dispatch Service as an Owner-Operator | Fleet Guardian",
    description:
      "Most owner-operators wait too long to get dispatch help. These five signs mean you're already losing money.",
    url: "https://fleetguardiandispatch.com/blog/signs-you-need-truck-dispatch-service",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "5 Signs You Need a Truck Dispatch Service as an Owner-Operator",
  author: { "@type": "Organization", name: "Fleet Guardian Dispatch Services" },
  publisher: {
    "@type": "Organization",
    name: "Fleet Guardian Dispatch Services",
    url: "https://fleetguardiandispatch.com",
  },
  datePublished: "2025-05-01",
  description:
    "Most owner-operators wait too long to get dispatch help. These five signs mean you're already losing money — and what to do about it.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fleetguardiandispatch.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://fleetguardiandispatch.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "5 Signs You Need a Truck Dispatch Service as an Owner-Operator",
      item: "https://fleetguardiandispatch.com/blog/signs-you-need-truck-dispatch-service",
    },
  ],
};

export default function SignsYouNeedDispatch() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="article-container">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <a href="/blog">Blog</a>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">
            5 Signs You Need a Truck Dispatch Service as an Owner-Operator
          </span>
        </nav>

        <div className="article-eyebrow">Dispatch Services · 5 min read</div>
        <h1 className="article-h1">
          5 Signs You Need a Truck Dispatch Service as an Owner-Operator
        </h1>
        <div className="article-meta">Fleet Guardian Dispatch · May 2025</div>

        <div className="gold-divider"><div className="gold-divider-diamond"></div></div>

        <div className="article-body">
          <p>
            Most owner-operators who eventually hire a dispatcher say the same thing: they waited longer than they should have. The hesitation is understandable — it feels like giving up control, adding an expense, and trusting someone else with your livelihood. But in most cases, the delay is costly. Dispatch fees typically pay for themselves within the first week through better rates alone, before you factor in recovered time.
          </p>
          <p>
            These five signs are the ones we hear most often from owner-operators who come to us after months — sometimes years — of leaving money on the table. If any of them apply to you, the math is worth running.
          </p>

          <h2>Sign #1: You&apos;re Spending More Than 2 Hours a Day Finding Loads</h2>
          <p>
            Load-finding is not a passive activity. Monitoring load boards, filtering by equipment type and lane, calling brokers to check availability, negotiating rates, getting rate confirmations, and handling check calls — it adds up. For most owner-operators running 3–4 loads per week, this administrative work takes 2–4 hours per day, sometimes more on slow markets.
          </p>
          <p>
            That time has a cost. Even at a conservative $40/hour valuation of your time, 2 hours per day five days a week is $400 in opportunity cost — every week. A dispatcher typically costs a fraction of that, and the time you recover can go toward more driving, better trip planning, or simply not working a 14-hour day.
          </p>
          <p>
            The clearest version of this sign: you find yourself doing load research at truck stops, during meal breaks, or late at night before the next pickup. If dispatch work is bleeding into your rest time, it&apos;s costing you more than money.
          </p>

          <h2>Sign #2: Your Per-Mile Rate Hasn&apos;t Improved in 6 Months or More</h2>
          <p>
            Freight markets move constantly. Rates fluctuate by lane, season, fuel surcharge levels, and carrier supply. If your average CPM hasn&apos;t improved meaningfully in six months or more, it usually means one of two things: either you&apos;re accepting the first offer consistently, or you&apos;re not aware of what specific lanes should be paying right now.
          </p>

          <h3>Why Rates Stagnate Without Negotiation Leverage</h3>
          <p>
            Brokers set opening offers below market. That&apos;s not a conspiracy — it&apos;s how negotiation works. If you accept those offers without pushback, your effective rate stays at the floor of the market even when the ceiling is higher. Dispatchers who work these lanes daily know the ceiling. They know that a load opened at $2.10/mile on a lane that&apos;s been running $2.55 can be negotiated up — and they&apos;re willing to make that call because they&apos;re not under time pressure to confirm and move on.
          </p>
          <p>
            If you&apos;ve noticed your rate feels stuck while you&apos;re aware the market has moved, it&apos;s a sign that negotiation is where you&apos;re losing.
          </p>

          <h2>Sign #3: You&apos;re Taking Loads Out of Desperation, Not Strategy</h2>
          <p>
            Reactive load selection is one of the most expensive habits in trucking. When you need a load now — because you&apos;re sitting empty, because you have a deadline, because you didn&apos;t plan the reload — you accept terms you wouldn&apos;t otherwise accept. You take the $1.95/mile load when the lane should pay $2.40. You haul into a market that kills your next day&apos;s options. You accept unfavorable pickup times that add unpaid hours to your day.
          </p>

          <h3>The Real Cost of Reactive Load Selection</h3>
          <p>
            Desperation loads don&apos;t just pay less on their own — they often set you up poorly for the load after. Taking a cheap load into a low-freight market means your next search starts from a worse position. A dispatcher plans 2–3 moves ahead, positioning your truck in markets with consistent outbound freight and strong rates. That kind of proactive planning is almost impossible to execute when you&apos;re also driving and managing your own business.
          </p>

          <h2>Sign #4: Broker Back-and-Forth Is Bleeding Into Your Drive Time</h2>
          <p>
            Every minute you spend on the phone with a broker is a minute you&apos;re not focused on the road, not resting, or not planning. And flatbed and reefer loads generate more broker communication than dry van — check calls, temperature confirmations, permit coordination, tarping discussions, detention disputes. It&apos;s a meaningful volume of calls and emails that accumulates across a typical week.
          </p>
          <p>
            If you find yourself taking work calls while driving — which is both dangerous and illegal with a handheld device — or if broker back-and-forth is eating into your 10-hour rest periods, that&apos;s a direct safety and compliance concern, not just an efficiency issue. A dispatcher handles all of that communication so you don&apos;t have to.
          </p>

          <h2>Sign #5: You Don&apos;t Know What Your Equipment Should Actually Be Earning</h2>
          <p>
            This is the sign that&apos;s hardest to recognize because ignorance of market rates is invisible from the inside. If you don&apos;t have a clear sense of what your truck — on your lanes, with your equipment type — should be averaging per mile right now, you can&apos;t know whether you&apos;re hitting market or leaving money on the table.
          </p>

          <h3>Market Rate Benchmarks by Equipment Type</h3>
          <p>
            In 2025, reefer operators running national lanes should be targeting $2.45–$3.10/mile on spot freight, with premium loads in produce seasons pushing above that range. Flatbed operators running steel, lumber, and construction materials should be in the $2.20–$2.90/mile range, with tarping and oversize premiums adding $0.15–$0.40/mile on applicable loads. If your average is significantly below these numbers on comparable freight, something is being left behind — either in rate negotiation, load selection, or both.
          </p>
          <p>
            A good dispatcher can tell you within minutes what your truck should be earning on your lanes based on current market conditions. That benchmark alone is often worth the first conversation.
          </p>

          <h2>What Changes When You Get a Good Dispatcher</h2>
          <p>
            The operators we work with at Fleet Guardian consistently report two things after their first month: their effective rate per mile went up, and they stopped working evenings. The rate improvement covers the dispatcher&apos;s fee — usually in the first week. The recovered time is what most of them say they value more after a few months.
          </p>
          <p>
            You still approve every load. You still set your lane preferences, home time requirements, and minimum acceptable rates. A dispatcher doesn&apos;t take control — they take the work that&apos;s preventing you from doing your best work. If any of the five signs above apply to your operation right now, it&apos;s worth having that first conversation.
          </p>
        </div>

        <div className="article-cta-box">
          <div className="article-cta-label">If Any of These Sound Familiar, Let&apos;s Talk.</div>
          <div className="article-cta-headline">Fleet Guardian Is Built for Owner-Operators Like You</div>
          <p className="article-cta-text">
            We dispatch reefer and flatbed owner-operators across U.S. lanes. No long-term contracts, no pressure — you approve every load before we confirm it. Tell us about your operation and we&apos;ll follow up to discuss rates, lanes, and fit.
          </p>
          <a href="https://fleetguardiandispatch.com/#lead-form" className="article-cta-btn">
            Request Dispatch Help →
          </a>
        </div>

        <div className="article-related">
          <div className="article-related-label">Continue Reading</div>
          <div className="article-related-grid">
            <a href="/blog/reefer-vs-dry-van-2025" className="article-related-card">
              <div className="article-related-badge">Rates &amp; Equipment</div>
              <div className="article-related-title">
                Reefer vs Dry Van: Which Pays More Per Mile in 2025
              </div>
              <div className="article-related-cta">Read Article →</div>
            </a>
            <a href="/blog/flatbed-loads-without-dispatcher" className="article-related-card">
              <div className="article-related-badge">Flatbed Operations</div>
              <div className="article-related-title">
                How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch)
              </div>
              <div className="article-related-cta">Read Article →</div>
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
```

- [ ] **Step 2: Verify article 3 renders**

Open: `http://localhost:3000/blog/signs-you-need-truck-dispatch-service`
Expected: Breadcrumb, H1, article body with 6 H2 sections (Sign #1–5 + What Changes), 3 H3 subsections, gold CTA box, two related cards (linking to Articles 1 and 2).

- [ ] **Step 3: Final integration check — all pages**

Verify each URL in order:
- `http://localhost:3000` — Landing page unchanged; nav has "Blog" link
- `http://localhost:3000/blog` — Featured card (Reefer vs Dry Van) left, 2 side cards right
- `http://localhost:3000/blog/reefer-vs-dry-van-2025` — Article 1; related links go to Articles 2 & 3
- `http://localhost:3000/blog/flatbed-loads-without-dispatcher` — Article 2; related links go to Articles 1 & 3
- `http://localhost:3000/blog/signs-you-need-truck-dispatch-service` — Article 3; related links go to Articles 1 & 2

In each article page, open browser DevTools → Elements, search for `application/ld+json`. Expected: two `<script>` tags — one Article schema, one BreadcrumbList schema.

- [ ] **Step 4: Commit**

```bash
git add app/blog/signs-you-need-truck-dispatch-service/page.tsx
git commit -m "feat: add article 3 — 5 Signs You Need a Truck Dispatch Service"
```
