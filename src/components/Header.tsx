import Link from 'next/link';
import { NAV, SITE } from '@/lib/site-data';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-[color:var(--color-cream)]/85 border-b border-[color:var(--color-blush)]">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-br from-[color:var(--color-gold)] to-[color:var(--color-rose)] ring-2 ring-[color:var(--color-ink)] ring-offset-2 ring-offset-[color:var(--color-cream)]" />
          <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight">
            {SITE.shortBrand}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden sm:inline-flex text-sm font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
          >
            {SITE.phone}
          </a>
          <Link href={NAV.cta.href} className="btn-primary text-sm">
            {NAV.cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
