'use server'

import prisma from '@/libs/prisma'

export async function getAllCategories () {
  const categories = await prisma.categories.findMany()

  const sortedCategories = categories.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  return sortedCategories
}
