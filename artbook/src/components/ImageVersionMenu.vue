<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { Icons } from '../icons'

export interface ImageVersion {
  label: string
  image: string
}

defineProps<{
  versions: readonly ImageVersion[]
  activeIndex: number
  ariaLabel?: string
}>()

defineEmits<{
  select: [index: number]
}>()
</script>

<template>
  <!-- Boutons pour changer d'image. -->
  <Teleport defer to="#artbook-version-controls">
    <div
      class="image-version-menu artbook-panel"
      :aria-label="ariaLabel ?? 'Versions de l illustration'"
    >
      <div class="version-list">
        <button
          v-for="(version, index) in versions"
          :key="version.label"
          class="version-button artbook-menu-button artbook-hover-highlight"
          type="button"
          :aria-label="`Afficher ${version.label}`"
          :aria-current="index === activeIndex ? 'step' : undefined"
          @click="$emit('select', index)"
        >
          <span class="version-marker" aria-hidden="true">
            <SvgIcon
              type="mdi"
              :path="index === activeIndex ? Icons.StarFourPointsBox : Icons.StarFourPointsBoxOutline"
              class="artbook-menu-svg"
              :size="18"
            />
          </span>
          <span class="version-label artbook-ui-label">{{ version.label }}</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.image-version-menu {
  display: grid;
  align-items: center;
  gap: clamp(8px, 0.9vh, 12px);
  width: fit-content;
  max-width: min(48vw, clamp(330px, 34vh, 560px));
  padding: var(--artbook-panel-padding-sm);
}

.version-list {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.7vh, 10px);
}

.version-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--artbook-control-gap);
  padding: var(--artbook-menu-button-padding);
}

.version-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: var(--artbook-menu-icon-size);
  height: var(--artbook-menu-icon-size);
  color: rgba(var(--artbook-gold-bright-rgb), 0.78);
}

.version-button[aria-current='step'] .version-marker {
  color: var(--artbook-gold);
}

@media (max-width: 900px) {
  .image-version-menu {
    max-width: 42vw;
    overflow-x: auto;
  }

  .version-button {
    padding: var(--artbook-menu-button-padding);
  }
}
</style>
