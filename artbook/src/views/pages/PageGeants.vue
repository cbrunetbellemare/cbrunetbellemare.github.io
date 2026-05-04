<script setup lang="ts">
import { computed, ref } from 'vue'
import ImageVersionMenu, { type ImageVersion } from '../../components/ImageVersionMenu.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

const imageIndex = ref(0)
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

const fallbackImage = imageVersions[0]
const activeImage = computed<ImageVersion>(() => imageVersions[imageIndex.value] ?? fallbackImage)
</script>

<template>
  <article class="geants-page">
    <img class="page-image" :src="activeImage.image" :alt="`${page.name} - ${activeImage.label}`" />

    <ImageVersionMenu
      :versions="imageVersions"
      :active-index="imageIndex"
      aria-label="Versions de l'illustration Les Géants"
      @select="imageIndex = $event"
    />
  </article>
</template>

<style scoped>
.geants-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #11100e;
}

.page-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 240ms ease;
}
</style>
