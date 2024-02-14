import { cn } from '@/libs/cn'

interface ProductsGridEmptyStateProps {
  className?: string
  text?: string
  title?: string
}

export function ProductsGridEmptyState ({
  className,
  text = 'No se encontraron resultados',
  title = 'Búsqueda Vacía'
}: ProductsGridEmptyStateProps) {
  return (
    <section
      className={cn('min-h-[50dvh] grid place-items-center gap-4', className)}
    >
      <h1 className='text-pretty text-center text-3xl font-bold text-slate-400 dark:text-white'>
        {title}
      </h1>
      <img
        className='size-40 object-cover'
        src='/assets/images/empty-search.webp'
        alt='Productos No Encontrados'
      />
      <p className='text-balance text-lg font-medium text-slate-400 dark:text-white'>
        {text}
      </p>
    </section>
  )
}
