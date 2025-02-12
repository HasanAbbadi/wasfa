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

const themeStore = useThemeStore()

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
  themeStore.setTheme(theme)
})

const recipeId = ref<number | null>(null)
const isAbout = ref(false)
const draftRecipe = ref<recipeType | null>(null)

const viewRecipe = (id: number) => {
  recipeId.value = id
}

const viewAbout = (bool: boolean) => {
  isAbout.value = bool
}

const viewDraft = (recipe: recipeType | null) => {
  draftRecipe.value = recipe
}
</script>

<template>
  <div id="wrapper">
    <HeaderBar title="Wasfati" />

    <main>
      <NavigationBar />

      <div id="view">
        <RouterView @viewRecipe="viewRecipe" @viewAbout="viewAbout" @viewDraft="viewDraft" />
      </div>

      <SidePanel>
        <RecipeView v-if="recipeId" :id="recipeId" />
        <AboutView v-if="isAbout" />
        <RecipeView v-if="draftRecipe" :recipe-data="draftRecipe" />
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
  overflow-y: auto;
  flex: 1;
  padding: 2em;
}

#view h1 {
  margin: 1em 0.7em;
  margin-top: 0.5em;
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
    padding-bottom: 5rem;
    padding-inline: 1em;
  }
}
</style>
