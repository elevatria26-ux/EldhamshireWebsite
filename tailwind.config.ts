import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        'surface-elevated': 'hsl(var(--surface-elevated))',
        border: 'hsl(var(--border))',
        'border-subtle': 'hsl(var(--border-subtle))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          muted: 'hsl(var(--accent-muted))',
        },
        destructive: 'hsl(var(--destructive))',
        success: 'hsl(var(--success))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'accent-gradient': 'linear-gradient(135deg, hsl(var(--accent)), hsl(258 95% 66%))',
        'accent-gradient-subtle': 'linear-gradient(135deg, hsl(var(--accent) / 0.15), hsl(258 95% 66% / 0.15))',
      },
      boxShadow: {
        'accent-sm': '0 0 20px hsl(var(--accent) / 0.15)',
        'accent-md': '0 0 40px hsl(var(--accent) / 0.2)',
        'accent-lg': '0 0 80px hsl(var(--accent) / 0.25)',
        'card': '0 1px 3px rgb(0 0 0 / 0.4), 0 1px 2px rgb(0 0 0 / 0.3)',
        'card-hover': '0 4px 24px rgb(0 0 0 / 0.5), 0 1px 2px rgb(0 0 0 / 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
