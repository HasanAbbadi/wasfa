<script setup lang="ts">
import { type PropType, onMounted, ref, watch, computed } from 'vue'
import MultiSelect from '@/components/common/MultiSelect.vue'
import AddOrderedInputs from '@/components/recipes/AddOrderedInputs.vue'
import AddIngredients from '@/components/recipes/AddIngredients.vue'
import type { ingredientType, recipeType } from '@/types'
import { useRecipesStore } from '@/stores/recipes'

const props = defineProps({
  initialRecipe: {
    type: Object as PropType<recipeType | null>,
    default: null,
  },
  draftKey: {
    type: String,
    default: 'recipe-draft',
  },
})

const emit = defineEmits(['submit', 'change'])

const recipeStore = useRecipesStore()

// Form fields
const name = ref('')
const description = ref('')
const prepTime = ref(0)
const cookTime = ref(0)
const servings = ref(0)
const tagsOptions = computed(() => recipeStore.tags)
const tagsSelected = ref<string[]>([])
const ingredients = ref<ingredientType[]>([{ name: '' }])
const instructions = ref([''])
const notes = ref([''])

// Initialize form
const initializeForm = () => {
  const draft = JSON.parse(localStorage.getItem(props.draftKey) || '{}')
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
  } else if (props.initialRecipe) {
    name.value = props.initialRecipe.name
    description.value = props.initialRecipe.description || ''
    prepTime.value = props.initialRecipe.prepTime || 0
    cookTime.value = props.initialRecipe.cookTime || 0
    servings.value = props.initialRecipe.servings || 0
    tagsSelected.value = props.initialRecipe.tags || []
    ingredients.value = props.initialRecipe.ingredients || []
    instructions.value = props.initialRecipe.instructions || []
    notes.value = props.initialRecipe.notes || []
  }
}

onMounted(initializeForm)

// Save draft
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
    localStorage.setItem(props.draftKey, JSON.stringify(draft))
    emit('change', draft)
  },
  { deep: true },
)

// Form submission
const onSubmit = () => {
  const recipe: recipeType = {
    id: props.initialRecipe?.id || 0,
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

  emit('submit', recipe)
  localStorage.removeItem(props.draftKey)
}
</script>

<template>
  <div class="form body">
    <form @submit.prevent="onSubmit">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" required v-model="name" />

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
