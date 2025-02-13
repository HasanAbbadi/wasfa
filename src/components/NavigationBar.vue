<script setup lang="ts">
import IconAdd from '@/components/icons/IconAdd.vue'
import IconRecipes from '@/components/icons/IconRecipes.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconDoubleRightArrow from '@/components/icons/IconDoubleRightArrow.vue'
import IconDoubleLeftArrow from '@/components/icons/IconDoubleLeftArrow.vue'

import { RouterLink } from 'vue-router'
import { ref, watch, onMounted } from 'vue'

const isExpanded = ref(true)

watch(isExpanded, (value) => {
  localStorage.setItem('nav-expanded', value.toString())
})

onMounted(() => {
  const storedValue = localStorage.getItem('nav-expanded')
  if (storedValue) {
    isExpanded.value = storedValue === 'true'
  }
})
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
    <div class="expand-nav" @click="isExpanded = !isExpanded">
      <IconDoubleLeftArrow v-if="isExpanded" />
      <IconDoubleRightArrow v-else />
    </div>
  </nav>
</template>

<style>
nav {
  position: fixed;
  flex: 1;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-background-soft);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  padding: 10px;
  z-index: 99;
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

nav a:hover:not(.router-link-exact-active) {
  background-color: var(--color-border-hover);
}

nav a.router-link-exact-active {
  background-color: var(--color-accent);
}

.expand-nav {
  display: none;
  align-self: flex-end;
  margin-top: auto;
  cursor: pointer;
  margin-inline-end: 1em;
  opacity: 0.7;
}

.expand-nav svg {
  width: 1.5em;
  height: 1.5em;
}

@media (max-width: 1024px) {
  nav {
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
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
    border-radius: 0;
    gap: 1rem;
    padding-inline: 1.2rem;
  }
  nav a {
    flex-direction: row;
    gap: 0.8em;
    width: 100%;
    justify-content: flex-start;
    padding: 1rem;
  }

  .expand-nav {
    display: block;
  }
}
</style>
