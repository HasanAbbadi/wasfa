<script setup lang="ts">
import RecipeForm from '@/components/recipes/RecipeForm.vue'
import { useRecipesStore } from '@/stores/recipes'
import type { recipeType } from '@/types'

const emit = defineEmits(['panelContent'])
const recipesStore = useRecipesStore()

const handleSubmit = (recipe: recipeType) => {
  recipesStore.addRecipe(recipe)
}

const handleChange = (draft: recipeType) => {
  emit('panelContent', { source: 'addRecipe', value: draft })
}
</script>

<template>
  <div class="header"></div>
  <RecipeForm @submit="handleSubmit" @change="handleChange" />
</template>
