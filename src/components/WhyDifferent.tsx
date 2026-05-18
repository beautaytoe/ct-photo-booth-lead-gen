import { Icons } from './Icons';

const POINTS = [
  {
    title: 'Premium event-first design',
    body: 'Built around your event, not a generic booth setup. Every overlay, backdrop, and prop choice is intentional.',
    icon: <Icons.Spark size={20} />,
  },
  {
    title: 'Multiple booth styles for different events',
    body: 'Open-air, 360, glam, mirror, roaming, selfie, audio guestbook — pick the right tool for the room.',
    icon: <Icons.Camera size={20} />,
  },
  {
    title: 'Connecticut statewide coverage',
    body: 'Coverage available across all eight CT counties, with availability and travel pricing confirmed before booking.',
    icon: <Icons.Diamond size={20} />,
  },
  {
    title: 'Wedding, corporate, school & private-event flexibility',
    body: 'Same booth lineup, different storytelling — wedding glam, corporate brand, school selfie, gala roaming.',
    icon: <Icons.Heart size={20} />,
  },
  {
    title: 'Clean branding and custom overlays',
    body: 'Print templates, on-screen overlays, and 360 intro/outro designed around your event branding.',
    icon: <Icons.Brush size={20} />,
  },
  {
    title: 'Real add-ons, not just a single booth',
    body: 'Audio guestbook, roaming booth, custom backdrops, props, and step-and-repeat setups available.',
    icon: <Icons.Phone size={20} />,
  },
  {
    title: 'Simple booking flow',
    body: 'One form. We confirm date, propose a package, and follow up while you decide.',
    icon: <Icons.Check size={20} />,
  },
  {
    title: 'Fast response during booking hours',
    body: 'We reply quickly during booking hours so you can lock dates before someone else.',
    icon: <Icons.Spark size={20} />,
  },
  {
    title: 'Built for photos and shareable social content',
    body: 'Every package is designed so guests share the content — and that means more eyes on your event.',
    icon: <Icons.Share size={20} />,
  },
];

export function WhyDifferent() {
  return (
    <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">09 — Why We're Different</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Why Gold Coast<br />
              Photo Booth Co. feels<br />
              <em>different.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              We are not the cheapest booth in Connecticut and we don't pretend to be. We are
              built for events where the booth is part of the experience — not a corner table guests
              forget about.
            </p>
          </div>
        </div>

        <ul
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {POINTS.map((p) => (
            <li
              key={p.title}
              className="why-item"
              style={{
                padding: 24,
                border: '1px solid var(--line)',
                borderRadius: 18,
                background: 'var(--bg-soft)',
              }}
            >
              <div
                className="why-item-icon"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background:
                    'linear-gradient(160deg, rgba(212,184,124,.25), rgba(212,184,124,.05))',
                  border: '1px solid rgba(212,184,124,.3)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--gold-bright)',
                  marginBottom: 16,
                }}
              >
                {p.icon}
              </div>
              <div className="why-item-title" style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ivory)', lineHeight: 1.1 }}>
                {p.title}
              </div>
              <div className="why-item-body" style={{ marginTop: 8, fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.55 }}>
                {p.body}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
