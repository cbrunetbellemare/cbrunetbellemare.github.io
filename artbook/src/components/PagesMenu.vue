<script setup lang="ts">
import { useSimpleRouter } from '../composables/useSimpleRouter'
import { useUnlockedPages } from '../composables/useUnlockedPages'

defineProps<{
  currentPageId: string
}>()

const emit = defineEmits<{
  selectPage: []
}>()

const { navigateTo } = useSimpleRouter()
const { accessiblePages } = useUnlockedPages()

function selectPage(path: string) {
  navigateTo(path)
  emit('selectPage')
}
</script>

<template>
  <div class="pages-menu" role="menu">
    <button
      v-for="page in accessiblePages"
      :key="page.id"
      class="page-option"
      type="button"
      role="menuitem"
      :aria-current="page.id === currentPageId ? 'page' : undefined"
      @click="selectPage(page.routePath)"
    >
      <span>
        <strong>{{ page.name }}</strong>
        <small>{{ page.category }}</small>
      </span>
      <span v-if="page.id === currentPageId" class="current-label">here</span>
    </button>
  </div>
</template>

<style scoped>
.pages-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 10;
  width: min(82vw, 320px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: #111111;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5);
  padding: 6px;
}

.page-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  border: 0;
  background: transparent;
  color: #fff9ef;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  text-align: left;
}

.page-option:hover,
.page-option:focus-visible {
  background: #28231d;
  outline: none;
}

.page-option strong {
  font-weight: 700;
  display: block;
}

.page-option small {
  color: rgba(255, 249, 239, 0.64);
  margin-top: 2px;
  display: block;
}

.current-label {
  color: #f2c96b;
  font-size: 0.78rem;
  font-weight: 700;
}
</style>
