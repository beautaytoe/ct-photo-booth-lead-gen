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
        <div className="container" style={{ maxWidth: 760, display: 'grid', gap: 18, color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7 }}>
          <p>
            {SITE.brand} ({SITE.domain}) collects only the contact information you submit through
            our inquiry forms — typically your name, email address, phone number, event date, town
            or venue, and a short message about your event.
          </p>
          <p>
            We use that information to respond to your inquiry, prepare a quote, and (if you book)
            coordinate the event. We do not sell your information to third parties.
          </p>
          <p>
            If you provide your phone number, you consent to be contacted by phone, SMS, or email
            about your event inquiry.
          </p>
          <p>
            To request deletion of any personal information we have collected from you, use the{' '}
            <Link href="/contact/" style={{ color: 'var(--gold-bright)' }}>
              contact form
            </Link>{' '}
            and a member of our team will follow up.
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Last updated · 2026-05-18
          </p>
        </div>
      </section>
    </>
  );
}
