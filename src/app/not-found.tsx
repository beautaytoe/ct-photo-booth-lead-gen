import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page text-center max-w-xl mx-auto">
        <div className="eyebrow">404</div>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-[color:var(--color-ink-soft)]/80">
          The page you were looking for is not here. Try the homepage or check availability for
          your event.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/check-availability/" className="btn-secondary">
            Check Availability
          </Link>
        </div>
      </div>
    </section>
  );
}
