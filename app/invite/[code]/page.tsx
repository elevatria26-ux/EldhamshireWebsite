import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { resolveReferralCode } from '@/actions/referral'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ProblemSection } from '@/components/sections/problem-section'
import { SolutionSection } from '@/components/sections/solution-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { FaqSection } from '@/components/sections/faq-section'
import { FinalCtaSection } from '@/components/sections/final-cta-section'
import { ReferralBanner } from '@/components/referral/referral-banner'
import { ReferralPageInit } from '@/components/referral/referral-page-init'

interface InvitePageProps {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { code } = await params
  const result = await resolveReferralCode(code)

  if (!result.success || !result.data?.valid) {
    return {
      title: 'Join RealU Waitlist',
      description: 'Reserve your spot for the RealU app launch.',
    }
  }

  const name = result.data.referrer_name ?? 'A friend'

  return {
    title: `${name} invited you to join RealU`,
    description: `${name} thinks you should join the RealU waitlist. Break free from digital addiction — iOS app launching soon.`,
    openGraph: {
      title: `${name} invited you to join RealU`,
      description: 'Break free from digital addiction. Reserve your early access spot.',
    },
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params
  const result = await resolveReferralCode(code)

  if (!result.success || !result.data?.valid) {
    notFound()
  }

  const referralInfo = result.data!

  return (
    <>
      <ReferralPageInit referralCode={code} />
      {/* Referral banner sits above the sticky header */}
      <div className="fixed top-0 left-0 right-0 z-[60] border-b border-accent/20 bg-accent/10 backdrop-blur-sm">
        <ReferralBanner
          referrerName={referralInfo.referrer_name ?? 'Someone'}
          referralCode={code}
        />
      </div>
      {/* Push entire page down to clear both banner and header */}
      <div className="pt-12">
        <SiteHeader />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <FeaturesSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
