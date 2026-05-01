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
  width: min(100%, 1400px);
  margin: 0 auto;
}

.wordmark {
  color: #fff9ef;
  font-family: Georgia, 'Palatino Linotype', 'Book Antiqua', serif;
  font-size: 2em;
  font-weight: 700;
  line-height: 1;
}

.pages-menu-wrapper {
  position: relative;
}

.control-button {
  min-width: 54px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: #121212;
  color: #fff9ef;
  cursor: pointer;
  font: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  line-height: 1;
  padding: 6px 10px;
}

.control-button:hover,
.control-button:focus-visible {
  background: #24201b;
  outline: none;
}
</style>
