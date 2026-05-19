import Link from 'next/link';
import { Icons } from './Icons';
import { TrackedLink } from './TrackedLink';

const FEATURES: { icon: React.ReactNode; name: string; desc: string }[] = [
  { icon: <Icons.Brush />, name: 'Branded Overlays', desc: 'Brand-locked print + digital templates.' },
  { icon: <Icons.Qr />, name: 'Custom Gallery', desc: 'Branded landing page with your event gallery.' },
  { icon: <Icons.Share />, name: 'QR + SMS Sharing', desc: 'Guests share to phone, email, or social.' },
  { icon: <Icons.Lead />, name: 'Optional Lead Capture', desc: 'Forms and opt-ins for marketing teams.' },
  { icon: <Icons.Camera />, name: 'Roaming Coverage', desc: 'A handheld booth works the room.' },
  { icon: <Icons.Diamond />, name: 'Sponsor / Step-and-Repeat', desc: 'Branded photo wall for visibility.' },
  { icon: <Icons.Spark />, name: 'Post-Event Gallery Delivery', desc: 'Branded gallery delivered after the event.' },
];

const MOCK_TILES = [
  { label: 'Lead Capture', value: 'Ready' },
  { label: 'Branded Galleries', value: 'Included' },
  { label: 'QR + SMS Sharing', value: 'Built-in' },
  { label: 'Custom Overlays', value: 'Per Event' },
];

export function CorporateBlock() {
  return (
    <section className="section dark" id="corporate" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="corp-grid">
          <div>
            <span className="eyebrow">06 — Corporate Brand Activation</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              More than a photo booth —<br />
              <em>a branded event activation.</em>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Create a branded booth experience for launches, conferences, holiday parties,
              fundraisers, and corporate events. Add custom overlays, branded galleries, QR
              sharing, digital delivery, and optional lead capture so guests leave with content and
              your brand stays visible.
            </p>

            <div
              className="corp-feat"
              style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
            >
              {FEATURES.map((f) => (
                <div key={f.name} className="corp-feat-item">
                  <div className="corp-feat-icon">{f.icon}</div>
                  <div className="corp-feat-name">{f.name}</div>
                  <div className="corp-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <TrackedLink
                href="/check-availability/"
                ctaId="check_availability_corporate_block"
                className="btn btn-primary"
              >
                Plan a Corporate Booth<span className="arrow" />
              </TrackedLink>
              <Link href="/corporate-photo-booth-rental-ct/" className="btn btn-ghost">
                View corporate details
              </Link>
            </div>
          </div>

          <div className="corp-mockup">
            <div className="mock-browser">
              <div className="mock-browser-bar">
                <div className="mock-browser-dot" />
                <div className="mock-browser-dot" />
                <div className="mock-browser-dot" />
                <div className="mock-browser-url">your-event-gallery.com/custom-brand-gallery</div>
              </div>
              <div className="mock-browser-body">
                <div className="mock-gallery">
                  <div className="mock-gallery-cell" />
                  <div className="mock-gallery-cell" />
                  <div className="mock-gallery-cell" />
                  <div className="mock-gallery-cell" />
                </div>
                <div className="mock-side">
                  <div className="mock-side-row gold" />
                  <div className="mock-side-row" />
                  <div className="mock-side-row short" />
                  <div className="mock-side-row tall" />
                  <div className="mock-side-row" />
                  <div className="mock-side-row short" />
                  <div className="mock-qr" />
                </div>
              </div>
            </div>
            <div className="mock-flash">
              <span className="mock-flash-dot" /> Branded sharing live
            </div>
            <div
              className="mock-lead"
              style={{ minWidth: 220, padding: 16 }}
            >
              <div className="mock-lead-label">Corporate booth ready</div>
              <ul style={{ marginTop: 10, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                {MOCK_TILES.map((t) => (
                  <li
                    key={t.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      fontFamily: 'var(--mono)',
                      letterSpacing: '.1em',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t.label}</span>
                    <span style={{ color: 'var(--gold-bright)' }}>{t.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
