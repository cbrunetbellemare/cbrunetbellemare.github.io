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
  // Vérifie si la page demandée existe et si elle est débloquée.
  const route = activeRoute.value

  if (route.path !== currentPath.value) {
    navigateTo(route.path, true)
    return
  }

  if (!isPageAccessible(route.page.id)) {
    navigateTo(fallbackRoute.path, true)
    return
  }

  // Quand une page est vue, la prochaine devient disponible.
  unlockNextPage(route.page.id)
})
</script>

<template>
  <!-- Le cadre reste pareil, seulement la page change. -->
  <ArtbookLayout :page="activeRoute.page">
    <component :is="activeRoute.component" :page="activeRoute.page" />
  </ArtbookLayout>
</template>
