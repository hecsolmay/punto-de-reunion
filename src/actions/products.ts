'use server'

import { confirmUploadImages } from '@/actions/image'
import prisma from '@/libs/prisma'
import { productSchema, type ProductSchema } from '@/schemas/product'
import { getCategoryById } from '@/services/category'
import { getOrganizationById } from '@/services/organizations'
import { getProductById } from '@/services/products'
import { revalidateTag } from 'next/cache'

interface FilterProducts {
  search?: string
  limit?: number
  page?: number
}

export async function searchProducts ({ limit = 10, search = '' }: FilterProducts) {
  const products = await prisma.products.findMany({
    take: limit,
    include: {
      categories: true,
      images: true,
      organization: true
    },
    where: {
      name: {
        contains: search,
        mode: 'insensitive'
      },
      organization: {
        deletedAt: null
      },
      deletedAt: null
    }
  })

  const mappedProducts = products.map(({ rating, price, ...rest }) => {
    return {
      ...rest,
      rating: rating.toNumber(),
      price: price.toNumber()
    }
  })

  return mappedProducts
}

export async function deleteProduct (productId: string) {
  try {
    // TODO: HANDLE DELETE
    const productUpdated = await prisma.products.update({
      data: {
        deletedAt: new Date()
      },
      where: {
        id: productId
      }
    })

    revalidateTag('products')

    return {
      data: productUpdated,
      success: true
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error al eliminar el producto',
      status: 500
    }
  }
}

interface CreateProduct extends ProductSchema {
  organizationId: string
  categories: string[]
  images: string[]
}

export async function createProduct (newProduct: CreateProduct) {
  const { categories = [], organizationId, images = [], ...rest } = newProduct

  const noRepeatedCategories = Array.from(new Set(categories))

  const result = productSchema.safeParse(rest)

  if (!result.success) {
    return {
      success: false,
      error: result.error
    }
  }

  try {
    const organization = await getOrganizationById(organizationId)

    if (organization === null) {
      return {
        success: false,
        error: 'Organization not found'
      }
    }

    const categoriesPromise = noRepeatedCategories.map(async (categoryId) => {
      return await getCategoryById(categoryId)
    })

    const categoriesResponse = await Promise.all(categoriesPromise)
    const noNulleableCategories = categoriesResponse.filter((category) => category !== null)

    if (noNulleableCategories.length !== noRepeatedCategories.length) {
      return {
        success: false,
        error: 'Category not found'
      }
    }

    const imageResponse = await confirmUploadImages(images)
    const noNulleableImages = imageResponse ?? []

    const { available, ...data } = result.data

    const productCreated = await prisma.products.create({
      data: {
        ...data,
        status: available ? 'AVAILABLE' : 'UNAVAILABLE',
        organizationId,
        categories: {
          create: noNulleableCategories.map(c => ({ categoryId: c?.id ?? '' }))
        },
        images: {
          create: noNulleableImages.map(image => ({ imageUrl: image ?? '' }))
        }
      }
    })

    revalidateTag('products')

    return {
      success: true,
      data: productCreated
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: 'Error al crear el producto'
    }
  }
}

interface UpdateProduct extends ProductSchema {
  categories: string[]
  images: string[]
}

export async function updateProduct (productId: string, updateProduct: UpdateProduct) {
  const { images = [], categories = [], ...body } = updateProduct
  const result = productSchema.safeParse(body)

  if (!result.success) {
    return {
      success: false,
      error: result.error
    }
  }

  const { available, ...data } = result.data

  try {
    const prevProduct = await getProductById(productId)

    if (prevProduct === null) {
      return {
        success: false,
        error: 'Product not found'
      }
    }

    const noRepeatedCategories = Array.from(new Set(categories))
    const categoriesPromise = noRepeatedCategories.map(async (categoryId) => {
      return await getCategoryById(categoryId)
    })

    const categoriesResponse = await Promise.all(categoriesPromise)

    const noNulleableCategories = categoriesResponse.filter((category) => category !== null)

    if (noNulleableCategories.length !== noRepeatedCategories.length) {
      return {
        success: false,
        error: 'Category not found'
      }
    }

    const deletedImages = prevProduct.images.filter(image => !images.includes(image.imageUrl))
    const deletedCategories = prevProduct.categories.filter(category => !noNulleableCategories.some(c => c?.id === category.categoryId))

    const newImages = images.filter(image => !prevProduct.images.some(i => i.imageUrl === image))
    await confirmUploadImages(newImages)
    const newCategories = noNulleableCategories.filter(category => !prevProduct.categories.some(c => c.categoryId === category?.id))

    const deleteImagePromise = prisma.productImages.deleteMany({
      where: {
        id: {
          in: deletedImages.map(image => image.id)
        }
      }
    })

    const deleteCategoriesPromise = prisma.productsCategories.deleteMany({
      where: {
        id: {
          in: deletedCategories.map(category => category.id)
        }
      }
    })

    const updatePromise = prisma.products.update({
      data: {
        ...data,
        status: available ? 'AVAILABLE' : 'UNAVAILABLE',
        categories: {
          create: newCategories.map(c => ({ categoryId: c?.id ?? '' }))
        },
        images: {
          create: newImages.map(image => ({ imageUrl: image ?? '' }))
        }
      },
      where: {
        id: productId
      }
    })

    const [updatedProduct] = await prisma.$transaction([
      updatePromise,
      deleteImagePromise,
      deleteCategoriesPromise
    ])

    revalidateTag('products')

    return {
      success: true,
      data: updatedProduct
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: 'Error al crear el proyecto'
    }
  }
}
