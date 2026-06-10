'use server'

import { createServiceClient } from '@/lib/supabase/server'
import type { ActionResult, ReferralInfo } from '@/types'
import { isValidReferralCode } from '@/lib/referral'

export async function resolveReferralCode(
  code: string
): Promise<ActionResult<ReferralInfo>> {
  if (!isValidReferralCode(code)) {
    return {
      success: false,
      error: 'Invalid referral code format',
      data: { valid: false, code: null, referrer_name: null },
    }
  }

  const supabase = await createServiceClient()

  const { data: referrer } = await supabase
    .from('waitlist_users')
    .select('name, referral_code')
    .eq('referral_code', code)
    .maybeSingle()

  if (!referrer) {
    return {
      success: false,
      error: 'Referral code not found',
      data: { valid: false, code: null, referrer_name: null },
    }
  }

  return {
    success: true,
    data: {
      valid: true,
      code: referrer.referral_code,
      referrer_name: referrer.name,
    },
  }
}

export async function getWaitlistCount(): Promise<number> {
  const supabase = await createServiceClient()
  const { count } = await supabase
    .from('waitlist_users')
    .select('id', { count: 'exact', head: true })

  return count ?? 0
}
