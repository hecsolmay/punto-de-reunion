'use client'

import Button from '@/components/buttons/button'
import useModal from '@/hooks/use-modal'
import { PlusIcon } from 'lucide-react'
import ModalBackground from '@/components/modal-background'
import { MAX_ORGANIZATIONS_NUMBER } from '@/constants'
import { toast } from '@/libs/sonner'
import { CreateOrganizationForm } from './form'

interface Props {
  organizationsCount?: number
  userId?: string
}

export function CreateOrganizationButton ({ organizationsCount = 0, userId }: Props) {
  const { isOpen, close, open } = useModal(false)

  const handleClick = () => {
    if (organizationsCount >= MAX_ORGANIZATIONS_NUMBER) {
      toast.error(`No puedes tener más de ${MAX_ORGANIZATIONS_NUMBER} organizaciones`)
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
      { isOpen && <ModalBackground close={close} isOpen={isOpen} /> }
      { isOpen && <CreateOrganizationForm close={close} userId='' />}
    </>
  )
}
