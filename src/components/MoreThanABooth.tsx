import { Icons } from './Icons';

const ITEMS: { name: string; icon: React.ReactNode; sub: string }[] = [
  { name: 'Vintage Audio Guestbook', icon: <Icons.Phone size={18} />, sub: 'Rotary phone voicemails' },
  { name: 'Custom Backdrops', icon: <Icons.Spark size={18} />, sub: 'Florals, velvet, mirror, neon' },
  { name: 'Premium Props', icon: <Icons.Star size={18} />, sub: 'Curated to your event' },
  { name: 'Branded Overlays', icon: <Icons.Brush size={18} />, sub: 'Print + digital templates' },
  { name: 'Instant Sharing', icon: <Icons.Share size={18} />, sub: 'QR, text, AirDrop, email' },
  { name: 'Print Packages', icon: <Icons.Camera size={18} />, sub: 'Strips, 4x6, custom layout' },
  { name: 'Roaming Booth', icon: <Icons.Camera size={18} />, sub: 'Cocktail-hour coverage' },
  { name: 'Corporate Lead Capture', icon: <Icons.Lead size={18} />, sub: 'Optional opt-in forms' },
  { name: 'Event Gallery', icon: <Icons.Qr size={18} />, sub: 'Branded post-event link' },
  { name: 'Glam Retouching', icon: <Icons.Glam size={18} />, sub: 'Editorial B&W finish' },
  { name: '360 Video Clips', icon: <Icons.ThreeSixty size={18} />, sub: 'Reels-ready slow motion' },
  { name: 'Step-and-Repeat Setup', icon: <Icons.Diamond size={18} />, sub: 'Sponsor-friendly photo wall' },
];

export function MoreThanABooth() {
  return (
    <section className="section dark" id="addons" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">03 — More Than a Booth</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              A complete event<br />
              <em>experience.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              Mix any booth style with add-ons that match your event. Custom backdrops, premium
              props, branded overlays, audio guestbook, print packages, and post-event galleries —
              packaged together or à la carte.
            </p>
          </div>
        </div>

        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {ITEMS.map((it) => (
            <li
              key={it.name}
              style={{
                padding: 18,
                border: '1px solid var(--line)',
                borderRadius: 14,
                background: 'var(--bg-soft)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                transition: 'all .3s ease',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background:
                    'linear-gradient(160deg, rgba(212,184,124,.25), rgba(212,184,124,.05))',
                  border: '1px solid rgba(212,184,124,.3)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--gold-bright)',
                }}
              >
                {it.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 19,
                    color: 'var(--ivory)',
                    lineHeight: 1.1,
                  }}
                >
                  {it.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginTop: 6,
                  }}
                >
                  {it.sub}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
