<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()

const hasVideoEnded = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)

const progressPercent = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

function scrubVideo(event: WheelEvent) {
  if (hasVideoEnded.value || !videoElement.value || !Number.isFinite(videoElement.value.duration)) {
    return
  }

  event.preventDefault()

  const scrubSpeed = 0.004
  const nextTime = videoElement.value.currentTime - event.deltaY * scrubSpeed
  videoElement.value.currentTime = Math.min(Math.max(nextTime, 0), videoElement.value.duration)
  currentTime.value = videoElement.value.currentTime

  if (videoElement.value.currentTime >= videoElement.value.duration - 0.05) {
    hasVideoEnded.value = true
  }
}

function updateVideoMetadata() {
  if (!videoElement.value) {
    return
  }

  duration.value = videoElement.value.duration
  currentTime.value = videoElement.value.currentTime
}

function replayVideo() {
  hasVideoEnded.value = false
  currentTime.value = 0
}
</script>

<template>
  <article class="flou-page" :data-video-ended="hasVideoEnded">
    <img class="page-image" :src="page.pageImage" :alt="page.name" />

    <div v-if="!hasVideoEnded" class="video-layer" @wheel.stop="scrubVideo">
      <div class="video-frame">
        <video
          ref="videoElement"
          class="intro-video"
          src="/videos/flouVideo.mp4"
          muted
          playsinline
          preload="auto"
          @loadedmetadata="updateVideoMetadata"
          @timeupdate="updateVideoMetadata"
          @ended="hasVideoEnded = true"
        />
      </div>

      <div class="timeline" aria-label="Video progress">
        <div class="timeline-track">
          <div class="timeline-progress" :style="{ width: `${progressPercent}%` }"></div>
        </div>
      </div>
    </div>

    <button v-else class="replay-button" type="button" aria-label="Replay video" @click="replayVideo">
      <span aria-hidden="true"></span>
    </button>
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

.timeline {
  position: absolute;
  left: 50%;
  bottom: clamp(16px, 4%, 32px);
  width: min(58%, 560px);
  transform: translateX(-50%);
}

.timeline-track {
  height: 6px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
}

.timeline-progress {
  height: 100%;
  background: #f2c96b;
}

.replay-button {
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  cursor: pointer;
  display: grid;
  place-items: center;
}

.replay-button:hover,
.replay-button:focus-visible {
  background: rgba(0, 0, 0, 0.75);
  outline: none;
}

.replay-button span {
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 14px solid #fff9ef;
  margin-left: 3px;
}
</style>
