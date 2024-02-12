import SearchSuggestionsEmptyState from '@/components/empty-states/search-suggestions'
import SearchIcon from '@/components/icons/search'
import LoadingSpinner from '@/components/loading-spinner'
import { cn } from '@/libs/cn'
import { type ProductsSearch } from '@/types/actions'
import Link from 'next/link'

interface Props {
  results: ProductsSearch[]
  isLoading: boolean
  className?: string
  hasNoResults?: boolean
  searchWord?: string
}

export default function SearchResults ({
  isLoading,
  results,
  className,
  hasNoResults = false,
  searchWord
}: Props) {
  if (isLoading) {
    return (
      <Container className={className} containerClassName='h-96'>
        <div className='grid h-full place-content-center'>
          <LoadingSpinner className='size-12' />
        </div>
      </Container>
    )
  }

  if (hasNoResults) {
    return (
      <Container className={className} containerClassName='h-96'>
        <SearchSuggestionsEmptyState text='No se encontró ningún producto' />
      </Container>
    )
  }

  return (
    <Container className={className}>
      <ul className=''>
        {results.map(({ id, images, name }) => (
          <li key={id}>
            <ResultItem href={`/products/${id}`} img={images[0].imageUrl} name={name} />
          </li>
        ))}

        <li>
          <LinkRedirect href={`/products?search=${searchWord}`}>
            <div className='grid w-12 place-items-center'>
              <SearchIcon className='size-7'/>
            </div>
            <p className='line-clamp-1 flex-1'>Todos los resultados con: <span className='font-bold'>{searchWord}</span></p>
          </LinkRedirect>
        </li>

      </ul>
    </Container>
  )
}

interface ContainerProps {
  children?: React.ReactNode
  className?: string
  title?: string
  containerClassName?: string
}

function Container ({
  children,
  className,
  containerClassName,
  title = 'Sugerencias'
}: ContainerProps) {
  return (
    <div className={className}>
      <div
        className={cn(
          'flex h-fit max-h-96 w-screen flex-col overflow-y-auto rounded-md bg-white dark:bg-accent-dark md:w-[75vw] md:scrollbar-thin',
          containerClassName
        )
        }
      >
        <div className='mt-1 border-y border-slate-400 py-4 text-xl font-bold dark:border-y-white'>
          <h2 className='px-6 md:px-4'>{title}</h2>
        </div>
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  )
}

interface ResultItemProps {
  href: string
  img: string
  name: string

}

function ResultItem ({ href, img, name }: ResultItemProps) {
  return (
    <LinkRedirect href={href}>
      <img src={img} alt={`Imagen de ${name}`} className='size-12 rounded-md object-cover' />
      <p className='line-clamp-1 flex-1 text-pretty font-semibold'>{name}</p>
    </LinkRedirect>
  )
}

interface LinkRedirectProps {
  children?: React.ReactNode
  href: string
}

function LinkRedirect ({ children, href }: LinkRedirectProps) {
  return (
    <Link href={href} className='flex items-center gap-4 px-6 py-2 transition-colors duration-100 hover:bg-gray-100 dark:hover:bg-white/10 md:px-4'>
      {children}
    </Link>
  )
}
