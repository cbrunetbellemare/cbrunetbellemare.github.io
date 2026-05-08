<script setup lang="ts">
// Modale de confirmation avant de débloquer toutes les pages.
import SvgIcon from '@jamescoyle/vue-icon'
import { Icons } from '../icons'

defineEmits<{
  close: []
  unlock: []
}>()
</script>

<template>
  <!-- Demande une confirmation avant de tout débloquer. -->
  <Teleport to="body">
    <div class="unlock-modal-backdrop" role="presentation" @click.self="$emit('close')">
      <section class="unlock-modal" role="dialog" aria-modal="true" aria-label="Débloquer toutes les pages">
        <div class="unlock-content">
          <SvgIcon class="unlock-icon" type="mdi" :path="Icons.LockOpen" :size="36" aria-hidden="true" />

          <p class="unlock-message">
            Si c’est votre première visite, je vous conseille de lire les pages en ordre.
            Voulez-vous débloquer toutes les pages ?
          </p>

          <div class="unlock-actions">
            <button class="unlock-action unlock-action--secondary" type="button" @click="$emit('close')">
              Annuler
            </button>
            <button class="unlock-action unlock-action--primary" type="button" @click="$emit('unlock')">
              Débloquer
            </button>
          </div>
        </div>

        <button
          class="close-unlock-button"
          type="button"
          aria-label="Fermer"
          title="Fermer"
          @click="$emit('close')"
        >
          <SvgIcon class="close-unlock-icon" type="mdi" :path="Icons.Close" :size="20" aria-hidden="true" />
        </button>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.unlock-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.72);
  padding: clamp(18px, 3vw, 56px);
}

.unlock-modal {
  position: relative;
  width: min(88vw, 640px);
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.58);
  background:
    linear-gradient(180deg, rgba(31, 31, 42, 0.98), rgba(8, 8, 14, 0.98));
  box-shadow:
    0 26px 86px rgba(0, 0, 0, 0.78),
    0 0 0 8px rgba(4, 4, 9, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.unlock-content {
  display: grid;
  justify-items: center;
  gap: clamp(16px, 2vh, 26px);
  padding: clamp(34px, 4.8vh, 64px) clamp(28px, 4vw, 58px) clamp(28px, 3.8vh, 48px);
  text-align: center;
}

.unlock-icon {
  width: clamp(34px, 4vh, 56px);
  height: clamp(34px, 4vh, 56px);
  color: var(--artbook-gold);
  filter: drop-shadow(var(--artbook-active-glow));
}

.unlock-message {
  color: var(--artbook-text-warm);
  font-size: clamp(1rem, 1.45vh, 1.28rem);
  line-height: 1.45;
  max-width: 46ch;
  text-wrap: balance;
}

.unlock-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(10px, 1.3vh, 16px);
}

.unlock-action {
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.62);
  background: rgba(9, 9, 14, 0.72);
  color: var(--artbook-text-warm);
  cursor: pointer;
  font: inherit;
  font-size: clamp(0.78rem, 1.05vh, 1.08rem);
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
  padding: clamp(9px, 1vh, 14px) clamp(16px, 1.8vh, 28px);
  text-transform: uppercase;
}

.unlock-action:hover,
.unlock-action:focus-visible {
  background: rgba(var(--artbook-gold-rgb), 0.18);
  outline: none;
}

.unlock-action--primary {
  border-color: rgba(var(--artbook-gold-bright-rgb), 0.9);
  background: rgba(var(--artbook-gold-rgb), 0.22);
  color: var(--artbook-gold);
  box-shadow: var(--artbook-active-glow);
}

.close-unlock-button {
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

.close-unlock-button:hover,
.close-unlock-button:focus-visible {
  background: rgba(0, 0, 0, 0.75);
  outline: none;
}

.close-unlock-icon {
  width: clamp(17px, 1.85vh, 28px);
  height: clamp(17px, 1.85vh, 28px);
}
</style>
