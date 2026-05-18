import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { POSTS } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'CT Photo Booth Rental Blog — Pricing, Ideas & Guides',
  description:
    'Pricing guides, comparisons, ideas, and checklists for CT photo booth rentals — from 360 booths and glam booths to wedding planning and corporate activations.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage() {
  return (
    <>
      <Hero
        eyebrow="Resources"
        title="Photo booth rental ideas, guides & pricing for CT events"
        subtitle="Short, useful reads on CT photo booth rentals — pricing, booth comparisons, wedding ideas, and corporate activation tips."
      />
      <section className="container-page mt-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }]} />
      </section>

      <section className="section">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-6 hover:border-[color:var(--color-rose)]"
            >
              <div className="text-xs uppercase tracking-wider text-[color:var(--color-rose-dark)]">
                {p.readMinutes} min read
              </div>
              <h2 className="mt-2 text-2xl font-[var(--font-display)] font-semibold">{p.title}</h2>
              <p className="mt-2 text-[color:var(--color-ink-soft)]/80">{p.excerpt}</p>
              <div className="mt-4 text-[color:var(--color-rose-dark)] text-sm">Read →</div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
