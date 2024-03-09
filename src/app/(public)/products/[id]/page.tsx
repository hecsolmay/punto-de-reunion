import MainContainer from '@/components/main-container'
import { ProductInfoPage } from '@/components/products/info'
import { ProductInfoPageSkeleton } from '@/components/skeletons/products'
import { getUserSession } from '@/libs/auth'
import { type ServerPageProps } from '@/types'
import { Suspense } from 'react'

export default async function ProductPage ({
  params,
  searchParams
}: ServerPageProps) {
  const session = await getUserSession()

  return (
    <MainContainer className='relative flex h-auto min-h-[80vh] flex-col gap-6 px-3 py-4 pb-8 md:flex-row md:px-6'>
      <Suspense fallback={<ProductInfoPageSkeleton />}>
        <ProductInfoPage productId={params.id} session={session} />
      </Suspense>
    </MainContainer>
  )
}
