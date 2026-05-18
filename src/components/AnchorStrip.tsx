import Link from 'next/link';
import { HOMEPAGE_ANCHORS } from '@/lib/site-data';

/**
 * In-page jump strip for the homepage. Horizontal scroll on mobile,
 * pill row on desktop. Never wraps — overflow-x: auto.
 */
export function AnchorStrip() {
  return (
    <section
      aria-label="Jump to section"
      className="anchor-strip"
    >
      <div className="container anchor-strip-inner">
        <span className="anchor-strip-label">Jump to</span>
        <ul className="anchor-strip-list">
          {HOMEPAGE_ANCHORS.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="anchor-pill">
                {a.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
