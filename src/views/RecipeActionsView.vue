<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import SnackBar from '@/components/SnackBar.vue'
import { defineProps, ref } from 'vue'

const isClosed = ref(true)
const snackbar = ref()

defineProps<{
  id: number
}>()

const onDelete = () => {
  isClosed.value = true
  snackbar.value?.show()
}
</script>

<template>
  <div class="recipe-actions">
    <h4>Recipe Actions</h4>
    <button class="secondary">Print</button>
    <button class="secondary">Edit</button>
    <button class="secondary danger" @click="isClosed = false">Delete</button>
  </div>
  <SnackBar message="Recipe Deleted Sucessfully!" ref="snackbar" />
  <ModalComponent @close="isClosed = true" v-model="isClosed" v-if="!isClosed">
    <template #modal-body>
      <h3>Are you sure?</h3>
      <p>Once deleted, there is no going back.</p>
    </template>
    <template #modal-footer>
      <button class="secondary" type="button" @click="isClosed = true">Cancel</button>
      <button class="secondary danger" type="button" @click="onDelete">Delete</button>
    </template>
  </ModalComponent>
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
