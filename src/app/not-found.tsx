import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section dark" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
        <span className="eyebrow">404</span>
        <h1 className="display" style={{ marginTop: 24, fontSize: 'clamp(48px, 8vw, 96px)' }}>
          Page <em>not found.</em>
        </h1>
        <p className="lede" style={{ marginTop: 16, marginInline: 'auto' }}>
          The page you were looking for is not here. Try the homepage or check availability for your
          event.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Home
          </Link>
          <Link href="/check-availability/" className="btn btn-ghost">
            Check Availability
          </Link>
        </div>
      </div>
    </section>
  );
}
