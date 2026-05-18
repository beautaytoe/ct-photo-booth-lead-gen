import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-data';

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schemaItems = items.map((c) => ({
    name: c.name,
    url: `${SITE.domain}${c.href ?? '/'}`,
  }));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(schemaItems)) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-[color:var(--color-ink-soft)]/70">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {item.href ? (
                <Link href={item.href} className="hover:text-[color:var(--color-ink)]">
                  {item.name}
                </Link>
              ) : (
                <span className="text-[color:var(--color-ink)] font-medium">{item.name}</span>
              )}
              {i < items.length - 1 && <span className="text-[color:var(--color-ink-soft)]/40">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
