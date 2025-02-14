<script setup lang="ts">
import IconDarkTheme from '@/components/icons/IconDarkTheme.vue'
import IconLightTheme from '@/components/icons/IconLightTheme.vue'
import ImportExportButtons from '@/components/ImportExportButtons.vue'
import SwitchComponent from '@/components/SwitchComponent.vue'
import { useThemeStore } from '@/stores/theme'
import { usePanelStore } from '@/stores/panel'
import { onMounted, onUnmounted, defineEmits } from 'vue'

const emit = defineEmits(['viewRecipe', 'viewAbout'])

const panelStore = usePanelStore()

onMounted(() => {
  emit('viewAbout', true)
})
onUnmounted(() => {
  emit('viewAbout', false)
})

const expandPanel = () => {
  panelStore.expand()
}

const themeStore = useThemeStore()
</script>

<template>
  <div class="header">
    <h1>Settings</h1>
  </div>

  <div class="settings body">
    <SwitchComponent v-model="themeStore.isDark">
      <template #handle-content>
        <IconDarkTheme v-if="themeStore.isDark" />
        <IconLightTheme v-else />
      </template>
      <template #body-content>
        <span>Dark Mode</span>
        <p>Toggle the dark mode</p>
      </template>
    </SwitchComponent>

    <hr />

    <ImportExportButtons />

    <button @click="expandPanel">Open Sheet</button>
  </div>
</template>

<style>
/* .settings {
  margin-inline-end: auto;
} */
</style>
