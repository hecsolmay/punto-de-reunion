'use client'

import { deleteOrganization } from '@/actions/organizations'
import { deleteProduct } from '@/actions/products'
import AlertDialog from '@/components/alert-dialog'
import Button from '@/components/buttons/button'
import ModalBackground from '@/components/modal-background'
import { CreateOrganizationForm } from '@/components/organizations/form'
import { MAX_ORGANIZATIONS_NUMBER } from '@/constants'
import useModal from '@/hooks/use-modal'
import { toast } from '@/libs/sonner'
import { type ProductResponse } from '@/types/response'
import { Edit, EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  organizationsCount?: number
  userId?: string
}

export function CreateOrganizationButton ({ organizationsCount = 0, userId }: Props) {
  const { isOpen, close, open } = useModal(false)

  const handleClick = () => {
    if (organizationsCount >= MAX_ORGANIZATIONS_NUMBER) {
      toast.error(
        `No puedes tener más de ${MAX_ORGANIZATIONS_NUMBER} organizaciones`
      )
      return
    }

    open()
  }

  return (
    <>
      <Button onClick={handleClick}>
        <PlusIcon />
        Crear Organización
      </Button>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      {isOpen && <CreateOrganizationForm close={close} userId={userId} />}
    </>
  )
}

interface EditOrganizationButtonProps {
  className?: string
  organizationId: string
  name: string
  description: string
  imageUrl: string
}

export function EditOrganizationButton ({
  className,
  ...organization
}: EditOrganizationButtonProps) {
  const { open, close, isOpen } = useModal(false)

  const handleClick = () => {
    open()
  }

  return (
    <>
      <Button className={className} variant='warning' onClick={handleClick}>
        <EditIcon className='size-4' />
      </Button>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      {/* TODO: ADD UPDATE ORGANIZATION FORM */}
      {isOpen && <CreateOrganizationForm close={close} userId='' />}
    </>
  )
}

interface DeleteOrganizationButtonProps {
  className?: string
  organizationId: string
  name: string
}

export function DeleteOrganizationButton ({
  name,
  organizationId,
  className
}: DeleteOrganizationButtonProps) {
  const { open, close, isOpen } = useModal(false)
  const [isSending, setIsSending] = useState(false)

  const handleClick = () => {
    open()
  }

  const handleDelete = async () => {
    setIsSending(true)
    try {
      const res = await deleteOrganization(organizationId)

      if (res.error !== undefined) {
        throw new Error('Error al eliminar la organización')
      }
      toast.success('Organización eliminada correctamente')
      close()
    } catch (error) {
      toast.error('Error al eliminar la organización')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <Button className={className} variant='danger' onClick={handleClick}>
        <TrashIcon className='size-4' />
      </Button>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      {isOpen && (
        <AlertDialog
          title='¿Deseas eliminar esta organización?'
          description='Esta operación no se puede deshacer, al eliminar la organización se eliminará de forma permanente.'
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

interface DeleteProductButtonProps {
  className?: string
  productId?: string
  name: string
}

export function DeleteProductButton ({ name, className, productId }: DeleteProductButtonProps) {
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
          title='¿Deseas desactivar este product?'
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
  productId?: string
}

export function EditProductButton ({ defaultProduct, className, productId }: EditProductButtonProps) {
  const { open, close, isOpen } = useModal(false)

  const handleClick = () => {
    open()
  }

  return (
    <>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      <Button
        onClick={handleClick}
        title='Editar Producto'
        className={className}
        variant='warning'
      >
        <Edit className='size-3.5' />
      </Button>
    </>
  )
}
