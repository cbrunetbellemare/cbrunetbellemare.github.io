<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { useSimpleRouter } from '../composables/useSimpleRouter'
import { useUnlockedPages } from '../composables/useUnlockedPages'
import { Icons } from '../icons'

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
  <div class="pages-menu artbook-panel" role="menu">
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
      </span>
      <span v-if="page.id === currentPageId" class="current-marker" aria-label="Current page">
        <SvgIcon
          class="current-page-icon"
          type="mdi"
          :path="Icons.StarFourPoints"
          :size="22"
          aria-hidden="true"
        />
      </span>
    </button>
  </div>
</template>

<style scoped>
.pages-menu {
  --artbook-panel-border-opacity: 0.58;
  --artbook-panel-radius: var(--artbook-radius-sm);

  position: absolute;
  right: 0;
  top: calc(100% + clamp(10px, 1.1vh, 16px));
  z-index: 10;
  width: min(86vw, clamp(320px, 33vh, 560px));
  background:
    linear-gradient(180deg, rgba(31, 31, 42, 0.98), rgba(8, 8, 14, 0.98));
  padding: clamp(12px, 1.25vh, 18px);
  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.58),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 0 28px rgba(214, 180, 92, 0.08);
}

.pages-menu::before,
.pages-menu::after {
  position: absolute;
  left: 14px;
  right: 14px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--artbook-gold-rgb), 0.74), transparent);
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
  gap: clamp(12px, 1.2vh, 18px);
  width: 100%;
  border: 1px solid transparent;
  border-radius: 1px;
  background: transparent;
  color: var(--artbook-text-warm);
  cursor: pointer;
  font: inherit;
  padding: clamp(10px, 1.22vh, 21px) clamp(11px, 1.38vh, 24px);
  text-align: left;
}

.page-option[aria-current='page'] {
  background: rgba(var(--artbook-gold-rgb), 0.14);
}

.page-option:hover,
.page-option:focus-visible {
  border-color: rgba(var(--artbook-gold-rgb), 0.28);
  background: rgba(var(--artbook-gold-rgb), 0.1);
  outline: none;
}

.page-option strong {
  font-weight: 700;
  letter-spacing: 0;
  display: block;
  font-size: clamp(0.88rem, 1.12vh, 1.18rem);
}

.current-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: clamp(18px, 1.85vh, 30px);
  height: clamp(18px, 1.85vh, 30px);
  color: var(--artbook-gold-bright);
}

.current-page-icon {
  width: clamp(18px, 1.85vh, 30px);
  height: clamp(18px, 1.85vh, 30px);
}
</style>
