// Petit raccourci pour aller chercher les images, vidéos et sons dans public/.
export function publicAsset(path: string) {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  return `${baseUrl}${normalizedPath}`
}
