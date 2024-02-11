import { cn } from '@/libs/cn'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function MainContainer ({ children, className }: Props) {
  return <main className={cn('p-4 px-3 md:px-10', className)}>{children}</main>
}
