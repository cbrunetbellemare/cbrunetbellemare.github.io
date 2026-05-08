<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'
import { publicAsset } from '../../utils/publicPath'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// La magie utilise le slider pour permettre un crossfade continu entre les versions.
const imageVersions = [
  {
    label: 'Croquis',
    image: publicAsset('images/pages/magieSketch.jpg'),
  },
  {
    label: 'Couleur',
    image: publicAsset('images/pages/magieColor.jpg'),
  },
  {
    label: 'Final',
    image: publicAsset('images/pages/magie.jpg'),
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
