'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { stepPersonalSchema } from '@/lib/validations'
import { sanitizeUsername } from '@/lib/utils'
import { analytics } from '@/lib/analytics'
import { ArrowRight } from 'lucide-react'
import type { z } from 'zod'

type Errors = Partial<Record<keyof z.infer<typeof stepPersonalSchema>, string>>

export function StepPersonal() {
  const { formData, updateFormData, setCurrentStep } = useWaitlist()
  const [errors, setErrors] = useState<Errors>({})
  const [values, setValues] = useState({
    name: formData.name ?? '',
    email: formData.email ?? '',
    username: formData.username ?? '',
  })

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((v) => ({ ...v, username: sanitizeUsername(e.target.value) }))
  }

  function validate(): boolean {
    const result = stepPersonalSchema.safeParse(values)
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
    updateFormData(values)
    analytics.waitlistStepComplete(1)
    setCurrentStep(2)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Let&apos;s start with you</h2>
        <p className="text-sm text-muted-foreground">
          This information is private and will personalize your experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label required>Your name</Label>
          <Input
            placeholder="Alex Johnson"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            error={errors.name}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label required>Email address</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            error={errors.email}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label required hint="Lowercase letters, numbers, and underscores only">
            Choose a username
          </Label>
          <Input
            prefix="@"
            placeholder="alex_realu"
            value={values.username}
            onChange={handleUsernameChange}
            error={errors.username}
            autoComplete="username"
            maxLength={24}
          />
          {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
        </div>
      </div>

      <div className="pt-2">
        <Button onClick={handleNext} size="lg" className="w-full group">
          Continue
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          Your email is used only for launch updates. No spam.
        </p>
      </div>
    </div>
  )
}
