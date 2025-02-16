<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import HeaderBar from '@/components/layout/HeaderBar.vue'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import SidePanel from '@/components/layout/SidePanel.vue'
import { onMounted, reactive } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { usePanelStore } from '@/stores/panel'
import { useSnackbarStore } from '@/stores/snackbar'
import { useRecipesStore } from '@/stores/recipes'
import RecipeView from './views/panel/RecipeView.vue'
import AboutView from './views/panel/AboutView.vue'
import RecipeActionsView from './views/panel/RecipeActionsView.vue'
import IconMore from './components/icons/IconMore.vue'
import IconInfo from './components/icons/IconInfo.vue'
import IconSideNav from './components/icons/IconSideNav.vue'
import IconSheet from './components/icons/IconSheet.vue'
import SnackBar from './components/layout/SnackBar.vue'
import MyButton from './components/common/MyButton.vue'

const route = useRoute()
const themeStore = useThemeStore()
const panelStore = usePanelStore()
const snackbarStore = useSnackbarStore()
const recipesStore = useRecipesStore()

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
  themeStore.setTheme(theme)
})

const panelContent = reactive<{ source: string; value: any }>({ source: '', value: null })

const onPanelContent = (content: { source: string; value: any }) => {
  Object.assign(panelContent, content)
  if (panelContent.source === 'recipe') {
    panelStore.expand()
  } else if (panelStore.isMobile) {
    panelStore.collapse()
  } else if (panelContent.source === 'recipeActions') {
    panelStore.collapse()
  } else {
    panelStore.expand()
  }
}

const deleteRecipe = () => {
  // recipesStore.deleteRecipe(id)
  const recipeCopy = { ...recipesStore.getRecipeById(panelContent?.value) }
  const name = recipeCopy?.name || 'Recipe'
  snackbarStore.show(`${name} was deleted successfully`, 'Undo', () => {
    // if (recipeCopy) recipesStore.addRecipe(recipeCopy)
  })
  // recipeActions.value = null
}

const toggleSidePanel = () => {
  panelStore.toggle()
}
</script>

<template>
  <div id="wrapper">
    <HeaderBar :title="route.name">
      <template #right>
        <MyButton class="simple" @click="toggleSidePanel">
          <IconInfo v-if="panelContent.source === 'settings'" />
          <IconMore v-else-if="panelContent.source === 'recipeActions'" />
          <IconSheet v-else-if="panelStore.isMobile" />
          <IconSideNav v-else />
        </MyButton>
      </template>
    </HeaderBar>

    <main>
      <NavigationBar />

      <div id="view">
        <RouterView @panelContent="onPanelContent" />
      </div>

      <SidePanel>
        <RecipeView v-if="panelContent.source === 'recipe'" :id="panelContent.value" />
        <AboutView v-if="panelContent.source === 'settings'" />
        <RecipeView v-if="panelContent.source === 'addRecipe'" :recipe-data="panelContent.value" />
        <RecipeActionsView
          v-if="panelContent.source === 'recipeActions'"
          :id="panelContent.value"
          @deleteRecipe="deleteRecipe"
        />
      </SidePanel>
      <SnackBar />
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

#view > .header:has(*) {
  padding: var(--header-padding);
  height: var(--header-height);
}

#view > .body {
  overflow-y: auto;
  flex: 1;
  padding-inline: 0.5rem;
  padding-bottom: 5rem;
  padding-top: 8px;
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
  }

  #view > .header {
    background-color: var(--color-background-soft);
  }
}
</style>
