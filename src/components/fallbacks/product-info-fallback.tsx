import ProductInfoContainer from '@/components/products/info-container'
import InfoHeader from '../products/info-header'

export default function ProductInfoFallback () {
  return (
    <ProductInfoContainer>
      <InfoHeader isLoading />
      Cargando... Mucho contenido
    </ProductInfoContainer>
  )
}
