<template>
  <div class="not-found">
    <div>
      <NotFoundSvg />
      <h3>404 Not Found</h3>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotFoundSvg from '@/components/icons/NotFoundSvg.vue'
</script>

<style scoped>
.not-found {
  display: grid;
  place-items: center;
  gap: 1em;
}

.not-found div {
  text-align: center;
}

.not-found h3,
.not-found h4,
.not-found p {
  font-size: var(--font-size-large);
}

.not-found svg {
  width: 128px;
  max-width: 400px;
  color: var(--color-text);
  opacity: 0.6;
}
</style>
