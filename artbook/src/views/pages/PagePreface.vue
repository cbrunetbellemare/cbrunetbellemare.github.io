<script setup lang="ts">
// Page Préface: démarre sur l'image, puis lance la vidéo après action utilisateur.
// Comme un tutoriel, utilisateur doit ouvrir lui-même la vidéo pour mieux comprendre
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
// Vidéo gardée ici pour que la page contrôle son propre média.
const prefaceVideo = '/videos/prefaceVideo.mp4'

async function startVideo() {
  // Lance la vidéo seulement après le clic.
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
  <!-- Après le clic, affiche le lecteur vidéo. -->
  <ArtbookVideoPage
    v-if="hasStartedVideo"
    :image="page.pageImage"
    :name="page.name"
    :video-src="prefaceVideo"
    video-control-mode="hover"
    close-button-right="clamp(18px, 2.2vh, 32px)"
    close-button-top="clamp(18px, 2.2vh, 32px)"
  />

  <template v-else>
    <!-- Avant le clic, affiche juste l'image. -->
    <ArtbookImagePage :image="page.pageImage" :name="page.name" />
    <VideoReplayMenu @replay="startVideo" />
  </template>
</template>
