import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SiteSchema } from '@/components/SiteSchema';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { SITE } from '@/lib/site-data';

// GTM container — version 4 published 2026-05-19 with custom event triggers
// for form_start / form_submit / form_error / service_selected / cta_clicked.
// GA4 (G-11QWB77VXP) is fired via the GTM container, not directly here.
const GTM_CONTAINER_ID = 'GTM-THGBKX3L';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    // Default homepage title. Page-level titles use the template below; the
    // shortened "Gold Coast" suffix keeps total length under Google's ~60
    // char SERP truncation on most pages.
    default: `${SITE.seoDescriptor} | ${SITE.titleSuffix}`,
    template: `%s | ${SITE.titleSuffix}`,
  },
  description:
    'Premium photo booth, 360, glam, mirror, roaming, and audio guestbook rentals for Connecticut weddings, corporate events, and private celebrations.',
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand }],
  generator: 'Next.js',
  alternates: { canonical: '/' },
  openGraph: {
    // INVARIANT fields only at the layout level. title/description/url are
    // intentionally NOT set here — Next.js derives them per-page from the
    // page's `title` and `description` metadata + the request URL. Setting
    // them at the layout overrides per-page values on routes that use the
    // static `metadata: Metadata = {...}` pattern without their own
    // openGraph block (/about/, /contact/, /check-availability/, /blog/,
    // /privacy/), forcing those pages to render the homepage's social
    // preview instead of their own. Audit: see Critical #C1.
    type: 'website',
    locale: 'en_US',
    siteName: SITE.brand,
    // /og-default.png is generated dynamically by src/app/og-default.png/route.tsx
    // via Next 16's ImageResponse (edge runtime, 24h cache). Every page that
    // doesn't override openGraph.images picks this up.
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Gold Coast Photo Booth Co. — Premium CT Photo Booth Rentals',
      },
    ],
  },
  // Twitter intentionally omits `title` + `description` so Next.js auto-mirrors
  // from openGraph at each page. Setting them at layout level would override
  // page-specific og values and show the homepage strings on every page.
  twitter: {
    card: 'summary_large_image',
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
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        {/* GTM — loaded only in production to keep dev console clean. The
            container loads GA4 + any other vendor tags configured in GTM. */}
        {process.env.NODE_ENV === 'production' && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
          </Script>
        )}
      </head>
      <body>
        {/* GTM noscript fallback — fires container even with JS disabled. */}
        {process.env.NODE_ENV === 'production' && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <SiteSchema />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
