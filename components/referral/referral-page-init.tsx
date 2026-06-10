'use client'

import { useEffect } from 'react'
import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { analytics } from '@/lib/analytics'

interface ReferralPageInitProps {
  referralCode: string
}

export function ReferralPageInit({ referralCode }: ReferralPageInitProps) {
  const { openWaitlist } = useWaitlist()

  useEffect(() => {
    // Store referral code in session and fire analytics
    analytics.referralLinkVisit(referralCode)
    // Pre-load the referral code into context via a no-open call
    // We pass it to openWaitlist only when user clicks CTA
    try {
      sessionStorage.setItem('realu_ref', referralCode)
    } catch {
      // ignore
    }
  }, [referralCode, openWaitlist])

  return null
}
