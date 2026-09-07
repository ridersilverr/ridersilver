import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fcfaf2',
          100: '#f7f2de',
          200: '#eee0be',
          300: '#e2c994',
          400: '#d5ae68',
          500: '#c59341',
          600: '#a87431',
          700: '#865627',
          800: '#6e4424',
          900: '#5c3922',
          metallic: '#D4AF37',
          glow: '#FFE58F',
        },
        obsidian: {
          DEFAULT: '#050507',
          deep: '#030304',
          card: '#0c0c0f',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(212, 175, 55, 0.15)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #854D0E 100%)',
        'gold-metallic-glow': 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
        'aurora-glow': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.18) 0%, rgba(180, 83, 9, 0.08) 40%, transparent 75%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'aurora': 'aurora 10s ease infinite alternate',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
