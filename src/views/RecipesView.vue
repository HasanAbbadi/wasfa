<script setup lang="ts">
import RecipeView from '@/views/RecipeView.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { useRecipesStore } from '@/stores/recipes'
import { ref } from 'vue'

const selectedRecipe = ref<number | null>(null)

const recipesStore = useRecipesStore()
</script>

<template>
  <div class="views-wrapper">
    <div class="first-view">
      <h1>Recipes</h1>
      <div class="recipe-list">
        <RecipeCard
          v-for="recipe in recipesStore.recipes"
          :key="recipe.id"
          :recipe="recipe"
          @click="selectedRecipe = recipe.id"
        />
      </div>
    </div>
    <div v-if="selectedRecipe" class="second-view">
      <RecipeView :id="selectedRecipe" @close="selectedRecipe = null" />
    </div>
  </div>
</template>

<style>
.views-wrapper {
  display: flex;
  gap: 2em;
}

.views-wrapper > div {
  flex: 1;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2em;
}
</style>
