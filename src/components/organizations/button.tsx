'use client'

import { deleteOrganization } from '@/actions/organizations'
import AlertDialog from '@/components/alert-dialog'
import Button from '@/components/buttons/button'
import ModalBackground from '@/components/modal-background'
import { CreateOrganizationForm, UpdateOrganizationForm } from '@/components/organizations/form'
import { MAX_ORGANIZATIONS_NUMBER } from '@/constants'
import useModal from '@/hooks/use-modal'
import { toast } from '@/libs/sonner'
import { type Organizations } from '@prisma/client'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  organizationsCount?: number
  userId: string
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
  organization: Organizations
}

export function EditOrganizationButton ({
  className,
  organization
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
      {isOpen && <UpdateOrganizationForm close={close} defaultValues={organization} />}
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
