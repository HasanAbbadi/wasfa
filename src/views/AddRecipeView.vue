<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes'
import MultiSelect from '@/components/MultiSelect.vue'
import AddOrderedInputs from '@/components/AddOrderedInputs.vue'
import AddIngredients from '@/components/AddIngredients.vue'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import type { recipeType } from '@/types'

const emit = defineEmits(['panelContent'])

const recipesStore = useRecipesStore()

const name = ref('')
const description = ref('')
const prepTime = ref(0)
const cookTime = ref(0)
const servings = ref(0)
const tagsSelected = ref([])
const ingredients = ref([{}])
const instructions = ref([''])
const notes = ref([''])

const tagsOptions = recipesStore.tags

// Load draft from localStorage
onMounted(() => {
  const draft = JSON.parse(localStorage.getItem('recipe-draft') || '{}')
  if (Object.keys(draft).length) {
    name.value = draft.name || ''
    description.value = draft.description || ''
    prepTime.value = draft.prepTime || 0
    cookTime.value = draft.cookTime || 0
    servings.value = draft.servings || 0
    tagsSelected.value = draft.tags || []
    ingredients.value = draft.ingredients || []
    instructions.value = draft.instructions || []
    notes.value = draft.notes || []
  }

  emit('panelContent', { source: 'addRecipe', value: draft })
})

// Watch for changes and save to localStorage
watch(
  [name, description, prepTime, cookTime, servings, tagsSelected, ingredients, instructions, notes],
  () => {
    const draft = {
      name: name.value,
      description: description.value,
      prepTime: prepTime.value,
      cookTime: cookTime.value,
      servings: servings.value,
      tags: tagsSelected.value,
      ingredients: ingredients.value,
      instructions: instructions.value,
      notes: notes.value,
    }
    localStorage.setItem('recipe-draft', JSON.stringify(draft))
    emit('viewDraft', draft)
  },
  { deep: true },
)

// Handle form submission
const onSubmit = () => {
  const recipe: recipeType = {
    id: 0,
    name: name.value,
    description: description.value,
    prepTime: prepTime.value,
    cookTime: cookTime.value,
    servings: servings.value,
    image: '',
    tags: tagsSelected.value,
    ingredients: ingredients.value,
    instructions: instructions.value,
    notes: notes.value,
  }

  recipesStore.addRecipe(recipe)

  // Clear draft from localStorage
  localStorage.removeItem('recipe-draft')

  // Reset form fields
  name.value = ''
  description.value = ''
  prepTime.value = 0
  cookTime.value = 0
  servings.value = 0
  tagsSelected.value = []
  ingredients.value = []
  instructions.value = []
  notes.value = []
}
</script>

<template>
  <div class="header">
    <h1>Add Recipe</h1>
  </div>

  <div class="form body">
    <form @submit.prevent="onSubmit">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" required v-model="name" />
      <div class="error-message" id="name-error"></div>

      <label for="description">Description</label>
      <textarea name="description" id="description" v-model="description"></textarea>

      <div class="number-input-group">
        <div>
          <label for="prepTime">Prep Time</label>
          <input type="number" name="prepTime" id="prepTime" v-model="prepTime" />
        </div>
        <div>
          <label for="cookTime">Cook Time</label>
          <input type="number" name="cookTime" id="cookTime" v-model="cookTime" />
        </div>
        <div>
          <label for="servings">Servings</label>
          <input type="number" name="servings" id="servings" v-model="servings" />
        </div>
      </div>

      <label for="image">Image</label>
      <input type="file" name="image" id="image" />

      <label for="tags">Tags</label>
      <MultiSelect v-model="tagsSelected" :options="tagsOptions" />

      <label for="ingredients">Ingredients</label>
      <AddIngredients v-model="ingredients" />

      <label for="instructions">Instructions</label>
      <AddOrderedInputs v-model="instructions" />

      <label for="notes">Notes</label>
      <AddOrderedInputs v-model="notes" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
form {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: auto;
}

input,
textarea {
  margin: 0;
}

label {
  margin: 0;
  margin-inline-start: 1em;
}

.number-input-group {
  display: flex;
  gap: 1em;
}

button {
  margin-top: 1em;
  font-size: var(--font-size-large);
  width: 100%;
}
</style>
