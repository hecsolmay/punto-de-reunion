import CartButton from '@/components/carts/cart-button'
import { EmptySidebarCart } from '@/components/empty-states/carts'
import { CardSidebarLink } from '@/components/links'
import { getUserSession } from '@/libs/auth'
import { getCarts } from '@/services/carts'

export default async function CartSideBar () {
  const session = await getUserSession()

  if (session === null) {
    return (
      <CartButton>
        <EmptySidebarCart text='Inicia Sesión para ver tu carrito'>
          <CardSidebarLink className='w-52 text-center' href='/login' defaultButtonStyle='alternative'>Iniciar Sesión</CardSidebarLink>
        </EmptySidebarCart>
      </CartButton>
    )
  }

  const response = await getCarts({ userId: session.id })

  if (!response.success) {
    // TODO: handle error
    return (
      <CartButton>
        <EmptySidebarCart text='Ocurrió error al procesar tu solicitud'>
          <CardSidebarLink className='w-52 text-center' defaultButtonStyle='alternative'>Inténtalo de nuevo reiniciando la pagina</CardSidebarLink>
        </EmptySidebarCart>
      </CartButton>
    )
  }

  const { carts } = response.data

  if (carts.length === 0) {
    return (
      <CartButton>
        <EmptySidebarCart text='Aún no tienes productos en tu canasta'>
          <CardSidebarLink className='w-52 text-center' defaultButtonStyle='alternative'>Comenzar a comprar</CardSidebarLink>
        </EmptySidebarCart>
      </CartButton>
    )
  }

  const flatItems = carts.flatMap((cart) => cart.items)
  const totalItems = flatItems.reduce((acc, item) => acc + item.quantity, 0)

  const count = totalItems > 99 ? '+99' : totalItems

  return (
    <CartButton showCount count={count}>
      <main className='flex-1 flex-col gap-4 overflow-y-auto overflow-x-clip px-4 scrollbar-thin scrollbar-white dark:scrollbar-dark'>
        <p>{JSON.stringify(carts, null, 2)} </p>
      </main>
    </CartButton>
  )
}
