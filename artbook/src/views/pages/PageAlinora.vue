<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// Alinora utilise le slider pour comparer progressivement les étapes de l'illustration.
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
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    controls="slider"
    aria-label="Versions de l'illustration Alinora"
  />
</template>
