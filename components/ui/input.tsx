import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  prefix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, prefix, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-muted-foreground text-sm select-none pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-xl border bg-surface text-foreground text-sm transition-all duration-200',
            'placeholder:text-muted-foreground/50',
            'px-3.5 py-2',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0 focus-visible:border-accent',
            error
              ? 'border-destructive focus-visible:ring-destructive/50'
              : 'border-border hover:border-border-subtle',
            prefix && 'pl-8',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
