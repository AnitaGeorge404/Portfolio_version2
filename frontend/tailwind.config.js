/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#FDF6F0',
        warm: '#F9EDE8',
        card: '#FBF2EE',
        petal: '#FCEEF2',
        tag: '#FEF5F2',
        ink: '#2C1A1D',
        'ink-soft': '#7A5A60',
        plum: '#8B3A52',
        rose: '#C96B84',
        blossom: '#EDAABB',
        burgundy: '#6B1E35',
        dusty: '#D9939F',
        pink: '#F2C4CE',
        sage: '#A0A882',
        brown: '#C9A89C',
        cream: '#FDF6F0',
        'border-soft': '#F0D8DC',
        'border-medium': '#E8B8C2',
        link: '#8B3A52',
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
