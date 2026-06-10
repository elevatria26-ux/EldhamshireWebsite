'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  BarChart3,
  Zap,
  BookOpen,
  Trophy,
  RefreshCw,
  MessageSquare,
} from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Usage Intelligence',
    body: 'Deep analytics on your screen time, trigger patterns, and behavioral loops. Know exactly when and why you\'re vulnerable.',
    badge: 'Tracking',
  },
  {
    icon: Zap,
    title: 'Dopamine Reset Protocol',
    body: 'Science-based fasting schedules that gradually recalibrate your brain\'s baseline reward threshold. Not cold turkey — sustainable.',
    badge: 'Science-based',
  },
  {
    icon: RefreshCw,
    title: 'Habit Replacement Engine',
    body: 'Don\'t just cut bad habits — replace the loop. RealU helps you build meaningful alternatives that actually stick.',
    badge: 'Behavioral',
  },
  {
    icon: BookOpen,
    title: 'Daily Reflection Journal',
    body: 'Guided prompts that keep you honest with yourself. Track your wins, slips, and the emotional patterns beneath them.',
    badge: 'Daily practice',
  },
  {
    icon: Trophy,
    title: 'Milestone System',
    body: 'Meaningful milestones tied to real behavioral change, not just streaks. Progress that maps to who you\'re becoming.',
    badge: 'Motivation',
  },
  {
    icon: MessageSquare,
    title: 'Recovery Community',
    body: 'Connect with people who get it. No toxic positivity — a real space for honest conversations about real struggles.',
    badge: 'Community',
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="py-24 sm:py-32 relative bg-surface/30">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
            Built different
          </p>
          <h2 className="text-display-md sm:text-display-lg font-extrabold text-foreground mb-5 tracking-tight">
            Built for people who are
            <br />
            <span className="text-muted-foreground">serious about change.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every feature is designed around one question: what actually works for breaking
            digital addiction long-term?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-surface p-6 hover:border-accent/30 hover:bg-surface-elevated transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground bg-surface-elevated border border-border rounded-full px-2.5 py-0.5">
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Launching soon note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">
              All features available at launch • iOS first
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
