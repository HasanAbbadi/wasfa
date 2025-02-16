<script setup lang="ts">
import ModalComponent from '@/components/common/ModalComponent.vue'
import MyButton from '@/components/common/MyButton.vue'
import { defineProps, ref } from 'vue'

const modal = ref()

const emit = defineEmits(['deleteRecipe'])

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
  emit('deleteRecipe')
}
</script>

<template>
  <div class="recipe-actions">
    <my-button class="secondary">Print</my-button>
    <my-button class="secondary">Edit</my-button>
    <my-button class="secondary danger" @click="onOpen">Delete</my-button>
  </div>
  <ModalComponent @close="onClose" ref="modal">
    <template #modal-body>
      <h3>Are you sure?</h3>
      <p>Once deleted, there is no going back.</p>
    </template>
    <template #modal-footer>
      <my-button class="secondary" type="button" @click="onClose">Cancel</my-button>
      <my-button class="secondary danger" type="button" @click="onDelete">Delete</my-button>
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
  border: 1px solid var(--color-secondary);
}

.recipe-actions .m3-button-content {
  padding: 1em 0.5em;
}
</style>
