<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  id: number
}>()
</script>

<template>
  <div class="recipe-actions">
    <h4>Recipe Actions</h4>
    <button class="secondary">Print</button>
    <button class="secondary">Edit</button>
    <button class="secondary danger">Delete</button>
  </div>
</template>

<style>
.recipe-actions {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em 2em;
}

.recipe-actions button {
  flex: 1;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-large);
  padding: 1em 0.5em;
  border: 1px solid var(--color-secondary);
}
</style>
