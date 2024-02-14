import Badge from '@/components/badge'
import ProductInfoFallback from '@/components/fallbacks/product-info-fallback'
import ImageSelection from '@/components/image-selection'
import ProductInfoContainer from '@/components/products/info-container'
import InfoEmptyState from '@/components/products/info-empty-state'
import InfoFooter from '@/components/products/info-footer'
import InfoHeader from '@/components/products/info-header'
import RatingInfo from '@/components/rating-info'
import { getProductById } from '@/services/products'
import Link from 'next/link'

export default async function ProductInfo ({
  productId
}: {
  productId?: string
}) {
  if (productId === undefined) {
    return <ProductInfoFallback />
  }

  const product = await getProductById(productId)

  if (product === null) {
    return <InfoEmptyState />
  }

  const {
    name,
    description,
    images,
    price,
    categories,
    rating,
    reviewCount,
    organization
  } = product

  return (
    <ProductInfoContainer>
      <InfoHeader title={name} />
      <div className='flex flex-1 flex-col gap-6 overflow-y-scroll px-3 py-4 scrollbar-thin scrollbar-white dark:scrollbar-dark md:flex-row md:px-6'>
        <ImageSelection
          className='flex flex-1 flex-col items-center justify-start gap-6 md:sticky md:inset-0 '
          images={images}
          name={name}
        />
        <div className='flex-1'>
          <div className='flex flex-col gap-6 px-2 md:gap-4 md:p-0'>
            <div className='flex items-center gap-x-2'>
              <Link href={`/organizations/${organization.id}`}>
                <img
                  className='size-10 rounded-full object-cover'
                  src={organization.imageUrl}
                  alt={`Logo de la organización ${organization.name}`}
                />
              </Link>
              <h3 className='text-large line-clamp-2'>
                Publicado por:{' '}
                <span className='font-bold'>{organization.name}</span>
              </h3>
            </div>
            <p className='text-start text-base font-bold opacity-85'>
              {price.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
              })}
            </p>
            <div className='flex flex-wrap gap-3'>
              {categories.map(({ category: { id, name } }) => (
                <Link href={`/categories/${id}`} key={id}>
                  <Badge variant='default'>{name}</Badge>
                </Link>
              ))}
            </div>
            <p className='text-pretty text-base font-normal text-gray-600 dark:text-gray-300'>
              {description}
            </p>
            <RatingInfo rating={rating} count={reviewCount} />
          </div>
        </div>
      </div>
      <InfoFooter />
    </ProductInfoContainer>
  )
}
