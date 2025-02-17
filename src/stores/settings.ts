import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface UserSettings {
  language: string
  fontSize: number
  recipePreview: boolean
}

const defaultSettings: UserSettings = {
  language: 'en',
  fontSize: 16,
  recipePreview: true,
}

const STORAGE_KEY = 'user-settings'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<UserSettings>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultSettings)),
  )

  function updateSettings(newSettings: Partial<UserSettings>) {
    settings.value = { ...settings.value, ...newSettings }
  }

  function resetSettings() {
    settings.value = { ...defaultSettings }
  }

  watch(
    settings,
    (state) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    { deep: true },
  )

  return {
    settings,
    updateSettings,
    resetSettings,
  }
})
