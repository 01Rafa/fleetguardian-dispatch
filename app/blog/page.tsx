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

interface Article {
  slug: string;
  badge: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
}

const articles: Article[] = [
  {
    slug: "reefer-vs-dry-van-2025",
    badge: "Rates & Equipment",
    title: "Reefer vs Dry Van: Which Pays More Per Mile in 2025",
    excerpt:
      "The rate difference between reefer and dry van is real — but it's not as simple as CPM. Fuel surcharges, deadhead, maintenance, and broker behavior all affect your actual take-home. Here's the full picture with 2025 numbers.",
    readTime: "7 min read",
    publishedDate: "May 2025",
  },
  {
    slug: "flatbed-loads-without-dispatcher",
    badge: "Flatbed Operations",
    title: "How to Find Flatbed Loads Without a Dispatcher (And Why Most Truckers Switch)",
    excerpt:
      "Load boards, broker calls, rate negotiation — finding flatbed loads solo is a full-time job on top of driving. Here's what it actually takes, and when it stops making sense to do it alone.",
    readTime: "8 min read",
    publishedDate: "May 2025",
  },
  {
    slug: "signs-you-need-truck-dispatch-service",
    badge: "Dispatch Services",
    title: "5 Signs You Need a Truck Dispatch Service as an Owner-Operator",
    excerpt:
      "Most owner-operators wait too long. If any of these five situations apply to you, you're already leaving money on the table every week.",
    readTime: "5 min read",
    publishedDate: "May 2025",
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
              <h2 className="blog-card-title">{featured.title}</h2>
              <div className="blog-card-excerpt">{featured.excerpt}</div>
              <div className="blog-card-meta">{featured.publishedDate} · {featured.readTime}</div>
              <div className="blog-card-link">Read Full Article →</div>
            </a>

            <div className="blog-side-cards">
              {rest.map((article) => (
                <a key={article.slug} href={`/blog/${article.slug}`} className="blog-card">
                  <div className="blog-card-badge">{article.badge}</div>
                  <h3 className="blog-card-title">{article.title}</h3>
                  <div className="blog-card-excerpt">{article.excerpt}</div>
                  <div className="blog-card-meta">{article.publishedDate} · {article.readTime}</div>
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
