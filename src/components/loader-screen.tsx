import LoadingSpinner from '@/components/loading-spinner'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
  spinnerClassName?: string
}

export default function LoaderScreen ({ className, spinnerClassName }: Props) {
  return (
    <div className={cn('min-h-[75dvh] grid place-content-center', className)}>
      <LoadingSpinner className={cn('size-12', spinnerClassName)} />
    </div>
  )
}
