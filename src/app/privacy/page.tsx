import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
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
      <Hero eyebrow="Legal" title="Privacy Policy" />
      <section className="container-page mt-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Privacy', href: '/privacy/' }]} />
      </section>
      <section className="section">
        <div className="container-page max-w-3xl prose prose-neutral">
          <p>
            {SITE.brand} ({SITE.domain}) collects only the contact information you submit through
            our inquiry forms — typically your name, email address, phone number, event date, town
            or venue, and a short message about your event.
          </p>
          <p>
            We use that information to respond to your inquiry, prepare a quote, and (if you
            book) coordinate the event. We do not sell your information to third parties.
          </p>
          <p>
            If you provide your phone number, you consent to be contacted by phone, SMS, or
            email about your event inquiry.
          </p>
          <p>
            To request deletion of any personal information we have collected from you, email{' '}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>
            .
          </p>
          <p className="text-sm text-[color:var(--color-ink-soft)]/70">Last updated: 2026-05-18.</p>
        </div>
      </section>
    </>
  );
}
