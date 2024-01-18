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
