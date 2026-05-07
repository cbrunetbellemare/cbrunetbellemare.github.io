import { inject, type InjectionKey } from 'vue'

export interface ArtbookZoomResetOptions {
  smooth?: boolean
}

export type ArtbookZoomReset = (options?: ArtbookZoomResetOptions) => Promise<void>

export const artbookZoomResetKey: InjectionKey<ArtbookZoomReset> = Symbol('artbookZoomReset')

export function useArtbookZoomReset() {
  return inject(artbookZoomResetKey, undefined)
}
