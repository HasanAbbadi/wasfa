<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { defineEmits } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconFire from '@/components/icons/IconFire.vue'
import IconPeople from '@/components/icons/IconPeople.vue'
import IconIngredients from '@/components/icons/IconIngredients.vue'
import IconInstructions from '@/components/icons/IconInstructions.vue'

const emit = defineEmits(['close'])

const recipe = ref()

const props = defineProps<{
  id: number
}>()

const recipesStore = useRecipesStore()
recipe.value = computed(() => recipesStore.getRecipeById(props.id))
</script>

<template>
  <h1 class="extra-margin">.</h1>
  <div class="recipe-wrapper">
    <button class="close secondary" @click="emit('close')"><IconClose /></button>
    <h1>{{ recipe.value.name }}</h1>
    <p>{{ recipe.value.description }}</p>
    <div class="recipe-details">
      <div class="detail" v-if="recipe.value.prepTime">
        <IconClock />
        {{ recipe.value.prepTime }} m
      </div>
      <div class="detail" v-if="recipe.value.cookTime">
        <IconFire />
        {{ recipe.value.cookTime }} m
      </div>
      <div class="detail" v-if="recipe.value.servings">
        <IconPeople />
        {{ recipe.value.servings }}
      </div>
      <div class="detail" v-if="recipe.value.ingredients">
        <IconIngredients />
        {{ recipe.value.ingredients.length }}
      </div>
      <div class="detail" v-if="recipe.value.instructions">
        <IconInstructions />
        {{ recipe.value.instructions.length }}
      </div>
    </div>
    <div class="recipe-ingredients">
      <h2>Ingredients</h2>
      <hr />
      <ul>
        <li v-for="ingredient in recipe.value.ingredients" :key="ingredient.id">
          <span class="qnt">{{ ingredient.quantity }}</span>
          <span class="unit"> {{ ingredient.unit }}</span> {{ ingredient.name }}
        </li>
      </ul>
    </div>
    <div class="recipe-instructions">
      <h2>Instructions</h2>
      <hr />
      <ol>
        <li v-for="instruction in recipe.value.instructions" :key="instruction.id">
          {{ instruction }}
        </li>
      </ol>
    </div>
    <div class="recipe-notes">
      <h2>Notes</h2>
      <hr />
      <ul>
        <li v-for="note in recipe.value.notes" :key="note.id">
          {{ note }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h1.extra-margin {
  opacity: 0;
}

.recipe-wrapper:not(.route) {
  padding: 2rem;
  border-radius: 12px;
  background: var(--color-background-soft);
  color: var(--color-text);
  max-width: 600px;
  position: relative;
}

.recipe-wrapper .close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.recipe-wrapper .close:hover {
  transform: scale(1.1);
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

p {
  text-align: center;
  font-size: 1rem;
}

.recipe-details {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.recipe-details .detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  background: var(--color-background-mute);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.recipe-ingredients,
.recipe-instructions,
.recipe-notes {
  margin-top: 2rem;
}

h2 {
  font-size: 1.4rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
}

ul,
ol {
  padding-inline-start: 1.5rem;
}

li {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.recipe-ingredients ul {
  list-style-type: disc;
}

.recipe-instructions ol {
  list-style-type: decimal;
}

.recipe-notes ul {
  list-style-type: circle;
}

.qnt,
.unit {
  font-weight: bold;
  color: var(--color-secondary);
}
.unit {
  opacity: 0.8;
}

hr {
  margin-bottom: 1rem;
}
</style>
