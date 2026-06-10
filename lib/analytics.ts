declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export function pageview(url: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

export const analytics = {
  ctaClick: (location: string) =>
    trackEvent('cta_click', 'engagement', location),

  waitlistOpen: () =>
    trackEvent('waitlist_open', 'conversion'),

  waitlistStepComplete: (step: number) =>
    trackEvent('waitlist_step_complete', 'conversion', `step_${step}`),

  waitlistSubmit: () =>
    trackEvent('waitlist_submit', 'conversion'),

  waitlistSuccess: () =>
    trackEvent('waitlist_success', 'conversion'),

  referralLinkVisit: (code: string) =>
    trackEvent('referral_link_visit', 'referral', code),

  referralShare: (channel: string) =>
    trackEvent('referral_share', 'referral', channel),

  faqOpen: (question: string) =>
    trackEvent('faq_open', 'engagement', question),

  sectionView: (section: string) =>
    trackEvent('section_view', 'engagement', section),
}
