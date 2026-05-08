<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ImageVersionMenu, { type ImageVersion } from './ImageVersionMenu.vue'
import ImageVersionSliderMenu from './ImageVersionSliderMenu.vue'

const props = withDefaults(
  defineProps<{
    pageName: string
    versions: readonly [ImageVersion, ...ImageVersion[]]
    ariaLabel?: string
    // Choisit entre boutons ou slider.
    controls?: 'buttons' | 'slider'
  }>(),
  {
    controls: 'buttons',
  },
)

// Garde l'étape de l'image affichée.
const imageProgress = ref(0)
const hasSliderControls = computed(() => props.controls === 'slider')
const activeImageIndex = computed(() => {
  // Pour le slider, on prend l'image la plus proche.
  return clamp(Math.round(imageProgress.value), 0, props.versions.length - 1)
})
const activeImage = computed<ImageVersion>(() => props.versions[activeImageIndex.value] ?? props.versions[0])

onMounted(() => {
  // Charge les images avant pour éviter un flash.
  props.versions.forEach((version) => {
    const image = new Image()
    image.src = version.image
  })
})

function selectImageVersion(index: number) {
  // Empêche de dépasser la première ou la dernière image.
  imageProgress.value = clamp(index, 0, props.versions.length - 1)
}

function getImageOpacity(index: number) {
  if (!hasSliderControls.value) {
    return index === activeImageIndex.value ? 1 : 0
  }

  // Avec le slider, deux images peuvent être visibles en même temps.
  return clamp(1 - Math.abs(index - imageProgress.value), 0, 1)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
</script>

<template>
  <article class="image-version-page">
    <!-- Pour le slider, les images sont empilées. -->
    <div v-if="hasSliderControls" class="page-image-stack">
      <img
        v-for="(version, index) in versions"
        :key="version.image"
        class="page-image page-image--crossfade"
        :style="{ opacity: getImageOpacity(index) }"
        :src="version.image"
        :alt="index === activeImageIndex ? `${pageName} - ${version.label}` : ''"
        :aria-hidden="index === activeImageIndex ? undefined : 'true'"
      />
    </div>

    <!-- Avec les boutons, une seule image s'affiche. -->
    <img
      v-else
      class="page-image"
      :src="activeImage.image"
      :alt="`${pageName} - ${activeImage.label}`"
    />

    <ImageVersionMenu
      v-if="controls === 'buttons'"
      :versions="versions"
      :active-index="activeImageIndex"
      :aria-label="ariaLabel"
      @select="selectImageVersion"
    />

    <ImageVersionSliderMenu
      v-else
      :versions="versions"
      :active-index="imageProgress"
      :aria-label="ariaLabel"
      @select="selectImageVersion"
    />
  </article>
</template>

<style scoped>
.image-version-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #11100e;
}

.page-image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-image-stack {
  position: absolute;
  inset: 0;
}

.page-image--crossfade {
  transition: opacity 80ms linear;
}
</style>
