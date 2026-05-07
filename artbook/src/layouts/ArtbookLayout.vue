<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import VueZoomable from 'vue-zoomable'
import 'vue-zoomable/dist/style.css'
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { artbookPages, type ArtbookPage } from '../data/artbookPages'
import ArtbookTopControls from '../components/ArtbookTopControls.vue'
import { artbookZoomResetKey } from '../composables/useArtbookZoomReset'
import { useSimpleRouter } from '../composables/useSimpleRouter'
import { Icons } from '../icons'

interface ZoomPan {
  x: number
  y: number
}

const props = defineProps<{
  page: ArtbookPage
}>()

const { navigateTo } = useSimpleRouter()
provide(artbookZoomResetKey, resetZoomFromChild)

const minZoomLevel = 1
const maxZoomLevel = 2.6
const zoomStep = 0.12
const smoothResetDuration = 320

const pageElement = ref<HTMLElement | null>(null)
const isPagesMenuOpen = ref(false)
const zoomLevel = ref(minZoomLevel)
const zoomPan = ref(createDefaultPan())
let smoothResetFrame: number | undefined
let smoothResetResolve: (() => void) | undefined

const isZoomed = computed(() => zoomLevel.value > minZoomLevel)
const currentPageIndex = computed(() => artbookPages.findIndex((candidate) => candidate.id === props.page.id))
const previousPage = computed(() =>
  currentPageIndex.value > 0 ? artbookPages[currentPageIndex.value - 1] : undefined,
)
const nextPage = computed(() =>
  currentPageIndex.value >= 0 && currentPageIndex.value < artbookPages.length - 1
    ? artbookPages[currentPageIndex.value + 1]
    : undefined,
)

watch(
  () => props.page.id,
  () => {
    resetZoom()
  },
)

watch(
  [zoomLevel, () => zoomPan.value.x, () => zoomPan.value.y],
  ([nextZoomLevel]) => {
    if (nextZoomLevel <= minZoomLevel && (nextZoomLevel !== minZoomLevel || hasPanOffset(zoomPan.value))) {
      resetZoom()
      return
    }

    constrainZoomPan()
  },
  { flush: 'sync' },
)

onMounted(() => {
  window.addEventListener('resize', constrainZoomPan)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', constrainZoomPan)
  cancelSmoothReset()
})

function resetZoom() {
  cancelSmoothReset()
  zoomLevel.value = minZoomLevel
  zoomPan.value = createDefaultPan()
}

async function resetZoomFromChild(options?: { smooth?: boolean }) {
  if (options?.smooth) {
    await resetZoomSmooth()
    return
  }

  resetZoom()
}

function resetZoomSmooth() {
  cancelSmoothReset()

  const startZoom = zoomLevel.value
  const startPan = zoomPan.value

  if (startZoom === minZoomLevel && !hasPanOffset(startPan)) {
    return Promise.resolve()
  }

  const startTime = window.performance.now()

  return new Promise<void>((resolve) => {
    smoothResetResolve = resolve

    function animateReset(timestamp: number) {
      const progress = clamp((timestamp - startTime) / smoothResetDuration, 0, 1)
      const easedProgress = easeOutCubic(progress)

      zoomPan.value = {
        x: interpolate(startPan.x, 0, easedProgress),
        y: interpolate(startPan.y, 0, easedProgress),
      }
      zoomLevel.value = interpolate(startZoom, minZoomLevel, easedProgress)

      if (progress < 1) {
        smoothResetFrame = window.requestAnimationFrame(animateReset)
        return
      }

      smoothResetFrame = undefined
      smoothResetResolve = undefined
      zoomPan.value = createDefaultPan()
      zoomLevel.value = minZoomLevel
      resolve()
    }

    smoothResetFrame = window.requestAnimationFrame(animateReset)
  })
}

function cancelSmoothReset() {
  if (smoothResetFrame === undefined) {
    smoothResetResolve?.()
    smoothResetResolve = undefined
    return
  }

  window.cancelAnimationFrame(smoothResetFrame)
  smoothResetFrame = undefined
  smoothResetResolve?.()
  smoothResetResolve = undefined
}

function constrainZoomPan() {
  const constrainedPan = getConstrainedPan(zoomPan.value)

  if (constrainedPan.x !== zoomPan.value.x || constrainedPan.y !== zoomPan.value.y) {
    zoomPan.value = constrainedPan
  }
}

function getConstrainedPan(pan: ZoomPan) {
  const panBounds = getPanBounds()

  return {
    x: clamp(pan.x, -panBounds.x, panBounds.x),
    y: clamp(pan.y, -panBounds.y, panBounds.y),
  }
}

function getPanBounds() {
  const pageBounds = pageElement.value?.getBoundingClientRect()
  const zoomOverflow = Math.max(zoomLevel.value - minZoomLevel, 0)

  if (!pageBounds || pageBounds.width === 0 || pageBounds.height === 0 || zoomOverflow === 0) {
    return {
      x: 0,
      y: 0,
    }
  }

  return {
    x: (pageBounds.width * zoomOverflow) / 2,
    y: (pageBounds.height * zoomOverflow) / 2,
  }
}

function createDefaultPan(): ZoomPan {
  return {
    x: 0,
    y: 0,
  }
}

function hasPanOffset(pan: ZoomPan) {
  return pan.x !== 0 || pan.y !== 0
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function interpolate(from: number, to: number, progress: number) {
  return from + (to - from) * progress
}

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3
}

function navigateToPage(targetPage: ArtbookPage | undefined) {
  if (!targetPage) {
    return
  }

  isPagesMenuOpen.value = false
  navigateTo(targetPage.routePath)
}
</script>

<template>
  <main class="artbook-shell">
    <div class="artbook-stage">
      <ArtbookTopControls
        :current-page="page"
        :is-pages-menu-open="isPagesMenuOpen"
        @toggle-pages-menu="isPagesMenuOpen = !isPagesMenuOpen"
        @close-pages-menu="isPagesMenuOpen = false"
      />

      <div class="artbook-page-navigation-frame">
        <button
          class="page-arrow page-arrow--previous artbook-hover-highlight"
          type="button"
          :disabled="!previousPage"
          aria-label="Page precedente"
          @click="navigateToPage(previousPage)"
        >
          <SvgIcon
            class="page-arrow-icon"
            type="mdi"
            :path="Icons.ChevronLeft"
            :size="1"
            aria-hidden="true"
          />
        </button>

        <section
          ref="pageElement"
          class="artbook-page"
          :class="{ 'artbook-page--zoomed': isZoomed }"
          :aria-label="`${page.name} artbook page`"
        >
          <VueZoomable
            v-model:zoom="zoomLevel"
            v-model:pan="zoomPan"
            class="artbook-zoomable"
            selector=".artbook-zoom-content"
            :min-zoom="minZoomLevel"
            :max-zoom="maxZoomLevel"
            :initial-zoom="minZoomLevel"
            :wheel-zoom-step="zoomStep"
            :pan-enabled="isZoomed"
            :enable-control-button="false"
            zoom-origin="pointer"
            @dragstart.prevent
          >
            <div class="artbook-zoom-content">
              <slot />
            </div>
          </VueZoomable>
        </section>

        <button
          class="page-arrow page-arrow--next artbook-hover-highlight"
          type="button"
          :disabled="!nextPage"
          aria-label="Page suivante"
          @click="navigateToPage(nextPage)"
        >
          <SvgIcon
            class="page-arrow-icon"
            type="mdi"
            :path="Icons.ChevronRight"
            :size="1"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.artbook-shell {
  --shell-padding-y: clamp(8px, 1.8vh, 28px);
  --shell-padding-x: clamp(10px, 2.2vw, 40px);
  --top-controls-space: clamp(56px, 5.4vh, 94px);

  height: 100vh;
  background:
    radial-gradient(circle at 50% 8%, rgba(201, 168, 95, 0.2), transparent 34%),
    linear-gradient(rgba(8, 8, 12, 0.38), rgba(3, 3, 7, 0.58)),
    url('/images/fond.jpg') center / cover;
  color: #f5f0e8;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: var(--shell-padding-y) var(--shell-padding-x);
}

.artbook-stage {
  width: min(100%, calc((100vh - var(--shell-padding-y) * 2 - var(--top-controls-space)) * 16 / 9));
  max-width: 3840px;
}

.artbook-page-navigation-frame {
  position: relative;
  width: 100%;
}

.artbook-page {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 0 auto;
  overflow: hidden;
  background: #0b0a09;
  box-shadow:
    0 26px 86px rgba(0, 0, 0, 0.72),
    0 0 0 1px rgba(214, 180, 92, 0.26),
    0 0 0 8px rgba(4, 4, 9, 0.34);
  user-select: none;
}

.artbook-page--zoomed {
  cursor: grab;
}

.artbook-zoomable,
.artbook-zoom-content {
  width: 100%;
  height: 100%;
}

.artbook-zoomable {
  touch-action: none;
}

.artbook-zoom-content {
  -webkit-user-drag: none;
}

.page-arrow {
  position: absolute;
  top: 50%;
  z-index: 9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(34px, 4.2vh, 58px);
  height: clamp(58px, 8vh, 94px);
  padding: 0;
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.52);
  background: var(--artbook-panel-bg);
  box-shadow: var(--artbook-panel-shadow);
  color: var(--artbook-gold);
  cursor: pointer;
  transform: translateY(-50%);
}

.page-arrow--previous {
  left: calc(clamp(42px, 5.4vh, 72px) * -1);
}

.page-arrow--next {
  right: calc(clamp(42px, 5.4vh, 72px) * -1);
}

.page-arrow:disabled {
  border-color: rgba(var(--artbook-gold-rgb), 0.2);
  background: rgba(7, 7, 12, 0.52);
  box-shadow: none;
  color: rgba(var(--artbook-gold-rgb), 0.28);
  cursor: default;
}

.page-arrow-icon {
  width: clamp(26px, 3.6vh, 46px);
  height: clamp(26px, 3.6vh, 46px);
}

@media (max-width: 900px) {
  .page-arrow {
    background: rgba(7, 7, 12, 0.66);
  }

  .page-arrow--previous {
    left: 8px;
  }

  .page-arrow--next {
    right: 8px;
  }
}
</style>
