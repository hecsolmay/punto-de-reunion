import MainContainer from '@/components/main-container'
import ProductList from '@/components/organizations/products'
import { ProductsGridSkeleton } from '@/components/skeletons/products'
import { getOrganizationById } from '@/services/organizations'
import { type ServerPageProps } from '@/types'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function OrganizationInfoPage ({ params, searchParams }: ServerPageProps) {
  const { id } = params

  const organization = await getOrganizationById(id)

  if (organization === null) {
    redirect('/not-found')
  }

  const { name } = organization

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 px-4 pb-8 md:px-8'>
      <div className='flex flex-col justify-between gap-6 md:flex-row'>
        <h1 className='text-pretty text-3xl font-bold text-black dark:text-white'>
          {name}
        </h1>
        {/* <CreateOrganizationButton organizationsCount={organizations.length} /> */}
      </div>

      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductList organizationId={id} searchParams={searchParams} />
      </Suspense>
    </MainContainer>
  )
}
