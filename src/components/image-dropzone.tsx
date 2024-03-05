'use client'

import {
  MultiImageDropzone,
  type FileState
} from '@/components/multi-image-dropzone'
import { SingleImageDropzone } from '@/components/single-image-dropzone'
import { IMAGE_MAX_SIZE } from '@/constants'
import { cn } from '@/libs/cn'
import { useEdgeStore } from '@/libs/edgestore'
import { type SetStateAction } from 'react'

interface Props {
  path: 'product'
  saveImages?: (urls: string[]) => Promise<void> | void
  maxFiles?: number
  className?: string
  setIsLoading?: (isLoading: boolean) => void
  temporary?: boolean
  fileStates: FileState[]
  setFileStates: (fileStates: SetStateAction<FileState[]>) => void
}

export function MultiImageDropzoneUsage ({
  path,
  saveImages,
  setIsLoading,
  maxFiles = 4,
  className,
  temporary = false,
  fileStates,
  setFileStates
}: Props) {
  const { edgestore } = useEdgeStore()

  function updateFileProgress (key: string, progress: FileState['progress']) {
    setFileStates(fileStates => {
      const newFileStates = structuredClone(fileStates)
      const fileState = newFileStates.find(fileState => fileState.key === key)
      if (fileState != null) {
        fileState.progress = progress
      }
      return newFileStates
    })
  }

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        className={cn(className, fileStates.length === 0 && 'col-span-2 md:col-span-3')}
        dropzoneOptions={{
          maxFiles,
          maxSize: IMAGE_MAX_SIZE
        }}
        onChange={files => {
          setFileStates(files)
        }}
        onFilesAdded={async addedFiles => {
          setFileStates([...fileStates, ...addedFiles])
          setIsLoading?.(true)
          const images = await Promise.all(
            addedFiles.map(async addedFileState => {
              try {
                if (typeof addedFileState.file === 'string') return

                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  options: {
                    temporary
                  },
                  input: {
                    type: path
                  },
                  onProgressChange: async progress => {
                    updateFileProgress(addedFileState.key, progress)
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise(resolve => setTimeout(resolve, 1000))
                      updateFileProgress(addedFileState.key, 'COMPLETE')
                    }
                  }
                })
                return res.url
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR')
              }
            })
          )

          await saveImages?.(images.filter(img => img !== undefined) as string[])
          setIsLoading?.(false)
        }}
      />
    </div>
  )
}

interface SingleImageDropzoneProps {
  width?: string | number
  height?: string | number
  onChange?: (file: File | undefined) => void
  value?: string | File
  className?: string
  disabled?: boolean
}
export function SingleImageDropzoneUsage ({
  className,
  value,
  onChange,
  disabled,
  height = 200,
  width = 200
}: SingleImageDropzoneProps) {
  return (
    <SingleImageDropzone
      width={width}
      height={height}
      value={value}
      disabled={disabled}
      className={className}
      dropzoneOptions={{
        maxSize: IMAGE_MAX_SIZE
      }}
      onChange={onChange}
    />
  )
}
