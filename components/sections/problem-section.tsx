'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, Brain, Eye, Clock } from 'lucide-react'

const problems = [
  {
    icon: Smartphone,
    title: 'You open your phone to check one thing.',
    body: '45 minutes later, you\'re still scrolling. Your brain has been hijacked, and you know it. The awareness makes it worse.',
    stat: '4.5h',
    statLabel: 'avg daily screen time',
    color: 'text-violet-400',
    glow: 'bg-violet-500/10',
  },
  {
    icon: Brain,
    title: 'Porn has rewired how you feel pleasure.',
    body: 'Real connection feels flat. Nothing is exciting enough. You\'ve been chasing a high that keeps requiring more to satisfy.',
    stat: '64%',
    statLabel: 'of men 18–30 affected',
    color: 'text-rose-400',
    glow: 'bg-rose-500/10',
  },
  {
    icon: Eye,
    title: 'You know what you should be doing.',
    body: 'You\'ve made the plans, set the goals, downloaded the apps. But something always pulls you back. This isn\'t a willpower problem.',
    stat: '93%',
    statLabel: 'of users fail within 2 weeks',
    color: 'text-amber-400',
    glow: 'bg-amber-500/10',
  },
  {
    icon: Clock,
    title: 'Time keeps disappearing.',
    body: 'You look back at another week and can\'t point to what changed. The gap between who you are and who you want to be keeps widening.',
    stat: '2+ yrs',
    statLabel: 'of life lost to scrolling by 30',
    color: 'text-cyan-400',
    glow: 'bg-cyan-500/10',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="problem" ref={ref} className="py-24 sm:py-32 relative">
      {/* Section background hint */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
            The problem
          </p>
          <h2 className="text-display-md sm:text-display-lg font-extrabold text-foreground mb-5 tracking-tight">
            You&apos;re not lazy.
            <br />
            <span className="text-muted-foreground">You&apos;re addicted.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Modern technology is engineered by the world&apos;s best designers to exploit
            your brain&apos;s reward circuitry. It&apos;s not a fair fight — and it was
            never meant to be.
          </p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-surface p-6 sm:p-7 overflow-hidden hover:border-border-subtle transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Glow */}
              <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 ${problem.glow}`} aria-hidden />

              <div className="relative z-10">
                {/* Icon + stat row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${problem.glow} flex items-center justify-center border border-white/5`}>
                    <problem.icon className={`w-5 h-5 ${problem.color}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-black ${problem.color}`}>{problem.stat}</div>
                    <div className="text-[11px] text-muted-foreground">{problem.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {problem.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground mt-12 text-base max-w-lg mx-auto"
        >
          The problem isn&apos;t you. The problem is you haven&apos;t had the right tools.
          <span className="text-foreground font-medium"> Until now.</span>
        </motion.p>
      </div>
    </section>
  )
}
