import { createRouter, createWebHistory } from 'vue-router'
import RecipesView from '@/views/RecipesView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PrintLayout from '@/layouts/PrintLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          meta: { title: 'Home' },
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'recipes',
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
              path: ':id',
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
          ],
        },
        {
          path: 'folders',
          name: 'folders',
          meta: { title: 'Folders' },
          component: () => import('../views/FoldersView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          meta: { title: 'Settings' },
          component: () => import('../views/SettingsView.vue'),
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
