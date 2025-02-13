<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import SegmentedButtons from '@/components/SegmentedButtons.vue'
import IconGrid from '@/components/icons/IconGrid.vue'
import IconList from '@/components/icons/IconList.vue'
import { useRecipesStore } from '@/stores/recipes'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

const emit = defineEmits(['viewRecipe'])
const viewMode = ref<'grid' | 'list'>('grid')

onUnmounted(() => {
  emit('viewRecipe', null)
})

const recipesStore = useRecipesStore()

const segmentedButtons = ref([
  {
    // label: 'Grid',
    value: 'grid',
    checked: localStorage.getItem('view-mode') === 'grid' || false,
    icon: shallowRef(IconGrid),
  },
  {
    // label: 'List',
    value: 'list',
    checked: localStorage.getItem('view-mode') === 'list' || false,
    icon: shallowRef(IconList),
  },
])

watch(
  segmentedButtons,
  (value) => {
    const selectedValue = value.find((b) => b.checked)?.value
    if (selectedValue) {
      viewMode.value = selectedValue as 'grid' | 'list'
    }
  },
  { immediate: true },
)

watch(viewMode, (value) => {
  localStorage.setItem('view-mode', value)
})
onMounted(() => {
  const storedValue = localStorage.getItem('view-mode')
  if (storedValue) {
    viewMode.value = storedValue as 'grid' | 'list'
  }
})
</script>

<template>
  <div class="header">
    <h1>Recipes</h1>
    <SegmentedButtons v-model="segmentedButtons" />
  </div>

  <div v-if="viewMode === 'list'" class="recipe-list body">
    <div class="list-item">
      <span class="name">Name</span>
      <span class="prep-time">Prep Time</span>
      <span class="cook-time">Cook Time</span>
      <span class="servings">Servings</span>
      <span class="ingredients-num">Ingredients</span>
      <span class="date-created">Date</span>
    </div>
    <div
      class="list-item"
      v-for="recipe in recipesStore.recipes"
      :key="recipe.id"
      @click="emit('viewRecipe', recipe.id)"
    >
      <span class="name">{{ recipe.name }}</span>
      <span class="prep-time">{{ recipe.prepTime }}</span>
      <span class="cook-time">{{ recipe.cookTime }}</span>
      <span class="servings">{{ recipe.servings }}</span>
      <span class="ingredients-num">{{ recipe.ingredients?.length }}</span>
      <span class="date-created">{{ new Date().toLocaleDateString() }}</span>
    </div>
  </div>

  <div v-if="viewMode === 'grid'" class="recipe-grid body">
    <RecipeCard
      v-for="recipe in recipesStore.recipes"
      :key="recipe.id"
      :recipe="recipe"
      @click="emit('viewRecipe', recipe.id)"
    />
  </div>
</template>

<style>
.views-wrapper {
  display: flex;
  gap: 2em;
}

.views-wrapper > div {
  flex: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2em;
}

.recipe-list.body {
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 14px;
  border-radius: 8px;
  overflow: auto;
}

.list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid var(--color-border);
  min-width: 800px; /* Minimum width for smaller screens */
  user-select: none;
}

.list-item:first-child * {
  color: var(--color-heading);
}

.list-item:first-child {
  border-bottom: 1px solid var(--color-border);
}

.list-item:not(:first-child):hover {
  background-color: var(--color-background-mute);
  cursor: pointer;
}

/* Column specific styling */
.name {
  font-weight: 500;
  color: var(--color-secondary);
}

.prep-time,
.cook-time,
.servings,
.ingredients-num,
.date-created {
  color: var(--color-text);
}

/* Right-align numeric and date columns */
.prep-time,
.cook-time,
.servings,
.ingredients-num,
.date-created {
  text-align: right;
}

/* Header specific styling */
.list-item:first-child .name {
  color: inherit;
  font-weight: 500;
}

/* Responsive container */
.recipe-list {
  overflow-x: auto;
}
</style>
