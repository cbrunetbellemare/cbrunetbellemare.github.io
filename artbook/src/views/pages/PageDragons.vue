<script setup lang="ts">
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()
</script>

<template>
  <!-- Les dragons utilisent le mode vidéo alternatif: le survol horizontal contrôle le temps de la vidéo. -->
  <ArtbookVideoPage
    :image="page.pageImage"
    :name="page.name"
    video-src="/videos/dragonsVideo.mp4"
    video-control-mode="hover"
  />
</template>
