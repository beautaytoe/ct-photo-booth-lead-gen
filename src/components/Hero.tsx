import Link from 'next/link';

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color:var(--color-blush)] via-[color:var(--color-cream)] to-white" />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(800px 400px at 80% -10%, var(--color-rose), transparent), radial-gradient(700px 360px at 10% 30%, var(--color-gold), transparent)',
        }}
      />
      <div className="container-page py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg md:text-xl text-[color:var(--color-ink-soft)]/80 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-primary">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-secondary">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
