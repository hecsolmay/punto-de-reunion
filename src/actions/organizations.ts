'use server'

import { backendClient } from '@/libs/edgestore-server'
import prisma from '@/libs/prisma'
import { type OrganizationSchema } from '@/schemas/organization'
import { revalidateTag } from 'next/cache'

interface Organization extends OrganizationSchema {
  imageUrl: string
}

interface OrganizationCreate extends Organization {
  userId?: string
}

export async function createOrganization (data: OrganizationCreate) {
  const { userId = '', ...organization } = data

  try {
    await backendClient.publicFiles.confirmUpload({
      url: data.imageUrl
    })
  } catch (error) {
  }

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

type OrganizationUpdate = Partial<Organization>

export async function updateOrganization (organizationId: string, data: OrganizationUpdate) {
  try {
    await backendClient.publicFiles.confirmUpload({
      url: data.imageUrl
    })
  } catch (error) {
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
      data: {},
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
