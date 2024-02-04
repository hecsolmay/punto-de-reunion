export interface LinkDropdownItem {
  title: string
  href: string
  className?: string
  onClick?: () => void
}

export interface ActionDropdownItem {
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export interface SearchParams {
  productId?: string
  q?: string
  page?: string
  limit?: string
}

export type CountryCode = 'MX' | 'US' | 'CA'

export interface Country {
  name: string
  code: CountryCode
  flag: string
  phoneCode: number
  regex: RegExp
  formatRegex: RegExp
  replace: string
  placeholder: string
  phoneNumberLength: number
}
