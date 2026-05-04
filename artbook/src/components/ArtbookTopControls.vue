<script setup lang="ts">
import type { ArtbookPage } from '../data/artbookPages'
import PagesMenu from './PagesMenu.vue'

defineProps<{
  currentPage: ArtbookPage
  isPagesMenuOpen: boolean
}>()

defineEmits<{
  togglePagesMenu: []
  closePagesMenu: []
}>()
</script>

<template>
  <header class="top-controls">
    <p class="wordmark" aria-label="Firaluna">Firaluna</p>

    <nav class="actions" aria-label="Artbook controls">
      <div class="pages-menu-wrapper">
        <button
          class="control-button"
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
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 0 auto 8px;
}

.wordmark {
  color: #f4d98b;
  font-family: 'Amarante', Georgia, 'Palatino Linotype', 'Book Antiqua', serif;
  font-size: clamp(2rem, 3.8vh, 3.4rem);
  font-weight: 400;
  line-height: 0.95;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.2),
    0 3px 0 rgba(20, 14, 28, 0.9),
    0 0 22px rgba(226, 193, 105, 0.36);
}

.pages-menu-wrapper {
  position: relative;
}

.control-button {
  min-width: 64px;
  border: 1px solid rgba(218, 187, 105, 0.72);
  border-radius: 2px;
  background:
    linear-gradient(180deg, rgba(37, 37, 48, 0.96), rgba(12, 12, 18, 0.96));
  color: #f2d890;
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1;
  padding: 8px 14px;
  text-transform: uppercase;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(218, 187, 105, 0.24);
}

.control-button:hover,
.control-button:focus-visible {
  background:
    linear-gradient(180deg, rgba(48, 48, 62, 0.98), rgba(18, 18, 26, 0.98));
  outline: 1px solid rgba(238, 218, 156, 0.88);
  outline-offset: 3px;
}
</style>
