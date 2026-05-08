import { ref } from 'vue'

const basePath = normalizeBasePath(import.meta.env.BASE_URL)
const basePathWithoutTrailingSlash = basePath.replace(/\/$/, '')

const currentPath = ref(normalizePath(stripBasePath(window.location.pathname)))

window.addEventListener('popstate', () => {
  currentPath.value = normalizePath(stripBasePath(window.location.pathname))
})

function normalizePath(path: string) {
  return path === '/' ? '/pages/foreword' : path
}

function normalizeBasePath(path: string) {
  if (!path || path === './') {
    return '/'
  }

  const pathWithLeadingSlash = path.startsWith('/') ? path : `/${path}`

  return pathWithLeadingSlash.endsWith('/') ? pathWithLeadingSlash : `${pathWithLeadingSlash}/`
}

function stripBasePath(path: string) {
  // GitHub Pages ajoute /firaluna/ devant l'URL publique, mais le routeur garde des routes internes simples.
  if (basePath === '/') {
    return path
  }

  if (path === basePathWithoutTrailingSlash || path === basePath) {
    return '/'
  }

  if (path.startsWith(basePath)) {
    return `/${path.slice(basePath.length)}`
  }

  return path
}

function toBrowserPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (basePath === '/') {
    return normalizedPath
  }

  return `${basePathWithoutTrailingSlash}${normalizedPath}`
}

export function useSimpleRouter() {
  function navigateTo(path: string, replace = false) {
    if (currentPath.value === path) {
      return
    }

    const historyMethod = replace ? 'replaceState' : 'pushState'
    window.history[historyMethod]({}, '', toBrowserPath(path))
    currentPath.value = path
  }

  return {
    currentPath,
    navigateTo,
  }
}
