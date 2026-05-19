/**
 * GTM dataLayer push helper. SSR-safe (no-op on server).
 *
 * GTM container GTM-THGBKX3L has custom event triggers listening for these
 * event names: form_start, form_submit, form_error, service_selected,
 * cta_clicked. Anything pushed here flows into GA4 + any other vendor tags
 * the container fires.
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('form_submit', { form_location: 'lead_form', services: 'glam,360' });
 */
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
