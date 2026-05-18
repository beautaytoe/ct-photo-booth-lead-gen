import Link from 'next/link';
import { Icons, boothIconFor } from './Icons';
import type { Service } from '@/lib/services-data';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/${service.slug}/`} className="booth-card bc-span-4" style={{ minHeight: 320 }}>
      <div
        className="bc-visual"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212,184,124,.18), transparent 60%), #0a0908',
          height: 100,
          display: 'grid',
          placeItems: 'center',
          color: 'var(--gold-bright)',
        }}
      >
        {boothIconFor(service.name, 36)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="booth-card-num">{service.shortName}</div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '.18em',
            color: 'var(--blush)',
            textTransform: 'uppercase',
          }}
        >
          CT Statewide
        </div>
      </div>
      <h3 className="booth-card-name">{service.name}</h3>
      <p className="booth-card-desc">{service.hero}</p>
      <div className="booth-card-tags">
        {service.bestFor.slice(0, 3).map((b) => (
          <span key={b} className="tag">
            {b}
          </span>
        ))}
      </div>
      <div className="booth-card-foot">
        <span className="bc-link">
          View Details <span style={{ fontSize: 14 }}>↗</span>
        </span>
        <div style={{ color: 'var(--gold)' }}>
          <Icons.Spark size={14} />
        </div>
      </div>
    </Link>
  );
}
