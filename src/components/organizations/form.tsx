'use client'

import Button from '@/components/buttons/button'
import SubmitButton from '@/components/buttons/submit'
import FormItem from '@/components/forms/form-item'
import XMarkIcon from '@/components/icons/xmark'
import { SingleImageDropzoneUsage } from '@/components/image-dropzone'
import Input from '@/components/inputs/input'
import TextArea from '@/components/inputs/textarea'

// TODO: Importar que te servirán para realizar todo
// import { createOrganization } from '@/actions/organizations'
// import useFileUpload from '@/hooks/use-file-upload'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { organizationSchema, type OrganizationSchema } from '@/schemas/organization'

interface Props {
  close: () => void
  userId?: string
}

export function CreateOrganizationForm ({ close, userId }: Props) {
  // TODO: Manejar el envió del formulario con react hook form, con el schema de organizationSchema

  // TODO: En el SingleImageDropzoneUsage usa el hook useFileUpload para subir la imagen en el onChange

  // TODO: Agregar los registers que te da el hook useForm

  // TODO: accede al estado del formulario con react hook form para agregarle las propiedades de disabled al submit button y al SingleImageDropzoneUsage

  // TODO: Al momento de usar el server action debes usar la desestructuración para agregar el url de la imagen y también el userId

  return (
    <form className='fixed inset-0 z-50 m-auto flex h-[90dvh] w-[85dvw] animate-moveUp flex-col  bg-white transition-all duration-500 dark:bg-accent-dark md:h-[90dvh] md:w-[75vw] lg:w-[75vw]'>
      <header className="flex h-16 items-center justify-between border-b border-gray-400 px-6 dark:border-white md:px-4">
        <h1 className="text-2xl font-bold">Crear Organización</h1>
        <button onClick={close}><XMarkIcon /></button>
      </header>
      <main className="flex flex-1 flex-col gap-3 overflow-y-scroll px-6 pb-10 pt-6 scrollbar-thin scrollbar-white dark:scrollbar-dark md:px-4 lg:gap-5">

        <FormItem htmlFor='image' label='Imagen de la organización'>
          <SingleImageDropzoneUsage width={'100%'} />
        </FormItem>

        <FormItem htmlFor='name' label='Nombre'>
          <Input type='text' />
        </FormItem>

        <FormItem htmlFor='description' label='Descripción'>
          <TextArea />
        </FormItem>

        <Input type='checkbox' placeholder='Habilitar Entregas'/>

      </main>
      <footer className="flex h-16 items-center justify-end gap-4 border-t border-gray-400 px-6 dark:border-white md:px-4">
        <Button onClick={close} className='w-40' variant='danger'>Cancelar</Button>
        <SubmitButton className='w-40'>Crear</SubmitButton>
      </footer>
    </form>
  )
}
