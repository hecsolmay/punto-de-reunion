import LoadingSpinner from '@/components/loading-spinner'

export function ListOfPaymentsFallback () {
  return (
    <div className='grid h-full place-content-center'>
      <div>
        <LoadingSpinner className='size-16' />
      </div>
    </div>
  )
}
