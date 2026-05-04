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
      <span v-if="page.id === currentPageId" class="current-marker" aria-label="Current page"></span>
    </button>
  </div>
</template>

<style scoped>
.pages-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  z-index: 10;
  width: min(82vw, 340px);
  border: 1px solid rgba(218, 187, 105, 0.58);
  border-radius: 2px;
  background:
    linear-gradient(180deg, rgba(31, 31, 42, 0.98), rgba(8, 8, 14, 0.98));
  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.58),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 0 28px rgba(214, 180, 92, 0.08);
  padding: 10px;
}

.pages-menu::before,
.pages-menu::after {
  position: absolute;
  left: 14px;
  right: 14px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(218, 187, 105, 0.74), transparent);
  content: '';
}

.pages-menu::before {
  top: 5px;
}

.pages-menu::after {
  bottom: 5px;
}

.page-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 1px;
  background: transparent;
  color: #f4e8c3;
  cursor: pointer;
  font: inherit;
  padding: 11px 12px;
  text-align: left;
}

.page-option:hover,
.page-option:focus-visible {
  border-color: rgba(218, 187, 105, 0.28);
  background: rgba(218, 187, 105, 0.1);
  outline: none;
}

.page-option[aria-current='page'] {
  background: rgba(218, 187, 105, 0.14);
}

.page-option strong {
  font-weight: 700;
  letter-spacing: 0.03em;
  display: block;
}

.page-option small {
  color: rgba(213, 213, 220, 0.62);
  margin-top: 2px;
  display: block;
}

.current-marker {
  position: relative;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
}

.current-marker::before,
.current-marker::after {
  position: absolute;
  inset: 50% auto auto 50%;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(241, 220, 154, 0.92);
  background: rgba(218, 187, 105, 0.2);
  content: '';
  transform: translate(-50%, -50%) rotate(45deg);
}

.current-marker::after {
  width: 6px;
  height: 6px;
  border: 0;
  background: #f1dc9a;
}
</style>
