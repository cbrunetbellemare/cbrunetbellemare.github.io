<script setup lang="ts">
// Barre du haut: logo, pages, musique, carte et lexique.
import { computed, onMounted, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import type { ArtbookPage } from '../data/artbookPages'
import { useMusicPlayer } from '../composables/useMusicPlayer'
import { Icons } from '../icons'
import ArtbookLexiconModal from './ArtbookLexiconModal.vue'
import ArtbookMapModal from './ArtbookMapModal.vue'
import PagesMenu from './PagesMenu.vue'

defineProps<{
  currentPage: ArtbookPage
  isPagesMenuOpen: boolean
}>()

const emit = defineEmits<{
  togglePagesMenu: []
  closePagesMenu: []
}>()

const { isMuted, initializeMusic, toggleMute } = useMusicPlayer()
const logoImage = '/images/logo.png'

// Chaque fenêtre a son booléen pour savoir si elle est ouverte.
const isMapOpen = ref(false)
const isLexiconOpen = ref(false)
const isUtilityMenuOpen = ref(false)
const musicIconPath = computed(() => (isMuted.value ? Icons.MusicOff : Icons.MusicOn))
const musicButtonLabel = computed(() =>
  isMuted.value ? 'Activer la musique' : 'Couper la musique',
)

onMounted(() => {
  // Initialisé ici parce que la barre existe sur toutes les pages.
  initializeMusic()
})

function openMap() {
  // Quand la carte ouvre, on ferme les autres menus.
  emit('closePagesMenu')
  isUtilityMenuOpen.value = false
  isLexiconOpen.value = false
  isMapOpen.value = true
}

function openLexicon() {
  // Même principe que la carte, mais pour le lexique.
  emit('closePagesMenu')
  isUtilityMenuOpen.value = false
  isMapOpen.value = false
  isLexiconOpen.value = true
}

function toggleUtilityMenu() {
  // Les deux menus du haut ne doivent pas se superposer.
  isUtilityMenuOpen.value = !isUtilityMenuOpen.value
  emit('closePagesMenu')
}

function toggleMusicFromUtilityMenu() {
  // Ferme le menu après l'action pour garder l'interface légère.
  toggleMute()
  isUtilityMenuOpen.value = false
}
</script>

<template>
  <header class="top-controls">
    <!-- Logo du projet. -->
    <div class="brand-mark">
      <img class="brand-logo" :src="logoImage" alt="Firaluna" />
    </div>

    <!-- Les menus des pages viennent se placer ici avec Teleport. -->
    <div id="artbook-version-controls" class="version-controls-target"></div>

    <nav class="actions" aria-label="Artbook controls">
      <div class="utility-controls">
        <button
          class="control-button icon-control-button utility-toggle artbook-hover-highlight"
          type="button"
          aria-label="Ouvrir les controles secondaires"
          :aria-expanded="isUtilityMenuOpen"
          aria-controls="utility-controls-menu"
          @click="toggleUtilityMenu"
        >
          <SvgIcon class="menu-icon" type="mdi" :path="Icons.Menu" :size="20" aria-hidden="true" />
        </button>

        <nav
          v-if="isUtilityMenuOpen"
          id="utility-controls-menu"
          class="utility-menu artbook-panel"
          aria-label="Musique, carte et lexique"
        >
          <button
            class="control-button side-control-button artbook-hover-highlight"
            type="button"
            :aria-label="musicButtonLabel"
            :title="musicButtonLabel"
            :aria-pressed="isMuted"
            @click="toggleMusicFromUtilityMenu"
          >
            <SvgIcon
              class="music-icon"
              type="mdi"
              :path="musicIconPath"
              :size="20"
              aria-hidden="true"
            />
            <span>Musique</span>
          </button>

          <button
            class="control-button side-control-button artbook-hover-highlight"
            type="button"
            aria-haspopup="dialog"
            :aria-expanded="isMapOpen"
            @click="openMap"
          >
            Carte
          </button>

          <button
            class="control-button side-control-button artbook-hover-highlight"
            type="button"
            aria-haspopup="dialog"
            :aria-expanded="isLexiconOpen"
            @click="openLexicon"
          >
            Lexique
          </button>
        </nav>
      </div>

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

.pages-control-button {
  min-width: clamp(72px, 6.8vh, 118px);
}

.icon-control-button :deep(svg) {
  display: block;
}

.music-icon,
.menu-icon {
  width: 1em;
  height: 1em;
}

.utility-controls {
  position: relative;
  display: flex;
  align-items: center;
  margin-block: var(--artbook-panel-padding-sm);
}

.utility-toggle {
  width: clamp(36px, 4.4vh, 56px);
  min-width: 0;
  padding-inline: clamp(8px, 0.9vh, 14px);
}

.utility-menu {
  position: absolute;
  right: 0;
  top: calc(100% + clamp(10px, 1.1vh, 16px));
  z-index: 10;
  display: grid;
  gap: clamp(6px, 0.7vh, 10px);
  width: min(78vw, clamp(180px, 20vh, 260px));
  max-height: calc(100vh - clamp(92px, 10vh, 148px));
  overflow-y: auto;
  padding: var(--artbook-panel-padding-sm);
}

.side-control-button {
  justify-content: center;
  gap: var(--artbook-control-gap);
  width: 100%;
  min-width: 0;
}
</style>
