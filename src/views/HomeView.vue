<template>
  <div class="body">
    <div class="header">
      <h5>Welcome to wasfa</h5>
      <SegmentedButtons v-model="segmentedButtons" />
    </div>
    <accordion-group multiple v-if="segmentedButtons[0].checked">
      <accordion-item open>
        <template #header>
          <span>Your Folders</span>
        </template>
        <div class="folders-grid">
          <div v-for="folder in folders" :key="folder.id">
            <FolderCard :folder="folder" />
          </div>
        </div>
      </accordion-item>
      <accordion-item open>
        <template #header>
          <span>Suggested Recipes</span>
        </template>
        <div class="recipes-grid">
          <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" simple />
        </div>
      </accordion-item>
    </accordion-group>
    <TreeView v-else v-model:nodes="treeData" @node-click="handleNodeClick" /> />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef, reactive } from 'vue'
import SegmentedButtons from '@/components/common/SegmentedButtons.vue'
import AccordionGroup from '@/components/common/AccordionGroup.vue'
import AccordionItem from '@/components/common/AccordionItem.vue'
import { useFoldersStore } from '@/stores/folders'
import { useRecipesStore } from '@/stores/recipes'
import FolderCard from '@/components/home/FolderCard.vue'
import RecipeCard from '@/components/recipes/RecipeCard.vue'
import IconGrid from '@/components/icons/IconGrid.vue'
import IconList from '@/components/icons/IconList.vue'
import TreeView from '@/components/home/TreeView.vue'
const recipesStore = useRecipesStore()
const foldersStore = useFoldersStore()

const LIMIT = 10
const folders = computed(() => foldersStore.folders)
const allRecipes = computed(() => recipesStore.recipes)
const recipes = computed(() =>
  allRecipes.value
    .slice()
    .sort((a, b) => {
      if (a.dateOpened && b.dateOpened)
        return new Date(a.dateOpened).getTime() - new Date(b.dateOpened).getTime()
      if (a.dateModified && b.dateModified)
        return new Date(a.dateModified).getTime() - new Date(b.dateModified).getTime()
      return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
    })
    .slice(0, LIMIT),
)

const treeData = ref([
  {
    id: '1',
    name: 'Recipes',
    children: [
      {
        id: '2',
        name: 'Desserts',
        children: [
          {
            id: '3',
            name: 'Chocolate Cake',
          },
        ],
      },
      {
        id: '4',
        name: 'Main Dishes',
        children: [],
      },
    ],
  },
  {
    id: '5',
    name: 'Pasta Recipe',
  },
])

const handleNodeClick = (node) => {
  console.log('Clicked node:', node)
}

const segmentedButtons = ref([
  {
    // label: 'Grid',
    value: 'grid',
    checked: localStorage.getItem('home-view-mode') === 'grid' || true,
    icon: shallowRef(IconGrid),
  },
  {
    // label: 'List',
    value: 'list',
    checked: localStorage.getItem('home-view-mode') === 'list' || false,
    icon: shallowRef(IconList),
  },
])
</script>

<style>
.body {
  flex: none !important;
}

.body .header {
  margin: 16px;
}

.folders-grid {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.recipes-grid {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-template-rows: auto auto;
}
</style>
