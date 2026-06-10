'use client'

import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { Button } from '@/components/ui/button'
import { analytics } from '@/lib/analytics'

export function SiteHeader() {
  const { openWaitlist } = useWaitlist()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-foreground tracking-tight text-lg">RealU</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#problem" className="hover:text-foreground transition-colors">The Problem</a>
          <a href="#solution" className="hover:text-foreground transition-colors">Solution</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>

        <Button
          size="sm"
          onClick={() => {
            analytics.ctaClick('header')
            openWaitlist()
          }}
        >
          Reserve Your Spot
        </Button>
      </div>
    </header>
  )
}
