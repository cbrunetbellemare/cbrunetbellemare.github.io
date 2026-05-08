<script setup lang="ts">
import { ref } from 'vue'
import ArtbookImagePage from '../../components/ArtbookImagePage.vue'
import ArtbookVideoPage from '../../components/ArtbookVideoPage.vue'
import VideoReplayMenu from '../../components/VideoReplayMenu.vue'
import { useArtbookZoomReset } from '../../composables/useArtbookZoomReset'
import type { ArtbookPage } from '../../data/artbookPages'
import { publicAsset } from '../../utils/publicPath'

defineProps<{
  page: ArtbookPage
}>()

const hasStartedVideo = ref(false)
const isStartingVideo = ref(false)
const resetArtbookZoom = useArtbookZoomReset()
const prefaceVideo = publicAsset('videos/prefaceVideo.mp4')

async function startVideo() {
  // La préface commence par l'image; la vidéo se lance seulement quand l'utilisateur le demande.
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
  <!-- Après le premier lancement, la page utilise le lecteur vidéo complet. -->
  <ArtbookVideoPage
    v-if="hasStartedVideo"
    :image="page.pageImage"
    :name="page.name"
    :video-src="prefaceVideo"
    close-button-right="clamp(18px, 2.2vh, 32px)"
    close-button-top="clamp(18px, 2.2vh, 32px)"
  />

  <template v-else>
    <!-- État initial: illustration fixe avec un bouton "Voir la vidéo" dans les contrôles. -->
    <ArtbookImagePage :image="page.pageImage" :name="page.name" />
    <VideoReplayMenu @replay="startVideo" />
  </template>
</template>
