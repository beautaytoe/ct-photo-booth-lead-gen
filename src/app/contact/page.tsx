import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Contact Gold Coast Photo Booth Co.',
  description:
    'Contact Gold Coast Photo Booth Co. for photo booth rental in Connecticut — weddings, corporate events, Sweet 16s, and private parties.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <Hero eyebrow="Contact" title="Get in touch" subtitle="We reply to inquiries within one business day." />
      <section className="container-page mt-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact', href: '/contact/' }]} />
      </section>
      <section className="section">
        <div className="container-page grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold font-[var(--font-display)]">By phone or email</h2>
            <ul className="mt-4 space-y-2 text-lg">
              <li>
                <a href={SITE.phoneHref} className="underline">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="underline">
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-[color:var(--color-ink-soft)]/70">
              Service area: Statewide Connecticut. We are based in Fairfield County.
            </p>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
