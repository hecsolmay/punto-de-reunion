import { MAX_QUANTITY_ADD_TO_CART } from '@/constants'
import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'El nombre del producto debe tener al menos 3 caracteres'),
  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.coerce
    .number({
      invalid_type_error: 'Precio Invalido'
    })
    .positive({
      message: 'El precio debe ser positivo'
    }),
  maxQuantityByCart: z.coerce
    .number({
      invalid_type_error: 'Cantidad Invalido',
      required_error: 'La cantidad maxima por carrito es requerida'
    })
    .int('La cantidad maxima por carrito debe ser un valor entero')
    .positive('La cantidad maxima por carrito debe ser positiva')
    .default(MAX_QUANTITY_ADD_TO_CART),
  available: z.boolean().default(true)
})

export type ProductSchema = z.infer<typeof productSchema>
