import { cn } from '@/libs/cn'

export default function SectionContainer (
  { title, children, titleClassName, className }: { title: string, className?: string, titleClassName?: string, children?: React.ReactNode }
) {
  return (
    <section className={className}>
      <h2 className={cn('text-3xl font-bold mb-6', titleClassName)}>{title}</h2>
      {children}
    </section>
  )
}
