import CloseInfoButton from './close-info'

interface Props {
  isLoading?: boolean
  title?: string
}

export default function InfoHeader (
  { isLoading = false, title }: Props
) {
  return (
    <div className="flex h-16 w-full items-center justify-between gap-4 border-b border-slate-300 p-3 dark:border-slate-700">
      <h2 className="truncate text-start text-2xl font-bold">{isLoading ? 'Cargando...' : title}</h2>
      <div className='float-right flex size-6 flex-col items-center justify-center'>
        <CloseInfoButton />
      </div>
    </div>
  )
}
