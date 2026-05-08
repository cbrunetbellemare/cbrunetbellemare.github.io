<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// La magie utilise le slider pour permettre un crossfade continu entre les versions.
const imageVersions = [
  {
    label: 'Croquis',
    image: '/images/pages/magieSketch.jpg',
  },
  {
    label: 'Couleur',
    image: '/images/pages/magieColor.jpg',
  },
  {
    label: 'Final',
    image: '/images/pages/magie.jpg',
  },
] satisfies [ImageVersion, ...ImageVersion[]]
</script>

<template>
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    controls="slider"
    aria-label="Versions de l'illustration La magie"
  />
</template>
