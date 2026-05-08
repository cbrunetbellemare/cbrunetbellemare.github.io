<script setup lang="ts">
import ArtbookImageVersionPage from '../../components/ArtbookImageVersionPage.vue'
import type { ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'
import { publicAsset } from '../../utils/publicPath'

defineProps<{
  page: ArtbookPage
}>()

// Les étapes suivent le processus de création: croquis, mise en couleur, puis image finale.
// Cette page conserve le menu à boutons pour varier l'expérience selon les illustrations.
const imageVersions = [
  {
    label: 'Croquis',
    image: publicAsset('images/pages/merafleursSketch.png'),
  },
  {
    label: 'Couleur',
    image: publicAsset('images/pages/merafleursColor.png'),
  },
  {
    label: 'Final',
    image: publicAsset('images/pages/merafleur.png'),
  },
] satisfies [ImageVersion, ...ImageVersion[]]
</script>

<template>
  <ArtbookImageVersionPage
    :page-name="page.name"
    :versions="imageVersions"
    aria-label="Versions de l'illustration Les Mérafleurs"
  />
</template>
