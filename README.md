# Gold Coast Photo Booth Co. — Connecticut Lead Generation Site

A Next.js 16 / Tailwind v4 statewide local-SEO lead-generation website for premium photo booth & event-booth rentals across Connecticut.

## Stack

- Next.js 16 App Router (static-first)
- TypeScript
- Tailwind CSS v4
- React 19
- Deployed on Vercel

## Architecture

Modeled after the Associated Refuse statewide CT lead-gen architecture:

- **Statewide / brand pages** at the root (`/photo-booth-rental-ct/`, `/360-photo-booth-rental-ct/`, etc.)
- **County hub pages** at `/service-areas/<county>-county-ct/` (8 CT counties)
- **Town/city location pages** at `/service-areas/<town>-ct/`
- **Town pages keyed off the keyword data** are indexable; thin small-town routes are `noindex` until expanded.
- **Tiering** lives in `src/lib/towns-data.ts` (`tier: 1 | 2 | 3`).

## Run locally

```bash
npm install
npm run dev
```

## SEO

- `sitemap.ts` only emits Tier 1 / 2 indexable URLs.
- `robots.ts` allows all crawl on indexable routes.
- Each indexable page has unique `title`, `description`, `h1`, FAQ, internal links, breadcrumbs, and CTA.
- Schema is conservative: `Organization` + `WebSite` site-wide, `Service` on service pages. No fake `LocalBusiness` address, no fake reviews.

## Compliance

This site avoids:
- claims of a physical address until provided,
- claims of venue partnerships,
- "X years in business" / fake review claims,
- LocalBusiness schema with a fake address,
- AggregateRating / Review schema without real reviews.

## Lead capture

Until a GoHighLevel form embed is provided, every CTA points at `/check-availability/` which renders a placeholder form that POSTs to a Next.js route handler (`/api/lead`) and currently just acknowledges receipt. Wire to GHL when ready.

## Brand

Default brand: **Gold Coast Photo Booth Co.**
