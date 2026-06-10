'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { submitWaitlist } from '@/actions/waitlist'
import { analytics } from '@/lib/analytics'
import { ArrowLeft, CheckCircle2, Lock } from 'lucide-react'

const goalLabels: Record<string, string> = {
  focus: 'Better focus',
  discipline: 'More discipline',
  productivity: 'Productivity',
  mental_health: 'Mental health',
  relationships: 'Better relationships',
  confidence: 'Self-confidence',
  other: 'Something else',
}

const addictionLabels: Record<string, string> = {
  social_media: 'Social media',
  porn: 'Porn',
  gaming: 'Gaming',
  phone: 'Phone addiction',
  doomscrolling: 'Doomscrolling',
  youtube: 'YouTube / video',
  other: 'Other',
}

export function StepConfirm() {
  const {
    formData,
    setCurrentStep,
    referredBy,
    isSubmitting,
    setIsSubmitting,
    setIsSuccess,
    setSuccessData,
  } = useWaitlist()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setError(null)
    setIsSubmitting(true)
    analytics.waitlistSubmit()

    try {
      const result = await submitWaitlist(formData, referredBy)

      if (!result.success) {
        setError(result.error ?? 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      setSuccessData(result.data ?? null)
      setIsSuccess(true)
      setIsSubmitting(false)
      analytics.waitlistSuccess()
    } catch {
      setError('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">You&apos;re ready.</h2>
        <p className="text-sm text-muted-foreground">
          Review your information and reserve your spot.
        </p>
      </div>

      {/* Summary card */}
      <div className="rounded-xl border border-border bg-surface divide-y divide-border overflow-hidden">
        <SummaryRow label="Name" value={formData.name} />
        <SummaryRow label="Email" value={formData.email} />
        <SummaryRow label="Username" value={formData.username ? `@${formData.username}` : undefined} />
        <SummaryRow
          label="Primary goal"
          value={formData.primary_goal ? goalLabels[formData.primary_goal] : undefined}
        />
        <SummaryRow
          label="Working on"
          value={
            formData.addiction_types?.length
              ? formData.addiction_types.map((a) => addictionLabels[a]).join(', ')
              : undefined
          }
        />
        {formData.motivation && (
          <SummaryRow
            label="Motivation"
            value={
              formData.motivation.length > 100
                ? formData.motivation.slice(0, 100) + '...'
                : formData.motivation
            }
          />
        )}
      </div>

      {/* Perks reminder */}
      <div className="space-y-2.5">
        {[
          'Priority access when the app launches',
          'Welcome email with your personal referral link',
          'Onboarding personalized to your goals',
          'Your info is encrypted and never sold',
        ].map((perk) => (
          <div key={perk} className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{perk}</span>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setCurrentStep(3)}
          disabled={isSubmitting}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          size="lg"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Reserving your spot...' : 'Reserve Spot'}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="w-3 h-3" />
        <span>Encrypted and private. No spam, ever.</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-4 px-4 py-3">
      <span className="text-xs text-muted-foreground w-24 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-foreground break-all">{value}</span>
    </div>
  )
}
