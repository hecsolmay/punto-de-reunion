import prisma from '@/libs/prisma'
import { type CartItems } from '@prisma/client'

type PartialCartItem = Partial<CartItems>

interface WhereOptions {
  id: string | undefined
}

export async function updateCartItem (where: WhereOptions, data: PartialCartItem) {
  const updatedCartItem = await prisma.cartItems.update({
    where: {
      ...where
    },
    data
  })

  return updatedCartItem
}

export async function deleteCartItem (id: string) {
  const deletedCartItem = await prisma.cartItems.delete({
    where: {
      id
    }
  })

  return deletedCartItem
}
export async function getItemById (id: string) {
  const item = await prisma.cartItems.findUnique({
    include: {
      product: {
        include: {
          images: true
        }
      }
    },
    where: {
      id
    }
  })

  return item
}

export async function getItemsCountByCartId (cartId: string) {
  const count = await prisma.cartItems.count({
    where: {
      cartId
    }
  })

  return count
}
