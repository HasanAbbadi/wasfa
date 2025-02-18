<template>
  <div class="not-found">
    <div>
      <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg
        fill="currentColor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g>
            <g>
              <path
                d="M150.779,148.853l58.481,58.482c0.868,0.868,1.596,1.821,2.215,2.822l106.949-106.949
				c19.34-19.337,50.805-19.34,70.146,0l121.474,121.811C494.699,98.418,386.595,0,255.922,0C124.215,0,15.435,99.982,1.457,228.03
				l79.177-79.177C99.973,129.518,131.438,129.514,150.779,148.853z"
              />
              <path
                d="M377.753,457.239c0,8.517-6.906,15.422-15.422,15.422s-15.422-6.904-15.422-15.422v-19.541L37.397,389.222
				C82.417,462.797,163.528,512,255.922,512c63.881,0,122.371-23.521,167.268-62.356l-45.437-7.116V457.239z"
              />
              <path
                d="M366.744,125.002c-7.296-7.299-19.198-7.298-26.51,0.015L180.923,284.328c-3.01,3.01-6.96,4.517-10.905,4.517
				c-3.948,0-7.893-1.505-10.905-4.517c-6.022-6.022-6.022-15.787,0-21.811l31.16-31.158c-1.001-0.618-1.954-1.346-2.824-2.215
				l-58.481-58.481c-7.311-7.313-19.214-7.313-26.525,0L0.476,272.629c1.878,29.139,8.636,56.971,19.491,82.669
				c0.167,0.02,0.332,0.026,0.498,0.052l326.443,51.128v-23.507h-24.161c-22.394,0-40.61-18.218-40.61-40.61v-22.084
				c0-8.517,6.906-15.422,15.422-15.422s15.422,6.904,15.422,15.422v22.084c0,5.385,4.381,9.767,9.767,9.767h24.161V210.639
				c0-8.517,6.906-15.422,15.422-15.422s15.422,6.904,15.422,15.422v113.104h17.707c4.884,0,8.858-3.974,8.858-8.858v-31.736
				c0-8.517,6.906-15.422,15.422-15.422s15.422,6.904,15.422,15.422v31.736c0,21.891-17.811,39.702-39.702,39.702h-17.706v56.722
				l72.345,11.33c35.63-41.46,58.24-94.412,61.426-152.457L366.744,125.002z"
              />
            </g>
          </g>
        </g>
      </svg>
      <h3>It's drier than a wasteland!</h3>
      <p>
        You can try <RouterLink to="/add">creating a new recipe</RouterLink><br />or
        <RouterLink to="/settings">importing recipes</RouterLink> from a file<br />
        Otherwise, you can <a href="#" @click.prevent="useMockData">use mock data</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
a {
  color: var(--color-secondary);
}
.not-found {
  display: grid;
  place-items: center;
  gap: 1em;
}

.not-found div {
  text-align: center;
}

/* .not-found p {
  font-size: var(--font-size-medium);
} */

.not-found svg {
  width: 128px;
  max-width: 400px;
  color: var(--color-text);
  opacity: 0.6;
}
</style>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes'
import type { recipeType } from '@/types'

const recipesStore = useRecipesStore()

const useMockData = () => {
  recipesStore.setRecipes(mockData)
}

const mockData: recipeType[] = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    tags: ['Italian', 'Pasta', 'Quick'],
    description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
    ingredients: [
      { quantity: 200, unit: 'g', name: 'spaghetti' },
      { quantity: 100, unit: 'g', name: 'pancetta' },
      { quantity: 2, name: 'eggs' },
      { quantity: 50, unit: 'g', name: 'Parmesan cheese' },
      { name: 'black pepper' },
    ],
    instructions: [
      'Cook the spaghetti in salted boiling water.',
      'Fry the pancetta until crispy.',
      'Mix eggs, cheese, and pepper in a bowl.',
      'Combine pasta with pancetta and egg mixture off heat.',
      'Serve immediately.',
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    previewImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Espaguetis_carbonara.jpg/320px-Espaguetis_carbonara.jpg',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Espaguetis_carbonara.jpg/1280px-Espaguetis_carbonara.jpg',
    dateCreated: '2024-02-15',
  },
  {
    id: 2,
    name: 'Chicken Tikka Masala',
    tags: ['Indian', 'Curry', 'Spicy'],
    description: 'A flavorful Indian curry with grilled chicken pieces in a creamy tomato sauce.',
    ingredients: [
      { quantity: 500, unit: 'g', name: 'chicken breast' },
      { quantity: 200, unit: 'ml', name: 'heavy cream' },
      { quantity: 1, name: 'onion' },
      { quantity: 2, name: 'garlic cloves' },
      { quantity: 1, unit: 'tbsp', name: 'garam masala' },
      { quantity: 1, unit: 'tsp', name: 'cumin' },
      { quantity: 400, unit: 'g', name: 'canned tomatoes' },
    ],
    instructions: [
      'Marinate chicken in spices and yogurt for at least 1 hour.',
      'Grill the chicken until cooked through.',
      'Prepare sauce by sautéing onions, garlic, and spices.',
      'Add tomatoes and simmer, then blend into a smooth sauce.',
      'Add cream and grilled chicken, cook until combined.',
      'Serve with rice or naan.',
    ],
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    previewImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Chicken_tikka_masala.jpg/160px-Chicken_tikka_masala.jpg',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Chicken_tikka_masala.jpg/682px-Chicken_tikka_masala.jpg',
    dateCreated: '2024-02-15',
  },
  {
    id: 3,
    name: 'Classic Pancakes',
    tags: ['Breakfast', 'Sweet'],
    description: 'Fluffy pancakes perfect for a morning treat.',
    ingredients: [
      { quantity: 200, unit: 'g', name: 'flour' },
      { quantity: 2, name: 'eggs' },
      { quantity: 300, unit: 'ml', name: 'milk' },
      { quantity: 1, unit: 'tbsp', name: 'sugar' },
      { quantity: 1, unit: 'tsp', name: 'baking powder' },
    ],
    instructions: [
      'Mix all ingredients into a smooth batter.',
      'Heat a pan and cook pancakes on both sides until golden brown.',
      'Serve with syrup or fruits.',
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    previewImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Banana_on_pancake.jpg/245px-Banana_on_pancake.jpg',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Banana_on_pancake.jpg/1044px-Banana_on_pancake.jpg',
    dateCreated: '2024-02-15',
  },
  {
    id: 4,
    name: 'Caesar Salad',
    tags: ['Salad', 'Healthy', 'Quick'],
    description: 'A crisp and creamy Caesar salad with croutons and parmesan.',
    ingredients: [
      { quantity: 1, name: 'romaine lettuce' },
      { quantity: 50, unit: 'g', name: 'Parmesan cheese' },
      { quantity: 1, unit: 'tbsp', name: 'Caesar dressing' },
      { quantity: 100, unit: 'g', name: 'croutons' },
    ],
    instructions: [
      'Chop lettuce and place in a bowl.',
      'Add Parmesan cheese and croutons.',
      'Drizzle with Caesar dressing and toss.',
      'Serve immediately.',
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    previewImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Caesar_Salad_-_Purezza_2023-11-22.jpg/320px-Caesar_Salad_-_Purezza_2023-11-22.jpg',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Caesar_Salad_-_Purezza_2023-11-22.jpg/1280px-Caesar_Salad_-_Purezza_2023-11-22.jpg',
    dateCreated: '2024-02-15',
  },
  {
    id: 5,
    name: 'Beef Tacos',
    tags: ['Mexican', 'Street Food'],
    description: 'Tasty beef tacos with fresh toppings.',
    ingredients: [
      { quantity: 300, unit: 'g', name: 'ground beef' },
      { quantity: 1, name: 'onion' },
      { quantity: 1, unit: 'tsp', name: 'cumin' },
      { quantity: 6, name: 'taco shells' },
      { quantity: 1, name: 'tomato' },
      { quantity: 50, unit: 'g', name: 'cheese' },
    ],
    instructions: [
      'Cook beef with onions and spices.',
      'Assemble tacos with beef, cheese, and tomato.',
      'Serve with lime and salsa.',
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 3,
    previewImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Beef-Tacos-from-Los_Latinos-2011.jpg/320px-Beef-Tacos-from-Los_Latinos-2011.jpg',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Beef-Tacos-from-Los_Latinos-2011.jpg/1024px-Beef-Tacos-from-Los_Latinos-2011.jpg',
    dateCreated: '2024-02-15',
  },
  {
    id: 6,
    name: 'Mushroom Risotto',
    tags: ['Italian', 'Vegetarian', 'Comfort Food'],
    description: 'A creamy risotto with earthy mushrooms and parmesan.',
    ingredients: [
      { quantity: 200, unit: 'g', name: 'Arborio rice' },
      { quantity: 500, unit: 'ml', name: 'vegetable broth' },
      { quantity: 1, name: 'onion' },
      { quantity: 2, name: 'garlic cloves' },
      { quantity: 200, unit: 'g', name: 'mushrooms' },
      { quantity: 50, unit: 'g', name: 'Parmesan cheese' },
      { quantity: 2, unit: 'tbsp', name: 'butter' },
    ],
    instructions: [
      'Sauté onions and garlic in butter.',
      'Add mushrooms and cook until softened.',
      'Stir in rice and gradually add broth, stirring frequently.',
      'When creamy, add Parmesan and season to taste.',
      'Serve hot.',
    ],
    prepTime: 10,
    cookTime: 30,
    servings: 2,
    previewImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mushroom_Risotto_%284789415965%29.jpg/320px-Mushroom_Risotto_%284789415965%29.jpg',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mushroom_Risotto_%284789415965%29.jpg/1024px-Mushroom_Risotto_%284789415965%29.jpg',
    dateCreated: '2024-02-15',
  },
  {
    id: 7,
    name: 'Grilled Salmon with Lemon Butter',
    tags: ['Seafood', 'Healthy', 'Quick'],
    description: 'A delicious grilled salmon dish with a lemon butter sauce.',
    ingredients: [
      { quantity: 2, unit: 'fillets', name: 'salmon' },
      { quantity: 1, unit: 'lemon', name: 'lemon juice' },
      { quantity: 2, unit: 'tbsp', name: 'butter' },
      { quantity: 1, unit: 'tsp', name: 'garlic powder' },
      { name: 'salt and pepper' },
    ],
    instructions: [
      'Season salmon with salt, pepper, and garlic powder.',
      'Grill for about 5 minutes per side.',
      'Melt butter with lemon juice and drizzle over salmon.',
      'Serve immediately.',
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    previewImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Grilled_salmon.jpg/320px-Grilled_salmon.jpg',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Grilled_salmon.jpg/1024px-Grilled_salmon.jpg',
    dateCreated: '2024-02-15',
  },
  {
    id: 8,
    name: 'Chocolate Lava Cake',
    tags: ['Dessert', 'Chocolate', 'Decadent'],
    description: 'A rich and gooey chocolate cake with a molten center.',
    ingredients: [
      { quantity: 100, unit: 'g', name: 'dark chocolate' },
      { quantity: 100, unit: 'g', name: 'butter' },
      { quantity: 2, name: 'eggs' },
      { quantity: 50, unit: 'g', name: 'sugar' },
      { quantity: 30, unit: 'g', name: 'flour' },
    ],
    instructions: [
      'Melt chocolate and butter together.',
      'Whisk eggs and sugar until fluffy.',
      'Fold in melted chocolate and flour.',
      'Pour into ramekins and bake for 10 minutes at 200°C.',
      'Serve warm.',
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Chocolate_Lava_Cake-2_%2829044642816%29.jpg',
    dateCreated: '2024-02-15',
  },
]
</script>
