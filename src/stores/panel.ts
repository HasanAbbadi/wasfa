import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'side-panel-expanded'

export const usePanelStore = defineStore('panel', () => {
  const savedState = localStorage.getItem(STORAGE_KEY) === 'true'
  const isExpanded = ref(savedState ? savedState : false)
  const isMobile = ref(false)

  const expand = () => {
    isExpanded.value = true
  }

  const collapse = () => {
    isExpanded.value = false
  }

  const toggle = () => {
    isExpanded.value = !isExpanded.value
  }

  watch(isExpanded, (value) => {
    localStorage.setItem(STORAGE_KEY, value.toString())
  })

  return {
    isExpanded,
    isMobile,
    expand,
    collapse,
    toggle,
  }
})
