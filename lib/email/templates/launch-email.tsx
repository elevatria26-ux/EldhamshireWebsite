import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface LaunchEmailProps {
  name: string
  appStoreUrl: string
}

export function LaunchEmail({ name, appStoreUrl }: LaunchEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>RealU is live — your access is ready. Download now.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>RealU</Text>
          </Section>

          <Section style={heroSection}>
            <Text style={launchBadge}>🚀 WE&apos;RE LIVE</Text>
            <Heading style={h1}>
              {name}, your access is ready.
            </Heading>
            <Text style={heroText}>
              The moment you signed up for — it&apos;s here. RealU is officially live on the Apple
              App Store, and your early access spot has been waiting for you.
            </Text>
          </Section>

          <Section style={ctaSection}>
            <Button style={primaryButton} href={appStoreUrl}>
              Download RealU on iOS
            </Button>
          </Section>

          <Hr style={divider} />

          <Section style={contentSection}>
            <Heading as="h2" style={h2}>
              Your journey starts today.
            </Heading>
            <Text style={bodyText}>
              You&apos;ve already taken the hardest step — deciding you want to change. Everything
              you shared when you joined is already waiting inside the app.
            </Text>
            <Text style={bodyText}>
              The people who reclaim their attention don&apos;t wait for a perfect moment. They
              start when the opportunity is in front of them.
            </Text>
            <Text style={bodyText}>
              That moment is right now.
            </Text>
          </Section>

          <Hr style={divider} />

          <Section style={contentSection}>
            <Text style={quoteText}>
              &ldquo;Real change doesn&apos;t start tomorrow. It starts the moment you stop
              accepting the version of yourself that isn&apos;t working.&rdquo;
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you reserved early access to RealU.
            </Text>
            <Text style={footerText}>
              Questions? Reply to this email — we read every one.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

LaunchEmail.PreviewProps = {
  name: 'Alex',
  appStoreUrl: 'https://apps.apple.com/app/realu',
} satisfies LaunchEmailProps

export default LaunchEmail

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

const launchBadge: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#22c55e',
  letterSpacing: '0.1em',
  margin: '0 0 16px',
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

const ctaSection: React.CSSProperties = {
  padding: '32px 40px',
  textAlign: 'center',
}

const primaryButton: React.CSSProperties = {
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: '#ffffff',
  padding: '16px 32px',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: '700',
  textDecoration: 'none',
  display: 'inline-block',
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
