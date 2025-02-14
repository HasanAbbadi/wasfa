import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePanelStore = defineStore('panel', () => {
  const isExpanded = ref(false)

  const expand = () => {
    isExpanded.value = true
  }

  const collapse = () => {
    isExpanded.value = false
  }

  return {
    isExpanded,
    expand,
    collapse,
  }
})
