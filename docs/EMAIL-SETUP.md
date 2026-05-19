# Lead Email Delivery Setup

Form submissions on the site (`/check-availability/`, `/contact/`, the inline form on `/`) route through `POST /api/lead`, which hands off to `src/lib/lead-notifier.ts`. The notifier fans out to every channel that has env vars configured, in parallel, and never blocks the user's success state on any one channel.

This doc walks through getting leads into your inbox in **under 15 minutes**.

---

## TL;DR — the minimum

Add these three env vars in your Vercel project and you'll start receiving leads:

| Env var | Value | Required? |
|---|---|---|
| `RESEND_API_KEY` | `re_…` from https://resend.com → API Keys | **Yes** |
| `LEAD_TO_EMAIL` | Your inbox, e.g. `beau@rizedigital.io` | **Yes** |
| `LEAD_FROM_EMAIL` | `Gold Coast Photo Booth Co. <leads@photoboothrentalct.com>` | **Yes** for production |

Once those are set, every form submission emails you a styled lead notification **and** sends the customer a branded auto-reply confirming we got it.

---

## Step-by-step

### 1. Create a Resend account (free tier covers 3,000 emails/month)

1. Go to https://resend.com → Sign up
2. From the dashboard sidebar, choose **Domains** → **Add Domain**
3. Enter `photoboothrentalct.com`
4. Resend shows you DNS records — typically 3 records:
   - SPF (`TXT` record at root with `v=spf1 include:_spf.resend.com ~all`)
   - DKIM (a `TXT` record at `resend._domainkey`)
   - Return-Path / MX (a `MX` record at `send`)
5. Add those records at your domain registrar (where you bought the domain) or your DNS provider (Vercel, Cloudflare, Namecheap, etc.). For Vercel domains, this is in the Vercel project → Domains → DNS records.
6. Back in Resend, click **Verify** on the domain. It usually flips to green within 5–15 minutes once DNS propagates.

### 2. Get your API key

1. Resend dashboard sidebar → **API Keys** → **Create API Key**
2. Name it `photoboothrentalct.com production` (or similar)
3. Scope: **Full access** is fine; you can scope to `Sending access` only if you prefer
4. Copy the key (starts with `re_…`) — you'll only see it once

### 3. Add env vars to Vercel

1. Open the project in Vercel: https://vercel.com/beau-rize-lab/ct-photo-booth-lead-gen
2. **Settings** → **Environment Variables**
3. Add each one with **Production** environment selected (you can also tick Preview if you want preview deploys to send too):

```
RESEND_API_KEY        re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LEAD_TO_EMAIL         beau@rizedigital.io
LEAD_FROM_EMAIL       Gold Coast Photo Booth Co. <leads@photoboothrentalct.com>
```

4. (Optional but recommended) Trigger a redeploy from the **Deployments** tab — env-var changes don't auto-apply to running deployments.

### 4. Test it

After redeploying, submit a real test entry on https://www.photoboothrentalct.com/check-availability/. You should receive:

- An **operator email** to `LEAD_TO_EMAIL` — styled HTML with all form fields, a one-click "Reply" mailto link, and a footer with submission timestamp + referer.
- A **customer auto-reply** to the email you submitted — branded "We got it" confirmation.

Both should land in **under 30 seconds**.

---

## Optional add-ons

| Env var | Purpose |
|---|---|
| `LEAD_REPLY_TO_EMAIL` | If set, the operator email's `Reply-To` header points here. Default: replies go to the customer's email. |
| `LEAD_BCC_EMAIL` | Adds a BCC to the operator email (e.g., a second inbox or CRM intake address). |
| `SLACK_WEBHOOK_URL` | If set, each lead is also posted to a Slack channel. Format: `https://hooks.slack.com/services/T…/B…/…`. Set up at https://api.slack.com/messaging/webhooks. |
| `LEAD_WEBHOOK_URL` | If set, the lead JSON is also POSTed to this URL — wire to GoHighLevel inbound webhook, Zapier, n8n, anything that accepts JSON. |
| `LEAD_SEND_AUTOREPLY` | Set to `"false"` to disable the customer auto-reply. Default: enabled. |

All optional channels run in parallel. A failure in one channel **never** blocks the user submission — the user always sees the success state as long as the request was well-formed, and failures are visible in Vercel Function Logs.

---

## What's stored where

| Where | What |
|---|---|
| **Your inbox** (LEAD_TO_EMAIL) | Operator email with full lead detail + 1-click reply |
| **Customer inbox** (the email they typed) | Branded auto-reply |
| **Vercel Function Logs** | Console-logged JSON of every submission (always, even if all email channels fail) |
| **Resend dashboard** | Delivery status + open/click tracking per email |

The site does **not** store leads in a database. If you want a persistent archive, add `LEAD_WEBHOOK_URL` pointing at a Google Sheet / Airtable / Notion via Zapier, or wire up a Vercel KV / Postgres store.

---

## Spam prevention

A honeypot field (`<input name="website">`) is hidden via CSS on every form. Humans never see it; bots fill it. Submissions with a non-empty honeypot are silently dropped server-side (return 200 OK to the bot so it doesn't iterate) and console-logged with `honeypot triggered, dropping silently`.

Server-side validation also enforces:
- Name ≥ 2 chars
- Valid email format
- Phone with ≥ 7 digits

Invalid submissions return `400` with a friendly error message that the form displays.

---

## When things break

| Symptom | Likely cause | Fix |
|---|---|---|
| You're not receiving operator emails | Env vars not set in **Production** environment | Vercel → Settings → Environment Variables → confirm scope; redeploy |
| Operator emails are landing in spam | `LEAD_FROM_EMAIL` domain not verified in Resend, OR using the default `onboarding@resend.dev` | Verify the photoboothrentalct.com domain in Resend (Step 1) |
| Customer auto-replies bouncing | Customer typed a typo email | Working as expected — bounces in Resend dashboard tell you which |
| Slack pings missing | `SLACK_WEBHOOK_URL` not set, or webhook URL expired/revoked | Re-create the Slack incoming webhook |
| API returns 500 | Check Vercel Function Logs for `[lead]` lines | The `console.error` includes the failing channel and reason |
| Site form silently fails | Honeypot triggered (you filled the hidden field by accident in DevTools), OR validation failed | Open browser DevTools → Network → POST /api/lead → response body |

Vercel Function Logs filter:
```
Project → Functions → /api/lead → Logs → filter by "[lead]"
```

---

## Cost notes

- **Resend free tier:** 3,000 emails/month, 100 emails/day. Operator + auto-reply = 2 emails per lead, so the free tier covers ~50 leads/day before you'd need to upgrade. Resend Pro is $20/mo for 50K emails — by the time you outgrow free, the leads are paying for the plan many times over.
- **Slack webhooks:** free (within your existing Slack plan).
- **CRM webhooks (GHL, Zapier, etc.):** depends on the destination service.

The site itself adds zero cost — `/api/lead` runs as a Vercel serverless function, well inside the Hobby plan's free function invocation budget.
