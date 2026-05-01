import { computed, ref } from 'vue'
import { artbookPages, findArtbookPageById, firstArtbookPage } from '../data/artbookPages'

const unlockedStorageKey = 'artbook.unlockedPages'

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
  return ids.filter((pageId) => pageId !== firstArtbookPage.id && Boolean(findArtbookPageById(pageId)))
}

export function useUnlockedPages() {
  const accessiblePages = computed(() => {
    return artbookPages.filter((page) => page.id === firstArtbookPage.id || unlockedPageIds.value.includes(page.id))
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

    if (currentPage?.nextPageId) {
      unlockPage(currentPage.nextPageId)
    }
  }

  return {
    accessiblePages,
    isPageAccessible,
    unlockNextPage,
  }
}
