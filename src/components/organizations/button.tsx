'use client'

import Button from '@/components/buttons/button'
import useModal from '@/hooks/use-modal'
import { PlusIcon } from 'lucide-react'
import ModalBackground from '@/components/modal-background'

export function CreateOrganizationButton () {
  const { isOpen, close, open } = useModal(false)

  return (
    <>
      <Button onClick={open}>
        <PlusIcon />
        Crear Organización
      </Button>
      { isOpen && <ModalBackground close={close} isOpen={isOpen} /> }
    </>
  )
}
