import Link from 'next/link';
import { SITE } from '@/lib/site-data';
import { SERVICES } from '@/lib/services-data';
import { COUNTIES } from '@/lib/towns-data';

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-ink)] text-[color:var(--color-cream)] mt-20">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-br from-[color:var(--color-gold)] to-[color:var(--color-rose)]" />
            <span className="font-[var(--font-display)] text-lg font-semibold">{SITE.shortBrand}</span>
          </div>
          <p className="text-sm text-white/70 max-w-xs">
            Premium photo booth & event-booth rentals across Connecticut. Weddings, corporate events,
            and private parties from the Gold Coast to the Quiet Corner.
          </p>
          <div className="mt-4 text-sm space-y-1">
            <a href={SITE.phoneHref} className="block text-white/80 hover:text-white">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="block text-white/80 hover:text-white">
              {SITE.email}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-3">
            Photo Booth Types
          </h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="text-white/80 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-3">
            CT Service Areas
          </h3>
          <ul className="space-y-2 text-sm">
            {COUNTIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/photo-booth-rental-${c.slug}-county-ct/`}
                  className="text-white/80 hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/service-areas/" className="text-white/80 hover:text-white">
                All CT towns →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about/" className="text-white/80 hover:text-white">About</Link></li>
            <li><Link href="/photo-booth-rental-prices-ct/" className="text-white/80 hover:text-white">Pricing</Link></li>
            <li><Link href="/blog/" className="text-white/80 hover:text-white">Blog</Link></li>
            <li><Link href="/check-availability/" className="text-white/80 hover:text-white">Check Availability</Link></li>
            <li><Link href="/contact/" className="text-white/80 hover:text-white">Contact</Link></li>
            <li><Link href="/privacy/" className="text-white/80 hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-2">
          <span>© {new Date().getFullYear()} {SITE.brand}. All rights reserved.</span>
          <span>Serving all of Connecticut — Fairfield, New Haven, Hartford, Litchfield, Middlesex, New London, Tolland, and Windham counties.</span>
        </div>
      </div>
    </footer>
  );
}
