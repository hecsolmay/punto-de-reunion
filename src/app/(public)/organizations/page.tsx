import MainContainer from '@/components/main-container'
import OrganizationsList from '@/components/organizations/organizations-list'
import { OrganizationListSkeleton } from '@/components/skeletons/organizations'
import { type ServerPageProps } from '@/types'
import { Suspense } from 'react'

export default function OrganizationsPage ({ searchParams }: ServerPageProps) {
  const {
    page = '1',
    search = '',
    order = 'desc',
    sort = 'created'
  } = searchParams

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 px-4 pb-8 md:px-8'>
      <h1 className='text-pretty text-3xl font-bold'>Organizaciones</h1>
      <Suspense
        key={page + search + order + sort}
        fallback={<OrganizationListSkeleton />}
      >
        <OrganizationsList searchParams={searchParams} />
      </Suspense>
    </MainContainer>
  )
}
