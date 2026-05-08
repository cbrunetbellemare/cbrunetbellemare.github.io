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
    pageImage: '/images/pages/preface.jpg',
    mapImage: '/images/maps/map.jpg',
    nextPageId: 'geants',
  },
  {
    id: 'geants',
    name: 'Les géants',
    routePath: '/pages/geants',
    pageImage: '/images/pages/geants.jpg',
    mapImage: '/images/maps/mapTlezos.jpg',
    nextPageId: 'magie',
  },
  {
    id: 'magie',
    name: 'La magie',
    routePath: '/pages/magie',
    pageImage: '/images/pages/magie.jpg',
    mapImage: '/images/maps/mapMagie.jpg',
    nextPageId: 'flou',
  },
  {
    id: 'flou',
    name: 'Le Flou',
    routePath: '/pages/flou',
    pageImage: '/images/pages/flou.jpg',
    mapImage: '/images/maps/mapFlou.jpg',
    nextPageId: 'dragons',
  },
  {
    id: 'dragons',
    name: 'Les dragons',
    routePath: '/pages/dragons',
    pageImage: '/images/pages/dragons.jpg',
    mapImage: '/images/maps/mapDragons.jpg',
    nextPageId: 'talia',
  },
  {
    id: 'talia',
    name: 'Talia',
    routePath: '/pages/talia',
    pageImage: '/images/pages/talia.jpg',
    mapImage: '/images/maps/mapTalia.jpg',
    nextPageId: 'alinora',
  },
  {
    id: 'alinora',
    name: 'Alinora',
    routePath: '/pages/alinora',
    pageImage: '/images/pages/alinora.jpg',
    mapImage: '/images/maps/mapAlinora.jpg',
    nextPageId: 'merafleurs',
  },
  {
    id: 'merafleurs',
    name: 'Les Mérafleurs',
    routePath: '/pages/merafleurs',
    pageImage: '/images/pages/merafleur.png',
    mapImage: '/images/maps/mapAlinora.jpg',
    nextPageId: 'romy',
  },
  {
    id: 'romy',
    name: 'Romy',
    routePath: '/pages/romy',
    pageImage: '/images/pages/romy.jpg',
    mapImage: '/images/maps/mapRomy.jpg',
  },
] as const

export const firstArtbookPage = artbookPages[0]

export function findArtbookPageById(pageId: string) {
  return artbookPages.find((page) => page.id === pageId)
}
