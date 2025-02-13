import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import type { filterOptionsType, recipeType } from '@/types'
import { useRecipesStore } from './recipes'

export const useFilterStore = defineStore('filter', () => {
  const recipesStore = useRecipesStore()

  const filterOptions = ref<filterOptionsType>({})
  const filteredRecipes = ref<recipeType[]>([])

  const finalRecipes = computed(() => {
    if (filteredRecipes.value.length <= 0 || !filteredRecipes.value) {
      return recipesStore.recipes
    }
    return filteredRecipes.value
  })

  const resetFilters = () => {
    filteredRecipes.value = []
    filterOptions.value = {}
  }

  const setFilterOptions = (newOptions: filterOptionsType) => {
    filterOptions.value = newOptions
  }

  const applyFilters = () => {
    if (!filterOptions.value) return
    // TODO: Implement Filter composable logic
  }

  // watch for changes in filterOptions
  watch(
    filterOptions,
    () => {
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
