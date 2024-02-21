'use client'

import Button from '@/components/buttons/button'
import {
  MultiImageDropzone,
  type FileState
} from '@/components/multi-image-dropzone'
import { SingleImageDropzone } from '@/components/single-image-dropzone'
import { IMAGE_MAX_SIZE } from '@/constants'
import { useEdgeStore } from '@/libs/edgestore'
import { useState } from 'react'

interface Props {
  path: 'product'
  saveImage?: (url: string) => Promise<void> | void
  maxFiles?: number
}

export function MultiImageDropzoneUsage ({
  path,
  saveImage,
  maxFiles = 4
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
  path: 'profile' | 'category' | 'brand' | 'organization'
  saveImage?: (url: string) => Promise<void> | void
  className?: string
  buttonClassName?: string
  buttonText?: string
}
export function SingleImageDropzoneUsage ({
  path,
  saveImage,
  className,
  buttonClassName,
  height = 200,
  width = 200,
  buttonText = 'Subir Imagen'
}: SingleImageDropzoneProps) {
  const [file, setFile] = useState<File>()
  const [progressbar, setProgressbar] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const { edgestore } = useEdgeStore()
  return (
    <>
      <SingleImageDropzone
        width={width}
        height={height}
        value={file}
        disabled={isUploading}
        className={className}
        dropzoneOptions={{
          maxSize: IMAGE_MAX_SIZE
        }}
        onChange={file => {
          setFile(file)
        }}
      />
      <Button
        type='button'
        className={buttonClassName}
        disabled={isUploading}
        onClick={async () => {
          if (file !== undefined) {
            setIsUploading(true)
            try {
              const res = await edgestore.publicFiles.upload({
                input: {
                  type: path
                },
                file,
                onProgressChange: progress => {
                  // you can use this to show a progress bar
                  setProgressbar(progress)
                }
              })
              // you can run some server action or api here
              // to add the necessary data to your database
              await saveImage?.(res.url)
            } catch (err) {
              setIsUploading(false)
            } finally {
              setIsUploading(false)
            }
          }
        }}
      >
        {buttonText} {isUploading && `${progressbar}%`}
      </Button>
    </>
  )
}
