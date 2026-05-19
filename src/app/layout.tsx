import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SiteSchema } from '@/components/SiteSchema';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { SITE } from '@/lib/site-data';

// GA4 — provisioned 2026-05-19 via rize-analytics-audit
// Property ID 538263912, account Rize Digital (290563461)
const GA4_MEASUREMENT_ID = 'G-11QWB77VXP';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.seoDescriptor} | ${SITE.brand}`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    'Photo booth, 360 booth, glam, mirror, roaming, and audio guestbook rentals for Connecticut weddings, corporate events, and private celebrations. Fairfield County first.',
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand }],
  generator: 'Next.js',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.domain,
    siteName: SITE.brand,
    title: `${SITE.seoDescriptor} | ${SITE.brand}`,
    description:
      'Photo booth, 360 booth, glam, mirror, roaming, and audio guestbook rentals for Connecticut weddings, corporate events, and private celebrations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.seoDescriptor} | ${SITE.brand}`,
    description:
      'Photo booth, 360 booth, glam, mirror, roaming, and audio guestbook rentals for Connecticut weddings, corporate events, and private celebrations.',
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
        {/* GA4 — loaded only in production to keep dev console clean */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_MEASUREMENT_ID}', { send_page_view: true });
              `}
            </Script>
          </>
        )}
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
