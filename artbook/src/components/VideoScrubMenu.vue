<script setup lang="ts">
defineEmits<{
  scrub: [event: WheelEvent]
}>()
</script>

<template>
  <Teleport defer to="#artbook-version-controls">
    <div
      class="video-scrub-menu artbook-panel"
      @wheel.prevent.stop="$emit('scrub', $event)"
    >
      <p class="video-instruction artbook-ui-label">
        Utilise la molette de la souris pour avancer et reculer la vid&eacute;o
      </p>
    </div>
  </Teleport>
</template>

<style scoped>
.video-scrub-menu {
  display: grid;
  align-items: center;
  width: fit-content;
  max-width: min(48vw, clamp(380px, 46vh, 720px));
  padding: clamp(5px, 0.74vh, 12px) clamp(10px, 1.15vh, 16px);
}

.video-instruction {
  line-height: 1.15;
  text-align: center;
  text-wrap: balance;
}

@media (max-width: 900px) {
  .video-scrub-menu {
    max-width: min(48vw, 360px);
    padding: var(--artbook-panel-padding-sm) clamp(8px, 1vh, 12px);
  }

  .video-instruction {
    --artbook-label-size: 0.68rem;
  }
}
</style>
