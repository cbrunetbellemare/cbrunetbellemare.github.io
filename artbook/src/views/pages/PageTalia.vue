<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// Sans propriété "controls", le composant partagé utilise le menu à boutons par défaut.
const imageVersions = [
  {
    label: 'Croquis',
    image: '/images/pages/taliaSketch.jpg',
  },
  {
    label: 'Couleur',
    image: '/images/pages/taliaColor.jpg',
  },
  {
    label: 'Final',
    image: '/images/pages/talia.jpg',
  },
] satisfies [ImageVersion, ...ImageVersion[]]
</script>

<template>
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    aria-label="Versions de l'illustration Talia"
  />
</template>
