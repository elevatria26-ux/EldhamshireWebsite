'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { WaitlistContextType, WaitlistFormData, WaitlistSuccessData } from '@/types'
import { analytics } from '@/lib/analytics'

const WaitlistContext = createContext<WaitlistContextType | null>(null)

const REFERRED_BY_KEY = 'realu_ref'

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<Partial<WaitlistFormData>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successData, setSuccessData] = useState<WaitlistSuccessData | null>(null)
  const [referredBy, setReferredBy] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(REFERRED_BY_KEY)
      if (stored) setReferredBy(stored)
    } catch {
      // sessionStorage unavailable
    }
  }, [])

  const updateFormData = useCallback((data: Partial<WaitlistFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }, [])

  const openWaitlist = useCallback((referralCode?: string) => {
    if (referralCode) {
      setReferredBy(referralCode)
      try {
        sessionStorage.setItem(REFERRED_BY_KEY, referralCode)
      } catch {
        // ignore
      }
    }
    setIsOpen(true)
    analytics.waitlistOpen()
  }, [])

  const closeWaitlist = useCallback(() => {
    setIsOpen(false)
    if (!isSuccess) {
      setTimeout(() => {
        setCurrentStep(1)
        setFormData({})
        setIsSubmitting(false)
      }, 300)
    }
  }, [isSuccess])

  const value: WaitlistContextType = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    isOpen,
    openWaitlist,
    closeWaitlist,
    isSubmitting,
    setIsSubmitting,
    isSuccess,
    setIsSuccess,
    successData,
    setSuccessData,
    referredBy,
  }

  return (
    <WaitlistContext.Provider value={value}>
      {children}
    </WaitlistContext.Provider>
  )
}

export function useWaitlist(): WaitlistContextType {
  const ctx = useContext(WaitlistContext)
  if (!ctx) throw new Error('useWaitlist must be used within WaitlistProvider')
  return ctx
}
