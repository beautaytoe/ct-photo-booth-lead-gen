import Link from 'next/link';
import type { Town } from '@/lib/towns-data';

export function TownGrid({
  towns,
  title,
  subtitle,
  eyebrow,
}: {
  towns: Town[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="section dark">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && (
          <h2 className="display" style={{ marginTop: eyebrow ? 24 : 0 }}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="lede" style={{ marginTop: 16, maxWidth: '60ch' }}>
            {subtitle}
          </p>
        )}
        <ul
          className="tile-grid"
          style={{ marginTop: 40, listStyle: 'none', padding: 0 }}
        >
          {towns.map((t) => (
            <li key={t.slug}>
              <Link href={`/service-areas/${t.slug}/`} className="tile">
                <span className="tile-meta">CT · Tier {t.tier}</span>
                <span className="tile-name">{t.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
