import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
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
      <Hero eyebrow="Blog" title={post.title} subtitle={post.excerpt} />

      <section className="container-page mt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog/' },
            { name: post.title, href: `/blog/${post.slug}/` },
          ]}
        />
      </section>

      <article className="section">
        <div className="container-page max-w-3xl">
          <div className="text-sm text-[color:var(--color-ink-soft)]/60">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            · {post.readMinutes} min read
          </div>
          <div className="mt-8 grid gap-10">
            {post.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-2xl md:text-3xl font-[var(--font-display)] font-semibold">
                  {s.heading}
                </h2>
                <div className="mt-3 text-[color:var(--color-ink-soft)]/90 leading-relaxed whitespace-pre-line">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-12 rounded-2xl bg-[color:var(--color-blush)]/60 p-6">
              <div className="eyebrow">Related</div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium border border-[color:var(--color-blush)] hover:border-[color:var(--color-rose)]"
                    >
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
