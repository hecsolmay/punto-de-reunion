import ProductInfoContainer from '@/components/products/info-container'
import InfoHeader from '@/components/products/info-header'
import { ProductInfoSkeleton } from '@/components/skeletons/products'

export default function ProductInfoFallback () {
  return (
    <ProductInfoContainer>
      <InfoHeader isLoading />
      <ProductInfoSkeleton />
    </ProductInfoContainer>
  )
}
