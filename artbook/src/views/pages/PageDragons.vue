<script setup lang="ts">
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'
import { publicAsset } from '../../utils/publicPath'

defineProps<{
  page: ArtbookPage
}>()

const dragonsVideo = publicAsset('videos/dragonsVideo.mp4')
</script>

<template>
  <!-- Les dragons utilisent le mode vidéo alternatif: le survol horizontal contrôle le temps de la vidéo. -->
  <ArtbookVideoPage
    :image="page.pageImage"
    :name="page.name"
    :video-src="dragonsVideo"
    video-control-mode="hover"
  />
</template>
