import { ref } from 'vue'

const currentPath = ref(normalizePath(window.location.pathname))

window.addEventListener('popstate', () => {
  currentPath.value = normalizePath(window.location.pathname)
})

function normalizePath(path: string) {
  return path === '/' ? '/pages/foreword' : path
}

export function useSimpleRouter() {
  function navigateTo(path: string, replace = false) {
    if (currentPath.value === path) {
      return
    }

    const historyMethod = replace ? 'replaceState' : 'pushState'
    window.history[historyMethod]({}, '', path)
    currentPath.value = path
  }

  return {
    currentPath,
    navigateTo,
  }
}
