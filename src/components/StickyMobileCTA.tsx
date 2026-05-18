import Link from 'next/link';

export function StickyMobileCTA() {
  return (
    <div className="mobile-cta">
      <Link href="/check-availability/" className="btn btn-primary">
        Check Availability<span className="arrow" />
      </Link>
    </div>
  );
}
