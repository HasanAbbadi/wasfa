import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import type { filterOptionsType, recipeType } from '@/types'
import { useRecipesStore } from './recipes'
import { useRecipeFilter } from '@/composables/useRecipeFilters' // Adjust the import path as needed

const STORAGE_KEY = 'filterOptions'

export const useFilterStore = defineStore('filter', () => {
  const recipesStore = useRecipesStore()

  const savedFilters = localStorage.getItem(STORAGE_KEY)
  const filterOptions = ref<filterOptionsType>(savedFilters ? JSON.parse(savedFilters) : {})

  const filteredRecipes = ref<recipeType[] | null>(null)

  // Use the composable to filter recipes
  const { filteredRecipes: computedFilteredRecipes } = useRecipeFilter(
    computed(() => recipesStore.recipes), // Pass the recipes as a computed ref
    filterOptions, // Pass the filterOptions ref directly
  )

  const finalRecipes = computed(() => {
    return filteredRecipes.value !== null ? filteredRecipes.value : recipesStore.recipes
  })

  const resetFilters = () => {
    filteredRecipes.value = null
    filterOptions.value = {}
    localStorage.removeItem(STORAGE_KEY)
  }

  const setFilterOptions = (newOptions: filterOptionsType) => {
    filterOptions.value = newOptions
  }

  const applyFilters = () => {
    if (!filterOptions.value || Object.keys(filterOptions.value).length === 0) {
      filteredRecipes.value = null
      return
    }

    // Use the filtered recipes from the composable
    filteredRecipes.value = computedFilteredRecipes.value
  }

  applyFilters()

  watch(
    filterOptions,
    (newFilters) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFilters))
      applyFilters()
    },
    { deep: true },
  )

  return {
    filterOptions,
    finalRecipes,
    filteredRecipes,
    setFilterOptions,
    resetFilters,
    applyFilters,
  }
})
