import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { getOrderByOrganization } from '@/libs/utils'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'
import { type Prisma } from '@prisma/client'

export async function getOrganizations (params: SearchParams = {}) {
  const { limit = 10, page = 1, search = '', sort = 'created', order = 'asc', userId } = params
  const pagination = parsePagination({ limit, page })

  const orderBy = getOrderByOrganization({ order, sort })

  const where: Prisma.OrganizationsWhereInput = {
    name: {
      startsWith: search,
      mode: 'insensitive'
    },
    deletedAt: null,
    users: {
      some: {
        userId
      }
    }
  }

  const organizationsPromise = prisma.organizations.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    include: {
      users: {
        include: {
          user: true
        }
      }
    },
    orderBy,
    where
  })

  const countPromise = prisma.organizations.count({ where })

  try {
    const [organizations, count] = await prisma.$transaction([
      organizationsPromise,
      countPromise
    ])

    const info = getPaginationInfo({
      limit: pagination.limit,
      page: pagination.page,
      total: count
    })

    const mappedOrganizations = organizations.map((organization) => {
      const { users, ...rest } = organization

      const mappedUsers = users.map((user) => {
        const { user: sessionUser, ...rest } = user

        const { createdAt, deletedAt, updatedAt, phoneNumber, role, ...userRest } = sessionUser

        return {
          ...rest,
          ...userRest
        }
      })

      return {
        ...rest,
        users: mappedUsers
      }
    })

    return {
      organizations: mappedOrganizations,
      info
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Something went wrong',
      status: 500
    }
  }
}

export async function getOrganizationById (organizationId?: string) {
  try {
    const organization = await prisma.organizations.findUnique({
      where: {
        id: organizationId,
        deletedAt: null
      }
    })

    return organization
  } catch (error) {
    console.error(error)
    return null
  }
}
