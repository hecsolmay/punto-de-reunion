'use client'

import Sidebar from '@/components//sidebar'
import HamburgerIcon from '@/components/icons/hamburger'
import ModalBackground from '@/components/modal-background'
import useModal from '@/hooks/use-modal'
import { type UserSession } from '@/libs/auth'

interface Props {
  session?: UserSession | null
}

export default function SideBarButton ({ session }: Props) {
  const { open, close, isOpen } = useModal(false)

  const handleClick = () => {
    open()
  }

  const handleClose = () => {
    close()
  }

  return (
    <>
      <button onClick={handleClick}>
        <HamburgerIcon className="size-7"/>
      </button>
      <ModalBackground isOpen={isOpen} close={handleClose} />
      <Sidebar session={session} isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
