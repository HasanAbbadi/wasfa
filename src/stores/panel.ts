import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePanelStore = defineStore('panel', () => {
  const isExpanded = ref(false)
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

  return {
    isExpanded,
    isMobile,
    expand,
    collapse,
    toggle,
  }
})
