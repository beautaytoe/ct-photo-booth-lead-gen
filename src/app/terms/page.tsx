import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/site-data';

/**
 * Terms of Service. Noindex, follow. Excluded from sitemap (sitemap.ts only
 * includes explicit entries, so omission = exclusion). Linked from the
 * Footer next to the Privacy link.
 *
 * Trust-safe language only — no fabricated deposit amounts, refund windows,
 * cancellation fees, or insurance coverage claims. Specifics like deposit %
 * and refund windows are intentionally left to the per-booking written
 * agreement (which is what the pricing-page FAQ already says).
 */
export const metadata: Metadata = {
  title: 'Terms',
  description: `Terms of service for ${SITE.brand}.`,
  alternates: { canonical: '/terms/' },
  robots: { index: false, follow: true },
  openGraph: { url: '/terms/' },
};

export default function TermsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Legal"
        title="Terms"
        crumbs={
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Terms', href: '/terms/' }]} />
        }
      />
      <section className="section dark">
        <div
          className="container"
          style={{ maxWidth: 760, color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7 }}
        >
          <p>
            This website provides general information about photo booth rental options offered by{' '}
            {SITE.brand} and allows visitors to request availability or event information. Final
            event details, pricing, deposits, cancellation terms, setup requirements, and service
            scope are confirmed separately in writing before booking.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Services
          </h2>
          <p style={{ marginTop: 12 }}>
            We provide photo booth, 360 booth, glam booth, mirror booth, roaming booth, selfie
            booth, and audio guestbook rentals for weddings, corporate events, private parties,
            school events, and other celebrations across Connecticut. The booth lineup, add-ons,
            and package structure available at the time of your inquiry are described on this
            site; the specific services included in your booking will be listed on the written
            quote we provide.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Booking and availability
          </h2>
          <p style={{ marginTop: 12 }}>
            Submitting the inquiry form or booking a consultation through the calendar does not by
            itself reserve a date. A booking is confirmed when both parties have signed a written
            agreement and the deposit described in that agreement has been received.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Quotes, deposits, and payments
          </h2>
          <p style={{ marginTop: 12 }}>
            Quotes are valid for the window indicated on the quote document. Deposit amounts,
            payment schedules, accepted payment methods, and balance-due timing are documented in
            the booking agreement provided for your event.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Cancellations and rescheduling
          </h2>
          <p style={{ marginTop: 12 }}>
            Cancellation and rescheduling terms are described in the booking agreement. We aim to
            accommodate one date change at no charge subject to availability, but the binding
            terms are whatever is in the agreement you sign for your event.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Event access and setup requirements
          </h2>
          <p style={{ marginTop: 12 }}>
            Setup needs vary by booth style — open-air and selfie booths need less space; 360 and
            mirror booths need more clearance. Required setup time, power access, load-in path,
            and ceiling clearance for your specific event are confirmed in writing before the
            event so the venue can plan around them. Where the venue requires a Certificate of
            Insurance, share the requirements with us during booking and we will confirm what is
            needed before contract.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Limitations of liability
          </h2>
          <p style={{ marginTop: 12 }}>
            Other than what is explicitly stated in the booking agreement signed for a specific
            event, this website and the information on it are provided as-is, without warranties
            of any kind. Specifics like service-level commitments, indemnification, and dispute
            resolution are addressed in the booking agreement.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Website information
          </h2>
          <p style={{ marginTop: 12 }}>
            Pricing, availability windows, booth styles, and service-area descriptions on this
            site may be updated from time to time. The version of any terms applicable to your
            event is the version in effect on the date your booking agreement is signed.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Contact
          </h2>
          <p style={{ marginTop: 12 }}>
            For questions about these terms, use the{' '}
            <Link href="/contact/" style={{ color: 'var(--gold-bright)' }}>
              contact form
            </Link>
            .
          </p>

          <p
            style={{
              marginTop: 36,
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '.18em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Last updated · 2026-05-19
          </p>
        </div>
      </section>
    </>
  );
}
