'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { stepMotivationSchema } from '@/lib/validations'
import { analytics } from '@/lib/analytics'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import type { z } from 'zod'

type Errors = Partial<Record<keyof z.infer<typeof stepMotivationSchema>, string>>

const motivationPrompts = [
  'My family needs me to be present.',
  'I\'m losing years of my life to scrolling.',
  'I want to respect myself again.',
  'I can\'t focus at work and it\'s hurting my career.',
  'I feel like I\'m watching my life pass by.',
]

export function StepMotivation() {
  const { formData, updateFormData, setCurrentStep } = useWaitlist()
  const [motivation, setMotivation] = useState(formData.motivation ?? '')
  const [futureVision, setFutureVision] = useState(formData.future_vision ?? '')
  const [errors, setErrors] = useState<Errors>({})

  function validate(): boolean {
    const result = stepMotivationSchema.safeParse({ motivation, future_vision: futureVision })
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
    updateFormData({ motivation, future_vision: futureVision })
    analytics.waitlistStepComplete(3)
    setCurrentStep(4)
  }

  function usePrompt(prompt: string) {
    setMotivation((prev) => (prev ? `${prev} ${prompt}` : prompt))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Your why</h2>
        <p className="text-sm text-muted-foreground">
          People who define their motivation clearly are 3x more likely to succeed.
        </p>
      </div>

      {/* Motivation */}
      <div className="space-y-3">
        <Label required hint="Be honest. This is private.">
          Why does breaking this habit matter to you?
        </Label>
        <Textarea
          placeholder="I want to be fully present with my kids. I'm tired of looking at my phone instead of living my life..."
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          minLength={10}
          maxLength={1000}
          rows={4}
          error={errors.motivation}
        />
        {errors.motivation && <p className="text-xs text-destructive">{errors.motivation}</p>}
        <p className="text-xs text-muted-foreground text-right">{motivation.length}/1000</p>

        {/* Quick prompts */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Need a prompt?</p>
          <div className="flex flex-wrap gap-2">
            {motivationPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => usePrompt(p)}
                className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground hover:text-foreground hover:border-border-subtle transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Future vision */}
      <div className="space-y-1.5">
        <Label hint="Optional — describe what success looks like for you">
          What would your life look like if you succeeded?
        </Label>
        <Textarea
          placeholder="I'd wake up without reaching for my phone. I'd have real relationships. I'd feel proud of how I spend my time..."
          value={futureVision}
          onChange={(e) => setFutureVision(e.target.value)}
          maxLength={1000}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right">{futureVision.length}/1000</p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setCurrentStep(2)}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button onClick={handleNext} size="lg" className="flex-1 group">
          Almost done
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
