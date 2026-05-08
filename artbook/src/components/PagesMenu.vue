<script setup lang="ts">
// Menu des pages: navigation visible, pages verrouillées et déblocage manuel.
import { computed, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { useSimpleRouter } from '../composables/useSimpleRouter'
import { useUnlockedPages } from '../composables/useUnlockedPages'
import type { ArtbookPage } from '../data/artbookPages'
import { Icons } from '../icons'
import ArtbookUnlockModal from './ArtbookUnlockModal.vue'

defineProps<{
  currentPageId: string
}>()

const emit = defineEmits<{
  selectPage: []
}>()

const { navigateTo } = useSimpleRouter()
const { allPages, isPageAccessible, unlockAllPages } = useUnlockedPages()

const isUnlockModalOpen = ref(false)
// Regarde si le bouton "tout débloquer" doit encore être affiché.
const hasLockedPages = computed(() => allPages.value.some((page) => isPageLocked(page.id)))

function isPageLocked(pageId: string) {
  return !isPageAccessible(pageId)
}

function selectPage(page: ArtbookPage) {
  if (isPageLocked(page.id)) {
    // Double protection: le bouton est désactivé, mais la fonction reste sûre.
    return
  }

  navigateTo(page.routePath)
  emit('selectPage')
}

function openUnlockModal() {
  // Ouvre la confirmation avant de tout débloquer.
  isUnlockModalOpen.value = true
}

function unlockAllPagesFromModal() {
  unlockAllPages()
  isUnlockModalOpen.value = false
}
</script>

<template>
  <div class="pages-menu artbook-panel" role="menu">
    <!-- Les pages verrouillées ne sont pas cliquables. -->
    <button
      v-for="page in allPages"
      :key="page.id"
      class="page-option"
      :class="{ 'page-option--locked': isPageLocked(page.id) }"
      type="button"
      role="menuitem"
      :disabled="isPageLocked(page.id)"
      :aria-disabled="isPageLocked(page.id)"
      :aria-current="page.id === currentPageId ? 'page' : undefined"
      @click="selectPage(page)"
    >
      <span class="page-option-label">
        <strong>{{ page.name }}</strong>
      </span>
      <span v-if="isPageLocked(page.id)" class="locked-marker" aria-label="Page verrouillée">
        <SvgIcon
          class="locked-page-icon"
          type="mdi"
          :path="Icons.Lock"
          :size="22"
          aria-hidden="true"
        />
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

    <button
      v-if="hasLockedPages"
      class="unlock-all-option artbook-hover-highlight"
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="isUnlockModalOpen"
      @click="openUnlockModal"
    >
      <SvgIcon class="unlock-all-icon" type="mdi" :path="Icons.LockOpen" :size="22" aria-hidden="true" />
      <span class="unlock-all-label">Débloquer toutes les pages</span>
    </button>

    <ArtbookUnlockModal
      v-if="isUnlockModalOpen"
      @close="isUnlockModalOpen = false"
      @unlock="unlockAllPagesFromModal"
    />
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

.page-option:not(:disabled):hover,
.page-option:not(:disabled):focus-visible {
  border-color: rgba(var(--artbook-gold-rgb), 0.28);
  background: rgba(var(--artbook-gold-rgb), 0.1);
  outline: none;
}

.page-option--locked {
  border-color: rgba(var(--artbook-gold-rgb), 0.1);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(var(--artbook-gold-bright-rgb), 0.38);
  cursor: not-allowed;
}

.page-option strong {
  font-weight: 700;
  letter-spacing: 0;
  display: block;
  font-size: clamp(0.88rem, 1.12vh, 1.18rem);
}

.page-option-label {
  min-width: 0;
}

.current-marker,
.locked-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: clamp(18px, 1.85vh, 30px);
  height: clamp(18px, 1.85vh, 30px);
  color: var(--artbook-gold-bright);
}

.locked-marker {
  color: rgba(var(--artbook-gold-bright-rgb), 0.5);
}

.current-page-icon,
.locked-page-icon {
  width: clamp(18px, 1.85vh, 30px);
  height: clamp(18px, 1.85vh, 30px);
}

.unlock-all-option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--artbook-control-gap);
  width: 100%;
  margin-top: clamp(10px, 1.2vh, 18px);
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.46);
  background: rgba(var(--artbook-gold-rgb), 0.12);
  color: var(--artbook-gold);
  cursor: pointer;
  font: inherit;
  padding: clamp(9px, 1.1vh, 16px) clamp(11px, 1.38vh, 24px);
}

.unlock-all-option:hover,
.unlock-all-option:focus-visible {
  background: rgba(var(--artbook-gold-rgb), 0.2);
  outline: none;
}

.unlock-all-icon {
  width: clamp(18px, 1.85vh, 30px);
  height: clamp(18px, 1.85vh, 30px);
}

.unlock-all-label {
  font-size: clamp(0.78rem, 1.05vh, 1.08rem);
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
}
</style>
