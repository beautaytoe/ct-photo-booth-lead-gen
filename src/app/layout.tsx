import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SiteSchema } from '@/components/SiteSchema';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.brand} | Premium Photo Booth Rentals Across Connecticut`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    'Premium photo booth rentals across Connecticut — 360 booths, glam booths, wedding photo booths, corporate event booths, and more. Serving Fairfield County and all of CT.',
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand }],
  generator: 'Next.js',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.domain,
    siteName: SITE.brand,
    title: `${SITE.brand} | Premium Photo Booth Rentals Across Connecticut`,
    description:
      'Premium photo booth rentals across Connecticut — 360 booths, glam booths, wedding photo booths, corporate event booths, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.brand} | Premium Photo Booth Rentals Across Connecticut`,
    description:
      'Premium photo booth rentals across Connecticut — 360 booths, glam booths, wedding photo booths, corporate event booths, and more.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0b10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        <SiteSchema />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
