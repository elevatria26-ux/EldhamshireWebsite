'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useWaitlist } from './waitlist-context'
import { StepIndicator } from './step-indicator'
import { StepPersonal } from './steps/step-personal'
import { StepGoals } from './steps/step-goals'
import { StepMotivation } from './steps/step-motivation'
import { StepConfirm } from './steps/step-confirm'
import { WaitlistSuccess } from './waitlist-success'

const STEP_LABELS = ['You', 'Goals', 'Motivation', 'Confirm']
const TOTAL_STEPS = 4

export function WaitlistDialog() {
  const { isOpen, closeWaitlist, currentStep, isSuccess } = useWaitlist()
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) closeWaitlist()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeWaitlist])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    if (!panel) return
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable[0]?.focus()
  }, [isOpen, currentStep])

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={closeWaitlist}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Join the RealU waitlist"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 inset-x-4 top-[50%] -translate-y-[50%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md bg-background border border-border rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {!isSuccess && (
              <div className="flex items-center justify-between px-6 pt-5 pb-0">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">R</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">RealU Waitlist</span>
                </div>
                <button
                  onClick={closeWaitlist}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step indicator */}
            {!isSuccess && (
              <div className="px-6 pt-4 pb-2">
                <StepIndicator
                  currentStep={currentStep}
                  totalSteps={TOTAL_STEPS}
                  stepLabels={STEP_LABELS}
                />
              </div>
            )}

            {/* Scrollable content */}
            <div className="px-6 pb-6 pt-4 max-h-[75vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WaitlistSuccess />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentStep === 1 && <StepPersonal />}
                    {currentStep === 2 && <StepGoals />}
                    {currentStep === 3 && <StepMotivation />}
                    {currentStep === 4 && <StepConfirm />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
