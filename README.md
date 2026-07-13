# Brightdesk Supplies LLC

Premium customer-facing furniture e-commerce storefront for Brightdesk Supplies LLC — a Bronx, New York-based furniture business.

**Tagline:** Work clearly. Live comfortably.  
**Positioning:** Furniture for the way work and life overlap.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS
- Motion, Zustand, React Hook Form + Zod
- Stripe Checkout (test/live), optional Resend + Supabase
- Vitest + Playwright

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Default mode is `demo`. Incomplete products cannot enter live checkout.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm test` — unit tests
- `npm run test:e2e` — Playwright

## Catalog

Exactly **26** initial development products across desks, meeting furniture, storage, task/guest seating, lounge, loveseat, bench, ottoman, side tables and a reception set.

All products start with:

- `productionReady: false`
- pending image/spec/safety verification

## Documentation

See `/docs` for setup, deployment, product editing, image sourcing, payments, shipping, tax, email, verification and launch checklist.

## Truthfulness

Do not invent manufacturing, showroom, ergonomic, certification, warranty, free-shipping or review claims. Full address visibility and owner-name display are controlled in `src/data/store-config.ts`.
