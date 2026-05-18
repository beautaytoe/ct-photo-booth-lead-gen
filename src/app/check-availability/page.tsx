import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Check Availability | Gold Coast Photo Booth Co.',
  description:
    'Check CT photo booth rental availability for your wedding, corporate event, or private party. We reply within one business day.',
  alternates: { canonical: '/check-availability/' },
};

export default function CheckAvailabilityPage() {
  return (
    <>
      <Hero
        eyebrow="Reserve your date"
        title="Check Availability"
        subtitle="Tell us your date, town, and event type — we will confirm availability and send a tailored package within one business day."
      />

      <section className="container-page mt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Check Availability', href: '/check-availability/' },
          ]}
        />
      </section>

      <section className="section">
        <div className="container-page grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <LeadForm />
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-6">
              <h3 className="font-[var(--font-display)] text-xl font-semibold">
                Talk to a human
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]/80">
                Prefer to call? We answer during business hours and return missed calls within one
                business day.
              </p>
              <a href={SITE.phoneHref} className="btn-primary mt-4 text-sm">
                Call {SITE.phone}
              </a>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-6">
              <h3 className="font-[var(--font-display)] text-xl font-semibold">What to expect</h3>
              <ul className="mt-3 text-sm space-y-2">
                <li className="flex gap-2">
                  <span className="text-[color:var(--color-rose-dark)]">1.</span>
                  <span>We confirm availability for your date and venue.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[color:var(--color-rose-dark)]">2.</span>
                  <span>We send a tailored package with booth style, hours, and add-ons.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[color:var(--color-rose-dark)]">3.</span>
                  <span>A 25% deposit holds your date. Balance is due 14 days pre-event.</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
