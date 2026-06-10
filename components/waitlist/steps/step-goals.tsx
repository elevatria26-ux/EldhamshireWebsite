'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { stepGoalsSchema } from '@/lib/validations'
import { analytics } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import type { AddictionType, PrimaryGoal } from '@/types'
import type { z } from 'zod'

type Errors = Partial<Record<keyof z.infer<typeof stepGoalsSchema>, string>>

const goalOptions: { value: PrimaryGoal; label: string; emoji: string }[] = [
  { value: 'focus', label: 'Better focus', emoji: '🎯' },
  { value: 'discipline', label: 'More discipline', emoji: '💪' },
  { value: 'productivity', label: 'Productivity', emoji: '⚡' },
  { value: 'mental_health', label: 'Mental health', emoji: '🧠' },
  { value: 'relationships', label: 'Better relationships', emoji: '❤️' },
  { value: 'confidence', label: 'Self-confidence', emoji: '✨' },
  { value: 'other', label: 'Something else', emoji: '🌱' },
]

const addictionOptions: { value: AddictionType; label: string }[] = [
  { value: 'social_media', label: 'Social media' },
  { value: 'porn', label: 'Porn' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'phone', label: 'Phone addiction' },
  { value: 'doomscrolling', label: 'Doomscrolling' },
  { value: 'youtube', label: 'YouTube / video' },
  { value: 'other', label: 'Other' },
]

export function StepGoals() {
  const { formData, updateFormData, setCurrentStep } = useWaitlist()
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal | ''>(formData.primary_goal ?? '')
  const [addictionTypes, setAddictionTypes] = useState<AddictionType[]>(
    formData.addiction_types ?? []
  )
  const [struggles, setStruggles] = useState(formData.struggles ?? '')
  const [errors, setErrors] = useState<Errors>({})

  function toggleAddiction(value: AddictionType) {
    setAddictionTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  function validate(): boolean {
    const result = stepGoalsSchema.safeParse({ primary_goal: primaryGoal, addiction_types: addictionTypes, struggles })
    if (!result.success) {
      const fieldErrors: Errors = {}
      for (const err of result.error.errors) {
        const field = err.path[0] as keyof Errors
        if (!fieldErrors[field]) fieldErrors[field] = err.message
      }
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  function handleNext() {
    if (!validate()) return
    updateFormData({ primary_goal: primaryGoal as PrimaryGoal, addiction_types: addictionTypes, struggles })
    analytics.waitlistStepComplete(2)
    setCurrentStep(3)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">What are you working on?</h2>
        <p className="text-sm text-muted-foreground">
          This helps us personalize your RealU experience.
        </p>
      </div>

      {/* Primary goal */}
      <div className="space-y-3">
        <Label required>What&apos;s most important to improve first?</Label>
        <div className="grid grid-cols-2 gap-2">
          {goalOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPrimaryGoal(opt.value)}
              className={cn(
                'flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm transition-all duration-150',
                primaryGoal === opt.value
                  ? 'border-accent bg-accent/10 text-foreground'
                  : 'border-border bg-surface text-muted-foreground hover:border-border-subtle hover:text-foreground'
              )}
            >
              <span className="text-base">{opt.emoji}</span>
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
        {errors.primary_goal && (
          <p className="text-xs text-destructive">{errors.primary_goal}</p>
        )}
      </div>

      {/* Addiction types */}
      <div className="space-y-3">
        <Label required hint="Select all that apply">
          What habits are holding you back?
        </Label>
        <div className="flex flex-wrap gap-2">
          {addictionOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleAddiction(opt.value)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150',
                addictionTypes.includes(opt.value)
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-surface text-muted-foreground hover:border-border-subtle hover:text-foreground'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.addiction_types && (
          <p className="text-xs text-destructive">{errors.addiction_types}</p>
        )}
      </div>

      {/* Optional freeform */}
      <div className="space-y-1.5">
        <Label hint="Optional — anything specific you want us to know">
          Anything else you want to share?
        </Label>
        <Textarea
          placeholder="e.g. I spend 6+ hours on my phone daily and it's affecting my studies..."
          value={struggles}
          onChange={(e) => setStruggles(e.target.value)}
          maxLength={500}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right">{struggles.length}/500</p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setCurrentStep(1)}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button onClick={handleNext} size="lg" className="flex-1 group">
          Continue
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
