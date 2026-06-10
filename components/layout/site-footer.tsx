export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-bold text-foreground">RealU</span>
            <span className="text-muted-foreground text-sm">— Reclaim the Real You</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="mailto:elevatria26@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} RealU. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            iOS app launching soon. Built for people who are serious about change.
          </p>
        </div>
      </div>
    </footer>
  )
}
