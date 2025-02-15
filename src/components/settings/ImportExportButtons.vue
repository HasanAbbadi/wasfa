<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes'
import ModalComponent from '@/components/common/ModalComponent.vue'
import { ref } from 'vue'
import type { recipeType } from '@/types'

const firstModal = ref()
const secondModal = ref()
const newRecipes = ref([] as recipeType[])
const method = ref<'replace' | 'append'>('append')
const isDuplicates = ref<recipeType['id'][]>([])
const error = ref('')
const isOverwrite = ref(false)

const recipesStore = useRecipesStore()

const openFirstModal = () => {
  firstModal.value?.open()
}

const onImport = (m: 'replace' | 'append') => {
  method.value = m
  firstModal.value?.close()
  promptForImport()
}

const promptForImport = () => {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = '.json'
  fileInput.onchange = () => {
    const file = fileInput.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const json = reader.result as string
          const recipes = JSON.parse(json)
          if (!Array.isArray(recipes)) {
            throw new Error('The file does not contain an array of recipes')
          }
          // TODO: Proper validation
          const isRecipes = recipes.every((r: unknown) => r)
          if (!isRecipes) {
            throw new Error(
              'The file does not contain an array of recipes with the expected fields',
            )
          }

          isDuplicates.value = recipesStore.recipes
            .filter((r: recipeType) => recipes.some((r2: recipeType) => r2.id === r.id))
            .map((r: recipeType) => r.id)

          newRecipes.value = recipes
        } catch (err) {
          let message = 'Unknown Error'
          if (err instanceof Error) message = err.message

          error.value = message
          console.error(err)
          newRecipes.value = []
        }
        secondModal.value?.open()
      }
      reader.readAsText(file)
    }
  }
  fileInput.click()
}

const onConfirmImport = () => {
  secondModal.value?.open()
  if (method.value === 'append') {
    if (!isOverwrite.value) {
      newRecipes.value = newRecipes.value.filter(
        (r: recipeType) => !isDuplicates.value.includes(r.id),
      )
    } else {
      const oldRecipes = recipesStore.recipes.filter(
        (r: recipeType) => !isDuplicates.value.includes(r.id),
      )
      newRecipes.value = [...oldRecipes, ...newRecipes.value]
    }
  }
  recipesStore.setRecipes(newRecipes.value)
}

const onCancelImport = () => {
  secondModal.value?.close()
  newRecipes.value = []
}

const onExport = () => {
  const recipes = recipesStore.recipes
  const json = JSON.stringify(recipes, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'recipes.json'
  a.click()
  URL.revokeObjectURL(url)
  a.remove()
}
</script>

<template>
  <div class="import-export-buttons">
    <!-- Import recipes from json file -->
    <button class="secondary" type="button" @click="openFirstModal">Import recipes</button>

    <!-- Export recipes to json file -->
    <button class="secondary" type="button" @click="onExport">Export recipes</button>
  </div>

  <ModalComponent ref="firstModal">
    <template #modal-body>
      <h3>Import Recipes</h3>
      <p>
        Important: Before importing new recipes, make sure to export your current recipes to a json
        file.
      </p>
    </template>
    <template #modal-footer>
      <button class="secondary danger" type="button" @click="onImport('replace')">Replace</button>
      <button class="secondary" type="button" @click="onImport('append')">Append</button>
    </template>
  </ModalComponent>

  <ModalComponent ref="secondModal">
    <template v-if="newRecipes.length > 0" #modal-body>
      <h3>{{ newRecipes.length }} Recipes found!</h3>
      <p v-if="method === 'append'">
        You will have a total of {{ newRecipes.length + recipesStore.recipes.length }} recipes.
      </p>
      <p v-else>Are you sure you want to replace all your recipes?</p>
      <div v-if="isDuplicates.length > 0" class="duplicate-info">
        <h4>{{ isDuplicates.length }} Duplicates found:</h4>
        <ul>
          <li v-for="id in isDuplicates.slice(0, 9)" :key="id">
            <span>{{ recipesStore.recipes.find((r: recipeType) => r.id === id)?.name }}</span>
          </li>
        </ul>
        <div class="action">
          <input type="checkbox" v-model="isOverwrite" value="false" id="overwrite" />
          <label for="overwrite">Overwrite conflicting recipes (otherwise skip)</label>
        </div>
      </div>
    </template>

    <template v-else #modal-body>
      <h3>No Recipes found!</h3>
      <p>Make sure your file adheres to the recipe json specification.</p>
      <p v-if="error"><span>Error: </span> {{ error }}</p>
    </template>

    <template v-if="newRecipes.length > 0" #modal-footer>
      <button class="secondary" type="button" @click="onCancelImport()">Cancel</button>
      <button class="secondary" type="button" @click="onConfirmImport()">Confirm</button>
    </template>

    <template v-else #modal-footer>
      <button class="secondary" type="button" @click="onCancelImport()">Ok</button>
    </template>
  </ModalComponent>
</template>

<style>
.import-export-buttons {
  display: flex;
  gap: 1em;
  padding: 1em 2em;
}

.import-export-buttons button {
  flex: 1;
}

.duplicate-info {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.duplicate-info h4 {
  margin: 0;
  font-size: var(--font-size-small);
}

.duplicate-info ul {
  margin: 0;
  padding-inline-start: 1em;
  font-size: var(--font-size-small);
}

.duplicate-info ul,
.duplicate-info h4 {
  opacity: 0.7;
}

.duplicate-info .action {
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
  gap: 0.3em;
  user-select: none;
}

.overwrite {
  margin: 0;
  padding: 0;
}
</style>
