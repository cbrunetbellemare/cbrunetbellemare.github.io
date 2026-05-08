import { publicAsset } from '../utils/publicPath'

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
    pageImage: publicAsset('images/pages/preface.jpg'),
    mapImage: publicAsset('images/maps/map.jpg'),
    nextPageId: 'geants',
  },
  {
    id: 'geants',
    name: 'Les géants',
    routePath: '/geants',
    pageImage: publicAsset('images/pages/geants.jpg'),
    mapImage: publicAsset('images/maps/mapTlezos.jpg'),
    nextPageId: 'magie',
  },
  {
    id: 'magie',
    name: 'La magie',
    routePath: '/magie',
    pageImage: publicAsset('images/pages/magie.jpg'),
    mapImage: publicAsset('images/maps/mapMagie.jpg'),
    nextPageId: 'flou',
  },
  {
    id: 'flou',
    name: 'Le Flou',
    routePath: '/flou',
    pageImage: publicAsset('images/pages/flou.jpg'),
    mapImage: publicAsset('images/maps/mapFlou.jpg'),
    nextPageId: 'dragons',
  },
  {
    id: 'dragons',
    name: 'Les dragons',
    routePath: '/dragons',
    pageImage: publicAsset('images/pages/dragons.jpg'),
    mapImage: publicAsset('images/maps/mapDragons.jpg'),
    nextPageId: 'talia',
  },
  {
    id: 'talia',
    name: 'Talia',
    routePath: '/talia',
    pageImage: publicAsset('images/pages/talia.jpg'),
    mapImage: publicAsset('images/maps/mapTalia.jpg'),
    nextPageId: 'alinora',
  },
  {
    id: 'alinora',
    name: 'Alinora',
    routePath: '/alinora',
    pageImage: publicAsset('images/pages/alinora.jpg'),
    mapImage: publicAsset('images/maps/mapAlinora.jpg'),
    nextPageId: 'merafleurs',
  },
  {
    id: 'merafleurs',
    name: 'Les Mérafleurs',
    routePath: '/merafleurs',
    pageImage: publicAsset('images/pages/merafleurs.jpg'),
    mapImage: publicAsset('images/maps/mapAlinora.jpg'),
    nextPageId: 'romy',
  },
  {
    id: 'romy',
    name: 'Romy',
    routePath: '/romy',
    pageImage: publicAsset('images/pages/romy.jpg'),
    mapImage: publicAsset('images/maps/mapRomy.jpg'),
  },
] as const

export const firstArtbookPage = artbookPages[0]

export function findArtbookPageById(pageId: string) {
  return artbookPages.find((page) => page.id === pageId)
}
