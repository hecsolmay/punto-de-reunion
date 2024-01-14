import ShoppingCartIcon from '@/components/icons/cart'

export default function CartButton () {
  return (
    <button className='relative size-7'>
      <span className='absolute -top-1 right-0 rounded-full bg-contrast px-1 text-xs text-background dark:bg-contrast-dark'>0</span>
      <ShoppingCartIcon />
    </button>
  )
}
