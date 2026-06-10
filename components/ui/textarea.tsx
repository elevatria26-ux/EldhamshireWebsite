import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[100px] w-full rounded-xl border bg-surface text-foreground text-sm transition-all duration-200',
          'placeholder:text-muted-foreground/50',
          'px-3.5 py-3 resize-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0 focus-visible:border-accent',
          error
            ? 'border-destructive focus-visible:ring-destructive/50'
            : 'border-border hover:border-border-subtle',
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
