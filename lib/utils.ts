import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPosition(position: number): string {
  if (position <= 0) return '#1'
  return `#${position.toLocaleString()}`
}

export function generateShareUrl(referralCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://eldhamshire.com'
  return `${baseUrl}/invite/${referralCode}`
}

export function sanitizeUsername(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9_]/g, '')
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
