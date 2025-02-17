<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipesStore } from '@/stores/recipes'
import type { recipeType } from '@/types'

const route = useRoute()
const recipeStore = useRecipesStore()
const recipe = ref<recipeType>()

onMounted(() => {
  const id = parseInt(route.params.id as string)
  recipe.value = recipeStore.getRecipeById(id)
  document.title = `${recipe.value?.name || 'Recipe'} - Print View`
})
</script>

<template>
  <div class="print-recipe" v-if="recipe">
    <h1 class="recipe-title">{{ recipe.name }}</h1>

    <div class="recipe-meta" v-if="recipe.prepTime || recipe.cookTime || recipe.servings">
      <div v-if="recipe.prepTime" class="meta-item">
        <strong>Prep Time:</strong> {{ recipe.prepTime }} minutes
      </div>
      <div v-if="recipe.cookTime" class="meta-item">
        <strong>Cook Time:</strong> {{ recipe.cookTime }} minutes
      </div>
      <div v-if="recipe.servings" class="meta-item">
        <strong>Servings:</strong> {{ recipe.servings }}
      </div>
    </div>

    <div v-if="recipe.description" class="recipe-description">
      {{ recipe.description }}
    </div>

    <div class="recipe-content">
      <div class="ingredients-section">
        <h2>Ingredients</h2>
        <ul class="ingredients-list">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient.quantity ? `${ingredient.quantity} ` : '' }}
            {{ ingredient.unit ? `${ingredient.unit} ` : '' }}
            {{ ingredient.name }}
          </li>
        </ul>
      </div>

      <div class="instructions-section">
        <h2>Instructions</h2>
        <ol class="instructions-list">
          <li v-for="(instruction, index) in recipe.instructions" :key="index">
            {{ instruction }}
          </li>
        </ol>
      </div>

      <div v-if="recipe.notes && recipe.notes.length > 0" class="notes-section">
        <h2>Notes</h2>
        <ul class="notes-list">
          <li v-for="(note, index) in recipe.notes" :key="index">
            {{ note }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading recipe...</div>
</template>

<style scoped>
.print-recipe {
  max-width: 210mm; /* A4 width */
  margin: 0 auto;
  padding: 20mm;
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5;
}

.recipe-title {
  font-size: 24pt;
  margin-bottom: 16pt;
  text-align: center;
  color: #333;
}

.recipe-meta {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 16pt;
  font-size: 11pt;
}

.meta-item {
  color: #555;
}

.recipe-description {
  font-style: italic;
  margin-bottom: 24pt;
  text-align: center;
  color: #666;
}

.recipe-content {
  display: grid;
  gap: 32pt;
}

h2 {
  font-size: 14pt;
  margin-bottom: 12pt;
  color: #444;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4pt;
}

.ingredients-list,
.instructions-list,
.notes-list {
  padding-left: 20pt;
  margin: 0;
}

.ingredients-list li {
  margin-bottom: 8pt;
  list-style-type: none;
  position: relative;
}

.ingredients-list li::before {
  content: '•';
  position: absolute;
  left: -12pt;
}

.instructions-list li,
.notes-list li {
  margin-bottom: 12pt;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 14pt;
  color: #666;
}

@media print {
  .print-recipe {
    padding: 0;
  }

  @page {
    margin: 20mm;
  }
}
</style>
