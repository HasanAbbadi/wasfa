// stores/themeStore.ts
import { defineStore } from 'pinia'
import { ref, watch, onMounted, onUnmounted } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // @ts-expect-error - localStorage is not typed
  const theme = ref<'light' | 'dark' | 'system'>(localStorage.getItem('theme') || 'system') // Default to 'system' if not set
  const isDark = ref(false)
  const systemTheme = ref<'dark' | 'light'>('dark')

  onMounted(() => {
    systemTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(theme.value)
  })

  watch(isDark, (newIsDark) => {
    document.body.setAttribute('data-theme', newIsDark ? 'dark' : 'light')
  })

  function setTheme(newTheme: 'light' | 'dark' | 'system') {
    localStorage.setItem('theme', newTheme)
    theme.value = newTheme

    if (newTheme === 'system') {
      isDark.value = systemTheme.value === 'dark'
    } else {
      isDark.value = newTheme === 'dark'
    }
  }

  function toggleTheme() {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Initialize the theme
  setTheme(theme.value as 'light' | 'dark' | 'system')

  return { theme, isDark, toggleTheme, setTheme }
})
