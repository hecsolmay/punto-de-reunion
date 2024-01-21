import { type getCategories } from '@/services/category'
import { type Prisma } from '@prisma/client'

export type CategoriesResponse = Prisma.PromiseReturnType<typeof getCategories>
