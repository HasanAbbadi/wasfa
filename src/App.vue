<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSettingsStore } from './stores/settings'
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'

const Router = useRouter()
const settingsStore = useSettingsStore()
const themeStore = useThemeStore()

onMounted(() => {
  if (settingsStore.settings.firstVisit) {
    Router.replace({ name: 'welcome' })
  }
})
</script>
