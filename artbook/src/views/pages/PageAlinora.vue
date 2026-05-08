<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'
import { publicAsset } from '../../utils/publicPath'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// Alinora utilise le slider pour comparer progressivement les étapes de l'illustration.
const imageVersions = [
  {
    label: 'Croquis',
    image: publicAsset('images/pages/alinoraSketch.jpg'),
  },
  {
    label: 'Couleur',
    image: publicAsset('images/pages/alinoraColor.jpg'),
  },
  {
    label: 'Final',
    image: publicAsset('images/pages/alinora.jpg'),
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
