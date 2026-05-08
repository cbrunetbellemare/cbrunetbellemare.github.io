import { computed, ref } from 'vue'
import { artbookPages, findArtbookPageById, firstArtbookPage } from '../data/artbookPages'

// Clé de stockage locale pour mémoriser la progression entre deux visites.
const unlockedStorageKey = 'artbook.unlockedPages.v2'

const unlockedPageIds = ref<string[]>(normalizeStoredIds(readStoredIds(unlockedStorageKey)))

function readStoredIds(key: string) {
  const storedValue = window.localStorage.getItem(key)

  if (!storedValue) {
    return []
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue)
    return Array.isArray(parsedValue) && parsedValue.every((item) => typeof item === 'string')
      ? parsedValue
      : []
  } catch {
    return []
  }
}

function persistIds(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify(ids))
}

function addStoredId(ids: string[], pageId: string) {
  return ids.includes(pageId) ? ids : [...ids, pageId]
}

function normalizeStoredIds(ids: string[]) {
  // La première page est toujours disponible, donc on ne la stocke pas.
  return ids.filter((pageId) => pageId !== firstArtbookPage.id && Boolean(findArtbookPageById(pageId)))
}

export function useUnlockedPages() {
  // Le menu affiche toutes les pages, mais seules les pages accessibles peuvent être ouvertes.
  const allPages = computed(() => artbookPages)
  const accessiblePages = computed(() => {
    return artbookPages.filter((page) => isPageAccessible(page.id))
  })

  function isPageAccessible(pageId: string) {
    return pageId === firstArtbookPage.id || unlockedPageIds.value.includes(pageId)
  }

  function unlockPage(pageId: string) {
    if (pageId === firstArtbookPage.id || !findArtbookPageById(pageId)) {
      return
    }

    unlockedPageIds.value = addStoredId(unlockedPageIds.value, pageId)
    persistIds(unlockedStorageKey, unlockedPageIds.value)
  }

  function unlockNextPage(currentPageId: string) {
    const currentPage = findArtbookPageById(currentPageId)

    // Lorsqu'une page est consultée, seule la page suivante devient disponible.
    if (currentPage?.nextPageId) {
      unlockPage(currentPage.nextPageId)
    }
  }

  function unlockAllPages() {
    // Option volontaire: elle sert aux visiteurs qui veulent consulter librement l'artbook.
    unlockedPageIds.value = artbookPages
      .filter((page) => page.id !== firstArtbookPage.id)
      .map((page) => page.id)
    persistIds(unlockedStorageKey, unlockedPageIds.value)
  }

  return {
    allPages,
    accessiblePages,
    isPageAccessible,
    unlockAllPages,
    unlockNextPage,
  }
}
