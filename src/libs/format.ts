import type { Currency, LineItem, RawProduct } from '@/types'
type Locales = 'en-US' | 'es-ES' | 'es-MX'

const CURRENCY_LOCALES: Record<Locales, string> = {
  'en-US': 'USD',
  'es-ES': 'EUR',
  'es-MX': 'MXN'
}

export function formatPriceNumber (number: number, locales?: Locales) {
  const locale: Locales = locales ?? 'es-MX'
  const currency = CURRENCY_LOCALES[locale]

  // Return to locale string Mexican currency
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number)
}

export function formatStripeLineProduct (product: RawProduct, currency: Currency): LineItem {
  const { description, images, name, price, quantity } = product

  return {
    price_data: {
      currency,
      product_data: {
        name,
        description,
        images
      },
      unit_amount: price * 100
    },
    quantity
  }
}

// Types definition
type DayOfWeek = 'Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado'
type Month = 'ene' | 'feb' | 'mar' | 'abr' | 'may' | 'jun' | 'jul' | 'ago' | 'sep' | 'oct' | 'nov' | 'dic'

// Definition of the record for weekdays
const weekdays: Record<number, DayOfWeek> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado'
}

// Definition of the record for months
const months: Record<number, Month> = {
  0: 'ene',
  1: 'feb',
  2: 'mar',
  3: 'abr',
  4: 'may',
  5: 'jun',
  6: 'jul',
  7: 'ago',
  8: 'sep',
  9: 'oct',
  10: 'nov',
  11: 'dic'
}

// Function to format the date
export function formatDate (date: Date): string {
  const weekday = weekdays[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${weekday}, ${day} ${month}. ${year}`
}
