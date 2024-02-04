'use server'

import prisma from '@/libs/prisma'
import { userSchema, type UserSchema } from '@/schemas/user'
import { revalidateTag } from 'next/cache'

export async function updateProfile (userId: string, data: UserSchema) {
  const result = userSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      error: result.error
    }
  }

  const updatedData = await prisma.users.update({
    data: result.data,
    where: {
      id: userId
    }
  })

  revalidateTag('profile')

  return {
    success: true,
    data: updatedData
  }
}
