<script setup lang="ts">
import { type PropType, onMounted, ref, watch, computed } from 'vue'
import MultiSelect from '@/components/common/MultiSelect.vue'
import AddOrderedInputs from '@/components/recipes/AddOrderedInputs.vue'
import AddIngredients from '@/components/recipes/AddIngredients.vue'
import type { ingredientType, recipeType } from '@/types'
import { useRecipesStore } from '@/stores/recipes'
import MyButton from '../common/MyButton.vue'

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

// Progress tracking
const progress = computed(() => {
  let total = 4
  let completed = 0

  completed = activeSection.value == 'basic' ? 0 : completed
  completed = activeSection.value == 'tags' ? 1 : completed
  completed = activeSection.value == 'ingredients' ? 2 : completed
  completed = activeSection.value == 'instructions' ? 3 : completed
  completed = activeSection.value == 'notes' ? 4 : completed

  return Math.round((completed / total) * 100)
})

// Active section tracking
const activeSection = ref('basic') // basic, tags, ingredients, instructions, notes

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

// Section navigation
const nextSection = () => {
  switch (activeSection.value) {
    case 'basic':
      activeSection.value = 'tags'
      break
    case 'tags':
      activeSection.value = 'ingredients'
      break
    case 'ingredients':
      activeSection.value = 'instructions'
      break
    case 'instructions':
      activeSection.value = 'notes'
      break
  }
}

const prevSection = () => {
  switch (activeSection.value) {
    case 'notes':
      activeSection.value = 'instructions'
      break
    case 'instructions':
      activeSection.value = 'ingredients'
      break
    case 'ingredients':
      activeSection.value = 'tags'
      break
    case 'tags':
      activeSection.value = 'basic'
      break
  }
}
</script>

<template>
  <div class="form-container body">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      <span class="progress-text">{{ progress }}% Complete</span>
    </div>

    <form @submit.prevent="onSubmit" class="recipe-form">
      <!-- Basic Information Section -->
      <div v-show="activeSection === 'basic'" class="form-section">
        <h2 class="section-title">Let's Start with the Basics! 🌟</h2>

        <div class="input-group">
          <label for="name">What's your recipe called?</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            v-model="name"
            placeholder="Something delicious..."
            class="fancy-input"
          />
        </div>

        <div class="input-group">
          <label for="description">Tell us about your creation!</label>
          <textarea
            name="description"
            id="description"
            v-model="description"
            placeholder="What makes this recipe special?"
            class="fancy-input"
          ></textarea>
        </div>

        <div class="number-input-group">
          <div class="time-input">
            <label for="prepTime">Prep Time (mins)</label>
            <input
              type="number"
              name="prepTime"
              id="prepTime"
              v-model="prepTime"
              class="fancy-input"
              min="0"
            />
          </div>
          <div class="time-input">
            <label for="cookTime">Cook Time (mins)</label>
            <input
              type="number"
              name="cookTime"
              id="cookTime"
              v-model="cookTime"
              class="fancy-input"
              min="0"
            />
          </div>
          <div class="servings-input">
            <label for="servings">Servings</label>
            <input
              type="number"
              name="servings"
              id="servings"
              v-model="servings"
              class="fancy-input"
              min="1"
            />
          </div>
        </div>
      </div>

      <!-- Tags Section -->
      <div v-show="activeSection === 'tags'" class="form-section">
        <h2 class="section-title">Categorize Your Recipe 🏷️</h2>
        <div class="input-group">
          <label for="tags">Add tags to organize your recipe</label>
          <MultiSelect v-model="tagsSelected" :options="tagsOptions" class="fancy-select" />
        </div>
      </div>

      <!-- Ingredients Section -->
      <div v-show="activeSection === 'ingredients'" class="form-section">
        <h2 class="section-title">What Goes Into It? 🥗</h2>
        <AddIngredients v-model="ingredients" class="ingredients-list" />
      </div>

      <!-- Instructions Section -->
      <div v-show="activeSection === 'instructions'" class="form-section">
        <h2 class="section-title">How Do We Make It? 👩‍🍳</h2>
        <AddOrderedInputs v-model="instructions" class="instructions-list" />
      </div>

      <!-- Notes Section -->
      <div v-show="activeSection === 'notes'" class="form-section">
        <h2 class="section-title">Any Special Tips? 💡</h2>
        <AddOrderedInputs v-model="notes" class="notes-list" />
      </div>

      <!-- Navigation Buttons -->
      <div class="form-navigation">
        <MyButton
          type="button"
          @click="prevSection"
          v-if="activeSection !== 'basic'"
          class="nav-button prev secondary"
        >
          ← Previous
        </MyButton>

        <MyButton
          type="button"
          @click="nextSection"
          v-if="activeSection !== 'notes'"
          class="nav-button next secondary"
        >
          Next →
        </MyButton>

        <MyButton type="submit" v-if="activeSection === 'notes'" class="submit-button">
          Save Recipe 🎉
        </MyButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  margin-top: 2rem;
  margin-inline: auto;
  padding: 2rem;
  border-radius: 1rem;
  overflow-y: hidden !important;
  width: 80%;
  height: 90%;

  @media (width < 768px) {
    width: 90%;
    padding-inline: 0;
    margin-bottom: 1.25rem;
  }
}

.progress-bar {
  position: relative;
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-fill {
  position: absolute;
  height: 100%;
  background: var(--color-secondary);
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -1.5rem;
  font-size: 0.9rem;
  color: var(--color-text);
}

.recipe-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}

.recipe-section {
  overflow-y: auto;
}

.section-title {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
  text-align: center;
  position: sticky;
  top: 5px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fancy-input {
  padding: 0.8rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-background);
  transition: all 0.3s ease;
}

.fancy-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.2);
  outline: none;
}

.number-input-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.time-input,
.servings-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ingredients-list,
.instructions-list,
.notes-list {
  margin-top: 1rem;
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

.form-navigation button:only-child {
  flex: 1;
}

.nav-button {
  min-width: 120px;
}

.form-section {
  animation: fadeIn 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
