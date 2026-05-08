<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// Cette page conserve le menu à boutons pour montrer une navigation par étapes distinctes.
const imageVersions = [
  {
    label: 'Croquis',
    image: '/images/pages/geantsSketch.jpg',
  },
  {
    label: 'Couleur',
    image: '/images/pages/geantsColor.jpg',
  },
  {
    label: 'Final',
    image: '/images/pages/geants.jpg',
  },
] satisfies [ImageVersion, ...ImageVersion[]]
</script>

<template>
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    aria-label="Versions de l'illustration Les géants"
  />
</template>
