type recipeType = {
  id: number
  name: string
  tags?: string[]
  description?: string
  ingredients?: ingredientType[]
  instructions?: string[]
  prepTime?: number
  cookTime?: number
  servings?: number
  image?: string
  notes?: string[]
}

type ingredientType = {
  quantity?: number
  unit?: string
  name?: string
}

type filterOptionsType = {
  name?: string
  cookTime?: numericalFilterType
  prepTime?: numericalFilterType
  servings?: numericalFilterType
  ingredients?: numericalFilterType
  instructions?: numericalFilterType
  date?: dateFilterType
  tags?: string[]
  sort?: sortType
}

type numericalFilterType = {
  operator: 'gt' | 'lt' | 'eq'
  value: number
}

type dateFilterType = {
  type: 'any' | 'today' | 'lastWeek' | 'lastMonth' | 'lastYear' | 'custom'
  start?: number
  end?: number
}

type sortType = {
  method: 'name' | 'cookTime' | 'prepTime' | 'servings' | 'date'
  order: 'asc' | 'desc'
}

export type { recipeType, ingredientType, filterOptionsType }
