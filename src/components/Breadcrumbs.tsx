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
      <nav aria-label="Breadcrumb" className="crumbs">
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span className="here">{item.name}</span>
            )}
            {i < items.length - 1 && <span className="sep">/</span>}
          </span>
        ))}
      </nav>
    </>
  );
}
