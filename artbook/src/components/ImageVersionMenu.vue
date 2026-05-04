<script setup lang="ts">
export interface ImageVersion {
  label: string
  image: string
}

const props = defineProps<{
  versions: readonly ImageVersion[]
  activeIndex: number
  ariaLabel?: string
}>()

const emit = defineEmits<{
  select: [index: number]
}>()
</script>

<template>
  <Teleport to="body">
    <div class="image-version-menu" :aria-label="ariaLabel ?? 'Versions de l illustration'">
      <div class="version-list">
        <button
          v-for="(version, index) in versions"
          :key="version.label"
          class="version-button"
          type="button"
          :aria-label="`Afficher ${version.label}`"
          :aria-current="index === activeIndex ? 'step' : undefined"
          @click="$emit('select', index)"
        >
          <span class="version-marker"></span>
          <span class="version-label">{{ version.label }}</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.image-version-menu {
  position: fixed;
  right: clamp(14px, 2.5vw, 32px);
  top: 50%;
  z-index: 12;
  display: grid;
  align-items: center;
  gap: 10px;
  width: 122px;
  border: 1px solid rgba(218, 187, 105, 0.46);
  background:
    linear-gradient(180deg, rgba(25, 24, 32, 0.84), rgba(7, 7, 12, 0.88));
  padding: 12px;
  transform: translateY(-50%);
  box-shadow:
    0 14px 42px rgba(0, 0, 0, 0.46),
    inset 0 0 0 1px rgba(255, 255, 255, 0.07);
}

.version-button {
  color: #f4d98b;
  cursor: pointer;
  font: inherit;
}

.version-list {
  display: grid;
  gap: 8px;
}

.version-button {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  border: 1px solid rgba(218, 187, 105, 0.42);
  background: rgba(9, 9, 14, 0.72);
  padding: 8px 9px;
}

.version-marker {
  flex: 0 0 auto;
  width: 11px;
  height: 11px;
  border: 1px solid rgba(244, 217, 139, 0.72);
  background: rgba(218, 187, 105, 0.18);
  transform: rotate(45deg);
}

.version-button[aria-current='step'] {
  border-color: rgba(244, 217, 139, 0.96);
  background: rgba(218, 187, 105, 0.28);
  box-shadow: 0 0 18px rgba(218, 187, 105, 0.45);
}

.version-button[aria-current='step'] .version-marker {
  background: #f4d98b;
}

.version-label {
  color: #f4e8c3;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.version-button:hover,
.version-button:focus-visible {
  background: rgba(218, 187, 105, 0.2);
  outline: none;
}

@media (max-width: 900px) {
  .image-version-menu {
    right: 10px;
    width: 104px;
    padding: 9px;
  }
}
</style>
