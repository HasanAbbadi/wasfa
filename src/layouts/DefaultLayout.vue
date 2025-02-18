<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'

import HeaderBar from '@/components/layout/HeaderBar.vue'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import SidePanel from '@/components/layout/SidePanel.vue'

import RecipeView from '@/views/panel/RecipeView.vue'
import AboutView from '@/views/panel/AboutView.vue'
import RecipeActionsView from '@/views/panel/RecipeActionsView.vue'

import SnackBar from '@/components/layout/SnackBar.vue'
import MyButton from '@/components/common/MyButton.vue'

import IconMore from '@/components/icons/IconMore.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconSideNav from '@/components/icons/IconSideNav.vue'
import IconSheet from '@/components/icons/IconSheet.vue'

import { usePanelStore } from '@/stores/panel'
import { useRecipesStore } from '@/stores/recipes'
import { useSettingsStore } from '@/stores/settings'

const route = useRoute()

const panelContent = reactive<{ source: string; value: any }>({ source: '', value: null })
const panelStore = usePanelStore()
const settingsStore = useSettingsStore()
const settings = settingsStore.settings
const Router = useRouter()
const onPanelContent = (content: { source: string; value: any }) => {
  Object.assign(panelContent, content)

  if (!settings.recipePreview && panelContent.source === 'recipe') {
    Router.push({
      name: 'full-recipe',
      params: { id: panelContent.value },
    })
    return
  }

  if (panelContent.source === 'recipe') {
    // idk; some spaghetti code requires this
    if (panelStore.isMobile) {
      panelStore.toggle()
    } else {
      panelStore.expand()
    }
  } else if (panelStore.isMobile) {
    panelStore.collapse()
  } else if (panelContent.source === 'recipeActions') {
    panelStore.collapse()
  } else {
    panelStore.expand()
  }
}

const recipesStore = useRecipesStore()
const deleteRecipe = (id: number) => {
  recipesStore.deleteRecipe(id)
  panelStore.collapse()
}

const toggleSidePanel = () => {
  panelStore.toggle()
}
</script>

<template>
  <div id="wrapper">
    <HeaderBar :title="String(route.meta.title) || 'Wasfa'">
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
        <router-view @panelContent="onPanelContent" />
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

.fade-enter-active {
  animation: fade 0.25s;
}

.fade-leave-active {
  animation: fade 0.25s reverse;
}

@keyframes fade {
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
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
  z-index: 20;
}

#view > .body {
  overflow-y: auto;
  flex: 1;
  padding-inline: 0.8rem;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
