'use server'

export async function updateProfile (userId: string, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const entries = Object.fromEntries(formData)

  console.log({ formData })
  console.log({ entries })
  console.log({ userId })
  // TODO: Implementar Actualizar los datos del usuario

  return {
    message: 'Usuario Actualizado'
  }
}
