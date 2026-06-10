import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8)

export function generateReferralCode(): string {
  return nanoid()
}

export function isValidReferralCode(code: string): boolean {
  return /^[0-9A-Za-z]{6,12}$/.test(code)
}

export function buildShareUrl(referralCode: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://eldhamshire.com'
  return `${base}/invite/${referralCode}`
}

export function buildShareMessage(name: string, referralCode: string): string {
  const url = buildShareUrl(referralCode)
  return `I just joined the RealU waitlist — a new app to break digital addiction and reclaim your attention. Join me before launch: ${url}`
}

export function buildTwitterShareUrl(referralCode: string): string {
  const text = encodeURIComponent(
    `I just joined the @RealUApp waitlist — breaking free from digital addiction before it launches. Use my link to skip ahead:`
  )
  const url = encodeURIComponent(buildShareUrl(referralCode))
  return `https://twitter.com/intent/tweet?text=${text}%20${url}`
}

export function buildWhatsAppShareUrl(name: string, referralCode: string): string {
  const message = encodeURIComponent(buildShareMessage(name, referralCode))
  return `https://wa.me/?text=${message}`
}
