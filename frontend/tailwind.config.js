/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'Outfit', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-heading)', '"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'Caveat', 'cursive'],
        mono: ['var(--font-label)', '"DM Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: 'var(--bg-paper)',
        warm: 'var(--bg-warm)',
        card: 'var(--bg-card)',
        petal: 'var(--bg-petal)',
        tag: 'var(--bg-tag)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        plum: 'var(--plum)',
        rose: 'var(--rose)',
        blossom: 'var(--blossom)',
        burgundy: 'var(--burgundy)',
        dusty: 'var(--dusty)',
        pink: 'var(--pink)',
        sage: 'var(--sage)',
        brown: 'var(--brown)',
        cream: 'var(--cream)',
        'border-soft': 'var(--border-soft)',
        'border-medium': 'var(--border-medium)',
        link: 'var(--link)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
