<script setup lang="ts">
// Page Alinora: compare les versions avec transition slider.
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
    image: '/images/pages/alinoraSketch.jpg',
  },
  {
    label: 'Couleur',
    image: '/images/pages/alinoraColor.jpg',
  },
  {
    label: 'Final',
    image: '/images/pages/alinora.jpg',
  },
] satisfies [ImageVersion, ...ImageVersion[]]
</script>

<template>
  <!-- Slider: permet de voir l'évolution sans coupure nette. -->
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    controls="slider"
    aria-label="Versions de l'illustration Alinora"
  />
</template>
