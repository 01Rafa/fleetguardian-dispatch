import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

const services = [
  {
    title: "Load Sourcing",
    description:
      "We find daily loads that fit your truck and preferred lanes so you spend less time searching and more time moving."
  },
  {
    title: "Rate Negotiation",
    description:
      "We negotiate each load directly with brokers so you protect your margin and keep more revenue per run."
  },
  {
    title: "Trip Planning & Support",
    description:
      "We coordinate pickup times, delivery windows, and reload flow so your week stays organized with fewer surprises."
  },
  {
    title: "Broker & Paperwork Coordination",
    description:
      "We handle broker calls and rate confirmation follow-up so you avoid daily back-and-forth and reduce stress."
  }
];

const reasons = [
  {
    title: "Small Team, Direct Access",
    description:
      "You work with real people who know your operation, not a rotating call center."
  },
  {
    title: "Built for Small Carriers",
    description:
      "Designed for owner-operators and small fleets. No corporate complexity and no enterprise runaround."
  },
  {
    title: "Straight Updates, Fast Decisions",
    description:
      "You get clear load details, honest rate feedback, and quick replies so you can decide fast and keep wheels turning."
  },
  {
    title: "Trust You Can Verify",
    description:
      "No long-term contracts. You always approve the loads. Built for small carriers and owner-operators."
  }
];

const faqs = [
  {
    question: "Who is this dispatch service for?",
    answer:
      "Owner-operators and small U.S. carriers that want load support without hiring an in-house dispatcher."
  },
  {
    question: "Do I still control which loads I take?",
    answer:
      "Yes. Always. We send options and negotiate, but you approve every load."
  },
  {
    question: "How is pricing handled?",
    answer:
      "Simple and transparent. We explain pricing before you start, with no hidden fees."
  },
  {
    question: "How fast can we start?",
    answer:
      "If your documents are ready, onboarding can move quickly and we can start searching loads right away."
  },
  {
    question: "Which lanes do you work?",
    answer:
      "We work U.S. lanes based on your equipment, home base, and preferred routes."
  }
];

export default function HomePage() {
  const cardDelayClasses = ["delay-1", "delay-2", "delay-3", "delay-4"];

  return (
    <main className="relative overflow-hidden pb-24 md:pb-0" data-campaign-ready="true" data-analytics-scope="pomelli-dispatch-v1">
      <div className="soft-grid absolute inset-0 -z-10 opacity-45" aria-hidden="true" />

      <header className="border-b border-slate-200/80 bg-white/75 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <a href="#top" className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
            FleetGuardian Dispatch Services
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-slateBlue-700">
              Services
            </a>
            <a href="#why-us" className="transition hover:text-slateBlue-700">
              Why Us
            </a>
            <a href="#faq" className="transition hover:text-slateBlue-700">
              FAQ
            </a>
          </div>
          <a
            href="#lead-form"
            className="rounded-full bg-slateBlue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slateBlue-700"
            data-pomelli-cta="header-primary"
          >
            Get Started
          </a>
        </Container>
      </header>

      <section id="top" className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="animate-rise">
            <p className="mb-4 inline-flex rounded-full border border-slateBlue-200 bg-slateBlue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slateBlue-800">
              Dispatch support for U.S. owner-operators
            </p>
            <h1
              className="max-w-3xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Stop wasting hours chasing loads. We find them and negotiate better rates for you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              We help owner-operators and small carriers find better loads, negotiate stronger rates, and stay organized
              without the daily back-and-forth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#lead-form"
                className="rounded-full bg-slateBlue-600 px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-slateBlue-700"
                data-pomelli-cta="hero-primary"
              >
                Request Dispatch Help
              </a>
              <a
                href="tel:+17868226069"
                className="rounded-full border border-slate-300 bg-white px-7 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slateBlue-300 hover:text-slateBlue-700"
                data-pomelli-cta="hero-phone"
              >
                Prefer to talk first? Call +1 (786) 822-6069
              </a>
            </div>
          </div>

          <aside className="card-surface animate-rise delay-2 rounded-2xl p-6 sm:p-7">
            <h2 className="text-lg font-bold text-slate-900">What you get</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <li>Daily load options that match your truck so you stop wasting time searching.</li>
              <li>We negotiate rates so you do not leave money on the table.</li>
              <li>We handle broker back-and-forth so you can stay focused on driving.</li>
              <li>Clear daily updates so you can plan your week with less stress.</li>
            </ul>
            <div className="mt-6 rounded-xl border border-slateBlue-100 bg-slateBlue-50/80 p-4 text-sm text-slateBlue-900">
              Built for small carriers and owner-operators. No long-term contracts. You always approve the loads.
            </div>
          </aside>
        </Container>
      </section>

      <section id="services" className="py-14 sm:py-16" data-section="services">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Dispatch services that protect your time and margins"
            description="Every service is built to save time, increase revenue, and reduce dispatch stress during the week."
            className="animate-rise"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`card-surface animate-rise rounded-2xl p-6 ${index % 2 === 0 ? "delay-1" : "delay-2"}`}
              >
                <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="why-us" className="py-14 sm:py-16" data-section="why-us">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Reliable dispatch support without corporate complexity"
            description="Small team, direct communication, and practical support you can count on each week."
            className="animate-rise"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <article
                key={reason.title}
                className={`card-surface animate-rise rounded-2xl p-5 ${cardDelayClasses[index % cardDelayClasses.length]}`}
              >
                <h3 className="text-base font-semibold text-slate-900">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="lead-form" className="py-14 sm:py-16" data-section="lead-form">
        <Container>
          <div className="card-surface animate-rise rounded-3xl p-6 sm:p-8">
            <SectionHeading
              eyebrow="Start Here"
              title="Get Started with Dispatch Support"
              description="Tell us about your operation and we will reach out quickly to discuss lanes, rates, and how we can support your dispatch."
            />

            <form className="mt-8 grid gap-4 md:grid-cols-2" data-pomelli-form="lead-intake" action="#" method="post">
              <input type="hidden" name="utm_source" value="" />
              <input type="hidden" name="utm_campaign" value="" />
              <input type="hidden" name="utm_medium" value="" />

              <label className="text-sm font-medium text-slate-700">
                Full Name
                <input
                  type="text"
                  name="full_name"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slateBlue-400 focus:ring-2 focus:ring-slateBlue-200"
                  placeholder="John Carter"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slateBlue-400 focus:ring-2 focus:ring-slateBlue-200"
                  placeholder="(555) 123-4567"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slateBlue-400 focus:ring-2 focus:ring-slateBlue-200"
                  placeholder="dispatch@yourcompany.com"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Equipment Type
                <input
                  type="text"
                  name="equipment_type"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slateBlue-400 focus:ring-2 focus:ring-slateBlue-200"
                  placeholder="Dry Van, Reefer, Flatbed"
                />
              </label>

              <label className="text-sm font-medium text-slate-700 md:col-span-2">
                What kind of support do you need?
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slateBlue-400 focus:ring-2 focus:ring-slateBlue-200"
                  placeholder="Example: We run 2 reefers in TX, OK, and AR. Need help with load planning and better rate negotiation."
                />
              </label>

              <button
                type="submit"
                className="md:col-span-2 rounded-xl bg-slateBlue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slateBlue-700"
                data-pomelli-cta="form-submit"
              >
                Request Dispatch Help
              </button>
            </form>
          </div>
        </Container>
      </section>

      <section id="faq" className="py-14 sm:py-16" data-section="faq">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions from owner-operators"
            description="Short, direct answers to the questions most drivers ask before getting started."
            className="animate-rise"
          />

          <div className="mt-8 space-y-4">
            {faqs.map((item, index) => (
              <details
                key={item.question}
                className={`card-surface animate-rise rounded-2xl p-5 ${index % 2 === 0 ? "delay-1" : "delay-2"}`}
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="pb-16 pt-14 sm:pb-20 sm:pt-16" data-section="contact">
        <Container>
          <div className="card-surface animate-rise delay-3 rounded-3xl p-6 sm:p-8">
            <SectionHeading
              eyebrow="Contact"
              title="Talk with a dispatcher"
              description="Call or message us directly for a quick, honest answer about fit, pricing, and next steps."
            />

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+17868226069"
                className="rounded-xl bg-slateBlue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slateBlue-700"
                data-pomelli-cta="contact-phone"
              >
                Call +1 (786) 822-6069
              </a>
              <a
                href="https://wa.me/17868226069"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slateBlue-300 hover:text-slateBlue-700"
                data-pomelli-cta="contact-whatsapp"
              >
                Message on WhatsApp
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              No long-term contracts. You always approve the loads. Built for small carriers and owner-operators.   
            </p>
          </div>
        </Container>
      </section>

      <footer className="border-t border-slate-200 bg-white/70 py-8 text-center text-sm text-slate-500">
        <Container>
          <p>FleetGuardian Dispatch Services. Practical support for owner-operators and small U.S. fleets.</p>
        </Container>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <Container className="flex items-center gap-2 px-0">
          <a
            href="#lead-form"
            className="flex-1 rounded-lg bg-slateBlue-600 px-4 py-2 text-center text-sm font-semibold text-white"
            data-pomelli-cta="mobile-sticky-form"
          >
            Get Started
          </a>
          <a
            href="https://wa.me/17868226069"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700"
            data-pomelli-cta="mobile-sticky-whatsapp"
          >
            WhatsApp
          </a>
        </Container>
      </div>
    </main>
  );
}
