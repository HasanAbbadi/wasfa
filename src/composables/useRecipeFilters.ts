import { computed, type Ref } from 'vue'
import type {
  recipeType,
  filterOptionsType,
  numericalFilterType,
  dateFilterType,
  tagsType,
  sortType,
} from '@/types' // Update import path

export function useRecipeFilter(recipes: Ref<recipeType[]>, filterOptions: Ref<filterOptionsType>) {
  const filteredRecipes = computed(() => {
    let filtered = [...recipes.value]
    const options = filterOptions.value

    // Name filter
    if (options.name?.trim()) {
      const searchTerm = options.name.toLowerCase().trim()
      filtered = filtered.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm))
    }

    // Numerical filters
    const applyNumericalFilter = (field: keyof recipeType, filter?: numericalFilterType) => {
      if (!filter) return
      filtered = filtered.filter((recipe) => {
        const value = recipe[field]
        return value !== undefined && checkNumerical(+value, filter)
      })
    }

    applyNumericalFilter('cookTime', options.cookTime)
    applyNumericalFilter('prepTime', options.prepTime)
    applyNumericalFilter('servings', options.servings)

    // Array length filters
    const applyLengthFilter = (
      field: 'ingredients' | 'instructions',
      filter?: numericalFilterType,
    ) => {
      if (!filter) return
      filtered = filtered.filter((recipe) => checkNumerical(recipe[field].length, filter))
    }

    applyLengthFilter('ingredients', options.ingredients)
    applyLengthFilter('instructions', options.instructions)

    // Date filter (assuming dateCreated)
    if (options.date?.type && options.date.type !== 'any') {
      filtered = filtered.filter((recipe) => {
        return recipe.dateCreated && checkDate(recipe.dateCreated, options.date!)
      })
    }

    // Tags filter
    if (options.tags?.tags.length) {
      filtered = filtered.filter((recipe) => {
        return recipe.tags && checkTags(recipe.tags, options.tags!)
      })
    }

    // Sorting
    if (options.sort) {
      filtered = sortRecipes(filtered, options.sort)
    }

    return filtered
  })

  return { filteredRecipes }
}

// Helper functions
function checkNumerical(value: number, filter: numericalFilterType): boolean {
  switch (filter.operator) {
    case 'eq':
      return value === filter.value
    case 'gt':
      return value > filter.value
    case 'lt':
      return value < filter.value
    default:
      return true
  }
}

function checkDate(dateString: string, filter: dateFilterType): boolean {
  const date = new Date(dateString)
  const now = new Date()
  let start: Date, end: Date

  switch (filter.type) {
    case 'today':
      start = new Date(now.setHours(0, 0, 0, 0))
      end = new Date(now.setHours(23, 59, 59, 999))
      break
    case 'lastWeek':
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      start.setHours(0, 0, 0, 0)
      end = new Date()
      break
    case 'lastMonth':
      start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      start.setHours(0, 0, 0, 0)
      end = new Date()
      break
    case 'lastYear':
      start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      start.setHours(0, 0, 0, 0)
      end = new Date()
      break
    case 'custom':
      if (!filter.start || !filter.end) return true
      start = new Date(filter.start)
      end = new Date(filter.end)
      end.setHours(23, 59, 59, 999)
      break
    default:
      return true
  }

  return date >= start && date <= end
}

function checkTags(recipeTags: string[], filter: tagsType): boolean {
  return filter.and
    ? filter.tags.every((tag) => recipeTags.includes(tag))
    : filter.tags.some((tag) => recipeTags.includes(tag))
}

function sortRecipes(recipes: recipeType[], sortOptions: sortType) {
  const sorted = [...recipes]
  const getValue = (recipe: recipeType) => {
    switch (sortOptions.method) {
      case 'name':
        return recipe.name.toLowerCase()
      case 'cookTime':
        return recipe.cookTime ?? Infinity
      case 'prepTime':
        return recipe.prepTime ?? Infinity
      case 'servings':
        return recipe.servings ?? Infinity
      case 'ingredients':
        return recipe.ingredients.length
      case 'instructions':
        return recipe.instructions.length
      case 'date':
        return recipe.dateCreated ? new Date(recipe.dateCreated) : new Date(0)
      case 'dateCreated':
        return recipe.dateCreated ? new Date(recipe.dateCreated) : new Date(0)
      case 'dateModified':
        return recipe.dateModified ? new Date(recipe.dateModified) : new Date(0)
      default:
        return 0
    }
  }

  sorted.sort((a, b) => {
    const aVal = getValue(a)
    const bVal = getValue(b)
    let comparison = 0

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      comparison = aVal.localeCompare(bVal)
    } else if (aVal instanceof Date && bVal instanceof Date) {
      comparison = aVal.getTime() - bVal.getTime()
    } else {
      comparison = (aVal as number) - (bVal as number)
    }

    return sortOptions.order === 'asc' ? comparison : -comparison
  })

  return sorted
}
