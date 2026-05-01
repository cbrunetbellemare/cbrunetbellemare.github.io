import type { Component } from 'vue'
import PageFlou from '../views/pages/PageFlou.vue'
import PageMagie from '../views/pages/PageMagie.vue'
import PagePreface from '../views/pages/PagePreface.vue'
import { artbookPages, firstArtbookPage, type ArtbookPage } from '../data/artbookPages'

interface ArtbookRoute {
  path: string
  page: ArtbookPage
  component: Component
}

const pageComponents: Record<string, Component> = {
  preface: PagePreface,
  magie: PageMagie,
  flou: PageFlou,
}

export const artbookRoutes: ArtbookRoute[] = artbookPages.map((page) => ({
  path: page.routePath,
  page,
  component: getPageComponent(page.id),
}))

export const fallbackRoute =
  artbookRoutes.find((route) => route.page.id === firstArtbookPage.id) ?? (artbookRoutes[0] as ArtbookRoute)

function getPageComponent(pageId: string) {
  const component = pageComponents[pageId]

  if (!component) {
    throw new Error(`Missing artbook component for ${pageId}`)
  }

  return component
}
