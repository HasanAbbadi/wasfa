<script setup lang="ts">
import IconAdd from '@/components/icons/IconAdd.vue'
import IconRecipes from '@/components/icons/IconRecipes.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNavStore } from '@/stores/nav'
const navStore = useNavStore()
const { isExpanded } = storeToRefs(navStore)
</script>

<template>
  <nav>
    <RouterLink to="/">
      <IconRecipes />
      <span v-if="isExpanded">Recipes</span>
    </RouterLink>
    <RouterLink to="/add">
      <IconAdd />
      <span v-if="isExpanded">Add Recipe</span>
    </RouterLink>
    <RouterLink to="/settings">
      <IconSettings />
      <span v-if="isExpanded">Settings</span>
    </RouterLink>
  </nav>
</template>

<style>
nav {
  position: fixed;
  flex: 1;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-background-soft);
  padding: 10px;
  z-index: 10;
  user-select: none;
}

nav {
  bottom: 0;
  left: 0;
  width: 100%;
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  transition: 0.4s;
  padding: 0.2rem 1rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1em;
  text-align: center;
  user-select: none;
  white-space: nowrap;
}

nav a svg {
  width: var(--fs-500);
}

nav a:hover:not(.router-link-exact-active) {
  background-color: var(--color-border-hover);
}

nav a.router-link-exact-active {
  background-color: var(--color-accent);
}
@media (max-width: 1024px) {
  nav {
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
    height: var(--header-height);
  }

  nav a span {
    display: none;
  }
}

@media (min-width: 1024px) {
  nav {
    position: relative;
    flex: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    top: 0;
    height: 100%;
    gap: 1rem;
    padding-inline: 1rem;
  }
  nav a {
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
    justify-content: flex-start;
    padding: 0.8rem;
  }
}
</style>
