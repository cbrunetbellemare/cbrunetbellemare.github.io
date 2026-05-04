<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ArtbookPage } from '../data/artbookPages'
import ArtbookTopControls from '../components/ArtbookTopControls.vue'

const props = defineProps<{
  page: ArtbookPage
}>()

const isPagesMenuOpen = ref(false)
const zoomLevel = ref(1)
const zoomOrigin = ref('50% 50%')

watch(
  () => props.page.id,
  () => {
    zoomLevel.value = 1
    zoomOrigin.value = '50% 50%'
  },
)

function zoomPage(event: WheelEvent) {
  const pageElement = event.currentTarget

  if (!(pageElement instanceof HTMLElement)) {
    return
  }

  const pageBounds = pageElement.getBoundingClientRect()
  const originX = ((event.clientX - pageBounds.left) / pageBounds.width) * 100
  const originY = ((event.clientY - pageBounds.top) / pageBounds.height) * 100
  const zoomDirection = event.deltaY < 0 ? 1 : -1
  const nextZoomLevel = zoomLevel.value + zoomDirection * 0.12

  zoomOrigin.value = `${Math.min(Math.max(originX, 0), 100)}% ${Math.min(Math.max(originY, 0), 100)}%`
  zoomLevel.value = Math.min(Math.max(nextZoomLevel, 1), 2.6)
}

function resetZoom() {
  zoomLevel.value = 1
  zoomOrigin.value = '50% 50%'
}
</script>

<template>
  <main class="artbook-shell">
    <div class="artbook-stage" :class="{ 'artbook-stage--with-side-controls': page.id === 'geants' }">
      <ArtbookTopControls
        :current-page="page"
        :is-pages-menu-open="isPagesMenuOpen"
        @toggle-pages-menu="isPagesMenuOpen = !isPagesMenuOpen"
        @close-pages-menu="isPagesMenuOpen = false"
      />

      <section
        class="artbook-page"
        :aria-label="`${page.name} artbook page`"
        @wheel.prevent="zoomPage"
        @dblclick="resetZoom"
      >
        <div
          class="artbook-zoom-layer"
          :style="{ transform: `scale(${zoomLevel})`, transformOrigin: zoomOrigin }"
        >
          <slot />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.artbook-shell {
  height: 100vh;
  background:
    radial-gradient(circle at 50% 8%, rgba(201, 168, 95, 0.2), transparent 34%),
    linear-gradient(rgba(8, 8, 12, 0.38), rgba(3, 3, 7, 0.58)),
    url('/images/fond.jpg') center / cover;
  color: #f5f0e8;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: clamp(10px, 2.2vh, 22px) clamp(12px, 2.5vw, 32px);
}

.artbook-stage {
  width: min(100%, calc((100vh - clamp(10px, 2.2vh, 22px) * 2 - 64px) * 16 / 9));
  max-width: 3840px;
}

.artbook-stage--with-side-controls {
  width: min(calc(100% - 148px), calc((100vh - clamp(10px, 2.2vh, 22px) * 2 - 64px) * 16 / 9));
}

.artbook-page {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 0 auto;
  overflow: hidden;
  background: #f2eadb;
  box-shadow:
    0 26px 86px rgba(0, 0, 0, 0.72),
    0 0 0 1px rgba(214, 180, 92, 0.26),
    0 0 0 8px rgba(4, 4, 9, 0.34);
}

.artbook-zoom-layer {
  width: 100%;
  height: 100%;
  transition: transform 120ms ease-out;
}

@media (max-width: 900px) {
  .artbook-stage--with-side-controls {
    width: min(calc(100% - 120px), calc((100vh - clamp(10px, 2.2vh, 22px) * 2 - 64px) * 16 / 9));
  }
}
</style>
