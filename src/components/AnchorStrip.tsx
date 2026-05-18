import Link from 'next/link';
import { HOMEPAGE_ANCHORS } from '@/lib/site-data';

/**
 * In-page jump strip for the homepage.
 * Subtle horizontal pill nav that lets desktop visitors skip to the section
 * they care about; on mobile, it scrolls horizontally.
 */
export function AnchorStrip() {
  return (
    <section
      aria-label="Jump to section"
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'rgba(11,10,9,.9)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="container" style={{ paddingTop: 14, paddingBottom: 14 }}>
        <ul
          style={{
            display: 'flex',
            gap: 8,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <li
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              padding: '8px 4px',
              whiteSpace: 'nowrap',
            }}
          >
            Jump to ·
          </li>
          {HOMEPAGE_ANCHORS.map((a) => (
            <li key={a.href} style={{ flexShrink: 0 }}>
              <Link
                href={a.href}
                className="chip"
                style={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {a.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
