<!-- RecipeFilters.vue -->
<script setup lang="ts">
import ModalComponent from '@/components/common/ModalComponent.vue'
import { ref, reactive, computed } from 'vue'

import IconFilter from '@/components/icons/IconFilter.vue'
import FiltersForm from '@/components/recipes/FiltersForm.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconUp from '@/components/icons/IconUp.vue'
import { useFilterStore } from '@/stores/filter'
import { storeToRefs } from 'pinia'
import { useRecipesStore } from '@/stores/recipes'
import BottomSheet from '../layout/BottomSheet.vue'

const filterStore = useFilterStore()
const recipeStore = useRecipesStore()
const isFiltered = computed(() => Object.keys(filterStore.filterOptions).length > 0)

const modal = ref()
const filtersForm = ref()
const selectedTab = ref(0)
const isMobile = ref(window.innerWidth < 768)

// Update isMobile when window is resized
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 768
})
const { filterOptions } = storeToRefs(filterStore)
const allTags = computed(() => recipeStore.tags)
// tagsOptions is all the tags minus the ones already selected in the filter
const tagsOptions = computed(() =>
  allTags.value.filter((tag) => !filterOptions.value?.tags?.tags?.includes(tag)),
)
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
  method: 'date',
  order: 'desc',
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
    tags: [],
  },
  sort: {
    method: 'date',
    order: 'desc',
  },
})

const openModal = () => {
  // Initialize form with current filters
  modal.value.open()
  window.addEventListener('keydown', applyOnEnter)
}

const closeModal = () => {
  modal.value.close()
  window.removeEventListener('keydown', applyOnEnter)
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

const clearFilters = () => {
  localForm.name = ''
  ;['cookTime', 'prepTime', 'servings', 'ingredients', 'instructions'].forEach((field) => {
    // @ts-expect-error shut up ts
    localForm[field] = { operator: 'gt', value: null }
  })
  localForm.date = { type: 'any', start: null, end: null }
  localForm.tags = { and: false, tags: [] }
  localForm.sort = { method: 'date', order: 'desc' }
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

// apply filters on submit (press Enter)
const applyOnEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    applyFilters()
  }
}
</script>

<template>
  <div>
    <button class="secondary filter-btn" :class="{ active: isFiltered }" @click="openModal">
      <IconFilter /> Filters
    </button>

    <ModalComponent v-if="!isMobile" ref="modal">
      <template #modal-header>
        <div class="top">
          <button class="secondary reset" @click="clearFilters">Clear</button>

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
        </div>
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

    <BottomSheet v-else ref="modal" :snap-points="[0.7, 1]" :start-point-index="1">
      <div class="top">
        <button class="secondary reset" @click="clearFilters">Clear</button>

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
        <!-- <button class="secondary" @click="closeModal">Cancel</button>
        <button @click="applyFilters">Apply Filters</button> -->
      </div>
      <div class="inner mobile" :style="{ transform: `translateX(-${(selectedTab * 100) / 2}%)` }">
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
    </BottomSheet>
  </div>
</template>

<style scoped>
.filter-btn.active {
  color: #ecae00;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tabs-header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-border);
  flex: 1;
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

.inner.mobile {
  margin-top: 1rem;
}

.inner > div {
  width: 100%;
}

.inner > div:first-child {
  padding-inline-end: 1rem;
}

.inner > div:last-child {
  padding-inline-start: 1rem;
}

.option-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25em 0.5em;
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
