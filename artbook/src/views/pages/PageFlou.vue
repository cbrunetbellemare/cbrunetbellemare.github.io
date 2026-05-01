<script setup lang="ts">
import { ref } from 'vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

const hasVideoEnded = ref(false)
</script>

<template>
  <article class="flou-page" :data-video-ended="hasVideoEnded">
    <img class="page-image" :src="page.pageImage" :alt="page.name" />

    <div v-if="!hasVideoEnded" class="video-layer">
      <div class="video-frame">
        <video
          class="intro-video"
          src="/videos/flouVideo.mp4"
          autoplay
          muted
          playsinline
          @ended="hasVideoEnded = true"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
.flou-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0b0a09;
}

.page-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    filter 700ms ease,
    transform 700ms ease;
}

.flou-page:not([data-video-ended='true']) .page-image {
  filter: blur(16px);
  transform: scale(1.04);
}

.video-layer {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
}

.video-frame {
  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  height: min(82%, calc(100% - 44px));
  max-width: calc(100% - 56px);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: transparent;
  transform: translate(-50%, -50%);
}

.intro-video {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  background: transparent;
}
</style>
