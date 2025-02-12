<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
  themeStore.setTheme(theme)
})
</script>

<template>
  <div id="wrapper">
    <HeaderBar title="Wasfati" />

    <main>
      <NavigationBar />

      <div id="view">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
#wrapper {
  display: flex;
  flex-direction: column;
  height: 100dvh;
}

main {
  overflow-y: hidden;
  display: flex;
  flex: 1;
}

#view {
  overflow-y: auto;
  flex: 1;
  padding: 2em;
}

#view h1 {
  margin: 1em 0.7em;
  margin-top: 0.5em;
}

@media (max-width: 1024px) {
  #wrapper {
    align-items: center;
    justify-content: center;
  }
  main {
    flex-direction: column;
  }
  #view {
    margin-bottom: 5rem;
  }
}
</style>
