import type { Config } from 'tailwindcss'

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
        }
      },
      animation: {
        shake: 'shake 0.3s ease-in-out'
      },
      colors: {
        primary: {
          dark: '#1DB954',
          DEFAULT: '#3b8c3b'
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
  plugins: [],
  darkMode: 'class'
}
export default config
