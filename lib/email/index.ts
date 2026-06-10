import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'hello@realu.app'
export const REPLY_TO = process.env.RESEND_REPLY_TO ?? 'support@realu.app'
