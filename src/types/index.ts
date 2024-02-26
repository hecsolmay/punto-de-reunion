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

export interface Params {
  id: string
}

export interface SearchParams {
  productId?: string
  search?: string
  page?: string | number
  limit?: string | number
  sort?: SortOptions
  order?: OrderType
  categoryId?: string
  userId?: string
  organizationId?: string
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

export type SortOptions = 'price' | 'name' | 'rating' | 'created'
export type OrderType = 'asc' | 'desc'

export interface ServerPageProps {
  searchParams: SearchParams
  params: Params
}
