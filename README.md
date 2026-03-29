# Dispatch Web Page

One-page Next.js + Tailwind landing page for a truck dispatch service targeting U.S. owner-operators and small fleets.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Update before going live

- Replace phone and WhatsApp number in `app/page.tsx`
- Connect lead form (`#lead-form`) to your backend/CRM endpoint
- Keep `data-pomelli-*` attributes for campaign tracking

## Future expansion

The page is structured by sections and data arrays so testimonials and case studies can be added without changing current campaign anchors.