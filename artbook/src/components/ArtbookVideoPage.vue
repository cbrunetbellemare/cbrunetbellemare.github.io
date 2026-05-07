<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { useArtbookZoomReset } from '../composables/useArtbookZoomReset'
import { Icons } from '../icons'
import VideoReplayMenu from './VideoReplayMenu.vue'
import VideoScrubMenu from './VideoScrubMenu.vue'

const props = withDefaults(
  defineProps<{
    image: string
    name: string
    videoSrc: string
    closeButtonRight?: string
    closeButtonTop?: string
  }>(),
  {
    closeButtonRight: 'clamp(10px, 1.1vh, 16px)',
    closeButtonTop: 'clamp(10px, 1.1vh, 16px)',
  },
)

const hasVideoEnded = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)
const videoAspectRatio = ref('4 / 5')
const resetArtbookZoom = useArtbookZoomReset()
const isReplayingVideo = ref(false)

const progressPercent = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

const closeButtonStyle = computed(() => {
  return {
    right: props.closeButtonRight,
    top: props.closeButtonTop,
  }
})

onMounted(() => {
  void resetArtbookZoom?.({ smooth: true })
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

  if (videoElement.value.videoWidth > 0 && videoElement.value.videoHeight > 0) {
    videoAspectRatio.value = `${videoElement.value.videoWidth} / ${videoElement.value.videoHeight}`
  }

  duration.value = videoElement.value.duration
  currentTime.value = videoElement.value.currentTime
}

async function replayVideo() {
  if (isReplayingVideo.value) {
    return
  }

  isReplayingVideo.value = true
  await resetArtbookZoom?.({ smooth: true })
  hasVideoEnded.value = false
  currentTime.value = 0
  isReplayingVideo.value = false
}

function closeVideo() {
  hasVideoEnded.value = true
}
</script>

<template>
  <article class="artbook-video-page" :data-video-ended="hasVideoEnded">
    <img class="page-image" :src="image" :alt="name" />

    <div v-if="!hasVideoEnded" class="video-layer" @wheel.stop="scrubVideo">
      <div class="video-shell" :style="{ aspectRatio: videoAspectRatio }">
        <div class="video-frame">
          <video
            ref="videoElement"
            class="intro-video"
            :src="videoSrc"
            muted
            playsinline
            preload="auto"
            @loadedmetadata="updateVideoMetadata"
            @timeupdate="updateVideoMetadata"
            @ended="hasVideoEnded = true"
          />

          <button
            class="close-video-button"
            type="button"
            aria-label="Fermer la video"
            title="Fermer la video"
            :style="closeButtonStyle"
            @click.stop="closeVideo"
          >
            <SvgIcon class="close-video-icon" type="mdi" :path="Icons.Close" :size="20" aria-hidden="true" />
          </button>
        </div>

        <div class="video-timeline" aria-label="Progression de la video">
          <div class="video-timeline-track">
            <div class="video-timeline-progress" :style="{ width: `${progressPercent}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <VideoScrubMenu v-if="!hasVideoEnded" @scrub="scrubVideo" />

    <VideoReplayMenu v-else @replay="replayVideo" />
  </article>
</template>

<style scoped>
.artbook-video-page {
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

.artbook-video-page:not([data-video-ended='true']) .page-image {
  filter: blur(16px);
  transform: scale(1.04);
}

.video-layer {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
}

.video-shell {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: clamp(8px, 1vh, 14px);
  height: min(82%, calc(100% - 44px));
  max-width: calc(100% - 56px);
  aspect-ratio: 4 / 5;
  transform: translate(-50%, -50%);
}

.video-frame {
  position: relative;
  min-height: 0;
  overflow: hidden;
  background: transparent;
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

.close-video-button {
  position: absolute;
  right: clamp(10px, 1.1vh, 16px);
  top: clamp(10px, 1.1vh, 16px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(30px, 3vh, 46px);
  height: clamp(30px, 3vh, 46px);
  border: 1px solid rgba(var(--artbook-gold-bright-rgb), 0.62);
  background: rgba(0, 0, 0, 0.55);
  color: var(--artbook-gold);
  cursor: pointer;
  padding: 0;
}

.close-video-button:hover,
.close-video-button:focus-visible {
  background: rgba(0, 0, 0, 0.75);
  outline: none;
}

.close-video-icon {
  width: clamp(17px, 1.85vh, 28px);
  height: clamp(17px, 1.85vh, 28px);
}

.video-timeline {
  width: 100%;
}

.video-timeline-track {
  height: clamp(5px, 0.66vh, 10px);
  overflow: hidden;
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.32);
  background: var(--artbook-menu-item-bg);
}

.video-timeline-progress {
  height: 100%;
  background: var(--artbook-gold-progress);
}
</style>
