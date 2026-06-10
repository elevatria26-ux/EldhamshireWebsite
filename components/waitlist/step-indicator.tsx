'use client'

import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-0.5 bg-surface-elevated rounded-full mb-4">
        <div
          className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>

      {/* Step labels */}
      <div className="flex justify-between">
        {stepLabels.map((label, i) => {
          const step = i + 1
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep

          return (
            <div
              key={label}
              className={cn(
                'flex flex-col items-center gap-1.5 flex-1',
                i === 0 && 'items-start',
                i === stepLabels.length - 1 && 'items-end'
              )}
            >
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                  isCompleted && 'bg-accent text-white',
                  isCurrent && 'bg-accent/20 border-2 border-accent text-accent',
                  !isCompleted && !isCurrent && 'bg-surface-elevated border border-border text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.5 8.5L1 6l-.7.7 3.2 3.2 7-7-.7-.7z" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors hidden sm:block',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
