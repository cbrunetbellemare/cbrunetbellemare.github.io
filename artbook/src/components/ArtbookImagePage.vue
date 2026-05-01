<script setup lang="ts">
defineProps<{
  image: string
  name: string
}>()
</script>

<template>
  <article class="art-page">
    <img class="page-image" :src="image" :alt="name" />
  </article>
</template>

<style scoped>
.art-page {
  width: 100%;
  height: 100%;
}

.page-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
