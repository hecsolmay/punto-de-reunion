import ProductInfoContainer from '@/components/products/info-container'
import InfoEmptyState from '@/components/products/info-empty-state'
import InfoFooter from '@/components/products/info-footer'
import InfoHeader from '@/components/products/info-header'
import { getProductById } from '@/services/products'
import ImageSelection from '../image-selection'

export default async function ProductInfo (
  { productId }: { productId?: string }
) {
  const product = await getProductById(productId)

  if (product === null) {
    return <InfoEmptyState />
  }

  const { name, description, images, price } = product

  return (
    <ProductInfoContainer>
      <InfoHeader title={name} />
      <div className='flex flex-1 flex-col gap-6 overflow-y-scroll px-3 py-4 md:px-6 md:scrollbar-thin md:scrollbar-track-transparent md:scrollbar-thumb-slate-300 md:dark:scrollbar-thumb-contrast-dark'>
        <ImageSelection images={images} />
        <div>
          <p className='text-end text-xl font-semibold'>{price.toNumber().toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
        </div>
        <p className='text-pretty text-lg font-medium'>{description}</p>
      </div>
      <InfoFooter />
    </ProductInfoContainer>
  )
}
