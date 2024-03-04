'use client'

import { deleteProduct } from '@/actions/products'
import AlertDialog from '@/components/alert-dialog'
import Button from '@/components/buttons/button'
import ModalBackground from '@/components/modal-background'
import { ProductForm } from '@/components/products/form'
import useModal from '@/hooks/use-modal'
import { toast } from '@/libs/sonner'
import { type Category } from '@/types/actions'
import { type ProductResponse } from '@/types/response'
import { Edit, PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

interface CreateProductButtonProps {
  organizationId: string
  allCategories?: Category[]
}

export function CreateProductButton ({
  organizationId, allCategories = []
}: CreateProductButtonProps) {
  const { isOpen, close, open } = useModal(false)

  const handleClick = () => {
    open()
  }

  return (
    <>
      <Button onClick={handleClick}>
        <PlusIcon />
        Crear Producto
      </Button>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      {isOpen && <ProductForm close={close} organizationId={organizationId} allCategories={allCategories} />}
    </>
  )
}

interface DeleteProductButtonProps {
  className?: string
  productId?: string
  name: string
}

export function DeleteProductButton ({
  name,
  className,
  productId
}: DeleteProductButtonProps) {
  const { open, close, isOpen } = useModal(false)
  const [isSending, setIsSending] = useState(false)

  const handleClick = () => {
    open()
  }

  const handleDelete = async () => {
    setIsSending(true)
    try {
      const res = await deleteProduct(productId ?? '')

      if (res.error !== undefined) {
        throw new Error('Error al eliminar el producto')
      }
      toast.success('Producto eliminada correctamente')
      close()
    } catch (error) {
      toast.error('Error al eliminar el producto')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        title='Eliminar Producto'
        className={className}
        variant='danger'
      >
        <TrashIcon className='size-3.5' />
      </Button>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      {isOpen && (
        <AlertDialog
          title='¿Deseas desactivar este producto?'
          description='Al Desactivar el producto, no podra ser visto de forma publica.'
          showCancel
          onCancel={close}
          onOk={handleDelete}
          confirmText='Eliminar'
          cancelText='Cancelar'
          isLoading={isSending}
        />
      )}
    </>
  )
}

interface EditProductButtonProps {
  defaultProduct: ProductResponse
  className?: string
  organizationId: string
  productId: string
  allCategories?: Category[]
}

export function EditProductButton ({
  defaultProduct,
  className,
  organizationId,
  allCategories = []
}: EditProductButtonProps) {
  const { open, close, isOpen } = useModal(false)

  const handleClick = () => {
    open()
  }

  return (
    <>
      <Button
        onClick={handleClick}
        title='Editar Producto'
        className={className}
        variant='warning'
      >
        <Edit className='size-3.5' />
      </Button>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      {isOpen && (
        <ProductForm
          close={close}
          organizationId={organizationId}
          type='update'
          defaultProduct={defaultProduct}
          productId={defaultProduct.id}
          allCategories={allCategories}
        />
      )}
    </>
  )
}
