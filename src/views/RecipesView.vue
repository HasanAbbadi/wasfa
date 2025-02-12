<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import { useRecipesStore } from '@/stores/recipes'
import { onUnmounted } from 'vue'

const emit = defineEmits(['viewRecipe'])

onUnmounted(() => {
  emit('viewRecipe', null)
})

const recipesStore = useRecipesStore()
</script>

<template>
  <h1>Recipes</h1>
  <div class="recipe-list">
    <RecipeCard
      v-for="recipe in recipesStore.recipes"
      :key="recipe.id"
      :recipe="recipe"
      @click="emit('viewRecipe', recipe.id)"
    />
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
