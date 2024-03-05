'use server'

import { backendClient } from '@/libs/edgestore-server'

export async function confirmUploadImage (url: string) {
  try {
    await backendClient.publicFiles.confirmUpload({
      url
    })

    return url
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function confirmUploadImages (urls: string[]) {
  try {
    const promises = urls.map(async url => await backendClient.publicFiles.confirmUpload({
      url
    }))

    await Promise.all(promises)

    return urls
  } catch (error) {
    console.error(error)
    return null
  }
}
