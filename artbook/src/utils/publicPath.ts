// Ce helper centralise les chemins vers les fichiers places dans public/.
// Il permet au site de fonctionner autant en local qu'une fois publie sous /firaluna/ sur GitHub Pages.
export function publicAsset(path: string) {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  return `${baseUrl}${normalizedPath}`
}
