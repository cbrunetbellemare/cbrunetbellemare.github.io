<script setup lang="ts">
// Page Romy: illustration avec vidéo contrôlée par scroll de la souris.
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

const romyVideo = '/videos/romyVideo.mp4'
</script>

<template>
  <!-- Romy utilise le même lecteur vidéo que Le Flou, avec contrôle par scroll. -->
  <ArtbookVideoPage :image="page.pageImage" :name="page.name" :video-src="romyVideo" />
</template>
