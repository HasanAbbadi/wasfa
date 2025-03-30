<script setup lang="ts">
import IconAdd from '@/components/icons/IconAdd.vue'
import IconRecipes from '@/components/icons/IconRecipes.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconHome from '@/components/icons/IconHome.vue'

import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNavStore } from '@/stores/nav'
import IconDelete from '../icons/IconDelete.vue'
const navStore = useNavStore()
const { isExpanded } = storeToRefs(navStore)
</script>

<template>
  <nav>
    <RouterLink to="/">
      <IconHome />
      <span v-if="isExpanded">Home</span>
    </RouterLink>
    <RouterLink to="/recipes">
      <IconRecipes />
      <span v-if="isExpanded">Recipes</span>
    </RouterLink>
    <RouterLink to="/recipes/add">
      <IconAdd />
      <span v-if="isExpanded">New</span>
    </RouterLink>
    <RouterLink to="/settings">
      <IconSettings />
      <span v-if="isExpanded">Settings</span>
    </RouterLink>
    <RouterLink to="/trash">
      <IconDelete />
      <span v-if="isExpanded">Trash</span>
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
  /* transition: 0.4s; */
  padding: 0.2rem 1rem;
  border-radius: var(--radius-medium);
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
  opacity: 1;
}

nav a.router-link-exact-active {
  background-color: var(--color-accent);
  color: var(--color-secondary);
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
    gap: 0.35rem;
    padding-inline: 1rem;
  }
  nav a {
    flex-direction: row;
    gap: 0.5rem;

    justify-content: flex-start;
    padding: 0.35rem 0.8rem;
  }

  nav a:not(:nth-child(3)) span {
    width: 100px;
    text-align: start;
  }

  nav a:nth-child(3) {
    order: 1;
    padding: 0.8rem;
    background-color: var(--color-border);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    margin-bottom: 0.5em;
    width: auto;
  }

  nav a:nth-child(3):hover {
    background-color: var(--color-border-hover);
  }

  nav a:nth-child(1) {
    order: 2;
  }
  nav a:nth-child(2) {
    order: 3;
  }
  nav a:nth-child(4) {
    order: 4;
    position: relative;
    margin-top: 2rem;
  }
  nav a:nth-child(5) {
    order: 5;
  }
  nav a:nth-child(4)::before {
    content: '';
    position: absolute;
    top: -1rem;
    right: 0px;
    width: 100%;
    height: 2px;
    background: var(--color-border);
  }
}
</style>
