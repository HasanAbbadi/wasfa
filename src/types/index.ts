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

export type { recipeType, ingredientType }
