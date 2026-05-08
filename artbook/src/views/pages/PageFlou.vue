<script setup lang="ts">
// Page Le Flou: illustration avec vidéo contrôlée par scroll de la souris.
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

const flouVideo = '/videos/flouVideo.mp4'
</script>

<template>
  <!-- Vidéo contrôlée par scroll. -->
  <ArtbookVideoPage :image="page.pageImage" :name="page.name" :video-src="flouVideo" />
</template>
