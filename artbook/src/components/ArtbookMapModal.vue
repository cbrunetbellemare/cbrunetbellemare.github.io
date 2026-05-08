<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import type { ArtbookPage } from '../data/artbookPages'
import { Icons } from '../icons'

defineProps<{
  page: ArtbookPage
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <!-- La modale est téléportée dans body pour passer au-dessus du zoom et de la page courante. -->
  <Teleport to="body">
    <div class="map-modal-backdrop" role="presentation" @click.self="$emit('close')">
      <section class="map-modal" role="dialog" aria-modal="true" :aria-label="`Carte - ${page.name}`">
        <!-- La carte garde son format 5:4 original et occupe une grande partie de l'écran. -->
        <img class="map-image" :src="page.mapImage" :alt="`Carte associée à ${page.name}`" />

        <button
          class="close-map-button"
          type="button"
          aria-label="Fermer la carte"
          title="Fermer la carte"
          @click="$emit('close')"
        >
          <SvgIcon class="close-map-icon" type="mdi" :path="Icons.Close" :size="20" aria-hidden="true" />
        </button>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.map-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.72);
  padding: clamp(18px, 3vw, 56px);
}

.map-modal {
  position: relative;
  width: min(88vw, calc(86vh * 5 / 4));
  aspect-ratio: 5 / 4;
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.58);
  background: #0b0a09;
  box-shadow:
    0 26px 86px rgba(0, 0, 0, 0.78),
    0 0 0 8px rgba(4, 4, 9, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.map-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #08080c;
}

.close-map-button {
  position: absolute;
  right: clamp(10px, 1.1vh, 16px);
  top: clamp(10px, 1.1vh, 16px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(30px, 3vh, 46px);
  height: clamp(30px, 3vh, 46px);
  border: 1px solid rgba(var(--artbook-gold-bright-rgb), 0.62);
  background: rgba(0, 0, 0, 0.55);
  color: var(--artbook-gold);
  cursor: pointer;
  padding: 0;
}

.close-map-button:hover,
.close-map-button:focus-visible {
  background: rgba(0, 0, 0, 0.75);
  outline: none;
}

.close-map-icon {
  width: clamp(17px, 1.85vh, 28px);
  height: clamp(17px, 1.85vh, 28px);
}

@media (max-width: 900px) {
  .map-modal {
    width: min(94vw, calc(82vh * 5 / 4));
  }
}
</style>
