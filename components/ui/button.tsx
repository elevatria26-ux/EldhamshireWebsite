import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none',

          variant === 'primary' && [
            'bg-accent text-white',
            'hover:bg-accent/90 hover:shadow-accent-sm',
            'active:scale-[0.98]',
          ],

          variant === 'secondary' && [
            'bg-surface-elevated text-foreground border border-border',
            'hover:bg-surface-elevated/80 hover:border-border-subtle',
            'active:scale-[0.98]',
          ],

          variant === 'ghost' && [
            'text-muted-foreground',
            'hover:text-foreground hover:bg-surface',
            'active:scale-[0.98]',
          ],

          variant === 'outline' && [
            'border border-border text-foreground bg-transparent',
            'hover:bg-surface hover:border-accent/50',
            'active:scale-[0.98]',
          ],

          size === 'sm' && 'h-8 px-3 text-sm rounded-lg',
          size === 'md' && 'h-10 px-5 text-sm',
          size === 'lg' && 'h-12 px-6 text-base',
          size === 'xl' && 'h-14 px-8 text-base',

          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
