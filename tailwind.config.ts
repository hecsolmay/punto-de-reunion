import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
// @ts-expect-error midudev tailwind animations plugin is not typed
import animations from '@midudev/tailwind-animations'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(3px)' },
          '50%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' },
          '100%': { transform: 'translateX(0)' }
        },
        moveUp: {
          '0%': {
            transform: 'translateY(10px)',
            visibility: 'visible'
          },
          '100%': {
            transform: 'translateY(0)',
            visibility: 'visible'
          }
        }
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
        moveUp: 'moveUp 0.25s ease-in-out'
      },
      colors: {
        primary: {
          50: '#f6f8ed',
          100: '#eaf0d7',
          200: '#d5e2b4',
          300: '#b9ce88',
          400: '#9eb962',
          500: '#809e44',
          600: '#637d33',
          700: '#556b2f',
          800: '#3f4e26',
          900: '#374324',
          950: '#1b240f'
        },
        background: {
          dark: '#0f0f0f',
          DEFAULT: '#e9e9e9'
        },
        accent: {
          dark: '#1a1a1a',
          DEFAULT: '#c2c2c2'
        },
        contrast: {
          dark: '#4d4d4d',
          DEFAULT: '#a5a5a5'
        },
        highlight: {
          dark: '#b3b3b3',
          DEFAULT: '#F8F8F8'
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          scrollbarWidth: 'thin'
        },
        '.scrollbar-white': {
          scrollbarColor: '#d4d4d4 transparent'
        },
        '.scrollbar-dark': {
          scrollbarColor: '#424242 transparent'
        }
      })
    }),
    animations
  ],
  darkMode: 'class'
}
export default config
