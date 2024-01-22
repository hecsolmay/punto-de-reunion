import ProductInfoContainer from '@/components/products/info-container'
import { getProductById } from '@/services/products'
import InfoHeader from './info-header'

export default async function ProductInfo (
  { productId }: { productId?: string }
) {
  const product = await getProductById(productId)

  console.log({ product })

  return (
    <ProductInfoContainer>
      <InfoHeader title={'Nombre del producto'} />
        viendo al producto con el id de {productId}
    </ProductInfoContainer>
  )
}
