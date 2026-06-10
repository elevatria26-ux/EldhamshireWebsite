export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      waitlist_users: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          username: string
          primary_goal: string | null
          addiction_types: string[] | null
          struggles: string | null
          motivation: string | null
          future_vision: string | null
          referral_code: string
          referred_by: string | null
          referral_count: number
          waitlist_position: number | null
          onboarding_complete: boolean
          status: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          username: string
          primary_goal?: string | null
          addiction_types?: string[] | null
          struggles?: string | null
          motivation?: string | null
          future_vision?: string | null
          referral_code: string
          referred_by?: string | null
          referral_count?: number
          waitlist_position?: number | null
          onboarding_complete?: boolean
          status?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          username?: string
          primary_goal?: string | null
          addiction_types?: string[] | null
          struggles?: string | null
          motivation?: string | null
          future_vision?: string | null
          referral_code?: string
          referred_by?: string | null
          referral_count?: number
          waitlist_position?: number | null
          onboarding_complete?: boolean
          status?: string
          metadata?: Json | null
        }
      }
    }
    Functions: {
      get_waitlist_count: {
        Args: Record<string, never>
        Returns: number
      }
      increment_referral_count: {
        Args: { referral_code_param: string }
        Returns: void
      }
    }
  }
}
