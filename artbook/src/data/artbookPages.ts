// Données centrales de l'artbook: ordre des pages, routes et médias associés.

export interface ArtbookPage {
  id: string
  name: string
  routePath: string
  pageImage: string
  mapImage: string
  nextPageId?: string
}

// Liste des pages dans l'ordre de lecture.
export const artbookPages: readonly [ArtbookPage, ...ArtbookPage[]] = [
  {
    id: 'preface',
    name: 'Préface',
    routePath: '/foreword',
    pageImage: '/images/pages/preface.jpg',
    mapImage: '/images/maps/map.jpg',
    nextPageId: 'geants',
  },
  {
    id: 'geants',
    name: 'Les géants',
    routePath: '/geants',
    pageImage: '/images/pages/geants.jpg',
    mapImage: '/images/maps/mapTlezos.jpg',
    nextPageId: 'magie',
  },
  {
    id: 'magie',
    name: 'La magie',
    routePath: '/magie',
    pageImage: '/images/pages/magie.jpg',
    mapImage: '/images/maps/mapMagie.jpg',
    nextPageId: 'flou',
  },
  {
    id: 'flou',
    name: 'Le Flou',
    routePath: '/flou',
    pageImage: '/images/pages/flou.jpg',
    mapImage: '/images/maps/mapFlou.jpg',
    nextPageId: 'dragons',
  },
  {
    id: 'dragons',
    name: 'Les dragons',
    routePath: '/dragons',
    pageImage: '/images/pages/dragons.jpg',
    mapImage: '/images/maps/mapDragons.jpg',
    nextPageId: 'talia',
  },
  {
    id: 'talia',
    name: 'Talia',
    routePath: '/talia',
    pageImage: '/images/pages/talia.jpg',
    mapImage: '/images/maps/mapTalia.jpg',
    nextPageId: 'alinora',
  },
  {
    id: 'alinora',
    name: 'Alinora',
    routePath: '/alinora',
    pageImage: '/images/pages/alinora.jpg',
    mapImage: '/images/maps/mapAlinora.jpg',
    nextPageId: 'merafleurs',
  },
  {
    id: 'merafleurs',
    name: 'Les Mérafleurs',
    routePath: '/merafleurs',
    pageImage: '/images/pages/merafleurs.jpg',
    mapImage: '/images/maps/mapAlinora.jpg',
    nextPageId: 'romy',
  },
  {
    id: 'romy',
    name: 'Romy',
    routePath: '/romy',
    pageImage: '/images/pages/romy.jpg',
    mapImage: '/images/maps/mapRomy.jpg',
  },
] as const

export const firstArtbookPage = artbookPages[0]

export function findArtbookPageById(pageId: string) {
  // Utilisé par le déblocage pour valider les ids sauvegardés.
  return artbookPages.find((page) => page.id === pageId)
}
