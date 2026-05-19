/**
 * GoHighLevel API client. Server-only — uses GHL_API_KEY (Private Integration
 * Token) from env. Set in Vercel: GHL_API_KEY, GHL_LOCATION_ID.
 *
 * Docs: https://highlevel.stoplight.io/docs/integrations/
 *
 * Auth: `Authorization: Bearer ${GHL_API_KEY}` + `Version: 2021-07-28`.
 * locationId goes in the request body for the v2 contacts/upsert endpoint
 * (not the header).
 */
import 'server-only';

const BASE = 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-07-28';

function headers(): Record<string, string> {
  const token = process.env.GHL_API_KEY;
  if (!token) throw new Error('GHL_API_KEY not set');
  return {
    Authorization: `Bearer ${token}`,
    Version: API_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export type CreateContactInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  /** Lead source label — e.g. 'website_lead_form'. Defaults to 'website'. */
  source?: string;
  /** Tags applied to the GHL contact for segmentation + workflow triggers. */
  tags?: string[];
  /** Custom-field map — use either `id` (GHL field UUID) or `key` (field key). */
  customFields?: Array<{ id?: string; key?: string; field_value: string }>;
  // Free-form context — merged into the notes blob since they don't have
  // dedicated GHL fields by default. If specific fields get provisioned in
  // GHL later, move them out of notes and into customFields.
  services?: string[];
  event_type?: string;
  event_date?: string;
  guest_count?: string;
  notes?: string;
  form_location?: 'lead_form' | 'final_cta';
};

export type CreateContactResult =
  | { id: string; existing: boolean }
  | { error: string };

/**
 * Upsert a contact (create new or update existing) in the GHL sub-account.
 * `upsert` keys on email + phone, so repeat submissions from the same lead
 * don't create duplicates.
 */
export async function createOrUpsertContact(
  input: CreateContactInput
): Promise<CreateContactResult> {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) return { error: 'GHL_LOCATION_ID not set' };

  // Build a structured notes blob from the free-form context. Each line is
  // stable order so an operator scanning many leads can scan vertically.
  const noteParts: string[] = [];
  if (input.event_type) noteParts.push(`Event type: ${input.event_type}`);
  if (input.event_date) noteParts.push(`Event date: ${input.event_date}`);
  if (input.guest_count) noteParts.push(`Guest count: ${input.guest_count}`);
  if (input.services?.length)
    noteParts.push(`Services: ${input.services.join(', ')}`);
  if (input.form_location)
    noteParts.push(`Form location: ${input.form_location}`);
  if (input.notes) noteParts.push(`Notes: ${input.notes}`);
  const combinedNote = noteParts.join('\n');

  let resp: Response;
  try {
    resp = await fetch(`${BASE}/contacts/upsert`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        locationId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        source: input.source ?? 'website',
        tags: input.tags ?? [],
        customFields: input.customFields,
        notes: combinedNote || undefined,
      }),
    });
  } catch (err) {
    return { error: `GHL network error: ${err instanceof Error ? err.message : 'unknown'}` };
  }

  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    return { error: `GHL ${resp.status}: ${txt.slice(0, 300)}` };
  }

  const data = (await resp.json().catch(() => ({}))) as {
    contact?: { id?: string };
    new?: boolean;
  };
  const id = data?.contact?.id;
  if (!id) return { error: 'GHL response missing contact.id' };
  return { id, existing: data?.new === false };
}
