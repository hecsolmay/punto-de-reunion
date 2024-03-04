'use client'

import {
  MultiImageDropzone,
  type FileState
} from '@/components/multi-image-dropzone'
import { SingleImageDropzone } from '@/components/single-image-dropzone'
import { IMAGE_MAX_SIZE } from '@/constants'
import { cn } from '@/libs/cn'
import { useEdgeStore } from '@/libs/edgestore'
import { useState } from 'react'

interface Props {
  path: 'product'
  saveImage?: (url: string) => Promise<void> | void
  maxFiles?: number
  className?: string
}

export function MultiImageDropzoneUsage ({
  path,
  saveImage,
  maxFiles = 4,
  className
}: Props) {
  const [fileStates, setFileStates] = useState<FileState[]>([])
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
        className={cn(className, fileStates.length === 0 && 'col-span-2')}
        dropzoneOptions={{
          maxFiles,
          maxSize: IMAGE_MAX_SIZE
        }}
        onChange={files => {
          setFileStates(files)
        }}
        onFilesAdded={async addedFiles => {
          setFileStates([...fileStates, ...addedFiles])
          await Promise.all(
            addedFiles.map(async addedFileState => {
              try {
                if (typeof addedFileState.file === 'string') return

                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true
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
                await saveImage?.(res.url)
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR')
              }
            })
          )
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
