<script setup lang="ts">
import IconDarkTheme from '@/components/icons/IconDarkTheme.vue'
import IconLightTheme from '@/components/icons/IconLightTheme.vue'
import ImportExportButtons from '@/components/settings/ImportExportButtons.vue'
import SwitchComponent from '@/components/common/SwitchComponent.vue'
import AccordionGroup from '@/components/common/AccordionGroup.vue'
import AccordionItem from '@/components/common/AccordionItem.vue'
import { useThemeStore } from '@/stores/theme'
import { onMounted, defineEmits } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const emit = defineEmits(['panelContent'])

onMounted(() => {
  emit('panelContent', { source: 'settings', value: true })
})

const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="header" />

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

    <SwitchComponent v-model="settingsStore.settings.recipePreview">
      <template #body-content>
        <span>Open recipe in preview</span>
        <p>Opens the recipe in a side-panel or bottom sheet.</p>
      </template>
    </SwitchComponent>

    <hr />

    <ImportExportButtons />

    <hr />
    <accordion-group :multiple="false">
      <accordion-item>
        <template #header>
          <span>First Item</span>
        </template>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati iure similique
          doloribus nesciunt quaerat neque necessitatibus molestiae laborum quidem commodi!
        </p>
      </accordion-item>
      <accordion-item>
        <template #header>
          <span>Second Item</span>
        </template>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati iure similique
          doloribus nesciunt quaerat neque necessitatibus molestiae laborum quidem commodi!
        </p>
      </accordion-item>
      <accordion-item>
        <template #header>
          <span>Third Item</span>
        </template>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati iure similique
          doloribus nesciunt quaerat neque necessitatibus molestiae laborum quidem commodi!
        </p>
      </accordion-item>
    </accordion-group>
  </div>
</template>

<style>
/* .settings {
  margin-inline-end: auto;
} */
</style>
