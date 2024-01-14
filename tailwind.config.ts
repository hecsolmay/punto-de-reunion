import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        primary: {
          dark: '#72af55',
          DEFAULT: '#0d5200'
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
