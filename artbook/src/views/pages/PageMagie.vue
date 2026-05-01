<script setup lang="ts">
import ArtbookImagePage from '../../components/ArtbookImagePage.vue'
import type { ArtbookPage } from '../../data/artbookPages'

defineProps<{
  page: ArtbookPage
}>()
</script>

<template>
  <ArtbookImagePage :image="page.pageImage" :name="page.name" />
</template>
