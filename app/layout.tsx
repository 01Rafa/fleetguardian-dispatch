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
