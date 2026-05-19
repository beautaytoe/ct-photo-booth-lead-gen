import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE.brand}.`,
  alternates: { canonical: '/privacy/' },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <InnerHero
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Privacy', href: '/privacy/' }]} />
        }
      />
      <section className="section dark">
        <div
          className="container"
          style={{ maxWidth: 760, color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7 }}
        >
          {/* H2 sectioning improves scannability for users who land on this
              page from a form-submission flow. Page remains noindex so SEO
              impact is zero; this is a trust + readability improvement. */}
          <h2 className="display" style={{ fontSize: 28, marginTop: 0 }}>
            What we collect
          </h2>
          <p style={{ marginTop: 12 }}>
            {SITE.brand} ({SITE.domain}) collects only the contact information you submit through
            our inquiry forms — typically your name, email address, phone number, event date, town
            or venue, and a short message about your event.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            How we use your information
          </h2>
          <p style={{ marginTop: 12 }}>
            We use that information to respond to your inquiry, prepare a quote, and (if you book)
            coordinate the event. We do not sell your information to third parties.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Phone, SMS, and email consent
          </h2>
          <p style={{ marginTop: 12 }}>
            If you provide your phone number, you agree to be contacted by phone, SMS, or email
            about your event inquiry. You can opt out at any time by replying STOP to any SMS we
            send, or by replying to the email thread with an opt-out request.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            Analytics and website tracking
          </h2>
          <p style={{ marginTop: 12 }}>
            We use Google Tag Manager and Google Analytics 4 to understand how visitors use the
            site (pages viewed, links clicked, form interactions). These tools may set cookies in
            your browser. No personally identifying information is shared with these tools beyond
            what is intrinsic to standard web analytics (IP-derived approximate region, browser
            type, referring page). We do not run cross-site advertising trackers or sell visitor
            data.
          </p>

          <h2 className="display" style={{ fontSize: 28, marginTop: 36 }}>
            How to contact us about privacy
          </h2>
          <p style={{ marginTop: 12 }}>
            To request deletion of any personal information we have collected from you, use the{' '}
            <Link href="/contact/" style={{ color: 'var(--gold-bright)' }}>
              contact form
            </Link>{' '}
            and a member of our team will follow up.
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
