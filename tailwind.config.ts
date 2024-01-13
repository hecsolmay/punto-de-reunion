import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#72af55',
        light: '#0d5200'
      },
      background: {
        DEFAULT: '#080808',
        light: '#e9e9e9'
      },
      accent: {
        DEFAULT: '#1a1a1a',
        light: '#c2c2c2'
      },
      contrast: {
        DEFAULT: '#4d4d4d',
        light: '#a5a5a5'
      },
      highlight: {
        DEFAULT: '#b3b3b3',
        light: '#F8F8F8'
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
export default config
