export interface ArtbookPage {
  id: string
  name: string
  routePath: string
  pageImage: string
  nextPageId?: string
}

export const artbookPages: readonly [ArtbookPage, ...ArtbookPage[]] = [
  {
    id: 'preface',
    name: 'Préface',
    routePath: '/pages/foreword',
    pageImage: '/images/pages/preface.jpg',
    nextPageId: 'geants',
  },
  {
    id: 'geants',
    name: 'Les Géants',
    routePath: '/pages/geants',
    pageImage: '/images/pages/geants.jpg',
    nextPageId: 'magie',
  },
  // {
  //   id: 'magie',
  //   name: 'Magie',
  //   routePath: '/pages/magie',
  //   pageImage: '/images/pages/magie.jpg',
  //   nextPageId: 'flou',
  // },
  {
    id: 'flou',
    name: 'Flou',
    routePath: '/pages/flou',
    pageImage: '/images/pages/flou.jpg',
  },
] as const

export const firstArtbookPage = artbookPages[0]

export function findArtbookPageById(pageId: string) {
  return artbookPages.find((page) => page.id === pageId)
}
