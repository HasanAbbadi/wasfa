<script setup lang="ts">
import ModalComponent from '@/components/common/ModalComponent.vue'
import MyButton from '@/components/common/MyButton.vue'
import DropdownButton from '@/components/common/DropdownButton.vue'
import { defineProps, ref } from 'vue'
import IconDown from '@/components/icons/IconDown.vue'
import { useRecipesStore } from '@/stores/recipes'
import { useSnackbarStore } from '@/stores/snackbar'
import { usePanelStore } from '@/stores/panel'
import type { ingredientType } from '@/types'
import IconPrint from '@/components/icons/IconPrint.vue'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import { useRouter } from 'vue-router'

const modal = ref()

const emit = defineEmits(['deleteRecipe'])
const recipesStore = useRecipesStore()
const snackbarStore = useSnackbarStore()
const panelStore = usePanelStore()

const props = defineProps<{
  id: number
}>()

const onOpen = () => {
  modal.value?.open()
}

const onClose = () => {
  modal.value?.close()
}

const arrayToMarkdown = (array: string[]) => {
  return array.map((item, index) => `${index + 1}. ${item}`).join('\n')
}

const ingredientsToMarkdown = (array: ingredientType[]) => {
  return array.map((item) => `- ${item.quantity} ${item.unit} ${item.name}`).join('\n')
}

const onPrint = () => {
  window.open(`/print/${props?.id}`, '_blank')
}

const Router = useRouter()
const onEdit = () => {
  Router.push({
    name: 'edit-recipe',
    params: {
      id: props?.id,
    },
  })
}

const onCopy = (method: 'md' | 'md+format' | 'json' | 'image' = 'md') => {
  const recipe = recipesStore.getRecipeById(props?.id)
  if (!recipe) return
  let output = ''
  switch (method) {
    case 'md':
      output = `
![image](${recipe.previewImage})

# ${recipe.name}
${recipe.description}

## Ingredients
${ingredientsToMarkdown(recipe.ingredients || [])}

## Instructions
${arrayToMarkdown(recipe.instructions || [])}

## Notes
${arrayToMarkdown(recipe.notes || [])}
      `
      break
    case 'json':
      output = JSON.stringify(recipe)
      break
    case 'image':
      break
  }

  navigator.clipboard.writeText(output)
  if (panelStore.isMobile) panelStore.collapse()
  snackbarStore.show('Recipe was copied to clipboard!')
}

const onDelete = () => {
  modal.value?.close()
  emit('deleteRecipe', props?.id)
}
</script>

<template>
  <div class="recipe-actions">
    <dropdown-button class="dropdown-btn">
      <template #main-button>
        <my-button class="secondary" @click="onCopy('md')">
          <template #icon><IconCopy /> </template>
          Copy</my-button
        >
      </template>
      <template #icon>
        <IconDown />
      </template>
      <template #dropdown-content>
        <my-button class="info" @click="onCopy('json')">Copy as JSON</my-button>
      </template>
    </dropdown-button>
    <my-button class="secondary" @click="onPrint">
      <template #icon><IconPrint /> </template>
      Print
    </my-button>
    <my-button class="secondary" @click="onEdit">
      <template #icon><IconEdit /> </template>
      Edit</my-button
    >
    <my-button class="secondary danger" @click="onOpen">
      <template #icon><IconDelete /> </template>
      Delete</my-button
    >
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
  font-size: var(--font-size-medium);
  border: 1px solid var(--color-secondary);
}

.recipe-actions .m3-button-content {
  padding: 1em 0.5em;
  padding: 1em 0.5em;
  display: grid;
  grid-template-columns: 1fr 20px minmax(80px, 0.25fr) 1fr;
  align-items: center;
}
.recipe-actions .m3-button-content svg {
  grid-column: 2;
  justify-self: end;
}

.recipe-actions .dropdown-btn {
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius);
}
.recipe-actions .dropdown-btn .main-btn-container button {
  border: none;
  border-right: 1px solid var(--color-secondary);
  border-radius: 0;
}
</style>
