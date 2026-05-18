import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Icons } from '@/components/Icons';
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
      <InnerHero
        eyebrow="Resources"
        title="Photo booth ideas, guides, & pricing for CT events."
        subtitle="Short, useful reads on CT photo booth rentals — pricing, booth comparisons, wedding ideas, and corporate activation tips."
        crumbs={
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }]} />
        }
      />

      <section className="section dark">
        <div className="container">
          <div className="booth-grid">
            {POSTS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className={`booth-card ${i % 2 === 0 ? 'bc-span-6' : 'bc-span-6'}`}
                style={{ minHeight: 300 }}
              >
                <div
                  className="bc-visual"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 30%, rgba(212,184,124,.25), transparent 60%), #0a0908',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--gold-bright)',
                  }}
                >
                  <Icons.Spark size={40} />
                </div>
                <div className="booth-card-num">{p.readMinutes} min read · {new Date(p.date).getFullYear()}</div>
                <h2 className="booth-card-name" style={{ fontSize: 28 }}>
                  {p.title}
                </h2>
                <p className="booth-card-desc">{p.excerpt}</p>
                <div className="booth-card-foot">
                  <span className="bc-link">
                    Read article <span style={{ fontSize: 14 }}>↗</span>
                  </span>
                  <div style={{ color: 'var(--gold)' }}>
                    <Icons.Spark size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
