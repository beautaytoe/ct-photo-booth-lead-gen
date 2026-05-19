'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

/**
 * Client-side Link wrapper that fires a `cta_clicked` dataLayer event when
 * clicked. Use in place of <Link> on primary CTAs that live inside server
 * components (so we don't have to convert the whole component to a client
 * component just for one tracked click).
 *
 * For tel:/mailto:/external hrefs we render a plain <a> since next/link is
 * for internal navigation only.
 *
 * Usage:
 *   <TrackedLink href="/check-availability/" ctaId="check_availability_footer" className="btn btn-primary">
 *     Check Availability
 *   </TrackedLink>
 */
export interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  ctaId: string;
  /** Optional extra params merged into the dataLayer push. */
  trackParams?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}

export function TrackedLink({
  href,
  ctaId,
  trackParams,
  children,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent('cta_clicked', { cta_id: ctaId, ...(trackParams ?? {}) });
    onClick?.(e);
  };

  const isExternal =
    href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
