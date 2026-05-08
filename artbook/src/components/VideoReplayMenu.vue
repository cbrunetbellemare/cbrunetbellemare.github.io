<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { Icons } from '../icons'

defineEmits<{
  replay: []
}>()
</script>

<template>
  <!-- Bouton pour lancer ou relancer la vidéo. -->
  <Teleport defer to="#artbook-version-controls">
    <div class="video-replay-menu artbook-panel">
      <button
        class="replay-control artbook-menu-button artbook-hover-highlight"
        type="button"
        aria-label="Voir la video"
        @click="$emit('replay')"
      >
        <SvgIcon
          class="artbook-menu-svg"
          type="mdi"
          :path="Icons.Play"
          :size="18"
          aria-hidden="true"
        />
        <span class="artbook-ui-label">Voir la vid&eacute;o</span>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.video-replay-menu {
  display: grid;
  align-items: center;
  width: fit-content;
  padding: var(--artbook-panel-padding-sm);
}

.replay-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--artbook-control-gap);
  padding: var(--artbook-menu-button-padding);
}
</style>
