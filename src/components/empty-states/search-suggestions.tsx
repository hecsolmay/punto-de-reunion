import { cn } from '@/libs/cn'

interface Props {
  className?: string
  text?: string
}

export default function SearchSuggestionsEmptyState ({
  className,
  text = 'No hay resultados'
}: Props) {
  return (
    <div
      className={cn('grid w-full h-full place-items-center gap-1', className)}
    >
      <img className='aspect-square size-44' src='/assets/images/empty-search.webp' alt='Imagen de una búsqueda vacía' />
      <h3 className='text-pretty text-center text-3xl text-slate-400 opacity-85 dark:text-white'>{text}</h3>
    </div>
  )
}
