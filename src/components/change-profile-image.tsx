'use client'

import { updateUserProfileImage } from '@/actions/user'
import Button from '@/components/buttons/button'
import { SingleImageDropzoneUsage } from '@/components/image-dropzone'
import ModalBackground from '@/components/modal-background'
import useFileUpload from '@/hooks/use-file-upload'
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
  const { file, setFile, isUploading, progress, uploadFile } = useFileUpload()
  const { isOpen, close, open } = useModal(false)

  const handleSaveImage = async (url?: string) => {
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
              <SingleImageDropzoneUsage disabled={isUploading} value={file} onChange={(file) => { setFile(file) }} width={'100%'} />

              <Button
                type='button'
                disabled={isUploading}
                onClick={async () => {
                  try {
                    const res = await uploadFile({ type: 'profile', temporary: false })

                    if (res === undefined) return

                    handleSaveImage(res.url)
                  } catch (error) {
                  }
                }}
              >
                Actualizar Foto {isUploading && `(${progress}%)`}
              </Button>

            </div>
          </section>
        </>
      )}
    </>
  )
}
