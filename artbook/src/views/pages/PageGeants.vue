<script setup lang="ts">
// Page Les géants: affiche les étapes croquis, couleur et final.
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
  <!-- Boutons: trois étapes -->
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    aria-label="Versions de l'illustration Les géants"
  />
</template>
