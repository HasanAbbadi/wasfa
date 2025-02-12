<script setup lang="ts">
import DarkThemeIcon from '@/components/icons/IconDarkTheme.vue'
import LightThemeIcon from '@/components/icons/IconLightTheme.vue'
import { useThemeStore } from '@/stores/theme'

defineProps<{
  title: string
}>()

const themeStore = useThemeStore()
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <button @click="themeStore.toggleTheme()" class="toggle-theme">
      <DarkThemeIcon v-if="themeStore.isDark" />
      <LightThemeIcon v-else />
    </button>
  </header>
</template>

<style>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5em;
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

.toggle-theme {
  border: none;
  background-color: transparent;
  color: var(--color-text);
  cursor: pointer;
  box-shadow: none;
}
</style>
