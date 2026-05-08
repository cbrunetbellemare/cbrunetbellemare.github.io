<script setup lang="ts">
// Page Les dragons: vidéo contrôlée par position horizontale de la souris.
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

const dragonsVideo = '/videos/dragonsVideo.mp4'
</script>

<template>
  <!-- Les dragons utilisent le mode vidéo hover: le survol horizontal contrôle le temps de la vidéo. -->
  <ArtbookVideoPage
    :image="page.pageImage"
    :name="page.name"
    :video-src="dragonsVideo"
    video-control-mode="hover"
  />
</template>
