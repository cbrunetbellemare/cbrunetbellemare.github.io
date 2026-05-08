// Gestion des pages débloquées: état partagé et persistance dans localStorage.
import { computed, ref } from 'vue'
import { artbookPages, findArtbookPageById, firstArtbookPage } from '../data/artbookPages'

// Sert à garder les pages débloquées dans le navigateur.
const unlockedStorageKey = 'artbook.unlockedPages.v2'

const unlockedPageIds = ref<string[]>(normalizeStoredIds(readStoredIds(unlockedStorageKey)))

// Lit les IDs sauvegardées dans localStorage avec contrôle de validité
function readStoredIds(key: string) {
  const storedValue = window.localStorage.getItem(key)

  if (!storedValue) {
    return []
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue)
    // localStorage pas toujours fiable: on garde seulement un tableau de strings.
    return Array.isArray(parsedValue) && parsedValue.every((item) => typeof item === 'string')
      ? parsedValue
      : []
  } catch {
    return []
  }
}

// Sauvegarde les IDs débloquées dans localStorage
function persistIds(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify(ids))
}

// Ajoute une page aux IDs sans créer de doublons
function addStoredId(ids: string[], pageId: string) {
  // Évite les doublons dans la sauvegarde.
  return ids.includes(pageId) ? ids : [...ids, pageId]
}

// Filtre les IDs: enlève la première page et les pages invalides
function normalizeStoredIds(ids: string[]) {
  // La première page est déjà ouverte au départ.
  return ids.filter(
    (pageId) => pageId !== firstArtbookPage.id && Boolean(findArtbookPageById(pageId)),
  )
}

export function useUnlockedPages() {
  // Liste toutes les pages (pour affichage)
  const allPages = computed(() => artbookPages)
  // Liste les pages accessibles à l'utilisateur (débloquées)
  const accessiblePages = computed(() => {
    return artbookPages.filter((page) => isPageAccessible(page.id))
  })

  // Vérifie si une page est accessible (débloquée ou première page)
  function isPageAccessible(pageId: string) {
    return pageId === firstArtbookPage.id || unlockedPageIds.value.includes(pageId)
  }

  // Déverrouille une page et la sauvegarde
  function unlockPage(pageId: string) {
    if (pageId === firstArtbookPage.id || !findArtbookPageById(pageId)) {
      return
    }

    // Un seul point d'écriture pour garder Vue et localStorage synchronisés.
    unlockedPageIds.value = addStoredId(unlockedPageIds.value, pageId)
    persistIds(unlockedStorageKey, unlockedPageIds.value)
  }

  // Déverrouille la page suivante automatiquement quand une page est lue
  function unlockNextPage(currentPageId: string) {
    const currentPage = findArtbookPageById(currentPageId)

    // Quand une page est lue, on ouvre la suivante.
    if (currentPage?.nextPageId) {
      unlockPage(currentPage.nextPageId)
    }
  }

  // Déverrouille toutes les pages
  function unlockAllPages() {
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
