'use client'

import Button from '@/components/buttons/button'
import DropDown, { DropDownItem } from '@/components/dropdown'
import { SORT_OPTIONS } from '@/constants'
import { cn } from '@/libs/cn'
import { getOrderType, getSortOption } from '@/libs/utils'
import { type OrderType, type SortOptions } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  buttonClassName?: string
}

const SortItems = Object.values(SORT_OPTIONS)

export default function SortFilter ({ buttonClassName }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const sort = searchParams.get('sort')
  const order = searchParams.get('order')

  const sortOrder = getSortOption(sort as any)
  const orderType = getOrderType(order as any)

  console.log({ sort, order, sortOrder, orderType })

  const handleSelect = (sort: SortOptions) => () => {
    const params = new URLSearchParams(searchParams)
    params.delete('order')
    if (sort === sortOrder.order) {
      params.set('order', orderType === 'desc' ? 'asc' : 'desc')
    }

    params.set('sort', sort)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <DropDown
      className='w-52 bg-[#fefffe] dark:bg-[#323332]'
      listClassName='py-0 border rounded-lg border-black dark:border-white'
      dropdownTrigger={
        <Button className={buttonClassName}>{formatOrderText(sortOrder.order, orderType)}</Button>
      }
    >
      {SortItems.map((item, index) => (
        <DropDownItem
          key={item.order}
          onClick={handleSelect(item.order)}
          className={cn(
            'py-4 cursor-pointer dark:hover:bg-white/10',
            index !== SortItems.length - 1 ? 'border-b border-black dark:border-white' : 'rounded-b-lg',
            index === 0 ? 'rounded-t-lg' : '',
            sortOrder.order === item.order ? 'bg-black/75 hover:bg-black/75 hover:text-white dark:hover:text-black dark:hover:bg-white/90 text-white dark:bg-white/90 dark:text-black' : 'bg-transparent'
          )}
        >
          {formatOrderText(item.order, sortOrder.order === item.order ? orderType : 'asc')}
        </DropDownItem>
      ))}
    </DropDown>
  )
}

function formatOrderText (sort: SortOptions, order: OrderType = 'asc') {
  const text = SORT_OPTIONS[sort].text

  if (sort === 'created') {
    return `${text} ${order === 'asc' ? '(Nuevos)' : '(Antiguos)'}`
  }

  if (sort === 'name') {
    return `${text} ${order === 'asc' ? 'A-Z' : 'Z-A'}`
  }

  if (sort === 'price') {
    return `${text} ${order === 'asc' ? '$ - $$$' : '$$$ - $'}`
  }

  if (sort === 'rating') {
    return ` ${order === 'asc' ? 'Menor' : 'Mayor'} ${text}`
  }

  return text
}
