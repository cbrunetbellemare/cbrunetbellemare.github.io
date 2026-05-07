<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import type { ArtbookPage } from '../data/artbookPages'
import { useMusicPlayer } from '../composables/useMusicPlayer'
import { Icons } from '../icons'
import PagesMenu from './PagesMenu.vue'

defineProps<{
  currentPage: ArtbookPage
  isPagesMenuOpen: boolean
}>()

defineEmits<{
  togglePagesMenu: []
  closePagesMenu: []
}>()

const { isMuted, initializeMusic, toggleMute } = useMusicPlayer()

const musicIconPath = computed(() => (isMuted.value ? Icons.MusicOff : Icons.MusicOn))
const musicButtonLabel = computed(() => (isMuted.value ? 'Activer la musique' : 'Couper la musique'))

onMounted(() => {
  initializeMusic()
})
</script>

<template>
  <header class="top-controls">
    <p class="wordmark" aria-label="Firaluna">Firaluna</p>

    <div id="artbook-version-controls" class="version-controls-target"></div>

    <nav class="actions" aria-label="Artbook controls">
      <button
        class="control-button icon-control-button artbook-hover-highlight"
        type="button"
        :aria-label="musicButtonLabel"
        :title="musicButtonLabel"
        :aria-pressed="isMuted"
        @click="toggleMute"
      >
        <SvgIcon class="music-icon" type="mdi" :path="musicIconPath" :size="20" aria-hidden="true" />
      </button>

      <div class="pages-menu-wrapper">
        <button
          class="control-button pages-control-button artbook-hover-highlight"
          type="button"
          :aria-expanded="isPagesMenuOpen"
          aria-controls="pages-menu"
          @click="$emit('togglePagesMenu')"
        >
          Pages
        </button>

        <PagesMenu
          v-if="isPagesMenuOpen"
          id="pages-menu"
          :current-page-id="currentPage.id"
          @select-page="$emit('closePagesMenu')"
        />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.top-controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(12px, 1.3vh, 18px);
  width: 100%;
  margin: 0 auto clamp(8px, 1vh, 14px);
}

.wordmark {
  justify-self: start;
  color: var(--artbook-gold);
  font-family: 'Amarante', Georgia, 'Palatino Linotype', 'Book Antiqua', serif;
  font-size: clamp(2rem, 4.4vh, 4.4rem);
  font-weight: 400;
  line-height: 0.95;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.2),
    0 3px 0 rgba(20, 14, 28, 0.9),
    0 0 22px rgba(226, 193, 105, 0.36);
}

.pages-menu-wrapper {
  position: relative;
  margin-block: var(--artbook-panel-padding-sm);
}

.version-controls-target {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.actions {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: clamp(8px, 0.9vh, 12px);
}

.control-button {
  --artbook-hover-base-bg: linear-gradient(180deg, rgba(37, 37, 48, 0.96), rgba(12, 12, 18, 0.96));

  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 74px;
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.72);
  border-radius: var(--artbook-radius-sm);
  background: var(--artbook-hover-base-bg);
  color: #f2d890;
  cursor: pointer;
  font: inherit;
  font-size: clamp(0.78rem, 1.05vh, 1.08rem);
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
  padding: clamp(8px, 0.9vh, 14px) clamp(12px, 1.3vh, 24px);
  text-transform: uppercase;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(var(--artbook-gold-rgb), 0.24);
}

.icon-control-button {
  min-width: 0;
  padding-inline: clamp(8px, 0.9vh, 14px);
}

.pages-control-button {
  min-width: clamp(72px, 6.8vh, 118px);
}

.icon-control-button :deep(svg) {
  display: block;
}

.music-icon {
  width: 1em;
  height: 1em;
}

</style>
