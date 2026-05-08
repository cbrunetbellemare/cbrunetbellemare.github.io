<script setup lang="ts">
// Page Les Mérafleurs: affiche les trois étapes de l'image.
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
    image: '/images/pages/merafleurSketch.jpg',
  },
  {
    label: 'Couleur',
    image: '/images/pages/merafleurColor.jpg',
  },
  {
    label: 'Final',
    image: '/images/pages/merafleurs.jpg',
  },
] satisfies [ImageVersion, ...ImageVersion[]]
</script>

<template>
  <!-- Boutons: trois versions. -->
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    aria-label="Versions de l'illustration Les Mérafleurs"
  />
</template>
