'use client'

import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { Button } from '@/components/ui/button'
import { analytics } from '@/lib/analytics'
import { Users } from 'lucide-react'

interface ReferralBannerProps {
  referrerName: string
  referralCode: string
}

export function ReferralBanner({ referrerName, referralCode }: ReferralBannerProps) {
  const { openWaitlist } = useWaitlist()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 text-sm min-w-0">
        <Users className="w-4 h-4 text-accent flex-shrink-0" />
        <span className="text-foreground/80 truncate">
          <span className="font-semibold text-foreground">{referrerName}</span>{' '}
          invited you to join RealU
        </span>
      </div>
      <Button
        size="sm"
        onClick={() => {
          analytics.ctaClick('referral_banner')
          openWaitlist(referralCode)
        }}
        className="flex-shrink-0"
      >
        Join the waitlist
      </Button>
    </div>
  )
}
