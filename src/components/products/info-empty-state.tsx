import ProductInfoContainer from './info-container'
import InfoFooter from './info-footer'
import InfoHeader from './info-header'

export default function InfoEmptyState () {
  return (
    <ProductInfoContainer>
      <InfoHeader title={'Producto No encontrado'} />
      <div className='flex flex-1 flex-col items-center justify-center gap-4'>
        <img className='w-1/3 object-cover' src="/assets/images/empty-search.webp" alt="" />
        <h2 className='text-balance text-3xl font-bold'>No se pudo encontrar el producto</h2>
      </div>
      <InfoFooter disabled />
    </ProductInfoContainer>
  )
}
