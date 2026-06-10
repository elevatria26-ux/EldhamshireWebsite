'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const earlyMemberGoals = [
  { label: 'Phone addiction', pct: 78 },
  { label: 'Social media', pct: 71 },
  { label: 'Focus & productivity', pct: 64 },
  { label: 'Porn addiction', pct: 52 },
  { label: 'Gaming', pct: 38 },
]

const commitments = [
  {
    quote: 'I\'ve tried every app out there. Nothing has actually addressed *why* I keep relapsing. I need something that goes deeper.',
    initials: 'JM',
    role: 'College senior',
    color: 'bg-violet-500/20 text-violet-300',
  },
  {
    quote: 'I lose 4+ hours a day to my phone and I have a business to build. I need a serious solution, not another habit tracker.',
    initials: 'SL',
    role: 'Founder, 26',
    color: 'bg-indigo-500/20 text-indigo-300',
  },
  {
    quote: 'I\'ve been in denial for years. I signed up for RealU because I\'m finally ready to be honest with myself.',
    initials: 'RT',
    role: 'Medical student',
    color: 'bg-cyan-500/20 text-cyan-300',
  },
]

export function SocialProofSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
            Early community
          </p>
          <h2 className="text-display-md sm:text-display-lg font-extrabold text-foreground mb-5 tracking-tight">
            You&apos;re not alone
            <br />
            <span className="text-muted-foreground">in this.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Early members of RealU will be the first generation of people to take back
            control of their attention at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Goals breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-base font-semibold text-foreground mb-2">
              What early members are working on
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Based on goals shared during signup
            </p>
            <div className="space-y-4">
              {earlyMemberGoals.map((goal, i) => (
                <div key={goal.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-muted-foreground">{goal.label}</span>
                    <span className="text-sm font-semibold text-foreground">{goal.pct}%</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${goal.pct}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-1.5 bg-accent/60 rounded-full"
                  />
                </div>
              ))}
            </div>

            {/* Early access perks */}
            <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-5">
              <h4 className="text-sm font-semibold text-accent mb-3">Early access includes:</h4>
              <ul className="space-y-2">
                {[
                  'Priority access on launch day',
                  'Onboarding personalized to your goals',
                  'Founding member status in the community',
                  'Direct access to the founding team',
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[8px] text-accent font-bold">✓</span>
                    </div>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Early member voices */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">
              From the waitlist
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Anonymized responses from people who joined the waitlist
            </p>

            {commitments.map((c) => (
              <div
                key={c.initials}
                className="rounded-2xl border border-border bg-surface p-5 hover:border-border-subtle transition-all"
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  &ldquo;{c.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-xs font-bold`}>
                    {c.initials}
                  </div>
                  <span className="text-xs text-muted-foreground">{c.role}</span>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-surface border border-border/50 px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-foreground">
                  Join them.
                </p>
                <p className="text-sm text-muted-foreground">Reserve your spot today.</p>
              </div>
              <div className="text-right">
                <div className="flex -space-x-2 justify-end mb-1">
                  {['bg-violet-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-emerald-500'].map((color, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${color} border-2 border-surface flex items-center justify-center text-[9px] text-white font-bold`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Early members</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
