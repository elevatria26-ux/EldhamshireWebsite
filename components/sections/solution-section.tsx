'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Eye, Shield, TrendingUp, Users } from 'lucide-react'

const pillars = [
  {
    icon: Eye,
    step: '01',
    title: 'Awareness',
    body: 'See exactly what\'s stealing your time and attention. RealU shows you patterns you\'ve been blind to — so you can\'t lie to yourself anymore.',
    accent: 'from-indigo-500/20 to-indigo-500/5',
  },
  {
    icon: Shield,
    step: '02',
    title: 'Accountability',
    body: 'Built-in systems that hold you to your word. No more reset streaks with no consequence. Real accountability creates real change.',
    accent: 'from-violet-500/20 to-violet-500/5',
  },
  {
    icon: TrendingUp,
    step: '03',
    title: 'Replacement',
    body: 'Replace destructive loops with intentional habits. Don\'t just cut out the bad — build something better in its place.',
    accent: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    icon: Users,
    step: '04',
    title: 'Progress',
    body: 'Track your transformation week by week. See who you\'re becoming, not just what you\'re avoiding. Progress you can see is progress that sticks.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
  },
]

export function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="solution" ref={ref} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-semibold text-accent uppercase tracking-widest mb-4"
            >
              The solution
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-md sm:text-display-lg font-extrabold text-foreground mb-6 tracking-tight leading-tight"
            >
              A system built for
              <br />
              <span className="text-accent">real recovery.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              RealU isn&apos;t another screen-time blocker or habit tracker. It&apos;s a
              complete transformation system designed specifically for people who are serious
              about changing their relationship with technology and dopamine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {[
                'Based on behavioral science, not motivation',
                'Personalized to your specific addiction patterns',
                'Designed to outlast willpower',
                'Built by people who\'ve been through it',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="relative rounded-2xl border border-border bg-surface p-5 overflow-hidden hover:border-border-subtle transition-all duration-300 hover:shadow-card-hover group"
              >
                {/* Gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <pillar.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-2xl font-black text-muted/20 tabular-nums">
                      {pillar.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
