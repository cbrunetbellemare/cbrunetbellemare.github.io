<script setup lang="ts">
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()
</script>

<template>
  <!-- Le Flou conserve le contrôle vidéo classique par molette. -->
  <ArtbookVideoPage :image="page.pageImage" :name="page.name" video-src="/videos/flouVideo.mp4" />
</template>
