<script setup lang="ts">
import IconMenu from '@/components/icons/IconList.vue'
import { useNavStore } from '@/stores/nav'

defineProps<{
  title: string
}>()

const navStore = useNavStore()
const toggleNav = () => {
  navStore.toggleNav()
}
</script>

<template>
  <header>
    <div class="left">
      <button class="secondary menu-btn" @click="toggleNav"><IconMenu /></button>
      <h1>{{ title }}</h1>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5em 2em;
  line-height: 1rem;
  position: sticky;
  top: 0;
  left: 0;
  height: var(--header-height);
  background-color: var(--color-background-soft);
}

header h1 {
  font-weight: var(--font-weight-bold);
}

header .left,
header .right {
  display: flex;
  align-items: center;
}

header .left {
  gap: 2em;
}

header .left .menu-btn,
header .right button {
  padding: 0.5rem;
  border-radius: 50%;
  --color-secondary: var(--color-text);
}

header .right {
  margin-inline-end: 1.5em;
}

.menu-btn svg,
header .right button svg {
  width: 1.5rem;
  height: 1.5rem;
}

@media (max-width: 1024px) {
  header {
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  }

  .menu-btn {
    display: none;
  }
}
</style>
