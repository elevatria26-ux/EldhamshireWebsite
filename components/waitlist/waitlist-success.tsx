'use client'

import { useWaitlist } from '@/components/waitlist/waitlist-context'
import { Button } from '@/components/ui/button'
import { formatPosition, generateShareUrl } from '@/lib/utils'
import { buildTwitterShareUrl, buildWhatsAppShareUrl } from '@/lib/referral'
import { analytics } from '@/lib/analytics'
import { Share2, Copy, Check, X } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function WaitlistSuccess() {
  const { successData, closeWaitlist } = useWaitlist()
  const [copied, setCopied] = useState(false)

  if (!successData) return null

  const shareUrl = generateShareUrl(successData.referral_code)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      analytics.referralShare('copy')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback: select text
    }
  }

  function shareTwitter() {
    analytics.referralShare('twitter')
    window.open(buildTwitterShareUrl(successData!.referral_code), '_blank', 'noopener')
  }

  function shareWhatsApp() {
    analytics.referralShare('whatsapp')
    window.open(buildWhatsAppShareUrl(successData!.name, successData!.referral_code), '_blank', 'noopener')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      {/* Close button */}
      <div className="flex justify-end">
        <button
          onClick={closeWaitlist}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Success icon */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        </motion.div>

        <h2 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight">
          You&apos;re in, {successData.name.split(' ')[0]}!
        </h2>
        <p className="text-muted-foreground text-sm">
          Your spot is reserved. Check your email for confirmation.
        </p>
      </div>

      {/* Position badge */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5 text-center">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">
          Your waitlist position
        </p>
        <p className="text-5xl font-black text-foreground tracking-tight mb-1">
          {formatPosition(successData.waitlist_position)}
        </p>
        <p className="text-xs text-muted-foreground">
          Refer friends to move up
        </p>
      </div>

      {/* Referral share */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Share2 className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            Share your link — move up the list
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Each friend who joins using your link moves you closer to early access.
        </p>

        {/* Link display */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-1 pl-3">
          <span className="text-xs text-muted-foreground truncate flex-1 font-mono">
            {shareUrl}
          </span>
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 rounded-lg bg-surface-elevated border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-accent/10 hover:border-accent/30 transition-all flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-success" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Social share */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border-subtle hover:bg-surface-elevated transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </button>
          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border-subtle hover:bg-surface-elevated transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share on WhatsApp
          </button>
        </div>
      </div>

      <Button variant="ghost" size="sm" onClick={closeWaitlist} className="w-full">
        Done — I&apos;ll share later
      </Button>
    </motion.div>
  )
}
