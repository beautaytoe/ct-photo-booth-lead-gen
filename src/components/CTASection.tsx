import Link from 'next/link';
import { Icons } from './Icons';

/**
 * Compact CTA section used on internal pages.
 * The full editorial form lives in <FinalCTA /> which is reserved for the homepage and /check-availability.
 */
export function CTASection({
  title,
  subtitle,
  primaryLabel = 'Check Availability',
  primaryHref = '/check-availability/',
}: {
  title?: React.ReactNode;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="section final-cta">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <span className="eyebrow">Reserve your date</span>
          <h2 className="display" style={{ marginTop: 24 }}>
            {title ?? (
              <>
                Ready to book your <em>CT photo booth?</em>
              </>
            )}
          </h2>
          <p className="lede" style={{ marginTop: 24 }}>
            {subtitle ??
              'Tell us your date, venue, and event type — we will check availability and send a tailored package within one business day.'}
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href={primaryHref} className="btn btn-primary">
              {primaryLabel}
              <span className="arrow" />
            </Link>
            <Link href="#service-area" className="btn btn-ghost">
              <Icons.Spark size={14} /> Statewide CT coverage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
