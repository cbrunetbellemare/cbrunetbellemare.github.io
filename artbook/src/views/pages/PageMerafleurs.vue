<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// Cette page conserve le menu à boutons pour varier l'expérience selon les illustrations.
const imageVersions = [
  {
    label: 'Croquis',
    image: '/images/pages/merafleursSketch.png',
  },
  {
    label: 'Couleur',
    image: '/images/pages/merafleursColor.png',
  },
  {
    label: 'Final',
    image: '/images/pages/merafleur.png',
  },
] satisfies [ImageVersion, ...ImageVersion[]]
</script>

<template>
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    aria-label="Versions de l'illustration Les Mérafleurs"
  />
</template>
