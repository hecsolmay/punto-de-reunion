import { handler, type edgeStoreRouter } from '@/libs/edgestore-server'

export { handler as GET, handler as POST }

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter
