import {
  DeleteOrganizationButton,
  EditOrganizationButton
} from '@/components/organizations/button'
import Link from 'next/link'

interface MyOrganizationCardProps {
  organizationId: string
  name: string
  description: string
  imageUrl: string
}

export function MyOrganizationCard ({
  ...organization
}: MyOrganizationCardProps) {
  const { name, description, imageUrl, organizationId } = organization

  return (
    <div className='group relative h-52 w-72'>
      <Link
        className='flex h-52 w-72 flex-col gap-4 rounded-lg bg-white p-4 shadow-md transition-colors group-hover:bg-gray-50 dark:bg-accent-dark dark:group-hover:bg-neutral-900'
        href={`/my-organizations/${organizationId}`}
      >
        <div className='flex flex-row items-center gap-4'>
          <img
            src={imageUrl}
            alt={`Imagen de la organización ${name}`}
            className='size-12 rounded-full object-cover'
          />
          <h2 className='line-clamp-2 text-ellipsis text-xl font-semibold'>
            {name}
          </h2>
        </div>
        <p className='line-clamp-3 text-ellipsis text-balance text-sm text-gray-500 dark:text-gray-300'>
          {description}
        </p>
      </Link>

      <div className='absolute bottom-3 right-3 flex w-full justify-end gap-3'>
        <EditOrganizationButton
          className='h-8 px-3 opacity-100 transition-opacity duration-150 group-hover:opacity-100 md:opacity-0'
          {...organization}
        />
        <DeleteOrganizationButton
          className='h-8 px-3 opacity-100 transition-opacity duration-150 group-hover:opacity-100 md:opacity-0'
          {...organization}
        />
      </div>
    </div>
  )
}
