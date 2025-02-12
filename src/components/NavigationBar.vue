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

  /* https://css-shape.com/inverted-radius/ */
  nav::after {
    --r: 2px; /* the radius */
    --s: calc(var(--r) * 9); /* size of inner curve */
    --x: 0px; /* horizontal offset (no percentane) */
    --y: 0px; /* vertical offset (no percentage) */
    --width: 20px;

    content: '';
    position: absolute;
    top: 0;
    right: calc(var(--width) * -1);

    width: var(--width);
    aspect-ratio: 1;
    background: var(--color-background-soft);
    --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000 72%);
    --_g: conic-gradient(
      from 90deg at calc(100% - var(--r)) calc(100% - var(--r)),
      #0000 25%,
      #000 0
    );
    --_d: (var(--s) + var(--r));
    mask:
      calc(100% - var(--_d) - var(--x)) 100% var(--_m),
      100% calc(100% - var(--_d) - var(--y)) var(--_m),
      radial-gradient(var(--s) at 100% 100%, #0000 99%, #000 calc(100% + 1px))
        calc(-1 * var(--r) - var(--x)) calc(-1 * var(--r) - var(--y)),
      var(--_g) calc(-1 * var(--_d) - var(--x)) 0,
      var(--_g) 0 calc(-1 * var(--_d) - var(--y));
    mask-repeat: no-repeat;
    z-index: 100;
  }
}
</style>
