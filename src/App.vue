<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import SidePanel from '@/components/SidePanel.vue'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'
import RecipeView from './views/RecipeView.vue'
import AboutView from './views/AboutView.vue'
import type { recipeType } from './types'
import RecipeActionsView from './views/RecipeActionsView.vue'
import { usePanelStore } from '@/stores/panel'
import IconMore from './components/icons/IconMore.vue'
import IconInfo from './components/icons/IconInfo.vue'
import IconSideNav from './components/icons/IconSideNav.vue'
import IconSheet from './components/icons/IconSheet.vue'

const themeStore = useThemeStore()
const panelStore = usePanelStore()

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
  themeStore.setTheme(theme)
})

const recipeId = ref<number | null>(null)
const isAbout = ref(false)
const draftRecipe = ref<recipeType | null>(null)
const recipeActions = ref<number | null>(null)

watch([recipeId, isAbout, draftRecipe, recipeActions], () => {
  if (recipeId.value != null) {
    panelStore.expand()
    console.log('Recipe ID detected, expanding')
  } else if (panelStore.isMobile) {
    panelStore.collapse()
    console.log('Mobile detected, collapsing')
  } else if (recipeActions.value != null) {
    panelStore.collapse()
    console.log('Recipe actions detected, collapsing')
  } else {
    panelStore.expand()
    console.log('No conditions detected, expanding')
  }
})

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

const toggleSidePanel = () => {
  panelStore.toggle()
}
</script>

<template>
  <div id="wrapper">
    <HeaderBar title="Wasfati">
      <template #right>
        <button class="secondary" @click="toggleSidePanel">
          <IconInfo v-if="isAbout" />
          <IconMore v-else-if="recipeActions" />
          <IconSheet v-else-if="panelStore.isMobile" />
          <IconSideNav v-else />
        </button>
      </template>
    </HeaderBar>

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
    padding: 0;
    border-radius: 0;
    padding-bottom: 5rem;
    padding-inline: 1em;
  }
}
</style>
