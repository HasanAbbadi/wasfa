import { createRouter, createWebHistory } from 'vue-router'
import RecipesView from '@/views/RecipesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Recipes',
      component: RecipesView,
    },
    {
      path: '/add',
      name: 'Add Recipe',
      component: () => import('../views/AddRecipeView.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/recipe/:id',
      name: 'Full Recipe',
      component: () => import('../views/FullRecipeView.vue'),
    },
  ],
})

export default router
