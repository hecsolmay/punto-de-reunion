import Button from '@/components/buttons/button'
import LoadingSpinner from '@/components/loading-spinner'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
  title?: string
  description?: string
  onOk?: () => Promise<void> | void
  onCancel?: () => Promise<void> | void
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
  isLoading?: boolean
}

export default function AlertDialog ({
  cancelText = 'Cancelar',
  confirmText = 'Ok',
  className,
  description = 'descripcion de la alerta',
  onOk,
  onCancel,
  showCancel = false,
  title = 'Titulo',
  isLoading = false
}: Props) {
  return (
    <div
      role='alertdialog'
      className={cn(
        'rounded-lg fixed left-[50%] top-[50%] z-50 grid w-[95%] sm:w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white dark:bg-accent-dark dark:border-accent-dark px-6 py-4 shadow-lg duration-200 ',
        className
      )}
    >
      <div className='flex flex-col gap-y-5 text-center sm:gap-y-3 sm:text-left'>
        <h3 className='text-lg font-semibold'> {title} </h3>
        {description !== undefined && (
          <p className='text-sm text-gray-500 dark:text-gray-300'>
            {' '}
            {description}{' '}
          </p>
        )}
      </div>

      <div className='mt-4 flex justify-end space-x-2'>
        {showCancel && (
          <Button onClick={onCancel} variant='alternative'>
            {cancelText}{' '}
          </Button>
        )}
        <Button
          className={`gap-2 ${isLoading && 'pr-1'}`}
          disabled={isLoading}
          onClick={onOk}
        >
          {confirmText} {isLoading && <LoadingSpinner />}
        </Button>
      </div>
    </div>
  )
}
