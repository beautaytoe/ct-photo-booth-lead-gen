import type { Metadata } from 'next';
import { InnerHero } from '@/components/Hero';
import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Icons } from '@/components/Icons';
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
      <InnerHero
        eyebrow="Contact"
        title="Get in touch."
        subtitle="We reply to inquiries within one business day."
        crumbs={
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact', href: '/contact/' }]} />
        }
      />
      <section className="section dark">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60 }}>
          <div>
            <span className="eyebrow">Direct lines</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              By phone <em>or email.</em>
            </h2>
            <ul style={{ marginTop: 28, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid var(--gold)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--gold)',
                  }}
                >
                  <Icons.Phone size={16} />
                </span>
                <a href={SITE.phoneHref} style={{ color: 'var(--ivory)', fontFamily: 'var(--serif)', fontSize: 22, textDecoration: 'none' }}>
                  {SITE.phone}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid var(--gold)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--gold)',
                  }}
                >
                  <Icons.Spark size={14} />
                </span>
                <a href={`mailto:${SITE.email}`} style={{ color: 'var(--ivory)', fontFamily: 'var(--serif)', fontSize: 22, textDecoration: 'none' }}>
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="lede" style={{ marginTop: 28 }}>
              Service area: Statewide Connecticut. Warehouse-local to Fairfield County.
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
