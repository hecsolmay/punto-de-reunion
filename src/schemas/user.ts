import { Gender } from '@prisma/client'
import { z } from 'zod'

export const userSchema = z.object({
  username: z.string(
    { invalid_type_error: 'Nombre del usuario Invalido', required_error: 'El nombre del usuario es requerido' }
  ).trim().min(3, 'El nombre del usuario debe tener al menos 3 caracteres'),
  gender: z.nativeEnum(Gender, {
    invalid_type_error: 'Genero Invalido'
  }).nullable()
})

export type UserSchema = z.infer<typeof userSchema>
