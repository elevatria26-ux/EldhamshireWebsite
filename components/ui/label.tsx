import * as React from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  error?: string
  hint?: string
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, error, hint, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label
          ref={ref}
          className={cn(
            'block text-sm font-medium text-foreground/90 leading-none',
            className
          )}
          {...props}
        >
          {children}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Label.displayName = 'Label'

export { Label }
