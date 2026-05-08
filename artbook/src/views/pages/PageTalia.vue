<script setup lang="ts">
// Page Talia: compare les versions de l'illustration avec des boutons.
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
  <!-- Boutons: trois versions. -->
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    aria-label="Versions de l'illustration Talia"
  />
</template>
