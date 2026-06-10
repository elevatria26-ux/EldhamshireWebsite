import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ProblemSection } from '@/components/sections/problem-section'
import { SolutionSection } from '@/components/sections/solution-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { FaqSection } from '@/components/sections/faq-section'
import { FinalCtaSection } from '@/components/sections/final-cta-section'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <SocialProofSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
