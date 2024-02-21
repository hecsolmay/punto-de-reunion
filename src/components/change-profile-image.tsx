'use client'

import { updateUserProfileImage } from '@/actions/user'
import { SingleImageDropzoneUsage } from '@/components/image-dropzone'
import ModalBackground from '@/components/modal-background'
import useModal from '@/hooks/use-modal'
import { cn } from '@/libs/cn'
import { toast } from '@/libs/sonner'

interface Props {
  className?: string
  name?: string
  profileUrl?: string
  userId?: string
}

export default function ChangeProfileImage ({ className, name, profileUrl, userId }: Props) {
  const { isOpen, close, open } = useModal(false)

  const handleSaveImage = async (url: string) => {
    try {
      await updateUserProfileImage({ url, userId })
      toast.success('Foto de Perfil Actualizada')
    } catch (error) {
      toast.error('Error al Actualizar la Foto de Perfil')
    }
  }

  return (
    <>
      <img onClick={open} title='Cambiar Foto de Perfil' className={cn('size-12 rounded-full cursor-pointer', className)} src={profileUrl} alt={`Foto de perfil de ${name}`} />
      { isOpen && (
        <>
          <ModalBackground close={close} isOpen={isOpen} />
          <section className='fixed inset-0 z-50 m-auto flex h-[60dvh] w-[45dvw] animate-moveUp flex-col rounded-md   bg-white duration-700 dark:bg-accent-dark'>
            <h1 className='mb-6 mt-3 text-center text-3xl font-bold'>Cambiar Foto de Perfil</h1>
            <div className='grid flex-1 place-items-center'>
              <SingleImageDropzoneUsage buttonText='Actualizar Foto' path='profile' width={'100%'} saveImage={handleSaveImage}/>
            </div>
          </section>
        </>
      )}
    </>
  )
}
