<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useRoute } from 'vue-router'
import type { recipeType } from '@/types'

const emit = defineEmits(['viewRecipe', 'viewAbout', 'viewRecipeActions'])

const route = useRoute()
const recipesStore = useRecipesStore()

const recipe = computed<recipeType | undefined>(() => {
  const id = +route.params.id
  return recipesStore.recipes.find((r) => r.id === id)
})

onMounted(() => {
  emit('viewRecipeActions', recipe.value?.id)
})

onUnmounted(() => {
  emit('viewRecipeActions', null)
})
</script>
<template>
  <div class="full-recipe-view body" v-if="recipe">
    <div class="recipe-header">
      <div
        class="recipe-image"
        :style="{ backgroundImage: `url(${recipe.image})` }"
        role="img"
        :aria-label="`Image for ${recipe.name}`"
      ></div>
      <div class="recipe-meta">
        <h1 class="recipe-title">{{ recipe.name }}</h1>
        <p class="recipe-description">{{ recipe.description }}</p>
        <div v-if="recipe.tags" class="recipe-tags">
          <span v-for="tag in recipe.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>

        <div class="time-info">
          <div v-if="recipe.prepTime" class="time-block">
            <span class="time-label">Prep Time</span>
            <span class="time-value">{{ recipe.prepTime }} min</span>
          </div>
          <div v-if="recipe.cookTime" class="time-block">
            <span class="time-label">Cook Time</span>
            <span class="time-value">{{ recipe.cookTime }} min</span>
          </div>
          <div v-if="recipe.servings" class="time-block">
            <span class="time-label">Servings</span>
            <span class="time-value">{{ recipe.servings }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="recipe-body">
      <div class="recipe-columns">
        <section v-if="recipe.ingredients" class="ingredients-section">
          <h2 class="section-title">Ingredients</h2>
          <ul class="ingredient-list">
            <li
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="ingredient-item"
            >
              <span v-if="ingredient.quantity" class="quantity">
                {{ ingredient.quantity }}
              </span>
              <span v-if="ingredient.unit" class="unit">
                {{ ingredient.unit }}
              </span>
              {{ ingredient.name }}
            </li>
          </ul>
        </section>

        <section v-if="recipe.instructions" class="instructions-section">
          <h2 class="section-title">Instructions</h2>
          <ol class="instruction-list">
            <li
              v-for="(instruction, index) in recipe.instructions"
              :key="index"
              class="instruction-step"
            >
              {{ instruction }}
            </li>
          </ol>
        </section>
      </div>

      <div v-if="recipe.notes" class="notes-section">
        <h2 class="section-title">Notes</h2>
        <ul class="notes-list">
          <li v-for="(note, index) in recipe.notes" :key="index" class="note-item">
            {{ note }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
/* #side-panel.expanded:has(.content *) {
  width: 250px;
} */

.full-recipe-view {
  padding: 2rem;
  background-color: var(--color-background);
  color: var(--color-text);
  position: relative;
}

.full-recipe-view .recipe-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.full-recipe-view .recipe-image {
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.full-recipe-view .recipe-meta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.full-recipe-view .recipe-title {
  margin: 0 !important;
  color: var(--color-heading);
  font-size: 2.5rem;
}

.full-recipe-view .recipe-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.full-recipe-view .tag {
  background-color: var(--color-accent);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

.time-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.time-block {
  background-color: var(--color-background-soft);
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
}

.time-label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text);
}

.time-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-heading);
}

.full-recipe-view .recipe-columns {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.full-recipe-view .section-title {
  color: var(--color-heading);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.full-recipe-view .ingredient-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.full-recipe-view .ingredient-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.quantity {
  font-weight: bold;
  color: var(--color-secondary);
}

.unit {
  color: var(--color-secondary);
}

.full-recipe-view .instruction-list {
  list-style-position: inside;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.full-recipe-view .instruction-step {
  line-height: 1.6;
}

.full-recipe-view .notes-section {
  background-color: var(--color-background-soft);
  padding: 2rem;
  border-radius: var(--border-radius);
}

.full-recipe-view .notes-list {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.print-button {
  position: fixed;
  bottom: 2rem;
  inset-inline-end: 5rem;
  background-color: var(--color-accent);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  box-shadow: var(--box-shadow);
}

.print-button svg {
  width: 24px;
  height: 24px;
}

@media print {
  .print-button {
    display: none;
  }

  nav,
  header {
    display: none;
  }

  .recipe-view {
    --color-background: white;
    --color-text: black;
  }

  .recipe-image {
    height: 300px;
  }
}

@media (max-width: 1248px) {
  .full-recipe-view .recipe-header {
    grid-template-columns: 1fr;
  }

  .full-recipe-view .recipe-columns {
    grid-template-columns: 1fr;
  }

  .full-recipe-view .recipe-image {
    height: 250px;
  }

  .time-info {
    grid-template-columns: 1fr;
  }
}
</style>
