<script setup lang="ts">
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'
import { publicAsset } from '../../utils/publicPath'

defineProps<{
  page: ArtbookPage
}>()

const romyVideo = publicAsset('videos/romyVideo.mp4')
</script>

<template>
  <!-- Romy utilise le même lecteur vidéo que Le Flou, avec contrôle par molette. -->
  <ArtbookVideoPage :image="page.pageImage" :name="page.name" :video-src="romyVideo" />
</template>
