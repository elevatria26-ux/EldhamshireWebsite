# Deployment Guide

Deploy RealU Waitlist to Vercel in under 10 minutes.

---

## Production Checklist

Before deploying:

- [ ] All migrations run in Supabase production project
- [ ] Resend domain verified
- [ ] OG image at `public/og-image.png`
- [ ] Favicon files in `public/`
- [ ] All environment variables ready
- [ ] `NEXT_PUBLIC_APP_URL` set to your real domain
- [ ] Custom domain configured in Vercel

---

## Deploy to Vercel

### Option A: Vercel Dashboard (easiest)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Set Framework Preset: **Next.js**
5. Add all environment variables (from `.env.example`)
6. Click Deploy

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Environment Variables on Vercel

In Vercel Dashboard → Project → Settings → Environment Variables, add:

| Name | Environment |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview (not Development) |
| `RESEND_API_KEY` | Production |
| `RESEND_FROM_EMAIL` | Production |
| `RESEND_REPLY_TO` | Production |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production |
| `NEXT_PUBLIC_APP_URL` | Production (set to your real domain) |

---

## Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g., `realu.app`)
3. Follow DNS instructions
4. Update `NEXT_PUBLIC_APP_URL` to your real domain
5. Redeploy

---

## Post-Deploy Verification

After deploying, verify:

1. **Site loads** at your domain
2. **Header CTA** opens the waitlist modal
3. **All 4 form steps** work
4. **Submission** creates a row in Supabase
5. **Welcome email** is received
6. **Referral URL** `/invite/{code}` shows the banner
7. **OG preview** looks correct (test with: https://www.opengraph.xyz)
8. **Google Analytics** shows active users in Realtime view

---

## Sending Launch Emails

When ready to launch, use this script pattern to send the launch email to all waitlist users:

```typescript
// scripts/send-launch-emails.ts
// Run with: npx tsx scripts/send-launch-emails.ts
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { render } from '@react-email/components'
import { LaunchEmail } from '../lib/email/templates/launch-email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

const APP_STORE_URL = 'https://apps.apple.com/app/realu' // Update with real URL

async function main() {
  const { data: users } = await supabase
    .from('waitlist_users')
    .select('name, email')
    .eq('status', 'waitlist')

  if (!users?.length) {
    console.log('No users to email')
    return
  }

  console.log(`Sending to ${users.length} users...`)

  for (const user of users) {
    const html = await render(LaunchEmail({ name: user.name, appStoreUrl: APP_STORE_URL }))
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: user.email,
      subject: 'Your RealU access is ready',
      html,
    })
    console.log(`✓ Sent to ${user.email}`)
    // Rate limit: 2 per second
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('Done!')
}

main().catch(console.error)
```

---

## Monitoring

- **Supabase**: Monitor signups in Table Editor → waitlist_users
- **Resend**: Check delivery rates in Resend Dashboard
- **Vercel**: Check function logs in Deployments → Functions
- **Google Analytics**: Real-time user tracking and conversion events

---

## Scaling Notes

The current architecture handles thousands of signups without changes. If you expect viral traffic:

- Enable Supabase connection pooling (Dashboard → Database → Connection pooling)
- Vercel auto-scales server actions
- Resend handles high-volume sending natively
