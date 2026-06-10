import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WaitlistProvider } from '@/components/waitlist/waitlist-context'
import { WaitlistDialog } from '@/components/waitlist/waitlist-dialog'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://realu.app'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'RealU — Reclaim the Real You',
    template: '%s | RealU',
  },
  description:
    'Break free from social media, porn, gaming, and phone addiction. RealU is the science-based transformation app launching on iOS. Join the waitlist for early access.',
  keywords: [
    'addiction recovery app',
    'dopamine detox',
    'phone addiction',
    'break social media addiction',
    'digital detox',
    'self improvement app',
    'reclaim attention',
    'digital addiction recovery',
    'screen time',
    'porn addiction recovery',
    'gaming addiction',
    'focus app',
    'discipline app',
  ],
  authors: [{ name: 'RealU' }],
  creator: 'RealU',
  publisher: 'RealU',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'RealU',
    title: 'RealU — Reclaim the Real You',
    description:
      'Break free from digital addiction. The transformation app launching on iOS in ~2 weeks. Join the waitlist now.',
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'RealU — Reclaim the Real You',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RealU — Reclaim the Real You',
    description:
      'Break free from digital addiction. The transformation app launching on iOS in ~2 weeks.',
    images: [`${APP_URL}/og-image.png`],
    creator: '@RealUApp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <WaitlistProvider>
          {children}
          <WaitlistDialog />
        </WaitlistProvider>
      </body>
    </html>
  )
}
