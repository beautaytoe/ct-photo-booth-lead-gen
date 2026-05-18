import Link from 'next/link';
import { Icons } from './Icons';

type Visual = 'openair' | 'threesixty' | 'glam' | 'mirror' | 'selfie' | 'audio' | 'corporate';

const BOOTHS: {
  n: string;
  name: string;
  desc: string;
  tags: string[];
  span: string;
  visual: Visual;
  ideal: string;
  href: string;
}[] = [
  {
    n: '01',
    name: 'Open-Air Photo Booth',
    desc: 'The crowd-pleaser. Wide backdrop, premium DSLR, custom-printed strips in 8 seconds, and digital sharing on tap.',
    tags: ['Wedding', 'Corporate', 'Galas', 'Sweet 16'],
    span: 'bc-span-6',
    visual: 'openair',
    ideal: 'Up to 200 guests',
    href: '/open-air-photo-booth-rental-ct/',
  },
  {
    n: '02',
    name: '360 Photo Booth',
    desc: 'An LED platform, a slow-mo rig, and a cinematic vertical loop your guests will repost before they sit back down.',
    tags: ['Sweet 16', 'Mitzvah', 'Brand', 'Wedding'],
    span: 'bc-span-6',
    visual: 'threesixty',
    ideal: 'Highest social impact',
    href: '/360-photo-booth-rental-ct/',
  },
  {
    n: '03',
    name: 'Glam Photo Booth',
    desc: 'Black & white editorial portraits with soft skin retouching, inspired by the magazine. Every guest looks like the cover.',
    tags: ['Wedding', 'Gala', 'Brand', 'Sweet 16'],
    span: 'bc-span-4',
    visual: 'glam',
    ideal: 'Editorial finish',
    href: '/glam-photo-booth-rental-ct/',
  },
  {
    n: '04',
    name: 'Mirror Photo Booth',
    desc: 'A full-length magic mirror with on-screen prompts, animated signatures, and instant printing. Theatrical in the best way.',
    tags: ['Wedding', 'Sweet 16', 'Gala'],
    span: 'bc-span-4',
    visual: 'mirror',
    ideal: 'Footprint friendly',
    href: '/mirror-photo-booth-rental-ct/',
  },
  {
    n: '05',
    name: 'Selfie Booth',
    desc: 'Sleek standing iPad station with custom overlays and direct-to-phone delivery. Low footprint, high volume, zero attendant friction.',
    tags: ['School', 'Brand', 'Cocktail Hour'],
    span: 'bc-span-4',
    visual: 'selfie',
    ideal: 'Compact spaces',
    href: '/selfie-booth-rental-ct/',
  },
  {
    n: '06',
    name: 'Audio Guestbook',
    desc: 'A vintage rotary phone. Guests leave a voicemail for the couple — toast, story, or roast. You get the audio reel.',
    tags: ['Wedding', 'Anniversary', 'Retirement'],
    span: 'bc-span-6',
    visual: 'audio',
    ideal: 'Sentimental favourite',
    href: '/audio-guestbook-rental-ct/',
  },
  {
    n: '07',
    name: 'Corporate Brand Activation',
    desc: 'Branded booth, custom overlays, lead capture form, digital gallery, and a post-event analytics report. Treated like a campaign.',
    tags: ['Trade Show', 'Conference', 'Launch', 'Pop-Up'],
    span: 'bc-span-6',
    visual: 'corporate',
    ideal: 'Marketing-team approved',
    href: '/corporate-photo-booth-rental-ct/',
  },
];

function BoothVisual({ kind }: { kind: Visual }) {
  if (kind === 'openair') {
    return (
      <div className="bc-visual" style={{ background: 'linear-gradient(160deg, #1a1410, #0a0908)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(236,212,154,.35), transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', color: 'var(--gold-bright)' }}>
          <Icons.Camera size={44} />
        </div>
        <div style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ width: 22, height: 28, background: i === 1 ? 'rgba(216,168,160,.4)' : 'rgba(212,184,124,.25)', border: '1px solid rgba(212,184,124,.4)', borderRadius: 2 }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === 'threesixty') {
    return (
      <div className="bc-visual" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212,184,124,.18), transparent 60%), #0a0908' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '2px solid var(--gold)',
            boxShadow: '0 0 40px rgba(212,184,124,.5), inset 0 0 30px rgba(212,184,124,.2)',
            animation: 'spin 8s linear infinite',
          }}
        >
          <div style={{ position: 'absolute', top: -4, left: '50%', width: 8, height: 8, background: 'var(--gold-bright)', borderRadius: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 12px var(--gold-bright)' }} />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--gold-bright)' }}>
          <Icons.ThreeSixty size={36} />
        </div>
        <style>{`@keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }`}</style>
      </div>
    );
  }
  if (kind === 'glam') {
    return (
      <div className="bc-visual" style={{ background: '#0a0908' }}>
        <div style={{ position: 'absolute', inset: '10% 25%', border: '2px solid var(--gold)', borderRadius: '50% / 35%', background: 'linear-gradient(180deg, rgba(255,250,240,.05), rgba(255,250,240,.02))' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--ivory)', opacity: 0.9 }}>
          <Icons.Glam size={32} />
        </div>
      </div>
    );
  }
  if (kind === 'mirror') {
    return (
      <div className="bc-visual" style={{ background: 'linear-gradient(160deg, #1a1410, #0a0908)' }}>
        <div style={{ position: 'absolute', inset: '8% 30%', border: '2px solid var(--gold-bright)', borderRadius: '50% 50% 8px 8px', background: 'linear-gradient(180deg, rgba(236,212,154,.15), transparent)', boxShadow: '0 0 30px rgba(212,184,124,.3), inset 0 0 20px rgba(255,250,240,.1)' }} />
      </div>
    );
  }
  if (kind === 'selfie') {
    return (
      <div className="bc-visual" style={{ background: '#0a0908' }}>
        <div style={{ position: 'absolute', inset: '8% 38%', border: '2px solid var(--gold)', borderRadius: 12, background: 'linear-gradient(180deg, rgba(216,168,160,.15), rgba(216,168,160,.02))' }}>
          <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, background: 'var(--gold-bright)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--gold-bright)' }}>
            <Icons.Spark size={16} />
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'audio') {
    return (
      <div className="bc-visual" style={{ background: 'linear-gradient(160deg, #1a1410, #0a0908)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--gold-bright)', filter: 'drop-shadow(0 0 12px rgba(216,168,160,.4))' }}>
          <Icons.Phone size={56} />
        </div>
        <svg style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)' }} width="120" height="20" viewBox="0 0 120 20">
          {[3, 8, 4, 12, 6, 10, 5, 9, 7, 11, 4, 8, 3].map((h, i) => (
            <rect key={i} x={i * 9} y={10 - h / 2} width="3" height={h} fill="var(--gold)" opacity={0.4 + (i % 3) * 0.2} />
          ))}
        </svg>
      </div>
    );
  }
  return (
    <div className="bc-visual" style={{ background: 'linear-gradient(160deg, #0a0908, #1a1410)' }}>
      <div style={{ position: 'absolute', inset: '15% 15%', background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 6, padding: 8 }}>
        <div style={{ height: 4, width: '30%', background: 'var(--gold)', borderRadius: 2, marginBottom: 6 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <div style={{ aspectRatio: '1', background: 'rgba(216,168,160,.2)', borderRadius: 3 }} />
          <div style={{ aspectRatio: '1', background: 'rgba(212,184,124,.2)', borderRadius: 3 }} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, color: 'var(--gold-bright)' }}>
        <Icons.Qr size={28} />
      </div>
    </div>
  );
}

export function BoothCards() {
  return (
    <section className="section dark" id="experiences">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">02 — The Lineup</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Choose your<br />
              <em>booth experience.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              Seven configurations — from the classic open-air strip to a 360 platform and the audio
              guestbook brides text us about for months. Mix and match.
            </p>
          </div>
        </div>

        <div className="booth-grid">
          {BOOTHS.map((b) => (
            <Link key={b.n} href={b.href} className={`booth-card ${b.span}`}>
              <BoothVisual kind={b.visual} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="booth-card-num">No. {b.n}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--blush)', textTransform: 'uppercase' }}>
                  {b.ideal}
                </div>
              </div>
              <h3 className="booth-card-name">{b.name}</h3>
              <p className="booth-card-desc">{b.desc}</p>
              <div className="booth-card-tags">
                {b.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="booth-card-foot">
                <span className="bc-link">
                  View Details <span style={{ fontSize: 14 }}>↗</span>
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
  );
}
