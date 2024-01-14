'use client'

import HamburgerIcon from '@/components/icons/hamburger'
import ModalBackground from '@/components/modal-background'
import useModal from '@/hooks/use-modal'

export default function SideBarButton () {
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
      <aside className={`
        fixed left-0 top-0 z-50 h-screen 
        w-[30vw] bg-white transition-all 
        duration-500  dark:bg-accent-dark
        ${isOpen ? 'translate-x-0 ease-in-out' : 'translate-x-[-100%] ease-in-out'}`
      }>

      </aside>

    </>
  )
}
