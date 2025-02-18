<script setup lang="ts">
import type { recipeType } from '@/types/index'
import TouchRipple from '@/components/common/TouchRipple.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconFire from '@/components/icons/IconFire.vue'
import IconPeople from '@/components/icons/IconPeople.vue'
import IconIngredients from '@/components/icons/IconIngredients.vue'
import IconInstructions from '@/components/icons/IconInstructions.vue'

defineProps<{
  recipe: recipeType
}>()
</script>

<template>
  <touch-ripple class="recipe-card" :opacity="0.6">
    <div class="recipe-header">
      <div class="left">
        <h4>{{ recipe.name }}</h4>
        <div class="recipe-tags">
          <span v-for="tag in recipe.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <div v-if="recipe.previewImage || recipe.image" class="right">
        <img v-if="recipe.previewImage" :src="recipe.previewImage" :alt="recipe.name" />
        <img v-else :src="recipe.image" :alt="recipe.name" />
      </div>
    </div>
    <p v-if="recipe.description">{{ recipe.description }}</p>
    <div class="recipe-details">
      <div class="detail" v-if="recipe.prepTime">
        <IconClock />
        {{ recipe.prepTime }} m
      </div>
      <div class="detail" v-if="recipe.cookTime">
        <IconFire />
        {{ recipe.cookTime }} m
      </div>
      <div class="detail" v-if="recipe.servings">
        <IconPeople />
        {{ recipe.servings }}
      </div>
      <div class="detail" v-if="recipe.ingredients">
        <IconIngredients />
        {{ recipe.ingredients.length }}
      </div>
      <div class="detail" v-if="recipe.instructions">
        <IconInstructions />
        {{ recipe.instructions.length }}
      </div>
    </div>
  </touch-ripple>
</template>

<style>
.recipe-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-medium);
  background-color: var(--color-background-mute);
  padding: 1.5em;
  transition: all 0.3s ease;
}

.recipe-card:hover {
  opacity: 0.75;
  cursor: pointer;
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.recipe-header .left {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
}

.recipe-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.recipe-tags span {
  border-radius: var(--radius-small);
  background-color: var(--color-accent);
  padding: 0.2em 0.6em;
  transition: all 0.3s ease;
}

.recipe-header .right {
  width: 20%;
  aspect-ratio: 1;
  overflow: hidden;
}

.recipe-header .right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-medium);
}

.recipe-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: space-around;
  margin-top: 4px;
  font-size: var(--font-size-small);
}

.recipe-details div {
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
}

.recipe-details svg {
  width: 24px;
  aspect-ratio: 1;
}
</style>
