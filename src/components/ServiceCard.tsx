import Link from 'next/link';
import type { Service } from '@/lib/services-data';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${service.slug}/`}
      className="group block rounded-2xl border border-[color:var(--color-blush)] bg-white p-6 hover:border-[color:var(--color-rose)] transition-colors shadow-sm hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-[var(--font-display)] text-xl font-semibold">{service.name}</h3>
        <span className="text-[color:var(--color-rose-dark)] group-hover:translate-x-1 transition-transform">→</span>
      </div>
      <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]/80 line-clamp-3">{service.hero}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {service.bestFor.slice(0, 3).map((b) => (
          <span
            key={b}
            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-[color:var(--color-blush)] text-[color:var(--color-ink-soft)]"
          >
            {b}
          </span>
        ))}
      </div>
    </Link>
  );
}
