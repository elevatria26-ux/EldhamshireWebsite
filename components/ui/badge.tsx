import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'success' | 'muted' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors',
        variant === 'default' && 'bg-surface-elevated border border-border text-muted-foreground',
        variant === 'accent' && 'bg-accent/15 text-accent border border-accent/20',
        variant === 'success' && 'bg-success/10 text-success border border-success/20',
        variant === 'muted' && 'bg-muted/10 text-muted-foreground',
        variant === 'outline' && 'border border-border text-muted-foreground bg-transparent',
        className
      )}
      {...props}
    />
  )
}

export { Badge }
