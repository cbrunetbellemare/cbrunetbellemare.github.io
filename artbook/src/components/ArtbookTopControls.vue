<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import type { ArtbookPage } from '../data/artbookPages'
import { useMusicPlayer } from '../composables/useMusicPlayer'
import { Icons } from '../icons'
import ArtbookLexiconModal from './ArtbookLexiconModal.vue'
import ArtbookMapModal from './ArtbookMapModal.vue'
import PagesMenu from './PagesMenu.vue'
import { publicAsset } from '../utils/publicPath'

defineProps<{
  currentPage: ArtbookPage
  isPagesMenuOpen: boolean
}>()

const emit = defineEmits<{
  togglePagesMenu: []
  closePagesMenu: []
}>()

const { isMuted, initializeMusic, toggleMute } = useMusicPlayer()
const logoImage = publicAsset('images/logo.png')

// Chaque modale possède son propre état pour éviter qu'elles s'ouvrent toutes en même temps.
const isMapOpen = ref(false)
const isLexiconOpen = ref(false)
const musicIconPath = computed(() => (isMuted.value ? Icons.MusicOff : Icons.MusicOn))
const musicButtonLabel = computed(() => (isMuted.value ? 'Activer la musique' : 'Couper la musique'))

onMounted(() => {
  initializeMusic()
})

function openMap() {
  // On ferme d'abord les autres panneaux pour garder une seule modale active.
  emit('closePagesMenu')
  isLexiconOpen.value = false
  isMapOpen.value = true
}

function openLexicon() {
  // Le lexique est une modale globale; on ferme donc les autres panneaux avant de l'afficher.
  emit('closePagesMenu')
  isMapOpen.value = false
  isLexiconOpen.value = true
}
</script>

<template>
  <header class="top-controls">
    <!-- Logo principal de l'artbook, remplacé par une image pour respecter l'identité visuelle du projet. -->
    <div class="brand-mark">
      <img class="brand-logo" :src="logoImage" alt="Firaluna" />
    </div>

    <!-- Point d'ancrage où les menus d'étapes et les instructions vidéo sont téléportés. -->
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

      <button
        class="control-button map-control-button artbook-hover-highlight"
        type="button"
        aria-haspopup="dialog"
        :aria-expanded="isMapOpen"
        @click="openMap"
      >
        Carte
      </button>

      <button
        class="control-button lexicon-control-button artbook-hover-highlight"
        type="button"
        aria-haspopup="dialog"
        :aria-expanded="isLexiconOpen"
        @click="openLexicon"
      >
        Lexique
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

    <ArtbookMapModal v-if="isMapOpen" :page="currentPage" @close="isMapOpen = false" />
    <ArtbookLexiconModal v-if="isLexiconOpen" @close="isLexiconOpen = false" />
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

.brand-mark {
  justify-self: start;
  display: flex;
  align-items: center;
  min-width: 0;
}

.brand-logo {
  display: block;
  width: auto;
  height: clamp(38px, 5.2vh, 82px);
  max-width: min(32vw, 280px);
  object-fit: contain;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.55));
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

.pages-control-button,
.map-control-button {
  min-width: clamp(72px, 6.8vh, 118px);
}

.lexicon-control-button {
  min-width: clamp(86px, 8.2vh, 132px);
}

.icon-control-button :deep(svg) {
  display: block;
}

.music-icon {
  width: 1em;
  height: 1em;
}
</style>
