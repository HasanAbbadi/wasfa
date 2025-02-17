import { createRouter, createWebHistory } from 'vue-router'
import RecipesView from '@/views/RecipesView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PrintLayout from '@/layouts/PrintLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'recipes',
          meta: { title: 'Recipes' },
          component: RecipesView,
        },
        {
          path: 'add',
          name: 'add-recipe',
          meta: { title: 'Add Recipe' },
          component: () => import('../views/AddRecipeView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          meta: { title: 'Settings' },
          component: () => import('../views/SettingsView.vue'),
        },
        {
          path: 'recipe/:id',
          name: 'full-recipe',
          meta: { title: 'Full Recipe' },
          component: () => import('../views/FullRecipeView.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit-recipe',
          meta: { title: 'Edit Recipe' },
          component: () => import('../views/EditRecipeView.vue'),
        },
        {
          path: ':notFound(.*)*',
          name: 'not-found',
          meta: { title: 'Not Found' },
          component: () => import('../views/NotFound.vue'),
        },
      ],
    },
    {
      path: '/print',
      component: PrintLayout,
      children: [
        {
          path: ':id',
          name: 'print-recipe',
          meta: { title: 'Print Recipe' },
          component: () => import('../views/PrintRecipeView.vue'),
        },
      ],
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../layouts/WelcomeLayout.vue'),
    },
  ],
})

export default router
