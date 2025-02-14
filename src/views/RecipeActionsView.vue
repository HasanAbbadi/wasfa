<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import SnackBar from '@/components/SnackBar.vue'
import { defineProps, ref } from 'vue'

const modal = ref()
const snackbar = ref()

defineProps<{
  id: number
}>()

const onOpen = () => {
  modal.value?.open()
}

const onClose = () => {
  modal.value?.close()
}

const onDelete = () => {
  modal.value?.close()
  snackbar.value?.show()
}
</script>

<template>
  <div class="recipe-actions">
    <button class="secondary">Print</button>
    <button class="secondary">Edit</button>
    <button class="secondary danger" @click="onOpen">Delete</button>
  </div>
  <SnackBar message="Recipe Deleted Sucessfully!" ref="snackbar" />
  <ModalComponent @close="onClose" ref="modal">
    <template #modal-body>
      <h3>Are you sure?</h3>
      <p>Once deleted, there is no going back.</p>
    </template>
    <template #modal-footer>
      <button class="secondary" type="button" @click="onClose">Cancel</button>
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
