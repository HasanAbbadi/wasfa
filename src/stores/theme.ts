// stores/themeStore.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'light') // Default to 'light' if not set
  const isDark = ref(theme.value === 'dark')

  watch(isDark, (newIsDark) => {
    theme.value = newIsDark ? 'dark' : 'light'
    setTheme(theme.value)
  })

  function setTheme(newTheme: string) {
    localStorage.setItem('theme', newTheme)
    theme.value = newTheme
    isDark.value = newTheme === 'dark'
    document.body.setAttribute('data-theme', newTheme)
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    setTheme(theme.value)
  }

  return { theme, isDark, toggleTheme, setTheme }
})
