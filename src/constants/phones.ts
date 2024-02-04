import { type Country } from '@/types'

export const COUNTRIES: Country[] = [
  {
    name: 'México',
    code: 'MX',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
    phoneCode: 52,
    regex: /^\+52(\d{3})(\d{3})(\d{4})$/,
    formatRegex: /(\+\d{2})(\d{3})(\d{3})(\d{4})/,
    replace: '$1 $2 $3 $4',
    placeholder: '(999) 999 9999',
    phoneNumberLength: 10
  },
  {
    name: 'Estados Unidos',
    code: 'US',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
    phoneCode: 1,
    regex: /^\+1(\d{3})(\d{3})(\d{4})$/,
    formatRegex: /(\+\d{1})(\d{3})(\d{3})(\d{4})/,
    replace: '$1 $2 $3 $4',
    placeholder: '(555) 555 1234',
    phoneNumberLength: 10
  },
  {
    name: 'Canada',
    code: 'CA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
    phoneCode: 1,
    regex: /^\+1(\d{3})(\d{3})(\d{4})$/,
    formatRegex: /(\+\d{2})(\d{3})(\d{3})(\d{4})/,
    replace: '$1 $2 $3 $4',
    placeholder: '(555) 555 1234',
    phoneNumberLength: 10
  }
]
