import Link from 'next/link';
import { SITE } from '@/lib/site-data';

export function CTASection({
  title,
  subtitle,
  primaryLabel = 'Check Availability',
  primaryHref = '/check-availability/',
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative rounded-3xl overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-cream)] p-10 md:p-16">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(600px 300px at 80% 20%, var(--color-rose), transparent), radial-gradient(500px 240px at 10% 80%, var(--color-gold), transparent)',
            }}
          />
          <div className="relative max-w-2xl">
            <div className="eyebrow text-[color:var(--color-gold)]">Reserve your date</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
              {title ?? 'Ready to book your CT photo booth?'}
            </h2>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              {subtitle ??
                'Tell us your date, venue, and event type — we will check availability and send a tailored package within one business day.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={primaryHref} className="btn-gold">
                {primaryLabel} →
              </Link>
              <a href={SITE.phoneHref} className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-[color:var(--color-ink)]">
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
