<script setup lang="ts">
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()
</script>

<template>
  <!-- Romy utilise le même lecteur vidéo que Le Flou, avec contrôle par molette. -->
  <ArtbookVideoPage :image="page.pageImage" :name="page.name" video-src="/videos/romyVideo.mp4" />
</template>
