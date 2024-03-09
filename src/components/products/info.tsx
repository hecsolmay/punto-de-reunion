import ProductInfoFallback from '@/components/fallbacks/product-info-fallback'
import ImageSelection from '@/components/image-selection'
import { OrganizationLink } from '@/components/products/Link-redirect'
import CategoriesBadges from '@/components/products/categories-badges'
import ProductInfoContainer from '@/components/products/info-container'
import InfoEmptyState from '@/components/products/info-empty-state'
import InfoFooter from '@/components/products/info-footer'
import InfoHeader from '@/components/products/info-header'
import RatingInfo from '@/components/rating-info'
import { MAX_QUANTITY_ADD_TO_CART } from '@/constants'
import { type UserSession, getUserSession } from '@/libs/auth'
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

  const [product, session] = await Promise.all([
    getProductById(productId),
    getUserSession()
  ])

  if (product === null) {
    return <InfoEmptyState />
  }

  const {
    name,
    description,
    images,
    price,
    categories: categoriesProducts,
    rating,
    reviewCount,
    organization,
    maxQuantityByCart
  } = product

  const categories = categoriesProducts.map(({ category }) => ({
    id: category.id,
    name: category.name
  }))

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
              <OrganizationLink
                imageUrl={organization.imageUrl}
                name={organization.name}
                organizationId={organization.id}
              />
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
            <CategoriesBadges categories={categories} />
            <p className='text-pretty text-base font-normal text-gray-600 dark:text-gray-300'>
              {description}
            </p>
            <RatingInfo rating={rating} count={reviewCount} />
          </div>
        </div>
      </div>
      <InfoFooter
        userId={session?.id}
        productId={productId}
        maxQuantity={maxQuantityByCart ?? MAX_QUANTITY_ADD_TO_CART}
        price={price}
        className='border-t border-slate-300 p-5 px-4 dark:border-slate-700'
      />
    </ProductInfoContainer>
  )
}

interface ProductInfoPageProps {
  productId: string
  session?: UserSession
}

export async function ProductInfoPage ({
  productId,
  session
}: ProductInfoPageProps) {
  const product = await getProductById(productId)

  if (product === null) {
    return (
      <section className='grid h-full flex-1 place-content-center gap-4'>
        <h1 className='text-pretty text-center text-3xl font-bold'>
          Producto No encontrado
        </h1>
        <figure className='grid place-items-center'>
          <img
            className='w-1/3 object-cover'
            src='/assets/images/empty-search.webp'
            alt='Imagen no encontrada de producto'
          />
        </figure>
        <h2 className='text-balance text-center text-3xl font-light'>
          No se pudo encontrar el producto
        </h2>
      </section>
    )
  }

  const {
    name,
    description,
    images,
    price,
    categories: categoriesProducts,
    rating,
    reviewCount,
    organization,
    maxQuantityByCart
  } = product

  const categories = categoriesProducts.map(({ category }) => ({
    id: category.id,
    name: category.name
  }))

  return (
    <>
      <h1 className='text-pretty text-3xl font-bold md:hidden'>{name}</h1>

      <ImageSelection
        className='flex flex-1 flex-col items-center justify-start gap-6 pl-2 md:pl-4'
        images={images}
        name={name}
      />
      <div className='flex-1'>
        <section className='flex flex-col gap-6 px-2 md:gap-4 md:p-0'>
          <h1 className='hidden text-pretty text-3xl font-bold md:block'>
            {name}
          </h1>

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
          <CategoriesBadges categories={categories} />
          <p className='text-pretty text-base font-normal text-gray-600 dark:text-gray-300'>
            {description}
          </p>
          <RatingInfo rating={rating} count={reviewCount} />
          <InfoFooter
            productId={productId}
            maxQuantity={maxQuantityByCart}
            price={price}
            userId={session?.id}
            className='fixed bottom-0 left-0 z-[9] mt-2 w-full bg-white px-4 py-2 dark:bg-accent-dark md:relative md:w-fit md:bg-transparent md:p-0 md:dark:bg-transparent'
          />
          {/* TODO: Add review */}
        </section>
      </div>
    </>
  )
}
