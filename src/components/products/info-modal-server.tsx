import ProductInfoFallback from '@/components/fallbacks/product-info-fallback'
import ProductInfo from '@/components/products/info'
import ProductoInfoModal from '@/components/products/info-modal-client'
import { Suspense } from 'react'

export default function ProductInfoModalServer ({
  productId
}: {
  productId?: string
}) {
  return (
    <>
      {productId !== undefined && (
        <>
          <ProductoInfoModal />
          <Suspense key={productId} fallback={<ProductInfoFallback />}>
            <ProductInfo productId={productId} />
          </Suspense>
        </>
      )}
    </>
  )
}
