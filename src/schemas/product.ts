import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().trim().toLowerCase().min(3, 'El nombre del producto debe tener al menos 3 caracteres'),
  description: z.string().trim().toLowerCase().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.coerce.number({
    invalid_type_error: 'Precio Invalido'
  }).positive({
    message: 'El precio debe ser positivo'
  }),
  available: z.boolean().default(true)
})

export type ProductSchema = z.infer<typeof productSchema>
