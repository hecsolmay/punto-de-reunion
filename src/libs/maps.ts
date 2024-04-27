import { type GetOneOrganization, type GetOneProduct } from '@/types/services'

export function mapProductEntity (rawProduct: GetOneProduct) {
  const { images, categories, organizationId, ...rest } = rawProduct

  const mappedImages = images.map(({ id, imageUrl }) => ({ id, url: imageUrl }))

  const mappedCategories = categories.map((categoryProduct) => {
    const { category: { id: categoryId, name, totalProducts, imageUrl }, id } = categoryProduct

    return {
      id,
      categoryId,
      name,
      totalProducts,
      imageUrl
    }
  })

  return {
    ...rest,
    images: mappedImages,
    categories: mappedCategories
  }
}

export function mapOrganizationEntity (rawOrganization: GetOneOrganization) {
  const { users, ...rest } = rawOrganization

  const mappedUsers = users.map((user) => {
    const { hasDebt, isVerified, organizationId, ...rest } = user

    return rest
  })

  return {
    ...rest,
    users: mappedUsers
  }
}
