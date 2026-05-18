import { Icons } from './Icons';

const ITEMS = [
  'Professional setup and breakdown',
  'On-site booth attendant',
  'Custom photo overlay',
  'Premium lighting',
  'Digital sharing by QR, text, or email',
  'Online gallery',
  'Curated props or clean styling',
  'Backdrop options',
  'Optional print packages',
  'Audio guestbook add-ons',
  'Corporate branding options',
  'Clear setup requirements before the event',
];

export function WhatsIncluded() {
  return (
    <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">04 — What's Included</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Every booth rental<br />
              <em>can include.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              The standard kit before any custom add-ons. Pricing varies by booth style, hours,
              backdrop, and branding work — not by whether you get an attendant.
            </p>
          </div>
        </div>

        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {ITEMS.map((label) => (
            <li
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 18px',
                background: 'var(--bg-soft)',
                border: '1px solid var(--line)',
                borderRadius: 12,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(180deg, #e6cf94, #c9a865)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#1a1410',
                  flexShrink: 0,
                }}
              >
                <Icons.Check size={14} />
              </span>
              <span style={{ fontSize: 14, color: 'var(--ivory)', lineHeight: 1.4 }}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
