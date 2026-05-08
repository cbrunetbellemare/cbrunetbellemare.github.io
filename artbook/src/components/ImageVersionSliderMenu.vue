<script setup lang="ts">
import { computed } from 'vue'
import type { ImageVersion } from './ImageVersionMenu.vue'

const props = defineProps<{
  versions: readonly ImageVersion[]
  activeIndex: number
  ariaLabel?: string
}>()

const emit = defineEmits<{
  select: [index: number]
}>()

// Le slider peut être entre deux images, donc on arrondit pour le titre actif.
const nearestVersionIndex = computed(() => clamp(Math.round(props.activeIndex), 0, props.versions.length - 1))
const activeVersion = computed(() => props.versions[nearestVersionIndex.value] ?? props.versions[0])

function selectVersion(event: Event) {
  const input = event.currentTarget as HTMLInputElement
  // Envoie la valeur exacte du slider.
  emit('select', Number(input.value))
}

function getLabelOpacity(index: number) {
  // Le nom proche du curseur devient plus visible.
  const blendWeight = clamp(1 - Math.abs(index - props.activeIndex), 0, 1)

  return 0.48 + blendWeight * 0.52
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
</script>

<template>
  <!-- Place le slider dans la barre du haut. -->
  <Teleport defer to="#artbook-version-controls">
    <div
      class="image-version-slider artbook-panel"
      :aria-label="ariaLabel ?? 'Versions de l illustration'"
    >
      <div
        class="slider-labels"
        :style="{ gridTemplateColumns: `repeat(${versions.length}, minmax(0, 1fr))` }"
        aria-hidden="true"
      >
        <span
          v-for="(version, index) in versions"
          :key="version.label"
          class="slider-label artbook-ui-label"
          :data-active="index === nearestVersionIndex"
          :style="{ opacity: getLabelOpacity(index) }"
        >
          {{ version.label }}
        </span>
      </div>

      <!-- Petit pas pour pouvoir être entre deux images. -->
      <input
        class="version-slider"
        type="range"
        :min="0"
        :max="versions.length - 1"
        :step="0.01"
        :value="activeIndex"
        :aria-label="activeVersion ? `Afficher ${activeVersion.label}` : ariaLabel"
        @input="selectVersion"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.image-version-slider {
  --artbook-panel-border-opacity: 0.5;

  display: grid;
  gap: clamp(5px, 0.58vh, 10px);
  width: min(48vw, clamp(360px, 42vh, 650px));
  padding: clamp(6px, 0.72vh, 11px) clamp(12px, 1.4vh, 22px);
}

.slider-labels {
  display: grid;
  gap: clamp(8px, 0.9vh, 14px);
  width: 100%;
}

.slider-label {
  color: rgba(var(--artbook-gold-bright-rgb), 0.58);
  line-height: 1;
  text-align: center;
  transition:
    color 180ms ease,
    text-shadow 180ms ease;
}

.slider-label[data-active='true'] {
  color: var(--artbook-gold);
  text-shadow: var(--artbook-active-glow);
}

.version-slider {
  appearance: none;
  width: 100%;
  height: clamp(18px, 2vh, 28px);
  accent-color: var(--artbook-gold);
  background: transparent;
  cursor: pointer;
}

.version-slider:focus-visible {
  outline: 2px solid rgba(var(--artbook-gold-bright-rgb), 0.82);
  outline-offset: 4px;
}

.version-slider::-webkit-slider-runnable-track {
  height: clamp(5px, 0.66vh, 9px);
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.34);
  background: var(--artbook-menu-item-bg);
}

.version-slider::-webkit-slider-thumb {
  appearance: none;
  width: clamp(16px, 1.65vh, 26px);
  height: clamp(16px, 1.65vh, 26px);
  margin-top: calc((clamp(5px, 0.66vh, 9px) - clamp(16px, 1.65vh, 26px)) / 2);
  border: 1px solid rgba(var(--artbook-gold-bright-rgb), 0.96);
  background: var(--artbook-gold);
  box-shadow: var(--artbook-active-glow);
}

.version-slider::-moz-range-track {
  height: clamp(5px, 0.66vh, 9px);
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.34);
  background: var(--artbook-menu-item-bg);
}

.version-slider::-moz-range-thumb {
  width: clamp(16px, 1.65vh, 26px);
  height: clamp(16px, 1.65vh, 26px);
  border: 1px solid rgba(var(--artbook-gold-bright-rgb), 0.96);
  border-radius: 0;
  background: var(--artbook-gold);
  box-shadow: var(--artbook-active-glow);
}

@media (max-width: 900px) {
  .image-version-slider {
    width: min(48vw, 360px);
    padding-inline: clamp(8px, 1vh, 12px);
  }
}
</style>
