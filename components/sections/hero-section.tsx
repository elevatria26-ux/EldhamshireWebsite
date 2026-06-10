'use client'

import React from 'react'
import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { analytics } from '@/lib/analytics'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
  const { openWaitlist } = useWaitlist()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] rounded-full bg-violet-600/6 blur-[100px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pre-headline badge */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <Badge variant="accent" className="gap-1.5 py-1.5 px-4 text-xs uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            iOS Launch in ~2 Weeks
          </Badge>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-display-lg sm:text-display-xl md:text-display-2xl font-extrabold text-foreground mb-6 leading-[1.08] tracking-tight"
        >
          Reclaim the{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-accent via-violet-400 to-accent bg-clip-text text-transparent">
              Real You.
            </span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Break free from social media, porn, gaming, and phone addiction.
          Rebuild your focus. Become the person you know you can be.
        </motion.p>

        {/* CTA group */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Button
            size="xl"
            onClick={() => {
              analytics.ctaClick('hero_primary')
              openWaitlist()
            }}
            className="w-full sm:w-auto shadow-accent-sm hover:shadow-accent-md group"
          >
            Reserve Your Spot — Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground">
            No credit card required
          </p>
        </motion.div>

        {/* Trust cues */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <TrustItem icon="🔒" text="Private & secure" />
          <TrustItem icon="📱" text="iOS App Store" />
          <TrustItem icon="⚡" text="Free early access" />
          <TrustItem icon="🎯" text="Personalized from day 1" />
        </motion.div>

        {/* App mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative"
        >
          <AppMockup />
        </motion.div>
      </div>
    </section>
  )
}

function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function AppMockup() {
  return (
    <div className="relative flex items-start justify-center gap-4 sm:gap-6">
      {/* Center phone */}
      <div className="relative z-20 animate-float">
        <PhoneFrame>
          <DashboardScreen />
        </PhoneFrame>
      </div>

      {/* Left phone (slightly behind) */}
      <div className="hidden sm:block relative z-10 mt-8 opacity-60 scale-90 -mr-8">
        <PhoneFrame>
          <ProgressScreen />
        </PhoneFrame>
      </div>

      {/* Right phone */}
      <div className="hidden sm:block relative z-10 mt-8 opacity-60 scale-90 -ml-8">
        <PhoneFrame>
          <InsightsScreen />
        </PhoneFrame>
      </div>

      {/* Ground glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-12 bg-accent/10 blur-2xl rounded-full"
      />
    </div>
  )
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[220px] sm:w-[240px] h-[440px] sm:h-[480px] rounded-[2.5rem] border-2 border-border bg-[#0e0e0f] shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className="h-10 flex items-center justify-between px-6 pt-2 flex-shrink-0">
        <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
        <div className="w-16 h-5 rounded-full bg-black flex items-center justify-center">
          <div className="w-8 h-2 rounded-full bg-zinc-900" />
        </div>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[2, 3, 4, 5].map((h) => (
              <div key={h} className="w-0.5 rounded-sm bg-muted-foreground/40" style={{ height: h }} />
            ))}
          </div>
          <div className="w-4 h-2 rounded-sm border border-muted-foreground/40 flex items-center px-0.5">
            <div className="h-1 w-2.5 rounded-sm bg-success/70" />
          </div>
        </div>
      </div>
      {/* App content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function DashboardScreen() {
  return (
    <div className="h-full bg-[#0e0e0f] px-4 py-3 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-muted-foreground">Good morning</p>
          <p className="text-sm font-bold text-foreground">Day 7 🔥</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
          <span className="text-xs">A</span>
        </div>
      </div>

      {/* Streak ring */}
      <div className="flex items-center justify-center py-2">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#27272a" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#progressGrad)" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${0.73 * 264} ${264}`}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-foreground">73%</span>
            <span className="text-[9px] text-muted-foreground">daily goal</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Screen time', value: '1h 24m', color: 'text-success' },
          { label: 'Streak', value: '7 days', color: 'text-accent' },
          { label: 'Score', value: '840', color: 'text-violet-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.03] rounded-xl p-2 text-center">
            <p className={`text-xs font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Today's checklist */}
      <div className="bg-white/[0.03] rounded-xl p-3">
        <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Today</p>
        {[
          { task: 'Morning reflection', done: true },
          { task: 'No social media', done: true },
          { task: 'Deep work (2 hrs)', done: false },
        ].map((item) => (
          <div key={item.task} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-success' : 'border border-border'}`}>
              {item.done && <span className="text-[7px] text-white font-bold">✓</span>}
            </div>
            <span className={`text-[10px] ${item.done ? 'line-through text-muted-foreground' : 'text-foreground/80'}`}>
              {item.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressScreen() {
  return (
    <div className="h-full bg-[#0e0e0f] px-4 py-3 flex flex-col gap-3">
      <p className="text-sm font-bold text-foreground">Progress</p>
      <div className="space-y-3">
        {[
          { label: 'Social media', prev: 6.2, now: 1.4, color: '#6366f1' },
          { label: 'Gaming', prev: 4.1, now: 0.9, color: '#8b5cf6' },
          { label: 'Focus time', prev: 1.2, now: 3.8, color: '#22c55e' },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1">
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
              <span className="text-[10px] font-semibold" style={{ color: item.color }}>
                {item.now}h/day
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(item.now / 8) * 100}%`, backgroundColor: item.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 bg-success/10 rounded-xl p-3">
        <p className="text-[10px] text-success font-semibold">↓ 67% less wasted time</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">vs. when you started</p>
      </div>
    </div>
  )
}

function InsightsScreen() {
  return (
    <div className="h-full bg-[#0e0e0f] px-4 py-3 flex flex-col gap-3">
      <p className="text-sm font-bold text-foreground">Insights</p>
      <div className="bg-accent/10 rounded-xl p-3">
        <p className="text-[9px] text-accent font-semibold uppercase tracking-wider mb-1">Today&apos;s insight</p>
        <p className="text-[11px] text-foreground/90 leading-relaxed">
          Your dopamine spikes most at 9pm. That&apos;s when your scroll rate triples.
        </p>
      </div>
      <div className="space-y-2">
        {['Peak focus: 10–12am', 'Longest streak: 11 days', 'Best week: last week'].map((item) => (
          <div key={item} className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            <span className="text-[10px] text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
