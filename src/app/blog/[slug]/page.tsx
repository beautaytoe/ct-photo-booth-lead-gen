import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { POSTS, getPost } from '@/lib/blog-data';
import { getService } from '@/lib/services-data';
import { getTownBySlug } from '@/lib/towns-data';
import { articleSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.related
    .map((rel) => {
      const svc = getService(rel);
      if (svc) return { href: `/${svc.slug}/`, name: svc.name };
      const town = getTownBySlug(rel);
      if (town) return { href: `/service-areas/${town.slug}/`, name: `${town.name}, CT` };
      return null;
    })
    .filter((r): r is { href: string; name: string } => !!r);

  return (
    <>
      <InnerHero
        eyebrow={`Blog · ${post.readMinutes} min read`}
        title={post.title}
        subtitle={post.excerpt}
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog/' },
              { name: post.title, href: `/blog/${post.slug}/` },
            ]}
          />
        }
      />

      <article className="section dark">
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div style={{ marginTop: 32, display: 'grid', gap: 36 }}>
            {post.sections.map((s, i) => (
              <section key={i}>
                <h2 className="display" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                  {s.heading}
                </h2>
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: 'var(--text-dim)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          {related.length > 0 && (
            <div
              style={{
                marginTop: 56,
                padding: 28,
                border: '1px solid var(--line)',
                borderRadius: 18,
                background: 'var(--bg-soft)',
              }}
            >
              <span className="eyebrow">Related</span>
              <ul style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', padding: 0 }}>
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="chip" style={{ color: 'var(--ivory)' }}>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              description: post.description,
              url: `${SITE.domain}/blog/${post.slug}/`,
              datePublished: post.date,
            })
          ),
        }}
      />
    </>
  );
}
