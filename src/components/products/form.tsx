import Button from '@/components/buttons/button'
import SubmitButton from '@/components/buttons/submit'
import FormItem from '@/components/forms/form-item'
import XMarkIcon from '@/components/icons/xmark'
import { MultiImageDropzoneUsage } from '@/components/image-dropzone'
import Input from '@/components/inputs/input'
import { MultiSelect, type OptionType } from '@/components/inputs/select'
import TextArea from '@/components/inputs/textarea'
import { type Category } from '@/types/actions'
import { type ProductResponse } from '@/types/response'
import { useState } from 'react'

interface Props {
  organizationId: string
  className?: string
  defaultProduct?: ProductResponse
  type?: 'create' | 'update'
  productId?: string
  close?: () => void
  allCategories?: Category[]
}

export function ProductForm ({
  className,
  close,
  defaultProduct,
  organizationId,
  allCategories = [],
  type = 'create'
}: Props) {
  const isCreate = type === 'create'
  const [images, setImages] = useState<string[]>([])
  const categories = allCategories.map(c => ({ label: c.name, value: c.id }))
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(defaultProduct?.categories.map(({ category: c }) => ({ label: c.name, value: c.id })) ?? [])

  if (type === 'update') {
    console.log({ defaultProduct, organizationId })
  }

  const handleSelect = (selected: OptionType[]) => {
    setSelectedCategories(selected)
  }

  const handleSaveImage = (url?: string) => {
    if (url === undefined) return

    setImages([...images, url])
  }

  console.log(images)

  const title = isCreate ? 'Crear Producto' : 'Editar Producto'
  const buttonText = isCreate ? 'Crear' : 'Actualizar'

  return (
    <form className='fixed inset-0 z-50 m-auto flex h-[90dvh] w-[85dvw] max-w-3xl animate-moveUp  flex-col bg-white transition-all duration-500 dark:bg-accent-dark md:h-[90dvh] md:w-[75vw] lg:w-[75vw]'>
      <header className='flex h-16 items-center justify-between border-b border-gray-400 px-6 dark:border-white md:px-4'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <button onClick={close}>
          <XMarkIcon />
        </button>
      </header>
      <main className='flex flex-1 flex-col gap-3 overflow-y-scroll px-6 pb-10 pt-6 scrollbar-thin scrollbar-white dark:scrollbar-dark md:px-4 lg:gap-5'>
        <FormItem htmlFor='image' label='Imagen de la organización'>
          <div className='grid place-items-center'>
            <MultiImageDropzoneUsage path='product' saveImage={handleSaveImage} className={'h-full w-full'}/>

          </div>
        </FormItem>

        <FormItem htmlFor='name' label='Nombre'>
          <Input
            // register={register('name')}
            type='text'
            // error={errors.name?.message}
          />
        </FormItem>

        <FormItem htmlFor='price' label='Precio'>
          <Input
            // register={register('name')}
            type='number'
            // error={errors.name?.message}
          />
        </FormItem>

        <FormItem htmlFor='categories' label='Categorias'>
          <MultiSelect options={categories} setSelected={handleSelect} selectedOptions={selectedCategories} />
        </FormItem>

        <FormItem htmlFor='description' label='Descripción'>
          <TextArea
            // register={register('description')}
            // error={errors.description?.message}
          />
        </FormItem>

        <div>
          <Input
            // register={register('deliveryAllowed')}
            type='checkbox'
            placeholder='Disponible'
          />
          {/* {errors.deliveryAllowed?.message !== undefined && (
            <p className='test-sm mt-1 text-red-500'>
              {errors.deliveryAllowed?.message}
            </p>
          )} */}
        </div>
      </main>

      <footer className='flex h-16 items-center justify-end gap-4 border-t border-gray-400 px-6 dark:border-white md:px-4'>
        <Button onClick={close} className='w-40' variant='danger'>
          Cancelar
        </Button>
        <SubmitButton
          variant={isCreate ? 'default' : 'warning'}
          // disabled={isSubmitting}
          className='w-40'
          // loading={isSubmitting}
        >
          {buttonText}
        </SubmitButton>
      </footer>
    </form>
  )
}
