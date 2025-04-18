<template>
  <div class="recipe-list body">
    <div class="list-info" :class="{ active: selectedRecipes.length > 0 }">
      <input
        type="checkbox"
        class="selection"
        :checked="isAllSelected"
        :indeterminate="isIndeterminate"
        @click="onSelectAll($event)"
      />
      <div>
        <span v-if="selectedRecipes.length > 0"
          >{{ selectedRecipes.length }} of {{ filterStore.finalRecipes.length }} Selected</span
        >
        <span v-else>
          {{ filterStore.finalRecipes.length }} of {{ recipesStore.recipes.length }} Shown
        </span>

        <button v-if="selectedRecipes.length > 0" class="secondary danger" @click="deleteRecipes">
          Delete
        </button>
      </div>
    </div>
    <div class="list-item">
      <span></span>
      <span class="name">Name</span>
      <span class="prep-time">Prep Time</span>
      <span class="cook-time">Cook Time</span>
      <span class="servings">Servings</span>
      <span class="ingredients-num">Ingredients</span>
      <span class="date-created">Date</span>
    </div>
    <touch-ripple
      :opacity="0.5"
      class="list-item"
      :class="{ selected: selectedRecipes.includes(recipe.id) }"
      v-for="recipe in filterStore.finalRecipes"
      :key="recipe.id"
      @click="onItemClick(recipe.id, $event)"
    >
      <label>
        <!-- Removed @click.stop handler -->
        <input
          type="checkbox"
          :checked="selectedRecipes.includes(recipe.id)"
          @change.stop="onSelectRecipe(recipe.id)"
        />
      </label>
      <span class="name">{{ recipe.name }}</span>
      <span class="prep-time">{{ recipe.prepTime }}</span>
      <span class="cook-time">{{ recipe.cookTime }}</span>
      <span class="servings">{{ recipe.servings }}</span>
      <span class="ingredients-num">{{ recipe.ingredients?.length }}</span>
      <span class="date-created">{{ recipe.dateCreated }}</span>
    </touch-ripple>
  </div>
  <ModalComponent ref="modal">
    <template #modal-header>
      <h2>Are you sure?</h2>
    </template>
    <template #modal-body>
      <p>Once the recipes are deleted, they're gone forever.</p>
    </template>
    <template #modal-footer>
      <my-button class="secondary" @click="modal.close()">Close</my-button>
      <my-button class="secondary danger" @click="onDelete">Delete</my-button>
    </template>
  </ModalComponent>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filter'
import { useRecipesStore } from '@/stores/recipes'
import { computed, defineEmits, ref } from 'vue'
import TouchRipple from '@/components/common/TouchRipple.vue'
import ModalComponent from '@/components/common/ModalComponent.vue'
import MyButton from '@/components/common/MyButton.vue'

const filterStore = useFilterStore()
const recipesStore = useRecipesStore()

const emit = defineEmits(['viewRecipe'])

const selectedRecipes = ref<number[]>([])
const isIndeterminate = computed(
  () =>
    selectedRecipes.value.length > 0 &&
    selectedRecipes.value.length < filterStore.finalRecipes.length,
)

const isAllSelected = computed(
  () =>
    selectedRecipes.value.length > 0 &&
    selectedRecipes.value.length === filterStore.finalRecipes.length,
)

const onItemClick = (id: number, event: Event) => {
  // Check if the click is on the checkbox or label
  const target = event.target as HTMLElement
  if (target.closest('label') || target.tagName === 'INPUT') {
    return
  }

  if (selectedRecipes.value.length > 0) {
    onSelectRecipe(id)
  } else {
    emit('viewRecipe', id)
  }
}

const onSelectRecipe = (id: number) => {
  if (selectedRecipes.value.includes(id)) {
    selectedRecipes.value = selectedRecipes.value.filter((r) => r !== id)
  } else {
    selectedRecipes.value.push(id)
  }
}

const onSelectAll = (event: Event) => {
  if (isIndeterminate.value) {
    selectedRecipes.value = []
    if (event.target) (event.target as HTMLInputElement).checked = false
  } else {
    if (event.target) {
      if ((event.target as HTMLInputElement).checked) {
        selectedRecipes.value = filterStore.finalRecipes.map((r) => r.id)
      } else {
        selectedRecipes.value = []
      }
    }
  }
}

const modal = ref()
const deleteRecipes = () => {
  modal.value?.open()
}

const onDelete = () => {
  if (selectedRecipes.value?.length > 0) recipesStore.deleteRecipes(selectedRecipes.value)
  selectedRecipes.value = []
  modal.value?.close()
}
</script>

<style>
.recipe-list.body {
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 14px;
  border-radius: 8px;
  overflow: auto;
}

.recipe-list .list-info {
  padding: 12px 24px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
}

.list-info span {
  opacity: 0.5;
}

.list-info.active {
  background-color: rgba(from var(--color-secondary) r g b / 10%);
  color: var(--color-heading);
}

.list-info.active span {
  opacity: 0.8;
}

.list-info div {
  display: flex;
  align-items: center;
  gap: 12px;
}

.list-info button {
  padding-block: 0px;
}

.list-item {
  display: grid;
  grid-template-columns: 35px 2fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid var(--color-border);
  min-width: 800px; /* Minimum width for smaller screens */
  user-select: none;
}

.list-item:nth-child(2) * {
  color: var(--color-heading);
}

.list-item:nth-child(2) {
  border-bottom: 1px solid var(--color-border);
}

.list-item:not(:nth-child(2)):hover {
  cursor: pointer;
}

.list-item:not(:nth-child(2)):not(.selected):hover {
  background-color: var(--color-background-mute);
}

/* Column specific styling */
.list-item:not(:nth-child(2)) .name {
  font-weight: 500;
  color: var(--color-secondary);
}

.list-item.selected {
  background-color: rgba(from var(--color-secondary) r g b / 20%);
}

.list-item.selected .name {
  color: var(--color-heading);
}

.list-item label {
  margin: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.recipe-list input[type='checkbox'] {
  padding: 0;
  width: 16px;
  border-radius: 4px;
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
