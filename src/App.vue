<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import SidePanel from '@/components/SidePanel.vue'
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import RecipeView from './views/RecipeView.vue'
import AboutView from './views/AboutView.vue'
import type { recipeType } from './types'
import RecipeActionsView from './views/RecipeActionsView.vue'

const themeStore = useThemeStore()

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
  themeStore.setTheme(theme)
})

const recipeId = ref<number | null>(null)
const isAbout = ref(false)
const draftRecipe = ref<recipeType | null>(null)
const recipeActions = ref<number | null>(null)

const viewRecipe = (id: number) => {
  recipeId.value = id
}

const viewAbout = (bool: boolean) => {
  isAbout.value = bool
}

const viewDraft = (recipe: recipeType | null) => {
  draftRecipe.value = recipe
}

const viewRecipeActions = (id: number | null) => {
  recipeActions.value = id
}
</script>

<template>
  <div id="wrapper">
    <HeaderBar title="Wasfati" />

    <main>
      <NavigationBar />

      <div id="view">
        <RouterView
          @viewRecipe="viewRecipe"
          @viewAbout="viewAbout"
          @viewDraft="viewDraft"
          @viewRecipeActions="viewRecipeActions"
        />
      </div>

      <SidePanel>
        <RecipeView v-if="recipeId" :id="recipeId" />
        <AboutView v-if="isAbout" />
        <RecipeView v-if="draftRecipe" :recipe-data="draftRecipe" />
        <RecipeActionsView v-if="recipeActions" :id="recipeActions" />
      </SidePanel>
    </main>
  </div>
</template>

<style>
#wrapper {
  display: flex;
  flex-direction: column;
  height: 100dvh;
}

main {
  overflow-y: hidden;
  display: flex;
  flex: 1;
}

#view {
  overflow-y: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2em;
  background-color: var(--color-background);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

#view .header {
  margin: 1em 0.7em;
  margin-top: 0.5em;
}

#view .body {
  overflow-y: auto;
  flex: 1;
  padding-inline: 0.5rem;
}

@media (max-width: 1024px) {
  #wrapper {
    align-items: center;
    justify-content: center;
  }
  main {
    flex-direction: column;
    width: 100%;
  }
  #view {
    border-radius: 0;
    padding-bottom: 5rem;
    padding-inline: 1em;
  }
}
</style>
