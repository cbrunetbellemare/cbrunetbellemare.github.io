import { computed, ref } from 'vue'
import { artbookPages, findArtbookPageById, firstArtbookPage } from '../data/artbookPages'

// Sert à garder les pages débloquées dans le navigateur.
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
  // La première page est déjà ouverte au départ.
  return ids.filter((pageId) => pageId !== firstArtbookPage.id && Boolean(findArtbookPageById(pageId)))
}

export function useUnlockedPages() {
  // Le menu voit toutes les pages, mais pas toutes cliquables.
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

    // Quand une page est lue, on ouvre la suivante.
    if (currentPage?.nextPageId) {
      unlockPage(currentPage.nextPageId)
    }
  }

  function unlockAllPages() {
    // Bouton pour tout débloquer.
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
