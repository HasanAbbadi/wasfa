<script setup lang="ts">
import IconDarkTheme from '@/components/icons/IconDarkTheme.vue'
import IconLightTheme from '@/components/icons/IconLightTheme.vue'
import ImportExportButtons from '@/components/ImportExportButtons.vue'
import SwitchComponent from '@/components/SwitchComponent.vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div class="settings">
    <h1>Settings</h1>
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
  </div>
</template>

<style>
.settings {
  max-width: 600px;
  margin-inline-end: auto;
}
</style>
