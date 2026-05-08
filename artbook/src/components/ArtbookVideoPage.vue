<script setup lang="ts">
// Page vidéo interactive: image de fond, vidéo superposée et contrôle du temps.
import { computed, onMounted, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { useArtbookZoomReset } from '../composables/useArtbookZoomReset'
import { Icons } from '../icons'
import VideoReplayMenu from './VideoReplayMenu.vue'
import VideoScrubMenu from './VideoScrubMenu.vue'

type VideoControlMode = 'wheel' | 'hover'

const props = withDefaults(
  defineProps<{
    image: string
    name: string
    videoSrc: string
    videoControlMode?: VideoControlMode
    closeButtonRight?: string
    closeButtonTop?: string
  }>(),
  {
    videoControlMode: 'wheel',
    closeButtonRight: 'clamp(10px, 1.1vh, 16px)',
    closeButtonTop: 'clamp(10px, 1.1vh, 16px)',
  },
)

// Dit si la vidéo est cachée ou non.
const isVideoClosed = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)
const videoAspectRatio = ref('4 / 5')
const resetArtbookZoom = useArtbookZoomReset()
const isReplayingVideo = ref(false)
const isHoverControlMode = computed(() => props.videoControlMode === 'hover')

// Pour remplir la barre de progression.
const progressPercent = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

const videoInstruction = computed(() => {
  // Texte différent selon la mécanique de contrôle choisie par la page.
  return isHoverControlMode.value
    ? 'Survole la vidéo de gauche à droite pour avancer ou reculer'
    : 'Utilise la molette de la souris pour avancer et reculer la vidéo'
})

const closeButtonStyle = computed(() => {
  return {
    right: props.closeButtonRight,
    top: props.closeButtonTop,
  }
})

onMounted(() => {
  // Une vidéo ouverte doit commencer avec la page non zoomée.
  void resetArtbookZoom?.({ smooth: true })
})

function scrubVideo(event: WheelEvent) {
  // Avec la molette, on avance ou recule la vidéo.
  if (
    isHoverControlMode.value ||
    isVideoClosed.value ||
    !videoElement.value ||
    !Number.isFinite(videoElement.value.duration)
  ) {
    return
  }

  event.preventDefault()

  const scrubSpeed = 0.004
  setVideoTime(videoElement.value.currentTime - event.deltaY * scrubSpeed)
}

function scrubVideoWithHover(event: MouseEvent) {
  // Avec la souris, gauche = début et droite = fin.
  if (
    !isHoverControlMode.value ||
    isVideoClosed.value ||
    !videoElement.value ||
    !Number.isFinite(videoElement.value.duration)
  ) {
    return
  }

  const videoFrame = event.currentTarget as HTMLElement
  const bounds = videoFrame.getBoundingClientRect()
  const pointerProgress = clamp((event.clientX - bounds.left) / bounds.width, 0, 1)

  setVideoTime(videoElement.value.duration * pointerProgress)
}

function setVideoTime(nextTime: number) {
  if (!videoElement.value || !Number.isFinite(videoElement.value.duration)) {
    return 0
  }

  // Clamp requis: currentTime lance une erreur si la valeur sort de la durée.
  videoElement.value.currentTime = clamp(nextTime, 0, videoElement.value.duration)
  currentTime.value = videoElement.value.currentTime

  return currentTime.value
}

function updateVideoMetadata() {
  if (!videoElement.value) {
    return
  }

  if (videoElement.value.videoWidth > 0 && videoElement.value.videoHeight > 0) {
    // Garde le vrai format de la vidéo.
    videoAspectRatio.value = `${videoElement.value.videoWidth} / ${videoElement.value.videoHeight}`
  }

  duration.value = videoElement.value.duration
  currentTime.value = videoElement.value.currentTime
}

async function replayVideo() {
  if (isReplayingVideo.value) {
    return
  }

  // Verrou temporaire pour éviter deux resets en même temps.
  isReplayingVideo.value = true
  await resetArtbookZoom?.({ smooth: true })
  isVideoClosed.value = false
  currentTime.value = 0
  isReplayingVideo.value = false
}

function closeVideo() {
  // Cache la vidéo quand on clique sur X.
  isVideoClosed.value = true
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
</script>

<template>
  <article class="artbook-video-page" :data-video-closed="isVideoClosed">
    <img class="page-image" :src="image" :alt="name" />

    <div v-if="!isVideoClosed" class="video-layer" @wheel.stop="scrubVideo">
      <div class="video-shell" :style="{ aspectRatio: videoAspectRatio }">
        <div
          class="video-frame"
          :class="{ 'video-frame--hover-scrub': isHoverControlMode }"
          @mousemove="scrubVideoWithHover"
        >
          <video
            ref="videoElement"
            class="intro-video"
            :src="videoSrc"
            muted
            playsinline
            preload="auto"
            @loadedmetadata="updateVideoMetadata"
            @timeupdate="updateVideoMetadata"
            @ended="updateVideoMetadata"
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

    <VideoScrubMenu
      v-if="!isVideoClosed"
      :instruction="videoInstruction"
      :wheel-enabled="!isHoverControlMode"
      @scrub="scrubVideo"
    />

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

.artbook-video-page:not([data-video-closed='true']) .page-image {
  filter: blur(16px);
  transform: scale(1.04);
}

.video-layer {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
}

.video-shell {
  --video-timeline-gap: clamp(8px, 1vh, 14px);
  --video-timeline-height: clamp(5px, 0.66vh, 10px);

  position: absolute;
  left: 50%;
  top: 50%;
  height: min(
    calc(82% - var(--video-timeline-gap) - var(--video-timeline-height)),
    calc(100% - 44px - var(--video-timeline-gap) - var(--video-timeline-height))
  );
  max-width: calc(100% - 56px);
  aspect-ratio: 4 / 5;
  transform: translate(-50%, -50%);
}

.video-frame {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: transparent;
}

.video-frame--hover-scrub {
  cursor: ew-resize;
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
  position: absolute;
  top: calc(100% + var(--video-timeline-gap));
  left: 0;
  width: 100%;
}

.video-timeline-track {
  height: var(--video-timeline-height);
  overflow: hidden;
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.32);
  background: var(--artbook-menu-item-bg);
}

.video-timeline-progress {
  height: 100%;
  background: var(--artbook-gold-progress);
}
</style>
