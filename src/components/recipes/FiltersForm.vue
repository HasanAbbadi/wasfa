<script setup lang="ts">
import type { filterOptionsType } from '@/types'
import MultiSelect from '@/components/common/MultiSelect.vue'
import SwitchComponent from '@/components/common/SwitchComponent.vue'
import AccordionGroup from '@/components/common/AccordionGroup.vue'
import AccordionItem from '@/components/common/AccordionItem.vue'
import { useFilterStore } from '@/stores/filter'
import { onMounted, watch } from 'vue'
defineProps<{
  tagsOptions: string[]
}>()

const filterStore = useFilterStore()
const filterOptions = filterStore.filterOptions

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localForm = defineModel<filterOptionsType | any>({ required: true })

const initializeFilters = () => {
  if (!filterOptions || !localForm.value) return
  localForm.value.name = filterOptions.name || ''
  ;['cookTime', 'prepTime', 'servings', 'ingredients', 'instructions'].forEach((field) => {
    // @ts-expect-error shut up ts
    localForm.value[field] = filterOptions[field]
      ? // @ts-expect-error shut up ts
        { ...filterOptions[field] }
      : { operator: 'gt', value: null }
  })

  // Ensure date is properly formatted
  localForm.value.date = filterOptions.date
    ? {
        type: filterOptions.date.type || 'any',
        start: filterOptions.date.start
          ? new Date(filterOptions.date.start).toISOString().split('T')[0]
          : '',
        end: filterOptions.date.end
          ? new Date(filterOptions.date.end).toISOString().split('T')[0]
          : '',
      }
    : { type: 'any', start: '', end: '' }

  localForm.value.tags = {
    value: filterOptions.tags?.tags ? [...filterOptions.tags.tags] : [],
    and: filterOptions.tags?.and ?? false, // Default to OR filter if not specified
  }

  localForm.value.sort = {
    method: filterOptions.sort?.method ?? 'date',
    order: filterOptions.sort?.order ?? 'desc',
  }
}

const getFilters = () => {
  if (!filterOptions || !localForm.value) return

  const newFilters: filterOptionsType = {}
  // Name filter
  if (localForm.value.name.trim()) {
    newFilters.name = localForm.value.name.trim()
  }

  // Numerical filters
  ;['cookTime', 'prepTime', 'servings', 'ingredients', 'instructions'].forEach((field) => {
    if (localForm.value[field].value !== null && localForm.value[field].value !== '') {
      // @ts-expect-error shut up ts
      newFilters[field] = {
        operator: localForm.value[field].operator,
        value: Number(localForm.value[field].value),
      }
    }
  })

  // Date filter
  if (localForm.value.date.type !== 'any') {
    const { start, end } = getDateRange(
      localForm.value.date.type,
      localForm.value.date.start,
      localForm.value.date.end,
    )

    if (start && end) {
      newFilters.date = {
        type: localForm.value.date.type,
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
      }
    }
  }

  // Tags filter
  if (localForm.value.tags.value.length > 0) {
    newFilters.tags = {
      tags: localForm.value.tags.value,
      and: localForm.value.tags.and,
    }
  }

  // Sort filter
  if (localForm.value.sort.method && localForm.value.sort.order) {
    newFilters.sort = {
      method: localForm.value.sort.method,
      order: localForm.value.sort.order,
    }
  }

  return newFilters
}

const getDateRange = (type: string, customStart?: string, customEnd?: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let start: Date | null = null
  let end: Date | null = null

  switch (type) {
    case 'today':
      start = new Date(today)
      end = new Date(today)
      end.setHours(23, 59, 59, 999)
      break
    case 'lastWeek':
      start = new Date(today)
      start.setDate(today.getDate() - 7)
      end = new Date(today)
      break
    case 'lastMonth':
      start = new Date(today)
      start.setMonth(today.getMonth() - 1)
      end = new Date(today)
      break
    case 'lastYear':
      start = new Date(today)
      start.setFullYear(today.getFullYear() - 1)
      end = new Date(today)
      break
    case 'custom':
      start = customStart ? new Date(customStart) : null
      end = customEnd ? new Date(customEnd) : null
      if (start) start.setHours(0, 0, 0, 0)
      if (end) end.setHours(23, 59, 59, 999)
      break
  }

  return { start, end }
}

onMounted(() => {
  initializeFilters()
})

watch(
  () => filterOptions,
  (newVal) => {
    if (newVal) {
      initializeFilters()
    }
  },
  { deep: true, immediate: true },
)

defineExpose({
  initializeFilters,
  getFilters,
})
</script>
<template>
  <AccordionGroup>
    <AccordionItem>
      <template #header>
        <h4>Basic Filters</h4>
      </template>
      <div class="top-filters">
        <div class="filter-group">
          <label>Recipe Name Contains:</label>
          <input type="text" v-model="localForm.name" />
        </div>

        <div class="filter-group">
          <label>Date Created:</label>
          <select v-model="localForm.date.type">
            <option value="any">Any</option>
            <option value="today">Today</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <div v-if="localForm.date.type === 'custom'" class="custom-date">
            <div>
              <span>From:</span>
              <input type="date" v-model="localForm.date.start" />
            </div>
            <div>
              <span>To:</span>
              <input type="date" v-model="localForm.date.end" />
            </div>
          </div>
        </div>
      </div>
    </AccordionItem>

    <AccordionItem>
      <template #header>
        <h4>Numerical Filters</h4>
      </template>
      <div class="filter-section">
        <div class="filter-group" v-for="field in ['cookTime', 'prepTime']" :key="field">
          <label>{{ field === 'cookTime' ? 'Cook Time (min)' : 'Prep Time (min)' }}:</label>
          <select v-model="localForm[field].operator">
            <option value="gt">&gt;</option>
            <option value="lt">&lt;</option>
            <option value="eq">=</option>
          </select>
          <input type="number" min="0" v-model="localForm[field].value" />
        </div>

        <div
          class="filter-group"
          v-for="field in ['servings', 'ingredients', 'instructions']"
          :key="field"
        >
          <label>{{ field.charAt(0).toUpperCase() + field.slice(1) }}:</label>
          <select v-model="localForm[field].operator">
            <option value="gt">&gt;</option>
            <option value="lt">&lt;</option>
            <option value="eq">=</option>
          </select>
          <input type="number" min="0" v-model="localForm[field].value" />
        </div>
      </div>
    </AccordionItem>

    <AccordionItem>
      <template #header>
        <h4>Tag Filters</h4>
      </template>
      <SwitchComponent v-model="localForm.tags.and">
        <template #body-content>
          <h4>Tag Filter Method: {{ localForm.tags.and ? 'AND' : 'OR' }}</h4>
          <p>
            {{ localForm.tags.and ? 'All tags must match' : 'At least one tag must match' }}
          </p>
        </template>
      </SwitchComponent>
      <MultiSelect :options="tagsOptions" v-model="localForm.tags.value" />
    </AccordionItem>
  </AccordionGroup>
</template>

<style scoped>
input,
select {
  width: 100%;
}

label {
  color: var(--color-text);
}

h4 {
  margin: 0;
}

.accordion-content-inner {
  padding: 1rem;
}

.top-filters {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.filter-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.filter-section .filter-group {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 0.5fr 0.5fr;
  align-items: center;
}

.filter-group label {
  min-width: 120px;
}

.custom-date {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.custom-date div {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  align-items: center;
  gap: 0.5rem;
}

.custom-date input {
  margin-bottom: 0;
}

input[type='number'] {
  width: 80px;
}

@media (min-width: 768px) {
  .top-filters,
  .filter-section {
    margin-inline: 2rem;
  }
}

@media (max-width: 768px) {
  .filter-section,
  .top-filters {
    grid-template-columns: 1fr;
  }
}
</style>
