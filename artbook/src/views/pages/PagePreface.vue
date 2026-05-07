<script setup lang="ts">
import { ref } from 'vue'
import ArtbookImagePage from '../../components/ArtbookImagePage.vue'
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import VideoReplayMenu from '../../components/VideoReplayMenu.vue'
import { useArtbookZoomReset } from '../../composables/useArtbookZoomReset'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

const hasStartedVideo = ref(false)
const isStartingVideo = ref(false)
const resetArtbookZoom = useArtbookZoomReset()

async function startVideo() {
  if (hasStartedVideo.value || isStartingVideo.value) {
    return
  }

  isStartingVideo.value = true
  await resetArtbookZoom?.({ smooth: true })
  hasStartedVideo.value = true
  isStartingVideo.value = false
}
</script>

<template>
  <ArtbookVideoPage
    v-if="hasStartedVideo"
    :image="page.pageImage"
    :name="page.name"
    video-src="/videos/prefaceVideo.mp4"
    close-button-right="clamp(18px, 2.2vh, 32px)"
    close-button-top="clamp(18px, 2.2vh, 32px)"
  />

  <template v-else>
    <ArtbookImagePage :image="page.pageImage" :name="page.name" />
    <VideoReplayMenu @replay="startVideo" />
  </template>
</template>
