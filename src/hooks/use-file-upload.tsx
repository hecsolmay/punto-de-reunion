import { useEdgeStore } from '@/libs/edgestore'
import { useState } from 'react'

interface UploadOptions {
  type: 'profile' | 'product' | 'category' | 'brand' | 'organization'
  temporary?: boolean
}

export default function useFileUpload (defaultValue?: File) {
  const [file, setFile] = useState<File | undefined>(defaultValue)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { edgestore } = useEdgeStore()

  const uploadFile = async (options: UploadOptions = { type: 'profile', temporary: undefined }) => {
    if (file === undefined) return

    setIsUploading(true)
    setProgress(0)
    const { type, temporary } = options
    try {
      const res = await edgestore.publicFiles.upload({
        input: {
          type
        },
        options: {
          temporary
        },
        file,
        onProgressChange: progress => {
        // you can use this to show a progress
          setProgress(progress)
        }
      })

      return res
    } catch (error) {
      console.error(error)
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  return { file, setFile, isUploading, progress, uploadFile }
}
