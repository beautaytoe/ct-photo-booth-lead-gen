import Link from 'next/link';
import type { Town } from '@/lib/towns-data';

export function TownGrid({
  towns,
  title,
  subtitle,
}: {
  towns: Town[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section">
      <div className="container-page">
        {title && <div className="eyebrow">Service Areas</div>}
        {title && <h2 className="mt-2 text-3xl md:text-4xl font-semibold">{title}</h2>}
        {subtitle && <p className="mt-3 max-w-2xl text-[color:var(--color-ink-soft)]/80">{subtitle}</p>}
        <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {towns.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/service-areas/${t.slug}/`}
                className="block rounded-xl border border-[color:var(--color-blush)] bg-white px-4 py-3 hover:border-[color:var(--color-rose)] transition-colors"
              >
                <span className="font-medium text-[color:var(--color-ink)]">{t.name}, CT</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
