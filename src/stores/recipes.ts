// stores/recipes.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { recipeType } from '@/types/index'
import { useSnackbarStore } from '@/stores/snackbar'

export const useRecipesStore = defineStore('recipes', () => {
  const snackbarStore = useSnackbarStore()

  const recipes = ref<recipeType[]>(JSON.parse(localStorage.getItem('recipes') || '[]'))
  const tags = ref<string[]>(JSON.parse(localStorage.getItem('tags') || '[]'))

  computeTags()

  watch(
    recipes,
    () => {
      localStorage.setItem('recipes', JSON.stringify(recipes.value))
      computeTags()
      localStorage.setItem('tags', JSON.stringify(tags.value))
    },
    { deep: true },
  )

  function addRecipe(recipe: recipeType) {
    if (!recipe) return
    if (!recipe.id) {
      const lastId = recipes.value.length > 0 ? recipes.value[recipes.value.length - 1].id : 0
      recipe.id = lastId + 1
    }
    recipes.value.push(recipe)
  }

  function updateRecipe(id: number, updatedRecipe: recipeType) {
    const index = recipes.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      recipes.value[index] = updatedRecipe
    }
  }

  function deleteRecipe(id: number) {
    snackbarStore.show('Recipe deleted')
    // recipes.value = recipes.value.filter((r) => r.id !== id)
  }

  function setRecipes(newRecipes: recipeType[]) {
    recipes.value = newRecipes
  }

  function getRecipeById(id: number): recipeType | undefined {
    return recipes.value.find((r) => r.id === id)
  }

  function computeTags() {
    tags.value = recipes.value.reduce((acc, r) => {
      return acc.concat(r.tags || [])
    }, [] as string[])
  }

  function addTag(tag: string) {
    tags.value.push(tag)
  }

  function removeTag(tag: string) {
    tags.value = tags.value.filter((t) => t !== tag)
  }

  return {
    recipes,
    tags,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    setRecipes,
    getRecipeById,
    addTag,
    removeTag,
  }
})
