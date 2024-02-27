import { OrganizationCard } from '@/components/organizations/card'
import Pagination from '@/components/pagination'
import { getOrganizations } from '@/services/organizations'
import { type SearchParams } from '@/types'

interface Props {
  className?: string
  searchParams: SearchParams
}
export default async function OrganizationsList ({ className, searchParams }: Props) {
  const response = await getOrganizations(searchParams)

  if (response.error !== undefined) {
    // TODO: handle error
    return null
  }

  const { organizations, info } = response

  return (
    <>
      <section className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(288px,1fr))] place-items-center gap-7 md:gap-4 xl:grid-cols-4'>
        {organizations.map(organization => (
          <article key={organization.id}>
            <OrganizationCard organization={organization} />
          </article>
        ))}
      </section>
      <Pagination info={info} />
    </>
  )
}
