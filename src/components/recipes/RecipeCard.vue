<script setup lang="ts">
import type { recipeType } from '@/types/index'
import MyButton from '@/components/common/MyButton.vue'
import TouchRipple from '@/components/common/TouchRipple.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconFire from '@/components/icons/IconFire.vue'
import IconPeople from '@/components/icons/IconPeople.vue'
import IconIngredients from '@/components/icons/IconIngredients.vue'
import IconInstructions from '@/components/icons/IconInstructions.vue'
import IconMoreVertical from '@/components/icons/IconMoreVertical.vue'
defineProps<{
  recipe: recipeType
  simple?: boolean
}>()
</script>

<template>
  <touch-ripple class="recipe-card" :opacity="0.6" v-if="!simple">
    <div class="recipe-header">
      <div class="left">
        <h4>{{ recipe.name }}</h4>
        <div class="recipe-tags">
          <span v-for="tag in recipe.tags" :key="tag">{{ tag }}</span>
        </div>
        <p v-if="recipe.description">{{ recipe.description }}</p>
      </div>
      <div v-if="recipe.previewImage || recipe.image" class="right">
        <img v-if="recipe.previewImage" :src="recipe.previewImage" :alt="recipe.name" />
        <img v-else :src="recipe.image" :alt="recipe.name" />
      </div>
    </div>
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
  <touch-ripple class="recipe-card simple" :opacity="0.6" v-else>
    <div class="simple__content">
      <img v-if="recipe.previewImage" :src="recipe.previewImage" :alt="recipe.name" />
      <span>{{ recipe.name }}</span>
    </div>
    <my-button class="simple menu-btn">
      <IconMoreVertical />
    </my-button>
  </touch-ripple>
</template>

<style>
.recipe-card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
  border-radius: var(--radius-medium);
  background-color: var(--color-background-mute);
  padding: 1.5em;
  transition: all 0.3s ease;
}

.recipe-card.simple {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
}

.recipe-card.simple .simple__content {
  display: flex;
  gap: 1em;
  align-items: center;
  flex: 1;
}

.recipe-card.simple img {
  width: 20%;
  aspect-ratio: 1;
  border-radius: var(--radius-medium);
  object-fit: cover;
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
