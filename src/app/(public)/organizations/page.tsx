import MainContainer from '@/components/main-container'
import OrganizationsList from '@/components/organizations/organizations-list'
import { type ServerPageProps } from '@/types'
import { Suspense } from 'react'

export default function OrganizationsPage ({ searchParams }: ServerPageProps) {
  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 px-4 pb-8 md:px-8'>
      <h1 className='text-pretty text-3xl font-bold'>Organizaciones</h1>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <OrganizationsList searchParams={searchParams} />
      </Suspense>
    </MainContainer>
  )
}
