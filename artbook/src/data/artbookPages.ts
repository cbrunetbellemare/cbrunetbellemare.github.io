import { publicAsset } from '../utils/publicPath'

export interface ArtbookPage {
  // Identifiant stable utilisé par le routeur, le menu et le système de verrouillage.
  id: string
  // Nom visible dans le menu Pages, les textes alternatifs et les modales.
  name: string
  // URL interne utilisée par le routeur simple de l'artbook.
  routePath: string
  // Image finale de la page, utilisée comme visuel principal.
  pageImage: string
  // Carte associée à la page, affichée dans la modale Carte.
  mapImage: string
  // Page débloquée automatiquement après avoir consulté celle-ci.
  nextPageId?: string
}

// Cette liste définit l'ordre narratif de l'artbook, les noms affichés dans le menu
// ainsi que les images principales et cartes associées à chaque page.
export const artbookPages: readonly [ArtbookPage, ...ArtbookPage[]] = [
  {
    id: 'preface',
    name: 'Préface',
    routePath: '/pages/foreword',
    pageImage: publicAsset('images/pages/preface.jpg'),
    mapImage: publicAsset('images/maps/map.jpg'),
    nextPageId: 'geants',
  },
  {
    id: 'geants',
    name: 'Les géants',
    routePath: '/pages/geants',
    pageImage: publicAsset('images/pages/geants.jpg'),
    mapImage: publicAsset('images/maps/mapTlezos.jpg'),
    nextPageId: 'magie',
  },
  {
    id: 'magie',
    name: 'La magie',
    routePath: '/pages/magie',
    pageImage: publicAsset('images/pages/magie.jpg'),
    mapImage: publicAsset('images/maps/mapMagie.jpg'),
    nextPageId: 'flou',
  },
  {
    id: 'flou',
    name: 'Le Flou',
    routePath: '/pages/flou',
    pageImage: publicAsset('images/pages/flou.jpg'),
    mapImage: publicAsset('images/maps/mapFlou.jpg'),
    nextPageId: 'dragons',
  },
  {
    id: 'dragons',
    name: 'Les dragons',
    routePath: '/pages/dragons',
    pageImage: publicAsset('images/pages/dragons.jpg'),
    mapImage: publicAsset('images/maps/mapDragons.jpg'),
    nextPageId: 'talia',
  },
  {
    id: 'talia',
    name: 'Talia',
    routePath: '/pages/talia',
    pageImage: publicAsset('images/pages/talia.jpg'),
    mapImage: publicAsset('images/maps/mapTalia.jpg'),
    nextPageId: 'alinora',
  },
  {
    id: 'alinora',
    name: 'Alinora',
    routePath: '/pages/alinora',
    pageImage: publicAsset('images/pages/alinora.jpg'),
    mapImage: publicAsset('images/maps/mapAlinora.jpg'),
    nextPageId: 'merafleurs',
  },
  {
    id: 'merafleurs',
    name: 'Les Mérafleurs',
    routePath: '/pages/merafleurs',
    pageImage: publicAsset('images/pages/merafleur.png'),
    mapImage: publicAsset('images/maps/mapAlinora.jpg'),
    nextPageId: 'romy',
  },
  {
    id: 'romy',
    name: 'Romy',
    routePath: '/pages/romy',
    pageImage: publicAsset('images/pages/romy.jpg'),
    mapImage: publicAsset('images/maps/mapRomy.jpg'),
  },
] as const

export const firstArtbookPage = artbookPages[0]

export function findArtbookPageById(pageId: string) {
  return artbookPages.find((page) => page.id === pageId)
}
