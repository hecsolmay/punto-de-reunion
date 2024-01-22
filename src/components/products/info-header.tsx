import CloseInfoButton from './close-info'

interface Props {
  isLoading?: boolean
  title?: string
}

export default function InfoHeader (
  { isLoading = false, title }: Props
) {
  return (
    <div className="flex h-16 items-center justify-between gap-4 border-b border-slate-300 px-4 dark:border-slate-700">
      <h2 className="flex-1 text-center text-2xl font-bold">{isLoading ? 'Cargando...' : title}</h2>
      <div className='flex h-full flex-col items-center justify-center'>
        <CloseInfoButton />
      </div>
    </div>
  )
}
