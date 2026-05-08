<script setup lang="ts">
// Page La magie: affiche les versions avec un slider de transition.
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

// Les trois images montrées pour cette illustration.
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
  <!-- Slider: comparer les étapes en fondu. -->
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    controls="slider"
    aria-label="Versions de l'illustration La magie"
  />
</template>
