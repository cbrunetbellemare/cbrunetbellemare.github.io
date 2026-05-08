// Routes internes de l'artbook: associe chaque URL à une page et à son composant Vue.
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

// Une route dit quelle page et quel composant afficher.
interface ArtbookRoute {
  path: string
  page: ArtbookPage
  component: Component
}

// On relie chaque id de page à son fichier Vue.
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
  // Séparation données/composants: les pages restent faciles à réordonner.
  component: getPageComponent(page.id),
}))

export const fallbackRoute =
  // Préférence à l'id de la première page pour éviter une dépendance à l'index seul.
  artbookRoutes.find((route) => route.page.id === firstArtbookPage.id) ?? (artbookRoutes[0] as ArtbookRoute)

function getPageComponent(pageId: string) {
  const component = pageComponents[pageId]

  if (!component) {
    // Si une page est ajoutée sans composant, on voit vite l'erreur.
    throw new Error(`Missing artbook component for ${pageId}`)
  }

  return component
}
