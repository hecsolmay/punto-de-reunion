'use server'

import { backendClient } from '@/libs/edgestore-server'
import prisma from '@/libs/prisma'
import { organizationSchema, type OrganizationSchema } from '@/schemas/organization'
import { revalidateTag } from 'next/cache'

interface Organization extends OrganizationSchema {
  imageUrl: string
}

interface OrganizationCreate extends Organization {
  userId?: string
}

export async function createOrganization (data: OrganizationCreate) {
  const { userId = '', imageUrl, ...rest } = data

  const result = organizationSchema.safeParse(rest)

  if (!result.success) {
    console.error(result.error.toString())
    throw new Error('Error al crear la organización')
  }

  const organization = result.data

  try {
    await backendClient.publicFiles.confirmUpload({
      url: imageUrl
    })
  } catch (error) {
  }

  try {
    const organizations = await prisma.organizations.create({
      data: {
        ...organization,
        imageUrl,
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

type OrganizationUpdate = Partial<Organization>

export async function updateOrganization (organizationId: string, data: OrganizationUpdate) {
  const { imageUrl, ...rest } = data

  try {
    await backendClient.publicFiles.confirmUpload({
      url: data?.imageUrl ?? ''
    })
  } catch (error) {
  }

  const result = organizationSchema.safeParse(rest)

  if (!result.success) {
    console.error(result.error.toString())
    throw new Error('Error al actualizar la organización')
  }

  try {
    const updatedOrganization = await prisma.organizations.update({
      data,
      where: {
        id: organizationId
      }
    })

    revalidateTag('organizations')

    return {
      data: updatedOrganization,
      success: true
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error al actualizar la organización',
      status: 500
    }
  }
}

export async function deleteOrganization (organizationId?: string) {
  try {
    const updatedOrganization = await prisma.organizations.update({
      data: {
        deletedAt: new Date()
      },
      where: {
        id: organizationId
      }
    })

    revalidateTag('organizations')

    return {
      data: updatedOrganization,
      success: true,
      status: 200
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error al borrar la organización',
      status: 500
    }
  }
}
