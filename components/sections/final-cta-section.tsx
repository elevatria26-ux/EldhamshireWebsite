'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { analytics } from '@/lib/analytics'
import { ArrowRight } from 'lucide-react'

export function FinalCtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { openWaitlist } = useWaitlist()

  return (
    <section ref={ref} className="py-24 sm:py-36 relative overflow-hidden">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold text-accent uppercase tracking-widest mb-6"
        >
          The decision
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-display-md sm:text-display-lg md:text-display-xl font-extrabold text-foreground mb-6 tracking-tight leading-[1.1]"
        >
          Don&apos;t wait for
          <br />
          rock bottom.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto"
        >
          The people who change their lives don&apos;t wait for a better moment. They
          act the moment the window is open. This is that moment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Button
            size="xl"
            onClick={() => {
              analytics.ctaClick('final_cta')
              openWaitlist()
            }}
            className="w-full sm:w-auto shadow-accent-md hover:shadow-accent-lg group text-base"
          >
            Reserve Your Spot Now — Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <span>iOS App Store launch in ~2 weeks</span>
          <span className="text-border">·</span>
          <span>100% free</span>
          <span className="text-border">·</span>
          <span>No spam, ever</span>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-border/50"
        >
          <p className="text-xl sm:text-2xl font-medium text-muted-foreground italic leading-relaxed">
            &ldquo;The version of you that you&apos;re trying to become is waiting for you
            to stop scrolling and start building.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-muted/60">— RealU Team</footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
