import Link from 'next/link';
import { SITE } from '@/lib/site-data';

/**
 * Two-button sticky CTA bar for mobile.
 * When phone is provisioned (SITE.showPhonePublicly): left button is a tel:
 * "Call" link. Otherwise: left button browses the booth lineup.
 * Right button is always the availability form (high-intent).
 */
export function StickyMobileCTA() {
  return (
    <div
      className="mobile-cta"
      style={{
        display: 'none',
        flexDirection: 'row',
        gap: 8,
      }}
    >
      {SITE.showPhonePublicly ? (
        <a
          href={`tel:${SITE.phone.e164}`}
          className="btn btn-ghost"
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 16,
            fontSize: 12,
            background: 'rgba(11,10,9,.92)',
            backdropFilter: 'blur(10px)',
          }}
          aria-label={`Call ${SITE.phone.display}`}
        >
          Call Us
        </a>
      ) : (
        <Link
          href="/photo-booth-rental-ct/"
          className="btn btn-ghost"
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 16,
            fontSize: 12,
            background: 'rgba(11,10,9,.92)',
            backdropFilter: 'blur(10px)',
          }}
        >
          View Booths
        </Link>
      )}
      <Link
        href="/check-availability/"
        className="btn btn-primary"
        style={{ flex: 1.4, justifyContent: 'center', padding: 16, fontSize: 12 }}
      >
        Check Availability<span className="arrow" />
      </Link>
    </div>
  );
}
