export type WaitlistStatus = 'waitlist' | 'early_access' | 'launched'

export type AddictionType =
  | 'social_media'
  | 'porn'
  | 'gaming'
  | 'phone'
  | 'doomscrolling'
  | 'youtube'
  | 'other'

export type PrimaryGoal =
  | 'focus'
  | 'discipline'
  | 'relationships'
  | 'productivity'
  | 'mental_health'
  | 'confidence'
  | 'other'

export interface WaitlistUser {
  id: string
  created_at: string
  name: string
  email: string
  username: string
  primary_goal: PrimaryGoal | null
  addiction_types: AddictionType[] | null
  struggles: string | null
  motivation: string | null
  future_vision: string | null
  referral_code: string
  referred_by: string | null
  referral_count: number
  waitlist_position: number | null
  onboarding_complete: boolean
  status: WaitlistStatus
  metadata: Record<string, unknown> | null
}

export interface WaitlistFormData {
  name: string
  email: string
  username: string
  primary_goal: PrimaryGoal
  addiction_types: AddictionType[]
  struggles: string
  motivation: string
  future_vision: string
}

export interface WaitlistContextType {
  formData: Partial<WaitlistFormData>
  updateFormData: (data: Partial<WaitlistFormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isOpen: boolean
  openWaitlist: (referralCode?: string) => void
  closeWaitlist: () => void
  isSubmitting: boolean
  setIsSubmitting: (v: boolean) => void
  isSuccess: boolean
  setIsSuccess: (v: boolean) => void
  successData: WaitlistSuccessData | null
  setSuccessData: (v: WaitlistSuccessData | null) => void
  referredBy: string | null
}

export interface WaitlistSuccessData {
  referral_code: string
  waitlist_position: number
  name: string
}

export interface ActionResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface ReferralInfo {
  valid: boolean
  code: string | null
  referrer_name: string | null
}
