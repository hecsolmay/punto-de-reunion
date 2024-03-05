import { createProduct, updateProduct } from '@/actions/products'
import Button from '@/components/buttons/button'
import SubmitButton from '@/components/buttons/submit'
import FormItem from '@/components/forms/form-item'
import XMarkIcon from '@/components/icons/xmark'
import {
  MultiImageDropzoneUsage,
  SingleImageDropzoneUsage
} from '@/components/image-dropzone'
import InputImageFile from '@/components/inputs/file'
import Input from '@/components/inputs/input'
import { MultiSelect, type OptionType } from '@/components/inputs/select'
import TextArea from '@/components/inputs/textarea'
import { type FileState } from '@/components/multi-image-dropzone'
import useFileUpload from '@/hooks/use-file-upload'
import { cn } from '@/libs/cn'
import { toast } from '@/libs/sonner'
import { productSchema, type ProductSchema } from '@/schemas/product'
import { type Category } from '@/types/actions'
import { type ProductResponse } from '@/types/response'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  const [images, setImages] = useState<string[]>(
    defaultProduct?.images.map(({ imageUrl }) => imageUrl) ?? []
  )
  const categories = allCategories.map(c => ({ label: c.name, value: c.id }))
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    defaultProduct?.categories.map(({ category: c }) => ({
      label: c.name,
      value: c.id
    })) ?? []
  )
  const { file, isUploading, progress, uploadFile, setFile } = useFileUpload()
  const {
    isUploading: newIsUploading,
    progress: newProgress,
    uploadFile: newUploadFile
  } = useFileUpload()
  const [indexUploading, setIndexUploading] = useState(0)
  const [isMultiUploading, setIsMultiUploading] = useState(false)
  const [fileStates, setFileStates] = useState<FileState[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      available: defaultProduct?.status === 'AVAILABLE' ?? true,
      description: defaultProduct?.description ?? '',
      name: defaultProduct?.name ?? '',
      price: defaultProduct?.price
    }
  })

  const handleSelect = (selected: OptionType[]) => {
    setSelectedCategories(selected)
  }

  const handleSaveImages = (urls?: string[]) => {
    if (urls === undefined) return

    const total = images.length + urls.length
    if (total > 4) return

    setImages([...images, ...urls])
  }

  const handleFileChange = async (file?: File) => {
    if (file === undefined) return

    try {
      const res = await uploadFile(file, { type: 'product', temporary: true })
      if (res === undefined) return

      if (res.url === undefined) return

      setImages([...images, res.url])
      setFile(undefined)
    } catch (error) {
      toast.error('Error al subir la imagen')
    }
  }

  const handleReplaceImage =
    (prevUrl: string, index: number) => async (file?: File) => {
      if (file === undefined) return

      try {
        setIndexUploading(index)
        const res = await newUploadFile(file, {
          type: 'product',
          temporary: true
        })
        if (res === undefined) return

        const sortedImages = images.toSpliced(index, 0, res.url)
        const filteredImages = sortedImages.filter(img => img !== prevUrl)
        setImages([...filteredImages])
      } catch (error) {
        toast.error('Error al subir la imagen')
      }
    }

  const onSubmit = async (data: ProductSchema) => {
    if (images.length === 0) {
      toast.error('Por favor, agrega al menos una imagen')
      return
    }

    try {
      const formattedCategories = selectedCategories.map(({ value }) => value)
      if (isCreate) {
        const res = await createProduct({
          ...data,
          images,
          categories: formattedCategories,
          organizationId
        })

        if (res.error !== undefined) {
          throw new Error('Error al crear el producto')
        }

        toast.success('Producto creado correctamente')
        resetStates()
        return
      }

      const res = await updateProduct(defaultProduct?.id ?? '', {
        ...data,
        images,
        categories: formattedCategories
      })

      if (res.error !== undefined) {
        throw new Error('Error al crear el producto')
      }

      toast.success('Producto actualizado correctamente')
    } catch (error) {
      console.error(error)
      const text = isCreate
        ? 'Error al crear el producto, por favor, intenta de nuevo'
        : 'Error al actualizar el producto, por favor, intenta de nuevo'
      toast.error(text)
    }
  }

  const resetStates = () => {
    setImages([])
    reset()
    setSelectedCategories([])
    setFile(undefined)
    setFileStates([])
  }

  const title = isCreate ? 'Crear Producto' : 'Editar Producto'
  const buttonText = isCreate ? 'Crear' : 'Actualizar'

  const hasMaxFiles = 4 - images.length === 0

  return (
    <div className='fixed inset-0 z-50 m-auto flex h-[90dvh] max-h-[90dvh] w-[85dvw] max-w-3xl animate-moveUp flex-col  overflow-hidden bg-white transition-all duration-500 dark:bg-accent-dark md:h-[90dvh] md:w-[75vw] lg:w-[75vw]'>
      <div className='flex h-16 items-center justify-between border-b border-gray-400 px-6 dark:border-white md:px-4'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <button onClick={close}>
          <XMarkIcon />
        </button>
      </div>

      <form
        className='flex max-h-[90%] flex-col'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-1 flex-col gap-3 overflow-y-scroll px-6 pb-10 pt-6 scrollbar-thin scrollbar-white dark:scrollbar-dark md:px-4 lg:gap-5'>
          <FormItem htmlFor='images' label='Imagenes del producto'>
            <div
              className={cn(
                'grid place-items-center min-h-52',
                !isCreate &&
                  'grid-cols-[repeat(auto-fit,minmax(188px,1fr))] gap-4'
              )}
            >
              {isCreate && (
                <MultiImageDropzoneUsage
                  fileStates={fileStates}
                  setFileStates={setFileStates}
                  temporary
                  setIsLoading={value => {
                    setIsMultiUploading(value)
                  }}
                  path='product'
                  saveImages={handleSaveImages}
                  className={'h-full w-full'}
                />
              )}
              {!isCreate && (
                <>
                  {images.map((image, index) => (
                    <div key={image} className='relative size-52'>
                      <InputImageFile
                        url={image}
                        onChange={handleReplaceImage(image, index)}
                        imageClassName={'object-cover size-52'}
                        className='size-52'
                      />
                      {indexUploading === index && newIsUploading && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                          {newProgress}%
                        </div>
                      )}
                    </div>
                  ))}
                  {!hasMaxFiles && (
                    <div className='relative size-52'>
                      <SingleImageDropzoneUsage
                        onChange={handleFileChange}
                        value={file}
                        disabled={isUploading}
                        width={156}
                        className={'h-full min-w-[200px]'}
                      />
                      {isUploading && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                          {progress}%
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </FormItem>

          <FormItem htmlFor='name' label='Nombre'>
            <Input
              register={register('name')}
              type='text'
              error={errors.name?.message}
            />
          </FormItem>

          <FormItem htmlFor='price' label='Precio'>
            <Input
              register={register('price', { valueAsNumber: true })}
              type='number'
              error={errors.price?.message}
            />
          </FormItem>

          <FormItem htmlFor='categories' label='Categorias'>
            <MultiSelect
              options={categories}
              setSelected={handleSelect}
              selectedOptions={selectedCategories}
            />
          </FormItem>

          <FormItem htmlFor='description' label='Descripción'>
            <TextArea
              register={register('description')}
              error={errors.description?.message}
            />
          </FormItem>

          <div>
            <Input
              register={register('available')}
              type='checkbox'
              placeholder='Disponible'
            />
            {errors.available?.message !== undefined && (
              <p className='test-sm mt-1 text-red-500'>
                {errors.available?.message}
              </p>
            )}
          </div>
        </div>

        <div className='flex h-16 items-center justify-end gap-4 border-t border-gray-400 px-6 dark:border-white md:px-4'>
          <Button
            type='button'
            onClick={close}
            className='w-40'
            variant='danger'
          >
            Cancelar
          </Button>
          <SubmitButton
            variant={isCreate ? 'default' : 'warning'}
            disabled={
              isUploading || newIsUploading || isSubmitting || isMultiUploading
            }
            className='w-40'
            loading={isSubmitting}
          >
            {buttonText}
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}
