import type { Component } from 'vue'
import PageAlinora from '../views/pages/PageAlinora.vue'
import PageDragons from '../views/pages/PageDragons.vue'
import PageFlou from '../views/pages/PageFlou.vue'
import PageGeants from '../views/pages/PageGeants.vue'
import PageMagie from '../views/pages/PageMagie.vue'
import PageMerafleurs from '../views/pages/PageMerafleurs.vue'
import PagePreface from '../views/pages/PagePreface.vue'
import PageRomy from '../views/pages/PageRomy.vue'
import PageTalia from '../views/pages/PageTalia.vue'
import { artbookPages, firstArtbookPage, type ArtbookPage } from '../data/artbookPages'

// Ce fichier transforme les données des pages en routes réellement affichables par Vue.
interface ArtbookRoute {
  path: string
  page: ArtbookPage
  component: Component
}

// Chaque page déclarée dans les données doit être reliée à son composant Vue.
// Ce dictionnaire garde le routage simple et évite de dupliquer l'ordre des pages.
const pageComponents: Record<string, Component> = {
  preface: PagePreface,
  geants: PageGeants,
  magie: PageMagie,
  flou: PageFlou,
  dragons: PageDragons,
  talia: PageTalia,
  alinora: PageAlinora,
  merafleurs: PageMerafleurs,
  romy: PageRomy,
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
    // Cette erreur signale rapidement une page ajoutée aux données sans composant associé.
    throw new Error(`Missing artbook component for ${pageId}`)
  }

  return component
}
