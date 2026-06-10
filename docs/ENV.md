# Environment Variables

Copy `.env.example` to `.env.local` and fill in all values before running locally.

---

## SUPABASE

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL. Found in: Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Public anon key. Safe to expose to browser. Found in: Dashboard → Settings → API → Project API Keys → anon/public |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Secret service role key. **NEVER expose to browser.** Used only in server actions. Found in: Dashboard → Settings → API → Project API Keys → service_role |

## RESEND

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ | API key from resend.com/api-keys |
| `RESEND_FROM_EMAIL` | ✅ | Verified sender email (e.g., `hello@realu.app`). Must be verified in Resend dashboard. |
| `RESEND_REPLY_TO` | Optional | Reply-to address. Defaults to support@realu.app |

## GOOGLE ANALYTICS

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 Measurement ID (e.g., `G-XXXXXXXXXX`). Found in: Google Analytics → Admin → Data Streams → your stream |

## APP CONFIG

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | ✅ | The canonical URL of this site, no trailing slash (e.g., `https://realu.app`). Used for OG images, referral links, and sitemap. |

---

## Notes

- `NEXT_PUBLIC_*` variables are embedded in the browser bundle. Never put secrets here.
- Server-only secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) are accessed only in server actions and route handlers.
- For production on Vercel, set these in: Vercel Dashboard → Project → Settings → Environment Variables.
