import type { Metadata } from 'next';
import { InnerHero } from '@/components/Hero';
import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Icons } from '@/components/Icons';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Gold Coast Photo Booth for CT photo booth rental — weddings, corporate events, Sweet 16s, and private parties. Fast replies during booking hours.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="Contact"
        title="Get in touch."
        subtitle="Fast replies during booking hours."
        crumbs={
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact', href: '/contact/' }]} />
        }
      />
      <section className="section dark">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60 }}>
          <div>
            <span className="eyebrow">How to reach us</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              The form is the<br />
              <em>fastest channel.</em>
            </h2>
            <p className="lede" style={{ marginTop: 28 }}>
              Send us your date, venue, and event type and we'll come back with a tailored package
              recommendation. The booking form goes straight to our team.
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {SITE.showPhonePublicly && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
                    <Icons.Phone size={14} />
                  </span>
                  <div>
                    <a
                      href={`tel:${SITE.phone.e164}`}
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 22,
                        color: 'var(--gold-bright)',
                        textDecoration: 'none',
                      }}
                      aria-label={`Call ${SITE.phone.display}`}
                    >
                      {SITE.phone.display}
                    </a>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                      Direct line — leave a message if it's after booking hours.
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--ivory)' }}>
                    Fast replies during booking hours
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                    Tailored proposal, not a generic catalog.
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
                  <Icons.Diamond size={14} />
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--ivory)' }}>
                    Statewide CT coverage
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                    Service available across Connecticut, with travel pricing confirmed before booking.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
