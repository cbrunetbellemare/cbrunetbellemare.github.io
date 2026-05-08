<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import ArtbookLayout from './layouts/ArtbookLayout.vue'
import { artbookRoutes, fallbackRoute } from './router/artbookRoutes'
import { useSimpleRouter } from './composables/useSimpleRouter'
import { useUnlockedPages } from './composables/useUnlockedPages'

const { currentPath, navigateTo } = useSimpleRouter()
const { isPageAccessible, unlockNextPage } = useUnlockedPages()

const activeRoute = computed(() => {
  return artbookRoutes.find((route) => route.path === currentPath.value) ?? fallbackRoute
})

watchEffect(() => {
  // App.vue joue le rôle de gardien: il corrige les routes inconnues et bloque les pages verrouillées.
  const route = activeRoute.value

  if (route.path !== currentPath.value) {
    navigateTo(route.path, true)
    return
  }

  if (!isPageAccessible(route.page.id)) {
    navigateTo(fallbackRoute.path, true)
    return
  }

  // Lire une page débloque automatiquement la suivante pour créer une progression guidée.
  unlockNextPage(route.page.id)
})
</script>

<template>
  <!-- Le layout reste commun, tandis que le composant de page change selon la route active. -->
  <ArtbookLayout :page="activeRoute.page">
    <component :is="activeRoute.component" :page="activeRoute.page" />
  </ArtbookLayout>
</template>
