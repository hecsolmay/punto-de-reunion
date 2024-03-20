import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { generateErrorResponse, getOrderByCarts } from '@/libs/utils'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'
import { type getCartsType } from '@/types/services'
import { type Prisma } from '@prisma/client'

interface Params
  extends Omit<SearchParams, 'categoryId' | 'search' | 'productId'> {
  userId?: string
  isAlreadyPaid?: boolean
  organizationId?: string
}

export async function getCarts (params: Params): Promise<getCartsType> {
  const {
    limit = 10,
    page = 1,
    sort = 'created',
    order = 'asc',
    userId,
    isAlreadyPaid,
    organizationId
  } = params
  const pagination = parsePagination({ limit, page })

  const orderBy = getOrderByCarts({ order, sort })

  try {
    const where: Prisma.CartsWhereInput = {
      userId,
      isAlreadyPaid,
      organizationId
    }

    const cartsPromise = prisma.carts.findMany({
      where,
      orderBy,
      include: {
        organization: true,
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            }
          }
        }
      },
      skip: pagination.skip,
      take: pagination.limit
    })

    const [carts, count] = await prisma.$transaction([
      cartsPromise,
      prisma.carts.count({ where })
    ])

    const info = getPaginationInfo({
      total: count,
      limit: pagination.limit,
      page: pagination.page
    })

    const mappedCarts = carts.map((cart) => {
      const { items, ...rest } = cart

      const mappedItems = items.map((item) => {
        const { product, originalPrice, ...rest } = item

        const mappedProduct = {
          ...product,
          price: product.price.toNumber(),
          rating: product.rating.toNumber()
        }

        return {
          ...rest,
          originalPrice: originalPrice.toNumber(),
          product: mappedProduct
        }
      })

      // Sort items By localCompare
      const sortedItems = mappedItems.sort((a, b) => {
        const { name: nameB } = b.product
        const { name: nameA } = a.product

        return nameA.localeCompare(nameB)
      })

      return {
        ...rest,
        items: sortedItems
      }
    })

    return {
      success: true,
      data: {
        carts: mappedCarts,
        info
      }
    }
  } catch (error) {
    console.error(error)
    return generateErrorResponse(500, 'Error al obtener los carritos')
  }
}

type GetOneCartParams = Prisma.CartsWhereInput

export async function getOneCart (where: GetOneCartParams) {
  try {
    const cart = await prisma.carts.findFirst({
      include: {
        organization: true,
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            }
          }
        }
      },
      where
    })

    if (cart === null) return null

    const { items, ...rest } = cart

    const mappedItems = items.map((item) => {
      const { product, originalPrice, ...rest } = item

      const mappedProduct = {
        ...product,
        price: product.price.toNumber(),
        rating: product.rating.toNumber()
      }

      return {
        ...rest,
        originalPrice: originalPrice.toNumber(),
        product: mappedProduct
      }
    })

    // Sort items By localCompare
    const sortedItems = mappedItems.sort((a, b) => {
      const { name: nameB } = b.product
      const { name: nameA } = a.product

      return nameA.localeCompare(nameB)
    })

    const mappedCarts = {
      ...rest,
      items: sortedItems
    }

    return mappedCarts
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function findManyCarts () {
  const carts = await prisma.carts.findMany({
    include: {
      organization: true,
      items: {
        include: {
          product: {
            include: {
              images: true
            }
          }
        }
      }
    }
  })

  const mappedCarts = carts.map((cart) => {
    const { items, ...rest } = cart

    const mappedItems = items.map((item) => {
      const { product, originalPrice, ...rest } = item

      const mappedProduct = {
        ...product,
        price: product.price.toNumber(),
        rating: product.rating.toNumber()
      }

      return {
        ...rest,
        originalPrice: originalPrice.toNumber(),
        product: mappedProduct
      }
    })

    const sortedItems = mappedItems.sort((a, b) => {
      const { name: nameB } = b.product
      const { name: nameA } = a.product

      return nameA.localeCompare(nameB)
    })

    return {
      ...rest,
      items: sortedItems
    }
  })

  return mappedCarts
}

interface CreateCartParams {
  userId: string
  organizationId: string
  productId: string
  quantity: number
  originalPrice?: number
}

export async function createCart (data: CreateCartParams) {
  const {
    userId,
    organizationId,
    productId,
    quantity,
    originalPrice = 0
  } = data

  const cartCreated = await prisma.carts.create({
    data: {
      userId,
      organizationId,
      items: {
        create: {
          productId,
          quantity,
          originalPrice
        }
      }
    }
  })

  return cartCreated
}

interface CartItem extends Omit<CreateCartParams, 'userId' | 'organizationId'> {
  cartId: string
}

export async function createCartItem ({
  cartId,
  productId,
  quantity,
  originalPrice = 0
}: CartItem) {
  return await prisma.cartItems.create({
    data: {
      cartId,
      productId,
      quantity,
      originalPrice
    }
  })
}

interface UpdateCartItem extends Omit<CartItem, 'cartId'> {
  itemId: string
  quantity: number
}

export async function updateCartItem ({
  itemId,
  quantity,
  productId,
  originalPrice
}: Partial<UpdateCartItem>) {
  return await prisma.cartItems.update({
    data: {
      quantity,
      productId,
      originalPrice
    },
    where: {
      id: itemId
    }
  })
}

export async function deleteCart (cartId: string) {
  const deletedCart = await prisma.carts.delete({
    where: {
      id: cartId
    }
  })

  return deletedCart
}

interface DeleteCartItemParams {
  userId?: string
}

export async function deletedManyCarts ({ userId }: DeleteCartItemParams) {
  const deletedCarts = await prisma.carts.deleteMany({
    where: {
      userId
    }
  })

  return deletedCarts.count
}
