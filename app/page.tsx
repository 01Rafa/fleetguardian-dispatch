"use client";

import { FormEvent, useEffect, useState } from "react";

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".service-card, .niche-card, .testimonial-card, .team-card")
      .forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
        (el as HTMLElement).style.transform = "translateY(20px)";
        (el as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "1bbbec67-9c28-4aaa-bf13-488033f2ab90");
    const data = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Submission failed.");
      form.reset();
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* HERO */}
      <section id="hero">
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div className="hero-eyebrow fade-in fade-in-1">Reefer &amp; Flatbed Dispatch Specialists</div>
          <img src="/logo.png" alt="Fleet Guardian" className="hero-logo fade-in fade-in-1" />
          <h1 className="fade-in fade-in-2">
            More Miles. <span>Stronger Rates.</span>
            <br />Zero Broker Headaches.
          </h1>
          <p className="hero-sub fade-in fade-in-3">
            We find reefer and flatbed loads, negotiate every dollar, and handle all broker back-and-forth — so you keep your eyes on the road.
          </p>
          <div className="hero-niches fade-in fade-in-3">
            <span className="niche-badge">🚛 Reefer</span>
            <span className="niche-sep">◆</span>
            <span className="niche-badge">🏗 Flatbed</span>
            <span className="niche-sep">◆</span>
            <span className="niche-badge">Owner-Operators</span>
          </div>
          <div className="hero-ctas fade-in fade-in-4">
            <a href="#lead-form" className="btn-primary">Request Dispatch Help</a>
            <a href="tel:+17868226069" className="btn-secondary">📞 +1 (786) 822-6069</a>
          </div>
          <p className="hero-trust fade-in fade-in-5">
            No long-term contracts &nbsp;◆&nbsp; You approve every load &nbsp;◆&nbsp; U.S.-based loads only
          </p>
        </div>
      </section>

      {/* STATS */}
      <section id="stats">
        <div className="container">
          <div className="stats-grid">
            <div>
              <div className="stat-num">$0.15+</div>
              <div className="stat-label">Avg. Rate Increase Per Mile</div>
            </div>
            <div>
              <div className="stat-num">48h</div>
              <div className="stat-label">Avg. Onboarding Time</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Loads Approved by You</div>
            </div>
            <div>
              <div className="stat-num">0</div>
              <div className="stat-label">Long-Term Contracts</div>
            </div>
          </div>
        </div>
      </section>

      {/* NICHES */}
      <section id="niches">
        <div className="container">
          <div className="section-label">Our Specialties</div>
          <h2>Built for <span>Reefer &amp; Flatbed</span> Operators</h2>
          <p className="section-intro">
            We don&apos;t dispatch everything — we specialize. That means we know your equipment, your lanes, and what rates you deserve.
          </p>
          <div className="niche-cards">
            <div className="niche-card">
              <span className="niche-icon">❄️</span>
              <h3>Reefer Dispatch</h3>
              <p>Temperature-sensitive freight needs a dispatcher who understands the nuances — fuel surcharges, precool requirements, drop temps, and protecting your cargo. We negotiate accordingly.</p>
              <ul>
                <li>Produce, pharmaceuticals, frozen food</li>
                <li>Multi-stop and partial loads</li>
                <li>Fuel surcharge negotiations</li>
                <li>High-value load sourcing</li>
              </ul>
            </div>
            <div className="niche-card">
              <span className="niche-icon">🏗</span>
              <h3>Flatbed Dispatch</h3>
              <p>Oversized, overweight, tarped, or strapped — flatbed freight has complexity that most dispatchers avoid. We lean into it and find loads that pay what your equipment deserves.</p>
              <ul>
                <li>Steel, lumber, machinery, construction</li>
                <li>Oversized &amp; permit loads</li>
                <li>Tarping requirements factored in</li>
                <li>Strong rate negotiation on spot loads</li>
              </ul>
            </div>
            <div className="niche-card">
              <span className="niche-icon">🚚</span>
              <h3>Small Fleets (2–10 Trucks)</h3>
              <p>Managing dispatch for multiple trucks shouldn&apos;t require an in-house team. We scale with you — coordinating lanes, managing broker relationships, and keeping your fleet moving.</p>
              <ul>
                <li>Coordinated multi-truck dispatch</li>
                <li>Consistent lane management</li>
                <li>One point of contact for all trucks</li>
                <li>No enterprise complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="section-label">What We Do</div>
          <h2>Dispatch Services That <span>Protect Your Margins</span></h2>
          <p className="section-intro">
            Every service is designed to save time, increase revenue, and reduce the stress of running your operation.
          </p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-num">01</div>
              <h3>Load Sourcing</h3>
              <p>We search load boards and broker networks daily to find loads that match your truck, lanes, and rate requirements. No more wasted hours searching.</p>
            </div>
            <div className="service-card">
              <div className="service-num">02</div>
              <h3>Rate Negotiation</h3>
              <p>We negotiate every load directly with brokers. We know market rates for reefer and flatbed — and we push for every dollar your equipment deserves.</p>
            </div>
            <div className="service-card">
              <div className="service-num">03</div>
              <h3>Broker Back-and-Forth</h3>
              <p>Calls, emails, confirmations, check calls — we handle all broker communication so you stay focused on driving, not paperwork.</p>
            </div>
            <div className="service-card">
              <div className="service-num">04</div>
              <h3>Trip Planning</h3>
              <p>Pickup times, delivery windows, reload positioning — we coordinate the flow of your week so you spend less time planning and more time earning.</p>
            </div>
            <div className="service-card">
              <div className="service-num">05</div>
              <h3>Rate Confirmations</h3>
              <p>We follow up on paperwork and rate confirmations so nothing slips through the cracks and you get paid correctly and on time.</p>
            </div>
            <div className="service-card">
              <div className="service-num">06</div>
              <h3>Daily Updates</h3>
              <p>Clear, daily load options and status updates so you can plan your week with confidence. No surprises, no missed opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div className="container">
          <div className="section-label">Real Results</div>
          <h2>What <span>Truckers Say</span></h2>
          <p className="section-intro">
            Don&apos;t take our word for it — hear from the owner-operators who run with us every week.
          </p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                Before Fleet Guardian I was spending 3 hours a day chasing loads. Now I just drive. My per-mile rate went up and I actually get weekends back.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div>
                  <div className="author-name">Marcus R.</div>
                  <div className="author-detail">Owner-Operator · Reefer · Texas</div>
                </div>
                <span className="testimonial-badge">Reefer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                They understand flatbed. I was getting lowballed on tarped steel runs — they pushed back on the brokers and now I&apos;m getting $0.20 more per mile on those lanes.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JT</div>
                <div>
                  <div className="author-name">Jason T.</div>
                  <div className="author-detail">Owner-Operator · Flatbed · Ohio</div>
                </div>
                <span className="testimonial-badge">Flatbed</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                I was skeptical about a dispatch service but they let me approve every load, no pressure. Three months in and I haven&apos;t had a dead week. Worth every penny.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">DL</div>
                <div>
                  <div className="author-name">Daria L.</div>
                  <div className="author-detail">Owner-Operator · Reefer · Florida</div>
                </div>
                <span className="testimonial-badge">Reefer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team">
        <div className="container">
          <div className="section-label">The People Behind It</div>
          <h2>You&apos;re Hiring <span>People, Not a Company</span></h2>
          <p className="section-intro">
            Truckers don&apos;t work with companies — they work with people they trust. Here&apos;s who you&apos;ll actually talk to when you call us.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">FG</div>
              <h3>Fleet Guardian Team</h3>
              <div className="team-role">Lead Dispatch · Reefer Specialist</div>
              <p>Years of experience dispatching reefer loads across U.S. lanes. We know the rates, the brokers, and how to position your truck for a full week of good miles.</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">FG</div>
              <h3>Fleet Guardian Team</h3>
              <div className="team-role">Flatbed Operations · Rate Negotiation</div>
              <p>Flatbed freight specialist with deep knowledge of oversized loads, tarping premiums, and steel market rates. We fight for every dollar on your behalf.</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">FG</div>
              <h3>Fleet Guardian Support</h3>
              <div className="team-role">Carrier Relations · Paperwork</div>
              <p>The person making sure your rate confirmations, check calls, and broker follow-ups happen on time — every time. Nothing falls through the cracks.</p>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.82rem", color: "var(--gold-dim)", fontStyle: "italic" }}>
            Call us and a real person picks up.{" "}
            <a href="tel:+17868226069" style={{ color: "var(--gold-light)", textDecoration: "none" }}>
              +1 (786) 822-6069
            </a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <div className="section-label">Questions</div>
          <h2>Common <span>Questions</span> from Owner-Operators</h2>
          <p className="section-intro">Short, honest answers before you decide to get started.</p>
          <div className="faq-grid">
            <div>
              <details>
                <summary>Do you work with reefer and flatbed specifically?</summary>
                <p>Yes — those are our two core specialties. We understand the nuances of temperature-sensitive freight, tarping requirements, oversized loads, and the specific brokers and lanes that work best for each equipment type.</p>
              </details>
              <details>
                <summary>Do I still control which loads I take?</summary>
                <p>Always. We send you options, negotiate the best rates, and present them clearly. You approve every load before we confirm with the broker. No surprises, ever.</p>
              </details>
              <details>
                <summary>How much can I expect my rates to improve?</summary>
                <p>Results vary by lane and equipment, but most owner-operators see $0.10–$0.25 per mile improvement once we&apos;re actively negotiating their loads. The bigger gain is time — stopping 2–3 hours of daily load hunting.</p>
              </details>
              <details>
                <summary>Is there a long-term contract?</summary>
                <p>No. We don&apos;t believe in locking truckers into contracts. If we&apos;re not adding value, you should be able to leave. We earn your business every week.</p>
              </details>
            </div>
            <div>
              <details>
                <summary>How fast can I start?</summary>
                <p>If your documents (MC authority, carrier packet) are ready, we can have you onboarded and searching loads within 24–48 hours. The process is quick and straightforward.</p>
              </details>
              <details>
                <summary>What lanes do you cover?</summary>
                <p>We work all major U.S. lanes. We&apos;ll discuss your home base and preferred routes during onboarding and position your truck to minimize deadhead and maximize loaded miles.</p>
              </details>
              <details>
                <summary>How is pricing structured?</summary>
                <p>Simple and transparent — we explain pricing clearly before you start. No hidden fees, no surprises. We&apos;ll cover it all during our first call.</p>
              </details>
              <details>
                <summary>Who will I be talking to every day?</summary>
                <p>Real people, not a rotating call center. You&apos;ll have a direct line to your dispatcher who knows your operation, your preferred lanes, and your truck.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="lead-form">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Start Here</div>
          <h2>Get Your First <span>Load Options</span> Within 48 Hours</h2>
          <p className="section-intro" style={{ margin: "0 auto 0" }}>
            Tell us about your operation and we&apos;ll reach out quickly to discuss your lanes, rates, and how we can support your dispatch.
          </p>
          <div className="form-wrapper">
            <form onSubmit={handleLeadSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="John Smith" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="you@email.com" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="equipment">Equipment Type</label>
                  <select id="equipment" name="equipment" required defaultValue="">
                    <option value="" disabled>Select equipment</option>
                    <option value="reefer">Reefer</option>
                    <option value="flatbed">Flatbed</option>
                    <option value="dry-van">Dry Van</option>
                    <option value="step-deck">Step Deck</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="trucks">Number of Trucks</label>
                  <select id="trucks" name="trucks">
                    <option value="1">1 (Owner-Operator)</option>
                    <option value="2-5">2–5 Trucks</option>
                    <option value="6-10">6–10 Trucks</option>
                    <option value="10+">10+ Trucks</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="notes">Home Base &amp; Preferred Lanes (optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="e.g. Based in Dallas, TX — prefer Southeast and Midwest lanes"
                ></textarea>
              </div>
              <button
                type="submit"
                className="form-submit"
                disabled={isSubmitting || submitStatus === "success"}
                style={
                  submitStatus === "success"
                    ? { background: "#2a5a2a", color: "#a0d4a0" }
                    : undefined
                }
              >
                {isSubmitting
                  ? "Sending..."
                  : submitStatus === "success"
                  ? "✓ Request Sent — We'll be in touch soon"
                  : "Request Dispatch Help →"}
              </button>
              {submitStatus === "error" && (
                <p style={{ color: "#f66", fontSize: "0.82rem", marginTop: "0.5rem" }}>
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="form-note">No long-term contracts. No pressure. We&apos;ll reply within a few hours.</p>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Talk to a Dispatcher</div>
          <h2>Prefer to <span>Talk First?</span></h2>
          <p className="section-intro" style={{ margin: "0 auto" }}>
            Call or message us directly. A real dispatcher will give you honest answers about fit, pricing, and next steps.
          </p>
          <div className="contact-row">
            <a href="tel:+17868226069" className="contact-link">
              <div className="contact-icon">📞</div>
              <div>
                <div className="contact-link-text">+1 (786) 822-6069</div>
                <div className="contact-link-sub">Call anytime</div>
              </div>
            </a>
            <a href="https://wa.me/17868226069" className="contact-link">
              <div className="contact-icon">💬</div>
              <div>
                <div className="contact-link-text">WhatsApp</div>
                <div className="contact-link-sub">Message us now</div>
              </div>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
