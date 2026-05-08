<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ImageVersionMenu, { type ImageVersion } from './ImageVersionMenu.vue'
import ImageVersionSliderMenu from './ImageVersionSliderMenu.vue'

const props = withDefaults(
  defineProps<{
    pageName: string
    versions: readonly [ImageVersion, ...ImageVersion[]]
    ariaLabel?: string
    // Le même composant supporte deux expériences: menu à boutons ou slider continu.
    controls?: 'buttons' | 'slider'
  }>(),
  {
    controls: 'buttons',
  },
)

// Ce composant sert à toutes les pages "étapes" pour éviter de répéter la même logique.
// En mode slider, cette valeur peut être décimale afin de mélanger deux étapes voisines.
const imageProgress = ref(0)
const hasSliderControls = computed(() => props.controls === 'slider')
const activeImageIndex = computed(() => {
  // Les textes alternatifs et l'état actif restent associés à l'étape la plus proche.
  return clamp(Math.round(imageProgress.value), 0, props.versions.length - 1)
})
const activeImage = computed<ImageVersion>(() => props.versions[activeImageIndex.value] ?? props.versions[0])

onMounted(() => {
  // Les images des étapes sont préchargées pour rendre le changement visuel plus fluide.
  props.versions.forEach((version) => {
    const image = new Image()
    image.src = version.image
  })
})

function selectImageVersion(index: number) {
  // Le clamp protège contre les valeurs hors limites venant du slider ou d'un bouton.
  imageProgress.value = clamp(index, 0, props.versions.length - 1)
}

function getImageOpacity(index: number) {
  if (!hasSliderControls.value) {
    return index === activeImageIndex.value ? 1 : 0
  }

  // Plus le slider est proche d'une étape, plus cette image devient visible.
  // Entre deux étapes, les deux images partagent l'opacité pour créer un vrai crossfade.
  return clamp(1 - Math.abs(index - imageProgress.value), 0, 1)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
</script>

<template>
  <article class="image-version-page">
    <!-- Le mode slider garde toutes les images superposées pour permettre un mélange continu. -->
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

    <!-- Le mode boutons affiche une seule image à la fois, comme dans le comportement original. -->
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
