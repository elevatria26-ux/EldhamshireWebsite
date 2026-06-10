'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { fullWaitlistSchema } from '@/lib/validations'
import { generateReferralCode } from '@/lib/referral'
import type { ActionResult, WaitlistSuccessData } from '@/types'

export async function submitWaitlist(
  formData: unknown,
  referredBy: string | null
): Promise<ActionResult<WaitlistSuccessData>> {
  const parsed = fullWaitlistSchema.safeParse(formData)

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]
    return { success: false, error: firstError?.message ?? 'Validation failed' }
  }

  const data = parsed.data
  const supabase = await createServiceClient()

  // Check for duplicate email
  const { data: existing } = await supabase
    .from('waitlist_users')
    .select('id, referral_code, waitlist_position')
    .eq('email', data.email)
    .maybeSingle()

  if (existing) {
    return {
      success: false,
      error: 'This email is already on the waitlist.',
    }
  }

  // Check for duplicate username
  const { data: existingUsername } = await supabase
    .from('waitlist_users')
    .select('id')
    .eq('username', data.username)
    .maybeSingle()

  if (existingUsername) {
    return {
      success: false,
      error: 'This username is already taken. Please choose another.',
    }
  }

  // Validate referred_by if provided
  let validReferredBy: string | null = null
  if (referredBy) {
    const { data: referrer } = await supabase
      .from('waitlist_users')
      .select('id, referral_code')
      .eq('referral_code', referredBy)
      .maybeSingle()

    if (referrer) {
      validReferredBy = referredBy
    }
  }

  const referralCode = generateReferralCode()

  // Get current waitlist count to set position
  const { count } = await supabase
    .from('waitlist_users')
    .select('id', { count: 'exact', head: true })

  const waitlistPosition = (count ?? 0) + 1

  const { data: newUser, error: insertError } = await supabase
    .from('waitlist_users')
    .insert({
      name: data.name,
      email: data.email,
      username: data.username,
      primary_goal: data.primary_goal,
      addiction_types: data.addiction_types,
      struggles: data.struggles || null,
      motivation: data.motivation,
      future_vision: data.future_vision || null,
      referral_code: referralCode,
      referred_by: validReferredBy,
      waitlist_position: waitlistPosition,
      onboarding_complete: true,
      status: 'waitlist',
    })
    .select('id, referral_code, waitlist_position, name')
    .single()

  if (insertError || !newUser) {
    console.error('Supabase insert error:', insertError)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }

  // Increment referral count for the referrer
  if (validReferredBy) {
    await supabase.rpc('increment_referral_count', {
      referral_code_param: validReferredBy,
    })
  }

  return {
    success: true,
    data: {
      referral_code: newUser.referral_code,
      waitlist_position: newUser.waitlist_position ?? waitlistPosition,
      name: newUser.name,
    },
  }
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('waitlist_users')
    .select('id')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle()

  return !!data
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('waitlist_users')
    .select('id')
    .eq('username', username.toLowerCase().trim())
    .maybeSingle()

  return !!data
}
