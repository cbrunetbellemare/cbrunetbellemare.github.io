<script setup lang="ts">
import { ref } from 'vue'
import type { ArtbookPage } from '../data/artbookPages'
import ArtbookTopControls from '../components/ArtbookTopControls.vue'

defineProps<{
  page: ArtbookPage
}>()

const isPagesMenuOpen = ref(false)
</script>

<template>
  <main class="artbook-shell">
    <div>
      <ArtbookTopControls
        :current-page="page"
        :is-pages-menu-open="isPagesMenuOpen"
        @toggle-pages-menu="isPagesMenuOpen = !isPagesMenuOpen"
        @close-pages-menu="isPagesMenuOpen = false"
      />

      <section class="artbook-page" :aria-label="`${page.name} artbook page`">
        <slot />
      </section>
    </div>
  </main>
</template>

<style scoped>
.artbook-shell {
  height: 100vh;
  background: #000000;
  color: #f5f0e8;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: clamp(10px, 2.2vh, 22px) clamp(12px, 2.5vw, 32px);
}

.artbook-page {
  width: min(100%, calc((100vh - clamp(10px, 2.2vh, 22px) * 2 - 64px) * 16 / 9));
  max-width: 3840px;
  aspect-ratio: 16 / 9;
  margin: 0 auto;
  overflow: hidden;
  background: #f2eadb;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.72);
}
</style>
