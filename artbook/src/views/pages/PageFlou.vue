<script setup lang="ts">
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import type { ArtbookPage } from '../../data/artbookPages'
import { publicAsset } from '../../utils/publicPath'

defineProps<{
  page: ArtbookPage
}>()

const flouVideo = publicAsset('videos/flouVideo.mp4')
</script>

<template>
  <!-- Le Flou conserve le contrôle vidéo classique par molette. -->
  <ArtbookVideoPage :image="page.pageImage" :name="page.name" :video-src="flouVideo" />
</template>
