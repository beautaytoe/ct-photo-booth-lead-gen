/**
 * Dynamic OG image at /og-default.png.
 *
 * Generated at the edge via Next.js's built-in ImageResponse (no external
 * @vercel/og package needed in Next 16). 1200×630 — the standard OG aspect
 * ratio; rendered on demand and aggressively cached at the CDN.
 *
 * Wired from src/app/layout.tsx -> openGraph.images. Every page that doesn't
 * override openGraph.images picks this up automatically.
 *
 * Visual: dark brand-aligned canvas, gold accent ring with the "G" brand
 * mark, brand name in serif, taglines in mono. Roughly mirrors the site's
 * Header brand-block aesthetic so social previews feel native to the site.
 */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
// Cache aggressively — the image only changes when this file changes.
export const revalidate = 86400; // 24h

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(ellipse at 30% 25%, rgba(212,184,124,0.35), transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(216,168,160,0.18), transparent 55%), #0b0a09',
          padding: 72,
          position: 'relative',
          fontFamily: 'sans-serif',
          color: '#f5ecdb',
        }}
      >
        {/* Top-left brand block — mirrors the site Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background:
                'linear-gradient(180deg, #e6cf94 0%, #c9a865 60%, #8b6f3a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a1410',
              fontSize: 60,
              fontWeight: 700,
              fontFamily: 'serif',
              boxShadow: '0 0 60px rgba(212,184,124,0.35)',
            }}
          >
            G
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div
              style={{
                fontFamily: 'serif',
                fontSize: 38,
                lineHeight: 1.05,
                color: '#f5ecdb',
                letterSpacing: '-0.01em',
              }}
            >
              Gold Coast Photo Booth Co.
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 14,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#d4b87c',
              }}
            >
              Photo Booth Rental CT
            </div>
          </div>
        </div>

        {/* Centered editorial headline */}
        <div
          style={{
            position: 'absolute',
            left: 72,
            right: 72,
            top: 240,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#8b6f3a',
            }}
          >
            Premium · 360 · Glam · Mirror · Audio Guestbook
          </div>
          <div
            style={{
              fontFamily: 'serif',
              fontSize: 80,
              lineHeight: 1.05,
              color: '#f5ecdb',
              letterSpacing: '-0.02em',
            }}
          >
            Premium photo booth
          </div>
          <div
            style={{
              fontFamily: 'serif',
              fontSize: 80,
              lineHeight: 1.05,
              color: '#ecd49a',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
            }}
          >
            rentals across Connecticut.
          </div>
        </div>

        {/* Bottom-left URL + bottom-right tagline */}
        <div
          style={{
            position: 'absolute',
            left: 72,
            right: 72,
            bottom: 60,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#d4b87c',
            }}
          >
            photoboothrentalct.com
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#74695a',
              textAlign: 'right',
            }}
          >
            Weddings · Corporate · Galas
            <br />
            Sweet 16s · Mitzvahs · Schools
          </div>
        </div>

        {/* Hairline gold accent at the bottom — subtle brand finish */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 4,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(212,184,124,0.6) 30%, rgba(236,212,154,0.9) 50%, rgba(212,184,124,0.6) 70%, transparent 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
