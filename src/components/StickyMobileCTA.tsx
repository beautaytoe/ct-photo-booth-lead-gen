import Link from 'next/link';

/**
 * Two-button sticky CTA bar for mobile.
 * Left routes to the booth lineup (low-commitment browse).
 * Right routes to the availability form (high-intent).
 *
 * When a real phone is provisioned, swap the left button for `tel:` and the
 * intent label for "Call".
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
