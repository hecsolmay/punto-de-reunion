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
