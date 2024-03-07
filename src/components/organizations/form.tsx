'use client'

import { createOrganization, updateOrganization } from '@/actions/organizations'
import Button from '@/components/buttons/button'
import SubmitButton from '@/components/buttons/submit'
import FormItem from '@/components/forms/form-item'
import XMarkIcon from '@/components/icons/xmark'
import { SingleImageDropzoneUsage } from '@/components/image-dropzone'
import InputImageFile from '@/components/inputs/file'
import Input from '@/components/inputs/input'
import TextArea from '@/components/inputs/textarea'
import useFileUpload from '@/hooks/use-file-upload'
import { toast } from '@/libs/sonner'
import { organizationSchema, type OrganizationSchema } from '@/schemas/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Organizations } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  close: () => void
  userId: string
}

export function CreateOrganizationForm ({ close, userId }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema)
  })
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  const { uploadFile, isUploading, file, progress, setFile } = useFileUpload()

  const onSubmit = async (data: OrganizationSchema) => {
    try {
      if (imageUrl === undefined || file === undefined) {
        toast.error('Por favor, selecciona una imagen')
        return
      }

      const res = await createOrganization({ ...data, userId, imageUrl })

      if ('error' in res) {
        throw new Error('Ocurrió un error al crear la organización')
      }

      toast.success('Organización Creada')
      resetStates()
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al crear la organización')
    }
  }

  const handleChange = async (file?: File) => {
    try {
      const res = await uploadFile(file, { type: 'organization', temporary: true })

      if (res === undefined) return

      setImageUrl(res.url)
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al subir el archivo')
    }
  }

  const resetStates = () => {
    setImageUrl(undefined)
    setFile(undefined)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='fixed inset-0 z-50 m-auto flex h-[90dvh] w-[85dvw] max-w-3xl animate-moveUp  flex-col bg-white transition-all duration-500 dark:bg-accent-dark md:h-[90dvh] md:w-[75vw] lg:w-[75vw]'>
      <header className="flex h-16 items-center justify-between border-b border-gray-400 px-6 dark:border-white md:px-4">
        <h1 className="text-2xl font-bold">Crear Organización</h1>
        <button type='button' onClick={close}><XMarkIcon /></button>
      </header>
      <main className="flex flex-1 flex-col gap-3 overflow-y-scroll px-6 pb-10 pt-6 scrollbar-thin scrollbar-white dark:scrollbar-dark md:px-4 lg:gap-5">

        <FormItem htmlFor='image' label='Imagen de la organización'>
          <div className='grid place-items-center'>
            <SingleImageDropzoneUsage disabled={isUploading} value={file} onChange={handleChange} width={'100%'} />
            {isUploading && (
              <div className='mt-2 h-2 w-full overflow-hidden rounded-md border'>
                <div className='h-full bg-accent-dark transition-all duration-150 dark:bg-white' style={{ width: `${progress}%` }}/>
              </div>
            )}
          </div>
        </FormItem>

        <FormItem htmlFor='name' label='Nombre'>
          <Input register={register('name')} type='text' error={errors.name?.message} />
        </FormItem>

        <FormItem htmlFor='description' label='Descripción'>
          <TextArea register={register('description')} error={errors.description?.message} />
        </FormItem>

        <div>
          <Input register={register('deliveryAllowed')} type='checkbox' placeholder='Habilitar Entregas'/>
          {errors.deliveryAllowed?.message !== undefined && <p className='test-sm mt-1 text-red-500'>{errors.deliveryAllowed?.message}</p>}
        </div>

      </main>
      <footer className="flex h-16 items-center justify-end gap-4 border-t border-gray-400 px-6 dark:border-white md:px-4">
        <Button onClick={close} className='w-40' variant='danger'>Cancelar</Button>
        <SubmitButton disabled={isSubmitting || isUploading} className='w-40' loading={isSubmitting}>Crear</SubmitButton>
      </footer>
    </form>
  )
}

interface UpdateOrganizationFormProps {
  close: () => void
  defaultValues: Organizations
}

export function UpdateOrganizationForm ({ close, defaultValues }: UpdateOrganizationFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      ...defaultValues
    }
  })
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultValues.imageUrl)

  const { uploadFile, isUploading, progress } = useFileUpload()

  const onSubmit = async (data: OrganizationSchema) => {
    try {
      if (imageUrl === undefined) {
        toast.error('Por favor, selecciona una imagen')
        return
      }

      const res = await updateOrganization(defaultValues.id, {
        ...data,
        imageUrl
      })

      if (res.error !== undefined) {
        throw new Error('Error al actualizar la organización')
      }

      toast.success('Organización Actualizada')
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al actualizar la organización')
    }
  }

  const handleChange = async (file?: File) => {
    try {
      const res = await uploadFile(file, { type: 'organization', temporary: true })

      if (res === undefined) return

      setImageUrl(res.url)
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al subir el archivo')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='fixed inset-0 z-50 m-auto flex h-[90dvh] w-[85dvw] max-w-3xl animate-moveUp  flex-col bg-white transition-all duration-500 dark:bg-accent-dark md:h-[90dvh] md:w-[75vw] lg:w-[75vw]'>
      <header className="flex h-16 items-center justify-between border-b border-gray-400 px-6 dark:border-white md:px-4">
        <h1 className="text-2xl font-bold">Actualizar Organización</h1>
        <button type='button' onClick={close}><XMarkIcon /></button>
      </header>
      <main className="flex flex-1 flex-col gap-3 overflow-y-scroll px-6 pb-10 pt-6 scrollbar-thin scrollbar-white dark:scrollbar-dark md:px-4 lg:gap-5">

        <FormItem htmlFor='image' label='Imagen de la organización'>
          <div className='grid place-items-center'>
            <InputImageFile url={imageUrl} onChange={handleChange} />
            {isUploading && (
              <div className='mt-2 h-2 w-full overflow-hidden rounded-md border'>
                <div className='h-full bg-accent-dark transition-all duration-150 dark:bg-white' style={{ width: `${progress}%` }}/>
              </div>
            )}
          </div>
        </FormItem>

        <FormItem htmlFor='name' label='Nombre'>
          <Input register={register('name')} type='text' error={errors.name?.message} />
        </FormItem>

        <FormItem htmlFor='description' label='Descripción'>
          <TextArea register={register('description')} error={errors.description?.message} />
        </FormItem>

        <div>
          <Input register={register('deliveryAllowed')} type='checkbox' placeholder='Habilitar Entregas'/>
          {errors.deliveryAllowed?.message !== undefined && <p className='test-sm mt-1 text-red-500'>{errors.deliveryAllowed?.message}</p>}
        </div>

      </main>
      <footer className="flex h-16 items-center justify-end gap-4 border-t border-gray-400 px-6 dark:border-white md:px-4">
        <Button onClick={close} className='w-40' variant='danger'>Cancelar</Button>
        <SubmitButton disabled={isSubmitting || isUploading} className='w-40' variant='warning' loading={isSubmitting}>Actualizar</SubmitButton>
      </footer>
    </form>
  )
}
