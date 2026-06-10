# Setup Guide

This document walks you through setting up RealU Waitlist from scratch.

---

## Prerequisites

- Node.js 20+ and npm/pnpm
- A Supabase account (free tier is fine)
- A Resend account (free tier works for early signups)
- A Google Analytics 4 property (optional)
- A Vercel account for deployment

---

## 1. Clone and Install

```bash
git clone <your-repo-url>
cd realu-waitlist
npm install
```

---

## 2. Supabase Setup

### Create a new project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Choose a strong database password and save it.
3. Wait for the project to finish provisioning.

### Run migrations
In the Supabase Dashboard → SQL Editor, run the migration files in order:

**Step 1:** Paste and run the contents of `database/migrations/001_create_waitlist.sql`

**Step 2:** Paste and run the contents of `database/migrations/002_functions_triggers.sql`

### Verify
Run this query to confirm everything is set up:
```sql
SELECT * FROM public.waitlist_users LIMIT 1;
SELECT * FROM public.waitlist_stats;
```

Both should execute without errors (first returns no rows initially).

### Get your keys
- Dashboard → Settings → API
- Copy: Project URL, anon key, service_role key

---

## 3. Resend Setup

1. Go to [resend.com](https://resend.com) and create an account.
2. Add and verify your sending domain (e.g., `realu.app`).
3. Create an API key with Send access.
4. Note your verified `from` email address.

---

## 4. Google Analytics (Optional)

1. Create a GA4 property at analytics.google.com.
2. Create a web data stream for your domain.
3. Copy the Measurement ID (format: `G-XXXXXXXXXX`).

---

## 5. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in all values. See `docs/ENV.md` for details.

---

## 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Test the signup flow
1. Click "Reserve Your Spot"
2. Fill in the 4-step form
3. Submit
4. Verify a new row appears in Supabase: Dashboard → Table Editor → waitlist_users
5. Verify you receive the welcome email

### Test referrals
1. Sign up with one email
2. Find your referral code in Supabase
3. Visit `http://localhost:3000/invite/{your-code}`
4. The referral banner should appear
5. Sign up with a different email
6. Verify `referral_count` incremented for the referrer in Supabase

---

## 7. OG Image

Create a 1200×630px PNG at `public/og-image.png`.

Recommended content:
- Dark background matching the site
- RealU logo/wordmark
- Tagline: "Reclaim the Real You"
- Subtle accent glow

Use Figma, Canva, or any design tool.

---

## 8. Favicon

Add these files to `public/`:
- `favicon.ico`
- `favicon-16x16.png`
- `apple-touch-icon.png` (180×180)
- `site.webmanifest`

Minimal `site.webmanifest`:
```json
{
  "name": "RealU",
  "short_name": "RealU",
  "icons": [
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "theme_color": "#09090b",
  "background_color": "#09090b",
  "display": "standalone"
}
```
