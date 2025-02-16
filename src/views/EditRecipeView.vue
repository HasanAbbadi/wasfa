<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RecipeForm from '@/components/recipes/RecipeForm.vue'
import { useRecipesStore } from '@/stores/recipes'
import type { recipeType } from '@/types'

const emit = defineEmits(['panelContent'])
const route = useRoute()
const recipesStore = useRecipesStore()
const recipeId = route.params.id as string

const initialRecipe = computed(() => recipesStore.getRecipeById(parseInt(recipeId)))

const handleSubmit = (recipe: recipeType) => {
  recipesStore.updateRecipe(parseInt(recipeId), { ...recipe, id: parseInt(recipeId) })
}

const handleChange = (draft: recipeType) => {
  emit('panelContent', { source: 'addRecipe', value: draft })
}
</script>

<template>
  <div class="header"></div>
  <RecipeForm
    v-if="initialRecipe"
    :initialRecipe="initialRecipe"
    :draftKey="`recipe-draft-${recipeId}`"
    @submit="handleSubmit"
    @change="handleChange"
  />
</template>
