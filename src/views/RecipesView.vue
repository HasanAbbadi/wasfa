<script setup lang="ts">
import RecipeCard from '@/components/recipes/RecipeCard.vue'
import SegmentedButtons from '@/components/common/SegmentedButtons.vue'
import FilterRecipes from '@/components/recipes/FilterRecipes.vue'
import IconGrid from '@/components/icons/IconGrid.vue'
import IconList from '@/components/icons/IconList.vue'
import { useRecipesStore } from '@/stores/recipes'
import { useFilterStore } from '@/stores/filter'
import { onMounted, ref, shallowRef, watch } from 'vue'
import NoRecipesView from '@/views/NoRecipesView.vue'
import RecipesList from '@/components/recipes/RecipesList.vue'

const emit = defineEmits(['panelContent'])
const viewMode = ref<'grid' | 'list'>('grid')

const recipesStore = useRecipesStore()
const filterStore = useFilterStore()

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
  emit('panelContent', { source: '', value: null })
})
</script>

<template>
  <template v-if="recipesStore.recipes.length > 0">
    <div class="header">
      <h1>Recipes</h1>
      <div>
        <FilterRecipes />
        <SegmentedButtons v-model="segmentedButtons" />
      </div>
    </div>

    <RecipesList
      v-if="viewMode === 'list'"
      @viewRecipe="emit('panelContent', { source: 'recipe', value: $event })"
    />

    <div v-if="viewMode === 'grid'" class="recipe-grid body">
      <RecipeCard
        v-for="recipe in filterStore.finalRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @click="emit('panelContent', { source: 'recipe', value: recipe.id })"
      />
    </div>
  </template>
  <template v-else>
    <NoRecipesView />
  </template>
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
</style>
