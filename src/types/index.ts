type recipeType = {
  id: number
  name: string
  tags?: string[]
  description?: string
  ingredients: ingredientType[]
  instructions: string[]
  prepTime?: number
  cookTime?: number
  servings?: number
  previewImage?: string
  image?: string
  notes?: string[]
  dateCreated?: string
  dateModified?: string
}

type ingredientType = {
  quantity?: number
  unit?: string
  name: string
}

type filterOptionsType = {
  name?: string
  cookTime?: numericalFilterType
  prepTime?: numericalFilterType
  servings?: numericalFilterType
  ingredients?: numericalFilterType
  instructions?: numericalFilterType
  date?: dateFilterType
  tags?: tagsType
  sort?: sortType
}

type numericalFilterType = {
  operator: 'gt' | 'lt' | 'eq'
  value: number
}

type dateFilterType = {
  type: 'any' | 'today' | 'lastWeek' | 'lastMonth' | 'lastYear' | 'custom'
  start?: string
  end?: string
}

type tagsType = {
  and: boolean
  tags: string[]
}

type sortType = {
  method: 'name' | 'cookTime' | 'prepTime' | 'servings' | 'date'
  order: 'asc' | 'desc'
}

export type { recipeType, ingredientType, filterOptionsType }
