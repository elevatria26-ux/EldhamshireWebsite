'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { analytics } from '@/lib/analytics'

const faqs = [
  {
    question: 'When is the app launching?',
    answer:
      'RealU is launching on the Apple App Store in approximately two weeks. Android support is in development and will follow shortly after. Waitlist members receive priority access and will be the first to know the moment we\'re live.',
  },
  {
    question: 'Is RealU free?',
    answer:
      'Yes. Core features are free and will remain free. Our mission is to make real recovery accessible to everyone. We\'re committed to never putting essential tools behind a paywall. Optional premium features may be available in the future.',
  },
  {
    question: 'How does early access work?',
    answer:
      'When RealU launches, waitlist members get first access — before anyone else. You\'ll receive a personal invite link via email the moment we go live. The earlier you join the waitlist, the sooner your access.',
  },
  {
    question: 'What happens after I join the waitlist?',
    answer:
      'You\'ll receive a confirmation email with your waitlist position and personal referral link. The onboarding data you submitted today will be used to personalize your experience when you activate the app — so your first day feels like you\'ve already been using it for a week.',
  },
  {
    question: 'Can I refer friends to move up the list?',
    answer:
      'Absolutely. Each friend who joins using your personal invite link moves you up in the queue. Share your link via text, Twitter, or anywhere else. The more people you bring in, the closer to the front you get.',
  },
  {
    question: 'Will my onboarding data be saved?',
    answer:
      'Yes. The goals, struggles, and motivation you shared in the signup flow are securely stored and will be used to customize your experience from the moment you open the app for the first time. No need to repeat yourself.',
  },
  {
    question: 'What makes RealU different from other habit or screen-time apps?',
    answer:
      'Most apps track behavior. RealU changes it. We\'re not a screen-time report card or a generic habit tracker. We combine behavioral science, personalized recovery protocols, and a community of people who are serious about change. The entire system is designed around what actually works for breaking digital addiction long-term.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Your data is encrypted and never sold to third parties. We collect only what we need to personalize your experience. You can delete your account and data at any time. We take privacy seriously — your recovery journey is yours.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  function toggle(i: number) {
    const next = openIndex === i ? null : i
    setOpenIndex(next)
    if (next !== null) {
      analytics.faqOpen(faqs[i].question)
    }
  }

  return (
    <section id="faq" ref={ref} className="py-24 sm:py-32 relative bg-surface/20">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-display-md sm:text-display-lg font-extrabold text-foreground mb-5 tracking-tight">
            Questions answered.
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know before you reserve your spot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-2"
        >
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="rounded-xl border border-border overflow-hidden transition-all duration-200 hover:border-border-subtle"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium text-foreground leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-0">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          Still have questions?{' '}
          <a
            href="mailto:hello@realu.app"
            className="text-accent hover:text-accent/80 underline underline-offset-4 transition-colors"
          >
            Email us directly
          </a>
          {' '}— we read every message.
        </motion.p>
      </div>
    </section>
  )
}
