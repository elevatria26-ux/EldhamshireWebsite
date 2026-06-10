import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'elevatria26@gmail.com'
export const REPLY_TO = process.env.RESEND_REPLY_TO ?? 'elevatria26@gmail.com'
