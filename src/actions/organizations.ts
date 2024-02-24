'use server'

import prisma from '@/libs/prisma'
import { type OrganizationSchema } from '@/schemas/organization'
import { revalidateTag } from 'next/cache'

interface Organization extends OrganizationSchema {
  imageUrl: string
  userId?: string
}

export async function createOrganization (data: Organization) {
  const { userId = '', ...organization } = data

  try {
    const organizations = await prisma.organizations.create({
      data: {
        ...organization,
        users: {
          create: {
            userId
          }
        }
      }
    })

    revalidateTag('organizations')
    return organizations
  } catch (error) {
    console.error(error)
    return {
      error: 'Error al crear la organización',
      status: 500
    }
  }
}
