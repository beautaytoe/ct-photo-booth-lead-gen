import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SiteSchema } from '@/components/SiteSchema';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.brand} | Premium Photo Booth Rentals Across Connecticut`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    'Premium photo booth, 360 booth, glam booth, mirror booth, and audio guestbook rentals for Connecticut weddings, corporate events, and private celebrations. Built for Fairfield County.',
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
      'Premium photo booth, 360 booth, glam booth, mirror booth, and audio guestbook rentals for Connecticut weddings, corporate events, and private celebrations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.brand} | Premium Photo Booth Rentals Across Connecticut`,
    description:
      'Premium photo booth, 360 booth, glam booth, mirror booth, and audio guestbook rentals for Connecticut weddings, corporate events, and private celebrations.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0a09',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <SiteSchema />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
