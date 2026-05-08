// Petit routeur maison: suffisant pour cet artbook sans installer Vue Router.
import { ref } from 'vue'

const currentPath = ref(normalizePath(window.location.pathname))

window.addEventListener('popstate', () => {
  // Boutons précédent/suivant du navigateur.
  currentPath.value = normalizePath(window.location.pathname)
})

function normalizePath(path: string) {
  // Si on arrive sur l'accueil, on montre la première page.
  return path === '/' ? '/foreword' : path
}

function toBrowserPath(path: string) {
  // Le navigateur a besoin d'un slash au début de l'adresse.
  return path.startsWith('/') ? path : `/${path}`
}

export function useSimpleRouter() {
  function navigateTo(path: string, replace = false) {
    if (currentPath.value === path) {
      return
    }

    // replace évite d'empiler les redirections automatiques dans l'historique.
    const historyMethod = replace ? 'replaceState' : 'pushState'
    window.history[historyMethod]({}, '', toBrowserPath(path))
    // On garde aussi la route dans Vue pour changer la page affichée.
    currentPath.value = path
  }

  return {
    currentPath,
    navigateTo,
  }
}
