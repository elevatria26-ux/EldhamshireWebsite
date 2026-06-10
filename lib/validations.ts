import { z } from 'zod'

export const stepPersonalSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be under 60 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(24, 'Username must be under 24 characters')
    .regex(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores')
    .trim(),
})

export const stepGoalsSchema = z.object({
  primary_goal: z.enum(
    ['focus', 'discipline', 'relationships', 'productivity', 'mental_health', 'confidence', 'other'],
    { required_error: 'Please select your primary goal' }
  ),
  addiction_types: z
    .array(
      z.enum(['social_media', 'porn', 'gaming', 'phone', 'doomscrolling', 'youtube', 'other'])
    )
    .min(1, 'Please select at least one area you want to improve'),
  struggles: z
    .string()
    .max(500, 'Please keep this under 500 characters')
    .optional()
    .transform((v) => v ?? ''),
})

export const stepMotivationSchema = z.object({
  motivation: z
    .string()
    .min(10, 'Please share a bit more about your motivation')
    .max(1000, 'Please keep this under 1000 characters')
    .trim(),
  future_vision: z
    .string()
    .max(1000, 'Please keep this under 1000 characters')
    .optional()
    .transform((v) => v ?? ''),
})

export const fullWaitlistSchema = stepPersonalSchema
  .merge(stepGoalsSchema)
  .merge(stepMotivationSchema)

export type StepPersonalData = z.infer<typeof stepPersonalSchema>
export type StepGoalsData = z.infer<typeof stepGoalsSchema>
export type StepMotivationData = z.infer<typeof stepMotivationSchema>
export type FullWaitlistData = z.infer<typeof fullWaitlistSchema>
