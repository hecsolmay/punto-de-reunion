import { z } from 'zod'

export const organizationSchema = z.object({
  name: z.string(
    { invalid_type_error: 'Nombre de la organización Invalido', required_error: 'El nombre de la organización es requerido' }
  ).trim().min(3, 'El nombre de la organización debe tener al menos 3 caracteres'),
  description: z.string(
    { invalid_type_error: 'Descripción Invalida', required_error: 'La descripción es requerida' }
  ).trim().min(10, 'La descripción debe tener al menos 10 caracteres'),
  deliveryAllowed: z.boolean().default(false)
})

export type OrganizationSchema = z.infer<typeof organizationSchema>
