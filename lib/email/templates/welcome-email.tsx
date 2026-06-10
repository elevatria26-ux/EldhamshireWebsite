import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  name: string
  referralCode: string
  waitlistPosition: number
  shareUrl: string
}

export function WelcomeEmail({
  name,
  referralCode,
  waitlistPosition,
  shareUrl,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re on the RealU waitlist — your spot is reserved.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>RealU</Text>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Heading style={h1}>Welcome to the movement, {name}.</Heading>
            <Text style={heroText}>
              You&apos;ve taken the first step. Your spot on the RealU waitlist is officially
              reserved — and you&apos;re exactly where you need to be.
            </Text>
          </Section>

          {/* Position Badge */}
          <Section style={positionSection}>
            <Text style={positionLabel}>Your waitlist position</Text>
            <Text style={positionNumber}>#{waitlistPosition.toLocaleString()}</Text>
            <Text style={positionNote}>
              Refer friends using your personal link to move up.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* What happens next */}
          <Section style={contentSection}>
            <Heading as="h2" style={h2}>
              What happens next
            </Heading>
            <Text style={bodyText}>
              <strong style={bold}>When we launch</strong>, you&apos;ll be among the first to
              receive your personal invite link — before it&apos;s open to the public.
            </Text>
            <Text style={bodyText}>
              <strong style={bold}>Your onboarding data is saved.</strong> The goals and motivations
              you shared will be used to personalize your experience from day one.
            </Text>
            <Text style={bodyText}>
              <strong style={bold}>The app launches in approximately 2 weeks</strong> on the Apple
              App Store. Android support coming shortly after.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Referral CTA */}
          <Section style={referralSection}>
            <Heading as="h2" style={h2}>
              Move up the list
            </Heading>
            <Text style={bodyText}>
              Share your personal invite link. Every friend who joins moves you closer to the front.
            </Text>
            <Section style={referralLinkBox}>
              <Text style={referralLinkText}>{shareUrl}</Text>
            </Section>
            <Button style={button} href={shareUrl}>
              Share Your Invite Link
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Mission reminder */}
          <Section style={contentSection}>
            <Text style={quoteText}>
              &ldquo;The best time to start was yesterday. The second best time is today.&rdquo;
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you joined the RealU waitlist with{' '}
              <strong>referral code {referralCode}</strong>.
            </Text>
            <Text style={footerText}>
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}`} style={footerLink}>
                realu.app
              </Link>{' '}
              · Built with purpose, for people who are ready.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

WelcomeEmail.PreviewProps = {
  name: 'Alex',
  referralCode: 'ABC12345',
  waitlistPosition: 247,
  shareUrl: 'https://realu.app/invite/ABC12345',
} satisfies WelcomeEmailProps

export default WelcomeEmail

// Styles
const main: React.CSSProperties = {
  backgroundColor: '#09090b',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const header: React.CSSProperties = {
  padding: '32px 40px 0',
}

const logo: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: '700',
  color: '#6366f1',
  letterSpacing: '-0.5px',
  margin: '0',
}

const heroSection: React.CSSProperties = {
  padding: '40px 40px 0',
}

const h1: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#fafafa',
  lineHeight: '1.25',
  letterSpacing: '-0.5px',
  margin: '0 0 16px',
}

const heroText: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#a1a1aa',
  margin: '0',
}

const positionSection: React.CSSProperties = {
  padding: '32px 40px',
  textAlign: 'center',
  backgroundColor: '#18181b',
  margin: '32px 40px',
  borderRadius: '12px',
  border: '1px solid #27272a',
}

const positionLabel: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#71717a',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  margin: '0 0 8px',
}

const positionNumber: React.CSSProperties = {
  fontSize: '48px',
  fontWeight: '800',
  color: '#6366f1',
  lineHeight: '1',
  letterSpacing: '-2px',
  margin: '0 0 12px',
}

const positionNote: React.CSSProperties = {
  fontSize: '14px',
  color: '#71717a',
  margin: '0',
}

const divider: React.CSSProperties = {
  borderColor: '#27272a',
  margin: '0 40px',
}

const contentSection: React.CSSProperties = {
  padding: '32px 40px',
}

const h2: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#fafafa',
  margin: '0 0 16px',
  letterSpacing: '-0.3px',
}

const bodyText: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#a1a1aa',
  margin: '0 0 14px',
}

const bold: React.CSSProperties = {
  color: '#fafafa',
  fontWeight: '600',
}

const referralSection: React.CSSProperties = {
  padding: '32px 40px',
}

const referralLinkBox: React.CSSProperties = {
  backgroundColor: '#18181b',
  border: '1px solid #27272a',
  borderRadius: '8px',
  padding: '12px 16px',
  margin: '16px 0',
}

const referralLinkText: React.CSSProperties = {
  fontSize: '13px',
  color: '#6366f1',
  margin: '0',
  wordBreak: 'break-all',
}

const button: React.CSSProperties = {
  backgroundColor: '#6366f1',
  color: '#ffffff',
  padding: '14px 24px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
}

const quoteText: React.CSSProperties = {
  fontSize: '17px',
  lineHeight: '1.6',
  color: '#71717a',
  fontStyle: 'italic',
  textAlign: 'center',
  margin: '0',
}

const footer: React.CSSProperties = {
  padding: '0 40px 32px',
}

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#52525b',
  lineHeight: '1.5',
  margin: '0 0 4px',
}

const footerLink: React.CSSProperties = {
  color: '#6366f1',
  textDecoration: 'none',
}
