// Injection Vue utilisée par les pages pour demander un reset du zoom au layout.
import { inject, type InjectionKey } from 'vue'

export interface ArtbookZoomResetOptions {
  smooth?: boolean
}

export type ArtbookZoomReset = (options?: ArtbookZoomResetOptions) => Promise<void>

export const artbookZoomResetKey: InjectionKey<ArtbookZoomReset> = Symbol('artbookZoomReset')

export function useArtbookZoomReset() {
  // undefined hors du layout: les pages peuvent l'appeler sans casser.
  return inject(artbookZoomResetKey, undefined)
}
