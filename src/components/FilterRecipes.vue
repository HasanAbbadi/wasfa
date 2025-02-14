<!-- RecipeFilters.vue -->
<script setup lang="ts">
import ModalComponent from './ModalComponent.vue'
import { ref, reactive, computed } from 'vue'

import IconFilter from '@/components/icons/IconFilter.vue'
import FiltersForm from '@/components/FiltersForm.vue'
import IconDown from './icons/IconDown.vue'
import IconUp from './icons/IconUp.vue'
import { useFilterStore } from '@/stores/filter'

const filterStore = useFilterStore()
const isFiltered = computed(() => Object.keys(filterStore.filterOptions).length > 0)

const modal = ref()
const filtersForm = ref()
const selectedTab = ref(0)

const filterOptions = ref({})
const tagsOptions = ref(['chicken', 'curry', 'vegetables', 'stir-fry'])
const sortOptions = ref([
  {
    name: 'Name',
    value: 'name',
  },
  {
    name: 'Cook Time',
    value: 'cookTime',
  },
  {
    name: 'Prep Time',
    value: 'prepTime',
  },
  {
    name: 'Servings',
    value: 'servings',
  },
  {
    name: 'Ingredients',
    value: 'ingredients',
  },
  {
    name: 'Instructions',
    value: 'instructions',
  },
  {
    name: 'Date',
    value: 'date',
  },
])
const sortMethod = reactive({
  method: 'name',
  order: 'asc',
})

const localForm = reactive({
  name: '',
  cookTime: { operator: 'gt', value: null },
  prepTime: { operator: 'gt', value: null },
  servings: { operator: 'gt', value: null },
  ingredients: { operator: 'gt', value: null },
  instructions: { operator: 'gt', value: null },
  date: { type: 'any', start: null, end: null },
  tags: {
    and: false,
    value: [],
  },
  sort: {
    method: 'date',
    order: 'desc',
  },
})

const openModal = () => {
  // Initialize form with current filters
  filtersForm.value?.initializeFilters()

  modal.value.open()
}

const closeModal = () => {
  modal.value.close()
}

const applyFilters = () => {
  const filters = filtersForm.value?.getFilters()
  filterStore.setFilterOptions({ ...filters, sort: sortMethod })
  closeModal()
}

const resetFilters = () => {
  filterStore.resetFilters()
  closeModal()
}

// @ts-expect-error shut up ts
const onSortOptionClick = (option) => {
  const isSame = sortMethod.method === option.value
  if (isSame) {
    sortMethod.order = sortMethod.order === 'asc' ? 'desc' : 'asc'
    return
  }

  sortMethod.method = option.value
}
</script>

<template>
  <div>
    <button class="secondary filter-btn" :class="{ active: isFiltered }" @click="openModal">
      <IconFilter /> Filters
    </button>

    <ModalComponent ref="modal">
      <template #modal-header>
        <div class="tabs-header">
          <button
            class="tab-button"
            :class="{ active: selectedTab === 0 }"
            @click="selectedTab = 0"
          >
            Filter
          </button>
          <button
            class="tab-button"
            :class="{ active: selectedTab === 1 }"
            @click="selectedTab = 1"
          >
            Sort
          </button>
        </div>
        <button class="secondary reset" @click="resetFilters">Reset</button>
      </template>
      <template #modal-body>
        <div class="inner" :style="{ transform: `translateX(-${(selectedTab * 100) / 2}%)` }">
          <div>
            <FiltersForm
              ref="filtersForm"
              v-model="localForm"
              :tagsOptions="tagsOptions"
              :filterOptions="filterOptions"
            />
          </div>
          <div class="sort-form">
            <label>Sort By:</label>
            <div
              v-for="option in sortOptions"
              :key="option.value"
              class="option-container"
              @click="onSortOptionClick(option)"
            >
              <span>{{ option.name }}</span>
              <div class="option-icon" :class="{ active: sortMethod.method === option.value }">
                <IconDown v-if="sortMethod.order === 'asc'" />
                <IconUp v-else />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #modal-footer>
        <button class="secondary" @click="closeModal">Cancel</button>
        <button @click="applyFilters">Apply Filters</button>
      </template>
    </ModalComponent>
  </div>
</template>

<style scoped>
.filter-btn.active {
  color: #ecae00;
}

.tabs-header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.tab-button {
  padding: 12px 24px;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background: none;
  color: var(--color-text);
  letter-spacing: 1px;
  transition: all 0.3s ease-in-out;
}

.tab-button.active {
  color: var(--color-secondary);
  border-bottom: 2px solid var(--color-secondary);
}

.inner {
  display: flex;
  width: 200%;
  transition: transform 0.3s ease-in-out;
}

.inner > div {
  width: 100%;
}

.option-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid var(--color-border);
  user-select: none;
  flex: 1;
}

label {
  color: var(--color-heading);
}

.sort-form label {
  border-bottom: 1px solid var(--color-border);
}

.sort-form .option-container:hover {
  background-color: var(--color-background-mute);
  cursor: pointer;
}

.option-icon {
  opacity: 0;
}

.option-icon.active {
  opacity: 1;
}
</style>
